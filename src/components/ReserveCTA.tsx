"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export default function ReserveCTA() {
  return (
    <section className="relative overflow-hidden bg-crimson-fade py-24 text-center text-cream sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-0 h-72 w-72 animate-blob-morph bg-gold/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 animate-blob-morph bg-charcoal/30 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="eyebrow mb-5 text-gold-light">Ready When You Are</p>
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">
            Your table is
            <span className="italic text-gold-gradient"> waiting.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-body text-cream/80">
            Reserve in seconds — instant confirmation, free cancellation up to two
            hours before.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div whileHover={{ scale: 1.03 }} className="mt-9 inline-block">
            <Link
              href="/reserve"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-9 py-4 font-button text-[0.8rem] font-bold uppercase tracking-wider2 text-crimson shadow-luxe"
            >
              Reserve a Table
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
