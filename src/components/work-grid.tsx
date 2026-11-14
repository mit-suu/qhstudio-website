"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { categories, type Category, type WorkGroup } from "@/content/work";
import { VideoCard } from "./video-card";

export function WorkGrid({ groups, initial }: { groups: WorkGroup[]; initial?: Category }) {
  const t = useTranslations();
  const [active, setActive] = useState<Category | "all">(initial ?? "all");
  const visible = active === "all" ? groups : groups.filter((group) => group.category === active);

  const tabs: { id: Category | "all"; label: string }[] = [
    { id: "all", label: t("work.all") },
    ...categories.map((id) => ({ id, label: t(`categories.${id}`) })),
  ];

  return (
    <div>
      <div role="group" aria-label={t("work.filter")} className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            aria-pressed={active === tab.id}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === tab.id ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">{t("work.hint")}</p>

      <div className="mt-12 space-y-20">
        {visible.length === 0 && <p className="text-muted">{t("work.empty")}</p>}
        {visible.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24">
            <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-[1fr_2fr]">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">{group.title}</h2>
                <p className="mt-1 text-xs text-muted">{group.meta}</p>
              </div>
              <div className="text-sm leading-relaxed text-muted">
                <p>{group.description}</p>
                {group.link && (
                  <a href={group.link.href} target="_blank" rel="noreferrer" className="mt-2 inline-block font-medium text-ink underline underline-offset-4">
                    {group.link.label} ↗
                  </a>
                )}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.videos.map((video) => (
                <VideoCard key={video.slug} video={video} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
