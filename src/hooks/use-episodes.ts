"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../lib/types/api";
import type { EpisodeType } from "../lib/types/episode";
import {
  fetchEpisodes,
  fetchEpisode,
  fetchEpisodesByIds,
} from "../lib/apis/episodes";

export function useEpisodes(
  page: number = 1,
  initialData?: ApiResponse<EpisodeType[]>
) {
  return useQuery({
    queryKey: ["episodes", page],
    queryFn: () => fetchEpisodes(page),
    initialData,
  });
}

export function useEpisode(id: number, initialData?: EpisodeType) {
  return useQuery({
    queryKey: ["episode", id],
    queryFn: () => fetchEpisode(id),
    enabled: !!id,
    initialData,
  });
}

export function useEpisodesByIds(urls: string[]) {
  return useQuery({
    queryKey: ["episodes-by-ids", urls],
    queryFn: () => fetchEpisodesByIds(urls),
    enabled: urls.length > 0,
  });
}
