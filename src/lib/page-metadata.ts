import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export type PagePath = "" | "/work" | "/services" | "/about" | "/contact";

// Canonical + hreflang alternates so both language versions get indexed.
export async function pageMetadata(locale: Locale, path: PagePath, titleKey?: "work" | "services" | "about" | "contact"): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const languages = Object.fromEntries(routing.locales.map((item) => [item, `/${item}${path}`]));

  return {
    ...(titleKey && { title: t(titleKey) }),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}${path}` },
    },
  };
}
