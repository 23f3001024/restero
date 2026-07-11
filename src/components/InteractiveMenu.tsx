"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { menu, menuCategories, type MenuCategory } from "@/lib/data";

export default function InteractiveMenu() {
  const [active, setActive] = useState<MenuCategory>("Starters");
  const items = menu.filter((m) => m.category === active);

  return (
    <section id="menu" className="relative overflow-hidden bg-cream-light py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Interactive Menu</SectionLabel>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            Explore the
            <span className="text-crimson-gradient italic"> full table.</span>
          </h2>
        </Reveal>

        {/* filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-5 py-2.5 font-button text-[0.72rem] font-semibold uppercase tracking-wider2 transition-colors duration-300 ${
                active === cat ? "text-cream" : "text-charcoal/70 hover:text-crimson"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 -z-0 rounded-full bg-crimson shadow-luxe"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* horizontal scroller */}
      <div className="mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hide-scrollbar flex gap-6 overflow-x-auto px-6 pb-6 [scroll-snap-type:x_mandatory] sm:px-[max(1.5rem,calc((100vw-80rem)/2))]"
          >
            {items.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group relative w-[80vw] shrink-0 overflow-hidden rounded-[1.8rem] shadow-glass [scroll-snap-align:center] sm:w-[22rem]"
              >
                <Link
                  href={`/order?add=${encodeURIComponent(item.name)}`}
                  aria-label={`Add ${item.name} to your order`}
                  className="block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 80vw, 22rem"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

                    {/* order cue */}
                    <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 font-button text-[0.6rem] font-bold uppercase tracking-wider2 text-charcoal shadow-luxe-gold transition-transform duration-300 group-hover:scale-105">
                      <Plus size={13} strokeWidth={3} /> Add to Order
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border ${
                                item.veg ? "border-green-500" : "border-red-500"
                              }`}
                              aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  item.veg ? "bg-green-500" : "bg-red-500"
                                }`}
                              />
                            </span>
                            <h3 className="font-display text-2xl text-cream">{item.name}</h3>
                          </div>
                          <p className="mt-1 font-body text-sm text-cream/70">{item.desc}</p>
                        </div>
                        <span className="rounded-full bg-gold px-3 py-1 font-display text-sm font-bold text-charcoal">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
        <p className="mt-2 text-center font-button text-[0.6rem] uppercase tracking-luxe text-muted">
          ← Drag to explore · tap a dish to order →
        </p>
      </div>
    </section>
  );
}
