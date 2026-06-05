"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car, Phone,
  SlidersHorizontal, X, Check, ChevronDown, ArrowRight,
} from "lucide-react";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";

// ── TYPES ─────────────────────────────────────────────────────────────────

export type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number;
  miles: number;
  body: string;
  img: string;
  badge?: string;
  status?: string;
};

// ── CONSTANTS ─────────────────────────────────────────────────────────────

const PHONE     = "(717) 644-5444";
const PHONE_TEL = "+17176445444";
const PER_PAGE  = 50;

const PRICE_RANGES = [
  { label: "Under $15k",  min: 0,     max: 15000    },
  { label: "$15k – $20k", min: 15000, max: 20000    },
  { label: "$20k – $25k", min: 20000, max: 25000    },
  { label: "$25k – $30k", min: 25000, max: 30000    },
  { label: "$30k+",       min: 30000, max: Infinity  },
];
const YEAR_RANGES = [
  { label: "2021+",        min: 2021, max: 9999 },
  { label: "2019 – 2020",  min: 2019, max: 2020 },
  { label: "2017 – 2018",  min: 2017, max: 2018 },
  { label: "2016 & older", min: 0,    max: 2016 },
];
const MILE_RANGES = [
  { label: "Under 30k", min: 0,     max: 30000   },
  { label: "30k – 60k", min: 30000, max: 60000   },
  { label: "60k – 90k", min: 60000, max: 90000   },
  { label: "90k+",      min: 90000, max: Infinity },
];
const SORT_OPTIONS = [
  { value: "year-desc",  label: "Newest First"         },
  { value: "price-asc",  label: "Price: Low to High"   },
  { value: "price-desc", label: "Price: High to Low"   },
  { value: "miles-asc",  label: "Mileage: Low to High" },
  { value: "year-asc",   label: "Oldest First"         },
];

// ── HELPERS ───────────────────────────────────────────────────────────────

function fmt(n: number)      { return new Intl.NumberFormat("en-US").format(n); }
function fmtPrice(n: number) { return "$" + fmt(n); }

// ── FILTER STATE ──────────────────────────────────────────────────────────

type Filters = {
  makes: string[]; priceRanges: string[]; yearRanges: string[];
  mileRanges: string[]; bodies: string[];
};
const EMPTY: Filters = { makes:[], priceRanges:[], yearRanges:[], mileRanges:[], bodies:[] };

// ── FILTER GROUP ──────────────────────────────────────────────────────────

