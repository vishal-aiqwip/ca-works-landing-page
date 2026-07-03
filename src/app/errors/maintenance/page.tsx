import type { Metadata } from "next";

import { MaintenanceError } from "./maintenance-error";

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "503",
  description: "Service Unavailable",
};

/**
 * @file page.tsx
 * @description 500 error page
 */
const MaintenanceErrorPage = () => {
  return <MaintenanceError />;
};

export default MaintenanceErrorPage;
