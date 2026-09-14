export type GalleryCategory =
  | "characters"
  | "illustration"
  | "concept"
  | "commissions";

export type GalleryItem = {
  id: string;
  titleKey: string;
  metaKey: string;
  category: GalleryCategory;
  // visual treatment reusing the single hero cutout + gradients
  treatment:
    | "full"
    | "closeup"
    | "wings-left"
    | "wings-right"
    | "jewel"
    | "sketch"
    | "mood-rose"
    | "mood-sage"
    | "mood-lavender";
  ratio: "tall" | "square" | "wide" | "portrait";
  year: string;
  mediumKey: string;
};

export const galleryFilters: Array<{
  id: "all" | GalleryCategory;
  labelKey: string;
}> = [
  { id: "all", labelKey: "filterAll" },
  { id: "characters", labelKey: "filterCharacters" },
  { id: "illustration", labelKey: "filterIllustration" },
  { id: "concept", labelKey: "filterConcept" },
  { id: "commissions", labelKey: "filterCommissions" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    titleKey: "g1T",
    metaKey: "g1M",
    category: "characters",
    treatment: "full",
    ratio: "tall",
    year: "2025",
    mediumKey: "mChar",
  },
  {
    id: "g2",
    titleKey: "g2T",
    metaKey: "g2M",
    category: "illustration",
    treatment: "mood-rose",
    ratio: "square",
    year: "2025",
    mediumKey: "mIllus",
  },
  {
    id: "g3",
    titleKey: "g3T",
    metaKey: "g3M",
    category: "concept",
    treatment: "sketch",
    ratio: "wide",
    year: "2024",
    mediumKey: "mConcept",
  },
  {
    id: "g4",
    titleKey: "g4T",
    metaKey: "g4M",
    category: "characters",
    treatment: "closeup",
    ratio: "portrait",
    year: "2025",
    mediumKey: "mChar",
  },
  {
    id: "g5",
    titleKey: "g5T",
    metaKey: "g5M",
    category: "commissions",
    treatment: "jewel",
    ratio: "square",
    year: "2024",
    mediumKey: "mComm",
  },
  {
    id: "g6",
    titleKey: "g6T",
    metaKey: "g6M",
    category: "illustration",
    treatment: "mood-sage",
    ratio: "tall",
    year: "2024",
    mediumKey: "mIllus",
  },
  {
    id: "g7",
    titleKey: "g7T",
    metaKey: "g7M",
    category: "concept",
    treatment: "wings-left",
    ratio: "wide",
    year: "2025",
    mediumKey: "mConcept",
  },
  {
    id: "g8",
    titleKey: "g8T",
    metaKey: "g8M",
    category: "commissions",
    treatment: "mood-lavender",
    ratio: "portrait",
    year: "2025",
    mediumKey: "mComm",
  },
  {
    id: "g9",
    titleKey: "g9T",
    metaKey: "g9M",
    category: "characters",
    treatment: "wings-right",
    ratio: "square",
    year: "2024",
    mediumKey: "mChar",
  },
];

export const HERO_IMG = "/images/main.png";
