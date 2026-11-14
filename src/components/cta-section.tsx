import { getTranslations } from "next-intl/server";
import { ButtonLink } from "./button-link";

export async function CtaSection() {
  const t = await getTranslations("cta");

  return (
    <section className="mx-auto my-24 max-w-6xl px-4 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-ink px-8 py-14 text-paper sm:px-12 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-5xl">{t("title")}</h2>
          <p className="mt-3 text-paper/70">{t("text")}</p>
        </div>
        <ButtonLink href="/contact" variant="inverse" className="shrink-0">
          {t("button")}
        </ButtonLink>
      </div>
    </section>
  );
}
