"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { LayerResult, Recommendation } from "@/types/recommend";
import { StackDiagram } from "@/components/StackDiagram";

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
    <div className="rounded-2xl border border-foreground/10 p-6">
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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{recommendation.title}</h1>
        <p className="mt-2 text-sm text-foreground/50">{recommendation.summary}</p>
      </div>

      <StackDiagram layers={recommendation.layers} />

      <div className="flex flex-col gap-4">
        {recommendation.layers.map((layer) => (
          <LayerCard key={layer.role} layer={layer} />
        ))}
      </div>

      <div className="flex gap-4 pt-2">
        <Link
          href="/questionnaire"
          className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          Start over
        </Link>
        <Link
          href="/history"
          className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          View history
        </Link>
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
