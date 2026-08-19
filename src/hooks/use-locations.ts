"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../lib/types/api";
import type { LocationType } from "../lib/types/locations";
import { fetchLocations, fetchLocation } from "../lib/apis/locations";

export function useLocations(
  page: number = 1,
  initialData?: ApiResponse<LocationType[]>
) {
  return useQuery({
    queryKey: ["locations", page],
    queryFn: () => fetchLocations(page),
    initialData,
  });
}

export function useLocation(id: number, initialData?: LocationType) {
  return useQuery({
    queryKey: ["location", id],
    queryFn: () => fetchLocation(id),
    enabled: !!id,
    initialData,
  });
}
