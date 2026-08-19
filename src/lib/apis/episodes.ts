import type { ApiResponse } from "../types/api";
import type { EpisodeType } from "../types/episode";
import { extractIdsFromUrls } from "../utils/extract-ids";
import { fetchApi } from "./client";
import { ApiError } from "@/lib/errors/api-error";

const BATCH_SIZE = 500;

export async function fetchEpisodes(
  page: number = 1
): Promise<ApiResponse<EpisodeType[]>> {
  try {
    return await fetchApi(`/episode?page=${page}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) throw e;
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
}

export async function fetchEpisode(id: number): Promise<EpisodeType> {
  return fetchApi(`/episode/${id}`);
}

export async function fetchEpisodesByIds(
  urls: string[]
): Promise<EpisodeType[]> {
  if (urls.length === 0) return [];

  const ids = extractIdsFromUrls(urls);
  if (ids.length === 0) return [];

  const chunks: number[][] = [];
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    chunks.push(ids.slice(i, i + BATCH_SIZE));
  }

  const results = await Promise.all(
    chunks.map((chunk) =>
      fetchApi<EpisodeType[] | EpisodeType>(
        `/episode/${chunk.join(",")}`
      ).then((res) => (Array.isArray(res) ? res : [res]))
    )
  );

  return results.flat();
}
