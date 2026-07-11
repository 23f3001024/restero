import type { Metadata, Viewport } from "next";
import { playfair, poppins, montserrat } from "@/lib/fonts";
import "./globals.css";

const SITE = "https://houseofchillincurry.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "The House of Chilli N Curry — Where Every Bite is an Experience",
    template: "%s · The House of Chilli N Curry",
  },
  description:
    "A luxury Indo-Chinese & Pan-Asian dining destination. Bold Schezwan, Thai curries, wok-fired noodles, momos and more — crafted with passion, fire and elegance.",
  keywords: [
    "luxury Indo-Chinese restaurant",
    "Pan-Asian fine dining",
    "Thai curry",
    "schezwan",
    "wok-fired noodles",
    "The House of Chilli N Curry",
  ],
  openGraph: {
    type: "website",
    title: "The House of Chilli N Curry",
    description: "Where Every Bite is an Experience.",
    url: SITE,
    siteName: "The House of Chilli N Curry",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#B71C1C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
