import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">

      {/* ── MAIN FOOTER ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/logo.png"
              alt="Fine Motors LLC"
              width={120}
              height={46}
              className="h-9 w-auto object-contain brightness-0 invert opacity-80"
            />
          </Link>
          <p className="text-sm text-white/40 leading-relaxed mb-5">
            Family-owned used car dealership in Newmanstown, PA. Honest pricing, no hidden fees, zero pressure.
          </p>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-orange-400 fill-orange-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-white/30 text-xs ml-2 mt-0.5">5.0 · Google Reviews</span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Navigation</p>
          <ul className="space-y-2.5">
            {[
              { href: "/",          label: "Home"      },
              { href: "/inventory", label: "Inventory" },
              { href: "/why-us",    label: "Why Us"    },
              { href: "/contact",   label: "Contact"   },
              { href: "/privacy",   label: "Privacy Policy" },
              { href: "/terms",     label: "Terms"     },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/45 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Contact</p>
          <ul className="space-y-3">
            <li>
              <a href="tel:+17176445444" className="flex items-start gap-2.5 text-sm text-white/45 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>(717) 644-5444</span>
              </a>
            </li>
            <li>
              <a href="mailto:Finemotorsautosales@gmail.com" className="flex items-start gap-2.5 text-sm text-white/45 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="break-all">Finemotorsautosales@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=3910+Stiegel+Pike+Newmanstown+PA+17073"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>3910 Stiegel Pike<br />Newmanstown, PA 17073</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-white/45">
              <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>Mon–Fri 9am–5pm<br />Sat 9am–3pm · Sun Closed</span>
            </li>
          </ul>
        </div>

        {/* Service Area */}
        <div>
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Service Area</p>
          <p className="text-xs text-white/25 mb-3">Proudly serving buyers from:</p>
          <ul className="space-y-1.5">
            {[
              "Lebanon, PA",
              "Palmyra, PA",
              "Myerstown, PA",
              "Annville, PA",
              "Jonestown, PA",
              "Hershey, PA",
              "Reading, PA",
              "Harrisburg, PA",
              "Lancaster, PA",
            ].map(city => (
              <li key={city} className="text-sm text-white/40">{city}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-white/25">
            © {new Date().getFullYear()} Fine Motors LLC · Newmanstown, PA · All rights reserved.
          </span>
          <span className="text-xs text-white/20">
            Used Car Dealer · Lebanon County, PA
          </span>
        </div>
      </div>
    </footer>
  );
}
