"use client";

import Link from "next/link";
import Image from "next/image";
import { useEpisodesByIds } from "@/hooks/use-episodes";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Tv } from "lucide-react";
import type { CharacterType } from "@/lib/types/character";
import InfoRow from "@/components/global/info-row";

const statusColor: Record<string, string> = {
  Alive: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  Dead: "bg-red-500/10 text-red-700 border-red-500/20",
  unknown: "bg-gray-500/10 text-gray-700 border-gray-500/20",
};

const statusDot: Record<string, string> = {
  Alive: "bg-emerald-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-500",
};

function extractIdFromUrl(url: string): string | null {
  const match = url.match(/\/(\d+)$/);
  return match ? match[1] : null;
}

export function CharacterDetail({ character }: { character: CharacterType }) {
  const { data: episodes, isLoading: epsLoading } = useEpisodesByIds(
    character.episode
  );

  const originId = extractIdFromUrl(character.origin.url);
  const locationId = extractIdFromUrl(character.location.url);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/characters"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to characters
      </Link>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-xl border-2 border-border/40">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {character.name}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={`gap-1.5 text-xs ${statusColor[character.status] ?? statusColor.unknown}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${statusDot[character.status] ?? statusDot.unknown}`}
                />
                {character.status}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {character.species}
              </Badge>
              {character.type && (
                <Badge variant="secondary" className="text-xs">
                  {character.type}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {character.gender}
              </Badge>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow
              icon={MapPin}
              label="Origin"
              value={character.origin.name}
              href={originId ? `/dashboard/locations/${originId}` : undefined}
            />
            <InfoRow
              icon={MapPin}
              label="Last Known Location"
              value={character.location.name}
              href={locationId ? `/dashboard/locations/${locationId}` : undefined}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Episode Appearances ({character.episode.length})
        </h2>
        {epsLoading ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
          </div>
        ) : episodes && episodes.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {episodes
              .sort((a, b) => a.id - b.id)
              .map((ep) => (
                <Link
                  key={ep.id}
                  href={`/dashboard/episodes/${ep.id}`}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3 transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Tv className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{ep.episode}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {ep.name}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No episodes found.</p>
        )}
      </div>
    </div>
  );
}
