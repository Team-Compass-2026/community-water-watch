import { RISK_META, type RiskLevel } from "@/data/demo";
import { cn } from "@/lib/utils";

export function RiskBadge({
  level,
  className,
  size = "sm",
}: {
  level: RiskLevel;
  className?: string;
  size?: "sm" | "lg";
}) {
  const meta = RISK_META[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium",
        meta.bg,
        meta.text,
        size === "lg" ? "px-4 py-1.5 text-sm" : "px-2.5 py-1 text-xs",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", meta.dot)} />
      {meta.label} risk
    </span>
  );
}

export function RiskScale({ level }: { level: RiskLevel }) {
  const levels: RiskLevel[] = ["low", "moderate", "high", "severe"];
  return (
    <div className="flex items-center gap-1.5">
      {levels.map((l) => (
        <div key={l} className="flex-1">
          <div
            className={cn(
              "h-1.5 rounded-full transition-colors",
              RISK_META[l].dot,
              levels.indexOf(l) > levels.indexOf(level) && "opacity-20",
            )}
          />
          <p
            className={cn(
              "mt-1.5 text-[10px] uppercase tracking-wide",
              l === level ? cn(RISK_META[l].text, "font-semibold") : "text-muted-foreground",
            )}
          >
            {RISK_META[l].label}
          </p>
        </div>
      ))}
    </div>
  );
}
