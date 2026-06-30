import type { FormData } from "@/types/questionnaire";
import type { Recommendation, Runtime, StackItem } from "@/types/recommend";

function resolveRuntime(data: FormData): Runtime {
  const map: Partial<Record<string, Runtime>> = {
    js: "typescript",
    python: "python",
    go: "go",
    java: "java",
    dotnet: "dotnet",
    ruby: "ruby",
    rust: "rust",
  };

  if (data.languagePreference !== "none" && map[data.languagePreference]) {
    return map[data.languagePreference]!;
  }

  switch (data.projectType) {
    case "game":
      return "csharp";
    case "cli":
      return "go";
    case "api":
      return data.priority === "performance" ? "go" : "typescript";
    default:
      return "typescript";
  }
}

function isFullstackNext(data: FormData, runtime: Runtime): boolean {
  return (
    runtime === "typescript" &&
    ["web", "internal"].includes(data.projectType) &&
    (data.timeline === "sprint" ||
      data.experience === "beginner" ||
      data.audience === "internal")
  );
}

function resolveFrontend(data: FormData, runtime: Runtime): StackItem | null {
  if (isFullstackNext(data, runtime)) {
    return {
      role: "Frontend / Fullstack",
      name: "Next.js",
      rationale:
        "Full-stack React framework that handles routing, SSR, and API routes in one — fastest path to a working product.",
    };
  }

  switch (data.projectType) {
    case "api":
    case "cli":
      return null;

    case "mobile":
      return runtime === "typescript"
        ? {
            role: "Mobile",
            name: "React Native (Expo)",
            rationale:
              "Cross-platform iOS and Android with your TypeScript preference. Expo removes most native toolchain friction.",
          }
        : {
            role: "Mobile",
            name: "Flutter",
            rationale:
              "Cross-platform mobile with expressive UI and strong performance on both platforms.",
          };

    case "desktop":
      if (runtime === "typescript") {
        return {
          role: "Desktop",
          name: "Tauri + React",
          rationale:
            "Lightweight desktop app using web tech. Far smaller bundles than Electron.",
        };
      }
      if (runtime === "dotnet") {
        return {
          role: "Desktop",
          name: ".NET MAUI",
          rationale: "Native cross-platform UI framework for the .NET ecosystem.",
        };
      }
      return {
        role: "Desktop",
        name: "Tauri",
        rationale: "Lightweight cross-platform desktop with a Rust core.",
      };

    case "game":
      return {
        role: "Game Engine",
        name: "Unity (C#)",
        rationale:
          "Industry-standard engine with a large asset store and cross-platform export.",
      };

    case "extension":
      return {
        role: "Extension",
        name: "Vanilla JS + Vite",
        rationale:
          "Browser extensions have minimal framework needs. Vite handles bundling and hot reload cleanly.",
      };

    default:
      return {
        role: "Frontend",
        name: "React + Vite",
        rationale:
          "Flexible SPA setup with fast builds. Pairs cleanly with any backend API.",
      };
  }
}

function resolveBackend(data: FormData, runtime: Runtime): StackItem | null {
  if (isFullstackNext(data, runtime)) return null;
  if (data.projectType === "game") return null;
  if (data.projectType === "extension") return null;

  switch (runtime) {
    case "typescript":
      return {
        role: "Backend",
        name: data.priority === "performance" ? "Fastify" : "Express",
        rationale:
          data.priority === "performance"
            ? "Fastify is the fastest Node.js framework with low overhead and a strong plugin system."
            : "Express is battle-tested with the largest Node.js middleware ecosystem.",
      };

    case "python":
      return {
        role: "Backend",
        name:
          data.experience === "beginner" || data.timeline === "sprint"
            ? "Django"
            : "FastAPI",
        rationale:
          data.experience === "beginner" || data.timeline === "sprint"
            ? "Django is batteries-included — ORM, admin panel, and auth are built in."
            : "FastAPI is high-performance with automatic OpenAPI docs and native async support.",
      };

    case "go":
      return {
        role: "Backend",
        name: "Gin",
        rationale:
          "Fast, minimal Go web framework with good middleware support and low memory footprint.",
      };

    case "java":
      return {
        role: "Backend",
        name: "Spring Boot",
        rationale:
          "The de facto Java web framework with a vast ecosystem and strong enterprise adoption.",
      };

    case "dotnet":
      return {
        role: "Backend",
        name: "ASP.NET Core",
        rationale:
          "High-performance, cross-platform .NET web framework with excellent tooling.",
      };

    case "ruby":
      return {
        role: "Backend",
        name: "Ruby on Rails",
        rationale:
          "Convention-over-configuration framework built for developer productivity.",
      };

    case "rust":
      return {
        role: "Backend",
        name: "Axum",
        rationale:
          "Ergonomic, fast Rust web framework built on Tokio's async runtime.",
      };

    default:
      return {
        role: "Backend",
        name: "Express",
        rationale: "Widely supported Node.js framework.",
      };
  }
}

