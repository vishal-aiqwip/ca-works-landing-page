import type { Route } from "next";
import type { ReactNode } from "react";



export type SearchParams = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type Params<T> = {
  params: Promise<T>;
};

export type PageProp<T> = {
  params: Params<T>;
  searchParams: SearchParams;
};

export type UserNavItemsType = {
  title: string;
  url: Route;
  icon: ReactNode;
};

export type NavItem = {
  title: string;
  url: Route;
  icon: ReactNode;
  allowed: string[];
};

export interface LogEntry {
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
}

export type OrganizationContact = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type UserRoleOrganizationMap = {
  id: string;
  user_id: string;
  role_id: string;
  is_enabled: boolean;
  organization_id: string;
  created_at: string;
  updated_at: string;
  user: User;
  role: Role;
  roles?: Role[];
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  email: string;
  description: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
  address?: string;
  contact_details?: OrganizationContact[];
  user_role_organization_maps?: UserRoleOrganizationMap[];
};

// export type User = BetterAuthUser & {
//   roles: Role[];
//   phoneNumber?: string | null;
// } & UserWithTwoFactor;

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  twoFactorEnabled: boolean;
  phone_number?: string | null;
  roles?: Role[];
};

export interface OrganizationWithRoles extends Organization {
  roles: Role[];
}

export interface CustomSession {
  user: User;
  session: Record<string, unknown>;
  organizations: OrganizationWithRoles[];
}

export type Permission = {
  id: string;
  name: string;
  action: string;
  resource: string;
  created_at: string;
  updated_at: string;
};

export type Role = {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
  role_permissions: Permission[];
  all_permissions?: Permission[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  hero: {
    title: string;
    description: string;
    image: string | import("next/image").StaticImageData;
    year: string;
  };
  project_overview?: ProjectOverview;
  features?: {
    title: string;
    description: string;
    content: ProjectFeature[];
  };
  tech_stack?: {
    title: string;
    description: string;
    content: TechStackContent[];
  };
  content?: string;
  image?: string;
  category?: string;
  technologies?: string[];
  client?: string;
  year?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectHero = {
  title: string;
  description: string;
  image: string | import("next/image").StaticImageData;
  year: string;
};

export type ProjectOverview = {
  id: string;
  title: string;
  description: string;
  challenges: string;
  solution: string;
  results: string;
  client: string;
  domain: string;
  projectType: string;
  timeline: string;
};
export type ProjectFeature = {
  icon: string;
  title: string;
  description: string;
};

export type TechStackItem = {
  name: string;
  logo?: string;
  icon?: string;
};

export type TechStackContent = {
  category: string;
  technologies: TechStackItem[];
  description: string;
  backgroundIcon?: ReactNode;
};

export type TechStackData = {
  title: string;
  description: string;
  content: TechStackContent[];
};
