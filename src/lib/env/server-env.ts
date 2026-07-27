import { z } from "zod";

import { BOLD, GREEN, RED, RESET } from "@/config";

// Schema for environment variables
const envSchema = z.object({
  API_URL: z.string().url().optional(),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USERNAME: z.string().min(1),
  SMTP_PASSWORD: z.string().min(1),
  SMTP_USE_TLS: z
    .string()
    .optional()
    .transform((val) => val !== "false"),
  SMTP_FROM_EMAIL: z.string().email(),
  SMTP_FROM_NAME: z.string().min(1),
  CONTACT_RECIPIENT_EMAIL: z.string().email(),
});

const rowEnv = {
  API_URL: process.env.API_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_USE_TLS: process.env.SMTP_USE_TLS,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
  SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
  CONTACT_RECIPIENT_EMAIL: process.env.CONTACT_RECIPIENT_EMAIL,
};

// Validate env
const envValidationResult = envSchema.safeParse(rowEnv);
export const serverEnv = envValidationResult.success
  ? envValidationResult.data
  : undefined;

export const validateServerEnv = () => {
  if (!envValidationResult.success) {
    const { formErrors, fieldErrors } = z.flattenError(
      envValidationResult.error,
    );

    const errorMessages: string[] = [];

    // Add form-level errors
    formErrors.forEach((msg, i) => {
      errorMessages.push(`   ${i + 1}) ${msg}`);
    });

    // Add field-level errors
    Object.entries(fieldErrors).forEach(([field, errs]) => {
      errs?.forEach((msg) => {
        errorMessages.push(`   - ${field}: ${msg}`);
      });
    });

    throw new Error(
      `\n ${BOLD}${RED}✗${RESET} Error in loading server environment variables:\n${errorMessages.join(
        "\n",
      )}\n\n Please update the environment variables and relaunch the application.`,
    );
  }

  console.info(
    ` ${BOLD}${GREEN}✓${RESET} Server Environment variables loaded successfully`,
  );
};
