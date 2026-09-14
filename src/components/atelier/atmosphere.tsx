"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

/**
 * Layered dreamy atelier background:
 * ivory base + cream/sage/rose/lavender/sky blobs + grain + stars + mouse light.
 * Fixed, GPU-friendly transforms, honors prefers-reduced-motion via CSS.
 */
export function Atmosphere() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 2000], [0, 120]);
  const yFast = useTransform(scrollY, [0, 2000], [0, -80]);

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 40);
      my.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const stars = React.useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: `${(i * 37.7) % 100}%`,
        top: `${(i * 53.3) % 100}%`,
        size: 2 + ((i * 7) % 3),
        delay: (i % 9) * 0.9,
      })),
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-3] overflow-hidden">
      {/* ivory foundation */}
      <div className="absolute inset-0 bg-[#fbf7ee]" />

      {/* slow drifting gradient wash */}
      <div className="atelier-wash absolute inset-[-20%]" />

      {/* colored blobs */}
      <motion.div style={{ y: ySlow }} className="absolute inset-0">
        <div className="blob blob-cream" />
        <div className="blob blob-sage" />
        <div className="blob blob-rose" />
        <div className="blob blob-lavender" />
        <div className="blob blob-sky" />
        <div className="blob blob-gold" />
      </motion.div>

      {/* mouse-following light */}
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0">
        <div className="absolute top-[12%] left-[18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85),transparent_65%)] blur-2xl" />
      </motion.div>

      {/* scroll parallax sparkle field */}
      <motion.div style={{ y: yFast }} className="absolute inset-0">
        {stars.map((s, i) => (
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
