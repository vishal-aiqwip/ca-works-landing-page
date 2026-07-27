import { NextResponse } from "next/server";

import { z } from "zod";

import { serverEnv } from "@/lib/env/server-env";
import { sendMail } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the form and try again.",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const { name, email, message } = parsed.data;

  if (!serverEnv) {
    console.error(
      "Cannot send contact email: server env vars failed validation.",
    );
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong sending your message. Please try again later.",
      },
      { status: 500 },
    );
  }

  try {
    await sendMail({
      to: serverEnv.CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true, message: "Message sent." });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong sending your message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
