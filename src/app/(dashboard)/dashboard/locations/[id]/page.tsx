import { fetchLocation } from "@/lib/apis/locations";
import { notFound } from "next/navigation";
import { LocationDetail } from "./location-detail";
import { RateLimitBanner } from "@/components/global/rate-limit-banner";
import { ApiError } from "@/lib/errors/api-error";

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let location;
  try {
    location = await fetchLocation(Number(id));
  } catch (e) {
    if (e instanceof ApiError && e.status === 429) {
      return <RateLimitBanner />;
    }
    notFound();
  }

  return <LocationDetail location={location} />;
}
