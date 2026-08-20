import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Info, Megaphone, Share2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { CitizenShell } from "@/components/waterwatch/Shells";
import { RiskBadge } from "@/components/waterwatch/RiskBadge";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";
import { HOME_WARD } from "@/data/demo";

export const Route = createFileRoute("/citizen/alert")({
  head: () => ({
    meta: [
      { title: "Ward alert — WaterWatch resident" },
      {
        name: "description",
        content:
          "Elevated water and sanitation risk in your ward: why it changed and what to do today.",
      },
      { property: "og:title", content: "Ward alert — WaterWatch" },
      {
        property: "og:description",
        content: "A local WASH risk alert with plain-language actions for residents.",
      },
    ],
  }),
  component: AlertScreen,
});

function AlertScreen() {
  const { verified, riskLevel, markAlertSeen } = useDemo();

  useEffect(() => {
    if (verified) markAlertSeen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verified]);

  if (!verified) {
    return (
      <CitizenShell title="Alerts" subtitle="No active alerts" back="/citizen">
        <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
          <Megaphone className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-2">
            You have no alerts right now. We'll notify you if the risk in {HOME_WARD.ward} changes.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to="/citizen">Back to your area</Link>
        </Button>
      </CitizenShell>
    );
  }

  return (
    <CitizenShell title="Ward alert" subtitle="Issued just now · Ward 12" back="/citizen">
      <div className="rounded-2xl border border-risk-high/40 bg-risk-high-soft p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-risk-high">
            <Megaphone className="size-4" /> Risk raised
          </span>
          <RiskBadge level={riskLevel} />
        </div>
        <h2 className="mt-2 text-lg font-semibold">
          Elevated water & sanitation risk in {HOME_WARD.ward}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Reports of discoloured tap water and blocked drainage are clustering around the Bo Min
          Yaung St standpipe.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="size-4 text-primary" /> Why it changed
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• 15 verified reports within 400 m in the last 8 days.</li>
          <li>• Water-quality and sanitation reports at the same locations.</li>
          <li>• 154 mm of rain this week with three known blocked drainage points.</li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-card p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Droplets className="size-4 text-primary" /> What to do
        </h3>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>• Boil drinking water for one minute, or treat it, until further notice.</li>
          <li>• Avoid contact with standing floodwater; wash hands after any contact.</li>
          <li>
            • Nearest checked water point: <strong>School Road community tank</strong>, 450 m,
            open 6am–7pm.
          </li>
        </ul>
      </div>

      <p className="flex items-start gap-2 rounded-xl border bg-muted p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        This is a water and sanitation risk signal based on community reports and rainfall. It is
        not a medical diagnosis and does not confirm any disease outbreak.
      </p>

      <div className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to="/citizen/map">See details on the map</Link>
        </Button>
        <Button variant="outline" onClick={() => toast("Alert link copied for sharing.")}>
          <Share2 className="size-4" />
        </Button>
      </div>
    </CitizenShell>
  );
}
