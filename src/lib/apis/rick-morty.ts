import type { ApiResponse } from "../types/api";
import type { CharacterType } from "../types/character";
import type { EpisodeType } from "../types/episode";
import type { LocationType } from "../types/locations";
import { extractIdsFromUrls } from "../utils/extract-ids";

const BASE_URL = "https://rickandmortyapi.com/api";
const BATCH_SIZE = 100;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
}

export async function fetchCharacters(
  page: number = 1
): Promise<ApiResponse<CharacterType[]>> {
  return fetchJson(`${BASE_URL}/character?page=${page}`);
}

export async function fetchCharacter(
  id: number
): Promise<CharacterType> {
  return fetchJson(`${BASE_URL}/character/${id}`);
}

export async function fetchLocations(
  page: number = 1
): Promise<ApiResponse<LocationType[]>> {
  return fetchJson(`${BASE_URL}/location?page=${page}`);
}

export async function fetchLocation(
  id: number
): Promise<LocationType> {
  return fetchJson(`${BASE_URL}/location/${id}`);
}

export async function fetchEpisodes(
  page: number = 1
): Promise<ApiResponse<EpisodeType[]>> {
  return fetchJson(`${BASE_URL}/episode?page=${page}`);
}

export async function fetchEpisode(
  id: number
): Promise<EpisodeType> {
  return fetchJson(`${BASE_URL}/episode/${id}`);
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
      fetchJson<CharacterType[] | CharacterType>(
        `${BASE_URL}/character/${chunk.join(",")}`
      ).then((res) => (Array.isArray(res) ? res : [res]))
    )
  );

  return results.flat();
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
      fetchJson<EpisodeType[] | EpisodeType>(
        `${BASE_URL}/episode/${chunk.join(",")}`
      ).then((res) => (Array.isArray(res) ? res : [res]))
    )
  );

  return results.flat();
}
