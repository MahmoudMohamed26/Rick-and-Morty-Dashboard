import { fetchCharacter } from "@/lib/apis/characters";
import { notFound } from "next/navigation";
import { CharacterDetail } from "./character-detail";

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let character;
  try {
    character = await fetchCharacter(Number(id));
  } catch {
    notFound();
  }

  return <CharacterDetail character={character} />;
}
