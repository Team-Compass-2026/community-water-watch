import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Droplets, MapPin, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WaterWatch — Community water & sanitation risk monitoring" },
      {
        name: "description",
        content:
          "WaterWatch turns small local observations into early WASH risk signals for residents and response organizations in Yangon.",
      },
      { property: "og:title", content: "WaterWatch — Community WASH risk monitoring" },
      {
        property: "og:description",
        content:
          "Residents report water, sanitation and flooding problems. WaterWatch verifies them and reveals the bigger pattern.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Droplets className="size-4" />
          </span>
          WaterWatch
        </div>

        <div className="mt-14 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Community WASH monitoring · Yangon
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Small observations from many people can reveal a bigger problem.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Residents report water, sanitation and flooding problems around them. WaterWatch
            verifies those reports, finds the pattern, warns the neighbourhood, and shows response
            teams exactly where to look.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <RoleCard
            to="/citizen"
            icon={<Users className="size-5" />}
            eyebrow="I'm a resident"
            title="See the risk around me"
            body="Check your ward's WASH risk, browse nearby reports, add your own, and get local alerts."
            cta="Enter as resident"
            primary
          />
          <RoleCard
            to="/org"
            icon={<BarChart3 className="size-5" />}
            eyebrow="I'm an organization"
            title="Find and investigate hotspots"
            body="Township-level risk across Yangon, trends over time, and the reports behind every score."
            cta="Enter as organization"
          />
        </div>

        <div className="mt-14 grid gap-6 rounded-2xl border bg-card p-6 sm:grid-cols-3">
          <Step
            icon={<MapPin className="size-4" />}
            title="Observe & report"
            body="A photo, a category and a location is all it takes."
          />
          <Step
            icon={<ShieldCheck className="size-4" />}
            title="Neighbours verify"
            body="Reports confirmed by others carry more weight in the signal."
          />
          <Step
            icon={<BarChart3 className="size-4" />}
            title="Patterns surface"
            body="Clusters raise the ward risk level and alert residents and teams."
          />
        </div>

        <p className="mt-8 max-w-2xl text-xs text-muted-foreground">
          This is a prototype with fictional demonstration data. WaterWatch presents water,
          sanitation and hygiene risk signals — it does not diagnose cholera or any other disease.
        </p>
      </div>
    </main>
  );
}

function RoleCard({
  to,
  icon,
  eyebrow,
  title,
  body,
  cta,
  primary,
}: {
  to: "/citizen" | "/org";
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
    >
      <div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          {icon}
        </div>
        <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      </div>
      <Button className="mt-6 w-fit" variant={primary ? "default" : "outline"} asChild>
        <span>
          {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Button>
    </Link>
  );
}

function Step({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        {icon}
      </div>
      <p className="mt-3 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
