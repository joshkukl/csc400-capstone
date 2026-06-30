"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LayerResult } from "@/types/recommend";

type SavedRecommendation = {
  id: string;
  title: string;
  summary: string;
  projectType: string;
  createdAt: string;
  resultJson: string;
};

function HistoryCard({ rec }: { rec: SavedRecommendation }) {
  const layers = JSON.parse(rec.resultJson) as LayerResult[];
  const date = new Date(rec.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-foreground/10 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-foreground/40">{date}</p>
          <p className="mt-1 text-lg font-semibold">{rec.title}</p>
          <p className="mt-1 text-sm text-foreground/50">{rec.summary}</p>
        </div>
        <span className="shrink-0 rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/50 capitalize">
          {rec.projectType}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {layers.map((layer) => (
          <span
            key={layer.role}
            className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium"
          >
            {layer.primary.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const [recommendations, setRecommendations] = useState<SavedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/recommendations", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          setError("You need to be logged in to view your history.");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setRecommendations(data.recommendations);
      })
      .catch(() => setError("Failed to load history."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="flex flex-1 flex-col">
      <nav className="border-b border-foreground/10 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          StackRec
        </Link>
      </nav>

      <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your recommendations</h1>
            <p className="mt-1 text-sm text-foreground/50">
              Every stack recommendation you've generated.
            </p>
          </div>
          <Link
            href="/questionnaire"
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          >
            New
          </Link>
        </div>

        {loading && (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-36 animate-pulse rounded-2xl bg-foreground/5" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-foreground/10 p-8 text-center">
            <p className="text-sm text-foreground/50">{error}</p>
            {error.includes("logged in") && (
              <Link
                href="/login?redirect=/history"
                className="mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            )}
          </div>
        )}

        {!loading && !error && recommendations.length === 0 && (
          <div className="rounded-2xl border border-foreground/10 p-8 text-center">
            <p className="text-foreground/50">No recommendations yet.</p>
            <Link
              href="/questionnaire"
              className="mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline"
            >
              Get your first recommendation
            </Link>
          </div>
        )}

        {!loading && !error && recommendations.length > 0 && (
          <div className="flex flex-col gap-4">
            {recommendations.map((rec) => (
              <HistoryCard key={rec.id} rec={rec} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
