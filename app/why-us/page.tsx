"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Car, Phone, MapPin, Star, ShieldCheck, Users,
  Heart, Wrench, ArrowRight, CheckCircle, Quote,
} from "lucide-react";
import { NavBar } from "@/app/components/NavBar";

// ── CONSTANTS ─────────────────────────────────────────────────────────────

const PHONE     = "(717) 644-5444";
const PHONE_TEL = "+17176445444";
const MAPS_URL  = "https://www.google.com/maps/search/?api=1&query=3910+Stiegel+Pike+Newmanstown+PA+17073";

// ── REAL GOOGLE REVIEWS ───────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Nicholas Rosenblatt",
    initial: "N",
    color: "#6366f1",
    rating: 5,
    ago: "6 months ago",
    text: "Fine Motors was a blessing to stop by today. Igor was prompt to answer all questions and showed up right away to let me test drive. All of his vehicles are incredibly well taken care of by his own hard work and at very great prices. He has an incredible back story and you get such a feel for this being a passion of his, not just a business. Even if you don't purchase, you will walk away blessed to have spent time with him.",
    featured: true,
  },
  {
    name: "Ashley",
    initial: "A",
    color: "#f97316",
    rating: 5,
    ago: "2 months ago",
    text: "I purchased my 2015 Volkswagen Jetta from Igor at Fine Motors, and the whole experience was excellent. Igor was honest, straightforward, and always easy to reach whenever I had a question. It made the process simple and stress-free. I'd definitely recommend checking out Fine Motors if you're looking for a dependable vehicle!",
  },
  {
    name: "Damanjeet Gill",
    initial: "D",
    color: "#0ea5e9",
    rating: 5,
    ago: "3 months ago",
    text: "Bought a Subaru Outback recently. Igor was a great dealer to work with. Answered all the questions. Didn't rush us to buy the car or put any pressure. After the purchase, there was a very small issue and Igor had it fixed for free. His vehicles run in great condition. Highly recommend him. I'll be sending my family members to him also!",
  },
  {
    name: "Kevin Moyer",
    initial: "K",
    color: "#10b981",
    badge: "Local Guide",
    rating: 5,
    ago: "2 months ago",
    text: "Igor is one very intelligent gentleman. Honest and upfront. My two daughters bought cars from him at a great price and low mileage. Thanks again 🤙",
  },
  {
    name: "Frederick Heim",
    initial: "F",
    color: "#8b5cf6",
    rating: 5,
    ago: "2 months ago",
    text: "Bought my wife's car from them. Great price, clean and reliable. She loves it. Going back now to buy a second car from them. Easy to work with, honest people.",
  },
  {
    name: "Curtie Wad",
    initial: "C",
    color: "#ef4444",
    rating: 5,
    ago: "11 months ago",
    text: "Absolutely the best car buying experience we have ever had. The dealer was not pushing the sale, he was honest and even accommodating in where we needed to do the title transfer. Seriously the best experience you could hope for in purchasing a vehicle.",
  },
  {
    name: "Bozart US",
    initial: "B",
    color: "#f59e0b",
    rating: 5,
    ago: "8 months ago",
    text: "Igor is very helpful and knowledgeable about the specific cars he has and works on. When he knew I came from 2 hours away he made sure he provided all parts available on site and installed them in the same day, working well beyond 8 hours. Incredible dedication.",
  },
  {
    name: "Paul",
    initial: "P",
    color: "#64748b",
    rating: 5,
    ago: "5 months ago",
    text: "Thanks so much Igor. You were really easy to work with. Was a great pleasure. Everything you said about the car was very true. Thank you so much. I highly recommend you.",
  },
];

// ── STORY CHAPTERS ────────────────────────────────────────────────────────

