import z from "zod";

/**
 * Email Schema
 */
export const emailSchema = (): z.ZodEmail => {
  return z
    .email()
    .min(5, { message: "Email must be required." })
    .max(255, { message: "Email must have max 255 characters" });
};

/**
 * Select Validation
 */
export const selectSchema = (key: string, min = 1) => {
  return z
    .string({
      message: `${key} is required.`,
    })
    .min(min, { message: `${key} is required.` });
};

/**
 * String Validation
 */
export const stringSchema = (
  key: string,
  min: number | false = 3,
  max: number | false = 255,
) => {
  let schema = z.string({ message: `${key} is required.` });

  if (min) {
    schema = schema.min(min, {
      message: `${key} must be at least ${min} characters.`,
    });
  }

  if (max) {
    schema = schema.max(max, {
      message: `${key} must have max ${max} characters.`,
    });
  }

  return schema;
};

export const usernameSchema = (key: string) => {
  return z
    .string({ message: `${key} is required.` })
    .min(3, { message: `${key} must be at least 3 characters.` })
    .max(20, { message: `${key} must have max 20 characters.` })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: `${key} must be alphanumeric and can only contain - and _.`,
    });
};

export const booleanSchema = (key: string) => {
  return z.boolean({
    message: `${key} must be a boolean.`,
  });
};
