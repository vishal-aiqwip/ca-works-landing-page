"use server";

import { cookies } from "next/headers";

import { REVALIDATE_TIME } from "@/config";

import { env } from "./env";

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiData {
  status?: boolean;
  message?: string;
  errors?: ApiFieldError[];
  [key: string]: unknown;
}

export interface ApiResponse<T extends ApiData = ApiData> {
  data: T;
  status_code: number;
  [key: string]: unknown;
}

export interface FetchAPIOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export interface FetchAPIResponse<T extends ApiData = ApiData>
  extends ApiResponse<T> {
  data: T;
  errors?: T;
  status_code: number;
}

/**
 * Fetches data from an API endpoint with dynamic authorization token
 * @param endpoint - The API endpoint to fetch from
 * @param options - Fetch options
 * @returns Parsed JSON response
 */
export const fetchAPI = async <T extends ApiData>(
  endpoint: string,
  options: FetchAPIOptions = {},
): Promise<FetchAPIResponse<T>> => {
  const cookieStore = await cookies();
  const session_token = cookieStore.get("__Secure-auth.session_token");

  const token = session_token?.value?.split(".")[0];

  const { method = "GET", body, next } = options;

  const url = `${env.API_URL}/api/v1${endpoint}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
        // Cookie: cookieStore ? cookieStore.toString() : "",
        ...(options?.headers && options?.headers),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      next: {
        revalidate: next?.revalidate ?? REVALIDATE_TIME,
        tags: next?.tags ?? [],
      },
    });

    const data = (await res.json()) as T;

    return {
      status_code: res.status,
      data,
    };
  } catch (error) {
    console.error("API error", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`API error at ${url}:\n${message}`);
  }
};

/**
 * Delays execution for a specified number of milliseconds
 * @param {number} ms - The number of milliseconds to delay execution
 */
export const delay = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchFormData = async <T extends ApiData>(
  endpoint: string,
  options: Omit<FetchAPIOptions, "body"> & {
    formData: FormData;
  },
): Promise<FetchAPIResponse<T>> => {
  const cookieStore = await cookies();
  const session_token = cookieStore.get("__Secure-auth.session_token");
  const token = session_token?.value?.split(".")[0];

  const { method = "POST", formData, next } = options;
  const url = `${env.API_URL}/api/v1${endpoint}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `${token}`,
      },
      body: formData,
      next: {
        revalidate: next?.revalidate ?? REVALIDATE_TIME,
        tags: next?.tags ?? [],
      },
    });

    const data = (await res.json()) as T;

    return {
      status_code: res.status,
      data,
    };
  } catch (error) {
    console.error("API error", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`API error at ${url}:\n${message}`);
  }
};
