import { Cormorant_Garamond, Vazirmatn } from "next/font/google";

// Self-hosted portfolio fonts (replaces the old CDN <link> tags).
// One Latin display family + one Persian/Arabic family, exposed as CSS vars
// and applied globally in layout.tsx + globals.css.

export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const bodyFont = Vazirmatn({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const portfolioFontClass = `${displayFont.variable} ${bodyFont.variable}`;
