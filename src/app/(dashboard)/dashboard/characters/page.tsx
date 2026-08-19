import { fetchCharacters } from "@/lib/apis/characters";
import { CharactersTable } from "./characters-table";

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
  const data = await fetchCharacters(page, filters);

  return (
    <CharactersTable
      initialData={data}
      initialPage={page}
      initialFilters={filters}
    />
  );
}
