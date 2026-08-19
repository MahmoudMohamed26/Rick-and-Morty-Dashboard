import { fetchEpisode } from "@/lib/apis/episodes";
import { notFound } from "next/navigation";
import { EpisodeDetail } from "./episode-detail";
import { RateLimitBanner } from "@/components/global/rate-limit-banner";
import { ApiError } from "@/lib/errors/api-error";

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let episode;
  try {
    episode = await fetchEpisode(Number(id));
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      return <RateLimitBanner />;
    }
    notFound();
  }

  return <EpisodeDetail episode={episode} />;
}
