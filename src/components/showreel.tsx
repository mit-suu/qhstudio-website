"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { posterSrc, videoSrc } from "@/content/site";
import { PlayCircle } from "./logo";

type Props = {
  slug: string;
  hasSound: boolean;
  // true: plays muted on load (hero). false: loads nothing until the visitor presses play, then plays with sound.
  autoPlay?: boolean;
  label?: string;
  className?: string;
};

// 16:9 reel player. Clicking the video toggles sound once it is playing.
export function Showreel({ slug, hasSound, autoPlay = true, label, className = "" }: Props) {
  const t = useTranslations("video");
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(autoPlay);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!autoPlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ref.current?.play().catch(() => {});
  }, [autoPlay]);

  const setSound = (on: boolean) => {
    const element = ref.current;
    if (!element) return;
    element.muted = !on;
    if (element.paused) element.play().catch(() => {});
    setMuted(!on);
  };

  const start = () => {
    setStarted(true);
    setSound(hasSound);
  };

  return (
    <div className={className}>
      <div className="group relative aspect-video overflow-hidden rounded-xl bg-ink ring-1 ring-current/10">
        <video
          ref={ref}
          src={videoSrc(slug)}
          poster={posterSrc(slug)}
          muted={muted}
          loop
          playsInline
          preload={autoPlay ? "metadata" : "none"}
          onClick={() => started && hasSound && setSound(muted)}
          className={`h-full w-full object-cover ${started && hasSound ? "cursor-pointer" : ""}`}
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/30 text-paper transition-colors hover:bg-ink/45"
          >
            <PlayCircle className="size-16 transition-transform group-hover:scale-110 sm:size-20" />
            <span className="text-sm font-semibold">{t("play")}</span>
          </button>
        )}
      </div>

      {/* Controls sit under the frame: both reels carry their own text in every corner. */}
      <div className="mt-4 flex min-h-9 items-center justify-between gap-4">
        <span className="text-xs font-medium tracking-[0.2em] opacity-60">{label}</span>
        {started && hasSound && (
          <button
            type="button"
            onClick={() => setSound(muted)}
            className="min-h-11 shrink-0 rounded-full border border-current px-5 text-xs font-semibold opacity-70 transition-opacity hover:opacity-100"
          >
            {muted ? `🔇 ${t("soundOn")}` : `🔊 ${t("soundOff")}`}
          </button>
        )}
      </div>
    </div>
  );
}
