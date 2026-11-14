"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { HeroTile } from "@/app/hero-tiles";

// ── The lot at night ───────────────────────────────────────────────────────
// A tilted wall of every car that has passed through the lot, drifting slowly
// column by column, kept in near-dark. One warm lamp follows the cursor (or
// wanders on its own on touch screens) and reveals the cars it passes over.

type Column = { dur: number; reverse: boolean; delay: number; cls: string };

// Durations differ per column so rows never line up; negative delays start mid-loop.
const COLUMNS: Column[] = [
  { dur: 96,  reverse: false, delay: -7,  cls: "flex" },
  { dur: 124, reverse: true,  delay: -33, cls: "flex" },
  { dur: 88,  reverse: false, delay: -58, cls: "flex" },
  { dur: 136, reverse: true,  delay: -19, cls: "hidden sm:flex" },
  { dur: 104, reverse: false, delay: -71, cls: "hidden lg:flex" },
  { dur: 118, reverse: true,  delay: -44, cls: "hidden lg:flex" },
  { dur: 110, reverse: false, delay: -26, cls: "hidden xl:flex" },
];
const PER_COLUMN = 7;
const RATIOS = ["4 / 3", "1 / 1", "4 / 3", "3 / 4", "4 / 3", "1 / 1", "5 / 4"];

function tileSrc(src: string) {
  // Sanity CDN and Unsplash both honour w / q / auto=format
  return `${src}${src.includes("?") ? "&" : "?"}w=640&q=60&auto=format`;
}

export function HeroCollage({ tiles }: { tiles: HeroTile[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || tiles.length === 0) return;

    // Images that finished loading before hydration never fire onLoad
    el.querySelectorAll<HTMLImageElement>("img").forEach(img => {
      if (img.complete && img.naturalWidth > 0) img.style.opacity = "1";
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer  = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = el.clientWidth, h = el.clientHeight;
    let tx = w * 0.66, ty = h * 0.44;   // lamp target
    let cx = tx,       cy = ty;         // lamp position (eased)
    let pointerActive = false;
    let lastPointer = 0;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const onResize = () => { w = el.clientWidth; h = el.clientHeight; };

    const onMove = (e: PointerEvent) => {
      if (!finePointer) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) { pointerActive = false; return; }
      tx = x; ty = y;
      pointerActive = true;
      lastPointer = e.timeStamp;
    };
    const onLeave = () => { pointerActive = false; };

    const tick = (now: number) => {
      if (pointerActive && now - lastPointer > 5000) pointerActive = false;
      if (!pointerActive && !reduceMotion) {
        // Slow wander across the brighter (right) half of the wall
        const t = (now - t0) / 1000;
        tx = w * (0.64 + 0.20 * Math.sin(t * 0.19));
        ty = h * (0.46 + 0.24 * Math.sin(t * 0.31 + 1.3));
      }
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--my", `${cy.toFixed(1)}px`);
      if (visible) raf = requestAnimationFrame(tick);
    };

    // No frames burned while the hero is scrolled away
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      el.dataset.paused = visible ? "0" : "1";
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    }, { threshold: 0.02 });
    io.observe(el);

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [tiles.length]);

  if (tiles.length === 0) return null;

  // Each column takes a contiguous run of tiles so the same car never sits next to itself
  const columns = COLUMNS.map((_, c) =>
    Array.from({ length: PER_COLUMN }, (_, i) => tiles[(c * PER_COLUMN + i) % tiles.length])
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fm-hero absolute inset-0 overflow-hidden select-none pointer-events-none"
      style={{ "--mx": "66%", "--my": "44%" } as CSSProperties}
    >
      <style>{`
        .fm-wall {
          position: absolute; inset: -14% -16%;
          display: flex; gap: 12px;
          transform: rotate(-6deg) scale(1.06);
          transform-origin: 50% 50%;
        }
        .fm-col {
          flex: 1 1 0; min-width: 0;
          animation: fm-drift linear infinite;
          will-change: transform;
        }
        .fm-hero[data-paused="1"] .fm-col { animation-play-state: paused; }
        .fm-half { display: flex; flex-direction: column; gap: 12px; padding-bottom: 12px; }
        .fm-tile {
          position: relative; margin: 0; width: 100%;
          overflow: hidden; border-radius: 10px;
          background: #0b1020;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.05);
        }
        .fm-tile img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; opacity: 0; transition: opacity .9s ease;
        }
        .fm-tile figcaption {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 22px 11px 9px;
          font-size: 10px; line-height: 1; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.62);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          background: linear-gradient(to top, rgba(4,6,15,.75), transparent);
        }
        @keyframes fm-drift { from { transform: translateY(0); } to { transform: translateY(-50%); } }

        /* The lamp: a near-transparent hole in the darkness with a warm core */
        .fm-lamp {
          position: absolute; inset: 0;
          background:
            radial-gradient(circle 230px at var(--mx) var(--my), rgba(255,174,92,.13), transparent 72%),
            radial-gradient(circle 440px at var(--mx) var(--my), rgba(4,6,15,.06) 0%, rgba(4,6,15,.52) 50%, rgba(4,6,15,.84) 100%);
        }
        /* Keeps the copy readable: dark on top on phones, dark on the left on wider screens */
        .fm-shade {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(4,6,15,.90) 0%, rgba(4,6,15,.72) 50%, rgba(4,6,15,.94) 100%);
        }
        @media (min-width: 768px) {
          .fm-shade {
            background: linear-gradient(to right, rgba(4,6,15,.96) 0%, rgba(4,6,15,.87) 34%, rgba(4,6,15,.44) 62%, rgba(4,6,15,.22) 100%);
          }
        }
        .fm-edges {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, #04060f 0%, rgba(4,6,15,0) 24%),
            linear-gradient(to bottom, rgba(4,6,15,.70) 0%, rgba(4,6,15,0) 18%);
        }
        @media (prefers-reduced-motion: reduce) {
          .fm-col { animation: none; }
        }
      `}</style>

      <div className="fm-wall">
        {COLUMNS.map((col, c) => (
          <div
            key={c}
            className={`fm-col flex-col ${col.cls}`}
            style={{
              animationDuration: `${col.dur}s`,
              animationDelay: `${col.delay}s`,
              animationDirection: col.reverse ? "reverse" : "normal",
            }}
          >
            {[0, 1].map(half => (
              <div key={half} className="fm-half">
                {columns[c].map((tile, i) => (
                  <figure key={`${half}-${i}`} className="fm-tile" style={{ aspectRatio: RATIOS[(i + c) % RATIOS.length] }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tileSrc(tile.src)}
                      alt=""
                      loading={c < 3 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      onLoad={e => { e.currentTarget.style.opacity = "1"; }}
                    />
                    {tile.label && <figcaption>{tile.label}</figcaption>}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="fm-lamp" />
      <div className="fm-shade" />
      <div className="fm-edges" />
    </div>
  );
}
