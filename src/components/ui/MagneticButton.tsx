"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "outline" | "gold";
  className?: string;
  type?: "button" | "submit";
};

/**
 * Magnetic, ripple-capable button. Pulls toward the cursor and springs back.
 */
export default function MagneticButton({
  children,
  onClick,
  href,
  variant = "solid",
  className = "",
  type = "button",
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.4}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 font-button text-[0.82rem] font-semibold uppercase tracking-wider2 transition-[box-shadow,color] duration-500 will-change-transform";

  const styles = {
    solid:
      "bg-crimson text-cream shadow-luxe hover:shadow-luxe-gold before:absolute before:inset-0 before:-z-0 before:translate-y-full before:bg-charcoal before:transition-transform before:duration-500 hover:before:translate-y-0",
    gold:
      "bg-gradient-to-r from-gold-deep via-gold to-gold-deep text-charcoal shadow-luxe-gold before:absolute before:inset-0 before:-z-0 before:translate-y-full before:bg-charcoal before:transition-transform before:duration-500 hover:before:translate-y-0 hover:text-cream",
    outline:
      "border border-charcoal/25 text-charcoal hover:border-crimson before:absolute before:inset-0 before:-z-0 before:translate-y-full before:bg-crimson before:transition-transform before:duration-500 hover:before:translate-y-0 hover:text-cream",
  }[variant];

  const handleClick = () => {
    if (href) {
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        import("@/components/SmoothScroll").then(({ scrollToId }) =>
          scrollToId(href.replace("#", "")),
        );
        return;
      }
    }
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleClick}
      className={`${base} ${styles} ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
