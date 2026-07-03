# The House of Chilli N Curry

An ultra-premium, cinematic website for a luxury Indian & Indo-Chinese dining
house. Built to feel like a world-class hospitality brand — immersive 3D hero,
storytelling scroll, glassmorphism, magnetic interactions and a full reservation
flow.

> **Tagline:** _Where Every Bite is an Experience._

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — custom luxury design tokens (crimson / cream / royal gold)
- **Framer Motion** — reveals, split text, 3D tilt, page motion
- **GSAP + ScrollTrigger** — the pinned cinematic scroll story
- **Lenis** — buttery smooth scrolling
- **React Three Fiber / Three.js** — the interactive 3D bowl in the hero
- **canvas-confetti** — reservation success celebration
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm run start
```

## Structure

```
src/
  app/
    layout.tsx            fonts, SEO metadata, viewport
    page.tsx              section assembly + JSON-LD
    globals.css           luxury design system (glass, steam, shimmer…)
    api/bookings/route.ts reservation endpoint (validation + availability)
  components/              one file per section + shared UI (ui/)
  lib/
    data.ts               ALL content: dishes, menu, gallery, testimonials, images
    fonts.ts              Playfair Display / Poppins / Montserrat
    bookings.ts           booking store + email/SMS hooks
```

## Sections

Loader → Sticky Nav → 3D Hero → Cinematic Scroll Story → Our Story → Signature
Dishes → Experience (counters) → Marquee → Interactive Menu → Chef's Special →
Gallery (+lightbox) → Testimonials → Book a Table (confetti) → Contact (map) →
Footer. Plus a custom cursor and a mobile sticky reserve bar.

## Swapping in real content

- **Text, prices, hours, socials, dishes, menu** → edit `src/lib/data.ts`.
- **Images** → currently high-res Unsplash stand-ins via the `img(id)` helper in
  `data.ts`. Replace the IDs, or point `src` at files in `/public`, to use the
  restaurant's real food photography. Broken images degrade gracefully to a
  branded gradient (see `ui/SmartImage.tsx`).

## Wiring the booking backend (optional)

The reservation flow works out of the box against an **in-memory store**
(`src/lib/bookings.ts`) — validation, availability caps and reservation IDs all
function. To persist bookings and send real confirmations:

1. Copy `.env.local.example` → `.env.local` and fill in your keys.
2. In `src/lib/bookings.ts`:
   - replace `saveBooking` / `getBooking` / `cancelBooking` with Firestore or
     Supabase calls,
   - implement `sendEmail` (Resend/SendGrid) and `sendSms` (Twilio).

No other file needs to change — the API route and UI stay the same. An admin
dashboard (list / modify / cancel) can be added as a new route once persistence
is in place.

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll, GSAP pin, heavy
  animation).
- Semantic landmarks, alt text, keyboard-usable controls, focus rings.
- `next/image` optimization (AVIF/WebP), lazy loading, code-split 3D scene.
- SEO metadata + Restaurant JSON-LD structured data.
