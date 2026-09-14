import * as React from "react";
import { cn } from "@/lib/utils";

function Separator({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-primary-200 to-transparent",
        className
      )}
    />
  );
}

export { Separator };
