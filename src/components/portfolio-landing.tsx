"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Brush,
  CodeXml,
  ExternalLink,
  Eye,
  Feather,
  Gem,
  Layers,
  Link2,
  Mail,
  Palette,
  Scan,
  Send,
  Shirt,
  Sparkles,
  Star,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Atmosphere } from "@/components/atelier/atmosphere";
import { Reveal } from "@/components/atelier/reveal";
import { SectionHeading } from "@/components/atelier/section-heading";
import { Gallery } from "@/components/atelier/gallery";
import { ContactForm } from "@/components/atelier/contact-form";
import { SmartImage } from "@/components/atelier/smart-image";
import { SecretVault } from "@/components/vault/secret-vault";
import { HERO_IMG } from "@/data/atelier";
import {
  CAKE_SHOP_GITHUB_URL,
  CAKE_SHOP_LIVE_URL,
  TWEETER_GITHUB_URL,
  TWEETER_LIVE_URL,
  SOCIALLY_QBC_GITHUB_URL,
  TODO_QBC_GITHUB_URL,
  portfolioFallback,
} from "@/data/portfolio";
import { useThemeStore } from "@/store/useThemeStore";

const breakdownIcons = [Gem, Eye, Shirt, Feather, Scan, Link2];
const serviceIcons = [Brush, Layers, Gem, Palette, Eye, Feather];

function useTx() {
  const t = useTranslations("Portfolio");
  return React.useCallback(
    (key: string) => {
      try {
        // `has` avoids throwing + avoids next-intl MISSING_MESSAGE console spam
        const hasFn = (t as unknown as { has?: (k: string) => boolean }).has;
        if (typeof hasFn === "function") {
          if (!hasFn.call(t, key)) {
            return (portfolioFallback as Record<string, string>)[key] ?? key;
          }
          return t(key);
        }
        return t(key);
      } catch {
        return (portfolioFallback as Record<string, string>)[key] ?? key;
      }
    },
    [t],
  );
}

