import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { ButtonLink } from "./button-link";

// Full-bleed closing band on every page; bookends the dark hero.
export async function CtaSection() {
  const t = await getTranslations("cta");

  return (
    <section className="mt-24 bg-ink text-paper sm:mt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-8 sm:py-28 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2 className="text-[clamp(2.5rem,4vw+1rem,4.5rem)] font-black leading-[0.95] tracking-[-0.04em]">{t("title")}</h2>
        <div>
          <p className="text-lg text-paper/70">{t("text")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href="/contact" variant="inverse">
              {t("button")}
            </ButtonLink>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center text-sm font-medium text-paper/70 underline underline-offset-4 hover:text-paper">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
