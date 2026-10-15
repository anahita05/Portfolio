"use client";

import { motion } from "framer-motion";
import { CodeXml, ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type GalleryItem } from "@/data/atelier";
import { cn } from "@/lib/utils";

const treatmentStyle: Record<GalleryItem["treatment"], { gradient: string }> = {
  full: { gradient: "from-[#2e1f16] via-[#6b3d2e] to-[#120c09]" },
  closeup: { gradient: "from-[#2b1219] via-[#6e2b40] to-[#120a0e]" },
  "wings-left": { gradient: "from-[#10231a] via-[#2e5a3e] to-[#090f0c]" },
  "wings-right": { gradient: "from-[#0f1f35] via-[#2c4a7a] to-[#080d18]" },
  jewel: { gradient: "from-[#2b2110] via-[#6b5320] to-[#100c05]" },
  sketch: { gradient: "from-[#2b2723] via-[#5a5148] to-[#100f0e]" },
  "mood-rose": { gradient: "from-[#2a141b] via-[#7a3b52] to-[#120a0e]" },
  "mood-sage": { gradient: "from-[#14231a] via-[#3d5a3a] to-[#0a110c]" },
  "mood-lavender": { gradient: "from-[#1b1830] via-[#4c3f7a] to-[#0c0a18]" },
};

/** All cards share one fixed size so the gallery looks uniform. */
const CARD_RATIO = "aspect-[4/5]";

export function ArtworkFrame({
  item,
  title,
  meta,
  desc,
  medium,
  index,
  liveLabel = "Live demo",
  codeLabel = "Source code",
}: {
  item: GalleryItem;
  title: string;
  meta: string;
  desc: string;
  medium: string;
  index: number;
  liveLabel?: string;
  codeLabel?: string;
}) {
  const t = treatmentStyle[item.treatment];

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-[0_18px_45px_-20px_rgba(80,60,40,0.35)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(120,70,90,0.4)]"
    >
      {/* gradient cover instead of photo */}
      <div className={cn("relative overflow-hidden", CARD_RATIO)}>
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            t.gradient,
          )}
        />
        {/* soft decorative shapes */}
        <div
          aria-hidden="true"
          className="absolute -top-14 -right-14 h-52 w-52 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-14 h-60 w-60 rounded-full bg-black/40 blur-2xl"
        />
        {/* darken the image so the overlaid text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

        {/* badge — top right of the card */}
        <div className="absolute top-4 right-4">
          <Badge variant="gold" className="shadow-lg">
            ✦ {medium}
          </Badge>
        </div>

        {/* full details — directly on the picture, no box */}
        <figcaption className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display mt-2 text-xl leading-tight font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {title}
          </h3>
          <p className="handwritten mt-0.5 text-xs text-white/75 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {meta}
          </p>
          <p className="mt-2 text-sm leading-7 text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {desc}
          </p>
            {item.liveUrl || item.githubUrl ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow transition hover:bg-white/85"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {liveLabel}
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                ) : null}
                {item.githubUrl ? (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    <CodeXml className="h-3.5 w-3.5" />
                    {codeLabel}
                  </a>
                ) : null}
              </div>
            ) : null}
        </figcaption>
      </div>
    </motion.figure>
  );
}
