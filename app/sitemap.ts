import type { MetadataRoute } from "next";

const baseUrl = "https://www.agency-nova.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
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
      url: `${baseUrl}/realisations/storm`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/noir-barber`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/site-traiteur`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/autopilot`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/ia-future`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/realisations/nova-assist`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/methode`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/devis`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
    },
  ];
}