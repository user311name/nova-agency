import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nova-agency-sigma.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/noir-barber`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/storm`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/projet-03`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/projet-04`,
      lastModified: new Date(),
    },
  ];
}