"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CharacterType } from "@/lib/types/character";

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

export function CharacterCard({ character }: { character: CharacterType }) {
  return (
    <Link
      href={`/dashboard/characters/${character.id}`}
      className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-3 transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-border/40">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold">{character.name}</h4>
        <p className="text-xs text-muted-foreground">
          {character.species}
          {character.gender !== "unknown" && ` · ${character.gender}`}
        </p>
      </div>
      <Badge
        variant="outline"
        className={`shrink-0 gap-1.5 text-xs ${statusColor[character.status] ?? statusColor.unknown}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${statusDot[character.status] ?? statusDot.unknown}`}
        />
        {character.status}
      </Badge>
    </Link>
  );
}
