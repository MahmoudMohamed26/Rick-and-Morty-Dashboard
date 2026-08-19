import type { ApiResponse } from "../types/api";
import type { CharacterType } from "../types/character";
import { extractIdsFromUrls } from "../utils/extract-ids";
import { fetchApi } from "./client";
import { ApiError } from "@/lib/errors/api-error";

const BATCH_SIZE = 500;

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
}

export async function fetchCharacters(
  page: number = 1,
  filters?: CharacterFilters
): Promise<ApiResponse<CharacterType[]>> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (filters?.name) params.set("name", filters.name);
  if (filters?.status) params.set("status", filters.status);
  if (filters?.species) params.set("species", filters.species);
  try {
    return await fetchApi(`/character?${params.toString()}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) throw e;
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
}

export async function fetchCharacter(id: number): Promise<CharacterType> {
  return fetchApi(`/character/${id}`);
}

export async function fetchCharactersByIds(
  urls: string[]
): Promise<CharacterType[]> {
  if (urls.length === 0) return [];

  const ids = extractIdsFromUrls(urls);
  if (ids.length === 0) return [];

  const chunks: number[][] = [];
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    chunks.push(ids.slice(i, i + BATCH_SIZE));
  }

  const results = await Promise.all(
    chunks.map((chunk) =>
      fetchApi<CharacterType[] | CharacterType>(
        `/character/${chunk.join(",")}`
      ).then((res) => (Array.isArray(res) ? res : [res]))
    )
  );

  return results.flat();
}
