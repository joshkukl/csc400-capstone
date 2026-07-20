import { animate, stagger } from "animejs";

export const REVEAL_DISTANCE_Y = -18;
export const REVEAL_DURATION = 420;
export const REVEAL_STAGGER = 100;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Staggered North→South fade/slide for a scoped list of elements.
 * Returns a cleanup function that cancels in-flight animations.
 */
export function staggerReveal(
  elements: HTMLElement[],
  options?: {
    distanceY?: number;
    duration?: number;
    staggerMs?: number;
  },
): () => void {
  if (elements.length === 0) {
    return () => undefined;
  }

  const distanceY = options?.distanceY ?? REVEAL_DISTANCE_Y;
  const duration = options?.duration ?? REVEAL_DURATION;
  const staggerMs = options?.staggerMs ?? REVEAL_STAGGER;

  for (const el of elements) {
    el.style.opacity = "0";
    el.style.transform = `translateY(${distanceY}px)`;
  }

  const animation = animate(elements, {
    opacity: [0, 1],
    translateY: [distanceY, 0],
    delay: stagger(staggerMs),
    duration,
    ease: "outQuad",
  });

  return () => {
    animation.pause();
    for (const el of elements) {
      el.style.opacity = "";
      el.style.transform = "";
    }
  };
}

export function revealImmediately(elements: HTMLElement[]): void {
  for (const el of elements) {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }
}
