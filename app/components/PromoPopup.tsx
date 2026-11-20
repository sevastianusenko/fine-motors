"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, PartyPopper, Phone, X } from "lucide-react";
import Link from "next/link";

// ── Holiday offer ──────────────────────────────────────────────────────────
// Pops up once per visit with a flight of balloons; after it is closed a small
// pill stays in the corner so the offer can be reopened. Disappears on its own
// once PROMO_ENDS has passed.

const PROMO_ENDS   = new Date(2027, 0, 1);          // local midnight, Jan 1 2027
const STORAGE_KEY  = "fm-holiday-promo-dismissed";
const OPEN_DELAY   = 1800;                          // ms after page load
const PHONE        = "(717) 644-5444";
const PHONE_TEL    = "+17176445444";

type Balloon = { left: number; size: number; color: string; dur: number; delay: number; sway: number };

const BALLOONS: Balloon[] = [
  { left: 3,  size: 1.00, color: "#f97316", dur: 12, delay: 0.0, sway: 3.1 },
  { left: 11, size: 0.72, color: "#fbbf24", dur: 15, delay: 1.6, sway: 2.6 },
  { left: 19, size: 1.25, color: "#ffffff", dur: 13, delay: 0.6, sway: 3.6 },
  { left: 28, size: 0.85, color: "#fb7185", dur: 16, delay: 2.4, sway: 2.9 },
  { left: 37, size: 1.10, color: "#f97316", dur: 11, delay: 1.1, sway: 3.3 },
  { left: 46, size: 0.68, color: "#ffffff", dur: 17, delay: 3.2, sway: 2.5 },
  { left: 55, size: 1.30, color: "#fbbf24", dur: 12, delay: 0.3, sway: 3.8 },
  { left: 64, size: 0.80, color: "#f97316", dur: 14, delay: 2.0, sway: 2.8 },
  { left: 72, size: 1.05, color: "#fb7185", dur: 13, delay: 0.9, sway: 3.2 },
  { left: 81, size: 0.75, color: "#ffffff", dur: 16, delay: 2.8, sway: 2.7 },
  { left: 89, size: 1.18, color: "#f97316", dur: 11, delay: 1.4, sway: 3.5 },
  { left: 96, size: 0.90, color: "#fbbf24", dur: 15, delay: 3.6, sway: 3.0 },
];

