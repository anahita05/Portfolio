"use client";

import * as React from "react";
import { motion, type MotionStyle } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type SmartImageProps = {
  src: string;
  alt: string;
  /** classes for the outer wrapper (sizing / aspect / rounded / overflow) */
  wrapperClassName?: string;
  /** classes for the <img> itself (object-cover, scale, etc.) */
  imgClassName?: string;
  /** skeleton tint while loading */
  skeletonClassName?: string;
  loading?: "lazy" | "eager";
  ariaHidden?: boolean;
  /** when provided, renders a motion.img with parallax style (e.g. { y }) */
  motionStyle?: MotionStyle;
};

/**
 * shadcn-style image: shows a <Skeleton /> behind every image
 * until it fires onLoad / onError. Use for ALL images.
 */
export function SmartImage({
  src,
  alt,
  wrapperClassName,
  imgClassName,
  skeletonClassName,
  loading = "lazy",
  ariaHidden,
  motionStyle,
}: SmartImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // Cached images can skip onLoad — mark ready if already complete.
  React.useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [src]);

  const handleRef = React.useCallback((el: HTMLImageElement | null) => {
    imgRef.current = el;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {!loaded && (
        <Skeleton
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full rounded-none",
            skeletonClassName
          )}
        />
      )}
      {motionStyle ? (
        <motion.img
          ref={handleRef}
          src={src}
          alt={alt}
          loading={loading}
          aria-hidden={ariaHidden}
          style={motionStyle}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={cn(
            "block h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      ) : (
        <img
          ref={handleRef}
          src={src}
          alt={alt}
          loading={loading}
          aria-hidden={ariaHidden}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={cn(
            "block h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
