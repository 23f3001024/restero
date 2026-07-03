"use client";

import Cursor from "./Cursor";
import Navbar from "./Navbar";
import MobileBar from "./MobileBar";
import GlobalScanner from "./GlobalScanner";
import SmoothScroll from "./SmoothScroll";
import Footer from "./Footer";

/** Shared chrome for the marketing sub-pages (About, Menu, Gallery, Contact, Reserve). */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <Navbar />
      <MobileBar />
      <GlobalScanner />
      <SmoothScroll>
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
