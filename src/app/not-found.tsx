import type { Metadata } from "next";

import { NotFoundError } from "./errors/not-found-error";

/**
 * Metadata details
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist or has been moved. Browse Aiqwip's services, solutions, blog, or contact us for help.",
};

/**
 * @file not-found.tsx
 * @description Page not found
 */
const PageNotFound = () => {
  return <NotFoundError />;
};

export default PageNotFound;
