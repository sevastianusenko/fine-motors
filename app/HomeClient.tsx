"use client";

import { motion, useInView, AnimatePresence, MotionConfig } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone, Star, Car, ShieldCheck, Users, ArrowRight,
  CheckCircle, Menu, X, MapPin, Mail, Clock,
} from "lucide-react";
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
  { icon: ShieldCheck, title: "Honest Pricing",    desc: "No hidden fees, no last-minute surprises. The price you see is the price you pay."            },
  { icon: Car,         title: "Quality Vehicles",  desc: "Every car is hand-picked and inspected. We only sell what we'd drive ourselves."              },
  { icon: CheckCircle, title: "No-Pressure Sales", desc: "Take your time, ask every question. We're here to help, not to rush you."                    },
  { icon: Users,       title: "Family-Owned",      desc: `Operated right here in Newmanstown, PA for over ${BUSINESS.yearsInBusiness} years.`          },
];

const STEPS = [
  { n: "01", title: "Browse Inventory",  desc: "Explore our selection of hand-picked vehicles with fair, transparent pricing."    },
  { n: "02", title: "Schedule a Visit",  desc: "Give us a call or stop by the lot. We'll have the car ready and waiting."        },
  { n: "03", title: "Drive It Home",     desc: "Simple paperwork, honest deal. Most customers are on the road the same day."     },
];

const REVIEWS = [
  { name: "Michael R.", location: "Lebanon County, PA", rating: 5, text: "Great experience from start to finish. No pressure, fair pricing, and the car was exactly as described. Highly recommend." },
  { name: "Sarah K.",   location: "Lebanon County, PA", rating: 5, text: "Family-run dealership with real integrity. They went above and beyond to make sure I was happy with my purchase."         },
  { name: "James P.",   location: "Lebanon County, PA", rating: 5, text: "Honest, straightforward, and friendly. I'll definitely come back when it's time for our next vehicle."                    },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchMake, setSearchMake] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-dvh bg-white text-gray-900 font-sans antialiased">

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
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
            {[["Inventory","/inventory"],["Why Us","/why-us"],["Reviews","#reviews"],["Contact","/contact"]].map(([label, href]) => (
              <Link key={label} href={href} className="hover:text-gray-900 transition-colors">{label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={`tel:${BUSINESS.phoneHref}`} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
              <Phone className="w-4 h-4" />{BUSINESS.phone}
            </a>
            <Link href="/inventory" className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
              View Cars
            </Link>
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(o => !o)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
              transition={{ duration:0.22, ease:[0.22,1,0.36,1] }} className="md:hidden overflow-hidden bg-white">
              <nav className="max-w-7xl mx-auto px-6 pb-4 flex flex-col gap-1">
                {[["Inventory","/inventory"],["Why Us","/why-us"],["Reviews","#reviews"],["Contact","/contact"]].map(([label, href]) => (
                  <Link key={label} href={href} onClick={() => setMobileOpen(false)}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-3 rounded-lg text-sm font-medium transition-colors">
                    {label}
                  </Link>
                ))}
                <a href={`tel:${BUSINESS.phoneHref}`} onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg text-sm font-semibold">
                  <Phone className="w-4 h-4" />{BUSINESS.phone}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#0a0e1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80" alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50" loading="eager" />
        <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,rgba(10,14,26,.82) 0%,rgba(15,23,42,.65) 50%,rgba(26,14,6,.78) 100%)" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(249,115,22,.10) 0%,transparent 65%)" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-28 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:[0.22,1,0.36,1]}}
              className="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/55">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shrink-0" />
              Family-Owned Since {new Date().getFullYear() - BUSINESS.yearsInBusiness} · Newmanstown, PA
            </motion.div>

            <motion.h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.04] tracking-tight mb-6"
              initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1,ease:[0.22,1,0.36,1]}}>
              Quality Used<br />
              <span className="text-orange-400">Cars. Honest</span><br />Prices.
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-white/45 max-w-md mb-10 leading-relaxed"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2,ease:[0.22,1,0.36,1]}}>
              No pressure. No hidden fees. {BUSINESS.yearsInBusiness}&nbsp;years serving Lebanon County.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-white/[0.08] backdrop-blur border border-white/10 max-w-2xl mb-10"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.3,ease:[0.22,1,0.36,1]}}>
              <select value={searchMake} onChange={e => setSearchMake(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400/50 cursor-pointer"
                style={{colorScheme:"dark"}}>
                <option value="">Any Make</option>
                {["Chevrolet","Dodge","Ford","Honda","Hyundai","Jeep","Nissan","Subaru","Toyota"].map(m=><option key={m}>{m}</option>)}
              </select>
              <select value={searchPrice} onChange={e => setSearchPrice(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400/50 cursor-pointer"
                style={{colorScheme:"dark"}}>
                <option value="">Any Price</option>
                <option value="1">Under $15k</option>
                <option value="2">$15k – $25k</option>
                <option value="3">$25k – $35k</option>
                <option value="4">$35k+</option>
              </select>
              <Link href="/inventory"
                className="px-8 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors whitespace-nowrap text-center">
                Search Cars
              </Link>
            </motion.div>

            <motion.div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/35"
              initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7,delay:0.4}}>
              {["No Hidden Fees","No-Pressure Sales","5.0★ Google Rating","Family-Owned"].map(t=>(
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />{t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
            {STATS.map(s => (
              <div key={s.label} className="py-8 px-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1 tabular-nums">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
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

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 overflow-hidden"
        style={{background:"linear-gradient(135deg,#0f172a 0%,#1a0e06 100%)"}}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <div className="text-xs font-semibold text-orange-400 tracking-widest uppercase mb-4">Get Started</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">Ready to Find<br />Your Next Car?</h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed">
              Browse our hand-picked inventory or give us a call.<br className="hidden sm:block" />
              We&apos;ll help you find the right fit — no pressure, ever.
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

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center shrink-0">
              <Car className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white/40 font-semibold tracking-tight">Fine Motors LLC</span>
          </div>
          <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white/40 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
    </MotionConfig>
  );
}
