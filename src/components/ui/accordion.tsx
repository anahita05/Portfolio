"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function AccordionItem({
  title,
  meta,
  children,
  defaultOpen,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur transition-all duration-300",
        open && "shadow-lg"
      )}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span>
          <span className="font-display text-lg font-semibold">{title}</span>
          {meta ? (
            <span className="mt-1 block text-xs tracking-wide text-muted-foreground">{meta}</span>
          ) : null}
        </span>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2e2620] text-[#f7f1e5] transition-transform duration-300",
            open && "rotate-180"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-400",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-7 text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

export { AccordionItem };
