import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProcessSection } from "@/components/brand-sections";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { PageIntro, SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/page-metadata";

type ServiceItem = { id: string; title: string; platforms: string; text: string; includes: string[] };

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  return pageMetadata((await params).locale as Locale, "/services", "services");
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const services = t.raw("services.items") as ServiceItem[];
  const faq = t.raw("services.faq") as { q: string; a: string }[];

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <PageIntro title={t("services.title")} intro={t("services.intro")} />

        <div className="divide-y divide-line border-y border-line">
          {services.map((service, index) => (
            <Reveal key={service.id}>
              <article id={service.id} className="grid scroll-mt-24 gap-6 py-12 md:grid-cols-[1fr_1fr]">
                <div>
                  <span className="text-xs text-muted">0{index + 1}</span>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">{service.title}</h2>
                  <p className="mt-2 text-sm text-muted">{service.platforms}</p>
                  <p className="mt-5 max-w-md text-lg">{service.text}</p>
                  <Link
                    href={{ pathname: "/work", query: { category: service.id } }}
                    className="mt-6 inline-block text-sm font-semibold underline underline-offset-4"
                  >
                    {t("services.seeWork")} →
                  </Link>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{t("services.includes")}</p>
                  <ul className="mt-4 space-y-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-line pb-3">
                        <span aria-hidden="true">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <ProcessSection className="py-20" />

        <section className="pb-8">
          <SectionHeading>{t("services.faqTitle")}</SectionHeading>
          <div className="divide-y divide-line">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                  {item.q}
                  <span className="text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      <CtaSection />
    </>
  );
}
