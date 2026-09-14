import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm",
        outline: "border-border bg-card/70 text-foreground backdrop-blur",
        pastel:
          "border-white/60 bg-white/60 text-foreground backdrop-blur",
        gold: "border-[#e6c87a]/60 bg-gradient-to-r from-[#fdf6e3] to-[#f5d67b]/60 text-[#6b5320]",
        rose: "border-[#f3c6d3]/60 bg-gradient-to-r from-[#fff1f3] to-[#f9dbe3]/70 text-[#8a3b52]",
        sage: "border-[#cfe3cf]/60 bg-gradient-to-r from-[#f2f8f0] to-[#d9e9d4]/70 text-[#3d5a3a]",
        lavender:
          "border-[#d9cff3]/60 bg-gradient-to-r from-[#f4f0ff] to-[#ddd0f7]/70 text-[#4c3f7a]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
