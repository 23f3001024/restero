"use client";

import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { BRAND } from "@/lib/data";

const HANDLE = "@thehouseofchilincurry";

export default function InstagramFollow() {
  return (
    <section className="relative overflow-hidden bg-cream-light py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.2rem] p-8 text-center text-white shadow-luxe sm:p-12">
            {/* Instagram gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#833AB4_0%,#C13584_28%,#E1306C_52%,#F56040_76%,#FCAF45_100%)]" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Instagram size={30} />
              </span>

              <h2 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
                Stay connected for updates
              </h2>
              <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-white/85 sm:text-base">
                Get all our latest updates on Instagram — new dishes, specials,
                offers and behind-the-scenes from the kitchen.
              </p>

              <a
                href={BRAND.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-button text-[0.75rem] font-bold uppercase tracking-wider2 text-charcoal shadow-luxe transition-transform hover:scale-[1.04]"
              >
                <Instagram size={17} className="text-[#E1306C]" />
                Follow {HANDLE}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
