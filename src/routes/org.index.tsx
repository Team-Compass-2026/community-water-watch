import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, ArrowUpRight, TrendingUp } from "lucide-react";
import { OrgShell } from "@/components/waterwatch/Shells";
import { YangonMap } from "@/components/waterwatch/YangonMap";
import { RiskBadge } from "@/components/waterwatch/RiskBadge";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_BREAKDOWN,
  CITY_TREND_30D,
  RISK_META,
  TOWNSHIPS,
} from "@/data/demo";
import { useDemo } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/org/")({
  head: () => ({
    meta: [
      { title: "Yangon WASH overview — WaterWatch for organizations" },
      {
        name: "description",
        content:
          "Township-level water, sanitation and hygiene risk across Yangon, with hotspot ranking and 30-day trends.",
      },
      { property: "og:title", content: "Yangon WASH overview — WaterWatch" },
      {
        property: "og:description",
        content: "Risk by township, rising hotspots and the community reports behind them.",
      },
    ],
  }),
  component: OrgDashboard,
});

function OrgDashboard() {
  const navigate = useNavigate();
  const { verified, riskScore } = useDemo();
  const [range, setRange] = useState<"7d" | "30d">("30d");

  const trend = range === "30d" ? CITY_TREND_30D : CITY_TREND_30D.slice(-4);
  const ranked = [...TOWNSHIPS]
    .map((t) =>
      t.id === "hlaing-tharyar" ? { ...t, score: verified ? riskScore : 55, risk: verified ? ("high" as const) : ("moderate" as const) } : t,
    )
    .sort((a, b) => b.score - a.score);

  return (
    <OrgShell
      title="Yangon WASH risk overview"
      subtitle="Community-reported signals · demo data · updated 07:30"
      actions={
        <div className="flex rounded-lg border bg-card p-0.5 text-xs">
          {(["7d", "30d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1.5",
                range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              Last {r === "7d" ? "7 days" : "30 days"}
            </button>
          ))}
        </div>
      }
    >
      {verified && (
        <Link
          to="/org/township/$id"
          params={{ id: "hlaing-tharyar" }}
          className="mb-5 flex items-center gap-3 rounded-xl border border-risk-high/40 bg-risk-high-soft px-4 py-3 text-sm"
        >
          <AlertTriangle className="size-4 text-risk-high" />
          <span className="flex-1">
            <strong>New hotspot detected:</strong> Hlaing Tharyar Ward 12 — risk score rose from 55
            to {riskScore} after 15 verified reports clustered within 400 m.
          </span>
          <ArrowUpRight className="size-4" />
        </Link>
      )}

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Active reports (7d)" value="186" delta="+24%" />
        <Kpi label="Verified" value="76%" delta="+5 pts" />
        <Kpi label="Wards at high risk" value={verified ? "7" : "6"} delta={verified ? "+1" : "0"} />
        <Kpi label="Townships monitored" value="9" delta="—" muted />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border bg-card p-4">
          <h2 className="text-sm font-semibold">Risk by township</h2>
          <p className="text-xs text-muted-foreground">
            Click a township to investigate its wards.
          </p>
          <YangonMap
            className="mt-3 aspect-16/11"
            onSelect={(t) => navigate({ to: "/org/township/$id", params: { id: t.id } })}
          />
        </div>

        <div className="rounded-2xl border bg-card p-4">
          <h2 className="text-sm font-semibold">Hotspot ranking</h2>
          <div className="mt-3 overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Township</th>
                  <th className="px-3 py-2 text-right font-medium">Score</th>
                  <th className="px-3 py-2 text-right font-medium">7d</th>
                  <th className="px-3 py-2 text-right font-medium">Δ</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => navigate({ to: "/org/township/$id", params: { id: t.id } })}
                    className="cursor-pointer border-t transition-colors hover:bg-muted/60"
                  >
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-2">
                        <span className={cn("size-2 rounded-full", RISK_META[t.risk].dot)} />
                        {t.name}
                      </span>
                    </td>
                    <td className="tabular px-3 py-2 text-right font-medium">{t.score}</td>
                    <td className="tabular px-3 py-2 text-right text-muted-foreground">
                      {t.reports7d}
                    </td>
                    <td
                      className={cn(
                        "tabular px-3 py-2 text-right",
                        t.change > 0 ? "text-risk-high" : "text-muted-foreground",
                      )}
                    >
                      {t.change > 0 ? "+" : ""}
                      {t.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button asChild className="mt-3 w-full">
            <Link to="/org/township/$id" params={{ id: "hlaing-tharyar" }}>
              Investigate top hotspot
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border bg-card p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="size-4 text-primary" /> Risk trend — city average vs Ward 12
          </h2>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis domain={[0, 80]} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="city"
                  name="Yangon average"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ward"
                  name="Hlaing Tharyar W12"
                  stroke="var(--risk-high)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-4">
          <h2 className="text-sm font-semibold">Report categories (city, 30d)</h2>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_BREAKDOWN} margin={{ top: 8, right: 8, left: -20 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" name="% of reports" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2">
            <RiskBadge level={verified ? "high" : "moderate"} />
          </div>
        </div>
      </div>
    </OrgShell>
  );
}

function Kpi({
  label,
  value,
  delta,
  muted,
}: {
  label: string;
  value: string;
  delta: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="tabular mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className={cn("tabular text-xs", muted ? "text-muted-foreground" : "text-risk-high")}>
        {delta} vs previous period
      </p>
    </div>
  );
}
