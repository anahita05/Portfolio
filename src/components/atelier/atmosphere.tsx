"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useRichMotion } from "@/lib/use-rich-motion";

const STARS = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37.7) % 100}%`,
  top: `${(i * 53.3) % 100}%`,
  size: 2 + ((i * 7) % 3),
  delay: (i % 9) * 0.9,
}));

/**
 * Layered dreamy atelier background:
 * ivory base + cream/sage/rose/lavender/sky blobs + grain + stars + mouse light.
 *
 * Perf notes:
 * - Mouse light + scroll parallax only run on desktop with a real mouse
 *   (`useRichMotion`). On phones the layers stay static, so scrolling never
 *   has to re-composite this full-screen fixed stack every frame.
 * - Blobs no longer use `filter: blur()`; their radial gradients are already soft.
 * - The grain no longer uses `mix-blend-mode`, which forced a full-screen
 *   blend on every scroll frame.
 */
export function Atmosphere() {
  const rich = useRichMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 2000], [0, 120]);
  const yFast = useTransform(scrollY, [0, 2000], [0, -80]);

  React.useEffect(() => {
    if (!rich) return;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        mx.set((lastX / window.innerWidth - 0.5) * 40);
        my.set((lastY / window.innerHeight - 0.5) * 40);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rich, mx, my]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-3] overflow-hidden">
      {/* foundation tint per theme (see .atmosphere-base) */}
      <div className="atmosphere-base absolute inset-0" />

      {/* slow drifting gradient wash */}
      <div className="atelier-wash absolute inset-[-20%]" />

      {/* colored blobs */}
      <motion.div style={rich ? { y: ySlow } : undefined} className="absolute inset-0">
        <div className="blob blob-cream" />
        <div className="blob blob-sage" />
        <div className="blob blob-rose" />
        <div className="blob blob-lavender" />
        <div className="blob blob-sky" />
        <div className="blob blob-gold" />
      </motion.div>

      {/* mouse-following light (desktop only) */}
      {rich ? (
        <motion.div style={{ x: sx, y: sy }} className="absolute inset-0">
          <div className="absolute top-[12%] left-[18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85),transparent_65%)]" />
        </motion.div>
      ) : null}

      {/* scroll parallax sparkle field */}
      <motion.div style={rich ? { y: yFast } : undefined} className="absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="atelier-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* film grain */}
      <div className="atelier-grain absolute inset-0" />
    </div>
  );
}
