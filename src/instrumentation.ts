// instrumentation.ts
import util from "util";

import { validateClientEnv } from "./lib/env/client-env";
import { validateServerEnv } from "./lib/env/server-env";
import type { LogEntry } from "./types";

// ---------------------------------------------------------
// Register function (called once on server start)
// ---------------------------------------------------------
export const register = async () => {
  validateClientEnv();
  validateServerEnv();
};

// ---------------------------------------------------------
// ANSI colors for logging
// ---------------------------------------------------------
const bold = "\x1b[1m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const green = "\x1b[32m";
const reset = "\x1b[0m";

// ---------------------------------------------------------
// Type definition for onRequestError (from Next.js docs v15.5.4)
// ---------------------------------------------------------
type OnRequestError = (
  error: { digest?: string } & Error,
  request: {
    path: string;
    method: string;
    headers: Record<string, string>;
  },
  context: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: "render" | "route" | "action" | "middleware";
    renderSource:
      | "react-server-components"
      | "react-server-components-payload"
      | "server-rendering";
    revalidateReason?: "on-demand" | "stale";
    renderType: "dynamic" | "dynamic-resume";
  },
) => void | Promise<void>;

// ---------------------------------------------------------
// Helper: build structured log entry
// ---------------------------------------------------------
const createLogEntry = (
  error: { digest?: string } & Error,
  request: { path: string; method: string; headers: Record<string, string> },
  context: {
    routerKind: string;
    routePath: string;
    routeType: string;
    renderSource: string;
    revalidateReason?: string;
    renderType: string;
  },
): LogEntry => {
  const timestamp = new Date().toISOString();
  return {
    timestamp,
    error: {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    },
    request: {
      path: request.path,
      method: request.method,
      headers: request.headers,
    },
    context,
  };
};

// ---------------------------------------------------------
// onRequestError implementation
// ---------------------------------------------------------
export const onRequestError: OnRequestError = async (
  error,
  request,
  context,
) => {
  const logEntry = createLogEntry(error, request, context);

  // Console log
  console.error(
    `\n${red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}
    ${bold}${red}✗ ERROR OCCURRED${reset}
    Time: ${logEntry.timestamp}

    ${bold}${yellow}Error:${reset}
      Digest: ${logEntry.error.digest || "N/A"}
      Path: ${request.path}
      Method: ${request.method}
      Message: ${error.message}
      Stack: ${error.stack
        ?.split("\n")
        .slice(0, 2)
        .map((line) => `    ${line}`)
        .join("\n")}

    ${bold}${green}Request:${reset}
      Path: ${request.path}
      Method: ${request.method}
      Headers: ${util.inspect(request.headers, { colors: true, depth: 1 })}

    ${bold}Context:${reset}
    ${util.inspect(context, { colors: true, depth: 2 })}

    ${red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}\n`,
  );

  // Send to API logger
  await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/logger", {
    method: "POST",
    body: JSON.stringify({ logEntry }),
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 0 },
  });
};
