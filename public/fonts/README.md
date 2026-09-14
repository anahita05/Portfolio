# Fonts

Portfolio fonts are self-hosted with `next/font/google` (see `src/app/fonts/portfolio-font.ts`):

- Display (latin): Cormorant Garamond 500/600 + italic
- Body (latin + arabic, covers Persian): Vazirmatn 400–700

They are exposed as CSS variables:

- `--font-display`
- `--font-body`

And applied globally in `src/app/[locale]/layout.tsx` via `portfolioFontClass`
plus `src/app/globals.css` (`body`, `.font-display`, `.handwritten`).

To use fully local .woff2 files instead, drop them here (e.g.
`vazirmatn-regular.woff2`, `cormorant-600.woff2`) and add `@font-face`
rules in `globals.css`. next/font is preferred because it auto-hosts,
subsets and preloads the fonts at build time.
