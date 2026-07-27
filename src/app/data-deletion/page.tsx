import type { Metadata } from "next";

import {
  APP_NAME,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_NAME,
  SUPPORT_EMAIL,
} from "@/config";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description: `How to request deletion of your data from ${APP_NAME}.`,
};

const LAST_UPDATED = "July 27, 2026";

export default function DataDeletionPage() {
  return (
    <div className="px-6 py-16 sm:px-10">
      <h1 className="font-extrabold text-[36px] text-foreground tracking-[-0.02em]">
        Data Deletion Instructions
      </h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Last updated: {LAST_UPDATED}
      </p>

      <p className="mt-8 text-[#475569] leading-[1.7]">
        This page explains how to request deletion of personal information that{" "}
        {LEGAL_ENTITY_NAME} ("{APP_NAME}") holds about you, including
        information connected through the Meta WhatsApp Business Platform.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        Who this applies to
      </h2>
      <ul className="list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>
          <strong>Firm account holders</strong> — accounting or tax
          professionals with a direct {APP_NAME} account.
        </li>
        <li>
          <strong>Clients of a Firm</strong> — if you exchanged WhatsApp
          messages with an accounting/tax firm that uses {APP_NAME}, you may
          request deletion of your own communication data as explained below.
          Because the Firm controls that data, we may ask the Firm to confirm
          the request before we act on it.
        </li>
      </ul>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        What can be deleted
      </h2>
      <ul className="list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>Your account profile information (name, email, phone number).</li>
        <li>
          Message content and attachments exchanged via WhatsApp through the
          Service.
        </li>
        <li>Usage logs and analytics tied to your identity, where feasible.</li>
      </ul>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        How to request deletion
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        Email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold underline">
          {SUPPORT_EMAIL}
        </a>{" "}
        with the subject line <strong>"Data Deletion Request"</strong> and
        include:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-[1.7]">
        <li>
          The phone number, email address or business/firm name associated with
          the data;
        </li>
        <li>Whether you are a Firm account holder or a Firm's client;</li>
        <li>Any details that help us locate the relevant records.</li>
      </ul>
      <p className="mt-4 text-[#475569] leading-[1.7]">
        We may ask you to verify your identity, or — if you are a Firm's client
        — confirm the request with the relevant Firm, before processing it.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        What happens next
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We will acknowledge your request within 7 business days and complete
        deletion (or explain what we're unable to delete and why) within 30
        days.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        Data we may retain
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        We may retain certain information after a deletion request where
        required for legal, tax, accounting or fraud-prevention purposes — for
        example, financial or invoicing records a Firm is legally required to
        retain, or records needed to resolve disputes or enforce our agreements.
        Retained data is limited to what is necessary for these purposes.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        Related policies
      </h2>
      <p className="text-[#475569] leading-[1.7]">
        See our{" "}
        <a href="/privacy" className="font-semibold underline">
          Privacy Policy
        </a>{" "}
        for more on how we collect, use and share information, and our{" "}
        <a href="/terms" className="font-semibold underline">
          Terms &amp; Conditions
        </a>{" "}
        for the terms governing the Service.
      </p>

      <h2 className="mt-10 mb-3 font-bold text-[22px] text-foreground">
        Contact us
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
