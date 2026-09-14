import * as React from "react";
import { cn } from "@/lib/utils";

function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-gradient-to-br from-[#fdf6e3] via-[#f3dfe6] to-[#dfe9dc] text-sm font-bold text-[#5a4a33] shadow-md",
        className
      )}
    >
      {children}
    </span>
  );
}

export { Avatar };
