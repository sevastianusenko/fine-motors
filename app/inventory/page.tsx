import type { Metadata } from "next";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { VEHICLES_QUERY } from "@/sanity/lib/queries";
import { InventoryClient, type Vehicle } from "./InventoryClient";

export const metadata: Metadata = {
  title: "Used Car Inventory — SUVs, Trucks & Sedans",
  description:
    "Browse Fine Motors LLC's current inventory in Newmanstown, PA. SUVs, trucks, sedans and more. Honest prices, no hidden fees, every car personally inspected. Call (717) 644-5444.",
};

// ── STATIC FALLBACK ───────────────────────────────────────────────────────
// Used when Sanity is not yet configured. Remove once CMS is set up.

const IMGS = [
  "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=640&q=75",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=640&q=75",
  "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=640&q=75",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&q=75",
  "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=640&q=75",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e4733e8?w=640&q=75",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=640&q=75",
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=640&q=75",
];

const STATIC_VEHICLES: Vehicle[] = [
  { id:"s1",  year:2021, make:"Toyota",    model:"RAV4 XLE AWD",            price:24995, miles: 32450, body:"SUV",       img:IMGS[0], badge:"Best Value"  },
  { id:"s2",  year:2019, make:"Toyota",    model:"Camry SE",                 price:16995, miles: 71300, body:"Sedan",     img:IMGS[4]                       },
  { id:"s3",  year:2016, make:"Toyota",    model:"Camry LE",                 price:13995, miles: 89200, body:"Sedan",     img:IMGS[5]                       },
  { id:"s4",  year:2020, make:"Honda",     model:"CR-V EX-L",                price:22500, miles: 41200, body:"SUV",       img:IMGS[1], badge:"Popular"      },
  { id:"s5",  year:2021, make:"Honda",     model:"Accord EX",                price:26500, miles: 19800, body:"Sedan",     img:IMGS[3], badge:"Low Miles"    },
  { id:"s6",  year:2018, make:"Honda",     model:"Pilot EX",                 price:22995, miles: 68400, body:"SUV",       img:IMGS[7]                       },
  { id:"s7",  year:2019, make:"Ford",      model:"F-150 XLT 4WD",            price:28900, miles: 58300, body:"Truck",     img:IMGS[2]                       },
  { id:"s8",  year:2017, make:"Ford",      model:"Edge SEL",                 price:15995, miles: 84500, body:"SUV",       img:IMGS[6]                       },
  { id:"s9",  year:2020, make:"Ford",      model:"Explorer XLT",             price:29900, miles: 38200, body:"SUV",       img:IMGS[0], badge:"New Arrival"  },
  { id:"s10", year:2021, make:"Chevrolet", model:"Silverado 1500 LT",        price:31900, miles: 28100, body:"Truck",     img:IMGS[2], badge:"New Arrival"  },
  { id:"s11", year:2018, make:"Chevrolet", model:"Equinox LT",               price:17500, miles: 64300, body:"SUV",       img:IMGS[1]                       },
  { id:"s12", year:2018, make:"Jeep",      model:"Grand Cherokee Laredo",    price:19500, miles: 67200, body:"SUV",       img:IMGS[7]                       },
  { id:"s13", year:2020, make:"Jeep",      model:"Wrangler Sport",           price:33900, miles: 32100, body:"SUV",       img:IMGS[5], badge:"Popular"      },
  { id:"s14", year:2019, make:"Nissan",    model:"Rogue SV",                 price:17995, miles: 52400, body:"SUV",       img:IMGS[4]                       },
  { id:"s15", year:2018, make:"Nissan",    model:"Altima 2.5 S",             price:14500, miles: 77800, body:"Sedan",     img:IMGS[3]                       },
  { id:"s16", year:2020, make:"Hyundai",   model:"Tucson SE",                price:18500, miles: 44100, body:"SUV",       img:IMGS[6]                       },
  { id:"s17", year:2019, make:"Hyundai",   model:"Elantra SEL",              price:13995, miles: 59700, body:"Sedan",     img:IMGS[5]                       },
  { id:"s18", year:2019, make:"Dodge",     model:"Ram 1500 Classic Express", price:25900, miles: 49800, body:"Truck",     img:IMGS[2]                       },
  { id:"s19", year:2020, make:"Mazda",     model:"CX-5 Touring AWD",         price:23500, miles: 36700, body:"SUV",       img:IMGS[0]                       },
  { id:"s20", year:2021, make:"Mazda",     model:"Mazda3 Sport AWD",         price:21500, miles: 18300, body:"Sedan",     img:IMGS[4], badge:"Low Miles"    },
  { id:"s21", year:2018, make:"Subaru",    model:"Outback 2.5i",             price:18995, miles: 62100, body:"Crossover", img:IMGS[1]                       },
  { id:"s22", year:2019, make:"Subaru",    model:"Forester Premium",         price:20995, miles: 47600, body:"SUV",       img:IMGS[7]                       },
  { id:"s23", year:2021, make:"Kia",       model:"Sorento LX AWD",           price:25500, miles: 24600, body:"SUV",       img:IMGS[3]                       },
  { id:"s24", year:2019, make:"GMC",       model:"Terrain SLE",              price:20500, miles: 55900, body:"SUV",       img:IMGS[6]                       },
];

// ── SERVER COMPONENT ──────────────────────────────────────────────────────

export default async function InventoryPage() {
  let vehicles: Vehicle[] = STATIC_VEHICLES;

  // Fetch from Sanity if configured
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await client.fetch(VEHICLES_QUERY, {}, { next: { revalidate: 60 } });
      if (Array.isArray(raw) && raw.length > 0) {
        vehicles = raw.map(v => ({
          id:     v._id,
          year:   v.year,
          make:   v.make,
          model:  v.model,
          price:  v.price,
          miles:  v.miles,
          body:   v.body   ?? "SUV",
          img:    v.img    ?? IMGS[0],
          badge:  v.badge  ?? undefined,
          status: v.status ?? "available",
        }));
      }
    } catch (err) {
      console.error("[Inventory] Sanity fetch failed, using static data:", err);
    }
  }

  return (
    <Suspense>
      <InventoryClient vehicles={vehicles} />
    </Suspense>
  );
}
