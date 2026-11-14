"use client";

import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";

const fieldClass =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

// Builds an email with the brief filled in and opens the visitor's mail app.
export function ContactForm({ services }: { services: { id: string; title: string }[] }) {
  const t = useTranslations("contact.form");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const lines = [
      `${t("name")}: ${value("name")}`,
      `${t("contact")}: ${value("contact")}`,
      `${t("service")}: ${value("service")}`,
      `${t("link")}: ${value("link")}`,
      "",
      value("message"),
    ];
    const subject = `${t("subject")} — ${value("name")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          {t("name")}
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          {t("contact")}
          <input name="contact" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        {t("service")}
        <select name="service" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            {t("servicePlaceholder")}
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value={t("other")}>{t("other")}</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        {t("link")}
        <input name="link" type="url" placeholder="https://" className={fieldClass} />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        {t("message")}
        <textarea name="message" required rows={5} placeholder={t("messagePlaceholder")} className={fieldClass} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink/85">
          {t("submit")}
        </button>
        <p className="text-xs text-muted">{t("note")}</p>
      </div>
    </form>
  );
}
