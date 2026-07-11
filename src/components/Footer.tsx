"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, MessageCircle, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/data";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reserve", href: "/reserve" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-crimson/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20">
        {/* big logo */}
        <div className="border-b border-cream/10 pb-14 text-center">
          <p className="eyebrow mb-4 text-gold/70">The House of</p>
          <h2 className="font-display text-5xl font-semibold sm:text-7xl">
            Chilli <span className="text-gold-gradient italic">N</span> Curry
          </h2>
          <p className="mt-4 font-body text-cream/60">{BRAND.tagline}</p>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="font-display text-lg">Visit</h3>
            <p className="mt-4 font-body text-sm leading-relaxed text-cream/60">
              {BRAND.address}
            </p>
            <p className="mt-3 font-body text-sm text-cream/60">
              {BRAND.phone} · {BRAND.phone2}
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK.map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="font-body text-sm text-cream/60 transition-colors hover:text-gold"
                  >
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg">Opening Hours</h3>
            <ul className="mt-4 space-y-2.5">
              {BRAND.hours.map((h) => (
                <li key={h.day} className="font-body text-sm text-cream/60">
                  <span className="block text-cream/80">{h.day}</span>
                  {h.time}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg">Newsletter</h3>
            <p className="mt-4 font-body text-sm text-cream/60">
              Get first access to chef&apos;s tables and seasonal menus.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-4 flex overflow-hidden rounded-full border border-cream/20 bg-cream/5"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-3 font-body text-sm text-cream outline-none placeholder:text-cream/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid w-12 shrink-0 place-items-center bg-gold text-charcoal transition-colors hover:bg-gold-light"
              >
                <ArrowUpRight size={18} />
              </button>
            </form>
            {sent && (
              <p className="mt-2 font-body text-xs text-gold">Welcome to the table ✦</p>
            )}

            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: BRAND.socials.instagram },
                { Icon: MessageCircle, href: BRAND.socials.whatsapp },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 pb-28 text-center sm:flex-row sm:text-left lg:pb-8">
          <p className="font-body text-xs text-cream/50">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            <span className="mt-1 block text-cream/40">
              FSSAI Lic. No. {BRAND.fssai}
            </span>
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-cream/50 transition-colors hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-cream/50 transition-colors hover:text-gold">
              Terms of Service
            </a>
            <Link
              href="/tables"
              className="font-body text-xs text-cream/40 transition-colors hover:text-gold"
            >
              Table QR (Staff)
            </Link>
            <Link
              href="/kitchen"
              className="font-body text-xs text-cream/40 transition-colors hover:text-gold"
            >
              Kitchen (Staff)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
