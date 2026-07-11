"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { img } from "@/lib/data";

export default function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-white py-28 sm:py-36">
      {/* floating spice illustration */}
      <div className="pointer-events-none absolute right-6 top-24 hidden opacity-[0.06] lg:block">
        <span className="font-display text-[16rem] leading-none text-crimson">✦</span>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* image */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-luxe">
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
              <SmartImage
                src={img("1556910103-1c02745aae4d")}
                alt="Chef finishing a dish over open flame"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>
          {/* floating glass badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass absolute -bottom-6 -left-6 rounded-3xl px-7 py-5 shadow-glass"
          >
            <p className="font-display text-4xl font-bold text-crimson">1998</p>
            <p className="font-button text-[0.6rem] uppercase tracking-luxe text-muted">
              Serving Since
            </p>
          </motion.div>
        </Reveal>

        {/* text */}
        <div className="text-center sm:text-left">
          <div className="flex justify-center sm:justify-start">
            <SectionLabel>Our Story</SectionLabel>
          </div>
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
              A family kitchen,
              <br />
              <span className="text-gold-gradient">reimagined as luxury.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 font-body leading-relaxed text-muted">
              It began with a single wok and a grandmother&apos;s recipe book.
              Three decades on, The House of Chilli N Curry has grown into a
              destination — yet every plate still carries the same devotion to
              spice, smoke and warmth that started it all.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Reveal delay={0.15}>
              <div>
                <div className="gold-divider mb-4 w-12 mx-auto sm:mx-0" />
                <h3 className="font-display text-xl text-charcoal">Our Mission</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  To turn every meal into a memory — pairing heritage recipes
                  with the finest ingredients and impeccable hospitality.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div>
                <div className="gold-divider mb-4 w-12 mx-auto sm:mx-0" />
                <h3 className="font-display text-xl text-charcoal">Our Vision</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                  To be the most loved Indian and Indo-Chinese dining house — a
                  place families return to for generations.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 flex items-center justify-center gap-4 sm:justify-start">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/40">
                <SmartImage
                  src={img("1583394293214-28ded15ee548", 160)}
                  alt="Executive Chef"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-lg text-charcoal">Chef Imran Qureshi</p>
                <p className="font-button text-[0.65rem] uppercase tracking-wider2 text-muted">
                  Executive Chef & Custodian of Flavour
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
