"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { LayerResult } from "@/types/recommend";

type SavedRecommendation = {
  id: string;
  title: string;
  summary: string;
  projectType: string;
  createdAt: string;
  resultJson: string;
};

function resultsUrl(rec: SavedRecommendation): string {
  const layers = JSON.parse(rec.resultJson) as LayerResult[];
  const recommendation = {
    title: rec.title,
    summary: rec.summary,
    layers,
    stack: layers.map((l) => l.primary),
  };
  return `/results?data=${encodeURIComponent(JSON.stringify(recommendation))}`;
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3.5h10" />
      <path d="M5.5 3.5V2.5h3v1" />
      <path d="M4 3.5l.7 8h4.6l.7-8" />
    </svg>
  );
}

function HistoryCard({
  rec,
  compareMode,
  selected,
  onToggle,
  onDelete,
}: {
  rec: SavedRecommendation;
  compareMode: boolean;
  selected: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const layers = JSON.parse(rec.resultJson) as LayerResult[];
  const date = new Date(rec.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const chips = (
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
  );

  if (compareMode) {
    return (
      <div
        className={`cursor-pointer rounded-2xl border p-6 transition-colors ${
          selected
            ? "border-foreground/40 bg-foreground/5"
            : "border-foreground/10 hover:border-foreground/20"
        }`}
        onClick={() => onToggle(rec.id)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                selected ? "border-foreground bg-foreground" : "border-foreground/30"
              }`}
            >
              {selected && (
                <span className="text-[10px] font-bold text-background">✓</span>
              )}
            </div>
            <div>
              <p className="text-xs text-foreground/40">{date}</p>
              <p className="mt-1 text-lg font-semibold">{rec.title}</p>
              <p className="mt-1 text-sm text-foreground/50">{rec.summary}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-foreground/10 px-3 py-1 text-xs capitalize text-foreground/50">
            {rec.projectType}
          </span>
        </div>
        {chips}
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-foreground/10 p-6 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.02]"
      onClick={() => router.push(resultsUrl(rec))}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-foreground/40">{date}</p>
          <p className="mt-1 text-lg font-semibold">{rec.title}</p>
          <p className="mt-1 text-sm text-foreground/50">{rec.summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs capitalize text-foreground/50">
            {rec.projectType}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(rec.id);
            }}
            className="rounded-lg p-1.5 text-foreground/30 opacity-0 transition-all hover:bg-foreground/8 hover:text-foreground/60 group-hover:opacity-100"
            aria-label="Delete recommendation"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
      {chips}
    </div>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<SavedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [clearConfirm, setClearConfirm] = useState(false);

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

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
          ? [...prev, id]
          : prev,
    );
  }

  function exitCompareMode() {
    setCompareMode(false);
    setSelectedIds([]);
  }

  function goCompare() {
    if (selectedIds.length === 2) {
      router.push(`/compare?a=${selectedIds[0]}&b=${selectedIds[1]}`);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/recommendations/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  async function handleClearAll() {
    if (!clearConfirm) {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 3000);
      return;
    }
    await fetch("/api/recommendations", {
      method: "DELETE",
      credentials: "include",
    });
    setRecommendations([]);
    setClearConfirm(false);
  }

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
            <h1 className="text-2xl font-semibold tracking-tight">
              Your recommendations
            </h1>
            <p className="mt-1 text-sm text-foreground/50">
              {compareMode
                ? `Select two to compare (${selectedIds.length}/2 selected)`
                : "Every stack recommendation you've generated."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {compareMode ? (
              <>
                <button
                  onClick={exitCompareMode}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-5 text-sm font-medium transition-colors hover:bg-foreground/5"
                >
                  Cancel
                </button>
                <button
                  onClick={goCompare}
                  disabled={selectedIds.length < 2}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Compare
                </button>
              </>
            ) : (
              <>
                {recommendations.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className={`inline-flex h-10 items-center justify-center rounded-full border px-5 text-sm font-medium transition-colors ${
                      clearConfirm
                        ? "border-red-500/40 text-red-500 hover:bg-red-500/5"
                        : "border-foreground/15 text-foreground/50 hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    {clearConfirm ? "Confirm clear?" : "Clear all"}
                  </button>
                )}
                {recommendations.length >= 2 && (
                  <button
                    onClick={() => setCompareMode(true)}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/15 px-5 text-sm font-medium transition-colors hover:bg-foreground/5"
                  >
                    Compare
                  </button>
                )}
                <Link
                  href="/questionnaire"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
                >
                  New
                </Link>
              </>
            )}
          </div>
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
              <HistoryCard
                key={rec.id}
                rec={rec}
                compareMode={compareMode}
                selected={selectedIds.includes(rec.id)}
                onToggle={toggleSelect}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
