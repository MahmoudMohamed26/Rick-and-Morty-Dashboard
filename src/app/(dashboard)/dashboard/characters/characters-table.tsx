"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable, type DataTableColumn } from "@/components/global/data-table";
import { useCharacters } from "@/hooks/use-characters";
import type { CharacterType } from "@/lib/types/character";
import type { CharacterFilters } from "@/lib/apis/characters";
import type { ApiResponse } from "@/lib/types/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import Image from "next/image";
import { statusColor, statusDot } from "@/lib/constants/character-status";

const SPECIES_OPTIONS = [
  "Human",
  "Alien",
  "Humanoid",
  "Animal",
  "Robot",
  "Mythological Creature",
  "Poopybutthole",
  "unknown",
];

const STATUS_OPTIONS = ["Alive", "Dead", "unknown"];

const columns: DataTableColumn<CharacterType>[] = [
  {
    key: "image",
    name: "#",
    sortable: false,
    cell: (value) => (
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={String(value)}
          alt="avatar"
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>
    ),
  },
  { key: "name", name: "Name", sortable: true },
  { key: "species", name: "Species", sortable: true },
  { key: "gender", name: "Gender", sortable: true },
  {
    key: "status",
    name: "Status",
    sortable: true,
    cell: (value) => {
      const s = String(value);
      return (
        <Badge
          variant="outline"
          className={`gap-1.5 text-xs ${statusColor[s] ?? statusColor.unknown}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${statusDot[s] ?? statusDot.unknown}`}
          />
          {s}
        </Badge>
      );
    },
  },
];

interface CharactersTableProps {
  initialData: ApiResponse<CharacterType[]>;
  initialPage: number;
  initialFilters: CharacterFilters;
}

export function CharactersTable({
  initialData,
  initialPage,
  initialFilters,
}: CharactersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(initialFilters.name ?? "");
  const { data } = useCharacters(initialPage, initialFilters, initialData);

  const pushFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    pushFilters({ name: searchInput.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Characters</h1>
        <p className="text-muted-foreground">
          Browse all {data?.info.count ?? "..."} characters from Rick & Morty
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-56"
          />
          <Button size="sm" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Select
          value={initialFilters.status ?? ""}
          onValueChange={(val) => pushFilters({ status: val })}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={initialFilters.species ?? ""}
          onValueChange={(val) => pushFilters({ species: val })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Species" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Species</SelectItem>
            {SPECIES_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(initialFilters.name || initialFilters.status || initialFilters.species) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchInput("");
              router.push("?page=1");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={data?.results ?? []}
        entityLabel="character"
        showRowNumber
        page={initialPage}
        totalPages={data?.info.pages ?? 1}
        onPageChange={handlePageChange}
        onView={(row) => router.push(`/dashboard/characters/${row.id}`)}
      />
    </div>
  );
}
