"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useRef } from "react";
import {
  animateButtonGrow,
  animateButtonReset,
} from "@/lib/motion/animeButtonHover";

type HoverGrowLinkProps = ComponentProps<typeof Link>;

export function HoverGrowLink({
  className,
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}: HoverGrowLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      className={className}
      style={{ display: "inline-flex", transformOrigin: "center", ...style }}
      onMouseEnter={(event) => {
        if (ref.current) animateButtonGrow(ref.current);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (ref.current) animateButtonReset(ref.current);
        onMouseLeave?.(event);
      }}
      {...props}
    />
  );
}
