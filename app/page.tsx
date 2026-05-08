import { Phone, MapPin, Clock, Mail, Star, Car, ShieldCheck, Users, ArrowRight } from "lucide-react";
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
    { day: "Mon - Fri", time: "9:00 AM - 5:00 PM" },
    { day: "Saturday", time: "9:00 AM - 3:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Fine+Motors+LLC+Newmanstown+PA",
};

const FEATURED_VEHICLES = [
  { id: 1, year: 2021, make: "Toyota", model: "RAV4 XLE AWD", price: 24995, miles: 32450 },
  { id: 2, year: 2020, make: "Honda", model: "CR-V EX-L", price: 22500, miles: 41200 },
  { id: 3, year: 2019, make: "Ford", model: "F-150 XLT 4WD", price: 28900, miles: 58300 },
];

const REVIEWS = [
  {
    name: "Michael R.",
    rating: 5,
    text: "Great experience from start to finish. No pressure, fair pricing, and the car was exactly as described. Highly recommend.",
  },
  {
    name: "Sarah K.",
    rating: 5,
    text: "Family-run dealership with real integrity. They went above and beyond to make sure I was happy with my purchase.",
  },
  {
    name: "James P.",
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-brand">
              Fine Motors
            </span>
            <span className="text-xs uppercase tracking-widest text-ink-muted hidden sm:inline">
              LLC
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
            <Link href="#inventory" className="hover:text-brand transition">Inventory</Link>
            <Link href="#about" className="hover:text-brand transition">About</Link>
            <Link href="#reviews" className="hover:text-brand transition">Reviews</Link>
            <Link href="#contact" className="hover:text-brand transition">Contact</Link>
          </nav>
          <a
            href={`tel:${BUSINESS.phoneHref}`}
            className="hidden sm:flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-hover transition"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS.phone}
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-light text-brand px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6">
          <Star className="w-3.5 h-3.5 fill-current" />
          {BUSINESS.rating.toFixed(1)} on Google · {BUSINESS.reviewCount}+ Reviews
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-ink leading-[1.05] max-w-3xl mx-auto">
          {BUSINESS.tagline}
        </h1>
        <p className="mt-6 text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
          Family-owned dealership in Newmanstown, PA. Honest pricing, quality vehicles,
          and {BUSINESS.yearsInBusiness} years of trusted service.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="#inventory"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-md font-medium hover:bg-brand-hover transition w-full sm:w-auto justify-center"
          >
            Browse Inventory
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 border border-line text-ink px-6 py-3 rounded-md font-medium hover:bg-surface transition w-full sm:w-auto justify-center"
          >
            Visit Us
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-brand">{BUSINESS.yearsInBusiness}+</div>
            <div className="text-xs text-ink-muted uppercase tracking-wider mt-1">Years Local</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand">{BUSINESS.rating.toFixed(1)}★</div>
            <div className="text-xs text-ink-muted uppercase tracking-wider mt-1">Google Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand">{BUSINESS.reviewCount}+</div>
            <div className="text-xs text-ink-muted uppercase tracking-wider mt-1">Reviews</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand">100%</div>
            <div className="text-xs text-ink-muted uppercase tracking-wider mt-1">Family-Owned</div>
          </div>
        </div>
      </section>

      <section id="inventory" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Inventory</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">Featured Vehicles</h2>
          </div>
          <Link href="#" className="text-sm font-medium text-brand hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_VEHICLES.map((v) => (
            <article
              key={v.id}
              className="border border-line rounded-lg overflow-hidden hover:shadow-lg transition group cursor-pointer"
            >
              <div className="aspect-[4/3] bg-surface flex items-center justify-center text-ink-muted">
                <Car className="w-16 h-16 opacity-30" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-ink leading-tight">
                  {v.year} {v.make} {v.model}
                </h3>
                <p className="text-sm text-ink-muted mt-1">{formatMiles(v.miles)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-brand">{formatPrice(v.price)}</span>
                  <span className="text-sm font-medium text-accent group-hover:underline inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="bg-surface border-y border-line">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Why Fine Motors</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">A different kind of dealership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Honest Pricing",
                text: "No hidden fees, no last-minute surprises. The price you see is the price you pay.",
              },
              {
                icon: Car,
                title: "Quality Vehicles",
                text: "Every car is hand-picked and inspected. We only sell what we'd drive ourselves.",
              },
              {
                icon: Users,
                title: "Local & Trusted",
                text: `Family-owned and operated in Newmanstown, PA for over ${BUSINESS.yearsInBusiness} years.`,
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-light text-brand mb-5">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-ink-soft leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink">What our customers say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="border border-line rounded-lg p-6 bg-white">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-ink-soft leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
              <p className="text-sm font-semibold text-ink">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-brand text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-3">Visit Us</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              Stop by the lot —<br />we&apos;d love to meet you
            </h2>
            <p className="text-blue-100 leading-relaxed mb-8">
              Located right off Stiegel Pike. Take a look around, ask questions, take a test drive.
              No pressure, ever.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-200" />
                <div>
                  <div className="font-medium">{BUSINESS.address.street}</div>
                  <div className="text-blue-100 text-sm">
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-blue-200" />
                <a href={`tel:${BUSINESS.phoneHref}`} className="hover:underline">
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-blue-200" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:underline break-all">
                  {BUSINESS.email}
                </a>
              </div>
            </div>
            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-white text-brand px-5 py-2.5 rounded-md text-sm font-medium hover:bg-blue-50 transition"
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-3">Hours</p>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" /> When we&apos;re open
            </h3>
            <div className="space-y-3 border-t border-white/15">
              {BUSINESS.hours.map((h) => (
                <div key={h.day} className="flex justify-between border-b border-white/15 py-3">
                  <span className="font-medium">{h.day}</span>
                  <span className="text-blue-100">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-blue-100/80 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
