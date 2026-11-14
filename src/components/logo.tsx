// Brand play-circle (geometry from the logo design file).
export function PlayCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="18" />
      <path d="M42 32 70 50 42 68Z" fill="currentColor" />
    </svg>
  );
}

// Wordmark: Montserrat 900, -0.05em tracking, play-circle "o" at 58/104 of the font size.
// Proportions follow logo/qh.studio · Minimal White-html.zip; size it with a font-size class.
export function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <span role="img" aria-label="qh.studio" className={`inline-block whitespace-nowrap font-black leading-none tracking-[-0.05em] ${className}`}>
      qh.studi
      <PlayCircle className="ml-[0.0192em] mr-[0.0385em] inline-block size-[0.5577em] align-[-0.0288em]" />
    </span>
  );
}

// Tagline under the wordmark: weight 500, 0.2em tracking, #6B6B6B.
export function Tagline({ text, className = "" }: { text: string; className?: string }) {
  return <p className={`text-xs font-medium tracking-[0.2em] text-muted ${className}`}>{text}</p>;
}
