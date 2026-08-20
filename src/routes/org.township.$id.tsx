import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CheckCircle2, ClipboardList, Download, Flag } from "lucide-react";
import { toast } from "sonner";
import { OrgShell } from "@/components/waterwatch/Shells";
import { WardMap } from "@/components/waterwatch/WardMap";
import { RiskBadge } from "@/components/waterwatch/RiskBadge";
import { ReportPhoto } from "@/components/waterwatch/ReportPhoto";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDemo } from "@/lib/demo-store";
import { CATEGORY_META, RISK_FACTORS, TOWNSHIPS, scoreToRisk } from "@/data/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/org/township/$id")({
  head: () => ({
    meta: [
      { title: "Hotspot investigation — WaterWatch for organizations" },
      {
        name: "description",
        content:
          "Why a township is flagged high risk: score breakdown, trend spike and the community reports behind it.",
      },
      { property: "og:title", content: "Hotspot investigation — WaterWatch" },
      {
        property: "og:description",
        content: "Drill into a township's risk score and the evidence contributing to it.",
      },
    ],
  }),
  component: TownshipDetail,
});

function TownshipDetail() {
  const { id } = Route.useParams();
  const township = TOWNSHIPS.find((t) => t.id === id);
  if (!township) throw notFound();

  const { reports, riskScore, verified, history, investigating, flagInvestigation, userReport } =
    useDemo();
  const isHotspot = township.id === "hlaing-tharyar";
  const score = isHotspot ? (verified ? riskScore : 55) : township.score;
  const level = isHotspot ? scoreToRisk(score) : township.risk;
  const evidence = isHotspot ? reports : reports.slice(3, 8);
  const trend = isHotspot
    ? history
    : history.map((h) => ({ ...h, score: Math.round(h.score * (township.score / 66)) }));
  const last = trend[trend.length - 1]!;

  return (
    <OrgShell
      title={`${township.name} — Ward 12 cluster`}
      subtitle="Hotspot investigation · community-reported WASH signals"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast("Situation brief exported (demo).")}>
            <Download className="size-4" /> Export brief
          </Button>
          <Button
            onClick={() => {
              flagInvestigation();
              toast("Flagged for field investigation", {
                description: "Assigned to the Hlaing Tharyar WASH response team.",
              });
            }}
            disabled={investigating}
          >
            <Flag className="size-4" />
            {investigating ? "Under investigation" : "Flag for investigation"}
          </Button>
        </div>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <RiskBadge level={level} size="lg" />
        <span className="tabular text-sm text-muted-foreground">
          Risk score <strong className="text-foreground">{score}</strong>/100 ·{" "}
          {township.reports7d} reports in 7 days · {township.verifiedPct}% verified
        </span>
        {investigating && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
            <ClipboardList className="size-3.5" /> Under investigation
          </span>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-4">
            <h2 className="text-sm font-semibold">Report cluster</h2>
            <WardMap
              className="mt-3 aspect-4/3"
              reports={evidence}
              riskLevel={level}
              highlightId={userReport?.id ?? null}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Cluster centred on the Bo Min Yaung St standpipe, radius ≈ 400 m.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-4">
            <h2 className="text-sm font-semibold">Why this area is high risk</h2>
            <div className="mt-3 space-y-3">
              {RISK_FACTORS.map((f) => (
                <div key={f.label}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{f.label}</span>
                    <span className="tabular text-xs text-muted-foreground">
                      weight {f.weight}%
                    </span>
                  </div>
                  <Progress value={f.value} className="mt-1.5" />
                  <p className="mt-1 text-xs text-muted-foreground">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-accent/50 p-4">
            <h2 className="text-sm font-semibold">Recommended next step</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Field verification of the six water points in Ward 12, starting with the Bo Min Yaung
              St standpipe, plus drainage clearance at the market inlet. WaterWatch reports a WASH
              risk signal only — it does not diagnose disease.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-4">
            <h2 className="text-sm font-semibold">Risk trend — last 14 days</h2>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 8, right: 12, left: -20 }}>
                  <defs>
                    <linearGradient id="orgFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--risk-high)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--risk-high)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11 }}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    name="Risk score"
                    stroke="var(--risk-high)"
                    strokeWidth={2.5}
                    fill="url(#orgFill)"
                  />
                  {verified && isHotspot && (
                    <ReferenceDot
                      x={last.day}
                      y={last.score}
                      r={5}
                      fill="var(--risk-high)"
                      stroke="var(--card)"
                      strokeWidth={2}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {verified && isHotspot && (
              <p className="text-xs text-risk-high">
                Spike on Aug 20: cluster of verified water-quality reports around one supply point.
              </p>
            )}
          </div>

          <div className="rounded-2xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Contributing reports</h2>
              <span className="text-xs text-muted-foreground">{evidence.length} shown</span>
            </div>
            <div className="mt-3 max-h-[26rem] space-y-2 overflow-y-auto pr-1">
              {evidence.map((r) => (
                <Link
                  key={r.id}
                  to="/citizen/report/$id"
                  params={{ id: r.id }}
                  className={cn(
                    "flex gap-3 rounded-xl border p-2.5 transition-colors hover:border-primary/50",
                    r.id === userReport?.id && "border-primary/60 bg-accent/40",
                  )}
                >
                  <ReportPhoto kind={r.photo} className="size-14 shrink-0" label="" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {CATEGORY_META[r.category].label} · {r.street} · {r.ageLabel}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 inline-flex items-center gap-1 text-xs",
                        r.status === "pending" ? "text-muted-foreground" : "text-risk-low",
                      )}
                    >
                      <CheckCircle2 className="size-3" />
                      {r.status === "pending"
                        ? `Awaiting verification (${r.verifications}/${r.verificationsNeeded})`
                        : `Verified ×${r.verifications}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OrgShell>
  );
}
