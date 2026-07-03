import type { Metadata } from "next";

import { GeneralError } from "./general-error";

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "500",
  description: "Internal Server Error",
};

/**
 * @file page.tsx
 * @description 500 error page
 */
const InternalServerError = () => {
  return <GeneralError />;
};

export default InternalServerError;
