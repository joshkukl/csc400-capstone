"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Recommendation } from "@/types/recommendation";

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
        <h1 className="text-3xl font-semibold tracking-tight">
          {recommendation.title}
        </h1>
        <p className="mt-2 text-sm text-foreground/50">{recommendation.summary}</p>
      </div>

      <div className="flex flex-col gap-4">
        {recommendation.stack.map((item) => (
          <div
            key={item.role}
            className="rounded-2xl border border-foreground/10 p-6"
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-foreground/40">
              {item.role}
            </p>
            <p className="text-lg font-semibold">{item.name}</p>
            <p className="mt-2 text-sm text-foreground/60">{item.rationale}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-2">
        <Link
          href="/questionnaire"
          className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          Start over
        </Link>
      </div>
    </div>
  );
}

function ResultsFallback() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-2xl bg-foreground/5" />
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
