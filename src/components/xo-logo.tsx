import { Link } from "@tanstack/react-router";

type Tone = "light" | "dark" | "overlay";

/** Compact XO mark. Quiet brass underline, no costume graphics. */
export function XoMark({ className = "", tone = "light" }: { className?: string; tone?: Tone }) {
  const ink = tone === "light" ? "#0E1410" : "#EEF1E8";
  return (
    <svg
      viewBox="0 0 48 28"
      className={className}
      role="img"
      aria-label="Xplore Odyssey"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Xplore Odyssey</title>
      <text
        x="1"
        y="18"
        fill={ink}
        fontFamily="Syne, Arial Narrow, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="0.12em"
      >
        XO
      </text>
      <rect x="2" y="23" width="28" height="2" fill="#B8922A" opacity="0.85" />
    </svg>
  );
}

export function BrandLockup({
  tone = "light",
  showWordmark = false,
  className = "",
}: {
  tone?: Tone;
  showWordmark?: boolean;
  className?: string;
}) {
  const muted = tone === "light" ? "text-ink/60" : "text-mist/65";
  const strong = tone === "light" ? "text-ink" : "text-mist";
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`}>
      <XoMark tone={tone} className="h-7 w-12 shrink-0" />
      {showWordmark ? (
        <span className={`hidden sm:flex flex-col leading-none ${muted}`}>
          <span className={`font-display text-[14px] font-bold tracking-tight ${strong}`}>Xplore Odyssey</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]">Iloilo</span>
        </span>
      ) : (
        <span className={`hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.16em] ${muted}`}>
          Iloilo
        </span>
      )}
    </Link>
  );
}