export function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen]           = useState(false);
  const [minimized, setMinimized] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const active = !!pathname && !pathname.startsWith("/studio");

  // Decide on the client only, so server and first client render agree
  useEffect(() => {
    if (!active || Date.now() >= PROMO_ENDS.getTime()) return;
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(STORAGE_KEY) === "1"; } catch {}
    const t = setTimeout(
      () => (dismissed ? setMinimized(true) : setOpen(true)),
      dismissed ? 0 : OPEN_DELAY,
    );
    return () => clearTimeout(t);
  }, [active]);

  const close = useCallback(() => {
    setOpen(false);
    setMinimized(true);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  }, []);

  // Scroll lock, Escape to close, focus the close button
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!active) return null;

  return (
    <>
      <style>{`
        .fm-balloon {
          position: absolute; bottom: -240px;
          width: calc(54px * var(--s));
          animation: fm-rise var(--d) linear var(--delay) infinite;
          will-change: transform;
        }
        .fm-balloon-body {
          position: relative; display: block; width: 100%; aspect-ratio: 0.8;
          border-radius: 50% 50% 48% 48% / 56% 56% 44% 44%;
          background:
            radial-gradient(circle at 34% 28%, rgba(255,255,255,.7), rgba(255,255,255,0) 32%),
            var(--c);
          box-shadow: inset -8px -10px 18px rgba(0,0,0,.22), 0 12px 30px rgba(0,0,0,.28);
          transform-origin: 50% 115%;
          animation: fm-sway var(--sway) ease-in-out infinite alternate;
        }
        .fm-balloon-body::after {
          content: ""; position: absolute; left: 50%; bottom: -7px;
          width: 0; height: 0; transform: translateX(-50%);
          border-left: 6px solid transparent; border-right: 6px solid transparent;
          border-top: 8px solid var(--c); filter: brightness(.82);
        }
        .fm-balloon-string {
          display: block; width: 20px; height: 72px; margin: 4px auto 0;
          transform-origin: 50% 0;
          animation: fm-sway var(--sway) ease-in-out infinite alternate;
        }
        @keyframes fm-rise { to { transform: translateY(calc(-100vh - 360px)); } }
        @keyframes fm-sway { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
        @media (prefers-reduced-motion: reduce) {
          .fm-balloons { display: none; }
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            key="promo"
            className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#04060f]/75 backdrop-blur-sm" onClick={close} />

            {/* Balloons */}
            <div aria-hidden="true" className="fm-balloons absolute inset-0 overflow-hidden pointer-events-none">
              {BALLOONS.map((b, i) => (
                <span
                  key={i}
                  className="fm-balloon"
                  style={{
                    left: `${b.left}%`,
                    "--s": b.size, "--c": b.color,
                    "--d": `${b.dur}s`, "--delay": `${b.delay}s`, "--sway": `${b.sway}s`,
                  } as CSSProperties}
                >
                  <span className="fm-balloon-body" />
                  <svg className="fm-balloon-string" viewBox="0 0 20 72" fill="none">
                    <path d="M10 0 C 3 14, 17 24, 10 38 S 3 60, 10 72" stroke="rgba(255,255,255,.4)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </span>
              ))}
            </div>

            {/* Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="promo-title"
              aria-describedby="promo-terms"
              className="relative w-full max-w-md rounded-3xl bg-[#0a0f1f] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.6)] overflow-hidden"
              initial={{ y: 90, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 240, damping: 24, delay: 0.1 }}
            >
              {/* Warm glow */}
              <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-64 rounded-full bg-orange-500/30 blur-3xl" />

              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white/80 hover:text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-colors"
              >
                <X className="w-7 h-7" strokeWidth={2.5} />
              </button>

              <div className="relative px-7 pt-8 pb-7 sm:px-9 sm:pt-10 sm:pb-9 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 text-orange-300 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <PartyPopper className="w-3.5 h-3.5" />
                  Holiday Offer
                </div>

                <h2 id="promo-title" className="mt-5 font-display font-extrabold uppercase leading-[0.9] text-white">
                  <span className="block text-2xl sm:text-3xl text-white/70 tracking-wide">Save up to</span>
                  <span className="block text-[5.5rem] sm:text-[6.5rem] text-orange-400 tracking-[-0.02em] tabular-nums">$1,000</span>
                  <span className="block mt-1 text-2xl sm:text-[1.9rem] tracking-wide">if you buy before<br />the New Year</span>
                </h2>

                <div className="mt-7 flex flex-col gap-2.5">
                  <Link
                    href="/inventory"
                    onClick={close}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 active:scale-[0.97] transition-all"
                  >
                    Browse Inventory
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 text-white font-bold text-sm hover:bg-white/5 active:scale-[0.97] transition-all"
                  >
                    <Phone className="w-4 h-4 text-orange-400" />
                    Call {PHONE}
                  </a>
                </div>

                <p id="promo-terms" className="mt-5 text-[11px] leading-relaxed text-white/40">
                  5% off any vehicle purchase through December 31, 2026. Just mention this offer when you call or stop by the lot.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner pill after the popup is closed */}
      <AnimatePresence>
        {minimized && !open && (
          <motion.button
            key="promo-pill"
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-4 left-4 z-[90] inline-flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-[#0a0f1f] border border-orange-400/30 text-white text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,.35)] hover:border-orange-400/60 transition-colors"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <span className="w-6 h-6 rounded-full bg-orange-500/15 flex items-center justify-center">
              <PartyPopper className="w-3.5 h-3.5 text-orange-400" />
            </span>
            Save up to $1,000 before New Year
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
