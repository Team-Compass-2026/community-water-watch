import { CATEGORY_META, RISK_META, type DemoReport, type RiskLevel } from "@/data/demo";
import { CategoryIcon } from "./CategoryIcon";
import { cn } from "@/lib/utils";

export function WardMap({
  reports,
  selectedId,
  onSelect,
  riskLevel,
  className,
  highlightId,
}: {
  reports: DemoReport[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  riskLevel: RiskLevel;
  className?: string;
  highlightId?: string | null;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-surface", className)}>
      <svg viewBox="0 0 100 80" className="size-full">
        {/* water body */}
        <path d="M0 66 Q 20 60 44 68 T 100 64 L100 80 L0 80Z" fill="var(--risk-low-soft)" />
        {/* blocks */}
        {[
          [14, 18, 22, 16],
          [40, 14, 26, 14],
          [70, 16, 20, 18],
          [12, 40, 20, 16],
          [36, 38, 24, 18],
          [64, 38, 24, 16],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="1.5"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="0.4"
          />
        ))}
        {/* roads */}
        <g stroke="var(--border)" strokeWidth="1.2" strokeLinecap="round">
          <line x1="4" y1="34" x2="96" y2="32" />
          <line x1="4" y1="58" x2="96" y2="56" />
          <line x1="34" y1="6" x2="32" y2="70" />
          <line x1="62" y1="6" x2="64" y2="70" />
        </g>
        {/* risk cluster halo */}
        <circle
          cx="50"
          cy="43"
          r="20"
          fill={RISK_META[riskLevel].hex}
          opacity="0.14"
          className="transition-all duration-700"
        />
        <circle
          cx="50"
          cy="43"
          r="13"
          fill={RISK_META[riskLevel].hex}
          opacity="0.16"
          className="transition-all duration-700"
        />

        {reports.map((r) => {
          const active = selectedId === r.id;
          const highlight = highlightId === r.id;
          return (
            <g
              key={r.id}
              transform={`translate(${r.x} ${r.y})`}
              onClick={() => onSelect?.(r.id)}
              className={onSelect ? "cursor-pointer" : undefined}
            >
              {highlight && (
                <circle r="5" fill="var(--primary)" opacity="0.25">
                  <animate
                    attributeName="r"
                    values="3.5;7;3.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                r={active ? 3.2 : 2.4}
                fill={
                  r.status === "pending" ? "var(--card)" : RISK_META[severityRisk(r)].hex
                }
                stroke={highlight ? "var(--primary)" : RISK_META[severityRisk(r)].hex}
                strokeWidth={active || highlight ? 1.1 : 0.7}
              />
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute bottom-2 left-2 flex flex-wrap gap-2 rounded-lg bg-card/90 px-2 py-1.5 text-[10px] text-muted-foreground shadow-sm">
        {(Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]).map((k) => (
          <span key={k} className="flex items-center gap-1">
            <CategoryIcon category={k} className="size-3" />
            {CATEGORY_META[k].short}
          </span>
        ))}
      </div>
    </div>
  );
}

function severityRisk(r: DemoReport): RiskLevel {
  if (r.severity === "high") return "high";
  if (r.severity === "medium") return "moderate";
  return "low";
}
