import type { Metadata } from "next";

import {
  APP_NAME,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_NAME,
  SUPPORT_EMAIL,
} from "@/config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern use of ${APP_NAME}.`,
};

const LAST_UPDATED = "July 27, 2026";

export default function TermsPage() {
  return (
    <div className="px-6 py-16 sm:px-10">
      <h1 className="font-extrabold text-[36px] text-foreground tracking-[-0.02em]">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Last updated: {LAST_UPDATED}
      </p>

      {/* <div className="mt-6 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-5 text-[#92400E] text-sm leading-[1.6]">
        <strong>Note:</strong> This is a draft agreement prepared for our own
        use and for app-review submissions (e.g. Meta/WhatsApp Business
        Platform). It is not legal advice and has not yet been reviewed by
        counsel — please have a qualified lawyer review this document before
        relying on it as your final, binding terms.
      </div> */}

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        1. Acceptance of terms
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        These Terms &amp; Conditions ("Terms") govern access to and use of the{" "}
        {APP_NAME} platform, website and related services (the "Service"),
        provided by {LEGAL_ENTITY_NAME} ("{APP_NAME}", "we", "us" or "our"). By
        creating an account or otherwise using the Service, you agree to be
        bound by these Terms on behalf of yourself and, if applicable, the
        accounting or tax firm you represent ("Firm", "you"). If you do not
        agree, do not use the Service.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        2. Description of the Service
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        {APP_NAME} is a client-communication layer for chartered accountants and
        tax practices. It unifies the WhatsApp Business Platform into a single
        inbox, helps classify and route incoming messages, drafts responses,
        collects documents, and sends automated reminders on the Firm's behalf
        and instructions.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        3. Accounts and eligibility
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        You must provide accurate information when creating an account and keep
        your credentials confidential. You are responsible for all activity that
        occurs under your account. The Service is intended for use by businesses
        and professionals, not consumers acting in a personal capacity.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        4. Your responsibilities and acceptable use
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        As the Firm using the Service to communicate with your own clients, you
        are responsible for:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>
          Having a lawful basis and, where required, consent to message your
          clients over WhatsApp;
        </li>
        <li>
          Complying with WhatsApp Business Platform's messaging and commerce
          policies, and all applicable data protection, telecom and consumer
          protection laws;
        </li>
        <li>
          Not using the Service to send unsolicited bulk messages, spam,
          phishing content or unlawful communications;
        </li>
        <li>
          The accuracy and lawfulness of any content, documents or instructions
          you input into or transmit through the Service.
        </li>
      </ul>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        5. Fees and payment
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        Pricing, billing frequency and payment terms are set out in your order
        form, invoice, or separate agreement with us. Fees are non-refundable
        except as required by law or as expressly stated in your agreement.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        6. Intellectual property
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We and our licensors retain all right, title and interest in the
        Service, including its software, design and trademarks. You retain all
        rights to your own data and content. You grant us a limited license to
        host, process and transmit that content solely to provide the Service to
        you.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        7. Third-party services
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        The Service integrates with third-party platforms, including the Meta
        WhatsApp Business Platform and Cal.com for scheduling. Your use of those
        integrations is also subject to the applicable third party's own terms,
        and we are not responsible for their acts, omissions or availability.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        8. Disclaimers
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        The Service is provided "as is" and "as available", without warranties
        of any kind, whether express or implied, including merchantability,
        fitness for a particular purpose, and non-infringement. AI-drafted
        replies and classifications may contain errors; you remain responsible
        for reviewing communications sent to your clients before relying on the
        Service to send them automatically.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        9. Limitation of liability
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        To the maximum extent permitted by law, {LEGAL_ENTITY_NAME} shall not be
        liable for any indirect, incidental, special, consequential or punitive
        damages, or any loss of profits or revenues, arising out of or related
        to your use of the Service. Our aggregate liability for any claim
        arising out of these Terms shall not exceed the fees paid by you to us
        in the twelve (12) months preceding the claim.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        10. Indemnification
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        You agree to indemnify and hold {LEGAL_ENTITY_NAME} harmless from claims
        arising from your misuse of the Service, your content, or your breach of
        these Terms or applicable law, including claims brought by your own
        clients.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        11. Termination
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        Either party may terminate the Service as set out in your order form or
        agreement, or, absent one, with 30 days' written notice. We may suspend
        or terminate access immediately for material breach of these Terms,
        including violations of WhatsApp Business Platform policies.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        12. Governing law and disputes
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        These Terms are governed by the laws of India, without regard to
        conflict-of-law principles. The courts of Bengaluru, Karnataka shall
        have exclusive jurisdiction over any dispute arising out of or relating
        to these Terms or the Service.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        13. Changes to these terms
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We may update these Terms from time to time. Material changes will be
        reflected by updating the "Last updated" date above, and, where
        required, we will provide additional notice.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        14. Contact us
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        {LEGAL_ENTITY_NAME}
        <br />
        {LEGAL_ENTITY_ADDRESS}
        <br />
        Email:{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold underline">
          {SUPPORT_EMAIL}
        </a>
      </p>
    </div>
  );
}
