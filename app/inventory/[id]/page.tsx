import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { VEHICLE_BY_ID_QUERY } from "@/sanity/lib/queries";
import {
  Car, Phone, MapPin, ChevronLeft,
  CheckCircle, Gauge, Tag, Star,
} from "lucide-react";

const PHONE     = "(717) 644-5444";
const PHONE_TEL = "+17176445444";
const MAPS_URL  = "https://www.google.com/maps/search/?api=1&query=Fine+Motors+LLC+Newmanstown+PA+17073";

function fmt(n: number)      { return new Intl.NumberFormat("en-US").format(n); }
function fmtPrice(n: number) { return "$" + fmt(n); }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Vehicle = any;

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let vehicle: Vehicle = null;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    vehicle = await client.fetch(VEHICLE_BY_ID_QUERY, { id }, { next: { revalidate: 60 } });
  }

  if (!vehicle) notFound();

  const photos: string[] = [
    vehicle.img,
    ...(vehicle.gallery ?? []),
  ].filter(Boolean);

  return (
    <div className="min-h-dvh bg-white font-sans antialiased">

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-white" />
            </div>
            <div className="leading-none">
              <span className="font-bold text-[17px] tracking-tight text-gray-900 block">Fine Motors</span>
              <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold block mt-0.5">LLC · Newmanstown, PA</span>
            </div>
          </Link>
          <a href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/inventory" className="hover:text-orange-500 transition-colors">Inventory</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* PHOTOS */}
          <div className="space-y-3">
            {/* Main photo */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-[4/3]">
              {vehicle.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${vehicle.img}?w=1200&q=85`}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-24 h-24 text-gray-600" />
                </div>
              )}
              {vehicle.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-bold">
                  {vehicle.badge}
                </span>
              )}
            </div>

            {/* Gallery thumbnails */}
            {photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {photos.slice(1, 5).map((url: string, i: number) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={`${url}?w=300&q=75`}
                    alt={`Photo ${i + 2}`}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <p className="text-sm text-gray-400 font-medium mb-1">{vehicle.year}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {vehicle.make} {vehicle.model}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-orange-500">{fmtPrice(vehicle.price)}</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                Available
              </span>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Gauge className="w-5 h-5 text-orange-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-gray-900">{fmt(vehicle.miles)}</p>
                <p className="text-xs text-gray-500 font-medium">Miles</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Tag className="w-5 h-5 text-orange-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-gray-900">{vehicle.body}</p>
                <p className="text-xs text-gray-500 font-medium">Body</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Star className="w-5 h-5 text-orange-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-gray-900">{vehicle.year}</p>
                <p className="text-xs text-gray-500 font-medium">Year</p>
              </div>
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f: string) => (
                    <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-sm font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">About This Vehicle</h3>
                <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-3">
              <a href={`tel:${PHONE_TEL}`}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-orange-500 text-white font-bold text-base hover:bg-orange-600 transition-colors">
                <Phone className="w-5 h-5" />
                Call {PHONE}
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-base hover:border-orange-300 hover:text-orange-600 transition-all">
                <MapPin className="w-5 h-5" />
                Get Directions
              </a>
            </div>

            {/* Trust */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Fine Motors Promise</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />No hidden fees — price is final</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />Every vehicle personally inspected</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />No-pressure, family-owned dealership</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12">
          <Link href="/inventory"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Inventory
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-8 mt-16">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center shrink-0">
              <Car className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white/40 font-semibold">Fine Motors LLC</span>
          </div>
          <span>© {new Date().getFullYear()} Fine Motors LLC. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
