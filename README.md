# Anahita Golmohammadi — Front-End Developer Portfolio

Personal bilingual portfolio for **Anahita Golmohammadi**, Front-End Developer (React + TypeScript). Built with Next.js App Router, next-intl (fa/en), Tailwind CSS, Framer Motion, Zustand and shadcn/ui.

Live sections: Hero → Featured work → Project gallery → About → Skills → Contact.

## Features

- Bilingual `fa` / `en` with RTL/LTR switching (`next-intl`, locale-prefixed routes `/fa`, `/en`)
- 3 themes: `light` / `dark` / `red` via `data-theme` + Zustand + localStorage (`app-theme-storage`), no-flash `ThemeInitializer`
- Hero art composition with parallax + floating cards (`public/images/main.png`, themed counterparts `main-dark.png` / `main-red.png` with slow crossfade)
- Featured projects (Cake Shop e-commerce, Tweeter full-stack clone, Quera bootcamp team projects)
- Filterable project gallery (Front-End / Full-Stack / Team / UI)
- About + Skills + Contact with `mailto:` CTA (`anahita.sllp2000@gmail.com`) and mailto-based contact form
- Animations: Framer Motion reveals, floats, scroll parallax
- UI: shadcn/ui + Tailwind + Lucide icons

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `>= 20.11.0` LTS (min `18.18.0`) |
| pnpm | `>= 9.0.0` (`npm install -g pnpm`) |

```bash
node -v
pnpm -v
```

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000 → redirects to /fa
pnpm build
pnpm start
pnpm lint
```

## Main packages

| Package | Version | Use |
|---------|---------|-----|
| `next` | 16.3.0 | App Router framework |
| `react` / `react-dom` | 19.2.8 | UI |
| `next-intl` | 4.13.5 | i18n fa/en |
| `tailwindcss` | 4.3.3 | styling |
| `framer-motion` | 13.2.0 | animations |
| `zustand` | 5.0.14 | theme store + persistence |
| `lucide-react` | 1.28.0 | icons |
| `class-variance-authority`, `clsx`, `tailwind-merge` | — | shadcn/ui utilities |

## Project structure

```text
src/
├── app/
│   ├── globals.css
│   └── [locale]/
│       ├── layout.tsx   # html lang/dir, NextIntlClientProvider, Navbar/Footer
│       ├── page.tsx     # PortfolioLanding
│       └── about/page.tsx
├── components/
│   ├── portfolio-landing.tsx  # all landing sections
│   ├── atelier/       # atmosphere, reveal, section-heading, gallery, artwork-frame, contact-form, smart-image
│   ├── layout/        # navbar, footer
│   ├── common/        # theme-switcher, theme-initializer, locale-switcher
│   └── ui/            # shadcn/ui primitives
├── data/
│   ├── atelier.ts     # HERO_IMG, galleryItems, galleryFilters
│   └── portfolio.ts   # portfolioFallback (synced from messages/en.json)
├── i18n/              # routing, request, navigation
├── store/useThemeStore.ts
└── lib/utils.ts

messages/
├── en.json
└── fa.json
public/images/main.png
```

## Customization

- Hero / gallery image: replace `public/images/main.png` (keep transparency for best look, `HERO_IMG` in `src/data/atelier.ts`); themed counterparts are `main-dark.png` (`HERO_IMG_DARK`) and `main-red.png` (`HERO_IMG_RED`)
- Texts: edit `messages/en.json` + `messages/fa.json` → `Portfolio` namespace. `portfolioFallback` auto-syncs from `en.json`, missing keys fall back gracefully via `useTx()` + `t.has()` guard
- Email / links: `contactDesc`, `bullet1-3` in messages + `mailto:` in `src/components/portfolio-landing.tsx` and `src/components/atelier/contact-form.tsx` (currently `anahita.sllp2000@gmail.com`, `github.com/anahita05`)
- Themes: CSS variables for `[data-theme="light"|"dark"|"red"]` in `src/app/globals.css`
- Gallery: add/remove items in `src/data/atelier.ts` + matching `g*T` / `g*M` keys in messages


## Deploy

Any Node host works. Vercel recommended:

```bash
pnpm build
```

Push to GitHub → Import in Vercel → defaults work, no env vars required.
