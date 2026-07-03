import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollStory from "@/components/ScrollStory";
import SignatureDishes from "@/components/SignatureDishes";
import DiscoverPages from "@/components/DiscoverPages";
import ScanToOrder from "@/components/ScanToOrder";
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
  servesCuisine: ["Indian", "Mughlai", "Indo-Chinese", "Tandoori", "Biryani"],
  priceRange: "$$$",
  telephone: BRAND.phone,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.address,
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
          <ScrollStory />
          <SignatureDishes />
          <DiscoverPages />
          <ScanToOrder />
          <Testimonials />
          <ReserveCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
