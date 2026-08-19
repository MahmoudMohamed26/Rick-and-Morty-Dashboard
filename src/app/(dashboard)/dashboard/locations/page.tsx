import { fetchLocations } from "@/lib/apis/locations";
import { LocationsTable } from "./locations-table";

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pageNum = Math.max(1, Number(page));
  const data = await fetchLocations(pageNum);

  return <LocationsTable initialData={data} initialPage={pageNum} />;
}
