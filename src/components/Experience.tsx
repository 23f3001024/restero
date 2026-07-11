"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sprout,
  ScrollText,
  Gem,
  ChefHat,
  Timer,
  Sparkles,
} from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { experienceStats, experiencePillars } from "@/lib/data";

const ICONS = [Sprout, ScrollText, Gem, ChefHat, Timer, Sparkles];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Experience() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-cream sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 animate-blob-morph bg-crimson/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 animate-blob-morph bg-gold/10 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionLabel>The Experience</SectionLabel>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Luxury is in the
            <span className="text-gold-gradient italic"> details.</span>
          </h2>
        </Reveal>

        {/* counters */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {experienceStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-5xl font-bold text-gold-gradient sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-display text-lg">{s.label}</p>
              <p className="mt-1 font-body text-xs text-cream/50">{s.sub}</p>
            </Reveal>
          ))}
        </div>

        <div className="gold-divider mx-auto my-16 max-w-xs" />

        {/* pillars */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {experiencePillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group glass-dark flex flex-col items-center gap-3 rounded-2xl px-4 py-7 text-center transition-colors duration-500 hover:bg-crimson/20"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold transition-transform duration-500 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <span className="font-button text-[0.7rem] font-semibold uppercase tracking-wider2 text-cream/90">
                  {p}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
