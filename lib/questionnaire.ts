import type { FormData, Step } from "@/types/types";

export const STEPS: Step[] = [
  {
    title: "Project Overview",
    description: "Tell us what you're building.",
    fields: [
      {
        key: "projectType",
        label: "What type of project is this?",
        options: [
          { label: "Web Application", value: "web" },
          { label: "Mobile Application", value: "mobile" },
          { label: "REST / GraphQL API", value: "api" },
          { label: "CLI Tool", value: "cli" },
        ],
      },
      {
        key: "teamSize",
        label: "How large is your team?",
        options: [
          { label: "Solo", value: "solo" },
          { label: "2–3 people", value: "small" },
          { label: "4–8 people", value: "medium" },
          { label: "9+ people", value: "large" },
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
          { label: "Yes — chat, live updates, etc.", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        key: "dataComplexity",
        label: "How complex is your data model?",
        options: [
          { label: "Simple CRUD", value: "simple" },
          { label: "Relational / complex queries", value: "relational" },
          { label: "Heavy analytics or reporting", value: "analytics" },
        ],
      },
    ],
  },
  {
    title: "Constraints",
    description: "Let us know your timeline, experience, and priorities.",
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
          { label: "Speed of development", value: "speed" },
          { label: "Performance", value: "performance" },
          { label: "Scalability", value: "scalability" },
          { label: "Minimizing cost", value: "cost" },
        ],
      },
    ],
  },
];

export const INITIAL_FORM_DATA: FormData = {
  projectType: "",
  teamSize: "",
  userLoad: "",
  realTime: "",
  dataComplexity: "",
  timeline: "",
  experience: "",
  priority: "",
};
