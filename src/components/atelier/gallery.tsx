"use client";

import { motion } from "framer-motion";
import { galleryItems } from "@/data/atelier";
import { ArtworkFrame } from "./artwork-frame";

export function Gallery({
  tx,
}: {
  tx: (key: string) => string;
}) {
  return (
    <div>
      <motion.div layout className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, i) => (
          <ArtworkFrame
            key={item.id}
            item={item}
            index={i}
            title={tx(item.titleKey)}
            meta={tx(item.metaKey)}
            desc={tx(`${item.id}D`)}
            medium={tx(item.mediumKey)}
            liveLabel={tx("viewLive")}
            codeLabel={tx("viewCode")}
          />
        ))}
      </motion.div>
    </div>
  );
}
