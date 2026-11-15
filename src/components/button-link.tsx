import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { PlayCircle } from "./logo";

const variants = {
  primary: "bg-ink text-paper hover:bg-ink/85",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-ink hover:bg-paper/85",
  outlineInverse: "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

// Pill-shaped CTA; filled variants carry the brand play-circle.
export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {(variant === "primary" || variant === "inverse") && <PlayCircle className="h-4 w-4" />}
      {children}
    </Link>
  );
}
