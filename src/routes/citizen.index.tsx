import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Map, Megaphone, Plus } from "lucide-react";
import { CitizenShell } from "@/components/waterwatch/Shells";
import { RiskBadge, RiskScale } from "@/components/waterwatch/RiskBadge";
import { ReportListItem } from "@/components/waterwatch/ReportListItem";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";
import { HOME_WARD, RISK_META } from "@/data/demo";

export const Route = createFileRoute("/citizen/")({
  head: () => ({
    meta: [
      { title: "Your area today — WaterWatch resident" },
      {
        name: "description",
        content:
          "Current water and sanitation risk in your ward, nearby resident reports and recommended actions.",
      },
      { property: "og:title", content: "Your area today — WaterWatch" },
      {
        property: "og:description",
        content: "Ward-level WASH risk, nearby reports and simple recommended actions.",
      },
    ],
  }),
  component: CitizenHome,
});

function CitizenHome() {
  const { riskLevel, riskScore, history, reports, verified } = useDemo();
  const meta = RISK_META[riskLevel];

  return (
    <CitizenShell
      title="Your area today"
      subtitle={`${HOME_WARD.ward}, ${HOME_WARD.township} · ${HOME_WARD.city}`}
    >
      {verified && (
        <Link
          to="/citizen/alert"
          className="flex items-center gap-2 rounded-xl border border-risk-high/40 bg-risk-high-soft px-3 py-2 text-sm text-risk-high"
        >
          <Megaphone className="size-4 shrink-0" />
          <span className="flex-1">New alert for your ward</span>
          <ArrowRight className="size-4" />
        </Link>
      )}

      <section className="rounded-2xl border bg-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              WASH risk signal
            </p>
            <p className={`mt-1 font-display text-3xl font-semibold ${meta.text}`}>{meta.label}</p>
          </div>
          <RiskBadge level={riskLevel} />
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {verified
            ? "15 reports in the last 7 days, mostly water colour and blocked drainage, clustered near the Bo Min Yaung St standpipe."
            : "14 reports in the last 7 days, mostly drainage and water colour around the market area."}
        </p>

        <div className="mt-4">
          <RiskScale level={riskLevel} />
        </div>

        <div className="mt-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={meta.hex} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={meta.hex} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis domain={[0, 100]} hide />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  fontSize: 12,
                }}
                formatter={(v: number) => [`${v}/100`, "Risk score"]}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke={meta.hex}
                strokeWidth={2}
                fill="url(#riskFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="tabular mt-1 text-xs text-muted-foreground">
          Risk score {riskScore}/100 · last 14 days
        </p>
      </section>

      <Button asChild size="lg" className="w-full">
        <Link to="/citizen/report/new">
          <Plus className="size-4" /> Report a problem
        </Link>
      </Button>

      <section className="rounded-2xl border bg-card p-4">
        <h2 className="text-sm font-semibold">Recommended right now</h2>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li>• Boil or treat drinking water from street taps for the next few days.</li>
          <li>• Avoid contact with standing floodwater, especially for children.</li>
          <li>• Store water in a covered container and wash hands after any contact.</li>
        </ul>
      </section>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Nearby reports</h2>
          <Link to="/citizen/map" className="inline-flex items-center gap-1 text-xs text-primary">
            <Map className="size-3.5" /> View map
          </Link>
        </div>
        <div className="space-y-2">
          {reports.slice(0, 4).map((r) => (
            <ReportListItem key={r.id} report={r} />
          ))}
        </div>
      </section>
    </CitizenShell>
  );
}
