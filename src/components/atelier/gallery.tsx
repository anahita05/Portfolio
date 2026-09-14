"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { galleryFilters, galleryItems, type GalleryCategory } from "@/data/atelier";
import { ArtworkFrame } from "./artwork-frame";

export function Gallery({
  tx,
}: {
  tx: (key: string) => string;
}) {
  const [filter, setFilter] = React.useState<"all" | GalleryCategory>("all");
  const [query, setQuery] = React.useState("");
  const items = galleryItems.filter((g) => {
    const inFilter = filter === "all" || g.category === filter;
    const q = query.trim().toLowerCase();
    if (!q) return inFilter;
    return (
      inFilter &&
      (tx(g.titleKey).toLowerCase().includes(q) ||
        tx(g.metaKey).toLowerCase().includes(q) ||
        g.year.includes(q))
    );
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

        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search works…"
            aria-label="Search works"
            className="pl-10"
          />
        </div>
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
