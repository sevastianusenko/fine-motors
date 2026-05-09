"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Car, Phone, MapPin, Mail, Clock, Star,
  ShieldCheck, Users, ThumbsUp, BadgeCheck,
  ArrowRight, ExternalLink,
} from "lucide-react";

// ── DATA ───────────────────────────────────────────────────────────────────

const PHONE     = "(717) 644-5444";
const PHONE_TEL = "+17176445444";
const EMAIL     = "Finemotorsautosales@gmail.com";
const ADDRESS   = "3910 Stiegel Pike, Newmanstown, PA 17073";
const MAPS_URL  = "https://www.google.com/maps/search/?api=1&query=3910+Stiegel+Pike+Newmanstown+PA+17073";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=3910+Stiegel+Pike+Newmanstown+PA+17073&t=&z=15&ie=UTF8&iwloc=&output=embed";

const HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 5:00 PM", open: true  },
  { day: "Saturday",        time: "9:00 AM – 3:00 PM", open: true  },
  { day: "Sunday",          time: "Closed",             open: false },
];

const TRUST_STATS = [
  { icon: Star,       value: "5.0★",  label: "Google Rating",    sub: "25+ verified reviews"         },
  { icon: BadgeCheck, value: "15+",   label: "Years in Business", sub: "Serving Lebanon County"       },
  { icon: Users,      value: "500+",  label: "Happy Customers",   sub: "And counting"                 },
  { icon: ShieldCheck,value: "$0",    label: "Hidden Fees",       sub: "Price you see = price you pay" },
];

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "No Hidden Fees, Ever",
    desc: "We believe in complete transparency. The price listed is the final price — no dealer fees, no surprise add-ons at the end.",
  },
  {
    icon: ThumbsUp,
    title: "Zero Sales Pressure",
    desc: "Take all the time you need. Our team is here to answer questions and help you find the right car, not to push you into a decision.",
  },
  {
    icon: Users,
    title: "Family-Owned Since 2009",
    desc: "We're your neighbors, not a big-box dealership. Every customer is treated like family because that's how we were raised to do business.",
  },
  {
    icon: BadgeCheck,
    title: "Every Car Inspected",
    desc: "We hand-pick and thoroughly inspect every vehicle before it hits the lot. We only sell cars we'd put our own family in.",
  },
];

// ── FADE ANIMATION ─────────────────────────────────────────────────────────

function FadeUp({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── PAGE ───────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-white font-sans antialiased">

      {/* ── NAV ────────────────────────────────────────────────────── */}
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
            <Link href="/inventory" className="hover:text-gray-900 transition-colors">Inventory</Link>
            <Link href="/why-us"    className="hover:text-gray-900 transition-colors">Why Us</Link>
            <Link href="/contact"   className="text-orange-500 font-semibold">Contact</Link>
          </nav>

          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* ── HERO STRIP ─────────────────────────────────────────────── */}
      <section className="bg-[#0a0e1a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(249,115,22,.08) 0%,transparent 65%)" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-2 text-xs text-white/30 mb-4">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Contact</span>
          </div>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-white/45 text-lg max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            We&apos;re a family-run dealership — reach out any time and we&apos;ll get back to you personally.
          </motion.p>
        </div>
      </section>

      {/* ── TRUST STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {TRUST_STATS.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07} className="py-7 px-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <s.icon className="w-4 h-4 text-orange-400 mr-1.5" />
                  <span className="text-2xl font-bold text-gray-900 tabular-nums">{s.value}</span>
                </div>
                <div className="text-sm font-semibold text-gray-700">{s.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT: INFO + MAP ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — Contact details */}
          <FadeUp>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Contact Us</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Come Visit the Lot</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Located right off Stiegel Pike in Newmanstown. Stop by, take a look around,
              ask us anything — no appointment needed.
            </p>

            {/* Contact cards */}
            <div className="space-y-4 mb-8">

              {/* Phone */}
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-sm shadow-orange-200">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Phone</p>
                  <p className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">{PHONE}</p>
                  <p className="text-xs text-gray-400">Tap to call</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400 ml-auto transition-colors" />
              </a>

              {/* Address */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Address</p>
                  <p className="font-bold text-gray-900">Fine Motors LLC</p>
                  <p className="text-sm text-gray-500">3910 Stiegel Pike, Newmanstown, PA 17073</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-orange-400 ml-auto transition-colors shrink-0" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:border-orange-200 hover:bg-orange-50/40 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
                  <p className="font-medium text-gray-900 text-sm truncate group-hover:text-orange-600 transition-colors">{EMAIL}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400 ml-auto transition-colors shrink-0" />
              </a>
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-gray-900">Business Hours</span>
              </div>
              <div className="divide-y divide-gray-50">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-sm font-medium text-gray-700">{h.day}</span>
                    <span className={`text-sm font-semibold ${h.open ? "text-gray-900" : "text-rose-500"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-bold hover:border-orange-300 hover:text-orange-600 transition-all"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </FadeUp>

          {/* RIGHT — Map */}
          <FadeUp delay={0.1} className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[480px] w-full">
              <iframe
                src={MAPS_EMBED}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fine Motors LLC location map"
                aria-label="Map showing Fine Motors LLC at 3910 Stiegel Pike, Newmanstown, PA"
              />
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Google Maps
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── TRUST BLOCK ────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">

          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              A dealership you can actually trust.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              We know buying a used car can feel stressful. That&apos;s why we built everything about Fine Motors
              around honesty, transparency, and no-pressure service.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {TRUST_POINTS.map((pt, i) => (
              <FadeUp key={pt.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                    <pt.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{pt.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{pt.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Google reviews callout */}
          <FadeUp>
            <div
              className="rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#0f172a 0%,#1a0e06 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }}
              />
              <div className="relative">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  5.0 out of 5 stars on Google
                </p>
                <p className="text-white/40 mb-8 text-sm">
                  Based on 25+ verified customer reviews
                </p>
                <blockquote className="text-white/70 text-base sm:text-lg italic max-w-2xl mx-auto leading-relaxed mb-6">
                  &ldquo;Great experience from start to finish. No pressure, fair pricing, and the car was exactly as described.
                  Fine Motors is the real deal — wouldn&apos;t go anywhere else.&rdquo;
                </blockquote>
                <p className="text-white/30 text-sm font-semibold">— Michael R., Lebanon County, PA</p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
                  >
                    Call {PHONE}
                  </a>
                  <Link
                    href="/inventory"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/15 text-white/70 font-semibold text-sm hover:border-white/30 hover:text-white transition-all"
                  >
                    Browse Inventory
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-white/5 py-8">
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
