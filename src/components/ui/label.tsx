import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-[11px] font-bold tracking-[0.18em] text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