function FilterGroup({ title, options, selected, onToggle, getCounts }: {
  title: string; options: string[]; selected: string[];
  onToggle: (v: string) => void; getCounts: (v: string) => number;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-4">
      <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full text-left">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {options.map(opt => {
            const count   = getCounts(opt);
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                onClick={() => (count > 0 || checked) && onToggle(opt)}
                className={`flex items-center justify-between gap-2 cursor-pointer group ${count === 0 && !checked ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors
                    ${checked ? "bg-orange-500 border-orange-500" : "border-gray-300 group-hover:border-orange-400"}`}>
                    {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm transition-colors ${checked ? "text-orange-600 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>
                    {opt}
                  </span>
                </div>
                <span className="text-xs text-gray-400 tabular-nums">({count})</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── MAIN CLIENT COMPONENT ─────────────────────────────────────────────────

export function InventoryClient({ vehicles }: { vehicles: Vehicle[] }) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => {
    const make  = searchParams.get("make");
    const price = searchParams.get("price");
    return {
      ...EMPTY,
      makes:       make  ? [make]  : [],
      priceRanges: price ? [price] : [],
    };
  });
  const [sort, setSort]       = useState("year-desc");
  const [mobileOpen, setMO]   = useState(false);
  const [sortOpen, setSO]     = useState(false);

  const available = useMemo(() => vehicles.filter(v => v.status !== "sold"), [vehicles]);
  const MAKES  = useMemo(() => [...new Set(available.map(v => v.make))].sort(), [available]);
  const BODIES = useMemo(() => [...new Set(available.map(v => v.body))].sort(), [available]);

  function toggle(key: keyof Filters, value: string) {
    setFilters(prev => {
      const arr  = prev[key] as string[];
      const next = arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
    setVisible(PER_PAGE);
  }

  function clearAll() { setFilters(EMPTY); setVisible(PER_PAGE); }

  const activeCount = Object.values(filters).flat().length;

  const filtered = useMemo(() => {
    let list = [...available];
    if (filters.makes.length)
      list = list.filter(v => filters.makes.includes(v.make));
    if (filters.bodies.length)
      list = list.filter(v => filters.bodies.includes(v.body));
    if (filters.priceRanges.length)
      list = list.filter(v =>
        filters.priceRanges.some(lbl => { const r = PRICE_RANGES.find(p => p.label === lbl)!; return v.price >= r.min && v.price < r.max; })
      );
    if (filters.yearRanges.length)
      list = list.filter(v =>
        filters.yearRanges.some(lbl => { const r = YEAR_RANGES.find(y => y.label === lbl)!; return v.year >= r.min && v.year <= r.max; })
      );
    if (filters.mileRanges.length)
      list = list.filter(v =>
        filters.mileRanges.some(lbl => { const r = MILE_RANGES.find(m => m.label === lbl)!; return v.miles >= r.min && v.miles < r.max; })
      );
    list.sort((a, b) => {
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "year-asc")   return a.year  - b.year;
      if (sort === "miles-asc")  return a.miles - b.miles;
      return b.year - a.year;
    });
    // sold cars always appear after available ones
    const sold = vehicles.filter(v => v.status === "sold");
    return [...list, ...sold];
  }, [available, vehicles, filters, sort]);

  function getCount(key: keyof Filters, value: string): number {
    const mf = { ...filters, [key]: [...(filters[key] as string[]).filter(v => v !== value), value] };
    let list = [...available];
    if (mf.makes.length)       list = list.filter(v => mf.makes.includes(v.make));
    if (mf.bodies.length)      list = list.filter(v => mf.bodies.includes(v.body));
    if (mf.priceRanges.length) list = list.filter(v => mf.priceRanges.some(lbl => { const r = PRICE_RANGES.find(p=>p.label===lbl)!; return v.price>=r.min && v.price<r.max; }));
    if (mf.yearRanges.length)  list = list.filter(v => mf.yearRanges.some(lbl => { const r = YEAR_RANGES.find(y=>y.label===lbl)!; return v.year>=r.min && v.year<=r.max; }));
    if (mf.mileRanges.length)  list = list.filter(v => mf.mileRanges.some(lbl => { const r = MILE_RANGES.find(m=>m.label===lbl)!; return v.miles>=r.min && v.miles<r.max; }));
    return list.length;
  }

  const [visible, setVisible] = useState(PER_PAGE);
  const paginated  = filtered.slice(0, visible);
  const hasMore    = visible < filtered.length;
  const currentSort = SORT_OPTIONS.find(o => o.value === sort)!;

  function loadMore() { setVisible(v => v + PER_PAGE); }

  const Sidebar = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-gray-900 text-sm">Filters</span>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">
            Clear all ({activeCount})
          </button>
        )}
      </div>
      <FilterGroup title="Make"       options={MAKES}                     selected={filters.makes}       onToggle={v=>toggle("makes",v)}       getCounts={v=>getCount("makes",v)} />
      <FilterGroup title="Price"      options={PRICE_RANGES.map(p=>p.label)} selected={filters.priceRanges} onToggle={v=>toggle("priceRanges",v)} getCounts={v=>getCount("priceRanges",v)} />
      <FilterGroup title="Year"       options={YEAR_RANGES.map(y=>y.label)}  selected={filters.yearRanges}  onToggle={v=>toggle("yearRanges",v)}  getCounts={v=>getCount("yearRanges",v)} />
      <FilterGroup title="Mileage"    options={MILE_RANGES.map(m=>m.label)}  selected={filters.mileRanges}  onToggle={v=>toggle("mileRanges",v)}  getCounts={v=>getCount("mileRanges",v)} />
      <FilterGroup title="Body Type"  options={BODIES}                    selected={filters.bodies}      onToggle={v=>toggle("bodies",v)}      getCounts={v=>getCount("bodies",v)} />
    </div>
  );

  return (
    <div className="min-h-dvh bg-gray-50 font-sans antialiased">

      <NavBar />

      {/* PAGE TITLE */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-700">Inventory</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">All Vehicles</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setMO(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>

          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">{filtered.length}</span> vehicle{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Sort */}
          <div className="relative ml-auto">
            <button
              onClick={() => setSO(o => !o)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-orange-300 transition-colors min-w-[200px] justify-between"
            >
              <span>{currentSort.label}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                  transition={{ duration:0.15 }}
                  className="absolute right-0 top-full mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setSO(false); setVisible(PER_PAGE); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                        ${sort === opt.value ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="flex gap-6 items-start">

          {/* Sidebar desktop */}
          <aside className="hidden lg:block w-60 shrink-0 bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <Sidebar />
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Car className="w-12 h-12 text-gray-200 mb-4" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">No vehicles match your filters</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting or removing some filters.</p>
                <button onClick={clearAll} className="px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map((car, i) => (
                  <motion.article
                    key={car.id}
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay: i * 0.05, duration:0.4, ease:[0.22,1,0.36,1] }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {car.status === "sold" ? (
                      /* ── SOLD CARD ─────────────────────────────── */
                      <Link href={`/inventory/${car.id}`} className="block opacity-80 hover:opacity-100 transition-opacity">
                        <div className="relative h-48 overflow-hidden bg-gray-900">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={car.img}
                            alt={`${car.year} ${car.make} ${car.model}`}
                            className="absolute inset-0 w-full h-full object-cover grayscale"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/50" />
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <span className="px-5 py-2 rounded-xl bg-red-600 text-white text-2xl font-black tracking-widest uppercase shadow-lg rotate-[-8deg]">
                              SOLD
                            </span>
                          </div>
                          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-white text-xs font-semibold z-10">
                            {car.body}
                          </span>
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white/60 text-sm font-bold line-through z-10">
                            {fmtPrice(car.price)}
                          </span>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-gray-400 font-medium mb-0.5">{car.year}</p>
                          <h3 className="font-bold text-gray-500 text-base leading-tight mb-3">{car.make} {car.model}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                            <span>{fmt(car.miles)} mi</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-red-500">SOLD</span>
                            <span className="text-xs text-gray-400 underline">View details →</span>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      /* ── AVAILABLE CARD ────────────────────────── */
                      <>
                        <Link href={`/inventory/${car.id}`} className="block">
                          <div className="relative h-48 overflow-hidden bg-gray-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={car.img}
                              alt={`${car.year} ${car.make} ${car.model}`}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                            {car.badge && (
                              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-orange-500 text-white text-xs font-bold z-10">
                                {car.badge}
                              </span>
                            )}
                            <span className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/55 backdrop-blur-sm text-white text-sm font-bold z-10">
                              {fmtPrice(car.price)}
                            </span>
                            <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-white text-xs font-semibold z-10">
                              {car.body}
                            </span>
                          </div>
                          <div className="p-4">
                            <p className="text-xs text-gray-400 font-medium mb-0.5">{car.year}</p>
                            <h3 className="font-bold text-gray-900 text-base leading-tight mb-3">{car.make} {car.model}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                              <span>{fmt(car.miles)} mi</span>
                              <span className="w-1 h-1 rounded-full bg-gray-200" />
                              <span className="text-emerald-600 font-medium flex items-center gap-1">
                                <Check className="w-3 h-3" strokeWidth={3} />
                                Inspected
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-gray-900">{fmtPrice(car.price)}</span>
                              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gray-100 group-hover:bg-orange-500 text-gray-600 group-hover:text-white text-xs font-bold transition-colors">
                                Details
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                        <div className="px-4 pb-4">
                          <a href={`tel:${PHONE_TEL}`}
                            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                            Call About This Car
                          </a>
                        </div>
                      </>
                    )}
                  </motion.article>
                ))}
              </div>
            )}

            {/* SHOW MORE */}
            {hasMore && (
              <div className="flex flex-col items-center gap-2 mt-10">
                <button onClick={loadMore}
                  className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors shadow-sm shadow-orange-200">
                  Show More ({filtered.length - visible} remaining)
                </button>
                <p className="text-xs text-gray-400">Showing {visible} of {filtered.length} vehicles</p>
              </div>
            )}
            {!hasMore && filtered.length > 0 && (
              <p className="text-center text-xs text-gray-400 mt-10">All {filtered.length} vehicles shown</p>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTERS */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMO(false)} />
            <motion.div
              initial={{x:"-100%"}} animate={{x:0}} exit={{x:"-100%"}}
              transition={{duration:0.3, ease:[0.22,1,0.36,1]}}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[90vw] bg-white shadow-2xl overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-bold text-gray-900">Filters</span>
                <button onClick={() => setMO(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5"><Sidebar /></div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                <button onClick={() => setMO(false)}
                  className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors">
                  Show {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {sortOpen && <div className="fixed inset-0 z-20" onClick={() => setSO(false)} />}

      <Footer />
    </div>
  );
}
