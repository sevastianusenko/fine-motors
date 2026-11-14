import { notFound, permanentRedirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { VEHICLE_QUERY, MORE_VEHICLES_QUERY } from "@/sanity/lib/queries";
import { VehicleDetail } from "./VehicleDetail";

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  // The URL segment is the readable slug; older links still carry the document id.
  const { id: key } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let vehicle: any  = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let more: any[]   = [];

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    [vehicle, more] = await Promise.all([
      client.fetch(VEHICLE_QUERY, { key }, { next: { revalidate: 60 } }),
      client.fetch(MORE_VEHICLES_QUERY, { key }, { next: { revalidate: 60 } }),
    ]);
  }

  if (!vehicle || vehicle.status === "deleted" || vehicle.status === "draft") notFound();

  // Old /inventory/<document-id> links (already indexed by Google) → 308 to the readable URL
  if (vehicle.slug && vehicle.slug !== key) permanentRedirect(`/inventory/${vehicle.slug}`);

  return <VehicleDetail vehicle={vehicle} more={more} />;
}
