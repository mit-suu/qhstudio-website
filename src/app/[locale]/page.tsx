import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProcessSection, ValuesSection } from "@/components/brand-sections";
import { ButtonLink } from "@/components/button-link";
import { CtaSection } from "@/components/cta-section";
import { SectionHeading, SectionLink } from "@/components/section-heading";
import { Showreel } from "@/components/showreel";
import { VideoCard } from "@/components/video-card";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/page-metadata";
import { clientNames, getFeatured, showreel } from "@/content/work";

type ServiceItem = { id: string; title: string; platforms: string; text: string };

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  return pageMetadata((await params).locale as Locale, "");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const stats = t.raw("home.stats") as { value: string; label: string }[];
  const services = t.raw("services.items") as ServiceItem[];

  return (
    <>
      {/* Hero: copy and reel share one column so every edge lines up. */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-paper/60">{t("home.eyebrow")}</p>
          <h1 className="mt-6 text-[clamp(2.75rem,5.5vw+1rem,5.75rem)] font-black leading-[0.95] tracking-[-0.04em]">
            {t("home.title")}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70">{t("home.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="inverse">
              {t("home.primary")}
            </ButtonLink>
            <ButtonLink href="/work" variant="outlineInverse">
              {t("home.secondary")}
            </ButtonLink>
          </div>
          <Showreel slug={showreel.slug} hasSound={showreel.hasSound} label={t("tagline")} className="mt-14 sm:mt-20" />
        </div>
      </section>

      {/* Proof: who we've cut for, then the numbers behind it. */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="max-w-md text-3xl font-black tracking-[-0.03em] sm:text-4xl">{t("home.clientsTitle")}</h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-5 text-lg font-bold sm:grid-cols-3 sm:text-xl">
            {clientNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <dl className="mt-16 grid grid-cols-2 border-t-2 border-ink md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse justify-end border-b border-line py-8 pr-4 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
              <dd className="text-4xl font-black tabular-nums tracking-[-0.04em] sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Work: the largest section on the page. */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading
          action={
            <Link href="/work">
              <SectionLink>{t("home.featuredCta")}</SectionLink>
            </Link>
          }
        >
          {t("home.featuredTitle")}
        </SectionHeading>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {getFeatured(locale).map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>
      </section>

      {/* Services as an index list rather than a card grid. */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading
          action={
            <Link href="/services">
              <SectionLink>{t("home.servicesCta")}</SectionLink>
            </Link>
          }
        >
          {t("home.servicesTitle")}
        </SectionHeading>
        <ul className="border-t-2 border-ink">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services#${service.id}`}
                className="group grid gap-3 border-b border-line py-8 transition-colors hover:bg-soft md:grid-cols-[1.1fr_1.4fr_auto] md:items-center md:gap-10 md:px-4"
              >
                <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{service.title}</h3>
                <div>
                  <p className="text-lg">{service.text}</p>
                  <p className="mt-1 text-sm text-muted">{service.platforms}</p>
                </div>
                <span aria-hidden="true" className="hidden text-2xl transition-transform duration-200 group-hover:translate-x-1 md:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ValuesSection className="mx-auto max-w-7xl px-4 pt-24 sm:px-8 sm:pt-32" />
      <ProcessSection className="mx-auto max-w-7xl px-4 pt-24 sm:px-8 sm:pt-32" />

      <CtaSection />
    </>
  );
}
