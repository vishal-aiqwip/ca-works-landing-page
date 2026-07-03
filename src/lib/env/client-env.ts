import { z } from 'zod';

import { BOLD, GREEN, RED, RESET } from '@/config';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url({ message: 'required' }),
});

const rowEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

const envValidationResult = envSchema.safeParse(rowEnv);

export const clientEnv = envValidationResult.success ? envValidationResult.data : undefined;

export const validateClientEnv = () => {
  if (!envValidationResult.success) {
    const { formErrors, fieldErrors } = z.flattenError(envValidationResult.error);

    const errorMessages: string[] = [];

    // Add form-level errors (e.g., unknown keys)
    formErrors.forEach((msg, i) => {
      errorMessages.push(`   ${i + 1}) ${msg}`);
    });

    // Add field-specific errors
    Object.entries(fieldErrors).forEach(([field, errs]) => {
      errs.forEach((msg) => {
        errorMessages.push(`   - ${field}: ${msg}`);
      });
    });

    console.error(
      `\n ${BOLD}${RED}✗${RESET} Error in loading client environment variables:\n${errorMessages.join(
        '\n'
      )}\n\n Please update the environment variables and relaunch the application.`
    );
    return;
  }

  console.info(`\n ${BOLD}${GREEN}✓${RESET} Client Environment variables loaded successfully`);
};
