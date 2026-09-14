"use client";

import { useTranslations } from "next-intl";
import {
  Feather,
  Eye,
  Gem,
  Link2,
  Shirt,
  Scan,
  ArrowUpRight,
  Mail,
  Sparkles,
  Brush,
  Layers,
  Palette,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PortfolioLanding() {
  const t = useTranslations("Portfolio");

  const breakdown = [
    { icon: Gem, title: t("card1T"), desc: t("card1D"), tag: t("card1Tag") },
    { icon: Eye, title: t("card2T"), desc: t("card2D"), tag: t("card2Tag") },
    { icon: Shirt, title: t("card3T"), desc: t("card3D"), tag: t("card3Tag") },
    { icon: Feather, title: t("card4T"), desc: t("card4D"), tag: t("card4Tag") },
    { icon: Scan, title: t("card5T"), desc: t("card5D"), tag: t("card5Tag") },
    { icon: Link2, title: t("card6T"), desc: t("card6D"), tag: t("card6Tag") },
  ];

  const works = [
    { title: t("work1T"), cat: t("work1C"), grad: "from-[#e9dcc4] via-[#f7f1e5] to-[#d9c9a8]", emoji: "◍" },
    { title: t("work2T"), cat: t("work2C"), grad: "from-[#efe6d6] via-[#e2d2b6] to-[#c9ae7e]", emoji: "✦" },
    { title: t("work3T"), cat: t("work3C"), grad: "from-[#fbf8f1] via-[#eee3cf] to-[#d8c49c]", emoji: "☾" },
    { title: t("work4T"), cat: t("work4C"), grad: "from-[#e6d9c2] via-[#f4ece0] to-[#c4a878]", emoji: "❀" },
  ];

  const services = [
    { icon: Brush, title: t("srv1T"), desc: t("srv1D"), price: t("srv1P") },
    { icon: Layers, title: t("srv2T"), desc: t("srv2D"), price: t("srv2P") },
    { icon: Gem, title: t("srv3T"), desc: t("srv3D"), price: t("srv3P") },
    { icon: Palette, title: t("srv4T"), desc: t("srv4D"), price: t("srv4P") },
  ];

  const steps = [
    { n: "01", title: t("step1T"), desc: t("step1D") },
    { n: "02", title: t("step2T"), desc: t("step2D") },
    { n: "03", title: t("step3T"), desc: t("step3D") },
    { n: "04", title: t("step4T"), desc: t("step4D") },
  ];

  return (
    <div className="paper-grain min-h-screen">
      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-12 pb-10 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-in">
            <p className="handwritten text-sm text-primary-600">{t("sheetNo")}</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("badge")}
            </div>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] font-semibold text-foreground sm:text-7xl">
              {t("titleA")}
              <br />
              <span className="italic text-primary-600">{t("titleB")}</span>
            </h1>
            <p className="mt-5 max-w-xl leading-8 text-muted-foreground">{t("subtitle")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href="#sheet">
                  {t("ctaWork")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card/60">
                <a href="#contact">
                  <Mail className="h-4 w-4" />
                  {t("ctaContact")}
                </a>
              </Button>
            </div>
            <div className="mt-9 flex gap-8 border-t border-border pt-6">
              {[
                [t("stat1N"), t("stat1L")],
                [t("stat2N"), t("stat2L")],
                [t("stat3N"), t("stat3L")],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-semibold text-primary-700">{n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — character sheet collage */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="sketch-border relative overflow-hidden rounded-[2rem] bg-card shadow-[0_30px_60px_-20px_rgba(154,123,63,0.35)]">
              {/* main art: uses your uploaded image if present, else pure gradient art */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#faf6ec] via-[#efe5d1] to-[#dcc9a2]">
                <img
                  src="/angel-reference.jpg"
                  alt="fallen angel character sheet"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* fallback art */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <Feather className="h-14 w-14 text-primary-500/70" strokeWidth={1} />
                  <p className="font-display text-3xl text-primary-800/80 italic">fallen angel</p>
                  <p className="handwritten text-sm text-muted-foreground">white linen • gold chains • tired gaze</p>
                  <div className="mt-2 flex gap-2">
                    <span className="h-16 w-10 rounded-full bg-gradient-to-b from-white/90 to-[#d9c8a3]/70 blur-[0.5px]" />
                    <span className="mt-4 h-20 w-10 rounded-full bg-gradient-to-b from-white/80 to-[#cbb487]/70 blur-[0.5px]" />
                    <span className="h-14 w-10 rounded-full bg-gradient-to-b from-white/90 to-[#d9c8a3]/60 blur-[0.5px]" />
                  </div>
                </div>
                {/* annotation overlays like the reference */}
                <span className="handwritten absolute top-4 right-4 rounded-full bg-white/70 px-3 py-1 text-[11px] backdrop-blur">
                  ← back view
                </span>
                <span className="handwritten absolute top-1/3 left-3 rounded-full bg-white/70 px-3 py-1 text-[11px] backdrop-blur">
                  soft makeup →
                </span>
                <span className="handwritten absolute bottom-24 left-3 rounded-full bg-white/70 px-3 py-1 text-[11px] backdrop-blur">
                  wings ↘
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-border bg-card/90 px-5 py-3 text-xs text-muted-foreground backdrop-blur">
                <span>fig. 04 — drape & wings</span>
                <span className="handwritten">chain details ⤴</span>
              </div>
            </div>

            {/* floating detail cards */}
            <div className="absolute -top-4 -left-4 rotate-[-4deg] rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur sm:-left-10">
              <p className="flex items-center gap-1.5 text-xs font-semibold">
                <Gem className="h-3.5 w-3.5 text-primary" /> gold jewelry
              </p>
              <p className="handwritten mt-0.5 text-[11px] text-muted-foreground">layered chains</p>
            </div>
            <div className="absolute -right-3 bottom-16 rotate-[3deg] rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur sm:-right-8">
              <p className="flex items-center gap-1.5 text-xs font-semibold">
                <Eye className="h-3.5 w-3.5 text-primary" /> tired eyes
              </p>
              <p className="handwritten mt-0.5 text-[11px] text-muted-foreground">tears + blush</p>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">{t("note")}</p>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-12 overflow-hidden rounded-full border border-border bg-card/70 py-3 backdrop-blur">
          <p className="handwritten animate-pulse text-center text-sm tracking-wide text-primary-700">
            {t("marquee")}
          </p>
        </div>
      </section>

      {/* BREAKDOWN */}
      <section id="sheet" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
        <p className="handwritten text-sm text-primary-600">↳ {t("sheetKicker")}</p>
        <h2 className="font-display mt-2 text-4xl font-semibold sm:text-5xl">{t("sheetTitle")}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("sheetDesc")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breakdown.map((c, i) => (
            <Card
              key={c.title}
              className="group animate-fade-in rounded-3xl border-border bg-card/85 backdrop-blur transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-18px_rgba(154,123,63,0.45)]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm text-muted-foreground italic">
                    0{i + 1}
                  </span>
                </div>
                <CardTitle className="mt-4 text-lg">{c.title}</CardTitle>
                <CardDescription className="leading-7">{c.desc}</CardDescription>
                <p className="handwritten mt-2 text-xs text-primary-600">↳ {c.tag}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
        <p className="handwritten text-sm text-primary-600">↳ {t("worksKicker")}</p>
        <h2 className="font-display mt-2 text-4xl font-semibold sm:text-5xl">{t("worksTitle")}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("worksDesc")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {works.map((w) => (
            <div
              key={w.title}
              className={`group relative overflow-hidden rounded-[1.8rem] border border-border bg-gradient-to-br ${w.grad} aspect-[4/3] p-6 transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,white_0,transparent_45%),radial-gradient(circle_at_80%_90%,rgba(154,123,63,0.35),transparent_50%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex justify-between text-primary-800/70">
                  <span className="text-3xl">{w.emoji}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 backdrop-blur transition group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-semibold text-[#3d322a]">{w.title}</h3>
                  <p className="handwritten mt-1 text-sm text-[#6d5f4f]">{w.cat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT + SERVICES */}
      <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-border bg-card/85 p-8 backdrop-blur">
            <p className="handwritten text-sm text-primary-600">↳ {t("aboutKicker")}</p>
            <h2 className="font-display mt-2 text-4xl font-semibold">{t("aboutTitle")}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{t("aboutText")}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[t("aboutTag1"), t("aboutTag2"), t("aboutTag3")].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-primary-50 px-3 py-1 text-xs text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 border-t border-dashed border-primary-200 pt-5">
              <p className="handwritten text-xs text-muted-foreground">↳ {t("processKicker")}</p>
              <h3 className="font-display mt-1 text-2xl font-semibold">{t("processTitle")}</h3>
              <div className="mt-4 space-y-3">
                {steps.map((s) => (
                  <div key={s.n} className="flex items-center gap-3 text-sm">
                    <span className="font-display w-8 text-primary-500 italic">{s.n}</span>
                    <span className="font-semibold">{s.title}</span>
                    <span className="text-muted-foreground">— {s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="handwritten text-sm text-primary-600">↳ {t("servicesKicker")}</p>
            <h2 className="font-display mt-2 text-4xl font-semibold">{t("servicesTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{t("servicesDesc")}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <Card key={s.title} className="rounded-3xl bg-card/85 backdrop-blur">
                  <CardHeader>
                    <s.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="mt-2 text-base">{s.title}</CardTitle>
                    <CardDescription className="leading-7">{s.desc}</CardDescription>
                    <p className="mt-2 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {s.price}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[#2e2620] px-8 py-14 text-center text-[#f5efe2] sm:px-16">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_10%,#c9a86a_0,transparent_40%),radial-gradient(circle_at_85%_85%,#e8b4a0_0,transparent_35%)]" />
          <p className="handwritten relative text-sm text-[#d9c49c]">✦ {t("contactKicker")} ✦</p>
          <h2 className="font-display relative mx-auto mt-3 max-w-xl text-4xl leading-tight font-semibold sm:text-5xl">
            {t("contactTitle")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-7 text-[#e6d9c2]/80">
            {t("contactDesc")}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#e9dcc4] text-[#2e2620] hover:bg-white"
            >
              <a href="mailto:hello@seraphina.art?subject=Commission%20—%20fallen%20angel%20style">
                <Send className="h-4 w-4" />
                {t("contactBtn")}
              </a>
            </Button>
            <span className="handwritten self-center text-xs text-[#d9c49c]">
              {t("contactAlt")} ♡
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
