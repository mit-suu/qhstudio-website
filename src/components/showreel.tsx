"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { posterSrc, videoSrc } from "@/content/site";

// Full-width 16:9 hero video: plays muted on load (unless reduced motion), button toggles sound.
export function Showreel({ slug, hasSound, className = "" }: { slug: string; hasSound: boolean; className?: string }) {
  const t = useTranslations("video");
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ref.current?.play().catch(() => {});
  }, []);

  const toggleSound = () => {
    const element = ref.current;
    if (!element) return;
    element.muted = !muted;
    if (element.paused) element.play().catch(() => {});
    setMuted(!muted);
  };

  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl bg-ink ${className}`}>
      <video
        ref={ref}
        src={videoSrc(slug)}
        poster={posterSrc(slug)}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      {hasSound && (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-4 right-4 rounded-full bg-paper/90 px-4 py-2 text-xs font-semibold text-ink backdrop-blur transition-colors hover:bg-paper"
        >
          {muted ? `🔇 ${t("soundOn")}` : `🔊 ${t("soundOff")}`}
        </button>
      )}
    </div>
  );
}
