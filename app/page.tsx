import Link from "next/link";
import { AuthNavLinks } from "@/components/AuthNavLinks";

const features = [
  {
    title: "Requirements Questionnaire",
    description:
      "Walk through a structured set of questions about your project scale, team size, performance needs, and constraints.",
  },
  {
    title: "Comparative Analysis",
    description:
      "Get a side-by-side breakdown of recommended technologies with pros, cons, and real-world use-case context.",
  },
  {
    title: "Architecture Diagram",
    description:
      "Receive an auto-generated visual diagram illustrating the proposed system architecture and component relationships.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <nav className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
        <span className="font-semibold tracking-tight">StackRec</span>
        <AuthNavLinks />
      </nav>

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="mb-4 inline-block rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/50">
          Tech-Stack Recommendation Engine
        </span>
        <h1 className="max-w-2xl text-5xl font-semibold tracking-tight leading-tight">
          Find the right stack for your next project
        </h1>
        <p className="mt-6 max-w-lg text-lg text-foreground/60 leading-relaxed">
          Answer a few questions about your project&apos;s requirements and get
          a tailored technology stack recommendation — with pros, cons, and an
          architecture diagram included.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/questionnaire"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/15 px-8 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-foreground/10 p-6"
              >
                <span className="mb-4 block font-mono text-sm text-foreground/35">
                  0{i + 1}
                </span>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-foreground/10 px-6 py-6 text-center text-sm text-foreground/40">
        CSC400 Capstone &mdash; Southern Connecticut State University
      </footer>
    </main>
  );
}
