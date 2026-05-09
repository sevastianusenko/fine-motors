import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { VEHICLE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { VehicleDetail } from "./VehicleDetail";

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let vehicle: any = null;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    vehicle = await client.fetch(
      VEHICLE_BY_ID_QUERY,
      { id },
      { next: { revalidate: 60 } }
    );
  }

  if (!vehicle) notFound();

  return <VehicleDetail vehicle={vehicle} />;
}
