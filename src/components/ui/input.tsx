import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-border bg-white/70 px-4 text-sm text-foreground shadow-sm backdrop-blur transition-all duration-300 outline-none placeholder:text-muted-foreground focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
