import { client } from "@/sanity/lib/client";
import { FEATURED_QUERY } from "@/sanity/lib/queries";
import { HomeClient, type FeaturedVehicle } from "./HomeClient";

// Static fallback when Sanity not configured
const STATIC: FeaturedVehicle[] = [
  { _id:"s1", year:2021, make:"Toyota",    model:"RAV4 XLE AWD",   price:24995, miles:32450, badge:"Best Value", img:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80" },
  { _id:"s2", year:2020, make:"Honda",     model:"CR-V EX-L",      price:22500, miles:41200, badge:"Popular",    img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80" },
  { _id:"s3", year:2019, make:"Ford",      model:"F-150 XLT 4WD",  price:28900, miles:58300,                    img:"https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80" },
  { _id:"s4", year:2021, make:"Chevrolet", model:"Silverado LT",   price:31900, miles:28100, badge:"New Arrival",img:"https://images.unsplash.com/photo-1503736334956-4c8f8e4733e8?w=600&q=80" },
];

export default async function HomePage() {
  let featured: FeaturedVehicle[] = STATIC;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await client.fetch(FEATURED_QUERY, {}, { next: { revalidate: 60 } });
      if (Array.isArray(raw) && raw.length > 0) {
        featured = raw.map(v => ({
          _id:   v._id,
          year:  v.year,
          make:  v.make,
          model: v.model,
          price: v.price,
          miles: v.miles,
          badge: v.badge,
          img:   v.img ?? undefined,
          kbbValue: v.kbbValue ?? undefined,
          fuel:     v.fuel ?? undefined,
          brandNew: v.brandNew ?? false,
        }));
      }
    } catch (e) {
      console.error("[Home] Sanity fetch failed:", e);
    }
  }

  return <HomeClient featuredVehicles={featured} />;
}
