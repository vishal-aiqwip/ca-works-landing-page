/**
 * @file app.js
 * @description This file contains the default variables.
 */

/**
 * Application name
 * @type {string}
 */
export const APP_NAME: string = "CA Works";
export const APP_DESCRIPTION: string = "";

/**
 * External links (centralized to avoid hardcoding across components)
 */
export const BOOKING_URL = "https://cal.com/sairam-chennapragada-hbzxax/30min";

/**
 * Legal entity details (used on Terms, Privacy Policy, and Data Deletion pages)
 */
export const LEGAL_ENTITY_NAME = "CAworks";
export const LEGAL_ENTITY_ADDRESS =
  "Scalex Loop, Embassy Golf Links Rd, Challaghatta, Bengaluru, Karnataka 560037";
export const SUPPORT_EMAIL = "contact@caworks.ai";

/**
 * Revalidate time(s) each fetch request
 * Set default revalidate at every hour
 */
export const REVALIDATE_TIME: number = 60 * 60;

/**
 * Console log colors
 */
export const BOLD: string = "\x1b[1m";
export const RED: string = "\x1b[31m";
export const GREEN: string = "\x1b[32m";
export const RESET: string = "\x1b[0m";
