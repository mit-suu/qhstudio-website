import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProcessSection, ValuesSection } from "@/components/brand-sections";
import { ButtonLink } from "@/components/button-link";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { Tagline } from "@/components/logo";
import { Showreel } from "@/components/showreel";
import { SectionHeading } from "@/components/section-heading";
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
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-8 lg:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">{t("home.eyebrow")}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{t("home.title")}</h1>
          <div>
            <p className="text-lg text-muted">{t("home.subtitle")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact">{t("home.primary")}</ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                {t("home.secondary")}
              </ButtonLink>
            </div>
          </div>
        </div>
        <Showreel slug={showreel.slug} hasSound={showreel.hasSound} className="mt-12" />
        <Tagline text={t("tagline")} className="mt-6 text-center" />
      </section>

      {/* Clients */}
      <section className="border-y border-line py-6">
        <p className="mx-auto mb-4 max-w-6xl px-4 text-xs text-muted sm:px-8">{t("home.clientsTitle")}</p>
        <div className="overflow-hidden">
          <div className="marquee flex w-max gap-12 whitespace-nowrap text-xl font-extrabold tracking-tight text-ink/80">
            {[...clientNames, ...clientNames].map((name, index) => (
              <span key={index} aria-hidden={index >= clientNames.length}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 py-20 sm:px-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80}>
            <p className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">{stat.value}</p>
            <p className="mt-2 max-w-56 text-sm text-muted">{stat.label}</p>
          </Reveal>
        ))}
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
        <SectionHeading
          action={
            <Link href="/work" className="text-sm font-semibold underline underline-offset-4">
              {t("home.featuredCta")} →
            </Link>
          }
        >
          {t("home.featuredTitle")}
        </SectionHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {getFeatured(locale).map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
        <SectionHeading
          action={
            <Link href="/services" className="text-sm font-semibold underline underline-offset-4">
              {t("home.servicesCta")} →
            </Link>
          }
        >
          {t("home.servicesTitle")}
        </SectionHeading>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {services.map((service, index) => (
            <Link key={service.id} href="/services" className="group bg-paper p-8 transition-colors hover:bg-soft">
              <span className="text-xs text-muted">0{index + 1}</span>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{service.title}</h3>
              <p className="mt-1 text-xs text-muted">{service.platforms}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{service.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <ValuesSection className="mx-auto max-w-6xl px-4 py-12 sm:px-8" />
      <ProcessSection className="mx-auto max-w-6xl px-4 py-20 sm:px-8" />

      <CtaSection />
    </>
  );
}
