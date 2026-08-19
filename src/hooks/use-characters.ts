"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../lib/types/api";
import type { CharacterType } from "../lib/types/character";
import {
  fetchCharacters,
  fetchCharacter,
  fetchCharactersByIds,
  type CharacterFilters,
} from "../lib/apis/characters";

export function useCharacters(
  page: number = 1,
  filters?: CharacterFilters,
  initialData?: ApiResponse<CharacterType[]>
) {
  return useQuery({
    queryKey: ["characters", page, filters],
    queryFn: () => fetchCharacters(page, filters),
    initialData,
  });
}

export function useCharacter(id: number, initialData?: CharacterType) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
    initialData,
  });
}

export function useCharactersByIds(urls: string[]) {
  return useQuery({
    queryKey: ["characters-by-ids", urls],
    queryFn: () => fetchCharactersByIds(urls),
    enabled: urls.length > 0,
  });
}
