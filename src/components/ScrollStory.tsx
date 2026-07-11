"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINES = [
  "The flame is lit before dawn.",
  "Chillies are pounded by hand.",
  "Ginger and garlic hit the oil.",
  "And the wok begins to breathe.",
];

export default function ScrollStory() {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".story-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "+=280%",
          scrub: 1,
          pin: pin.current,
          anticipatePin: 1,
        },
      });

      // gentle camera zoom + slow rotation of the backdrop glow
      tl.fromTo(
        ".story-glow",
        { scale: 1, rotate: 0 },
        { scale: 1.5, rotate: 40, ease: "none" },
        0,
      );
      tl.to(pin.current, { backgroundColor: "#140606", ease: "none" }, 0);

      lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, y: 40, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          i * 1.2,
        );
        if (i < lines.length - 1) {
          tl.to(line, { opacity: 0.15, y: -30, duration: 0.8 }, i * 1.2 + 1);
        }
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative">
      <div
        ref={pin}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-charcoal"
      >
        <div className="story-glow pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(183,28,28,0.55),transparent_70%)] blur-2xl" />
        <div className="story-glow pointer-events-none absolute h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35),transparent_70%)] blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow mb-10 text-gold/80">The Ritual</p>
          <div className="relative grid">
            {LINES.map((line, i) => (
              <h2
                key={i}
                className="story-line col-start-1 row-start-1 font-display text-3xl font-medium leading-tight text-cream sm:text-5xl lg:text-6xl"
              >
                {line}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
