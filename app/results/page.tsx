"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { LayerResult, Recommendation } from "@/types/recommend";
import { StackDiagram } from "@/components/StackDiagram";
import {
  prefersReducedMotion,
  revealImmediately,
  staggerReveal,
} from "@/lib/motion/animeReveal";

const INPUT_LABELS: { key: string; label: string; values: Record<string, string> }[] = [
  { key: "projectType", label: "Project type", values: { web: "Web App / SaaS", mobile: "Mobile App", desktop: "Desktop App", game: "Game", api: "API / Backend", internal: "Internal Tool", cli: "CLI Tool", extension: "Browser Extension" } },
  { key: "audience", label: "Audience", values: { b2c: "Consumers (B2C)", b2b: "Businesses (B2B)", internal: "Internal team", mixed: "Mixed" } },
  { key: "languagePreference", label: "Language", values: { js: "JavaScript / TypeScript", python: "Python", go: "Go", java: "Java / Kotlin", dotnet: "C# / .NET", ruby: "Ruby", rust: "Rust", cpp: "C / C++", none: "No preference" } },
  { key: "userLoad", label: "Concurrent users", values: { tiny: "Under 100", small: "100–10,000", medium: "10,000–1M", large: "1M+", unsure: "Not sure" } },
  { key: "realTime", label: "Real-time", values: { yes: "Yes", no: "No" } },
  { key: "dataNeed", label: "Data needs", values: { simple: "Simple CRUD", relational: "Relational / complex", analytics: "Heavy analytics", document: "Document / unstructured", unsure: "Not sure" } },
  { key: "timeline", label: "Timeline", values: { sprint: "Under 1 month", short: "1–3 months", medium: "3–6 months", long: "6+ months" } },
  { key: "experience", label: "Experience", values: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" } },
  { key: "priority", label: "Priority", values: { speed: "Speed to market", performance: "Performance & scale", cost: "Cost efficiency", dx: "Developer experience" } },
];

function InputsSummary({ inputs }: { inputs: Record<string, string> }) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-5" data-reveal>
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/40">
        Your inputs
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {INPUT_LABELS.map(({ key, label, values }) => {
          const val = inputs[key];
          if (!val) return null;
          return (
            <div key={key}>
              <p className="text-xs text-foreground/40">{label}</p>
              <p className="text-sm font-medium">{values[val] ?? val}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <div className="h-1.5 flex-1 rounded-full bg-foreground/10">
        <div
          className="h-1.5 rounded-full bg-foreground/50 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs text-foreground/40">{value}%</span>
    </div>
  );
}

function LayerCard({ layer }: { layer: LayerResult }) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-6" data-reveal>
      <p className="mb-1 text-xs font-medium uppercase tracking-widest text-foreground/40">
        {layer.primary.role}
      </p>
      <p className="text-lg font-semibold">{layer.primary.name}</p>
      <ConfidenceBar value={layer.primary.confidence} />
      <p className="mt-3 text-sm text-foreground/60">{layer.primary.rationale}</p>

      {layer.alternatives.length > 0 && (
        <div className="mt-5 border-t border-foreground/8 pt-4">
          <p className="mb-3 text-xs font-medium text-foreground/30">Alternatives</p>
          <div className="flex flex-col gap-3">
            {layer.alternatives.map((alt) => (
              <div key={alt.name}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{alt.name}</p>
                </div>
                <ConfidenceBar value={alt.confidence} />
                <p className="mt-1 text-xs text-foreground/50">{alt.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");
  const rawInputs = searchParams.get("inputs");
  const inputs: Record<string, string> | null = rawInputs ? (() => { try { return JSON.parse(rawInputs); } catch { return null; } })() : null;
  const contentRef = useRef<HTMLDivElement>(null);
  const [diagramReady, setDiagramReady] = useState(false);

  const handleDiagramComplete = useCallback(() => {
    setDiagramReady(true);
  }, []);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setDiagramReady(true);
    }, 5000);

    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!diagramReady) return;

    const root = contentRef.current;
    if (!root) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (prefersReducedMotion()) {
      revealImmediately(elements);
      return;
    }

    return staggerReveal(elements, {
      distanceY: -14,
      duration: 360,
      staggerMs: 80,
    });
  }, [diagramReady]);

  if (!raw) {
    return (
      <div className="rounded-2xl border border-foreground/10 p-8 text-center">
        <p className="text-foreground/50">No recommendation found.</p>
        <Link
          href="/questionnaire"
          className="mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline"
        >
          Start over
        </Link>
      </div>
    );
  }

  let recommendation: Recommendation;
  try {
    recommendation = JSON.parse(raw) as Recommendation;
  } catch {
    return (
      <div className="rounded-2xl border border-foreground/10 p-8 text-center">
        <p className="text-foreground/50">Something went wrong loading your results.</p>
        <Link
          href="/questionnaire"
          className="mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline"
        >
          Try again
        </Link>
      </div>
    );
  }

  return (
    <div ref={contentRef} className="flex flex-col gap-6">
      <div
        className={diagramReady ? undefined : "pointer-events-none opacity-0"}
        aria-hidden={!diagramReady}
      >
        <h1 className="text-3xl font-semibold tracking-tight" data-reveal>
          {recommendation.title}
        </h1>
        <p className="mt-2 text-sm text-foreground/50" data-reveal>
          {recommendation.summary}
        </p>
      </div>

      <StackDiagram
        layers={recommendation.layers}
        onIntroComplete={handleDiagramComplete}
      />

      <div
        className={diagramReady ? undefined : "pointer-events-none opacity-0"}
        aria-hidden={!diagramReady}
      >
        <div className="flex flex-col gap-4">
          {recommendation.layers.map((layer) => (
            <LayerCard key={layer.role} layer={layer} />
          ))}
        </div>

        {inputs && <InputsSummary inputs={inputs} />}

        <div className="mt-6 flex gap-4 pt-2">
          <Link
            href="/questionnaire"
            data-reveal
            className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            Start over
          </Link>
          <Link
            href="/history"
            data-reveal
            className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            View history
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResultsFallback() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-36 animate-pulse rounded-2xl bg-foreground/5" />
      ))}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <nav className="border-b border-foreground/10 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          StackRec
        </Link>
      </nav>

      <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <Suspense fallback={<ResultsFallback />}>
          <ResultsContent />
        </Suspense>
      </div>
    </main>
  );
}
