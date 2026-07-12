import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The House of Chilli N Curry collects, uses and protects your information when you order, reserve a table, or use our website.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy"
      accent="Policy"
      subtitle="How we handle your information when you order, reserve, or browse."
      updated="12 July 2026"
    >
      <p>
        The House of Chilli N Curry (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) operates this website and our in-restaurant and online
        ordering and reservation services. This Privacy Policy explains what
        personal information we collect, how we use it, and the choices you have.
        By using our website or services, you agree to this policy.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Contact details</strong> — your name, phone number, and (for
          reservations) email address.
        </li>
        <li>
          <strong>Order &amp; reservation details</strong> — items ordered, table
          number, dine-in or takeaway preference, party size, date and time, and
          any notes or special requests you provide.
        </li>
        <li>
          <strong>Payment reference</strong> — for UPI payments made in your own
          app, we record the transaction/UTR reference you enter so we can match
          your payment. We do <strong>not</strong> collect or store card numbers,
          your UPI PIN, or banking credentials.
        </li>
        <li>
          <strong>Technical data</strong> — basic information your browser sends
          automatically (such as device and browser type), used to keep the site
          working and secure.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To take, prepare, and fulfil your orders and reservations.</li>
        <li>To contact you about your order or booking (for example, by phone or WhatsApp).</li>
        <li>To reconcile and confirm payments.</li>
        <li>To operate, secure, and improve our website and services.</li>
        <li>To comply with legal, tax, and food-safety obligations.</li>
      </ul>

      <h2>3. Payments</h2>
      <p>
        Online payments are completed in your own UPI app (such as Google Pay,
        PhonePe, or Paytm) or at our counter. We do not process card details on
        this website. For UPI, we only store the reference number you provide so
        we can verify your payment.
      </p>

      <h2>4. How we store and protect your data</h2>
      <p>
        Order and reservation records are stored securely with our hosting and
        database providers. Access is limited to authorised staff and protected by
        access controls, including a staff PIN. While we take reasonable measures
        to protect your data, no method of transmission or storage is completely
        secure.
      </p>

      <h2>5. Sharing your information</h2>
      <p>We do not sell your personal information. We may share it with:</p>
      <ul>
        <li>
          Service providers who help us run our website, database, and messaging,
          and who are required to protect it;
        </li>
        <li>
          Authorities or others where required by law, or to protect our rights,
          property, and safety.
        </li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        Our public website does not use advertising or third-party tracking
        cookies. Our staff area uses a single secure cookie solely to keep
        authorised staff signed in.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We keep order and reservation records for as long as needed to provide our
        services and to meet legal, accounting, and tax requirements, after which
        they are deleted or anonymised.
      </p>

      <h2>8. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal
        information we hold about you, subject to legal limits. To make a request,
        contact us using the details below.
      </p>

      <h2>9. Children</h2>
      <p>
        Our services are intended for a general audience and are not directed at
        children. We do not knowingly collect personal information from children
        without parental consent.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo;
        date above shows when it was last revised; continued use of our services
        means you accept the updated policy.
      </p>

      <h2>11. Contact us</h2>
      <p>
        <strong>{BRAND.name}</strong>
        <br />
        {BRAND.address}
        <br />
        Phone: {BRAND.phone}
        {BRAND.phone2 ? ` · ${BRAND.phone2}` : ""}
        <br />
        FSSAI Lic. No. {BRAND.fssai}
      </p>
    </LegalLayout>
  );
}
