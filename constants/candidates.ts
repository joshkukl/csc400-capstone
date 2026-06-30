import type { FormData } from "@/types/questionnaire";

type ScoreMap = Partial<Record<string, number>>;

export type Candidate = {
  name: string;
  role: "Frontend" | "Backend" | "Database" | "Realtime" | "Hosting";
  handlesBackend?: boolean;
  rationale: string;
  scores: Partial<Record<keyof FormData, ScoreMap>>;
};

export const CANDIDATES: Candidate[] = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  {
    name: "Next.js",
    role: "Frontend",
    handlesBackend: true,
    rationale:
      "Full-stack React framework with SSR, API routes, and file-based routing. Fastest path to a production-ready web app.",
    scores: {
      projectType:        { web: 10, internal: 9, api: 3, mobile: 0, desktop: 0, game: 0, cli: 0, extension: 2 },
      audience:           { b2c: 8, b2b: 8, internal: 10, mixed: 8 },
      languagePreference: { js: 10, none: 8, python: 1, go: 1, java: 1, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 10, small: 9, medium: 7, large: 3 },
      realTime:           { yes: 4, no: 9 },
      dataNeed:           { simple: 10, relational: 8, analytics: 5, document: 7 },
      timeline:           { sprint: 10, short: 9, medium: 7, long: 5 },
      experience:         { beginner: 10, intermediate: 8, advanced: 5 },
      priority:           { speed: 10, dx: 9, cost: 7, performance: 4 },
    },
  },
  {
    name: "React + Vite",
    role: "Frontend",
    rationale:
      "Flexible SPA setup with fast builds. Pairs cleanly with any backend and gives full control over architecture.",
    scores: {
      projectType:        { web: 10, internal: 7, api: 0, mobile: 2, desktop: 3, game: 0, cli: 0, extension: 3 },
      audience:           { b2c: 9, b2b: 8, internal: 7, mixed: 9 },
      languagePreference: { js: 10, none: 7, python: 4, go: 4, java: 4, dotnet: 4, ruby: 4, rust: 4 },
      userLoad:           { tiny: 7, small: 8, medium: 10, large: 8 },
      realTime:           { yes: 8, no: 8 },
      dataNeed:           { simple: 8, relational: 8, analytics: 7, document: 8 },
      timeline:           { sprint: 5, short: 8, medium: 10, long: 9 },
      experience:         { beginner: 5, intermediate: 10, advanced: 9 },
      priority:           { speed: 6, dx: 10, performance: 8, cost: 7 },
    },
  },
  {
    name: "SvelteKit",
    role: "Frontend",
    handlesBackend: true,
    rationale:
      "Full-stack framework with a minimal runtime and highly readable component syntax. Excellent performance out of the box.",
    scores: {
      projectType:        { web: 10, internal: 8, api: 2, mobile: 0, desktop: 1, game: 0, cli: 0, extension: 2 },
      audience:           { b2c: 9, b2b: 7, internal: 8, mixed: 8 },
      languagePreference: { js: 10, none: 7, python: 2, go: 2, java: 2, dotnet: 2, ruby: 2, rust: 2 },
      userLoad:           { tiny: 9, small: 10, medium: 8, large: 5 },
      realTime:           { yes: 6, no: 9 },
      dataNeed:           { simple: 9, relational: 7, analytics: 5, document: 7 },
      timeline:           { sprint: 7, short: 9, medium: 9, long: 7 },
      experience:         { beginner: 5, intermediate: 9, advanced: 10 },
      priority:           { speed: 8, dx: 10, performance: 9, cost: 8 },
    },
  },
  {
    name: "Vue + Nuxt",
    role: "Frontend",
    handlesBackend: true,
    rationale:
      "Full-stack Vue framework with a gentle learning curve and strong conventions. Popular in B2B and international markets.",
    scores: {
      projectType:        { web: 10, internal: 8, api: 2, mobile: 1, desktop: 1, game: 0, cli: 0, extension: 3 },
      audience:           { b2c: 8, b2b: 8, internal: 8, mixed: 8 },
      languagePreference: { js: 10, none: 7, python: 2, go: 2, java: 2, dotnet: 2, ruby: 2, rust: 2 },
      userLoad:           { tiny: 8, small: 9, medium: 8, large: 5 },
      realTime:           { yes: 6, no: 8 },
      dataNeed:           { simple: 9, relational: 7, analytics: 5, document: 7 },
      timeline:           { sprint: 7, short: 8, medium: 9, long: 7 },
      experience:         { beginner: 8, intermediate: 9, advanced: 7 },
      priority:           { speed: 8, dx: 9, performance: 7, cost: 8 },
    },
  },
  {
    name: "React Native (Expo)",
    role: "Frontend",
    rationale:
      "Cross-platform iOS and Android with a JavaScript codebase. Expo removes most native toolchain friction for fast iteration.",
    scores: {
      projectType:        { mobile: 10, web: 1, desktop: 1, game: 0, api: 0, internal: 0, cli: 0, extension: 0 },
      audience:           { b2c: 10, b2b: 7, internal: 4, mixed: 9 },
      languagePreference: { js: 10, none: 7, python: 1, go: 1, java: 2, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 8, small: 9, medium: 8, large: 6 },
      realTime:           { yes: 7, no: 8 },
      dataNeed:           { simple: 9, relational: 7, analytics: 4, document: 8 },
      timeline:           { sprint: 7, short: 9, medium: 9, long: 7 },
      experience:         { beginner: 7, intermediate: 10, advanced: 8 },
      priority:           { speed: 8, dx: 9, performance: 6, cost: 7 },
    },
  },
  {
    name: "Flutter",
    role: "Frontend",
    rationale:
      "Cross-platform mobile and desktop with expressive UI widgets and strong performance. Uses Dart, which has a gentle learning curve.",
    scores: {
      projectType:        { mobile: 10, desktop: 7, web: 5, game: 3, api: 0, internal: 3, cli: 0, extension: 0 },
      audience:           { b2c: 10, b2b: 7, internal: 5, mixed: 9 },
      languagePreference: { js: 2, none: 8, python: 3, go: 3, java: 3, dotnet: 3, ruby: 2, rust: 3 },
      userLoad:           { tiny: 8, small: 9, medium: 8, large: 6 },
      realTime:           { yes: 7, no: 8 },
      dataNeed:           { simple: 9, relational: 7, analytics: 4, document: 8 },
      timeline:           { sprint: 5, short: 8, medium: 10, long: 9 },
      experience:         { beginner: 5, intermediate: 9, advanced: 9 },
      priority:           { speed: 6, dx: 8, performance: 9, cost: 7 },
    },
  },
  {
    name: "Tauri + React",
    role: "Frontend",
    rationale:
      "Lightweight desktop app using web tech with a Rust core. Far smaller bundles than Electron with better system access.",
    scores: {
      projectType:        { desktop: 10, web: 3, mobile: 0, game: 2, api: 0, internal: 5, cli: 3, extension: 0 },
      audience:           { b2c: 8, b2b: 8, internal: 9, mixed: 8 },
      languagePreference: { js: 10, rust: 9, none: 7, python: 2, go: 2, java: 2, dotnet: 2, ruby: 2 },
      userLoad:           { tiny: 9, small: 8, medium: 6, large: 3 },
      realTime:           { yes: 5, no: 8 },
      dataNeed:           { simple: 9, relational: 7, analytics: 5, document: 7 },
      timeline:           { sprint: 4, short: 7, medium: 9, long: 10 },
      experience:         { beginner: 4, intermediate: 8, advanced: 10 },
      priority:           { speed: 5, dx: 8, performance: 10, cost: 9 },
    },
  },
  {
    name: ".NET MAUI",
    role: "Frontend",
    rationale:
      "Microsoft's cross-platform UI framework for native desktop and mobile apps using C# and .NET.",
    scores: {
      projectType:        { desktop: 10, mobile: 8, web: 2, game: 2, api: 0, internal: 7, cli: 3, extension: 0 },
      audience:           { b2c: 7, b2b: 10, internal: 10, mixed: 8 },
      languagePreference: { dotnet: 10, none: 4, js: 1, python: 1, go: 1, java: 3, ruby: 1, rust: 1 },
      userLoad:           { tiny: 7, small: 8, medium: 8, large: 7 },
      realTime:           { yes: 6, no: 8 },
      dataNeed:           { simple: 8, relational: 9, analytics: 8, document: 6 },
      timeline:           { sprint: 4, short: 6, medium: 9, long: 10 },
      experience:         { beginner: 4, intermediate: 8, advanced: 10 },
      priority:           { speed: 4, dx: 7, performance: 8, cost: 6 },
    },
  },
  {
    name: "Unity",
    role: "Frontend",
    rationale:
      "Industry-standard game engine with C# scripting, a large asset store, and cross-platform export to mobile, desktop, and web.",
    scores: {
      projectType:        { game: 10, desktop: 5, mobile: 6, web: 2, api: 0, internal: 0, cli: 0, extension: 0 },
      audience:           { b2c: 10, b2b: 4, internal: 2, mixed: 7 },
      languagePreference: { dotnet: 10, none: 7, js: 2, python: 2, go: 2, java: 2, ruby: 1, rust: 2 },
      userLoad:           { tiny: 6, small: 7, medium: 8, large: 9 },
      realTime:           { yes: 8, no: 7 },
      dataNeed:           { simple: 8, relational: 6, analytics: 4, document: 7 },
      timeline:           { sprint: 2, short: 5, medium: 8, long: 10 },
      experience:         { beginner: 4, intermediate: 8, advanced: 10 },
      priority:           { speed: 3, dx: 5, performance: 10, cost: 5 },
    },
  },
  {
    name: "Godot",
    role: "Frontend",
    rationale:
      "Free, open-source game engine with GDScript (Python-like) or C# scripting. Lightweight and excellent for 2D games.",
    scores: {
      projectType:        { game: 10, desktop: 6, mobile: 6, web: 4, api: 0, internal: 0, cli: 0, extension: 0 },
      audience:           { b2c: 10, b2b: 3, internal: 2, mixed: 7 },
      languagePreference: { none: 9, python: 6, js: 2, go: 2, java: 2, dotnet: 3, ruby: 2, rust: 3 },
      userLoad:           { tiny: 7, small: 8, medium: 8, large: 7 },
      realTime:           { yes: 7, no: 8 },
      dataNeed:           { simple: 8, relational: 6, analytics: 3, document: 7 },
      timeline:           { sprint: 3, short: 6, medium: 9, long: 10 },
      experience:         { beginner: 7, intermediate: 9, advanced: 8 },
      priority:           { speed: 4, dx: 8, performance: 8, cost: 10 },
    },
  },
  {
    name: "Vanilla JS + Vite",
    role: "Frontend",
    rationale:
      "Zero-framework approach with fast bundling. Ideal for browser extensions and small tools where framework overhead isn't justified.",
    scores: {
      projectType:        { extension: 10, web: 5, internal: 5, cli: 2, mobile: 0, desktop: 1, game: 0, api: 0 },
      audience:           { b2c: 6, b2b: 6, internal: 8, mixed: 6 },
      languagePreference: { js: 10, none: 6, python: 2, go: 2, java: 2, dotnet: 2, ruby: 2, rust: 2 },
      userLoad:           { tiny: 10, small: 8, medium: 5, large: 2 },
      realTime:           { yes: 5, no: 8 },
      dataNeed:           { simple: 10, relational: 5, analytics: 3, document: 6 },
      timeline:           { sprint: 9, short: 8, medium: 6, long: 4 },
      experience:         { beginner: 8, intermediate: 7, advanced: 5 },
      priority:           { speed: 9, dx: 5, performance: 7, cost: 10 },
    },
  },

  // ── Backend ───────────────────────────────────────────────────────────────
  {
    name: "Express",
    role: "Backend",
    rationale:
      "The most widely-used Node.js framework. Minimal, flexible, and has the largest middleware ecosystem.",
    scores: {
      projectType:        { api: 10, web: 8, internal: 8, mobile: 7, cli: 2, desktop: 2, game: 3, extension: 5 },
      audience:           { b2c: 7, b2b: 8, internal: 8, mixed: 7 },
      languagePreference: { js: 10, none: 7, python: 1, go: 1, java: 1, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 9, small: 8, medium: 7, large: 4 },
      realTime:           { yes: 7, no: 8 },
      dataNeed:           { simple: 9, relational: 8, analytics: 6, document: 8 },
      timeline:           { sprint: 8, short: 8, medium: 8, long: 7 },
      experience:         { beginner: 8, intermediate: 9, advanced: 7 },
      priority:           { speed: 8, dx: 8, performance: 5, cost: 8 },
    },
  },
  {
    name: "Fastify",
    role: "Backend",
    rationale:
      "The fastest Node.js framework. Schema-based validation, low overhead, and a strong plugin system for high-throughput APIs.",
    scores: {
      projectType:        { api: 10, web: 7, internal: 7, mobile: 7, cli: 2, desktop: 2, game: 3, extension: 5 },
      audience:           { b2c: 7, b2b: 9, internal: 8, mixed: 8 },
      languagePreference: { js: 10, none: 6, python: 1, go: 1, java: 1, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 7, small: 8, medium: 10, large: 8 },
      realTime:           { yes: 7, no: 8 },
      dataNeed:           { simple: 8, relational: 8, analytics: 7, document: 8 },
      timeline:           { sprint: 5, short: 7, medium: 9, long: 9 },
      experience:         { beginner: 4, intermediate: 9, advanced: 10 },
      priority:           { speed: 6, dx: 7, performance: 10, cost: 7 },
    },
  },
  {
    name: "Hono",
    role: "Backend",
    rationale:
      "Ultra-fast, edge-compatible TypeScript framework. Runs on Cloudflare Workers, Bun, Deno, and Node.js.",
    scores: {
      projectType:        { api: 10, web: 7, internal: 6, mobile: 5, cli: 2, desktop: 2, game: 2, extension: 6 },
      audience:           { b2c: 7, b2b: 8, internal: 7, mixed: 7 },
      languagePreference: { js: 10, none: 6, python: 1, go: 1, java: 1, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 8, small: 8, medium: 9, large: 7 },
      realTime:           { yes: 6, no: 8 },
      dataNeed:           { simple: 8, relational: 7, analytics: 5, document: 7 },
      timeline:           { sprint: 7, short: 8, medium: 8, long: 7 },
      experience:         { beginner: 5, intermediate: 8, advanced: 10 },
      priority:           { speed: 7, dx: 9, performance: 9, cost: 7 },
    },
  },
  {
    name: "Django",
    role: "Backend",
    rationale:
      "Batteries-included Python framework with a built-in ORM, admin panel, and auth. Ideal for moving fast with Python.",
    scores: {
      projectType:        { api: 8, web: 9, internal: 9, mobile: 7, cli: 3, desktop: 3, game: 2, extension: 3 },
      audience:           { b2c: 8, b2b: 9, internal: 9, mixed: 8 },
      languagePreference: { python: 10, none: 5, js: 1, go: 1, java: 1, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 8, small: 8, medium: 7, large: 4 },
      realTime:           { yes: 5, no: 9 },
      dataNeed:           { simple: 9, relational: 10, analytics: 7, document: 5 },
      timeline:           { sprint: 10, short: 9, medium: 7, long: 5 },
      experience:         { beginner: 10, intermediate: 8, advanced: 6 },
      priority:           { speed: 10, dx: 8, performance: 4, cost: 8 },
    },
  },
  {
    name: "FastAPI",
    role: "Backend",
    rationale:
      "High-performance async Python framework with automatic OpenAPI documentation and strong type safety via Pydantic.",
    scores: {
      projectType:        { api: 10, web: 6, internal: 7, mobile: 7, cli: 3, desktop: 2, game: 2, extension: 3 },
      audience:           { b2c: 7, b2b: 9, internal: 8, mixed: 8 },
      languagePreference: { python: 10, none: 5, js: 1, go: 1, java: 1, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 7, small: 8, medium: 9, large: 7 },
      realTime:           { yes: 6, no: 8 },
      dataNeed:           { simple: 8, relational: 8, analytics: 8, document: 7 },
      timeline:           { sprint: 6, short: 8, medium: 9, long: 8 },
      experience:         { beginner: 5, intermediate: 9, advanced: 10 },
      priority:           { speed: 6, dx: 8, performance: 10, cost: 7 },
    },
  },
  {
    name: "Gin",
    role: "Backend",
    rationale:
      "Fast, minimal Go web framework with a low memory footprint and excellent concurrency for high-throughput APIs.",
    scores: {
      projectType:        { api: 10, web: 6, internal: 7, mobile: 7, cli: 5, desktop: 3, game: 4, extension: 3 },
      audience:           { b2c: 6, b2b: 9, internal: 8, mixed: 7 },
      languagePreference: { go: 10, none: 5, js: 1, python: 1, java: 1, dotnet: 1, ruby: 1, rust: 2 },
      userLoad:           { tiny: 6, small: 8, medium: 10, large: 10 },
      realTime:           { yes: 8, no: 7 },
      dataNeed:           { simple: 8, relational: 8, analytics: 7, document: 7 },
      timeline:           { sprint: 4, short: 6, medium: 9, long: 9 },
      experience:         { beginner: 3, intermediate: 8, advanced: 10 },
      priority:           { speed: 5, dx: 5, performance: 10, cost: 8 },
    },
  },
  {
    name: "Spring Boot",
    role: "Backend",
    rationale:
      "The de facto Java framework with extensive ecosystem support, dependency injection, and strong enterprise adoption.",
    scores: {
      projectType:        { api: 10, web: 7, internal: 9, mobile: 7, cli: 3, desktop: 4, game: 3, extension: 2 },
      audience:           { b2c: 5, b2b: 10, internal: 10, mixed: 7 },
      languagePreference: { java: 10, none: 4, js: 1, python: 1, go: 1, dotnet: 3, ruby: 1, rust: 1 },
      userLoad:           { tiny: 4, small: 7, medium: 9, large: 10 },
      realTime:           { yes: 7, no: 7 },
      dataNeed:           { simple: 7, relational: 10, analytics: 9, document: 6 },
      timeline:           { sprint: 2, short: 5, medium: 8, long: 10 },
      experience:         { beginner: 2, intermediate: 7, advanced: 10 },
      priority:           { speed: 2, dx: 5, performance: 9, cost: 4 },
    },
  },
  {
    name: "ASP.NET Core",
    role: "Backend",
    rationale:
      "High-performance, cross-platform .NET framework with excellent tooling and deep enterprise integration.",
    scores: {
      projectType:        { api: 10, web: 8, internal: 9, mobile: 7, cli: 4, desktop: 5, game: 4, extension: 2 },
      audience:           { b2c: 5, b2b: 10, internal: 10, mixed: 7 },
      languagePreference: { dotnet: 10, none: 4, js: 1, python: 1, go: 1, java: 3, ruby: 1, rust: 1 },
      userLoad:           { tiny: 5, small: 7, medium: 9, large: 10 },
      realTime:           { yes: 7, no: 7 },
      dataNeed:           { simple: 7, relational: 10, analytics: 9, document: 6 },
      timeline:           { sprint: 3, short: 5, medium: 8, long: 10 },
      experience:         { beginner: 3, intermediate: 7, advanced: 10 },
      priority:           { speed: 3, dx: 6, performance: 10, cost: 4 },
    },
  },
  {
    name: "Ruby on Rails",
    role: "Backend",
    rationale:
      "Convention-over-configuration framework optimized for developer productivity. Generators, a mature ORM, and fast prototyping.",
    scores: {
      projectType:        { api: 8, web: 10, internal: 8, mobile: 6, cli: 2, desktop: 2, game: 1, extension: 2 },
      audience:           { b2c: 9, b2b: 7, internal: 7, mixed: 8 },
      languagePreference: { ruby: 10, none: 4, js: 1, python: 1, go: 1, java: 1, dotnet: 1, rust: 1 },
      userLoad:           { tiny: 8, small: 8, medium: 6, large: 3 },
      realTime:           { yes: 4, no: 9 },
      dataNeed:           { simple: 9, relational: 9, analytics: 5, document: 4 },
      timeline:           { sprint: 10, short: 9, medium: 7, long: 5 },
      experience:         { beginner: 9, intermediate: 8, advanced: 6 },
      priority:           { speed: 10, dx: 9, performance: 3, cost: 7 },
    },
  },
  {
    name: "Axum",
    role: "Backend",
    rationale:
      "Ergonomic, high-performance Rust web framework built on Tokio. Ideal for latency-sensitive systems with strong memory safety guarantees.",
    scores: {
      projectType:        { api: 10, web: 5, internal: 5, mobile: 5, cli: 7, desktop: 4, game: 4, extension: 3 },
      audience:           { b2c: 4, b2b: 8, internal: 7, mixed: 6 },
      languagePreference: { rust: 10, none: 4, js: 1, python: 1, go: 2, java: 1, dotnet: 1, ruby: 1 },
      userLoad:           { tiny: 5, small: 7, medium: 10, large: 10 },
      realTime:           { yes: 9, no: 7 },
      dataNeed:           { simple: 7, relational: 8, analytics: 7, document: 7 },
      timeline:           { sprint: 2, short: 4, medium: 7, long: 10 },
      experience:         { beginner: 1, intermediate: 5, advanced: 10 },
      priority:           { speed: 2, dx: 4, performance: 10, cost: 9 },
    },
  },

  // ── Database ──────────────────────────────────────────────────────────────
  {
    name: "PostgreSQL",
    role: "Database",
    rationale:
      "The most feature-complete open-source relational database. Scales well and is supported across every major framework.",
    scores: {
      projectType:        { web: 9, api: 10, internal: 9, mobile: 8, desktop: 6, game: 6, cli: 6, extension: 4 },
      audience:           { b2c: 8, b2b: 10, internal: 9, mixed: 9 },
      languagePreference: { js: 9, python: 9, go: 9, java: 9, dotnet: 9, ruby: 9, rust: 9, none: 9 },
      userLoad:           { tiny: 6, small: 9, medium: 10, large: 8 },
      realTime:           { yes: 7, no: 9 },
      dataNeed:           { simple: 8, relational: 10, analytics: 8, document: 4 },
      timeline:           { sprint: 6, short: 8, medium: 10, long: 10 },
      experience:         { beginner: 6, intermediate: 9, advanced: 10 },
      priority:           { speed: 6, dx: 7, performance: 9, cost: 6 },
    },
  },
  {
    name: "SQLite",
    role: "Database",
    rationale:
      "Zero-infrastructure embedded database. No server to manage, completely free, and sufficient for small user bases and local tools.",
    scores: {
      projectType:        { web: 7, api: 6, internal: 8, mobile: 8, desktop: 9, game: 7, cli: 9, extension: 7 },
      audience:           { b2c: 5, b2b: 4, internal: 9, mixed: 5 },
      languagePreference: { js: 8, python: 8, go: 8, java: 7, dotnet: 7, ruby: 8, rust: 8, none: 8 },
      userLoad:           { tiny: 10, small: 7, medium: 2, large: 0 },
      realTime:           { yes: 3, no: 9 },
      dataNeed:           { simple: 10, relational: 6, analytics: 2, document: 4 },
      timeline:           { sprint: 10, short: 8, medium: 5, long: 3 },
      experience:         { beginner: 10, intermediate: 7, advanced: 5 },
      priority:           { speed: 9, dx: 8, performance: 3, cost: 10 },
    },
  },
  {
    name: "MongoDB",
    role: "Database",
    rationale:
      "Document-oriented database with flexible schemas. Great for rapidly evolving data models and unstructured or nested content.",
    scores: {
      projectType:        { web: 8, api: 9, internal: 7, mobile: 8, desktop: 5, game: 7, cli: 5, extension: 5 },
      audience:           { b2c: 9, b2b: 7, internal: 6, mixed: 8 },
      languagePreference: { js: 10, python: 8, go: 7, java: 7, dotnet: 7, ruby: 7, rust: 7, none: 8 },
      userLoad:           { tiny: 7, small: 8, medium: 9, large: 8 },
      realTime:           { yes: 8, no: 7 },
      dataNeed:           { simple: 6, relational: 2, analytics: 5, document: 10 },
      timeline:           { sprint: 9, short: 8, medium: 7, long: 6 },
      experience:         { beginner: 9, intermediate: 8, advanced: 7 },
      priority:           { speed: 9, dx: 9, performance: 7, cost: 7 },
    },
  },
  {
    name: "MySQL",
    role: "Database",
    rationale:
      "Battle-tested relational database with wide hosting support and strong Java and Ruby on Rails ecosystem integration.",
    scores: {
      projectType:        { web: 9, api: 9, internal: 8, mobile: 7, desktop: 6, game: 6, cli: 5, extension: 4 },
      audience:           { b2c: 8, b2b: 9, internal: 8, mixed: 8 },
      languagePreference: { js: 7, python: 8, go: 7, java: 9, dotnet: 7, ruby: 9, rust: 7, none: 8 },
      userLoad:           { tiny: 6, small: 8, medium: 9, large: 7 },
      realTime:           { yes: 6, no: 8 },
      dataNeed:           { simple: 8, relational: 9, analytics: 6, document: 3 },
      timeline:           { sprint: 7, short: 8, medium: 9, long: 9 },
      experience:         { beginner: 7, intermediate: 9, advanced: 8 },
      priority:           { speed: 7, dx: 6, performance: 8, cost: 7 },
    },
  },
  {
    name: "ClickHouse",
    role: "Database",
    rationale:
      "Columnar OLAP database built for analytical queries at massive scale. Best-in-class aggregations over billions of rows.",
    scores: {
      projectType:        { web: 5, api: 7, internal: 8, mobile: 3, desktop: 4, game: 4, cli: 5, extension: 2 },
      audience:           { b2c: 5, b2b: 9, internal: 9, mixed: 7 },
      languagePreference: { js: 7, python: 8, go: 8, java: 8, dotnet: 7, ruby: 6, rust: 7, none: 7 },
      userLoad:           { tiny: 2, small: 4, medium: 8, large: 10 },
      realTime:           { yes: 4, no: 8 },
      dataNeed:           { simple: 2, relational: 4, analytics: 10, document: 3 },
      timeline:           { sprint: 2, short: 4, medium: 7, long: 10 },
      experience:         { beginner: 2, intermediate: 6, advanced: 10 },
      priority:           { speed: 2, dx: 3, performance: 10, cost: 4 },
    },
  },
  {
    name: "Supabase",
    role: "Database",
    rationale:
      "Hosted PostgreSQL with built-in auth, real-time subscriptions, and auto-generated APIs. Firebase alternative with SQL power.",
    scores: {
      projectType:        { web: 10, api: 8, internal: 8, mobile: 8, desktop: 3, game: 3, cli: 2, extension: 5 },
      audience:           { b2c: 10, b2b: 7, internal: 8, mixed: 9 },
      languagePreference: { js: 10, python: 6, go: 5, java: 4, dotnet: 4, ruby: 5, rust: 4, none: 8 },
      userLoad:           { tiny: 9, small: 9, medium: 7, large: 4 },
      realTime:           { yes: 10, no: 7 },
      dataNeed:           { simple: 10, relational: 8, analytics: 5, document: 5 },
      timeline:           { sprint: 10, short: 9, medium: 7, long: 5 },
      experience:         { beginner: 10, intermediate: 8, advanced: 5 },
      priority:           { speed: 10, dx: 10, performance: 5, cost: 7 },
    },
  },

  // ── Realtime ──────────────────────────────────────────────────────────────
  {
    name: "Socket.io",
    role: "Realtime",
    rationale:
      "The standard WebSocket library for Node.js. Automatic fallback, rooms, namespacing, and the largest tutorial ecosystem.",
    scores: {
      projectType:        { web: 10, api: 8, mobile: 7, internal: 8, desktop: 5, game: 8, cli: 2, extension: 4 },
      audience:           { b2c: 9, b2b: 8, internal: 8, mixed: 9 },
      languagePreference: { js: 10, none: 7, python: 2, go: 2, java: 2, dotnet: 2, ruby: 2, rust: 2 },
      userLoad:           { tiny: 8, small: 9, medium: 8, large: 5 },
      realTime:           { yes: 10, no: 0 },
      dataNeed:           { simple: 8, relational: 7, analytics: 5, document: 8 },
      timeline:           { sprint: 9, short: 9, medium: 7, long: 6 },
      experience:         { beginner: 8, intermediate: 9, advanced: 7 },
      priority:           { speed: 9, dx: 9, performance: 6, cost: 8 },
    },
  },
  {
    name: "Django Channels",
    role: "Realtime",
    rationale:
      "Adds WebSocket and async protocol support to Django via channel layers. Natural fit for any Python/Django stack.",
    scores: {
      projectType:        { web: 9, api: 7, mobile: 6, internal: 8, desktop: 3, game: 4, cli: 2, extension: 2 },
      audience:           { b2c: 7, b2b: 8, internal: 8, mixed: 7 },
      languagePreference: { python: 10, none: 4, js: 1, go: 1, java: 1, dotnet: 1, ruby: 1, rust: 1 },
      userLoad:           { tiny: 7, small: 8, medium: 7, large: 4 },
      realTime:           { yes: 10, no: 0 },
      dataNeed:           { simple: 8, relational: 8, analytics: 6, document: 5 },
      timeline:           { sprint: 6, short: 7, medium: 8, long: 7 },
      experience:         { beginner: 5, intermediate: 8, advanced: 9 },
      priority:           { speed: 6, dx: 7, performance: 6, cost: 7 },
    },
  },
  {
    name: "Ably",
    role: "Realtime",
    rationale:
      "Managed real-time messaging with SDKs for every language, a global edge network, and no infrastructure to manage.",
    scores: {
      projectType:        { web: 9, api: 7, mobile: 9, internal: 7, desktop: 4, game: 7, cli: 2, extension: 5 },
      audience:           { b2c: 10, b2b: 8, internal: 6, mixed: 9 },
      languagePreference: { js: 9, python: 8, go: 7, java: 7, dotnet: 7, ruby: 7, rust: 6, none: 9 },
      userLoad:           { tiny: 6, small: 7, medium: 9, large: 9 },
      realTime:           { yes: 10, no: 0 },
      dataNeed:           { simple: 8, relational: 6, analytics: 5, document: 8 },
      timeline:           { sprint: 10, short: 9, medium: 7, long: 5 },
      experience:         { beginner: 10, intermediate: 8, advanced: 6 },
      priority:           { speed: 10, dx: 9, performance: 8, cost: 3 },
    },
  },
  {
    name: "WebSockets (native)",
    role: "Realtime",
    rationale:
      "Protocol-level WebSockets without a library. No extra dependencies and full control — right for experienced teams.",
    scores: {
      projectType:        { web: 8, api: 9, mobile: 6, internal: 8, desktop: 4, game: 8, cli: 4, extension: 4 },
      audience:           { b2c: 6, b2b: 8, internal: 8, mixed: 7 },
      languagePreference: { go: 9, rust: 9, java: 8, dotnet: 8, python: 7, js: 6, ruby: 6, none: 6 },
      userLoad:           { tiny: 6, small: 7, medium: 9, large: 9 },
      realTime:           { yes: 10, no: 0 },
      dataNeed:           { simple: 7, relational: 6, analytics: 5, document: 7 },
      timeline:           { sprint: 3, short: 5, medium: 8, long: 10 },
      experience:         { beginner: 2, intermediate: 6, advanced: 10 },
      priority:           { speed: 3, dx: 3, performance: 10, cost: 9 },
    },
  },
  {
    name: "Supabase Realtime",
    role: "Realtime",
    rationale:
      "Real-time database change subscriptions built into Supabase. Zero setup if you're already using Supabase as your database.",
    scores: {
      projectType:        { web: 10, api: 7, mobile: 8, internal: 8, desktop: 3, game: 3, cli: 2, extension: 4 },
      audience:           { b2c: 10, b2b: 7, internal: 8, mixed: 9 },
      languagePreference: { js: 10, python: 5, go: 4, java: 4, dotnet: 4, ruby: 5, rust: 4, none: 8 },
      userLoad:           { tiny: 9, small: 9, medium: 7, large: 3 },
      realTime:           { yes: 10, no: 0 },
      dataNeed:           { simple: 10, relational: 8, analytics: 4, document: 5 },
      timeline:           { sprint: 10, short: 9, medium: 7, long: 5 },
      experience:         { beginner: 10, intermediate: 8, advanced: 5 },
      priority:           { speed: 10, dx: 10, performance: 5, cost: 7 },
    },
  },

  // ── Hosting ───────────────────────────────────────────────────────────────
  {
    name: "Vercel",
    role: "Hosting",
    rationale:
      "Zero-config deployment with automatic branch previews. The fastest path to production, especially for Next.js.",
    scores: {
      projectType:        { web: 10, api: 8, mobile: 5, internal: 8, desktop: 0, game: 0, cli: 0, extension: 5 },
      audience:           { b2c: 10, b2b: 7, internal: 8, mixed: 9 },
      languagePreference: { js: 10, none: 8, python: 5, go: 4, java: 3, dotnet: 3, ruby: 4, rust: 3 },
      userLoad:           { tiny: 10, small: 9, medium: 7, large: 3 },
      realTime:           { yes: 5, no: 9 },
      dataNeed:           { simple: 10, relational: 7, analytics: 5, document: 8 },
      timeline:           { sprint: 10, short: 9, medium: 7, long: 5 },
      experience:         { beginner: 10, intermediate: 8, advanced: 5 },
      priority:           { speed: 10, dx: 10, performance: 5, cost: 7 },
    },
  },
  {
    name: "Render",
    role: "Hosting",
    rationale:
      "Managed cloud platform with simple deploys, built-in PostgreSQL, and reasonable pricing for most production apps.",
    scores: {
      projectType:        { web: 9, api: 10, mobile: 6, internal: 8, desktop: 0, game: 2, cli: 4, extension: 4 },
      audience:           { b2c: 8, b2b: 8, internal: 8, mixed: 8 },
      languagePreference: { js: 8, python: 9, go: 8, java: 7, dotnet: 7, ruby: 9, rust: 7, none: 8 },
      userLoad:           { tiny: 8, small: 9, medium: 9, large: 5 },
      realTime:           { yes: 7, no: 8 },
      dataNeed:           { simple: 8, relational: 9, analytics: 7, document: 8 },
      timeline:           { sprint: 7, short: 8, medium: 9, long: 8 },
      experience:         { beginner: 7, intermediate: 9, advanced: 8 },
      priority:           { speed: 7, dx: 8, performance: 7, cost: 8 },
    },
  },
  {
    name: "Fly.io",
    role: "Hosting",
    rationale:
      "Deploy Docker containers to edge regions worldwide. Generous free tier and great for Go, Rust, and latency-sensitive apps.",
    scores: {
      projectType:        { web: 8, api: 10, mobile: 5, internal: 7, desktop: 0, game: 2, cli: 5, extension: 3 },
      audience:           { b2c: 7, b2b: 8, internal: 8, mixed: 7 },
      languagePreference: { js: 8, python: 8, go: 9, java: 7, dotnet: 7, ruby: 8, rust: 9, none: 7 },
      userLoad:           { tiny: 9, small: 9, medium: 8, large: 5 },
      realTime:           { yes: 8, no: 7 },
      dataNeed:           { simple: 8, relational: 8, analytics: 7, document: 8 },
      timeline:           { sprint: 7, short: 8, medium: 8, long: 7 },
      experience:         { beginner: 5, intermediate: 9, advanced: 9 },
      priority:           { speed: 6, dx: 7, performance: 8, cost: 10 },
    },
  },
  {
    name: "Railway",
    role: "Hosting",
    rationale:
      "Simple GitHub-connected deploys with managed databases and a generous free tier. Great for prototypes and MVPs.",
    scores: {
      projectType:        { web: 8, api: 9, mobile: 5, internal: 8, desktop: 0, game: 2, cli: 4, extension: 3 },
      audience:           { b2c: 8, b2b: 7, internal: 8, mixed: 8 },
      languagePreference: { js: 9, python: 8, go: 7, java: 7, dotnet: 6, ruby: 9, rust: 7, none: 8 },
      userLoad:           { tiny: 9, small: 10, medium: 7, large: 3 },
      realTime:           { yes: 7, no: 8 },
      dataNeed:           { simple: 9, relational: 8, analytics: 6, document: 8 },
      timeline:           { sprint: 9, short: 9, medium: 8, long: 6 },
      experience:         { beginner: 9, intermediate: 9, advanced: 7 },
      priority:           { speed: 9, dx: 9, performance: 5, cost: 7 },
    },
  },
  {
    name: "AWS",
    role: "Hosting",
    rationale:
      "The most complete cloud platform. Auto-scaling, global CDN, 200+ managed services. Required at million-user scale.",
    scores: {
      projectType:        { web: 9, api: 10, mobile: 8, internal: 9, desktop: 3, game: 7, cli: 7, extension: 5 },
      audience:           { b2c: 9, b2b: 10, internal: 9, mixed: 9 },
      languagePreference: { js: 8, python: 9, go: 9, java: 9, dotnet: 8, ruby: 7, rust: 8, none: 7 },
      userLoad:           { tiny: 3, small: 6, medium: 9, large: 10 },
      realTime:           { yes: 9, no: 7 },
      dataNeed:           { simple: 7, relational: 9, analytics: 10, document: 9 },
      timeline:           { sprint: 2, short: 4, medium: 8, long: 10 },
      experience:         { beginner: 1, intermediate: 5, advanced: 10 },
      priority:           { speed: 2, dx: 3, performance: 10, cost: 3 },
    },
  },
  {
    name: "Google Cloud",
    role: "Hosting",
    rationale:
      "Enterprise cloud platform with industry-leading data and ML services. Strong fit for analytics-heavy and Python/Go workloads.",
    scores: {
      projectType:        { web: 9, api: 10, mobile: 8, internal: 9, desktop: 3, game: 7, cli: 7, extension: 5 },
      audience:           { b2c: 8, b2b: 10, internal: 9, mixed: 9 },
      languagePreference: { js: 8, python: 10, go: 10, java: 8, dotnet: 7, ruby: 7, rust: 7, none: 7 },
      userLoad:           { tiny: 3, small: 5, medium: 9, large: 10 },
      realTime:           { yes: 8, no: 7 },
      dataNeed:           { simple: 6, relational: 8, analytics: 10, document: 9 },
      timeline:           { sprint: 2, short: 4, medium: 8, long: 10 },
      experience:         { beginner: 1, intermediate: 5, advanced: 10 },
      priority:           { speed: 2, dx: 3, performance: 10, cost: 3 },
    },
  },
];
