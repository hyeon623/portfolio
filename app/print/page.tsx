import { PrintBook } from "./PrintBook";

export const dynamic = "force-dynamic";

export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const parsed = Number.parseInt(params.page ?? "", 10);
  const onlyPage = Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
  return <PrintBook onlyPage={onlyPage} />;
}
