import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignatureDishes from "@/components/SignatureDishes";
import DiscoverPages from "@/components/DiscoverPages";
import ScanToOrder from "@/components/ScanToOrder";
import InstagramFollow from "@/components/InstagramFollow";
import Testimonials from "@/components/Testimonials";
import ReserveCTA from "@/components/ReserveCTA";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import GlobalScanner from "@/components/GlobalScanner";
import { BRAND } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BRAND.name,
  servesCuisine: ["Indo-Chinese", "Thai", "Pan-Asian", "Chinese", "Asian"],
  priceRange: "$$$",
  telephone: BRAND.phone,
  hasMap: BRAND.mapUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop C-07, Dynamic Grandeur, Wadachiwadi, Undri",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411060",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.4446324,
    longitude: 73.9161625,
  },
  slogan: BRAND.tagline,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Cursor />
      <Navbar />
      <MobileBar />
      <GlobalScanner />
      <SmoothScroll>
        <main>
          <Hero />
          <SignatureDishes />
          <DiscoverPages />
          <ScanToOrder />
          <InstagramFollow />
          <Testimonials />
          <ReserveCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
