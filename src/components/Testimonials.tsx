"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-cream-light to-white py-28 sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-72 w-72 animate-blob-morph bg-crimson/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 animate-blob-morph bg-gold/10 blur-3xl [animation-delay:5s]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionLabel>Guest Love</SectionLabel>
        <Reveal>
          <h2 className="mb-14 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            Reviewed with
            <span className="text-gold-gradient italic"> five stars.</span>
          </h2>
        </Reveal>

        <div className="relative min-h-[22rem] sm:min-h-[20rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass mx-auto max-w-2xl rounded-[2rem] p-8 shadow-glass sm:p-12"
            >
              <div className="mb-5 flex justify-center gap-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/40">
                  <SmartImage src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <p className="font-display text-lg text-charcoal">{t.name}</p>
                  <p className="font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Testimonial ${d + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                d === i ? "w-8 bg-crimson" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
