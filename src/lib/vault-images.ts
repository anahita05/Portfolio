import {
  HERO_IMG,
  HERO_IMG_DARK,
  HERO_IMG_HIDE,
  HERO_IMG_HIDE_DARK,
  HERO_IMG_HIDE_RED,
  HERO_IMG_RED,
} from "@/data/atelier";


const EXPLICIT_HIDE: Record<string, string> = {
  [HERO_IMG]: HERO_IMG_HIDE,
  [HERO_IMG_DARK]: HERO_IMG_HIDE_DARK,
  [HERO_IMG_RED]: HERO_IMG_HIDE_RED,
};

export function resolveVaultSrc(src: string, showBase: boolean): string {
  if (!src) return src;
  // Locked (normal) -> -main pics; unlocked (restricted area) -> -hide pics.
  if (showBase) return src;
  const explicit = EXPLICIT_HIDE[src];
  if (explicit) return explicit;
  if (src.includes("-main.")) return src.replace("-main.", "-hide.");
  return src;
}

/** Both twins for every base (every SmartImage reuses these files). */
const PRELOAD_SRCS = Array.from(
  new Set([
    ...Object.values(EXPLICIT_HIDE),
    HERO_IMG,
    HERO_IMG_DARK,
    HERO_IMG_RED,
  ]),
);

let warmed = false;

/**
 * Fire-and-forget preload of both image twins. Called when the password is
 * submitted so the -main pics are already cached when unlock flips the swap —
 * on mobile this is a ~1 round-trip head-start before the images swap.
 */
export function warmVaultImages(): void {
  if (warmed || typeof window === "undefined") return;
  warmed = true;
  for (const src of PRELOAD_SRCS) {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  }
}
