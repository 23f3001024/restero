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
    "A luxury Indian & Indo-Chinese dining destination. Authentic North Indian, Mughlai, Tandoori, Biryani and Indo-Chinese cuisine crafted with passion, tradition and elegance.",
  keywords: [
    "luxury Indian restaurant",
    "Indo-Chinese fine dining",
    "biryani",
    "tandoori",
    "Mughlai cuisine",
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
