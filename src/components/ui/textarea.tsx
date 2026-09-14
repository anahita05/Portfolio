import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[130px] w-full rounded-3xl border border-border bg-white/70 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur transition-all duration-300 outline-none placeholder:text-muted-foreground focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
