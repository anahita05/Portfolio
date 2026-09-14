"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button
        aria-label="Close menu"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-[#2e2620]/45 backdrop-blur-sm"
      />
      <div
        className={cn(
          "absolute top-3 bottom-3 left-3 flex w-[19rem] flex-col rounded-[2rem] border border-white/60 bg-[#fffdf7]/95 p-6 shadow-2xl backdrop-blur-xl"
        )}
      >
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#2e2620] text-white"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export { Sheet };
