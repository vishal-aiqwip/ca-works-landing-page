import type { Metadata } from "next";

import {
  APP_NAME,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_NAME,
  SUPPORT_EMAIL,
} from "@/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${APP_NAME} collects, uses and protects information.`,
};

const LAST_UPDATED = "July 27, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="px-6 py-16 sm:px-10">
      <h1 className="font-extrabold text-[36px] text-foreground tracking-[-0.02em]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Last updated: {LAST_UPDATED}
      </p>

      <p className="mt-8 text-[#475569] leading-[1.7]">
        This Privacy Policy explains how {LEGAL_ENTITY_NAME} ("{APP_NAME}",
        "we", "us" or "our") collects, uses, discloses and safeguards
        information when you use our client-communication platform for chartered
        accountants and tax practices, which connects Email and the WhatsApp
        Business Platform into a single inbox ("Service").
      </p>

      {/* <div className="mt-6 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-5 text-[#92400E] text-sm leading-[1.6]">
        <strong>Note:</strong> This is a draft policy prepared for our own use
        and for app-review submissions (e.g. Meta/WhatsApp Business Platform).
        It is not legal advice and has not yet been reviewed by counsel — please
        have a qualified lawyer review this document before relying on it as
        your final, binding policy.
      </div> */}

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        1. Two kinds of data we handle
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        {APP_NAME} is a business-to-business tool used by chartered accountant
        and tax firms ("Firm", "you", "your customer"). Because of how the
        Service works, we handle two distinct categories of information:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>
          <strong>Firm account data</strong> — information about the Firm and
          its staff who sign up for and use {APP_NAME} directly (e.g. name, work
          email, phone number, billing details). For this data, we are the{" "}
          <strong>data controller</strong>.
        </li>
        <li>
          <strong>Client communication data</strong> — messages, documents and
          contact details belonging to the Firm's own clients, sent or received
          through WhatsApp or Email while the Firm uses the Service. For this
          data, the Firm is the <strong>data controller</strong> and we act only
          as a <strong>data processor</strong> on the Firm's instructions.
        </li>
      </ul>
      <p className="mt-4 text-[#475569] leading-[1.7]">
        If you are a client of a Firm that uses {APP_NAME} and have questions
        about how your own data is handled, please contact that Firm directly —
        they control how and why your information is collected and used.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        2. Information we collect
      </h2>
      <ul className="list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>
          <strong>Account information:</strong> name, email address, phone
          number, firm name, role, and password/authentication details.
        </li>
        <li>
          <strong>Communication content:</strong> messages, attachments,
          documents and metadata (timestamps, delivery/read status, channel)
          sent or received via the WhatsApp Business Platform or Email through
          the Service.
        </li>
        <li>
          <strong>Usage data:</strong> log data, device and browser information,
          IP address, pages visited and actions taken within the Service.
        </li>
        <li>
          <strong>Cookies and analytics:</strong> we use Google Analytics and
          Google Tag Manager on our marketing website to understand traffic and
          improve the site.
        </li>
        <li>
          <strong>Scheduling data:</strong> if you book a demo, scheduling
          details are collected by our scheduling provider, Cal.com, under its
          own privacy policy.
        </li>
      </ul>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        3. How we use information
      </h2>
      <ul className="list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>
          To provide, operate and maintain the Service, including reading,
          classifying, routing, drafting replies to and filing documents from
          client messages, on the Firm's behalf and instructions.
        </li>
        <li>To authenticate accounts and secure the Service.</li>
        <li>
          To communicate with Firm accounts about updates, support and billing.
        </li>
        <li>To analyze and improve the Service and our marketing website.</li>
        <li>To comply with legal obligations and enforce our Terms.</li>
      </ul>
      <p className="mt-4 text-[#475569] leading-[1.7]">
        We do not use client communication data to train third-party foundation
        models in a way that exposes one Firm's client data to another, and we
        do not sell personal information.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        4. How we share information
      </h2>
      <ul className="list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>
          <strong>Meta / WhatsApp Business Platform</strong> — messages sent or
          received via WhatsApp necessarily pass through Meta's WhatsApp
          Business Platform, subject to{" "}
          <a
            href="https://www.whatsapp.com/legal/business-data-processing-terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Meta's Business Data Processing Terms
          </a>
          .
        </li>
        <li>
          <strong>Infrastructure and sub-processors</strong> — hosting, storage,
          email delivery, and analytics providers we use to operate the Service,
          bound by confidentiality and data-protection obligations.
        </li>
        <li>
          <strong>Legal reasons</strong> — where required by law, regulation,
          legal process, or to protect the rights, property or safety of
          {` ${APP_NAME}`}, our customers, or others.
        </li>
        <li>
          <strong>Business transfers</strong> — in connection with a merger,
          acquisition or sale of assets, subject to this Policy.
        </li>
      </ul>
      <p className="mt-4 text-[#475569] leading-[1.7]">
        We do not share client communication data between different Firms.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        5. Data retention
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We retain account data for as long as a Firm's account is active, and
        client communication data for as long as instructed by the Firm or as
        needed to provide the Service, subject to applicable recordkeeping
        requirements (for example, accounting and tax records Firms may be
        legally required to retain). See our{" "}
        <a href="/data-deletion" className="font-semibold underline">
          Data Deletion page
        </a>{" "}
        for how to request deletion.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        6. Data security
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We use reasonable administrative, technical and physical safeguards
        designed to protect information from unauthorized access, alteration,
        disclosure or destruction. No method of transmission or storage is
        completely secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        7. Your rights and choices
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        Depending on your location and applicable law, you may have rights to
        access, correct, export or request deletion of your personal
        information. Firm account holders can reach us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold underline">
          {SUPPORT_EMAIL}
        </a>{" "}
        to exercise these rights, or visit our{" "}
        <a href="/data-deletion" className="font-semibold underline">
          Data Deletion page
        </a>
        . If you are a client of a Firm using {APP_NAME}, please contact that
        Firm directly, as they control your data.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        8. Children's privacy
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        The Service is intended for business use by accounting and tax
        professionals and is not directed to children. We do not knowingly
        collect personal information from children.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        9. International data transfers
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We are based in India, and information may be processed in India or
        other countries where our service providers operate. Where required, we
        take steps intended to ensure transfers comply with applicable data
        protection law.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        10. Changes to this policy
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We may update this Privacy Policy from time to time. Material changes
        will be reflected by updating the "Last updated" date above.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        11. Contact us
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
