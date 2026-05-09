"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Car, Phone, Menu, X } from "lucide-react";

const PHONE     = "(717) 644-5444";
const PHONE_TEL = "+17176445444";

const LINKS = [
  { label: "Home",      href: "/"          },
  { label: "Inventory", href: "/inventory" },
  { label: "Why Us",    href: "/why-us"    },
  { label: "Contact",   href: "/contact"   },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  function close() { setOpen(false); }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" onClick={close} className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
            <Car className="w-4 h-4 text-white" />
          </div>
          <div className="leading-none">
            <span className="font-bold text-[17px] tracking-tight text-gray-900 block">Fine Motors</span>
            <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold block mt-0.5 hidden sm:block">LLC · Newmanstown, PA</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                path === href
                  ? "text-orange-500 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden lg:inline">{PHONE}</span>
          </a>

          <Link
            href="/inventory"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            View Cars
          </Link>

          {/* Burger — always visible on mobile */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/20 z-40 md:hidden"
              onClick={close}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full inset-x-0 z-50 md:hidden bg-white border-b border-gray-100 shadow-lg"
            >
              <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
                {LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                      path === href
                        ? "bg-orange-50 text-orange-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2.5 pb-2">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={close}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 text-white text-base font-semibold hover:bg-orange-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {PHONE}
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
