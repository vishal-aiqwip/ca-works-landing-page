import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aiqwip — AI Product Development Company",
    short_name: "Aiqwip",
    description:
      "AI product development company for US startups. Ship your MVP in 4 weeks. GenAI, RAG pipelines, LLM integration, and MLOps.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/images/meta/favicon.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/images/meta/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
