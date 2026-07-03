import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/errors/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || "https://aiqwip.com"}/sitemap.xml`,
  };
}
