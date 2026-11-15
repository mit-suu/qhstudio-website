import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getChannels } from "@/content/site";
import { Logo, Tagline } from "./logo";

const navKeys = ["work", "services", "about", "contact"] as const;

export async function SiteFooter() {
  const [locale, t, nav] = await Promise.all([getLocale(), getTranslations(), getTranslations("nav")]);
  const channels = getChannels(locale);

  return (
    <footer>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:grid-cols-[2fr_1fr_1.4fr]">
        <div>
          <Logo className="text-3xl" />
          <Tagline text={t("tagline")} className="mt-3" />
          <p className="mt-6 text-sm text-muted">{t("footer.basedIn")}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col">
            {navKeys.map((key) => (
              <li key={key}>
                <Link href={`/${key}`} className="inline-flex min-h-11 items-center text-sm font-medium hover:underline">
                  {nav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-col gap-2">
          {channels.map((channel) => (
            <li key={channel.id}>
              <p className="text-xs text-muted">{t(`contact.channels.${channel.id}`)}</p>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-medium hover:underline"
              >
                {channel.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-7xl border-t border-line px-4 py-6 text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} qh.studio. {t("footer.rights")}
      </div>
    </footer>
  );
}
