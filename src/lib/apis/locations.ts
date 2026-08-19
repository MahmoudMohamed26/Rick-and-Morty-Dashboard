import type { ApiResponse } from "../types/api";
import type { LocationType } from "../types/locations";
import { fetchApi } from "./client";

export async function fetchLocations(
  page: number = 1
): Promise<ApiResponse<LocationType[]>> {
  return fetchApi(`/location?page=${page}`);
}

export async function fetchLocation(id: number): Promise<LocationType> {
  return fetchApi(`/location/${id}`);
}
