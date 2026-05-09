"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Car, Phone, MapPin, ChevronLeft, CheckCircle,
  Gauge, Calendar, LayoutGrid, Star, Shield,
  ChevronLeft as Prev, ChevronRight as Next, Mail,
} from "lucide-react";

const PHONE     = "(717) 644-5444";
const PHONE_TEL = "+17176445444";
const EMAIL     = "Finemotorsautosales@gmail.com";
const MAPS_URL  = "https://www.google.com/maps/search/?api=1&query=Fine+Motors+LLC+Newmanstown+PA+17073";

function fmt(n: number)      { return new Intl.NumberFormat("en-US").format(n); }
function fmtPrice(n: number) { return "$" + fmt(n); }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function VehicleDetail({ vehicle, more = [] }: { vehicle: any; more?: any[] }) {
  const photos: string[] = [
    vehicle.img,
    ...(vehicle.gallery ?? []),
  ].filter(Boolean);

  const [activeIdx, setActiveIdx] = useState(0);

  function prev() { setActiveIdx(i => (i - 1 + photos.length) % photos.length); }
  function next() { setActiveIdx(i => (i + 1) % photos.length); }

  const specs = [
    { icon: Calendar,    label: "Year",      value: String(vehicle.year)              },
    { icon: Gauge,       label: "Mileage",   value: fmt(vehicle.miles) + " mi"        },
    { icon: LayoutGrid,  label: "Body Type", value: vehicle.body ?? "—"               },
    { icon: Star,        label: "Condition", value: "Pre-Owned"                        },
  ];

  return (
    <div className="min-h-dvh bg-white font-sans antialiased">

      {/* ── NAV ────────────────────────────────────────────────── */}
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/"          className="hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/inventory" className="text-orange-500 font-semibold">Inventory</Link>
            <Link href="/why-us"    className="hover:text-gray-900 transition-colors">Why Us</Link>
            <Link href="/contact"   className="hover:text-gray-900 transition-colors">Contact</Link>
          </nav>
          <a href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* ── HERO IMAGE ─────────────────────────────────────────── */}
      <div className="relative bg-gray-950 overflow-hidden" style={{ height: "clamp(280px, 50vw, 560px)" }}>
        <motion.img
          key={activeIdx}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          // eslint-disable-next-line @next/next/no-img-element
          src={photos[activeIdx] ? `${photos[activeIdx]}?w=1600&q=85` : ""}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Badge */}
        {vehicle.badge && (
          <span className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-bold">
            {vehicle.badge}
          </span>
        )}

        {/* Photo navigation */}
        {photos.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
              <Prev className="w-5 h-5" />
            </button>
            <button onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
              <Next className="w-5 h-5" />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button key={i} onClick={() => setActiveIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-orange-400" : "w-1.5 bg-white/50 hover:bg-white/80"}`} />
              ))}
            </div>
          </>
        )}

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/60 text-sm font-medium mb-1">{vehicle.year}</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {vehicle.make} {vehicle.model}
                </h1>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-0.5">Asking Price</p>
                <p className="text-3xl sm:text-4xl font-black text-orange-400">{fmtPrice(vehicle.price)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── THUMBNAIL GALLERY ──────────────────────────────────── */}
      {photos.length > 1 && (
        <div className="bg-gray-950 border-t border-white/5 px-6 py-3">
          <div className="mx-auto max-w-7xl flex gap-2 overflow-x-auto pb-1">
            {photos.map((url, i) => (
              <button key={i} onClick={() => setActiveIdx(i)}
                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIdx ? "border-orange-400 opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                }`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${url}?w=200&q=60`} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/"          className="hover:text-orange-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/inventory" className="hover:text-orange-500 transition-colors">Inventory</Link>
          <span>/</span>
          <span className="text-gray-600">{vehicle.year} {vehicle.make} {vehicle.model}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: specs + info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Key specs grid */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vehicle Specs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {specs.map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100">
                    <s.icon className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                    <p className="font-bold text-gray-900 text-sm">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key Features</h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f: string) => (
                    <span key={f}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-100 text-orange-700 text-sm font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">About This Vehicle</h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
                </div>
              </div>
            )}

            {/* Trust points */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Fine Motors Promise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Shield,       title: "No Hidden Fees",      desc: "The price you see is the price you pay. No surprises." },
                  { icon: CheckCircle,  title: "Personally Inspected", desc: "Igor inspects every vehicle before it goes on the lot." },
                  { icon: Star,         title: "5.0★ on Google",       desc: "25+ verified reviews from real customers in Lebanon County." },
                ].map(pt => (
                  <div key={pt.title} className="flex gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                      <pt.icon className="w-4.5 h-4.5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{pt.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: sticky contact panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Price card */}
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-900 px-6 py-5">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1">Asking Price</p>
                  <p className="text-4xl font-black text-orange-400">{fmtPrice(vehicle.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-semibold">Available</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <a href={`tel:${PHONE_TEL}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors">
                    <Phone className="w-4.5 h-4.5" />
                    Call {PHONE}
                  </a>
                  <a href={`mailto:${EMAIL}?subject=Interested in ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:border-orange-300 hover:text-orange-600 transition-all">
                    <Mail className="w-4.5 h-4.5" />
                    Send Email
                  </a>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-gray-500 text-sm font-semibold hover:text-orange-500 transition-colors">
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Business Hours</p>
                {[
                  { day: "Mon – Fri", time: "9:00 AM – 5:00 PM" },
                  { day: "Saturday",  time: "9:00 AM – 3:00 PM" },
                  { day: "Sunday",    time: "Closed"             },
                ].map(h => (
                  <div key={h.day} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{h.day}</span>
                    <span className={`text-sm font-semibold ${h.time === "Closed" ? "text-rose-500" : "text-gray-900"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-3">
                  📍 3910 Stiegel Pike, Newmanstown PA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/inventory"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Inventory
          </Link>
        </div>
      </div>

      {/* ── MORE CARS ──────────────────────────────────────────── */}
      {more.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">More Cars</p>
                <h2 className="text-2xl font-bold text-gray-900">Other Available Vehicles</h2>
              </div>
              <Link href="/inventory"
                className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">
                View All
                <Next className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {more.map((car, i) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/inventory/${car._id}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-40 overflow-hidden bg-gray-900">
                      {car.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${car.img}?w=400&q=75`}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Car className="w-12 h-12 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {car.badge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-orange-500 text-white text-[11px] font-bold">
                          {car.badge}
                        </span>
                      )}
                      <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-sm font-bold">
                        ${Number(car.price).toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 mb-0.5">{car.year}</p>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{car.make} {car.model}</h3>
                      <p className="text-xs text-gray-400 mt-1">{Number(car.miles).toLocaleString("en-US")} mi</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link href="/inventory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-all">
                View All Cars →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-8 mt-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center shrink-0">
              <Car className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white/40 font-semibold">Fine Motors LLC</span>
          </div>
          <span>© {new Date().getFullYear()} Fine Motors LLC. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/40 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-white/40 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
