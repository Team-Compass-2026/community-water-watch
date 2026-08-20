import { useState } from "react";
import { RISK_META, TOWNSHIPS, type Township } from "@/data/demo";
import { cn } from "@/lib/utils";

export function YangonMap({
  selectedId,
  onSelect,
  className,
}: {
  selectedId?: string | null;
  onSelect?: (t: Township) => void;
  className?: string;
}) {
  const [hover, setHover] = useState<Township | null>(null);

  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-surface p-2", className)}>
      <svg viewBox="0 0 100 86" className="size-full">
        {TOWNSHIPS.map((t) => {
          const active = selectedId === t.id || hover?.id === t.id;
          return (
            <g key={t.id}>
              <polygon
                points={t.points}
                fill={RISK_META[t.risk].hex}
                fillOpacity={active ? 0.78 : 0.45}
                stroke="var(--card)"
                strokeWidth="0.6"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHover(t)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect?.(t)}
              />
              <text
                x={t.labelX}
                y={t.labelY}
                textAnchor="middle"
                className="pointer-events-none fill-foreground text-[2.6px] font-medium"
              >
                {t.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute right-3 top-3 rounded-lg border bg-card/95 px-3 py-2 text-xs shadow-sm">
        {hover ? (
          <>
            <p className="font-medium">{hover.name}</p>
            <p className="tabular text-muted-foreground">
              Score {hover.score} · {hover.reports7d} reports / 7d
            </p>
          </>
        ) : (
          <div className="space-y-1">
            {(["low", "moderate", "high", "severe"] as const).map((l) => (
              <div key={l} className="flex items-center gap-2 text-muted-foreground">
                <span className={cn("size-2.5 rounded-sm", RISK_META[l].dot)} />
                {RISK_META[l].label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
