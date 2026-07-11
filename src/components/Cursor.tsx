"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom luxury cursor: a soft gold glow that lags behind a crisp dot, and
 * grows into a ring when hovering interactive elements. Disabled on touch.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let isHover = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`;
      }
      const t = e.target as HTMLElement;
      const next = !!t.closest("a, button, [data-cursor='hover'], input, textarea, select");
      // Only touch React state when the hover status actually flips.
      if (next !== isHover) {
        isHover = next;
        setHovering(next);
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x - 22}px, ${ringPos.y - 22}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-crimson mix-blend-multiply"
      />
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] h-11 w-11 rounded-full border transition-[width,height,opacity,background,border-color] duration-300 ${
          hovering
            ? "scale-150 border-gold/80 bg-gold/10"
            : "border-crimson/40 bg-transparent"
        }`}
        style={{ boxShadow: "0 0 30px rgba(245,197,24,0.3)" }}
      />
    </>
  );
}
