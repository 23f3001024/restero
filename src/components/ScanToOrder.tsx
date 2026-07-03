"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { QrCode, ScanLine, Utensils, ArrowRight, Camera } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";

const openScanner = () => window.dispatchEvent(new Event("hcc:open-scanner"));

const STEPS = [
  { Icon: ScanLine, title: "Scan the code", text: "Point your camera at the QR — no app needed." },
  { Icon: Utensils, title: "Build your order", text: "Browse the full menu and add your favourites." },
  { Icon: QrCode, title: "Place & relax", text: "Dine-in or takeaway — we take it from there." },
];

export default function ScanToOrder() {
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    const url = `${window.location.origin}/order`;
    QRCode.toDataURL(url, {
      margin: 1,
      width: 480,
      color: { dark: "#1E1E1E", light: "#00000000" },
      errorCorrectionLevel: "H",
    })
      .then(setQr)
      .catch(() => setQr(null));
  }, []);

  return (
    <section id="order" className="relative overflow-hidden bg-charcoal py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 animate-blob-morph bg-crimson/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 animate-blob-morph bg-gold/15 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        {/* copy */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <SectionLabel>Scan &amp; Order</SectionLabel>
          </div>
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Scan. Sit back.
              <span className="text-gold-gradient italic"> Savour.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md font-body leading-relaxed text-cream/70 lg:mx-0">
              Order straight from your table — or from anywhere. Scan the code to
              open our live menu and place your order in seconds.
            </p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-sm space-y-5 text-left lg:mx-0 lg:max-w-none">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={0.15 + i * 0.1}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <s.Icon size={20} />
                  </span>
                  <div>
                    <p className="font-display text-lg">{s.title}</p>
                    <p className="font-body text-sm text-cream/60">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <button
                onClick={openScanner}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep px-8 py-4 font-button text-[0.78rem] font-semibold uppercase tracking-wider2 text-charcoal shadow-luxe-gold transition-transform hover:scale-[1.03] sm:w-auto"
              >
                <Camera size={17} /> Scan Table QR
              </button>
              <Link
                href="/order"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/25 px-8 py-4 font-button text-[0.78rem] font-semibold uppercase tracking-wider2 text-cream transition-colors hover:border-gold hover:text-gold sm:w-auto"
              >
                Order Online
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mx-auto mt-3 max-w-md font-body text-xs text-cream/40 lg:mx-0">
              At your table? Scan the code to order for your table. Anywhere else?
              Order online for takeaway.
            </p>
          </Reveal>
        </div>

        {/* QR card */}
        <Reveal delay={0.2} className="flex justify-center">
          <motion.div
            initial={{ rotate: -3 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative w-full max-w-xs"
          >
            <div className="glass rounded-[2rem] p-8 text-center shadow-luxe">
              <p className="eyebrow mb-1 text-crimson">The House of</p>
              <p className="font-display text-xl font-semibold text-charcoal">Chilli N Curry</p>

              <div className="relative mx-auto mt-6 aspect-square w-full max-w-[15rem] rounded-2xl bg-white p-4 shadow-glass">
                {qr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qr} alt="Scan to order from The House of Chilli N Curry" className="h-full w-full" />
                ) : (
                  <div className="h-full w-full animate-pulse rounded-xl bg-charcoal/10" />
                )}
                {/* animated scan line */}
                <motion.div
                  animate={{ top: ["12%", "82%", "12%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-6 h-0.5 rounded bg-crimson/70 shadow-[0_0_12px_2px_rgba(183,28,28,0.6)]"
                />
              </div>

              <p className="mt-5 flex items-center justify-center gap-2 font-button text-[0.68rem] font-semibold uppercase tracking-wider2 text-charcoal/70">
                <ScanLine size={15} className="text-crimson" /> Scan to Order
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
