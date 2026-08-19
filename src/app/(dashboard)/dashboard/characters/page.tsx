import { fetchCharacters } from "@/lib/apis/characters";
import { CharactersTable } from "./characters-table";
import { RateLimitBanner } from "@/components/global/rate-limit-banner";
import { ApiError } from "@/lib/errors/api-error";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; name?: string; status?: string; species?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1"));
  const filters = {
    name: params.name || undefined,
    status: params.status || undefined,
    species: params.species || undefined,
  };

  let data;
  try {
    data = await fetchCharacters(page, filters);
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      return <RateLimitBanner />;
    }
    data = { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }

  return (
    <CharactersTable
      initialData={data}
      initialPage={page}
      initialFilters={filters}
    />
  );
}
