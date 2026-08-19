import { fetchEpisodes } from "@/lib/apis/episodes";
import { EpisodesTable } from "./episodes-table";
import { RateLimitBanner } from "@/components/global/rate-limit-banner";
import { ApiError } from "@/lib/errors/api-error";

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, Number(page));

  let data;
  try {
    data = await fetchEpisodes(pageNum);
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      return <RateLimitBanner />;
    }
    data = { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }

  return <EpisodesTable initialData={data} initialPage={pageNum} />;
}