const STORY = [
  {
    year: "The Beginning",
    icon: Heart,
    title: "Born in the Garage",
    text: "Growing up, Igor and his brother spent every free hour around cars. While other kids were playing video games, they were under the hood — learning, tinkering, figuring out how things worked. It wasn't a chore. It was joy. The smell of motor oil, the satisfaction of hearing an engine fire up after hours of work — that's what shaped them.",
  },
  {
    year: "The Calling",
    icon: Wrench,
    title: "Helping Neighbors First",
    text: "Word travels fast in a small town. Friends, neighbors, relatives — everyone came to them when a car had a problem. They never turned anyone away. They'd work late into the night, charge nothing or almost nothing, just because they loved it. That's when they realized: this isn't just a hobby. This is who we are.",
  },
  {
    year: "The Mission",
    icon: Car,
    title: "Fine Motors Was Born",
    text: "The natural next step was helping people find good cars — not just fix them. Too many families were getting taken advantage of at big dealerships. Igor set out to do it differently: hand-pick every vehicle, price them fairly, and treat every customer like a neighbor. No games, no pressure, no hidden fees. Just honest people helping honest people.",
  },
];

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Igor knows every car personally",
    desc: "Every vehicle on the lot has been inspected, test-driven, and approved by Igor himself. He won't sell something he wouldn't put his own family in.",
  },
  {
    icon: Users,
    title: "You talk to the owner, not a salesperson",
    desc: "When you call or stop by, you're talking directly to the person who runs the business — not a commissioned salesperson with a quota to hit.",
  },
  {
    icon: Heart,
    title: "This is a passion, not just a paycheck",
    desc: "Customers consistently say you can feel it — Igor genuinely loves cars and genuinely cares about the people buying them. That's rare, and it shows in every interaction.",
  },
  {
    icon: CheckCircle,
    title: "Problems get fixed, no questions asked",
    desc: "Had a small issue after purchase? Multiple customers report Igor fixing things for free, out of pocket, no fuss. That's the Fine Motors promise.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Browse or Call",
    desc: "Check out what's on the lot or give Igor a call. Tell him what you're looking for and your budget. He'll be straight with you.",
  },
  {
    n: "02",
    title: "Come See It in Person",
    desc: "Stop by at 3910 Stiegel Pike, Newmanstown. Take your time. Test drive. Ask every question — Igor loves talking about his cars.",
  },
  {
    n: "03",
    title: "Drive Home Happy",
    desc: "Simple paperwork, honest price, no last-minute surprises. Most customers leave the same day, and many come back to buy a second car.",
  },
];

// ── ANIMATION ─────────────────────────────────────────────────────────────

