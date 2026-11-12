"use client";

import * as React from "react";

/**
 * True only on desktop-class devices (real mouse, wide screen) that have not
 * asked for reduced motion. Gates the expensive JS-driven effects
 * (scroll parallax, mouse-follow light). Phones and tablets get the static,
 * CSS-only version, which scrolls smoothly.
 *
 * Starts as `false` on the server and first client render, so hydration
 * matches and phones never even attach the effects.
 */
const QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

export function useRichMotion(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
