import { cn } from "@/lib/utils";

/**
 * Lightweight illustrative stand-in for a resident photo. Deterministic SVG so
 * the demo never depends on remote images.
 */
export function ReportPhoto({
  kind,
  className,
  label,
}: {
  kind: string;
  className?: string;
  label?: string;
}) {
  const palettes: Record<string, [string, string]> = {
    water: ["oklch(0.62 0.07 70)", "oklch(0.45 0.06 60)"],
    drain: ["oklch(0.5 0.03 150)", "oklch(0.33 0.03 160)"],
    flood: ["oklch(0.58 0.05 220)", "oklch(0.38 0.05 235)"],
    pump: ["oklch(0.6 0.03 240)", "oklch(0.4 0.03 250)"],
  };
  const [a, b] = palettes[kind] ?? (palettes["water"] as [string, string]);

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-muted", className)}>
      <svg viewBox="0 0 120 80" className="size-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
        </defs>
        <rect width="120" height="80" fill={`url(#g-${kind})`} />
        <path d="M0 58 Q 30 48 60 58 T 120 56 L120 80 L0 80Z" fill="oklch(1 0 0 / 0.14)" />
        <path d="M0 66 Q 35 58 70 68 T 120 66 L120 80 L0 80Z" fill="oklch(0 0 0 / 0.16)" />
        <circle cx="94" cy="20" r="12" fill="oklch(1 0 0 / 0.12)" />
        <rect x="12" y="26" width="26" height="34" rx="3" fill="oklch(0 0 0 / 0.18)" />
      </svg>
      <span className="absolute bottom-1 left-1 rounded bg-foreground/60 px-1.5 py-0.5 text-[10px] text-background">
        {label ?? "Resident photo"}
      </span>
    </div>
  );
}
