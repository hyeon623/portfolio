import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "public", "Kim-Dong-Hyeon-A3-Portfolio.pdf");
const tmpDir = path.join(root, ".pdf-export");
const port = 3017;
const origin = `http://127.0.0.1:${port}`;
const A3_W = 1190.55;
const A3_H = 841.89;

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

function waitUntilPortBusy(timeoutMs = 180000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const ping = () => {
      const socket = createServer()
        .once("error", () => resolve(true))
        .once("listening", () => {
          socket.close();
          if (Date.now() - started > timeoutMs) {
            reject(new Error(`Timed out waiting for ${port}`));
            return;
          }
          setTimeout(ping, 400);
        })
        .listen(port, "127.0.0.1");
    };
    ping();
  });
}

async function waitUntilFree() {
  await new Promise((resolve) => {
    const ping = () => {
      const socket = createServer()
        .once("error", () => setTimeout(ping, 300))
        .once("listening", () => {
          socket.close(() => resolve());
        })
        .listen(port, "127.0.0.1");
    };
    ping();
  });
}

async function main() {
  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });
  await run("npx", ["next", "build"]);
  const child = spawn(
    "npx",
    ["next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
    { cwd: root, stdio: "inherit" },
  );

  try {
    await waitUntilPortBusy();
    await new Promise((r) => setTimeout(r, 800));

    const browser = await chromium.launch({
      args: ["--disable-dev-shm-usage", "--font-render-hinting=none"],
    });
    const page = await browser.newPage({
      viewport: { width: 1680, height: 1200 },
      deviceScaleFactor: 3,
    });
    page.setDefaultTimeout(240000);

    async function openPrintPage(pageNo) {
      await page.goto(`${origin}/print?page=${pageNo}`, {
        waitUntil: "domcontentloaded",
        timeout: 240000,
      });
      await page.emulateMedia({ media: "print" });
      await page.evaluate(() => document.fonts.ready);
      const deadline = Date.now() + 120000;
      let last = { total: 0, ready: 0, failed: [] };
      while (Date.now() < deadline) {
        last = await page.evaluate(() => {
          const imgs = Array.from(document.images);
          return {
            total: imgs.length,
            ready: imgs.filter((img) => img.complete && img.naturalWidth > 0).length,
            failed: imgs
              .filter((img) => img.complete && img.naturalWidth === 0)
              .map((img) => img.src)
              .slice(0, 20),
          };
        });
        if (last.failed.length) break;
        if (last.ready === last.total) break;
        await new Promise((r) => setTimeout(r, 250));
      }
      if (last.failed.length) {
        throw new Error(`Page ${pageNo}: ${last.failed.length} images failed\n${last.failed.join("\n")}`);
      }
      if (last.ready !== last.total) {
        throw new Error(`Page ${pageNo}: only ${last.ready}/${last.total} images loaded`);
      }
    }

    await openPrintPage(1);
    const pageCount = Number(await page.locator(".print-book").getAttribute("data-total"));
    console.log(`Capturing ${pageCount} pages`);
    if (!pageCount || pageCount > 50) throw new Error(`Page count ${pageCount} exceeds 50`);

    await mkdir("/tmp/a3-audit", { recursive: true });
    const pdf = await PDFDocument.create();
    for (let i = 0; i < pageCount; i += 1) {
      if (i > 0) await openPrintPage(i + 1);
      const handle = page.locator(".print-page").first();
      await handle.waitFor({ state: "visible" });
      const shot = await handle.screenshot({ type: "jpeg", quality: 92 });
      const jpgPath = path.join(tmpDir, `page-${String(i + 1).padStart(2, "0")}.jpg`);
      await writeFile(jpgPath, shot);
      await writeFile(`/tmp/a3-audit/page-${String(i + 1).padStart(2, "0")}.jpg`, shot);
      const image = await pdf.embedJpg(shot);
      const pdfPage = pdf.addPage([A3_W, A3_H]);
      pdfPage.drawImage(image, { x: 0, y: 0, width: A3_W, height: A3_H });
      console.log(`Captured ${i + 1}/${pageCount}`);
    }

    const bytes = await pdf.save();
    await writeFile(outFile, bytes);
    await browser.close();
    console.log(`Wrote ${outFile} (${(bytes.length / 1e6).toFixed(1)} MB, ${pageCount} pages)`);
  } finally {
    child.kill("SIGTERM");
    await waitUntilFree().catch(() => {});
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
