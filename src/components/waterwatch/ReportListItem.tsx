import { Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { CATEGORY_META, type DemoReport } from "@/data/demo";
import { ReportPhoto } from "./ReportPhoto";
import { CategoryIcon } from "./CategoryIcon";
import { cn } from "@/lib/utils";

export function ReportListItem({
  report,
  onClick,
  active,
  asLink = true,
}: {
  report: DemoReport;
  onClick?: () => void;
  active?: boolean;
  asLink?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "flex w-full gap-3 rounded-xl border bg-card p-3 text-left transition-colors hover:border-primary/40",
        active && "border-primary/60 ring-2 ring-ring/20",
      )}
    >
      <ReportPhoto kind={report.photo} className="size-16 shrink-0" label="" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CategoryIcon category={report.category} />
            {CATEGORY_META[report.category].short}
          </span>
          {report.status === "pending" ? (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" /> {report.verifications}/{report.verificationsNeeded}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-risk-low">
              <CheckCircle2 className="size-3" /> Verified ×{report.verifications}
            </span>
          )}
        </div>
        <p className="truncate font-medium">{report.title}</p>
        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          {report.street} · {report.ageLabel}
        </p>
      </div>
    </div>
  );

  if (onClick || !asLink) {
    return (
      <button type="button" onClick={onClick} className="w-full">
        {inner}
      </button>
    );
  }
  return (
    <Link to="/citizen/report/$id" params={{ id: report.id }} className="block">
      {inner}
    </Link>
  );
}
