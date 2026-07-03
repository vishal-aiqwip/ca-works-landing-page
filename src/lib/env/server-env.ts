import { z } from "zod";

import { BOLD, GREEN, RED, RESET } from "@/config";

// Schema for environment variables
const envSchema = z.object({
  API_URL: z.string().url().optional(),
});

const rowEnv = {
  API_URL: process.env.API_URL,
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
