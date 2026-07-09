"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { LayerResult } from "@/types/recommend";

type SavedRec = {
  id: string;
  title: string;
  summary: string;
  projectType: string;
  audience: string;
  languagePreference: string;
  userLoad: string;
  realTime: string;
  dataNeed: string;
  timeline: string;
  experience: string;
  priority: string;
  resultJson: string;
  createdAt: string;
};

const FIELD_LABELS: Record<string, string> = {
  projectType: "Project Type",
  audience: "Audience",
  languagePreference: "Language",
  userLoad: "Concurrent Users",
  realTime: "Real-time",
  dataNeed: "Data Needs",
  timeline: "Timeline",
  experience: "Experience",
  priority: "Priority",
};

const VALUE_LABELS: Record<string, Record<string, string>> = {
  projectType: {
    web: "Web App / SaaS", mobile: "Mobile App", desktop: "Desktop App",
    game: "Game", api: "API / Backend", internal: "Internal Tool",
    cli: "CLI Tool", extension: "Browser Extension",
  },
  audience: {
    b2c: "Consumers (B2C)", b2b: "Businesses (B2B)",
    internal: "Internal team", mixed: "Mixed",
  },
  languagePreference: {
    js: "JavaScript / TypeScript", python: "Python", go: "Go",
    java: "Java / Kotlin", dotnet: "C# / .NET", ruby: "Ruby",
    rust: "Rust", none: "No preference",
  },
  userLoad: { tiny: "Under 100", small: "100–10,000", medium: "10,000–1M", large: "1M+" },
  realTime: { yes: "Yes", no: "No" },
  dataNeed: {
    simple: "Simple CRUD", relational: "Relational / complex",
    analytics: "Heavy analytics", document: "Unstructured / document",
  },
  timeline: {
    sprint: "Under 1 month", short: "1–3 months",
    medium: "3–6 months", long: "6+ months",
  },
  experience: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
  priority: {
    speed: "Speed to market", performance: "Performance & scale",
    cost: "Cost efficiency", dx: "Developer experience",
  },
};

const INPUT_FIELDS = Object.keys(FIELD_LABELS) as (keyof SavedRec)[];

function label(field: string, value: string): string {
  return VALUE_LABELS[field]?.[value] ?? value;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const aId = searchParams.get("a");
  const bId = searchParams.get("b");

  const [a, setA] = useState<SavedRec | null>(null);
  const [b, setB] = useState<SavedRec | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!aId || !bId) {
      setError("Two recommendations are required to compare.");
      setLoading(false);
      return;
    }

    fetch(`/api/recommendations/compare?a=${aId}&b=${bId}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setA(data.a);
          setB(data.b);
        }
      })
      .catch(() => setError("Failed to load comparison."))
      .finally(() => setLoading(false));
  }, [aId, bId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl bg-foreground/5" />
        ))}
      </div>
    );
  }

  if (error || !a || !b) {
    return (
      <div className="rounded-2xl border border-foreground/10 p-8 text-center">
        <p className="text-sm text-foreground/50">{error || "Something went wrong."}</p>
        <Link href="/history" className="mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline">
          Back to history
        </Link>
      </div>
    );
  }

  const layersA: LayerResult[] = JSON.parse(a.resultJson);
  const layersB: LayerResult[] = JSON.parse(b.resultJson);

  const allRoles = Array.from(
    new Set([...layersA.map((l) => l.role), ...layersB.map((l) => l.role)]),
  );

  const dateA = new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const dateB = new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="flex flex-col gap-8">
      {/* Headers */}
      <div className="grid grid-cols-2 gap-4">
        {[{ rec: a, date: dateA }, { rec: b, date: dateB }].map(({ rec, date }) => (
          <div key={rec.id} className="rounded-2xl border border-foreground/10 p-5">
            <p className="text-xs text-foreground/40">{date}</p>
            <p className="mt-1 font-semibold leading-tight">{rec.title}</p>
          </div>
        ))}
      </div>

      {/* Input diff */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/40">
          Inputs
        </p>
        <div className="overflow-hidden rounded-2xl border border-foreground/10">
          {INPUT_FIELDS.map((field, i) => {
            const valA = a[field] as string;
            const valB = b[field] as string;
            const differs = valA !== valB;
            return (
              <div
                key={field}
                className={`grid grid-cols-[1fr_1fr_1fr] gap-4 px-5 py-3 ${
                  i !== 0 ? "border-t border-foreground/8" : ""
                } ${differs ? "bg-foreground/4" : ""}`}
              >
                <p className="text-xs text-foreground/40">{FIELD_LABELS[field]}</p>
                <p className={`text-sm ${differs ? "font-medium" : "text-foreground/60"}`}>
                  {label(field, valA)}
                </p>
                <p className={`text-sm ${differs ? "font-medium" : "text-foreground/60"}`}>
                  {label(field, valB)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stack diff */}
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/40">
          Recommended Stack
        </p>
        <div className="flex flex-col gap-3">
          {allRoles.map((role) => {
            const layerA = layersA.find((l) => l.role === role);
            const layerB = layersB.find((l) => l.role === role);
            const nameA = layerA?.primary.name ?? "—";
            const nameB = layerB?.primary.name ?? "—";
            const differs = nameA !== nameB;

            return (
              <div
                key={role}
                className={`grid grid-cols-[80px_1fr_1fr] gap-4 rounded-2xl border px-5 py-4 ${
                  differs
                    ? "border-foreground/20 bg-foreground/4"
                    : "border-foreground/10"
                }`}
              >
                <p className="text-xs text-foreground/40 self-center">{role}</p>
                <div>
                  <p className={`text-sm font-medium ${!differs ? "text-foreground/50" : ""}`}>
                    {nameA}
                  </p>
                  {layerA && (
                    <p className="mt-0.5 text-xs text-foreground/40">
                      {layerA.primary.confidence}% match
                    </p>
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium ${!differs ? "text-foreground/50" : ""}`}>
                    {nameB}
                  </p>
                  {layerB && (
                    <p className="mt-0.5 text-xs text-foreground/40">
                      {layerB.primary.confidence}% match
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link
        href="/history"
        className="inline-flex h-10 w-fit items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
      >
        Back to history
      </Link>
    </div>
  );
}

export default function ComparePage() {
  return (
    <main className="flex flex-1 flex-col">
      <nav className="border-b border-foreground/10 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          StackRec
        </Link>
      </nav>

      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Compare recommendations</h1>
          <p className="mt-1 text-sm text-foreground/50">
            Highlighted rows differ between the two recommendations.
          </p>
        </div>

        <Suspense>
          <CompareContent />
        </Suspense>
      </div>
    </main>
  );
}
