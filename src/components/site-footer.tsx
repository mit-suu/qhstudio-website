import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getChannels } from "@/content/site";
import { Logo, Tagline } from "./logo";

export async function SiteFooter() {
  const [locale, t, nav] = await Promise.all([getLocale(), getTranslations(), getTranslations("nav")]);
  const channels = getChannels(locale);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Logo className="text-3xl" />
          <Tagline text={t("tagline")} className="mt-3" />
          <p className="mt-6 text-sm text-muted">{t("footer.basedIn")}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          <Link href="/work" className="hover:underline">{nav("work")}</Link>
          <Link href="/services" className="hover:underline">{nav("services")}</Link>
          <Link href="/about" className="hover:underline">{nav("about")}</Link>
          <Link href="/contact" className="hover:underline">{nav("contact")}</Link>
        </nav>

        <ul className="flex flex-col gap-2 text-sm">
          {channels.map((channel) => (
            <li key={channel.id}>
              <span className="text-muted">{t(`contact.channels.${channel.id}`)}: </span>
              <a href={channel.href} className="hover:underline" target={channel.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {channel.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} qh.studio. {t("footer.rights")}
      </div>
    </footer>
  );
}
