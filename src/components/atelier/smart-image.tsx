"use client";

import * as React from "react";
import { motion, type MotionStyle } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import PixelCard from "@/components/PixelCard";
import { useThemeStore } from "@/store/useThemeStore";
import { HERO_IMG, HERO_IMG_DARK, HERO_IMG_RED } from "@/data/atelier";

/** Atelier-tinted pixel palette: gold + rose + cream + blush. */
const DEFAULT_PIXEL_COLORS = "#f5d67b,#e8b4a0,#c9a13a,#f9dbe3";
/** Dark-theme pixel palette: black + golden shimmer. */
const DARK_PIXEL_COLORS = "#d4af37,#f5d67b,#8a6d1b,#fff8e1";
/** Red-theme pixel palette: crimson + rose shimmer. */
const RED_PIXEL_COLORS = "#e63946,#ff8a8a,#a31220,#ffd9d9";

type SmartImageProps = {
  src: string;
  alt: string;
  /** explicit dark-theme counterpart; auto-uses main-dark for the hero cutout */
  srcDark?: string;
  /** explicit red-theme counterpart; auto-uses main-red for the hero cutout */
  srcRed?: string;
  /** classes for the outer wrapper (sizing / aspect / rounded / overflow) */
  wrapperClassName?: string;
  /** classes for the <img> itself (object-cover, scale, etc.) */
  imgClassName?: string;
  /** skeleton tint while loading */
  skeletonClassName?: string;
  loading?: "lazy" | "eager";
  ariaHidden?: boolean;
  /** when provided, renders a motion wrapper with parallax style (e.g. { y }) */
  motionStyle?: MotionStyle;
  /** overlay a continuously-shimmering React-Bits PixelCard canvas over the image */
  withPixels?: boolean;
  /** pixel palette (comma-separated colors) */
  pixelColors?: string;
};

/**
 * shadcn-style image: shows a <Skeleton /> behind every image
 * until it fires onLoad / onError. Use for ALL images.
 *
 * Hero artwork slowly crossfades (~1.6s) between light / dark / red
 * counterparts as the theme changes, instead of snapping.
 */
export function SmartImage({
  src,
  alt,
  srcDark,
  srcRed,
  wrapperClassName,
  imgClassName,
  skeletonClassName,
  loading = "lazy",
  ariaHidden,
  motionStyle,
  withPixels = false,
  pixelColors,
}: SmartImageProps) {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";
  const isRed = theme === "red";

  // Every usage of the light hero cutout gets themed cutouts automatically.
  const darkSrc = srcDark ?? (src === HERO_IMG ? HERO_IMG_DARK : undefined);
  const redSrc = srcRed ?? (src === HERO_IMG ? HERO_IMG_RED : undefined);
  const hasAlt = Boolean(darkSrc || redSrc);

  const [loadedLight, setLoadedLight] = React.useState(false);
  const [loadedDark, setLoadedDark] = React.useState(!darkSrc);
  const [loadedRed, setLoadedRed] = React.useState(!redSrc);
  const lightRef = React.useRef<HTMLImageElement | null>(null);
  const darkRef = React.useRef<HTMLImageElement | null>(null);
  const redRef = React.useRef<HTMLImageElement | null>(null);

  // Cached images can skip onLoad — mark ready if already complete.
  React.useEffect(() => {
    const el = lightRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoadedLight(true);
    const d = darkRef.current;
    if (d && d.complete && d.naturalWidth > 0) setLoadedDark(true);
    const r = redRef.current;
    if (r && r.complete && r.naturalWidth > 0) setLoadedRed(true);
  }, [src, darkSrc, redSrc]);

  const handleLightRef = React.useCallback((el: HTMLImageElement | null) => {
    lightRef.current = el;
    if (el && el.complete && el.naturalWidth > 0) setLoadedLight(true);
  }, []);

  const handleDarkRef = React.useCallback((el: HTMLImageElement | null) => {
    darkRef.current = el;
    if (el && el.complete && el.naturalWidth > 0) setLoadedDark(true);
  }, []);

  const handleRedRef = React.useCallback((el: HTMLImageElement | null) => {
    redRef.current = el;
    if (el && el.complete && el.naturalWidth > 0) setLoadedRed(true);
  }, []);

  const visibleLoaded = isDark ? loadedDark : isRed ? loadedRed : loadedLight;
  const effectivePixels =
    pixelColors ?? (isDark ? DARK_PIXEL_COLORS : isRed ? RED_PIXEL_COLORS : DEFAULT_PIXEL_COLORS);

  const showLight = !isDark && !isRed;
  const lightOpacity = showLight ? (loadedLight ? "opacity-100" : "opacity-0") : "opacity-0";
  const darkOpacity = darkSrc
    ? isDark
      ? (loadedDark ? "opacity-100" : "opacity-0")
      : "opacity-0"
    : "hidden";
  const redOpacity = redSrc
    ? isRed
      ? (loadedRed ? "opacity-100" : "opacity-0")
      : "opacity-0"
    : "hidden";

  const layers = (
    <>
      {!visibleLoaded && (
        <Skeleton
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full rounded-none",
            skeletonClassName
          )}
        />
      )}
      <img
        ref={handleLightRef}
        src={src}
        alt={hasAlt ? "" : alt}
        aria-hidden={hasAlt ? true : ariaHidden}
        loading={loading}
        onLoad={() => setLoadedLight(true)}
        onError={() => setLoadedLight(true)}
        className={cn(
          "theme-crossfade-img block h-full w-full object-cover",
          lightOpacity,
          imgClassName
        )}
      />
      {darkSrc && (
        <img
          ref={handleDarkRef}
          src={darkSrc}
          alt={isDark ? alt : ""}
          aria-hidden={isDark ? ariaHidden : true}
          loading={loading}
          onLoad={() => setLoadedDark(true)}
          onError={() => setLoadedDark(true)}
          className={cn(
            "theme-crossfade-img themed-img-dark-glow absolute inset-0 block h-full w-full object-cover",
            darkOpacity,
            imgClassName
          )}
        />
      )}
      {redSrc && (
        <img
          ref={handleRedRef}
          src={redSrc}
          alt={isRed ? alt : ""}
          aria-hidden={isRed ? ariaHidden : true}
          loading={loading}
          onLoad={() => setLoadedRed(true)}
          onError={() => setLoadedRed(true)}
          className={cn(
            "theme-crossfade-img themed-img-red-glow absolute inset-0 block h-full w-full object-cover",
            redOpacity,
            imgClassName
          )}
        />
      )}
      {withPixels && (
        <PixelCard
          autoPlay
          noFocus
          gap={8}
          speed={30}
          colors={effectivePixels}
          className="pixel-frame-overlay"
        />
      )}
    </>
  );

  if (motionStyle) {
    return (
      <motion.div
        style={motionStyle}
        className={cn("relative overflow-hidden", wrapperClassName)}
      >
        {layers}
      </motion.div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>{layers}</div>
  );
}
