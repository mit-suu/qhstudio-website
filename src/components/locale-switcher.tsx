"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALE_COOKIE, routing, type Locale } from "@/i18n/routing";

// Saving the choice keeps it ahead of country detection on the next visit (see proxy.ts).
function remember(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div role="group" aria-label={t("language")} className={`flex items-center gap-1 text-xs font-semibold ${className}`}>
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-line">/</span>}
          <Link
            href={pathname}
            locale={locale}
            onClick={() => remember(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={locale === current ? "text-ink" : "text-muted hover:text-ink"}
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
