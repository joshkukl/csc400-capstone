import type { FormData, Step } from "@/types/types";

export const STEPS: Step[] = [
  {
    title: "Project Overview",
    description: "Tell us what you're building and who it's for.",
    fields: [
      {
        key: "projectType",
        label: "What type of project is this?",
        options: [
          { label: "Web App / SaaS", value: "web" },
          { label: "Mobile App", value: "mobile" },
          { label: "Desktop App", value: "desktop" },
          { label: "Game", value: "game" },
          { label: "API / Backend Service", value: "api" },
          { label: "Internal Tool / Dashboard", value: "internal" },
          { label: "CLI Tool", value: "cli" },
          { label: "Browser Extension", value: "extension" },
        ],
      },
      {
        key: "audience",
        label: "Who are your primary users?",
        options: [
          { label: "Consumers (B2C)", value: "b2c" },
          { label: "Businesses (B2B)", value: "b2b" },
          { label: "Internal team only", value: "internal" },
          { label: "Mixed / Both", value: "mixed" },
        ],
      },
      {
        key: "languagePreference",
        label: "Does your team have a language preference?",
        options: [
          { label: "JavaScript / TypeScript", value: "js" },
          { label: "Python", value: "python" },
          { label: "Go", value: "go" },
          { label: "Java / Kotlin", value: "java" },
          { label: "C# / .NET", value: "dotnet" },
          { label: "Ruby", value: "ruby" },
          { label: "Rust", value: "rust" },
          { label: "No preference", value: "none" },
        ],
      },
    ],
  },
  {
    title: "Technical Requirements",
    description: "Help us understand your performance and data needs.",
    fields: [
      {
        key: "userLoad",
        label: "Expected number of concurrent users?",
        options: [
          { label: "Under 100", value: "tiny" },
          { label: "100 – 10,000", value: "small" },
          { label: "10,000 – 1M", value: "medium" },
          { label: "1M+", value: "large" },
        ],
      },
      {
        key: "realTime",
        label: "Does your project require real-time features?",
        options: [
          { label: "Yes — chat, live updates, notifications, etc.", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        key: "dataNeed",
        label: "How would you describe your data needs?",
        options: [
          { label: "Simple CRUD (users, posts, settings)", value: "simple" },
          { label: "Relational / complex queries", value: "relational" },
          { label: "Heavy analytics or reporting", value: "analytics" },
          { label: "Unstructured / document data", value: "document" },
        ],
      },
    ],
  },
  {
    title: "Constraints & Priorities",
    description: "Let us know your timeline, experience, and what matters most.",
    fields: [
      {
        key: "timeline",
        label: "What's your target delivery timeline?",
        options: [
          { label: "Less than 1 month", value: "sprint" },
          { label: "1–3 months", value: "short" },
          { label: "3–6 months", value: "medium" },
          { label: "6+ months", value: "long" },
        ],
      },
      {
        key: "experience",
        label: "What's your team's overall experience level?",
        options: [
          { label: "Beginner", value: "beginner" },
          { label: "Intermediate", value: "intermediate" },
          { label: "Advanced", value: "advanced" },
        ],
      },
      {
        key: "priority",
        label: "What matters most for this project?",
        options: [
          { label: "Speed to market", value: "speed" },
          { label: "Performance & scale", value: "performance" },
          { label: "Cost efficiency", value: "cost" },
          { label: "Developer experience / maintainability", value: "dx" },
        ],
      },
    ],
  },
];

export const INITIAL_FORM_DATA: FormData = {
  projectType: "",
  audience: "",
  languagePreference: "",
  userLoad: "",
  realTime: "",
  dataNeed: "",
  timeline: "",
  experience: "",
  priority: "",
};