function resolveDatabase(data: FormData): StackItem {
  if (data.dataNeed === "document") {
    return {
      role: "Database",
      name: "MongoDB",
      rationale:
        "Document-oriented storage suits unstructured or flexible schemas without a fixed table structure.",
    };
  }

  if (data.dataNeed === "analytics") {
    return {
      role: "Database",
      name: data.userLoad === "large" ? "ClickHouse" : "PostgreSQL",
      rationale:
        data.userLoad === "large"
          ? "ClickHouse handles massive analytical workloads with columnar storage and fast aggregations."
          : "PostgreSQL with proper indexing handles most analytical needs without extra infrastructure.",
    };
  }

  if (data.userLoad === "tiny" && data.priority === "cost") {
    return {
      role: "Database",
      name: "SQLite",
      rationale:
        "Zero-infrastructure database that is free, embedded, and sufficient for small user bases.",
    };
  }

  return {
    role: "Database",
    name: "PostgreSQL",
    rationale:
      "Reliable, full-featured relational database that scales well and is supported across all major frameworks.",
  };
}

function resolveRealtime(data: FormData, runtime: Runtime): StackItem | null {
  if (data.realTime !== "yes") return null;

  if (runtime === "typescript") {
    return {
      role: "Real-time",
      name: "Socket.io",
      rationale:
        "WebSocket library with automatic fallback, rooms, and namespacing built in.",
    };
  }

  if (runtime === "python") {
    return {
      role: "Real-time",
      name: "Django Channels",
      rationale: "Adds WebSocket support to Django with async consumers.",
    };
  }

  return {
    role: "Real-time",
    name: "WebSockets (native)",
    rationale:
      "Native WebSocket support avoids extra dependencies and is sufficient for most real-time use cases.",
  };
}

function resolveHosting(data: FormData): StackItem {
  if (data.userLoad === "large") {
    return {
      role: "Hosting",
      name: "AWS / GCP",
      rationale:
        "Full cloud platforms are needed at million-user scale for auto-scaling, global CDN, and managed services.",
    };
  }

  if (data.experience === "beginner" || data.timeline === "sprint") {
    return {
      role: "Hosting",
      name: "Vercel",
      rationale:
        "Zero-config deployment with automatic previews. Fastest path to production, especially for Next.js.",
    };
  }

  if (data.priority === "cost" && data.userLoad === "tiny") {
    return {
      role: "Hosting",
      name: "Fly.io",
      rationale:
        "Low-cost managed hosting with a generous free tier for small projects.",
    };
  }

  return {
    role: "Hosting",
    name: "Render",
    rationale:
      "Managed cloud platform with simple deploys, built-in databases, and reasonable pricing for most projects.",
  };
}

export function recommend(data: FormData): Recommendation {
  const runtime = resolveRuntime(data);

  const stack = [
    resolveFrontend(data, runtime),
    resolveBackend(data, runtime),
    resolveDatabase(data),
    resolveRealtime(data, runtime),
    resolveHosting(data),
  ].filter((item): item is StackItem => item !== null);

  const topTech = stack
    .slice(0, 2)
    .map((s) => s.name)
    .join(" + ");

  const priorityLabel: Record<string, string> = {
    speed: "optimized for speed to market",
    performance: "optimized for performance and scale",
    cost: "optimized to minimize cost",
    dx: "optimized for developer experience",
  };

  const summary = `A ${data.projectType} stack ${priorityLabel[data.priority] ?? ""}: ${stack.map((s) => s.name).join(", ")}.`;

  return { title: topTech, summary, stack };
}