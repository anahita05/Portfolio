"use client";

import { motion } from "framer-motion";
import { CodeXml, ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SmartImage } from "@/components/atelier/smart-image";
import { HERO_IMG, type GalleryItem } from "@/data/atelier";
import { cn } from "@/lib/utils";

const treatmentStyle: Record<
  GalleryItem["treatment"],
  { img: string; veil: string }
> = {
  full: {
    img: "object-top scale-100",
    veil: "from-white/0 via-transparent to-[#3d322a]/25",
  },
  closeup: {
    img: "object-top scale-[1.9]",
    veil: "from-[#fff1f3]/30 via-transparent to-[#8a3b52]/25",
  },
  "wings-left": {
    img: "object-left scale-[1.7]",
    veil: "from-[#f2f8f0]/40 via-transparent to-[#3d5a3a]/25",
  },
  "wings-right": {
    img: "object-right scale-[1.7]",
    veil: "from-[#e0f2fe]/50 via-transparent to-[#1e3a5f]/25",
  },
  jewel: {
    img: "object-center scale-[1.6]",
    veil: "from-[#fdf6e3]/50 via-transparent to-[#6b5320]/30",
  },
  sketch: {
    img: "object-center scale-100 saturate-[0.35] contrast-[1.05]",
    veil: "from-white/70 via-white/20 to-[#6d5f4f]/20",
  },
  "mood-rose": {
    img: "object-top scale-[1.25]",
    veil: "from-[#fff1f3]/70 via-[#f9dbe3]/20 to-[#8a3b52]/20",
  },
  "mood-sage": {
    img: "object-center scale-[1.3]",
    veil: "from-[#f2f8f0]/70 via-[#d9e9d4]/25 to-[#3d5a3a]/20",
  },
  "mood-lavender": {
    img: "object-top scale-[1.35]",
    veil: "from-[#f4f0ff]/70 via-[#ddd0f7]/25 to-[#4c3f7a]/20",
  },
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
      {/* image with dark overlay — all text lives inside the image */}
      <div className={cn("relative overflow-hidden", CARD_RATIO)}>
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            veilFallback(item.treatment),
          )}
        />
        <SmartImage
          src={HERO_IMG}
          alt={title}
          wrapperClassName="absolute inset-0"
          imgClassName={cn(
            "absolute inset-0 transition-all duration-700 ease-out",
            t.img,
          )}
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

function veilFallback(treatment: GalleryItem["treatment"]) {
  switch (treatment) {
    case "mood-rose":
      return "from-[#fff1f3] to-[#f9dbe3]";
    case "mood-sage":
      return "from-[#f2f8f0] to-[#d9e9d4]";
    case "mood-lavender":
      return "from-[#f4f0ff] to-[#ddd0f7]";
    case "sketch":
      return "from-white to-[#eee7d6]";
    default:
      return "from-[#fffdf7] to-[#f3e9d2]";
  }
}
