import type { FormData } from "@/types/questionnaire";
import type { LayerResult, Recommendation, StackItem } from "@/types/recommend";
import { CANDIDATES, type Candidate } from "@/constants/candidates";

const FIELDS = [
  "projectType", "audience", "languagePreference",
  "userLoad", "realTime", "dataNeed",
  "timeline", "experience", "priority",
] as const satisfies readonly (keyof FormData)[];

const MAX_SCORE = FIELDS.length * 10;

function scoreCandidate(candidate: Candidate, data: FormData): number {
  return FIELDS.reduce((total, field) => {
    const weights = candidate.scores[field];
    return total + (weights?.[data[field]] ?? 5);
  }, 0);
}

function resolveLayer(
  role: Candidate["role"],
  data: FormData,
  topN = 3,
  filter?: (name: string) => boolean,
): LayerResult | null {
  const scored = CANDIDATES.filter((c) => c.role === role && (!filter || filter(c.name)))
    .map((c) => ({ candidate: c, score: scoreCandidate(c, data) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  if (scored.length === 0) return null;

  const toStackItem = ({
    candidate,
    score,
  }: (typeof scored)[number]): StackItem => ({
    role: candidate.role,
    name: candidate.name,
    rationale: candidate.rationale,
    confidence: Math.round((score / MAX_SCORE) * 100),
  });

  return {
    role,
    primary: toStackItem(scored[0]),
    alternatives: scored.slice(1).map(toStackItem),
  };
}

const NODE_BACKENDS = new Set(["Express", "Fastify", "Hono"]);
const JS_FULLSTACKS = new Set(["Next.js", "SvelteKit", "Vue + Nuxt"]);

function realtimeFilter(
  name: string,
  backendName: string | null,
  databaseName: string,
  frontendName: string,
  isFullstack: boolean,
): boolean {
  if (name === "Django Channels") return backendName === "Django";
  if (name === "Supabase Realtime") return databaseName === "Supabase";
  if (name === "Socket.io") {
    return (
      (backendName !== null && NODE_BACKENDS.has(backendName)) ||
      (isFullstack && JS_FULLSTACKS.has(frontendName))
    );
  }
  return true;
}

export function recommend(data: FormData): Recommendation {
  const frontend = resolveLayer("Frontend", data);
  const frontendHandlesBackend =
    CANDIDATES.find((c) => c.name === frontend?.primary.name)?.handlesBackend ??
    false;

  const backend = frontendHandlesBackend ? null : resolveLayer("Backend", data);
  const database = resolveLayer("Database", data);

  const frontendName = frontend?.primary.name ?? "";
  const backendName = backend?.primary.name ?? null;
  const databaseName = database?.primary.name ?? "";

  const layers: LayerResult[] = [
    frontend && {
      ...frontend,
      primary: {
        ...frontend.primary,
        role: frontendHandlesBackend ? "Full-Stack" : "Frontend",
      },
    },
    backend,
    database,
    data.realTime === "yes"
      ? resolveLayer("Realtime", data, 3, (name) =>
          realtimeFilter(name, backendName, databaseName, frontendName, frontendHandlesBackend),
        )
      : null,
    resolveLayer("Hosting", data),
  ].filter((l): l is LayerResult => l !== null);

  const stack = layers.map((l) => l.primary);

  const priorityLabel: Record<string, string> = {
    speed: "optimized for speed to market",
    performance: "optimized for performance and scale",
    cost: "optimized to minimize cost",
    dx: "optimized for developer experience",
  };

  const title = stack
    .slice(0, 2)
    .map((s) => s.name)
    .join(" + ");

  const summary = `A ${data.projectType} stack ${priorityLabel[data.priority] ?? ""}: ${stack.map((s) => s.name).join(", ")}.`;

  return { title, summary, stack, layers };
}
