import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import type { CustomSession, Permission } from "@/types";

import type { ApiData, ApiFieldError, ApiResponse } from "./fetcher";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert ISO timestamp to human readable format
 * @param {string|Date} dateTime - ISO string or Date object
 * @param {string} fmt - date-fns format string (default: 'MMM do, yyyy')
 * @returns {string} formatted date
 */
export const formatDate = (
  dateTime: string | Date,
  fmt = "MMM do, yyyy",
): string => {
  const date = typeof dateTime === "string" ? parseISO(dateTime) : dateTime;
  return format(date, fmt);
};

export const responseHandler = async <R extends ApiResponse = ApiResponse>(
  api_call: Promise<R>, // can be FetchAPIResponse<T> or ApiResponse<T>
  toast_success: string | false = false,
  toast_loading: string | false = false,
): Promise<R | null> => {
  let response: R | null = null;
  let toastId: string | number | undefined;

  if (toast_loading) {
    toastId = toast.loading(toast_loading);
  }

  try {
    response = await api_call;

    // Check for the presence of status in the response data
    if (!response?.data?.status) {
      toast.error(response?.data?.message ?? "Something went wrong.", {
        id: toastId,
      });
    } else if (toast_success) {
      toast.success(toast_success, { id: toastId });
    }
  } catch (e) {
    console.error("Response Handler", e);
    const errMsg =
      e instanceof Error ? e.message : "Unexpected error occurred.";
    toast.error(errMsg, { id: toastId });
    return null;
  } finally {
    if (toastId) toast.dismiss(toastId);
  }

  const code = response?.status_code;
  const message = response?.data?.message ?? "Something went wrong.";

  // Check the response code and show appropriate toast messages
  switch (code) {
    case 200:
    case 201:
      if (toast_success) toast.success(toast_success);
      return response as R;
    case 400:
      toast.error(`${message}`);
      return response as R;
    case 401:
      toast.error(`${message || "Action is not permitted."}`);
      return response as R;
    case 403:
      toast.error("Action forbidden.");
      return response as R;
    case 422:
      toast.error(`${message}`);
      return response as R;
    case 500:
      toast.error(`${message}`);
      return response as R;
    default:
      toast.error("Error: Something went wrong. Please contact admin.");
      return response as R;
  }
};

/**
 * Convert string to slug format
 * @returns string
 */
export const slugify = (str: string): string => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
};

/**
 * Puts backend validation errors into a React Hook Form instance.
 * @param form React Hook Form instance (from useForm)
 * @param errors Array of validation errors from the API
 */
export const computeErrors = <T extends FieldValues>(
  form: UseFormReturn<T>,
  errors?: ApiFieldError[],
): void => {
  if (!errors) return;

  errors.forEach((err) => {
    // We cast err.field to Path<T> because the API may return strings that match form fields
    form.setError(err.field as Path<T>, {
      type: "manual",
      message: err.message,
    });
  });
};

export const hasPermission = (
  permissions: Permission[],
  allowed: string[],
): boolean => {
  if (!permissions?.length) return false;

  const normalized = permissions.map((p) =>
    typeof p === "string" ? p : `${p.resource}.${p.action}`,
  );

  return allowed.some((perm) => {
    if (perm === "*") return true; // global allow

    const [res, act] = perm.split(".");

    // exact match
    if (normalized.includes(perm)) return true;

    // allowed has wildcard e.g. subscription.*
    // if (act === "*") {
    //   return normalized.some((up) => {
    //     const [upRes, upAct] = up.split(".");
    //     return upRes === res; // match same resource, any action
    //   });
    // }

    // user has wildcard e.g. subscription.*
    return normalized.some((up) => {
      const [upRes, upAct] = up.split(".");
      return upRes === res && upAct === "*";
    });
  });
};

/**
 * Get user permissions from session
 * Returns an array of user permissions
 * @returns Permission[]
 */
export const getAllUserPermissions = (session: CustomSession): Permission[] => {
  return (
    session?.organizations
      ?.flatMap((org: { roles: { role_permissions: Permission[] }[] }) => org.roles)
      ?.flatMap((role: { role_permissions: Permission[] }) => role.role_permissions) ?? []
  );
};