import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard/", "/private/"],
    },
    sitemap: "https://nova-agency-sigma.vercel.app/sitemap.xml",
  };
}