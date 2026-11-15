import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/section-heading";
import { getChannels } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  return pageMetadata((await params).locale as Locale, "/contact", "contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const services = (t.raw("services.items") as { id: string; title: string }[]).map(({ id, title }) => ({ id, title }));
  const channels = getChannels(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <PageIntro title={t("contact.title")} intro={t("contact.intro")} />

      <div className="grid gap-14 border-t border-line pt-12 md:grid-cols-[1fr_1.6fr]">
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{t("contact.channelsTitle")}</h2>
          <ul className="mt-6 space-y-3">
            {channels.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-line px-5 py-4 transition-colors hover:border-ink"
                >
                  <span className="font-bold">{t(`contact.channels.${channel.id}`)}</span>
                  <span className="truncate text-sm text-muted">{channel.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight">{t("contact.formTitle")}</h2>
          <ContactForm services={services} />
        </section>
      </div>
    </div>
  );
}
