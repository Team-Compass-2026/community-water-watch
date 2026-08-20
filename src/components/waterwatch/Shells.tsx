import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronLeft, Droplets, RotateCcw } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 font-display font-semibold", className)}>
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Droplets className="size-4" />
      </span>
      WaterWatch
    </Link>
  );
}

export function RoleSwitch({ current }: { current: "citizen" | "org" }) {
  return (
    <div className="flex rounded-full border bg-card p-0.5 text-xs">
      <Link
        to="/citizen"
        className={cn(
          "rounded-full px-3 py-1",
          current === "citizen" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
        )}
      >
        Resident
      </Link>
      <Link
        to="/org"
        className={cn(
          "rounded-full px-3 py-1",
          current === "org" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
        )}
      >
        Organization
      </Link>
    </div>
  );
}

export function ResetDemo() {
  const { resetDemo } = useDemo();
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs text-muted-foreground"
      onClick={() => {
        resetDemo();
        navigate({ to: "/" });
      }}
    >
      <RotateCcw className="size-3.5" /> Restart demo
    </Button>
  );
}

export function CitizenShell({
  title,
  subtitle,
  back,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  back?: "/citizen" | "/citizen/map";
  children: ReactNode;
}) {
  const { verified, alertSeen } = useDemo();
  const showAlert = verified && !alertSeen;

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <ResetDemo />
          <RoleSwitch current="citizen" />
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 pb-16">
        <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
          <header className="flex items-start justify-between gap-3 border-b bg-card px-4 py-3">
            <div className="min-w-0">
              {back && (
                <Link
                  to={back}
                  className="mb-1 inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="size-3.5" /> Back
                </Link>
              )}
              <h1 className="truncate text-lg font-semibold">{title}</h1>
              {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
            </div>
            <Link
              to="/citizen/alert"
              className="relative mt-1 rounded-full border bg-background p-2"
              aria-label="Alerts"
            >
              <Bell className="size-4" />
              {showAlert && (
                <span className="absolute -right-0.5 -top-0.5 size-2.5 animate-pulse rounded-full bg-risk-high" />
              )}
            </Link>
          </header>
          <div className="space-y-4 p-4">{children}</div>
        </div>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Demo prototype · fictional data · WASH risk signals, not medical diagnoses
        </p>
      </div>
    </div>
  );
}

export function OrgShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden gap-4 text-sm text-muted-foreground md:flex">
              <Link to="/org" className="hover:text-foreground">
                Overview
              </Link>
              <Link
                to="/org/township/$id"
                params={{ id: "hlaing-tharyar" }}
                className="hover:text-foreground"
              >
                Hotspots
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ResetDemo />
            <RoleSwitch current="org" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {actions}
        </div>
        {children}
        <p className="mt-10 text-xs text-muted-foreground">
          Demo prototype · fictional data. WaterWatch presents water, sanitation and hygiene risk
          signals — it does not diagnose disease.
        </p>
      </div>
    </div>
  );
}
