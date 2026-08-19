"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/global/data-table";
import { useLocations } from "@/hooks/use-locations";
import type { LocationType } from "@/lib/types/locations";
import type { ApiResponse } from "@/lib/types/api";

const columns: DataTableColumn<LocationType>[] = [
  { key: "name", name: "Name", sortable: true },
  { key: "type", name: "Type", sortable: true },
  { key: "dimension", name: "Dimension", sortable: true },
  {
    key: "residents",
    name: "Residents",
    sortable: false,
    cell: (value) => (
      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
        {(value as string[]).length}
      </span>
    ),
  },
];

interface LocationsTableProps {
  initialData: ApiResponse<LocationType[]>;
  initialPage: number;
}

export function LocationsTable({
  initialData,
  initialPage,
}: LocationsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useLocations(initialPage, initialData);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
        <p className="text-muted-foreground">
          Browse all {data?.info.count ?? "..."} locations from Rick & Morty
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data?.results ?? []}
        entityLabel="location"
        showRowNumber
        page={initialPage}
        totalPages={data?.info.pages ?? 1}
        onPageChange={handlePageChange}
        onView={(row) => router.push(`/dashboard/locations/${row.id}`)}
      />
    </div>
  );
}
