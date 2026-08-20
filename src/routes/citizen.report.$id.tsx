import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, MapPin, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { CitizenShell } from "@/components/waterwatch/Shells";
import { ReportPhoto } from "@/components/waterwatch/ReportPhoto";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDemo } from "@/lib/demo-store";
import { CATEGORY_META } from "@/data/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/citizen/report/$id")({
  head: () => ({
    meta: [
      { title: "Report detail — WaterWatch resident" },
      {
        name: "description",
        content:
          "A single community report: photo, location, verification count and how it feeds the ward risk signal.",
      },
      { property: "og:title", content: "Report detail — WaterWatch" },
      {
        property: "og:description",
        content: "See who verified a report and how it contributes to local WASH risk.",
      },
    ],
  }),
  component: ReportDetail,
});

function ReportDetail() {
  const { id } = Route.useParams();
  const { reports } = useDemo();
  const report = reports.find((r) => r.id === id);
  if (!report) throw notFound();

  const pct = Math.min(100, (report.verifications / report.verificationsNeeded) * 100);
  const timeline = [
    { label: "Submitted", done: true },
    { label: "Verified by neighbours", done: report.verifications >= report.verificationsNeeded },
    { label: "Contributing to risk signal", done: report.status === "contributing" },
  ];

  return (
    <CitizenShell
      title={report.title}
      subtitle={`${CATEGORY_META[report.category].label} · ${report.ageLabel}`}
      back="/citizen/map"
    >
      <ReportPhoto kind={report.photo} className="aspect-4/3 w-full" />

      <p className="text-sm">{report.description}</p>

      <div className="flex items-start gap-2 rounded-xl border bg-card p-3 text-sm">
        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
        <div>
          <p className="font-medium">{report.street}</p>
          <p className="text-xs text-muted-foreground">
            {report.ward}, {report.township} · reported by {report.reporter}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Community verification</span>
          <span className="tabular font-medium">
            {report.verifications} of {report.verificationsNeeded}
          </span>
        </div>
        <Progress value={pct} className="mt-2" />
        <p className="mt-2 text-xs text-muted-foreground">
          5 similar reports within 300 m in the last 7 days.
        </p>
        <div className="mt-3 flex gap-2">
          <Button
            className="flex-1"
            onClick={() => toast("Thanks — your confirmation was recorded.")}
          >
            <ThumbsUp className="size-4" /> I've seen this too
          </Button>
          <Button variant="outline" onClick={() => toast("Marked as disputed for review.")}>
            <ThumbsDown className="size-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <h2 className="text-sm font-semibold">Status</h2>
        <ol className="mt-3 space-y-3">
          {timeline.map((t) => (
            <li key={t.label} className="flex items-center gap-2 text-sm">
              <CheckCircle2
                className={cn("size-4", t.done ? "text-risk-low" : "text-muted-foreground/40")}
              />
              <span className={cn(!t.done && "text-muted-foreground")}>{t.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <Button asChild variant="outline" className="w-full">
        <Link to="/citizen/map">Back to the map</Link>
      </Button>
    </CitizenShell>
  );
}
