import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Users } from "lucide-react";
import { toast } from "sonner";
import { CitizenShell } from "@/components/waterwatch/Shells";
import { ReportListItem } from "@/components/waterwatch/ReportListItem";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useDemo } from "@/lib/demo-store";

export const Route = createFileRoute("/citizen/submitted")({
  head: () => ({
    meta: [
      { title: "Report submitted — WaterWatch resident" },
      {
        name: "description",
        content:
          "Your report is live. Neighbours verify it, WaterWatch checks it against nearby reports, and alerts follow if risk rises.",
      },
      { property: "og:title", content: "Report submitted — WaterWatch" },
      {
        property: "og:description",
        content: "See what happens after you report: verification, pattern check, local alerts.",
      },
    ],
  }),
  component: Submitted,
});

function Submitted() {
  const navigate = useNavigate();
  const { userReport, verified, verifyReport, submitted } = useDemo();
  const [count, setCount] = useState(verified ? 3 : 0);

  useEffect(() => {
    if (!submitted) navigate({ to: "/citizen" });
  }, [submitted, navigate]);

  useEffect(() => {
    if (verified) setCount(3);
  }, [verified]);

  const runVerification = () => {
    let n = 0;
    const tick = () => {
      n += 1;
      setCount(n);
      if (n < 3) setTimeout(tick, 900);
      else {
        verifyReport();
        toast("Ward risk raised to High", {
          description: "3 residents confirmed your report and it matches a nearby cluster.",
        });
      }
    };
    setTimeout(tick, 700);
  };

  if (!userReport) return null;

  return (
    <CitizenShell title="Report submitted" subtitle="Thank you for speaking up" back="/citizen">
      <div className="rounded-2xl border border-risk-low/40 bg-risk-low-soft p-4 text-center">
        <CheckCircle2 className="mx-auto size-8 text-risk-low" />
        <p className="mt-2 font-medium">Your report is live in Ward 12</p>
        <p className="text-xs text-muted-foreground">
          Neighbours nearby can now confirm what you saw.
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted-foreground">How others see it</p>
        <ReportListItem report={{ ...userReport, verifications: count }} />
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Users className="size-4 text-primary" /> Verifications
          </span>
          <span className="tabular font-medium">{count} of 3</span>
        </div>
        <Progress value={(count / 3) * 100} className="mt-2" />
        {count < 3 ? (
          <Button variant="outline" className="mt-3 w-full" onClick={runVerification}>
            Simulate neighbours verifying
          </Button>
        ) : (
          <p className="mt-3 text-sm text-risk-low">
            Verified. Your report now contributes to the ward risk signal.
          </p>
        )}
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <h2 className="text-sm font-semibold">What happens next</h2>
        <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li>1. Neighbours confirm the report.</li>
          <li>2. WaterWatch checks it against other reports nearby.</li>
          <li>3. If a pattern appears, residents get an alert and teams see a hotspot.</li>
        </ol>
      </div>

      {verified ? (
        <Button asChild className="w-full">
          <Link to="/citizen/alert">See the alert for your ward</Link>
        </Button>
      ) : (
        <Button asChild variant="outline" className="w-full">
          <Link to="/citizen/map">See it on the map</Link>
        </Button>
      )}
    </CitizenShell>
  );
}
