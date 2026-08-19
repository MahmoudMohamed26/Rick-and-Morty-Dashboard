"use client";

import Link from "next/link";
import { useCharactersByIds } from "@/hooks/use-characters";
import { CharacterCard } from "@/components/global/character-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import type { LocationType } from "@/lib/types/locations";

export function LocationDetail({ location }: { location: LocationType }) {
  const { data: characters, isLoading: charsLoading } = useCharactersByIds(
    location.residents
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/dashboard/locations"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to locations
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">{location.name}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            {location.type}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            {location.dimension}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {location.residents.length} residents
          </span>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Residents ({location.residents.length})</h2>
        {charsLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : characters && characters.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No residents found.</p>
        )}
      </div>
    </div>
  );
}
