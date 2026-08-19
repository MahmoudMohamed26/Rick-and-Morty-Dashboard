import { ApiError } from "@/lib/errors/api-error";

const BASE_URL = process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL!;

interface FetchOptions extends RequestInit {
  next?: { revalidate?: number; tags?: string[] };
}

export async function fetchApi<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const { next, ...fetchOptions } = options ?? {};

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    next,
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error: ${res.status} ${res.statusText}`);
  }

  if (res.status === 204) {
    return null as T;
  }

  return res.json() as Promise<T>;
}
