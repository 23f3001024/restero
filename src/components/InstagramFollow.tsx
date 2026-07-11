"use client";

import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { BRAND } from "@/lib/data";

const HANDLE = "@thehouseofchilincurry";

export default function InstagramFollow() {
  return (
    <section className="relative overflow-hidden bg-cream-light py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.8rem] border border-gold/25 bg-charcoal p-7 text-center text-cream shadow-luxe sm:rounded-[2.2rem] sm:p-12">
            {/* gold ambience */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold sm:h-16 sm:w-16">
                <Instagram size={28} />
              </span>

              <h2 className="mt-5 font-display text-[1.6rem] font-semibold leading-tight sm:mt-6 sm:text-4xl">
                Stay connected for{" "}
                <span className="text-gold-gradient italic">updates</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-cream/70">
                Get all our latest updates on Instagram — new dishes, specials,
                offers and behind-the-scenes from the kitchen.
              </p>

              <a
                href={BRAND.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="group mx-auto mt-7 flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep px-5 py-3.5 text-charcoal shadow-luxe-gold transition-transform hover:scale-[1.02] sm:w-auto sm:px-8"
              >
                <Instagram size={18} className="shrink-0" />
                <span className="min-w-0 text-left leading-tight">
                  <span className="block font-button text-[0.52rem] font-semibold uppercase tracking-wider2 text-charcoal/60">
                    Follow us
                  </span>
                  <span className="block break-all font-button text-[0.72rem] font-bold sm:text-[0.8rem]">
                    {HANDLE}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
