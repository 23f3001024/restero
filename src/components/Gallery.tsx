"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { gallery } from "@/lib/data";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Gallery</SectionLabel>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            A feast for the
            <span className="text-gold-gradient italic"> eyes.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((g, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl ${g.span}`}
            >
              <SmartImage
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />
              <span className="absolute inset-x-0 bottom-0 translate-y-4 p-4 text-left font-display text-lg text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-charcoal/90 p-6 backdrop-blur-sm"
          >
            <button
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[3/2] w-full max-w-4xl overflow-hidden rounded-3xl shadow-luxe"
            >
              <SmartImage
                src={gallery[active].src.replace(/w=\d+/, "w=1600")}
                alt={gallery[active].alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
