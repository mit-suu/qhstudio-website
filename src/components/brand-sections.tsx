import { getTranslations } from "next-intl/server";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type TextItem = { title: string; text: string };

// Quick · Affordable · Good.
export async function ValuesSection({ className = "" }: { className?: string }) {
  const t = await getTranslations();
  const values = t.raw("values") as TextItem[];

  return (
    <section className={className}>
      <SectionHeading>{t("home.valuesTitle")}</SectionHeading>
      <div className="grid gap-10 md:grid-cols-3">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 100}>
            <h3 className="text-4xl font-black tracking-[-0.04em]">{value.title}.</h3>
            <p className="mt-3 text-muted">{value.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export async function ProcessSection({ className = "" }: { className?: string }) {
  const t = await getTranslations();
  const steps = t.raw("process") as TextItem[];

  return (
    <section className={className}>
      <SectionHeading>{t("home.processTitle")}</SectionHeading>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t-2 border-ink pt-5">
            <span className="text-sm font-bold">0{index + 1}</span>
            <h3 className="mt-2 text-lg font-extrabold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
