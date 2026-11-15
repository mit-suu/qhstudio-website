import type { Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaSection } from "@/components/cta-section";
import { PageIntro } from "@/components/section-heading";
import { WorkGrid } from "@/components/work-grid";
import { categories, getWork, type Category } from "@/content/work";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">) {
  return pageMetadata((await params).locale as Locale, "/work", "work");
}

export default async function WorkPage({ params, searchParams }: PageProps<"/[locale]/work">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("work");
  const requested = (await searchParams).category;
  const initial = categories.find((category) => category === requested) as Category | undefined;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <PageIntro title={t("title")} intro={t("intro")} />
        <WorkGrid groups={getWork(locale)} initial={initial} />
      </div>
      <CtaSection />
    </>
  );
}
