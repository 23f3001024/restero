"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import { SplitReveal } from "./ui/Reveal";

export default function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  image,
  crumb,
  bottomFade = "white",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle: string;
  image: string;
  crumb: string;
  /** Bottom blend into the next section. Use "none" when it's dark. */
  bottomFade?: "white" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.32]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[68svh] items-center justify-center overflow-hidden bg-charcoal pt-24"
    >
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <SmartImage src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_0%,rgba(20,6,6,0.4)_100%)]" />

      {/* floating gold dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/70"
            style={{ left: `${(i * 41) % 100}%`, top: `${(i * 57) % 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        {eyebrow && (
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="eyebrow text-gold">{eyebrow}</span>
            <span className="h-px w-10 bg-gold/70" />
          </div>
        )}

        <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
          <SplitReveal text={title} />
          {accent && (
            <>
              {" "}
              <span className="text-gold-gradient italic">
                <SplitReveal text={accent} />
              </span>
            </>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-cream/70 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        {/* breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 flex items-center justify-center gap-1.5 font-button text-[0.62rem] uppercase tracking-wider2 text-cream/50"
        >
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-gold">{crumb}</span>
        </motion.nav>
      </motion.div>

      {bottomFade === "white" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      )}
    </section>
  );
}