export function PortfolioLanding() {
  const tx = useTx();
  const theme = useThemeStore((s) => s.theme);
  // Accent stays readable on glass: deepen it on the light stage, lift it on dark stages.
  const accentMix = theme === "light" ? "75%, #2e2620" : "60%, white";
  const reduce = useReducedMotion();
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const cardAY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const cardBY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);

  const skillAccents = [
    "#c9a13a",
    "#b0526b",
    "#5a7a54",
    "#7a6fb5",
    "#c97a3a",
    "#4a7fa5",
  ];

  const skills = [
    ...[1, 2, 3, 4, 5, 6].map((i) => ({
      icon: serviceIcons[i - 1],
      title: tx(`srv${i}T`),
      desc: tx(`srv${i}D`),
      tag: tx(`srv${i}P`),
      accent: skillAccents[(i - 1) % skillAccents.length],
    })),
    ...[1, 2, 3, 4, 5, 6].map((i) => ({
      icon: breakdownIcons[i - 1],
      title: tx(`card${i}T`),
      desc: tx(`card${i}D`),
      tag: tx(`card${i}Tag`),
      accent: skillAccents[(i + 2) % skillAccents.length],
    })),
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Atmosphere />

      {/* ============ HERO ============ */}
      <section
        id="top"
        ref={heroRef}
        className="relative mx-auto max-w-6xl px-6 pt-24 pb-6 sm:pt-16 lg:pt-12"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          {/* copy */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="handwritten flex items-center gap-2 text-sm text-primary-600">
              <Star className="h-3.5 w-3.5 fill-[#c9a13a] text-[#c9a13a]" />
              {tx("sheetNo")}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[#c9a13a]" />
              {tx("badge")}
            </div>
            <h1 className="font-display mt-5 text-[2.9rem] leading-[0.98] font-semibold text-balance sm:text-7xl">
              {tx("titleA")}
              <br />
              <span className="relative inline-block italic text-primary-600">
                {tx("titleB")}
                <svg
                  viewBox="0 0 220 14"
                  className="absolute -bottom-2 left-0 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10 C 60 3, 160 3, 216 8"
                    fill="none"
                    stroke="#c9a13a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl leading-8 text-muted-foreground">
              {tx("subtitle")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <motion.span
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-7 text-base shadow-lg"
                >
                  <a href="#gallery">
                    {tx("ctaWork")}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </motion.span>
              <motion.span
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-white/70 px-7 backdrop-blur"
                >
                  <a href="#contact">
                    <Mail className="h-4 w-4" />
                    {tx("ctaContact")}
                  </a>
                </Button>
              </motion.span>
            </div>
          </motion.div>

          {/* art composition — overlapping, parallax, floating */}
          <div className="relative mx-auto w-full max-w-120">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <SmartImage
                src={HERO_IMG}
                alt="fallen angel hero"
                loading="eager"
                motionStyle={{ y: artY }}
                hoverZoom={false}
                wrapperClassName="hero-main-cutout relative z-10 h-auto w-full overflow-visible bg-transparent"
                imgClassName="h-auto bg-transparent object-contain [transform:none!important]"
                skeletonClassName="rounded-[3rem] bg-transparent animate-none"
              />

              {/* escaping polaroid: close-up */}
              <motion.div
                style={{ y: cardAY }}
                className="animate-float-soft absolute top-6 -left-4 z-20 w-32 rotate-[-7deg] overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl sm:-left-10 sm:w-36"
              >
                <SmartImage
                  src={HERO_IMG}
                  alt="face study"
                  wrapperClassName="aspect-square w-full"
                  imgClassName="scale-[1.9] object-top"
                />
                <p className="handwritten px-2 py-1.5 text-center text-[10px]">
                  love design ↘
                </p>
              </motion.div>

              {/* escaping card: wing */}
              <motion.div
                style={{ y: cardBY }}
                className="animate-float-soft absolute right-0 bottom-24 z-20 w-36 rotate-[5deg] overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl sm:-right-6 sm:w-40"
                aria-hidden="false"
              >
                <SmartImage
                  src={HERO_IMG}
                  alt="wing study"
                  wrapperClassName="aspect-[4/3] w-full"
                  imgClassName="scale-[1.7] object-right"
                />
                <p className="handwritten px-2 py-1.5 text-center text-[10px]">
                  love design ♥
                </p>
              </motion.div>

              {/* floating badges */}
              <motion.div
                style={{ y: cardAY }}
                className="absolute -top-2 right-4 z-20 rotate-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-lg backdrop-blur"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold">
                  <Gem className="h-3.5 w-3.5 text-[#c9a13a]" /> love design
                </p>
                <p className="handwritten mt-0.5 text-[11px] text-muted-foreground">
                  crafted with ♥ ✦
                </p>
              </motion.div>
              <motion.div
                style={{ y: cardBY }}
                className="absolute bottom-8 -left-2 z-20 rotate-[-4deg] rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-lg backdrop-blur sm:-left-8"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold">
                  <Eye className="h-3.5 w-3.5 text-[#b0526b]" /> love details
                </p>
                <p className="handwritten mt-0.5 text-[11px] text-muted-foreground">
                  made with love ♡
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* marquee ribbon */}
        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-full border border-white/70 bg-white/60 py-3 shadow-sm backdrop-blur">
            <p className="handwritten text-center text-sm tracking-wide text-primary-700">
              ✦ {tx("marquee")} ✦
            </p>
          </div>
          <a
            href="#featured"
            aria-label="scroll"
            className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur transition hover:text-foreground"
          >
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" /> scroll into the
            atelier
          </a>
        </Reveal>
      </section>

      {/* ============ FEATURED ============ */}
      <section
        id="featured"
        className="relative mx-auto max-w-6xl scroll-mt-28 px-6 pt-14"
      >
        <span id="works" className="absolute -top-24" aria-hidden="true" />
        <SectionHeading
          index="01"
          eyebrow={tx("featuredKicker")}
          title={tx("featuredTitle")}
          copy={tx("featuredDesc")}
        />
        <div className="relative mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              tag: tx("featTag1"),
              title: tx("feat1T"),
              desc: tx("feat1D"),
              img: "object-top scale-100",
              links: [
                { kind: "live" as const, url: CAKE_SHOP_LIVE_URL },
                { kind: "code" as const, url: CAKE_SHOP_GITHUB_URL },
              ],
            },
            {
              tag: tx("featTag2"),
              title: tx("feat2T"),
              desc: tx("feat2D"),
              img: "object-top scale-[1.9]",
              links: [
                { kind: "live" as const, url: TWEETER_LIVE_URL },
                { kind: "code" as const, url: TWEETER_GITHUB_URL },
              ],
            },
            {
              tag: tx("featTag3"),
              title: tx("feat3T"),
              desc: tx("feat3D"),
              img: "object-right scale-[1.7]",
              links: [
                {
                  kind: "code" as const,
                  url: SOCIALLY_QBC_GITHUB_URL,
                  label: "Socially-QBC",
                },
                {
                  kind: "code" as const,
                  url: TODO_QBC_GITHUB_URL,
                  label: "To-Do-List-QBC",
                },
              ],
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <figure className="group relative overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_25px_50px_-20px_rgba(90,60,50,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(120,70,90,0.4)]">
                <div className="relative aspect-4/5 overflow-hidden">
                  <SmartImage
                    src={HERO_IMG}
                    alt={f.title}
                    wrapperClassName="absolute inset-0"
                    imgClassName={`transition-transform duration-700 ${f.img}`}
                  />
                  {/* darken the image so the overlaid text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
                  {/* badge — top right of the card */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="pastel" className="shadow-lg">
                      {f.tag}
                    </Badge>
                  </div>
                  {/* full details — directly on the picture, no box */}
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-2xl leading-tight font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-7 text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                      {f.desc}
                    </p>
                    {f.links.length > 0 ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {f.links.map((l) =>
                          l.kind === "live" ? (
                            <a
                              key={l.url}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow transition hover:bg-white/85"
                            >
                              <Globe className="h-3.5 w-3.5" />
                              {tx("featLive")}
                              <ExternalLink className="h-3 w-3 opacity-70" />
                            </a>
                          ) : (
                            <a
                              key={l.url}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20"
                            >
                              <CodeXml className="h-3.5 w-3.5" />
                              {"label" in l && l.label
                                ? l.label
                                : tx("featCode")}
                            </a>
                          ),
                        )}
                      </div>
                    ) : null}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section
        id="gallery"
        className="relative mx-auto max-w-6xl scroll-mt-28 px-6 pt-20"
      >
        <span id="sheet" className="absolute -top-24" aria-hidden="true" />
        <SectionHeading
          index="02"
          eyebrow={tx("sheetKicker")}
          title={tx("sheetTitle")}
          copy={tx("sheetDesc")}
        />
        <Reveal className="mt-8" delay={0.1}>
          <Gallery tx={tx} />
        </Reveal>
      </section>

      {/* ============ ABOUT ============ */}
      <section
        id="about"
        className="relative mx-auto max-w-6xl scroll-mt-28 px-6 pt-20"
      >
        <div className="relative grid gap-6 overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-7 shadow-xl backdrop-blur sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div
            className="atelier-wash-soft absolute inset-0 opacity-50"
            aria-hidden="true"
          />
          <Reveal className="relative">
            <div className="relative mx-auto max-w-85">
              <div
                className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-[#f5d67b]/50 via-[#f9dbe3]/60 to-[#d9e9d4]/60 blur-xl"
                aria-hidden="true"
              />
              <div className="relative -rotate-2 rounded-4xl border-8 border-white bg-white shadow-2xl transition-transform duration-500 hover:rotate-0">
                <SmartImage
                  src={HERO_IMG}
                  alt="artist"
                  wrapperClassName="aspect-[4/5] w-full rounded-[1.4rem]"
                  imgClassName="object-top"
                />
                <p className="handwritten px-3 py-2.5 text-center text-xs text-muted-foreground">
                  the artist, mid-sketch ✎
                </p>
              </div>
              <div className="absolute -right-6 -bottom-4 rotate-[4deg] rounded-2xl border border-white/70 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur">
                <p className="text-xs font-bold">✦ {tx("philTitle")}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="relative">
            <Badge variant="lavender">✦ {tx("aboutKicker")}</Badge>
            <h2 className="font-display mt-3 text-4xl font-semibold sm:text-5xl">
              {tx("aboutTitle")}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {tx("aboutText")}
            </p>
            <blockquote className="font-display mt-5 rounded-3xl border border-white/70 bg-white/70 p-5 text-xl italic backdrop-blur">
              {tx("philText")}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ============ SKILLS (single part) ============ */}
      <section
        id="services"
        className="relative mx-auto max-w-6xl scroll-mt-28 px-6 pt-20"
      >
        <span id="works" className="absolute -top-24" aria-hidden="true" />
        <SectionHeading
          index="03"
          eyebrow={tx("skillsKicker")}
          title={tx("skillsTitle")}
          copy={tx("skillsDesc")}
          align="center"
        />
        <ol className="relative mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((s, i) => {
            const [firstWord, ...restWords] = s.title.split(" ");
            const rest = restWords.join(" ");
            const brightAccent = `color-mix(in srgb, ${s.accent} ${accentMix})`;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <li className="glass-card group relative h-full overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* ghost icon watermark */}
                  <s.icon
                    className="glass-ghost pointer-events-none absolute -right-5 -bottom-5 h-28 w-28 transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="glass-faint text-[11px] font-semibold tracking-[0.25em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="glass-chip flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur"
                        style={{
                          color: brightAccent,
                          boxShadow: `0 0 20px ${s.accent}66`,
                        }}
                      >
                        <s.icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-[1.65rem] leading-tight font-semibold">
                      <span className="glass-title">{firstWord}</span>
                      {rest ? (
                        <>
                          {" "}
                          <span style={{ color: brightAccent }}>
                            {rest}
                          </span>
                        </>
                      ) : null}
                    </h3>
                    <p className="glass-desc mt-2 text-sm leading-6">
                      {s.desc}
                    </p>
                    <p className="glass-faint handwritten mt-3 text-xs">
                      ↳ {s.tag}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </section>

      {/* ============ CONTACT ============ */}
      <section
        id="contact"
        className="relative mx-auto max-w-6xl scroll-mt-28 px-6 pt-20 pb-16"
      >
        <div className="relative grid gap-6 overflow-hidden rounded-[2.5rem] border border-white/60 bg-linear-to-br from-[#fffdf7] via-[#fdf1f4] to-[#eef3e8] p-7 shadow-2xl sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="contact-copy">
            <Badge variant="gold">✦ {tx("contactKicker")} ✦</Badge>
            <h2 className="font-display mt-4 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              {tx("contactTitle")}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              {tx("contactDesc")}
            </p>
            <div className="mt-6 space-y-2.5">
              {[tx("bullet1"), tx("bullet2")].map((b) => (
                <p
                  key={b}
                  className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-4 py-2.5 text-sm font-semibold shadow-sm backdrop-blur"
                >
                  <Sparkles className="h-4 w-4 text-[#c9a13a]" /> {b}
                </p>
              ))}
              <a
                href="https://t.me/Sllp_anna"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-4 py-2.5 text-sm font-semibold shadow-sm backdrop-blur transition hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4 text-[#c9a13a]" /> {tx("bullet3")}
              </a>
            </div>
            <Separator className="my-6" />
            <Button asChild size="lg" className="rounded-full">
              <a href="mailto:anahita.sllp2000@gmail.com?subject=Project%20inquiry%20—%20portfolio%20contact">
                <Send className="h-4 w-4" />
                {tx("contactBtn")}
              </a>
            </Button>
            <p className="handwritten mt-3 text-xs text-muted-foreground">
              {tx("contactAlt")}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm tx={tx} />
          </Reveal>
        </div>
      </section>

      {/* ============ SECRET VAULT (password-protected, Express backend) ============ */}
      <SecretVault />
    </div>
  );
}
