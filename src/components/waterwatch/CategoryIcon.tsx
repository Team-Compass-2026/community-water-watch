import { Droplet, Trash2, Waves, PipetteIcon } from "lucide-react";
import type { ReportCategory } from "@/data/demo";
import { cn } from "@/lib/utils";

const ICONS = {
  water: Droplet,
  sanitation: Trash2,
  flooding: Waves,
  supply: PipetteIcon,
} as const;

export function CategoryIcon({
  category,
  className,
}: {
  category: ReportCategory;
  className?: string;
}) {
  const Icon = ICONS[category];
  return <Icon className={cn("size-3.5", className)} aria-hidden />;
}
