"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Tooltip({
  tip,
  children,
  className,
}: {
  tip: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [show, setShow] = React.useState(false);
  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute -top-9 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/60 bg-[#2e2620] px-3 py-1 text-[11px] whitespace-nowrap text-[#f7f1e5] shadow-lg transition-all duration-200",
          show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        {tip}
      </span>
    </span>
  );
}

export { Tooltip };
