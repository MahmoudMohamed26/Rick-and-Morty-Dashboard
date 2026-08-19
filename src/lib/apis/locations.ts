import type { ApiResponse } from "../types/api";
import type { LocationType } from "../types/locations";
import { fetchApi } from "./client";
import { ApiError } from "@/lib/errors/api-error";

export async function fetchLocations(
  page: number = 1
): Promise<ApiResponse<LocationType[]>> {
  try {
    return await fetchApi(`/location?page=${page}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) throw e;
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
}

export async function fetchLocation(id: number): Promise<LocationType> {
  return fetchApi(`/location/${id}`);
}
