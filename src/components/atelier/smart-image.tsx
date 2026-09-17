"use client";

import * as React from "react";
import { motion, type MotionStyle } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useThemeStore } from "@/store/useThemeStore";
import { useVaultStore } from "@/store/useVaultStore";
import { resolveVaultSrc } from "@/lib/vault-images";
import { HERO_IMG, HERO_IMG_DARK, HERO_IMG_RED } from "@/data/atelier";

type ArtLayer = "light" | "dark" | "red";

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
  /** swap `src` to its `-hide` twin while locked (default true; set false to opt out) */
  vaultSwap?: boolean;
  /** smooth hover zoom on the picture (default true; set false to opt out) */
  hoverZoom?: boolean;
};

const LAYER_ORDER: ArtLayer[] = ["light", "dark", "red"];
const LAYER_GLOW: Record<Exclude<ArtLayer, "light">, string> = {
  dark: "themed-img-dark-glow",
  red: "themed-img-red-glow",
};

type LayerModel = {
  id: ArtLayer;
  /** source before the vault swap (undefined = layer absent) */
  base: string | undefined;
  /** resolved source actually rendered */
  src: string | undefined;
  /** true for the stacked dark/red overlays */
  overlay: boolean;
};

function isComplete(el: HTMLImageElement | null): boolean {
  return !!el && el.complete && el.naturalWidth > 0;
}

/**
 * Render-phase reset ("adjust state during render"): runs `reset` once per
 * distinct key without an effect, so no cascading renders (lint-safe).
 */
function useResetOnKey(key: string, reset: () => void): void {
  const [prev, setPrev] = React.useState<string | null>(null);
  if (prev !== key) {
    setPrev(key);
    reset();
  }
}

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
  vaultSwap = true,
  hoverZoom = true,
}: SmartImageProps) {
  const theme = useThemeStore((s) => s.theme);
  // Global unlock flag: locked visitors see -hide, unlocked clients see -main.
  const isUnlocked = useVaultStore((s) => s.status === "unlocked");
  const useHide = vaultSwap && !isUnlocked;

  // If the hide file 404s (no -hide version), fall back to the main version.
  const [vaultFallback, setVaultFallback] = React.useState(false);
  useResetOnKey(`${src}|${srcDark ?? ""}|${srcRed ?? ""}`, () => {
    if (vaultFallback) setVaultFallback(false);
  });
  const hideActive = useHide && !vaultFallback;

  // One model per theme layer: base src -> vault-resolved src.
  // Every usage of the light hero cutout gets themed cutouts automatically.
  // The vault swap happens AFTER theme resolution so each layer maps to its hide twin.
  const layers: LayerModel[] = LAYER_ORDER.map((id) => {
    const base =
      id === "light"
        ? src
        : id === "dark"
          ? (srcDark ?? (src === HERO_IMG ? HERO_IMG_DARK : undefined))
          : (srcRed ?? (src === HERO_IMG ? HERO_IMG_RED : undefined));
    return {
      id,
      base,
      src: base ? resolveVaultSrc(base, hideActive) : undefined,
      overlay: id !== "light",
    };
  });
  const hasAltLayer = layers.some((l) => l.overlay && l.base);

  const hideSwapped = layers.some((l) => l.src && l.src !== l.base);
  const [loaded, setLoaded] = React.useState<Record<ArtLayer, boolean>>({
    light: false,
    dark: true,
    red: true,
  });
  // Reset the skeleton whenever a resolved (possibly swapped) src changes.
  useResetOnKey(
    layers.map((l) => l.src ?? "").join("|"),
    () => {
      const fresh = { light: false, dark: true, red: true } as Record<ArtLayer, boolean>;
      for (const l of layers) {
        if (l.id !== "light") fresh[l.id] = !l.src;
      }
      setLoaded(fresh);
    },
  );

  const markLoaded = React.useCallback(
    (id: ArtLayer) => {
      setLoaded((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
    },
    [setLoaded],
  );

  const refs = React.useRef<Record<ArtLayer, HTMLImageElement | null>>({
    light: null,
    dark: null,
    red: null,
  });
  // One stable callback ref per layer (no per-render churn).
  const refCallbacks = React.useMemo(
    () =>
      Object.fromEntries(
        LAYER_ORDER.map((id) => [
          id,
          (el: HTMLImageElement | null) => {
            refs.current[id] = el;
            if (isComplete(el)) markLoaded(id);
          },
        ]),
      ) as Record<ArtLayer, (el: HTMLImageElement | null) => void>,
    [markLoaded],
  );

  // Cached images can skip onLoad — mark ready if already complete.
  React.useEffect(() => {
    for (const id of LAYER_ORDER) {
      if (isComplete(refs.current[id])) markLoaded(id);
    }
  }, [layers.map((l) => l.src).join("|"), markLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBaseError = React.useCallback(() => {
    // No -hide file for this image -> keep showing -main instead of breaking.
    if (hideSwapped) setVaultFallback(true);
    markLoaded("light");
  }, [hideSwapped, markLoaded]);

  const visibleLoaded = loaded[theme];
  const opacityFor = (l: LayerModel): string => {
    if (!l.src) return "hidden";
    const active = theme === l.id;
    return active ? (loaded[l.id] ? "opacity-100" : "opacity-0") : "opacity-0";
  };

  const content = (
    <div
      className={cn(
        "h-full w-full",
        hoverZoom &&
          "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:group-hover:scale-100",
      )}
    >
      {!visibleLoaded && (
        <Skeleton
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full rounded-none",
            skeletonClassName
          )}
        />
      )}
      {layers.map(
        (l) =>
          l.src && (
            <img
              key={l.id}
              ref={refCallbacks[l.id]}
              src={l.src}
              alt={l.overlay ? (theme === l.id ? alt : "") : hasAltLayer ? "" : alt}
              aria-hidden={l.overlay ? theme !== l.id : hasAltLayer ? true : ariaHidden}
              loading={loading}
              onLoad={() => markLoaded(l.id)}
              onError={l.overlay ? () => markLoaded(l.id) : handleBaseError}
              className={cn(
                "theme-crossfade-img block h-full w-full object-cover",
                l.overlay && `absolute inset-0 ${LAYER_GLOW[l.id as Exclude<ArtLayer, "light">]}`,
                opacityFor(l),
                imgClassName
              )}
            />
          ),
      )}
    </div>
  );

  if (motionStyle) {
    return (
      <motion.div
        style={motionStyle}
        className={cn("relative overflow-hidden", wrapperClassName)}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>{content}</div>
  );
}
