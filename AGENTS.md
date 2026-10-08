<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Two package roots: the Next.js portfolio at the repository root, and the Expo app in `math-alarm`. Install both with `npm ci` and `npm ci --prefix math-alarm`.
- Portfolio dev server: `npm run dev` (binds `0.0.0.0:3000`). `next.config.ts` allows the `127.0.0.1` dev origin so client hydration and HMR work when the browser uses that host.
- Math alarm dev server: `npm run web --prefix math-alarm` (Expo web, port 8081). `npm run typecheck --prefix math-alarm` typechecks it.
- No secrets or env files are required.
- `npm run lint` currently exits with a pre-existing `@typescript-eslint/no-require-imports` error in `math-alarm/src/alarmSound.ts`. `npx tsc --noEmit` passes.
