import { getTranslations } from "next-intl/server";
import { SectionHeading } from "./section-heading";

type TextItem = { title: string; text: string };

// Quick · Affordable · Good as an oversized typographic band split by hairlines.
export async function ValuesSection({ className = "" }: { className?: string }) {
  const t = await getTranslations();
  const values = t.raw("values") as TextItem[];

  return (
    <section className={className}>
      <SectionHeading>{t("home.valuesTitle")}</SectionHeading>
      <div className="grid border-t-2 border-ink md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
            <h3 className="text-5xl font-black tracking-[-0.04em] lg:text-6xl">{value.title}.</h3>
            <p className="mt-4 max-w-xs text-lg text-muted">{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Brief → edit → revise → deliver: a real sequence, so the steps are numbered.
export async function ProcessSection({ className = "" }: { className?: string }) {
  const t = await getTranslations();
  const steps = t.raw("process") as TextItem[];

  return (
    <section className={className}>
      <SectionHeading>{t("home.processTitle")}</SectionHeading>
      <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="block text-4xl font-black tracking-[-0.04em] text-muted" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl font-extrabold">{step.title}</h3>
            <p className="mt-2 text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
