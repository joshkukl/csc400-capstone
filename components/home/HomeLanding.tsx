"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "animejs";
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
const BODY_HOVER_DURATION = 320;
const BODY_HOVER_SHIFT = 28;

const HERO_HEADING_OUTLINE =
  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 18px rgba(0,0,0,0.35)";

const BADGE_TEXT_SHADOW =
  "0 0 10px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.55), -0.5px -0.5px 0 rgba(0,0,0,0.35), 0.5px 0.5px 0 rgba(0,0,0,0.35)";

/** Shared frosted glass look for badge, CTAs, and How it Works label */
const FROSTED_SURFACE_CLASS =
  "rounded-full border border-white/30 bg-white/10 text-white shadow-[0_0_18px_rgba(111,255,233,0.12)] backdrop-blur-md [-webkit-backdrop-filter:blur(10px)]";

const FROSTED_BADGE_CLASS = `${FROSTED_SURFACE_CLASS} inline-block px-3 py-1 text-sm`;

const FROSTED_CTA_CLASS = `${FROSTED_SURFACE_CLASS} inline-flex h-11 items-center justify-center px-8 text-sm font-medium transition-[background-color] duration-200 hover:bg-black/25`;

const FROSTED_SECTION_LABEL_CLASS = `${FROSTED_SURFACE_CLASS} inline-block px-4 py-1.5 text-2xl font-semibold tracking-tight`;

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
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyWrapRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const hoverAnimationsRef = useRef<Array<{ pause: () => void }>>([]);

  const handleIntroComplete = useCallback(() => {
    setContentRevealed(true);
  }, []);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setContentRevealed(true);
    }, CONTENT_FALLBACK_MS);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  function stopHoverAnimations() {
    for (const animation of hoverAnimationsRef.current) {
      animation.pause();
    }
    hoverAnimationsRef.current = [];
  }

  function handleBodyEnter() {
    if (
      !badgeRef.current ||
      !headlineRef.current ||
      !bodyWrapRef.current ||
      !buttonsRef.current
    ) {
      return;
    }

    stopHoverAnimations();

    hoverAnimationsRef.current = [
      animate(bodyWrapRef.current, {
        scale: 1.5,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
      animate(badgeRef.current, {
        translateY: -BODY_HOVER_SHIFT,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
      animate(headlineRef.current, {
        translateY: -BODY_HOVER_SHIFT,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
      animate(buttonsRef.current, {
        translateY: BODY_HOVER_SHIFT,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
    ];
  }

  function handleBodyLeave() {
    if (
      !badgeRef.current ||
      !headlineRef.current ||
      !bodyWrapRef.current ||
      !buttonsRef.current
    ) {
      return;
    }

    stopHoverAnimations();

    hoverAnimationsRef.current = [
      animate(bodyWrapRef.current, {
        scale: 1,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
      animate(badgeRef.current, {
        translateY: 0,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
      animate(headlineRef.current, {
        translateY: 0,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
      animate(buttonsRef.current, {
        translateY: 0,
        duration: BODY_HOVER_DURATION,
        ease: "outQuad",
      }),
    ];
  }

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
            ref={badgeRef}
            className={`mb-4 ${FROSTED_BADGE_CLASS} ${revealClass(contentRevealed)}`}
            style={{
              ...revealStyle(2, contentRevealed),
              textShadow: BADGE_TEXT_SHADOW,
              willChange: "transform",
            }}
          >
            Tech-Stack Recommendation Engine
          </span>
          <h1
            ref={headlineRef}
            className={`max-w-3xl text-5xl font-bold tracking-tight leading-tight text-white sm:text-6xl lg:text-7xl ${revealClass(contentRevealed)}`}
            style={{
              ...revealStyle(3, contentRevealed),
              textShadow: HERO_HEADING_OUTLINE,
              willChange: "transform",
            }}
          >
            Find the right stack for your next project
          </h1>

          <div
            ref={bodyWrapRef}
            onMouseEnter={handleBodyEnter}
            onMouseLeave={handleBodyLeave}
            className={`relative mt-6 max-w-xl origin-center cursor-default ${revealClass(contentRevealed)}`}
            style={{
              ...revealStyle(4, contentRevealed),
              willChange: "transform",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-0 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(5,7,12,0.52) 0%, rgba(5,7,12,0.28) 52%, rgba(5,7,12,0.08) 72%, transparent 84%)",
              }}
            />
            <p className="relative z-10 px-7 py-5 text-xl leading-relaxed text-white sm:text-2xl">
              Answer a few questions about your project&apos;s requirements and get
              a tailored technology stack recommendation — with pros, cons, and an
              architecture diagram included.
            </p>
          </div>

          <div
            ref={buttonsRef}
            className={`mt-10 flex flex-col gap-4 sm:flex-row ${revealClass(contentRevealed)}`}
            style={{
              ...revealStyle(5, contentRevealed),
              willChange: "transform",
            }}
          >
            <HoverGrowLink href="/questionnaire" className={FROSTED_CTA_CLASS} style={{ textShadow: BADGE_TEXT_SHADOW }}>
              Get Started
            </HoverGrowLink>
            <HoverGrowLink href="/about" className={FROSTED_CTA_CLASS} style={{ textShadow: BADGE_TEXT_SHADOW }}>
              Learn More
            </HoverGrowLink>
          </div>
        </section>

        <section
          className={`px-6 py-20 ${revealClass(contentRevealed)}`}
          style={revealStyle(6, contentRevealed)}
        >
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center">
              <span
                className={FROSTED_SECTION_LABEL_CLASS}
                style={{ textShadow: BADGE_TEXT_SHADOW }}
              >
                How it works
              </span>
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
