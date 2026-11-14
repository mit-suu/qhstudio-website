import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import type { PagePath } from "@/lib/page-metadata";

const paths: PagePath[] = ["", "/work", "/services", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((item) => [item, `${site.url}/${item}${path}`])),
      },
    })),
  );
}
