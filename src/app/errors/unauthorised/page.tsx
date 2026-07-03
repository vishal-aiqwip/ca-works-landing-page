import type { Metadata } from "next";

import { UnauthorizedError } from "./unauthorized-error";

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "401",
  description: "Unauthorized",
};

/**
 * @file page.tsx
 * @description 401 error page
 */
const UnauthorizedErrorPage = () => {
  return <UnauthorizedError />;
};

export default UnauthorizedErrorPage;
