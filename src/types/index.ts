export type Permission = string | { resource: string; action: string };

export type CustomSession = {
  organizations?: {
    roles: {
      role_permissions: Permission[];
    }[];
  }[];
};

export type LogEntry = {
  timestamp: string;
  error: {
    message: string;
    stack?: string;
    digest?: string;
  };
  request: {
    path: string;
    method: string;
    headers: Record<string, string>;
  };
  context: {
    routerKind: string;
    routePath: string;
    routeType: string;
    renderSource: string;
    revalidateReason?: string;
    renderType: string;
  };
};
