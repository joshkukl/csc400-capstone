"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthNavLinks } from "@/components/AuthNavLinks";
import { HoverGrowLink } from "@/components/HoverGrowLink";
import { NeuralNetworkBackground } from "@/components/three/NeuralNetworkBackground";

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

const REVEAL_STAGGER_MS = 250;
const CONTENT_FALLBACK_MS = 3500;

const HERO_HEADING_OUTLINE =
  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 18px rgba(0,0,0,0.35)";

function revealStyle(step: number, contentRevealed: boolean) {
  return {
    transitionDelay: contentRevealed ? `${step * REVEAL_STAGGER_MS}ms` : "0ms",
  };
}

function revealClass(contentRevealed: boolean) {
  return `transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
    contentRevealed
      ? "translate-y-0 opacity-100"
      : "-translate-y-5 opacity-0 pointer-events-none"
  }`;
}

export function HomeLanding() {
  const [contentRevealed, setContentRevealed] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setContentRevealed(true);
  }, []);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setContentRevealed(true);
    }, CONTENT_FALLBACK_MS);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_center,#10151d_0%,#05070c_55%,#020308_100%)] text-white">
      <NeuralNetworkBackground onIntroComplete={handleIntroComplete} />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-[#020308]/35 via-[#05070c]/20 to-[#020308]/55"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <nav className="flex items-center justify-between px-6 py-4">
          <span
            className={`text-2xl font-semibold tracking-tight sm:text-3xl ${revealClass(contentRevealed)}`}
            style={revealStyle(0, contentRevealed)}
          >
            StackRec
          </span>
          <div
            className={revealClass(contentRevealed)}
            style={revealStyle(1, contentRevealed)}
          >
            <AuthNavLinks />
          </div>
        </nav>

        <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <span
            className={`mb-4 inline-block rounded-full border border-white/15 px-3 py-1 text-sm text-white/55 ${revealClass(contentRevealed)}`}
            style={revealStyle(2, contentRevealed)}
          >
            Tech-Stack Recommendation Engine
          </span>
          <h1
            className={`max-w-3xl text-5xl font-bold tracking-tight leading-tight text-white sm:text-6xl lg:text-7xl ${revealClass(contentRevealed)}`}
            style={{
              ...revealStyle(3, contentRevealed),
              textShadow: HERO_HEADING_OUTLINE,
            }}
          >
            Find the right stack for your next project
          </h1>
          <p
            className={`mt-6 max-w-xl text-xl leading-relaxed text-white sm:text-2xl ${revealClass(contentRevealed)}`}
            style={revealStyle(4, contentRevealed)}
          >
            Answer a few questions about your project&apos;s requirements and get
            a tailored technology stack recommendation — with pros, cons, and an
            architecture diagram included.
          </p>
          <div
            className={`mt-10 flex flex-col gap-4 sm:flex-row ${revealClass(contentRevealed)}`}
            style={revealStyle(5, contentRevealed)}
          >
            <HoverGrowLink
              href="/questionnaire"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-[#05070c] transition-colors hover:bg-white/85"
            >
              Get Started
            </HoverGrowLink>
            <HoverGrowLink
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-8 text-sm font-medium transition-colors hover:bg-white/5"
            >
              Learn More
            </HoverGrowLink>
          </div>
        </section>

        <section
          className={`px-6 py-20 ${revealClass(contentRevealed)}`}
          style={revealStyle(6, contentRevealed)}
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight">
              How it works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-[#05070c]/35 p-6 backdrop-blur-sm"
                >
                  <span className="mb-4 block font-mono text-sm text-white/35">
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
