import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { CitizenShell } from "@/components/waterwatch/Shells";
import { WardMap } from "@/components/waterwatch/WardMap";
import { ReportListItem } from "@/components/waterwatch/ReportListItem";
import { RiskBadge } from "@/components/waterwatch/RiskBadge";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";
import { CATEGORY_META, HOME_WARD, type ReportCategory } from "@/data/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/citizen/map")({
  head: () => ({
    meta: [
      { title: "Community map — WaterWatch resident" },
      {
        name: "description",
        content:
          "See verified water, sanitation and flooding reports pinned around your ward in Yangon.",
      },
      { property: "og:title", content: "Community map — WaterWatch" },
      {
        property: "og:description",
        content: "Reports from your neighbours, mapped by category and time.",
      },
    ],
  }),
  component: CitizenMap,
});

const FILTERS: (ReportCategory | "all")[] = ["all", "water", "sanitation", "flooding", "supply"];

function CitizenMap() {
  const { reports, riskLevel, userReport } = useDemo();
  const [filter, setFilter] = useState<ReportCategory | "all">("all");
  const [days, setDays] = useState(7);
  const [selected, setSelected] = useState<string | null>(null);

  const visible = reports.filter(
    (r) => (filter === "all" || r.category === filter) && r.daysAgo <= days,
  );
  const selectedReport = visible.find((r) => r.id === selected) ?? null;

  return (
    <CitizenShell
      title="Community map"
      subtitle={`${HOME_WARD.ward} · ${visible.length} reports shown`}
      back="/citizen"
    >
      <div className="flex items-center justify-between">
        <RiskBadge level={riskLevel} />
        <div className="flex rounded-full border bg-card p-0.5 text-xs">
          {[7, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={cn(
                "rounded-full px-2.5 py-1",
                days === d ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {d} days
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs transition-colors",
              filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {f === "all" ? "All" : `${CATEGORY_META[f].emoji} ${CATEGORY_META[f].short}`}
          </button>
        ))}
      </div>

      <WardMap
        reports={visible}
        riskLevel={riskLevel}
        selectedId={selected}
        onSelect={setSelected}
        highlightId={userReport?.id ?? null}
        className="aspect-4/3"
      />

      {selectedReport ? (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Selected pin</p>
          <ReportListItem report={selectedReport} />
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Tap a pin on the map to see the report behind it.
        </p>
      )}

      <Button asChild className="w-full">
        <Link to="/citizen/report/new">
          <Plus className="size-4" /> Report a problem here
        </Link>
      </Button>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold">All reports ({visible.length})</h2>
        {visible.map((r) => (
          <ReportListItem
            key={r.id}
            report={r}
            active={selected === r.id}
            onClick={() => setSelected(r.id)}
          />
        ))}
      </div>
    </CitizenShell>
  );
}
