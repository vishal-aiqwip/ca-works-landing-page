import type { MetadataRoute } from "next";

const SITE_URL = "https://aiqwip.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [""];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  return [...staticEntries];
}
