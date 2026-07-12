"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { menu, menuCategories, type MenuCategory } from "@/lib/data";

export default function InteractiveMenu() {
  const [active, setActive] = useState<MenuCategory>("Starters");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;
  // While searching, match across the whole menu (name, description, category);
  // otherwise show the selected category.
  const items = searching
    ? menu.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.desc.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q),
      )
    : menu.filter((m) => m.category === active);

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

        {/* search */}
        <Reveal className="mx-auto mt-10 max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes — paneer, noodles, momos…"
              aria-label="Search the menu"
              className="w-full rounded-full border border-charcoal/15 bg-white py-3 pl-11 pr-10 font-body text-sm text-charcoal shadow-glass outline-none transition-colors focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded-full text-muted transition-colors hover:bg-charcoal/5 hover:text-crimson"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </Reveal>

        {/* filters */}
        <div
          className={`mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 transition-opacity ${
            searching ? "pointer-events-none opacity-40" : "opacity-100"
          }`}
        >
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setQuery("");
                setActive(cat);
              }}
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

      {/* results count while searching */}
      {searching && (
        <p className="mt-8 text-center font-button text-[0.62rem] uppercase tracking-wider2 text-muted">
          {items.length} {items.length === 1 ? "dish" : "dishes"} found
          {items.length ? ` for “${query.trim()}”` : ""}
        </p>
      )}

      {/* horizontal scroller */}
      <div className={searching ? "mt-6" : "mt-14"}>
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-14 text-center"
            >
              <p className="font-display text-2xl text-charcoal/70">
                No dishes match “{query.trim()}”.
              </p>
              <p className="mt-2 font-body text-sm text-muted">
                Try “paneer”, “noodles”, “momos”, or “chicken”.
              </p>
            </motion.div>
          ) : (
          <motion.div
            key={searching ? `q-${q}` : active}
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
          )}
        </AnimatePresence>
        {items.length > 0 && (
          <p className="mt-2 text-center font-button text-[0.6rem] uppercase tracking-luxe text-muted">
            ← Drag to explore · tap a dish to order →
          </p>
        )}
      </div>
    </section>
  );
}
