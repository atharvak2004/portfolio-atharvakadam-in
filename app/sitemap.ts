import type { MetadataRoute } from "next";

// Required with `output: "export"` so the file is generated at build time
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://atharvakadam.in",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add more entries here as you add pages, e.g.
    // { url: "https://atharvakadam.in/projects/medicare-hms/", lastModified: new Date() },
  ];
}