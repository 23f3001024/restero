"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import SmartImage from "./ui/SmartImage";
import SectionLabel from "./ui/SectionLabel";
import { Reveal } from "./ui/Reveal";
import { signatureDishes, type Dish } from "@/lib/data";

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Reveal delay={(index % 4) * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-charcoal/5 bg-white shadow-glass transition-shadow duration-500 hover:shadow-luxe"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <SmartImage
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-70" />
          {dish.tag && (
            <span className="glass-dark absolute left-3 top-3 rounded-full px-3 py-1 font-button text-[0.58rem] uppercase tracking-wider2 text-cream">
              {dish.tag}
            </span>
          )}
          {/* hover lighting sheen */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,197,24,0.4),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl text-charcoal">{dish.name}</h3>
            <span className="whitespace-nowrap font-display text-lg font-semibold text-crimson">
              {dish.price}
            </span>
          </div>
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-muted">
            {dish.desc}
          </p>
          <button
            onClick={() =>
              router.push(`/order?add=${encodeURIComponent(dish.menuName ?? dish.name)}`)
            }
            className="mt-5 flex items-center justify-center gap-2 rounded-full border border-charcoal/15 py-3 font-button text-[0.7rem] font-semibold uppercase tracking-wider2 text-charcoal transition-colors duration-300 hover:border-crimson hover:bg-crimson hover:text-cream"
          >
            <Plus size={14} /> Add to Order
          </button>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function SignatureDishes() {
  return (
    <section className="relative bg-gradient-to-b from-white to-cream-light py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Signature Dishes</SectionLabel>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            The plates we&apos;re
            <span className="text-crimson-gradient italic"> known for.</span>
          </h2>
          <p className="mt-4 font-body text-muted">
            Eight house icons — each one a reason our guests keep coming back.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureDishes.map((dish, i) => (
            <DishCard key={dish.name} dish={dish} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
