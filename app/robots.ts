import type { MetadataRoute } from "next";

// Required with `output: "export"` so the file is generated at build time
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://atharvakadam.in/sitemap.xml",
    host: "https://atharvakadam.in",
  };
}