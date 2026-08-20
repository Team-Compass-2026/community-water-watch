import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, Check, ChevronLeft, MapPin, ShieldCheck } from "lucide-react";
import { CitizenShell } from "@/components/waterwatch/Shells";
import { ReportPhoto } from "@/components/waterwatch/ReportPhoto";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDemo, type DraftReport } from "@/lib/demo-store";
import { CATEGORY_META, HOME_WARD, type ReportCategory } from "@/data/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/citizen/report/new")({
  head: () => ({
    meta: [
      { title: "Report a problem — WaterWatch resident" },
      {
        name: "description",
        content:
          "Report a water, sanitation, flooding or supply problem in three steps: category, details, location.",
      },
      { property: "og:title", content: "Report a problem — WaterWatch" },
      {
        property: "og:description",
        content: "Add a category, a photo and a location. Neighbours confirm what you saw.",
      },
    ],
  }),
  component: NewReport,
});

const SEVERITIES = [
  { id: "low", label: "Minor" },
  { id: "medium", label: "Noticeable" },
  { id: "high", label: "Serious" },
] as const;

function NewReport() {
  const navigate = useNavigate();
  const { submitReport } = useDemo();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<DraftReport>({
    category: "water",
    severity: "high",
    description: "",
    duration: "3 days",
    street: "Bo Min Yaung St, Lane 5",
    photo: false,
  });

  const canContinue = step === 1 ? Boolean(draft.category) : step === 2 ? true : true;

  return (
    <CitizenShell
      title="Report a problem"
      subtitle={`Step ${step} of 3 · ${HOME_WARD.ward}`}
      back="/citizen"
    >
      <div className="flex gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn("h-1.5 flex-1 rounded-full", s <= step ? "bg-primary" : "bg-muted")}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">What did you see?</p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(CATEGORY_META) as ReportCategory[]).map((c) => (
              <button
                key={c}
                onClick={() => setDraft({ ...draft, category: c })}
                className={cn(
                  "rounded-xl border bg-card p-3 text-left transition-colors",
                  draft.category === c ? "border-primary ring-2 ring-ring/20" : "hover:border-primary/40",
                )}
              >
                <span className="text-xl" aria-hidden>
                  {CATEGORY_META[c].emoji}
                </span>
                <p className="mt-1 text-sm font-medium">{CATEGORY_META[c].label}</p>
                <p className="text-xs text-muted-foreground">{CATEGORY_META[c].hint}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">How serious is it?</Label>
            <div className="mt-1.5 flex gap-2">
              {SEVERITIES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setDraft({ ...draft, severity: s.id })}
                  className={cn(
                    "flex-1 rounded-lg border bg-card px-2 py-2 text-sm",
                    draft.severity === s.id && "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="desc" className="text-xs text-muted-foreground">
              Describe it briefly
            </Label>
            <Textarea
              id="desc"
              rows={3}
              className="mt-1.5"
              placeholder="Water from the street tap has been brown for three days…"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">How long has it lasted?</Label>
            <div className="mt-1.5 flex gap-2">
              {["Today", "3 days", "Over a week"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDraft({ ...draft, duration: d })}
                  className={cn(
                    "flex-1 rounded-lg border bg-card px-2 py-2 text-sm",
                    draft.duration === d && "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Photo</Label>
            {draft.photo ? (
              <div className="mt-1.5 flex items-center gap-3 rounded-xl border bg-card p-2">
                <ReportPhoto kind={draft.category} className="size-16" label="" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">Photo attached</p>
                  <button
                    className="text-xs text-muted-foreground underline"
                    onClick={() => setDraft({ ...draft, photo: false })}
                  >
                    Remove
                  </button>
                </div>
                <Check className="size-4 text-risk-low" />
              </div>
            ) : (
              <button
                onClick={() => setDraft({ ...draft, photo: true })}
                className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed bg-card py-6 text-sm text-muted-foreground"
              >
                <Camera className="size-4" /> Add a photo (demo)
              </button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Confirm where this is.</p>
          <div className="relative aspect-4/3 overflow-hidden rounded-xl border bg-surface">
            <svg viewBox="0 0 100 80" className="size-full">
              <rect width="100" height="80" fill="var(--surface)" />
              {[
                [14, 18, 24, 16],
                [46, 14, 26, 16],
                [16, 46, 24, 18],
                [50, 46, 28, 18],
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
              <g stroke="var(--border)" strokeWidth="1.2">
                <line x1="0" y1="40" x2="100" y2="39" />
                <line x1="43" y1="0" x2="44" y2="80" />
              </g>
              <g transform="translate(48 42)">
                <circle r="8" fill="var(--primary)" opacity="0.15">
                  <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="var(--primary)" />
              </g>
            </svg>
          </div>
          <div className="flex items-start gap-2 rounded-xl border bg-card p-3 text-sm">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium">{draft.street}</p>
              <p className="text-xs text-muted-foreground">
                {HOME_WARD.ward}, {HOME_WARD.township} · pin detected from your location
              </p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" /> Your identity stays private. Only the location and
            description are shared.
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ChevronLeft className="size-4" /> Back
          </Button>
        )}
        {step < 3 ? (
          <Button className="flex-1" disabled={!canContinue} onClick={() => setStep(step + 1)}>
            Continue
          </Button>
        ) : (
          <Button
            className="flex-1"
            onClick={() => {
              submitReport(draft);
              navigate({ to: "/citizen/submitted" });
            }}
          >
            Submit report
          </Button>
        )}
      </div>
    </CitizenShell>
  );
}
