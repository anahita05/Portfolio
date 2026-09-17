import * as React from "react";

/**
 * Circular-reveal page transition, same mechanism as the theme button:
 * expands a clip-path circle from the clicked element via
 * `document.startViewTransition`. Falls back to a plain update when
 * View Transitions are unavailable or reduced motion is preferred.
 */
export async function revealFromElement(
  event: React.MouseEvent<HTMLElement>,
  update: () => void | Promise<void>,
  name: "to-locked" | "to-unlocked",
): Promise<void> {
  const root = document.documentElement;
  const el = event.currentTarget;

  if (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    await update();
    return;
  }

  const rect = el.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

  root.style.setProperty("--vault-transition-x", `${x}%`);
  root.style.setProperty("--vault-transition-y", `${y}%`);
  root.dataset.vaultTransition = name;

  const transition = document.startViewTransition(() => {
    void update();
  });

  try {
    await transition.finished;
  } finally {
    delete root.dataset.vaultTransition;
    root.style.removeProperty("--vault-transition-x");
    root.style.removeProperty("--vault-transition-y");
  }
}
