import { fetchLocation } from "@/lib/apis/locations";
import { notFound } from "next/navigation";
import { LocationDetail } from "./location-detail";

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let location;
  try {
    location = await fetchLocation(Number(id));
  } catch {
    notFound();
  }

  return <LocationDetail location={location} />;
}
