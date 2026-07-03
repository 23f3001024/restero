"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Quote } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import { Reveal } from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { img } from "@/lib/data";

export default function ChefSpecial() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-charcoal">
      <motion.div style={{ scale }} className="absolute inset-0">
        <SmartImage
          src={img("1631452180519-c014fe946bc7", 1800)}
          alt="Chef's special signature dish"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-charcoal/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 py-24">
        <div className="max-w-xl text-cream">
          <Reveal>
            <p className="eyebrow mb-6 text-gold">Chef&apos;s Recommendation</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="mb-4 text-gold/60" size={40} />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">
              Nalli Nihari,
              <br />
              <span className="text-gold-gradient italic">simmered for eight hours.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 font-body leading-relaxed text-cream/75">
              &ldquo;This is the dish I&apos;d serve my own family. Lamb shank
              coaxed off the bone in a marrow-rich broth of thirty spices,
              finished tableside with ginger, chilli and a squeeze of lime. Order
              it once — and you&apos;ll book your next table before you leave.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/50">
                <SmartImage
                  src={img("1583394293214-28ded15ee548", 160)}
                  alt="Executive Chef"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-lg">Chef Imran Qureshi</p>
                <p className="font-button text-[0.6rem] uppercase tracking-luxe text-cream/50">
                  Executive Chef
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-9">
              <MagneticButton variant="gold" onClick={() => router.push("/reserve")}>
                Reserve to Taste It
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