function FadeUp({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────

export default function WhyUsPage() {
  return (
    <div className="min-h-dvh bg-white font-sans antialiased">

      <NavBar />

      {/* ── HERO — dark photo ────────────────────────────────────── */}
      <section className="relative bg-[#0a0e1a] overflow-hidden min-h-[520px] flex items-center">

        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          loading="eager"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg,rgba(10,14,26,.85) 0%,rgba(15,23,42,.70) 55%,rgba(20,10,5,.80) 100%)" }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "70px 70px" }}
        />

        {/* Orange glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(249,115,22,.09) 0%,transparent 65%)" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32 w-full">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/30 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/50">Our Story</span>
          </div>

          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wide text-white/55"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shrink-0" />
              Family-Owned · Lebanon County, PA
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Not just a dealership.<br />
              <span className="text-orange-400">A family that loves cars.</span>
            </motion.h1>

            <motion.p
              className="text-white/50 text-lg leading-relaxed max-w-xl mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              Fine Motors started with a simple idea: help people find great cars at honest prices,
              the way you&apos;d help a friend — no tricks, no pressure, no BS.
            </motion.p>

            {/* Quote */}
            <motion.div
              className="pl-5 border-l-4 border-orange-400/50"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-white/60 italic text-base leading-relaxed">
                &ldquo;You get such a feel for this being a passion of his, not just a business.&rdquo;
              </p>
              <p className="text-white/30 text-sm font-semibold mt-2">— Nicholas Rosenblatt, Google Review</p>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <FadeUp className="mb-16 text-center">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Our Story</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How it all started</h2>
        </FadeUp>

        <div className="relative">
          {/* Vertical line desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-200 via-orange-100 to-transparent -translate-x-px" />

          <div className="space-y-16 lg:space-y-0">
            {STORY.map((ch, i) => (
              <FadeUp key={ch.title} delay={i * 0.1}>
                <div className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>

                  {/* Text side */}
                  <div className={`${i % 2 === 1 ? "lg:order-2" : ""} lg:py-12`}>
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-orange-50 text-orange-500 text-xs font-bold uppercase tracking-wide">
                      <ch.icon className="w-3.5 h-3.5" />
                      {ch.year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{ch.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-[15px]">{ch.text}</p>
                  </div>

                  {/* Visual side */}
                  <div className={`hidden lg:flex ${i % 2 === 1 ? "lg:order-1" : ""} items-center justify-center`}>
                    <div className="relative">
                      <div className="w-48 h-48 rounded-3xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, #fff7ed, #fed7aa)` }}>
                        <ch.icon className="w-20 h-20 text-orange-300" strokeWidth={1} />
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-orange-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-orange-200">
                        {i + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BUY FROM US ──────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Why Buy From Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Fine Motors difference
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              We&apos;re not the biggest dealership in Pennsylvania. We&apos;re just the most honest one in Lebanon County.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_US.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-7 h-full border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL GOOGLE REVIEWS ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6">

          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Real Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Don&apos;t take our word for it
            </h2>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
              ))}
              <span className="ml-2 text-gray-500 text-sm font-medium">5.0 · Google Reviews</span>
            </div>
          </FadeUp>

          {/* Featured review */}
          <FadeUp className="mb-8">
            <div className="relative rounded-2xl overflow-hidden p-8 sm:p-10"
              style={{ background: "linear-gradient(135deg, #0f172a 0%, #1c1108 100%)" }}>
              <div className="absolute top-6 left-8 text-orange-400/20">
                <Quote className="w-24 h-24" strokeWidth={1} />
              </div>
              <div className="relative">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed italic mb-6 max-w-3xl">
                  &ldquo;{REVIEWS[0].text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: REVIEWS[0].color }}>
                    {REVIEWS[0].initial}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{REVIEWS[0].name}</p>
                    <p className="text-white/30 text-xs">{REVIEWS[0].ago} · Google Review</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Grid of other reviews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.slice(1).map((r, i) => (
              <FadeUp key={r.name} delay={i * 0.06}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ background: r.color }}
                    >
                      {r.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900">{r.name}</p>
                        {r.badge && (
                          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            {r.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{r.ago}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5 shrink-0">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple from start to finish</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div className="relative text-center">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:flex absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] items-center">
                      <div className="flex-1 h-px bg-orange-100" />
                      <ArrowRight className="w-3.5 h-3.5 text-orange-300 shrink-0" />
                    </div>
                  )}
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center shadow-sm relative z-10">
                    <span className="text-base font-black text-orange-500">{step.n}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIND US ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <FadeUp>
              <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Find Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Come say hello.<br />No appointment needed.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                We&apos;re right off Stiegel Pike in Newmanstown, PA. Stop by, take a look around,
                and you&apos;ll see why people drive from hours away to buy from Fine Motors.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Fine Motors LLC</p>
                    <p className="text-gray-500 text-sm">3910 Stiegel Pike, Newmanstown, PA 17073</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{PHONE}</p>
                    <p className="text-gray-400 text-sm">Call or text anytime</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Igor Now
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:border-orange-300 hover:text-orange-600 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-72 lg:h-96">
                <iframe
                  src="https://maps.google.com/maps?q=3910+Stiegel+Pike+Newmanstown+PA+17073&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fine Motors LLC map"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section
        className="py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f172a 0%,#1a0e06 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />)}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to find your next car?
            </h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed">
              Browse the inventory or give Igor a call. No scripts, no pressure — just a straight conversation with someone who knows cars.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/inventory"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors text-center flex items-center justify-center gap-2"
              >
                Browse Inventory
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${PHONE_TEL}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/15 text-white/70 font-semibold hover:border-white/30 hover:text-white transition-all text-center"
              >
                Call {PHONE}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
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
