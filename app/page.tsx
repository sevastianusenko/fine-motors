"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Phone, MapPin, Clock, Mail, Star, Car, ShieldCheck,
  Users, ArrowRight, CheckCircle,
} from "lucide-react";
import Link from "next/link";

const BUSINESS = {
  name: "Fine Motors LLC",
  tagline: "Quality Used Cars in Lebanon County",
  yearsInBusiness: 15,
  rating: 5.0,
  reviewCount: 25,
  address: {
    street: "3910 Stiegel Pike",
    city: "Newmanstown",
    state: "PA",
    zip: "17073",
  },
  phone: "(717) 644-5444",
  phoneHref: "+17176445444",
  email: "Finemotorsautosales@gmail.com",
  hours: [
    { day: "Mon – Fri", time: "9:00 AM – 5:00 PM" },
    { day: "Saturday", time: "9:00 AM – 3:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Fine+Motors+LLC+Newmanstown+PA",
};

const FEATURED_VEHICLES = [
  { id: 1, year: 2021, make: "Toyota", model: "RAV4 XLE AWD",   price: 24995, miles: 32450, badge: "Best Value" },
  { id: 2, year: 2020, make: "Honda",  model: "CR-V EX-L",       price: 22500, miles: 41200, badge: "Popular" },
  { id: 3, year: 2019, make: "Ford",   model: "F-150 XLT 4WD",   price: 28900, miles: 58300, badge: null },
];

const REVIEWS = [
  {
    name: "Michael R.",
    initial: "M",
    rating: 5,
    text: "Great experience from start to finish. No pressure, fair pricing, and the car was exactly as described. Highly recommend.",
  },
  {
    name: "Sarah K.",
    initial: "S",
    rating: 5,
    text: "Family-run dealership with real integrity. They went above and beyond to make sure I was happy with my purchase.",
  },
  {
    name: "James P.",
    initial: "J",
    rating: 5,
    text: "Honest, straightforward, and friendly. I'll definitely come back when it's time for our next vehicle.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMiles(miles: number) {
  return new Intl.NumberFormat("en-US").format(miles) + " mi";
}

function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="leading-none">
              <span className="text-[#0B1F3A] font-bold text-[17px] tracking-tight block">Fine Motors</span>
              <span className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold block mt-0.5">LLC</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {["Inventory", "About", "Reviews", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-500 hover:text-[#0B1F3A] transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <a
            href={`tel:${BUSINESS.phoneHref}`}
            className="hidden sm:inline-flex items-center gap-2 bg-[#0B1F3A] hover:bg-[#162E50] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS.phone}
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#0B1F3A] overflow-hidden">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* radial glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* rating badge */}
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#FCD34D] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-10">
              <Star className="w-3.5 h-3.5 fill-current" />
              {BUSINESS.rating.toFixed(1)} Google Rating · {BUSINESS.reviewCount}+ Reviews
            </div>

            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold text-white leading-[1.0] tracking-tight max-w-xl">
              Quality<br />
              <span className="text-[#F59E0B]">Vehicles.</span><br />
              Honest Prices.
            </h1>

            <p className="mt-8 text-slate-400 text-lg md:text-xl max-w-md leading-relaxed">
              Family-owned dealership in Newmanstown, PA.{" "}
              {BUSINESS.yearsInBusiness}&nbsp;years of trusted service to Lebanon County.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="#inventory"
                className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-extrabold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/20"
              >
                Browse Inventory
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors"
              >
                Visit Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${BUSINESS.yearsInBusiness}+`, label: "Years Local" },
              { value: `${BUSINESS.rating.toFixed(1)}★`, label: "Google Rating" },
              { value: `${BUSINESS.reviewCount}+`,      label: "Happy Customers" },
              { value: "100%",                           label: "Family-Owned" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
              >
                <div className="text-3xl font-extrabold text-[#0B1F3A]">{stat.value}</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mt-1.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVENTORY ────────────────────────────────────────────── */}
      <section id="inventory" className="max-w-6xl mx-auto px-6 py-24">
        <FadeUp>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[#F59E0B] text-[11px] font-extrabold uppercase tracking-widest mb-2">Inventory</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">Featured Vehicles</h2>
            </div>
            <Link href="#" className="text-sm font-bold text-[#0B1F3A] hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1.5">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_VEHICLES.map((v, i) => (
            <motion.article
              key={v.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/70 transition-shadow cursor-pointer group"
            >
              {/* image placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-[#0B1F3A] to-[#193860] flex items-center justify-center relative overflow-hidden">
                <Car className="w-24 h-24 text-white/10" />
                {/* shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                {v.badge && (
                  <span className="absolute top-3 left-3 bg-[#F59E0B] text-[#0B1F3A] text-[11px] font-extrabold px-3 py-1 rounded-lg">
                    {v.badge}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-[#0B1F3A] text-lg leading-tight">
                      {v.year} {v.make}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium mt-0.5">{v.model}</p>
                  </div>
                  <span className="text-xl font-extrabold text-[#0B1F3A] whitespace-nowrap">
                    {formatPrice(v.price)}
                  </span>
                </div>

                <p className="mt-3 text-slate-400 text-sm">{formatMiles(v.miles)}</p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#F59E0B] transition-colors inline-flex items-center gap-1.5">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wide font-semibold">Pre-owned</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="bg-[#0B1F3A]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <FadeUp className="text-center mb-16">
            <p className="text-[#F59E0B] text-[11px] font-extrabold uppercase tracking-widest mb-3">Why Fine Motors</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              A different kind of dealership
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto leading-relaxed">
              No tricks, no pressure — just honest service from a family that&apos;s been here for {BUSINESS.yearsInBusiness} years.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: ShieldCheck,
                title: "Honest Pricing",
                text: "No hidden fees, no last-minute surprises. The price you see is the price you pay.",
                accent: "#10B981",
              },
              {
                icon: Car,
                title: "Quality Vehicles",
                text: "Every car is hand-picked and inspected. We only sell what we'd drive ourselves.",
                accent: "#F59E0B",
              },
              {
                icon: Users,
                title: "Local & Trusted",
                text: `Family-owned and operated in Newmanstown, PA for over ${BUSINESS.yearsInBusiness} years.`,
                accent: "#818CF8",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${item.accent}20` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.accent }} />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────── */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-24">
        <FadeUp className="text-center mb-16">
          <p className="text-[#F59E0B] text-[11px] font-extrabold uppercase tracking-widest mb-3">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            What our customers say
          </h2>
          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
            <span className="ml-2 text-slate-500 text-sm font-medium">5.0 on Google</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-200">
                <div className="w-9 h-9 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-sm font-extrabold shrink-0">
                  {r.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B1F3A]">{r.name}</p>
                  <p className="text-xs text-slate-400">Google Review</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeUp>
            <p className="text-[#F59E0B] text-[11px] font-extrabold uppercase tracking-widest mb-3">Visit Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1F3A] leading-tight mb-6 tracking-tight">
              Stop by the lot —<br />we&apos;d love to meet you
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Located right off Stiegel Pike. Take a look around, ask questions, take a test drive.
              No pressure, ever.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`,
                  href: BUSINESS.googleMapsUrl,
                  external: true,
                },
                {
                  icon: Phone,
                  label: BUSINESS.phone,
                  href: `tel:${BUSINESS.phoneHref}`,
                  external: false,
                },
                {
                  icon: Mail,
                  label: BUSINESS.email,
                  href: `mailto:${BUSINESS.email}`,
                  external: false,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-[#F59E0B]" />
                  </div>
                  <span className="text-slate-600 group-hover:text-[#0B1F3A] transition-colors text-sm font-medium break-all">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-[#0B1F3A] hover:bg-[#162E50] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors"
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </a>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-[#F59E0B] text-[11px] font-extrabold uppercase tracking-widest mb-3">Hours</p>
            <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
              When we&apos;re open
            </h3>

            <div className="divide-y divide-slate-200">
              {BUSINESS.hours.map((h) => (
                <div key={h.day} className="flex justify-between py-4">
                  <span className="font-semibold text-[#0B1F3A]">{h.day}</span>
                  <span className={`text-sm font-medium ${h.time === "Closed" ? "text-rose-400" : "text-slate-500"}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div className="mt-8 bg-[#0B1F3A] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-[#F59E0B]" />
                <span className="font-extrabold text-[15px]">Ready to find your next car?</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Call us or stop by — we&apos;ll find the right vehicle for your needs and budget.
              </p>
              <a
                href={`tel:${BUSINESS.phoneHref}`}
                className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#0B1F3A] px-5 py-2.5 rounded-xl text-sm font-extrabold hover:bg-[#D97706] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {BUSINESS.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-[#071528]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#0B1F3A] border border-white/10 flex items-center justify-center">
              <Car className="w-3.5 h-3.5 text-[#F59E0B]" />
            </div>
            <span className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-slate-600">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
