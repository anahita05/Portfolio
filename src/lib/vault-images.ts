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

export function resolveVaultSrc(src: string, isUnlocked: boolean): string {
  if (!src) return src;
  // Unlocked (restricted area) -> main; locked (normal) -> hide.
  if (isUnlocked) return src;
  const explicit = EXPLICIT_HIDE[src];
  if (explicit) return explicit;
  if (src.includes("-main.")) return src.replace("-main.", "-hide.");
  return src;
}
