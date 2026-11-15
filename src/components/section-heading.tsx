import type { ReactNode } from "react";

// Section title: large black heading, optional link aligned to its baseline. No divider; sections are separated by space.
export function SectionHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 sm:mb-12">
      <h2 className="max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">{children}</h2>
      {action}
    </div>
  );
}

export function SectionLink({ children }: { children: ReactNode }) {
  return (
    <span className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
      <span className="underline decoration-1 underline-offset-[6px] group-hover:decoration-2">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </span>
  );
}

export function PageIntro({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="pb-16 pt-16 sm:pb-20 sm:pt-24">
      <h1 className="text-[clamp(3rem,7vw+1rem,6rem)] font-black leading-[0.95] tracking-[-0.04em]">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>
    </header>
  );
}
