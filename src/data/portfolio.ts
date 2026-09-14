import {
  Brush,
  Eye,
  Feather,
  Gem,
  Layers,
  Link2,
  Palette,
  Scan,
  Shirt,
  type LucideIcon,
} from "lucide-react";

export type BreakdownItem = {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  tagKey: string;
};

export type WorkItem = {
  titleKey: string;
  catKey: string;
  grad: string;
  emoji: string;
  image?: string;
};

export type ServiceItem = {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  priceKey: string;
};

export type StepItem = {
  n: string;
  titleKey: string;
  descKey: string;
};

export const heroImage = "/images/main.png";

export const heroStats: Array<[string, string]> = [
  ["stat1N", "stat1L"],
  ["stat2N", "stat2L"],
  ["stat3N", "stat3L"],
];

export const breakdown: BreakdownItem[] = [
  { icon: Gem, titleKey: "card1T", descKey: "card1D", tagKey: "card1Tag" },
  { icon: Eye, titleKey: "card2T", descKey: "card2D", tagKey: "card2Tag" },
  { icon: Shirt, titleKey: "card3T", descKey: "card3D", tagKey: "card3Tag" },
  { icon: Feather, titleKey: "card4T", descKey: "card4D", tagKey: "card4Tag" },
  { icon: Scan, titleKey: "card5T", descKey: "card5D", tagKey: "card5Tag" },
  { icon: Link2, titleKey: "card6T", descKey: "card6D", tagKey: "card6Tag" },
];

// Generic creative-portfolio dummy works.
// Replace `image` with your own files in public/images/ to go fully visual.
export const works: WorkItem[] = [
  {
    titleKey: "work1T",
    catKey: "work1C",
    grad: "from-[#ffffff] via-[#e0f2fe] to-[#f5d67b]",
    emoji: "◍",
  },
  {
    titleKey: "work2T",
    catKey: "work2C",
    grad: "from-[#f0f9ff] via-[#bae6fd] to-[#e9d5a1]",
    emoji: "✦",
  },
  {
    titleKey: "work3T",
    catKey: "work3C",
    grad: "from-[#ffffff] via-[#e8f4fd] to-[#d9c9a8]",
    emoji: "☾",
  },
  {
    titleKey: "work4T",
    catKey: "work4C",
    grad: "from-[#f8fafc] via-[#dbeafe] to-[#c9a86a]",
    emoji: "❀",
  },
];

export const services: ServiceItem[] = [
  { icon: Brush, titleKey: "srv1T", descKey: "srv1D", priceKey: "srv1P" },
  { icon: Layers, titleKey: "srv2T", descKey: "srv2D", priceKey: "srv2P" },
  { icon: Gem, titleKey: "srv3T", descKey: "srv3D", priceKey: "srv3P" },
  { icon: Palette, titleKey: "srv4T", descKey: "srv4D", priceKey: "srv4P" },
];

export const steps: StepItem[] = [
  { n: "01", titleKey: "step1T", descKey: "step1D" },
  { n: "02", titleKey: "step2T", descKey: "step2D" },
  { n: "03", titleKey: "step3T", descKey: "step3D" },
  { n: "04", titleKey: "step4T", descKey: "step4D" },
];

// Plain-English fallback (used if a translation key is missing).
// Keep this in sync with messages/en.json -> Portfolio.
export const portfolioFallback = {
  sheetNo: "portfolio nº 04 — visual artist",
  badge: "Portfolio • designer & illustrator",
  titleA: "Creative designer",
  titleB: "visual stories",
  subtitle:
    "I'm a multidisciplinary designer focused on branding, illustration and clean visual storytelling. This portfolio collects selected character work, costume details and recent commissions.",
  ctaWork: "View selected works",
  ctaContact: "Get in touch",
  note: "Hero art: public/images/main.png (transparent PNG)",
  stat1N: "+120",
  stat1L: "projects delivered",
  stat2N: "6 yrs",
  stat2L: "design experience",
  stat3N: "40+",
  stat3L: "happy clients",
  marquee: "branding • illustration • character design • visual identity • commissions • art direction",
};
