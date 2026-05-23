"use client";

import { motion, useInView, MotionConfig } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  Phone, Star, Car, ShieldCheck, Users, ArrowRight,
  CheckCircle, MapPin, Mail, Clock,
} from "lucide-react";
import { NavBar } from "./components/NavBar";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";

// ── TYPES ─────────────────────────────────────────────────────────────────

export type FeaturedVehicle = {
  _id: string;
  year: number;
  make: string;
  model: string;
  price: number;
  miles: number;
  badge?: string;
  img?: string;
};

// ── CONSTANTS ─────────────────────────────────────────────────────────────

const BUSINESS = {
  name: "Fine Motors LLC",
  yearsInBusiness: 15,
  rating: 5.0,
  reviewCount: 25,
  address: { street: "3910 Stiegel Pike", city: "Newmanstown", state: "PA", zip: "17073" },
  phone: "(717) 644-5444",
  phoneHref: "+17176445444",
  email: "Finemotorsautosales@gmail.com",
  hours: [
    { day: "Mon – Fri", time: "9:00 AM – 5:00 PM" },
    { day: "Saturday",  time: "9:00 AM – 3:00 PM" },
    { day: "Sunday",    time: "Closed" },
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Fine+Motors+LLC+Newmanstown+PA",
};

const STATS = [
  { value: `${BUSINESS.yearsInBusiness}+`, label: "Years Local"      },
  { value: `${BUSINESS.rating.toFixed(1)}★`, label: "Google Rating"  },
  { value: `${BUSINESS.reviewCount}+`,       label: "Happy Customers" },
  { value: "$0",                              label: "Hidden Fees"     },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Honest Pricing",    desc: "No hidden fees, no last-minute surprises. The price you see is the price you pay."  },
  { icon: Car,         title: "Quality Vehicles",  desc: "Every car is hand-picked and personally inspected. We only sell what we'd drive ourselves." },
  { icon: CheckCircle, title: "No-Pressure Sales", desc: "Take your time, ask every question. We're here to help you find the right car, not to rush you into anything." },
  { icon: Users,       title: "Family-Owned",      desc: `Igor and his family have been right here in Newmanstown for over ${BUSINESS.yearsInBusiness} years. You deal with the owner, not a salesperson.` },
];

const STEPS = [
  { n: "01", title: "Browse Inventory",  desc: "Check out our current selection online or just stop by. Every car is priced fairly with no games."  },
  { n: "02", title: "Come Take a Look",  desc: "Give us a call or swing by the lot. No appointment needed. We'll have the car ready for you."       },
  { n: "03", title: "Drive It Home",     desc: "Straightforward paperwork, honest price. Most people are on the road the same day they visit."      },
];

const REVIEWS = [
  { name: "Michael R.", location: "Lebanon, PA",        rating: 5, text: "Bought my RAV4 here last spring. No pressure at all, price was fair, and the car was exactly what they said. Really good experience." },
  { name: "Sarah K.",   location: "Palmyra, PA",        rating: 5, text: "Igor was great to work with. Didn't try to upsell me on anything. Drove 40 minutes to get here and it was worth it."                  },
  { name: "James P.",   location: "Myerstown, PA",      rating: 5, text: "Honest people. Car was clean, priced right, and they had the paperwork done fast. Already told my brother to go there."                 },
];

// ── HELPERS ───────────────────────────────────────────────────────────────

function fmt(n: number)      { return new Intl.NumberFormat("en-US").format(n); }
function fmtPrice(n: number) { return "$" + fmt(n); }

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────

export function HomeClient({ featuredVehicles }: { featuredVehicles: FeaturedVehicle[] }) {
  const [searchMake, setSearchMake]   = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  const makes = useMemo(
    () => [...new Set(featuredVehicles.map(v => v.make))].sort(),
    [featuredVehicles]
  );

  const inventoryHref = useMemo(() => {
    const p = new URLSearchParams();
    if (searchMake)  p.set("make",  searchMake);
    if (searchPrice) p.set("price", searchPrice);
    const q = p.toString();
    return `/inventory${q ? `?${q}` : ""}`;
  }, [searchMake, searchPrice]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-dvh bg-white text-gray-900 font-sans antialiased">

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <NavBar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#04060f]">

        <style>{`
          @keyframes hero-shimmer {
            0%   { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          .shimmer-text {
            background: linear-gradient(90deg,#f97316 0%,#fbbf24 25%,#fed7aa 50%,#f97316 75%,#ea580c 100%);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: hero-shimmer 4s linear infinite;
          }
          #search-make option, #search-price option {
            background-color: #111827;
            color: #ffffff;
          }
        `}</style>

        {/* Ken Burns — slow continuous zoom-in */}
        <motion.div className="absolute inset-0"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.10 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80" alt=""
            className="w-full h-full object-cover object-center opacity-[0.30]" loading="eager" />
        </motion.div>

        {/* Directional gradient — dark left, opens toward image right */}
        <div className="absolute inset-0" style={{
          background:"linear-gradient(to right,rgba(4,6,15,0.98) 0%,rgba(4,6,15,0.85) 42%,rgba(4,6,15,0.40) 100%)"
        }} />
        {/* Bottom vignette */}
        <div className="absolute inset-0" style={{
          background:"linear-gradient(to top,rgba(4,6,15,1) 0%,transparent 32%)"
        }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

        {/* Orb — large orange, top-left */}
        <motion.div className="absolute pointer-events-none"
          style={{ top:"-12%", left:"-8%", width:1000, height:1000, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(249,115,22,.10) 0%,transparent 58%)" }}
          animate={{ y:[-40,40,-40], x:[-20,20,-20] }}
          transition={{ duration:11, repeat:Infinity, ease:"easeInOut" }}
        />
        {/* Orb — indigo, bottom-right */}
        <motion.div className="absolute pointer-events-none"
          style={{ bottom:"-15%", right:"-5%", width:700, height:700, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 58%)" }}
          animate={{ y:[35,-35,35], x:[20,-20,20] }}
          transition={{ duration:13, repeat:Infinity, ease:"easeInOut", delay:2 }}
        />
        {/* Orb — gold accent, mid-right */}
        <motion.div className="absolute pointer-events-none"
          style={{ top:"28%", right:"10%", width:380, height:380, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(251,191,36,.05) 0%,transparent 65%)" }}
          animate={{ y:[-22,22,-22] }}
          transition={{ duration:8, repeat:Infinity, ease:"easeInOut", delay:1 }}
        />

        {/* Diagonal light sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{ position:"absolute", inset:0,
              background:"linear-gradient(105deg,transparent 37%,rgba(255,255,255,.032) 50%,transparent 63%)" }}
            initial={{ x:"-100%" }}
            animate={{ x:"200%" }}
            transition={{ duration:4, repeat:Infinity, repeatDelay:9, ease:"easeInOut", delay:2.5 }}
          />
        </div>

        {/* Vertical side accent — luxury editorial detail */}
        <motion.div className="absolute left-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3"
          initial={{ opacity:0, x:-10 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.9, delay:1.1, ease:[0.16,1,0.3,1] }}
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-white/[0.10]" />
          <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/12"
            style={{ writingMode:"vertical-lr", transform:"rotate(180deg)" }}>
            Est. {new Date().getFullYear() - BUSINESS.yearsInBusiness}
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-white/[0.10] to-transparent" />
        </motion.div>

        {/* ── Main content ───────────────────────── */}
        <div className="relative mx-auto max-w-7xl px-8 lg:px-16 py-36 w-full">
          <div className="max-w-3xl">

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 mb-9 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm text-[11px] text-white/35 tracking-wide"
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shrink-0" />
              Family-Owned · Newmanstown, PA · Est. {new Date().getFullYear() - BUSINESS.yearsInBusiness}
              <span className="w-px h-3 bg-white/10" />
              <span className="text-orange-400/70 text-[9px]">★★★★★</span>
              <span className="text-white/20">5.0 Google</span>
            </motion.div>

            {/* Overline + drawing accent line */}
            <div className="mb-5">
              <motion.p
                className="text-orange-400/65 font-semibold text-[11px] uppercase tracking-[0.28em] mb-2.5"
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ duration:0.5, delay:0.18 }}
              >
                Fine Motors LLC
              </motion.p>
              <div className="overflow-hidden h-px w-32">
                <motion.div className="h-full bg-gradient-to-r from-orange-500/60 via-orange-400/30 to-transparent"
                  initial={{ x:"-100%" }}
                  animate={{ x:"0%" }}
                  transition={{ duration:1.1, delay:0.22, ease:[0.16,1,0.3,1] }}
                />
              </div>
            </div>

            {/* H1 — line-by-line cinematic reveal */}
            <h1 className="mb-7 tracking-tight">
              <div className="overflow-hidden">
                <motion.div
                  className="text-5xl sm:text-6xl lg:text-[5.8rem] font-bold text-white leading-[1.04]"
                  initial={{ y:"108%" }}
                  animate={{ y:"0%" }}
                  transition={{ duration:0.82, delay:0.28, ease:[0.16,1,0.3,1] }}
                >
                  Quality Used
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  className="text-5xl sm:text-6xl lg:text-[5.8rem] font-bold leading-[1.04]"
                  initial={{ y:"108%" }}
                  animate={{ y:"0%" }}
                  transition={{ duration:0.82, delay:0.38, ease:[0.16,1,0.3,1] }}
                >
                  <span className="shimmer-text">Cars.</span>
                  <span className="text-white"> Honest</span>
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  className="text-5xl sm:text-6xl lg:text-[5.8rem] font-bold text-white/60 leading-[1.04]"
                  initial={{ y:"108%" }}
                  animate={{ y:"0%" }}
                  transition={{ duration:0.82, delay:0.48, ease:[0.16,1,0.3,1] }}
                >
                  Prices.
                </motion.div>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.p className="text-sm sm:text-base text-white/28 max-w-xs mb-10 leading-relaxed"
              initial={{ opacity:0, y:12 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.60, ease:[0.16,1,0.3,1] }}
            >
              No pressure. No hidden fees.<br />{BUSINESS.yearsInBusiness}&nbsp;years serving Lebanon County.
            </motion.p>

            {/* Search bar */}
            <motion.div
              className="flex flex-col sm:flex-row gap-1.5 p-1.5 rounded-2xl bg-white/[0.05] backdrop-blur border border-white/[0.08] max-w-2xl mb-10"
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.70, ease:[0.16,1,0.3,1] }}
            >
              <label htmlFor="search-make" className="sr-only">Filter by make</label>
              <select id="search-make" value={searchMake} onChange={e => setSearchMake(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/[0.07] text-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/40 cursor-pointer"
                style={{colorScheme:"dark"}}>
                <option value="">Any Make</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <label htmlFor="search-price" className="sr-only">Filter by price</label>
              <select id="search-price" value={searchPrice} onChange={e => setSearchPrice(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/[0.07] text-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/40 cursor-pointer"
                style={{colorScheme:"dark"}}>
                <option value="">Any Price</option>
                <option value="Under $15k">Under $15k</option>
                <option value="$15k – $20k">$15k – $20k</option>
                <option value="$20k – $25k">$20k – $25k</option>
                <option value="$25k – $30k">$25k – $30k</option>
                <option value="$30k+">$30k+</option>
              </select>
              <Link href={inventoryHref}
                className="px-8 py-3.5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 active:scale-[0.97] transition-all whitespace-nowrap text-center">
                View Inventory
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/22"
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.7, delay:0.80 }}
            >
              {["No Hidden Fees","No-Pressure Sales","5.0★ Google","Family-Owned 15+ yrs"].map(t=>(
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-400/55 shrink-0" />{t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom glassmorphism info strip ─────── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 border-t border-white/[0.055] bg-white/[0.022] backdrop-blur-xl"
          initial={{ opacity:0, y:14 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:1.05, ease:[0.16,1,0.3,1] }}
        >
          <div className="mx-auto max-w-7xl px-8 lg:px-16 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-6 text-[11px] text-white/22">
              <a href={`tel:${BUSINESS.phoneHref}`} className="flex items-center gap-1.5 hover:text-white/45 transition-colors cursor-pointer">
                <Phone className="w-3 h-3 text-orange-400/45 shrink-0" />
                {BUSINESS.phone}
              </a>
              <span className="hidden sm:flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-orange-400/45 shrink-0" />
                {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state}
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-orange-400/45 shrink-0" />
                Mon–Fri 9–5 · Sat 9–3
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/14">
              <span className="text-orange-400/35 text-[9px]">★★★★★</span>
              5.0 · Google Reviews
            </div>
          </div>
        </motion.div>

        {/* Mouse scroll indicator */}
        <div className="absolute bottom-20 right-10 hidden lg:flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/12">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/[0.13] flex justify-center pt-1.5">
            <motion.div className="w-1 h-2 rounded-full bg-white/25"
              animate={{ y:[0,14,0], opacity:[0.7,0.05,0.7] }}
              transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
            />
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
            {STATS.map(s => (
              <div key={s.label} className="py-8 px-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1 tabular-nums">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED INVENTORY (from Sanity) ──────────────────────── */}
      <section id="inventory" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-2">Inventory</div>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Featured Vehicles</h2>
              </div>
              <Link href="/inventory"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                View All Cars
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredVehicles.map((car, i) => (
              <motion.article key={car._id}
                initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
                viewport={{once:true,margin:"-40px"}}
                transition={{delay:i*0.1,duration:0.55,ease:[0.22,1,0.36,1]}}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/inventory/${car._id}`} className="block">
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    {car.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`${car.img}?w=600&q=80`} alt={`${car.year} ${car.make} ${car.model}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <Car className="w-16 h-16 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {car.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-orange-500 text-white text-xs font-bold z-10">
                        {car.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white text-sm font-bold z-10">
                      {fmtPrice(car.price)}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{car.year}</div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{car.make} {car.model}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                      <span>{fmt(car.miles)} mi</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <CheckCircle className="w-3 h-3" strokeWidth={3} />Inspected
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <a href={`tel:${BUSINESS.phoneHref}`}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors">
                    <Phone className="w-3.5 h-3.5" />Call About This
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/inventory"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:border-orange-400 hover:text-orange-600 transition-all">
              View Full Inventory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────── */}
      <section id="why-us" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="text-center mb-16">
            <div className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-3">Why Fine Motors</div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">The difference is in<br className="hidden sm:block" /> the details.</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
                viewport={{once:true,margin:"-40px"}} transition={{delay:i*0.1,duration:0.55,ease:[0.22,1,0.36,1]}} className="text-center">
                <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-orange-50 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="text-center mb-16">
            <div className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-3">The Process</div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">How It Works</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div key={step.n} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
                viewport={{once:true,margin:"-40px"}} transition={{delay:i*0.12,duration:0.55,ease:[0.22,1,0.36,1]}}
                className="relative text-center">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-orange-100" />
                )}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center shadow-sm relative z-10">
                  <span className="text-base font-bold text-orange-500 font-mono">{step.n}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section id="reviews" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="text-center mb-16">
            <div className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-3">Reviews</div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">What Our Customers Say</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div key={i} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
                viewport={{once:true,margin:"-40px"}} transition={{delay:i*0.12,duration:0.55,ease:[0.22,1,0.36,1]}}
                className="p-7 rounded-2xl border border-gray-100 bg-gray-50/80 hover:border-orange-100 hover:bg-orange-50/20 transition-colors">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(r.rating)].map((_,idx)=><Star key={idx} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ──────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp className="text-center mb-8">
            <div className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-2">Where We Serve</div>
            <h2 className="text-2xl font-bold text-gray-900">Serving All of Central Pennsylvania</h2>
            <p className="text-gray-400 text-sm mt-2">People drive from all over Central PA to buy from us. Fair price, straight talk, no hassle.</p>
          </FadeUp>
          <FadeUp>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Lebanon, PA","Palmyra, PA","Myerstown, PA","Annville, PA",
                "Jonestown, PA","Hershey, PA","Harrisburg, PA","Reading, PA",
                "Lancaster, PA","Elizabethtown, PA","Ephrata, PA","Lititz, PA",
                "Quakertown, PA","Pottsville, PA","Kutztown, PA",
              ].map(city => (
                <span key={city}
                  className="px-3.5 py-1.5 rounded-full border border-gray-200 text-sm text-gray-500 bg-gray-50">
                  {city}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp className="text-center mb-12">
            <div className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-3">FAQ</div>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </FadeUp>
          <FadeUp>
            <div className="space-y-4">
              {[
                {
                  q: "Where is Fine Motors LLC located?",
                  a: "We're at 3910 Stiegel Pike, Newmanstown, PA 17073. Right in Lebanon County. Easy to find, free parking, no appointment needed.",
                },
                {
                  q: "What kinds of vehicles do you sell?",
                  a: "Mostly sedans, SUVs, crossovers, and trucks. Igor personally picks and inspects every car before it goes on the lot. If it doesn't meet his standards, it doesn't go up for sale.",
                },
                {
                  q: "Are there any hidden fees?",
                  a: "Nope. The price on the car is what you pay. No dealer fees, no documentation surprises, nothing added on at the end. What you see is what you get.",
                },
                {
                  q: "Do you take trade-ins?",
                  a: "Yes. Call us at (717) 644-5444 and tell us about your car. We'll give you a straight answer on what it's worth and apply it toward your purchase.",
                },
                {
                  q: "Can I take it for a test drive?",
                  a: "Of course. Just call ahead or stop by during business hours. Mon-Fri 9am to 5pm, Saturday 9am to 3pm. No appointment necessary.",
                },
                {
                  q: "How long has Fine Motors been open?",
                  a: `We've been here in Newmanstown for over ${BUSINESS.yearsInBusiness} years. Most of our business comes from repeat customers and referrals. That's how we know we're doing something right.`,
                },
                {
                  q: "How far do people come to buy from you?",
                  a: "People come from Lebanon, Palmyra, Myerstown, Hershey, Harrisburg, Reading, Lancaster, and beyond. Some drive over an hour. We think that says a lot.",
                },
              ].map((item, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-gray-900 list-none hover:text-orange-600 transition-colors">
                    {item.q}
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 font-bold text-lg group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 overflow-hidden"
        style={{background:"linear-gradient(135deg,#0f172a 0%,#1a0e06 100%)"}}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <div className="text-xs font-semibold text-orange-400 tracking-widest uppercase mb-4">Get Started</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">Ready to Find<br />Your Next Car?</h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed">
              Come see what we have on the lot, or just give us a call.<br className="hidden sm:block" />
              We&apos;ll help you find the right car. No pressure, ever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/inventory" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-center">
                Browse Inventory
              </Link>
              <a href={`tel:${BUSINESS.phoneHref}`} className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 text-white/70 font-medium hover:border-white/30 hover:text-white transition-all text-center">
                Call {BUSINESS.phone}
              </a>
            </div>
            <div className="mt-12 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/25">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Mon–Fri 9am–5pm · Sat 9am–3pm</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{BUSINESS.email}</span>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />

    </div>
    </MotionConfig>
  );
}
