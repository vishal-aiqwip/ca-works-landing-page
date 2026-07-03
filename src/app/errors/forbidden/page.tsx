import type { Metadata } from "next";

import { ForbiddenError } from "./forbidden";

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "Forbidden",
  description: "Forbidden page ",
};

/**
 * @file page.tsx
 * @description 403 error page
 */
const Forbidden = () => {
  return <ForbiddenError />;
};

export default Forbidden;
