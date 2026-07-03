"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[900] flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-7 ${
            scrolled ? "glass shadow-glass" : "border border-transparent bg-transparent"
          }`}
        >
          <button onClick={() => go("/")} className="group flex items-center gap-2.5 text-left">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-crimson font-display text-lg font-bold text-cream shadow-luxe">
              C
            </span>
            <span className="hidden leading-none sm:block">
              <span
                className={`block font-display text-[0.95rem] font-semibold transition-colors duration-500 ${
                  scrolled ? "text-charcoal" : "text-cream"
                }`}
              >
                Chilli N Curry
              </span>
              <span
                className={`block font-button text-[0.55rem] uppercase tracking-luxe transition-colors duration-500 ${
                  scrolled ? "text-muted" : "text-gold/80"
                }`}
              >
                The House of
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className={`group relative font-body text-sm font-medium transition-colors duration-500 ${
                    scrolled
                      ? active
                        ? "text-crimson"
                        : "text-charcoal/80 hover:text-crimson"
                      : active
                        ? "text-gold"
                        : "text-cream/90 hover:text-gold"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    } ${scrolled ? "bg-crimson" : "bg-gold"}`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton
                variant="gold"
                className="!px-6 !py-3 !text-[0.7rem]"
                onClick={() => go("/reserve")}
              >
                Reserve Now
              </MagneticButton>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500 lg:hidden ${
                scrolled ? "border-charcoal/15 text-charcoal" : "border-cream/30 text-cream"
              }`}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[899] flex flex-col justify-center bg-charcoal/95 px-8 lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 top-1/4 h-72 w-72 animate-blob-morph bg-crimson/30 blur-3xl" />
              <div className="absolute -left-16 bottom-1/4 h-72 w-72 animate-blob-morph bg-gold/20 blur-3xl" />
            </div>
            {[...LINKS, { label: "Reserve a Table", href: "/reserve" }].map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                onClick={() => go(l.href)}
                className={`relative border-b border-cream/10 py-5 text-left font-display text-3xl ${
                  pathname === l.href ? "text-gold" : "text-cream"
                }`}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
