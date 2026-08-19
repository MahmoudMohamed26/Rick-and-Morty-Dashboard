import { fetchEpisodes } from "@/lib/apis/episodes";
import { EpisodesTable } from "./episodes-table";

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, Number(page));
  const data = await fetchEpisodes(pageNum);

  return <EpisodesTable initialData={data} initialPage={pageNum} />;
}
