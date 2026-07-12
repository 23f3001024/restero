import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern orders, reservations and use of The House of Chilli N Curry website and services.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms &"
      accent="Conditions"
      subtitle="The terms that govern orders, reservations, and use of our website."
      updated="12 July 2026"
    >
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the
        website and the ordering and reservation services of The House of Chilli N
        Curry (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By placing an
        order, making a reservation, or using our website, you agree to these Terms.
        If you do not agree, please do not use our services.
      </p>

      <h2>1. About us</h2>
      <p>
        {BRAND.name}, {BRAND.address}. FSSAI Lic. No. {BRAND.fssai}.
      </p>

      <h2>2. Orders</h2>
      <ul>
        <li>
          You can browse our menu and place orders for dine-in or takeaway through
          our website or by scanning a table QR code.
        </li>
        <li>
          All items are subject to availability. We may decline or cancel an order
          if an item is unavailable, if details appear incorrect, or if we suspect
          misuse.
        </li>
        <li>
          An order is accepted once we confirm it. We may contact you by phone or
          WhatsApp about your order.
        </li>
      </ul>

      <h2>3. Pricing &amp; payment</h2>
      <ul>
        <li>
          Prices are shown in Indian Rupees (₹). Order totals are calculated by us
          from our current menu at the time of ordering, and applicable taxes and
          charges apply as per law.
        </li>
        <li>
          You can pay by UPI (completed in your own app), card, or at our counter,
          as offered at checkout.
        </li>
        <li>
          For UPI, please complete the payment and enter your transaction
          reference; your order is confirmed once we verify it. We are not
          responsible for payments made to UPI IDs other than the one shown at
          checkout.
        </li>
      </ul>

      <h2>4. Reservations</h2>
      <ul>
        <li>Table reservations are subject to availability and confirmation.</li>
        <li>
          Please arrive on time. We may release a table if you are significantly
          late without notice.
        </li>
        <li>
          We may need to modify or cancel a reservation due to circumstances beyond
          our control, and will try to inform you in advance.
        </li>
      </ul>

      <h2>5. Cancellations &amp; refunds</h2>
      <p>
        For any issue with an order or payment, please contact us as soon as
        possible using the details below. Refunds, where applicable, are handled at
        our reasonable discretion, in line with the payment method used and
        applicable law.
      </p>

      <h2>6. Food, allergens &amp; health</h2>
      <ul>
        <li>
          Our dishes may contain, or come into contact with, common allergens
          (such as dairy, nuts, gluten, soy, and seafood). If you have allergies or
          dietary requirements, please tell us before ordering.
        </li>
        <li>
          Spice levels and preparation are handled to the best of our ability based
          on the requests you provide.
        </li>
      </ul>

      <h2>7. Use of the website</h2>
      <p>
        You agree to use the website lawfully and not to interfere with its
        operation, attempt unauthorised access, or submit false or misleading
        information.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The content, branding, images, and design of this website are owned by or
        licensed to us and may not be copied or used without our permission.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect or
        consequential losses arising from the use of our website or services.
        Nothing in these Terms limits any liability that cannot be limited by law.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of India, and the courts at Pune,
        Maharashtra shall have jurisdiction over any disputes.
      </p>

      <h2>11. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo;
        date above shows the latest version; continued use of our services means you
        accept the updated Terms.
      </p>

      <h2>12. Contact us</h2>
      <p>
        <strong>{BRAND.name}</strong>
        <br />
        {BRAND.address}
        <br />
        Phone: {BRAND.phone}
        {BRAND.phone2 ? ` · ${BRAND.phone2}` : ""}
      </p>
    </LegalLayout>
  );
}
