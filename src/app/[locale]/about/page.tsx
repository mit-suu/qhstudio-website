import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ValuesSection } from "@/components/brand-sections";
import { CtaSection } from "@/components/cta-section";
import { Logo, Tagline } from "@/components/logo";
import { PageIntro, SectionHeading } from "@/components/section-heading";
import { Showreel } from "@/components/showreel";
import { loudReel } from "@/content/work";
import { pageMetadata } from "@/lib/page-metadata";

type TextItem = { title: string; text: string };

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  return pageMetadata((await params).locale as Locale, "/about", "about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations();

  const story = t.raw("about.story") as string[];
  const who = t.raw("about.who") as string[];
  const how = t.raw("about.how") as TextItem[];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <PageIntro title={t("about.title")} intro={t("about.lead")} />

        <section className="grid gap-12 border-t border-line py-14 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Logo className="text-5xl sm:text-6xl" />
            <Tagline text={t("tagline")} className="mt-4" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="py-14">
          <SectionHeading>{t("about.reelTitle")}</SectionHeading>
          <p className="-mt-4 mb-10 max-w-2xl text-lg text-muted">{t("about.reelText")}</p>
          <Showreel slug={loudReel.slug} hasSound={loudReel.hasSound} autoPlay={false} label={t("about.reelLabel")} />
        </section>

        <ValuesSection className="py-14" />

        <section className="grid gap-12 py-14 md:grid-cols-2">
          <div>
            <SectionHeading>{t("about.whoTitle")}</SectionHeading>
            <ul className="space-y-4 text-xl font-bold">
              {who.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading>{t("about.howTitle")}</SectionHeading>
            <ul className="space-y-6">
              {how.map((item) => (
                <li key={item.title}>
                  <h3 className="font-extrabold">{item.title}</h3>
                  <p className="mt-1 text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <CtaSection />
    </>
  );
}
