import Link from "next/link";

const flowSteps = [
  {
    title: "Create an account",
    description:
      "Register and sign in to access the protected questionnaire. Authentication helps keep user sessions organized during development.",
  },
  {
    title: "Answer structured questions",
    description:
      "Walk through a multi-step questionnaire about project type, audience, scale, data needs, timeline, experience, and priorities.",
  },
  {
    title: "Receive a recommendation",
    description:
      "Your answers are intended to feed a deterministic heuristic decision-tree that recommends a technology stack based on project requirements.",
  },
];

const futureFeatures = [
  "Full recommendation results page with comparative analysis",
  "Auto-generated system architecture diagrams",
  "Persistent storage of questionnaire submissions",
  "Production deployment with PostgreSQL",
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <nav className="border-b border-foreground/10 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          StackRec
        </Link>
      </nav>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/50">
            CSC400 Capstone &mdash; Southern Connecticut State University
          </span>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight">
            About StackRec
          </h1>
          <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
            StackRec is a Tech-Stack Recommendation Engine built as a CSC400
            Computer Science Project Seminar capstone. It is designed to help
            students and developers reduce analysis paralysis when starting a
            new software project by translating structured requirements into
            clearer technology choices.
          </p>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            The problem
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            Choosing a technology stack too early&mdash;or without analyzing
            requirements&mdash;can lead to rework, performance issues, and
            unnecessary complexity. Many developers, especially students
            beginning capstone or portfolio projects, struggle to compare
            frameworks, databases, and deployment options in a structured way.
          </p>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            How it works today
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            The current application includes a landing page, user registration
            and login, and a multi-step questionnaire that captures project
            requirements. The questionnaire is live and validates answers step
            by step before users can continue.
          </p>
          <div className="mt-10 grid gap-6">
            {flowSteps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-foreground/10 p-6"
              >
                <span className="mb-3 block font-mono text-sm text-foreground/35">
                  0{i + 1}
                </span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Educational value
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            This project demonstrates structured requirements analysis, full-stack
            web development with Next.js and React, authenticated user flows,
            database-backed persistence, and collaborative capstone
            engineering. It reflects the CSC400 goal of applying software design
            principles to a real-world problem while documenting trade-offs
            instead of relying on guesswork.
          </p>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Planned future improvements
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">
            Some features described in the project vision are still in progress.
            The items below are planned rather than fully implemented:
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {futureFeatures.map((feature) => (
              <li
                key={feature}
                className="rounded-xl border border-foreground/10 px-4 py-3 text-sm text-foreground/60"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/15 px-8 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            Back Home
          </Link>
          <Link
            href="/questionnaire"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Start Questionnaire
          </Link>
        </div>
      </section>

      <footer className="border-t border-foreground/10 px-6 py-6 text-center text-sm text-foreground/40">
        StackRec &mdash; Tech-Stack Recommendation Engine
      </footer>
    </main>
  );
}
