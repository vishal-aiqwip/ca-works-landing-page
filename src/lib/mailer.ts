import nodemailer from "nodemailer";

import { serverEnv } from "@/lib/env/server-env";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!serverEnv) {
    throw new Error("Server environment variables failed validation.");
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: serverEnv.SMTP_HOST,
      port: serverEnv.SMTP_PORT,
      secure: serverEnv.SMTP_PORT === 465,
      requireTLS: serverEnv.SMTP_USE_TLS,
      auth: {
        user: serverEnv.SMTP_USERNAME,
        pass: serverEnv.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendMail(options: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  if (!serverEnv) {
    throw new Error("Server environment variables failed validation.");
  }
  await getTransporter().sendMail({
    from: `"${serverEnv.SMTP_FROM_NAME}" <${serverEnv.SMTP_FROM_EMAIL}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  });
}
