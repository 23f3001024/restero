"use client";

const WORDS = [
  "Indo-Chinese",
  "Schezwan",
  "Thai Curry",
  "Wok-Fired",
  "Noodles",
  "Momos",
  "Seafood",
  "Vegetarian",
  "Desserts",
];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-charcoal/10 bg-white py-6">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-display text-3xl italic text-charcoal/80 sm:text-4xl">
              {w}
            </span>
            <span className="text-2xl text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
