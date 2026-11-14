"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ButtonLink } from "./button-link";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";

const navItems = [
  { href: "/work", key: "work" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-8">
        <Link href="/" aria-label="qh.studio" onClick={() => setOpen(false)} className="text-2xl">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={isActive(item.href) ? "text-ink" : "text-muted transition-colors hover:text-ink"}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LocaleSwitcher />
          <ButtonLink href="/contact" className="!py-2.5">
            {t("quote")}
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-sm font-semibold md:hidden"
        >
          {open ? t("close") : t("menu")}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-4 pb-6 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-2xl font-extrabold tracking-tight"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LocaleSwitcher className="text-sm" />
            <ButtonLink href="/contact" onClick={() => setOpen(false)}>
              {t("quote")}
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
