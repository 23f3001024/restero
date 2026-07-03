"use client";

import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { BRAND } from "@/lib/data";

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=77.19%2C28.61%2C77.25%2C28.65&layer=mapnik&marker=28.6315%2C77.2197";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-cream-light py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Visit Us</SectionLabel>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            Find your way
            <span className="text-crimson-gradient italic"> to the table.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-glass">
              <iframe
                title="Map to The House of Chilli N Curry"
                src={MAP_SRC}
                className="h-full min-h-[22rem] w-full grayscale-[0.2]"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] bg-white p-8 shadow-glass sm:p-10">
              <div className="space-y-6">
                {[
                  { Icon: MapPin, label: "Address", value: BRAND.address },
                  { Icon: Phone, label: "Reservations", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
                  { Icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-button text-[0.6rem] uppercase tracking-wider2 text-muted">
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="font-body text-charcoal transition-colors hover:text-crimson">
                          {value}
                        </a>
                      ) : (
                        <p className="font-body text-charcoal">{value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-crimson/10 text-crimson">
                    <Clock size={18} />
                  </span>
                  <div>
                    <p className="font-button text-[0.6rem] uppercase tracking-wider2 text-muted">
                      Working Hours
                    </p>
                    {BRAND.hours.map((h) => (
                      <p key={h.day} className="font-body text-sm text-charcoal">
                        <span className="text-muted">{h.day}:</span> {h.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-charcoal/10 pt-6">
                {[
                  { Icon: Instagram, href: BRAND.socials.instagram, label: "Instagram" },
                  { Icon: Facebook, href: BRAND.socials.facebook, label: "Facebook" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-crimson hover:bg-crimson hover:text-cream"
                  >
                    <Icon size={18} />
                  </a>
                ))}
                <a
                  href={BRAND.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto rounded-full bg-crimson px-5 py-2.5 font-button text-[0.68rem] font-semibold uppercase tracking-wider2 text-cream transition-colors hover:bg-crimson-deep"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
