import type { ReactNode } from "react";

export function SectionHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{children}</h2>
      {action}
    </div>
  );
}

export function PageIntro({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="pb-12 pt-16 sm:pt-24">
      <h1 className="text-5xl font-black tracking-[-0.04em] sm:text-7xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>
    </header>
  );
}
