import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "@/components/StarBorder.css";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-600",
        outline:
          "border border-border bg-transparent hover:bg-primary-50 text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
        ghost: "hover:bg-primary-50",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Enable the React-Bits StarBorder animated glow. Defaults to true (except icon buttons). */
  withStarBorder?: boolean;
  /** Star glow color. Defaults to a gold that reads on light + dark buttons. */
  starColor?: string;
  /** Animation duration, e.g. "6s". */
  starSpeed?: React.CSSProperties["animationDuration"];
}

function StarLayers({
  color,
  speed,
}: {
  color: string;
  speed: React.CSSProperties["animationDuration"];
}) {
  const bg = `radial-gradient(circle, ${color}, transparent 10%)`;
  return (
    <>
      <span
        aria-hidden="true"
        className="border-gradient-bottom"
        style={{ background: bg, animationDuration: speed }}
      />
      <span
        aria-hidden="true"
        className="border-gradient-top"
        style={{ background: bg, animationDuration: speed }}
      />
    </>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      withStarBorder,
      starColor = "#f5d67b",
      starSpeed = "6s",
      children,
      ...props
    },
    ref
  ) => {
    const enableStar = withStarBorder ?? size !== "icon";

    // asChild uses Radix Slot which requires a single child element.
    // Wrap the slotted element in a star-border shell so `asChild` links
    // (<a>, next-intl <Link>, …) also get the effect.
    if (asChild) {
      return (
        <span
          className={cn(
            buttonVariants({ variant, size }),
            enableStar && "btn-star-border",
            className
          )}
        >
          {enableStar && <StarLayers color={starColor} speed={starSpeed} />}
          <Slot
            ref={ref as React.Ref<HTMLElement>}
            {...(props as React.HTMLAttributes<HTMLElement>)}
            className="btn-star-inner"
          >
            {children}
          </Slot>
        </span>
      );
    }

    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          enableStar && "btn-star-border",
          className
        )}
        ref={ref}
        {...props}
      >
        {enableStar && <StarLayers color={starColor} speed={starSpeed} />}
        <span className="btn-star-inner">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
