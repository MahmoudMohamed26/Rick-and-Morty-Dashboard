import { fetchCharacter } from "@/lib/apis/characters";
import { notFound } from "next/navigation";
import { CharacterDetail } from "./character-detail";
import { RateLimitBanner } from "@/components/global/rate-limit-banner";
import { ApiError } from "@/lib/errors/api-error";

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let character;
  try {
    character = await fetchCharacter(Number(id));
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      return <RateLimitBanner />;
    }
    notFound();
  }

  return <CharacterDetail character={character} />;
}
