"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { SmartImage } from "@/components/atelier/smart-image";
import { HERO_IMG, type GalleryItem } from "@/data/atelier";
import { cn } from "@/lib/utils";

const treatmentStyle: Record<
  GalleryItem["treatment"],
  { img: string; veil: string; label: string }
> = {
  full: {
    img: "object-top scale-100",
    veil: "from-white/0 via-transparent to-[#3d322a]/25",
    label: "full portrait",
  },
  closeup: {
    img: "object-top scale-[1.9]",
    veil: "from-[#fff1f3]/30 via-transparent to-[#8a3b52]/25",
    label: "face study",
  },
  "wings-left": {
    img: "object-left scale-[1.7]",
    veil: "from-[#f2f8f0]/40 via-transparent to-[#3d5a3a]/25",
    label: "wing study",
  },
  "wings-right": {
    img: "object-right scale-[1.7]",
    veil: "from-[#e0f2fe]/50 via-transparent to-[#1e3a5f]/25",
    label: "wing study",
  },
  jewel: {
    img: "object-center scale-[1.6]",
    veil: "from-[#fdf6e3]/50 via-transparent to-[#6b5320]/30",
    label: "jewelry detail",
  },
  sketch: {
    img: "object-center scale-100 saturate-[0.35] contrast-[1.05]",
    veil: "from-white/70 via-white/20 to-[#6d5f4f]/20",
    label: "pencil sketch",
  },
  "mood-rose": {
    img: "object-top scale-[1.25]",
    veil: "from-[#fff1f3]/70 via-[#f9dbe3]/20 to-[#8a3b52]/20",
    label: "rose mood",
  },
  "mood-sage": {
    img: "object-center scale-[1.3]",
    veil: "from-[#f2f8f0]/70 via-[#d9e9d4]/25 to-[#3d5a3a]/20",
    label: "sage mood",
  },
  "mood-lavender": {
    img: "object-top scale-[1.35]",
    veil: "from-[#f4f0ff]/70 via-[#ddd0f7]/25 to-[#4c3f7a]/20",
    label: "lavender mood",
  },
};

const ratioClass: Record<GalleryItem["ratio"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
};

export function ArtworkFrame({
  item,
  title,
  meta,
  medium,
  index,
}: {
  item: GalleryItem;
  title: string;
  meta: string;
  medium: string;
  index: number;
}) {
  const [open, setOpen] = React.useState(false);
  const t = treatmentStyle[item.treatment];

  return (
    <>
      <motion.figure
        layout
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-[0_18px_45px_-20px_rgba(80,60,40,0.35)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:rotate-[0.4deg] hover:shadow-[0_30px_60px_-20px_rgba(120,70,90,0.4)]",
          ratioClass[item.ratio],
        )}
        onClick={() => setOpen(true)}
      >
        {/* base wash so every tile feels finished even while image loads */}
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
        <div className={cn("absolute inset-0 bg-gradient-to-t", t.veil)} />

        {/* top metadata row */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <Badge variant="pastel" className="shadow-sm">
            № {String(index + 1).padStart(2, "0")} · {item.year}
          </Badge>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* bottom reveal */}
        <figcaption className="absolute inset-x-0 bottom-0 p-4">
          <div className="rounded-3xl border border-white/60 bg-white/75 p-4 backdrop-blur-md transition-all duration-500 group-hover:bg-white/90">
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              {medium} · {t.label}
            </p>
            <h3 className="font-display mt-1 text-xl leading-tight font-semibold">
              {title}
            </h3>
            <p className="handwritten mt-0.5 text-xs text-muted-foreground">
              {meta}
            </p>
          </div>
        </figcaption>
      </motion.figure>

      <Dialog open={open} onOpenChange={setOpen} className="max-w-3xl">
        <div className="grid sm:grid-cols-2">
          <SmartImage
            src={HERO_IMG}
            alt={title}
            wrapperClassName="relative min-h-[20rem]"
            imgClassName={cn("absolute inset-0", t.img)}
          />
          <div className="p-7">
            <Badge variant="gold">✦ {medium}</Badge>
            <h3 className="font-display mt-3 text-3xl font-semibold">
              {title}
            </h3>
            <p className="handwritten mt-1 text-sm text-muted-foreground">
              {meta}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Dummy artwork view — replace <code>/images/main.png</code> crops
              with the real layered files for this piece. Year {item.year}.
            </p>
          </div>
        </div>
      </Dialog>
    </>
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
