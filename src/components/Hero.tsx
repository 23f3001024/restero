"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { SplitReveal } from "./ui/Reveal";
import SmartImage from "./ui/SmartImage";
import { BRAND, img } from "@/lib/data";

const HERO_IMG = img("1633945274405-b6c8069047b0", 2000, 82);

export default function Hero() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.28]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal"
    >
      {/* real food photograph */}
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <SmartImage
          src={HERO_IMG}
          alt="Signature dish at The House of Chilli N Curry"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* cinematic overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,rgba(20,6,6,0.35)_100%)]" />
      {/* extra darkening on phones so the centred copy stays legible */}
      <div className="absolute inset-0 bg-charcoal/35 sm:bg-transparent" />

      {/* floating gold dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/70"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -22, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      {/* copy */}
      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10"
      >
        <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">
          {/* brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mb-6 flex items-center justify-center gap-4 sm:justify-start"
          >
            <span className="h-px w-10 bg-gold/70" />
            <span className="font-button text-[0.68rem] font-semibold uppercase tracking-luxe text-gold sm:text-[0.75rem]">
              {BRAND.name}
            </span>
          </motion.div>

          <h1 className="font-display text-[2.9rem] font-semibold leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            <SplitReveal text="Where Every Bite" />
            <br />
            <span className="text-gold-gradient italic">
              <SplitReveal text="is an Experience." />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mx-auto mt-7 max-w-xl font-body text-base leading-relaxed text-cream/75 sm:mx-0 sm:text-lg"
          >
            Experience authentic Indian and Indo-Chinese cuisine crafted with
            passion, tradition and luxury — in a setting made for celebration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-start"
          >
            <MagneticButton variant="gold" onClick={() => router.push("/reserve")}>
              Reserve a Table <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              variant="outline"
              className="!border-cream/40 !text-cream"
              onClick={() => router.push("/menu")}
            >
              <UtensilsCrossed size={16} /> Explore Menu
            </MagneticButton>
          </motion.div>

          {/* cuisine strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-button text-[0.62rem] uppercase tracking-wider2 text-cream/50 sm:justify-start"
          >
            {["North Indian", "Mughlai", "Tandoori", "Biryani", "Indo-Chinese"].map(
              (c, i) => (
                <span key={c} className="flex items-center gap-5">
                  {i > 0 && <span className="text-gold/60">✦</span>}
                  {c}
                </span>
              ),
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-button text-[0.6rem] uppercase tracking-luxe text-cream/50">
            Scroll
          </span>
          <div className="flex h-10 w-6 justify-center rounded-full border border-cream/25 pt-2">
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="h-1.5 w-1.5 rounded-full bg-gold"
            />
          </div>
        </div>
      </motion.div>

      <span className="sr-only">{BRAND.tagline}</span>
    </section>
  );
}
