"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/global/data-table";
import { useEpisodes } from "@/hooks/use-episodes";
import type { EpisodeType } from "@/lib/types/episode";
import type { ApiResponse } from "@/lib/types/api";

const columns: DataTableColumn<EpisodeType>[] = [
  { key: "episode", name: "Episode", sortable: true },
  { key: "name", name: "Name", sortable: true },
  { key: "air_date", name: "Air Date", sortable: true },
  {
    key: "characters",
    name: "Characters",
    sortable: false,
    cell: (value) => (
      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
        {(value as string[]).length}
      </span>
    ),
  },
];

interface EpisodesTableProps {
  initialData: ApiResponse<EpisodeType[]>;
  initialPage: number;
}

export function EpisodesTable({
  initialData,
  initialPage,
}: EpisodesTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useEpisodes(initialPage, initialData);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Episodes</h1>
        <p className="text-muted-foreground">
          Browse all {data?.info.count ?? "..."} episodes from Rick & Morty
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data?.results ?? []}
        entityLabel="episode"
        showRowNumber
        page={initialPage}
        totalPages={data?.info.pages ?? 1}
        onPageChange={handlePageChange}
        onView={(row) => router.push(`/dashboard/episodes/${row.id}`)}
      />
    </div>
  );
}
