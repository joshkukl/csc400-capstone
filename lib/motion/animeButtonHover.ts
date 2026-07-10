import { animate } from "animejs";

export const BUTTON_HOVER_SCALE = 1.06;
export const BUTTON_HOVER_DURATION = 220;

export function animateButtonGrow(element: HTMLElement) {
  animate(element, {
    scale: BUTTON_HOVER_SCALE,
    duration: BUTTON_HOVER_DURATION,
    ease: "outQuad",
  });
}

export function animateButtonReset(element: HTMLElement) {
  animate(element, {
    scale: 1,
    duration: BUTTON_HOVER_DURATION,
    ease: "outQuad",
  });
}
