import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://finemotorsllc.com";
  const now  = new Date();

  return [
    { url: base,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/inventory`, lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/contact`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/why-us`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,     lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
