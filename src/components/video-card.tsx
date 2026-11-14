"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { posterSrc, videoSrc } from "@/content/site";
import type { Video } from "@/content/work";

const SOUND_EVENT = "qh:sound";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

// Hover plays the clip muted; a click turns the sound on and mutes any other clip.
export function VideoCard({ video }: { video: Video }) {
  const t = useTranslations("video");
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "muted" | "sound">("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const horizontal = video.orientation === "horizontal";
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const soundLabel = `${state === "sound" ? t("soundOff") : t("soundOn")}: ${video.title}`;

  useEffect(() => {
    const onOtherSound = (event: Event) => {
      if ((event as CustomEvent<string>).detail === video.slug) return;
      const element = ref.current;
      if (!element || element.paused) return;
      element.pause();
      element.muted = true;
      setState("idle");
    };
    window.addEventListener(SOUND_EVENT, onOtherSound);
    return () => window.removeEventListener(SOUND_EVENT, onOtherSound);
  }, [video.slug]);

  const playMuted = () => {
    const element = ref.current;
    if (!element || state === "sound") return;
    element.muted = true;
    element.play().catch(() => {});
    setState("muted");
  };

  const stop = () => {
    const element = ref.current;
    if (!element || state === "sound") return;
    element.pause();
    setState("idle");
  };

  const toggleSound = () => {
    const element = ref.current;
    if (!element) return;
    if (state === "sound") {
      element.muted = true;
      setState("muted");
      return;
    }
    window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: video.slug }));
    element.muted = false;
    element.play().catch(() => {});
    setState("sound");
  };

  const seek = (time: number) => {
    const element = ref.current;
    if (!element) return;
    element.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <figure className={horizontal ? "col-span-2" : ""}>
      <div
        onPointerEnter={(event) => event.pointerType === "mouse" && playMuted()}
        onPointerLeave={(event) => event.pointerType === "mouse" && stop()}
        className={`group relative w-full overflow-hidden rounded-lg bg-ink ${horizontal ? "aspect-video" : "aspect-[9/16]"}`}
      >
        <button type="button" onClick={toggleSound} aria-label={soundLabel} className="block h-full w-full">
          <video
            ref={ref}
            src={videoSrc(video.slug)}
            poster={posterSrc(video.slug)}
            preload="none"
            muted={state !== "sound"}
            loop
            playsInline
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onDurationChange={(event) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </button>
        <div
          className={`absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-2 pt-6 text-paper transition-opacity ${state === "idle" ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
        >
          <button type="button" onClick={toggleSound} aria-label={soundLabel} className="shrink-0 text-xs">
            {state === "sound" ? "🔊" : "🔇"}
          </button>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={Math.min(currentTime, duration || 0)}
            disabled={!duration}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label={`${t("seek")}: ${video.title}`}
            style={{ "--progress": `${progress}%` } as CSSProperties}
            className="seek min-w-0 flex-1 cursor-pointer rounded-full disabled:cursor-not-allowed"
          />
          <output className="text-[10px] tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </output>
        </div>
      </div>
      <figcaption className="mt-2 text-xs">
        <span className="block truncate font-semibold">{video.title}</span>
        <span className="text-muted">{video.tag}</span>
      </figcaption>
    </figure>
  );
}
