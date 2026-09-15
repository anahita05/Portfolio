"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { galleryFilters, galleryItems, type GalleryCategory } from "@/data/atelier";
import { ArtworkFrame } from "./artwork-frame";

export function Gallery({
  tx,
}: {
  tx: (key: string) => string;
}) {
  const [filter, setFilter] = React.useState<"all" | GalleryCategory>("all");
  const items = galleryItems.filter((g) => {
    return filter === "all" || g.category === filter;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            {galleryFilters.map((f) => (
              <TabsTrigger key={f.id} value={f.id}>
                {tx(f.labelKey)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <motion.div layout className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <ArtworkFrame
              key={item.id}
              item={item}
              index={i}
              title={tx(item.titleKey)}
              meta={tx(item.metaKey)}
              medium={tx(item.mediumKey)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
