"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { img } from "@/lib/data";

const CARDS = [
  {
    href: "/about",
    label: "Our Story",
    copy: "Three decades of spice, smoke and warmth.",
    image: img("1517248135467-4c7edcad34c4"),
    span: "lg:col-span-2",
  },
  {
    href: "/menu",
    label: "The Menu",
    copy: "Tandoor, wok & dum — explore every plate.",
    image: img("1633945274405-b6c8069047b0"),
    span: "",
  },
  {
    href: "/gallery",
    label: "Gallery",
    copy: "A feast for the eyes.",
    image: img("1599487488170-d11ec9c172f0"),
    span: "",
  },
  {
    href: "/contact",
    label: "Visit Us",
    copy: "Find your way to the table.",
    image: img("1414235077428-338989a2e8c0"),
    span: "lg:col-span-2",
  },
];

export default function DiscoverPages() {
  return (
    <section className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Explore</SectionLabel>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            Step inside
            <span className="text-gold-gradient italic"> the House.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[16rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.href} delay={(i % 3) * 0.08} className={c.span}>
              <Link
                href={c.href}
                className="group relative flex h-full overflow-hidden rounded-[1.8rem] shadow-glass"
              >
                <SmartImage
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="relative mt-auto w-full p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-cream">{c.label}</h3>
                      <p className="mt-1 font-body text-sm text-cream/70">{c.copy}</p>
                    </div>
                    <motion.span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream/15 text-cream backdrop-blur transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal"
                    >
                      <ArrowUpRight size={20} />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
