import { fetchEpisode } from "@/lib/apis/episodes";
import { notFound } from "next/navigation";
import { EpisodeDetail } from "./episode-detail";

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let episode;
  try {
    episode = await fetchEpisode(Number(id));
  } catch {
    notFound();
  }

  return <EpisodeDetail episode={episode} />;
}
