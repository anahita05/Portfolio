"use client";

import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Mail,
  Sparkles,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  breakdown,
  heroImage,
  heroStats,
  portfolioFallback,
  services,
  steps,
  works,
} from "@/data/portfolio";

export function PortfolioLanding() {
  const t = useTranslations("Portfolio");

  const tx = (key: string) => {
    try {
      return t(key);
    } catch {
      return (portfolioFallback as Record<string, string>)[key] ?? key;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed animated background: white + sky blue + golden, keeps moving on scroll */}
      <div className="sky-scene" aria-hidden="true" />
      <div className="sky-clouds" aria-hidden="true" />

      {/* HERO */}
      <section id="top" className="relative mx-auto max-w-6xl px-6 pt-12 pb-10 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-in">
            <p className="handwritten text-sm text-primary-600">{tx("sheetNo")}</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {tx("badge")}
            </div>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] font-semibold text-foreground sm:text-7xl">
              {tx("titleA")}
              <br />
              <span className="italic text-primary-600">{tx("titleB")}</span>
            </h1>
            <p className="mt-5 max-w-xl leading-8 text-muted-foreground">{tx("subtitle")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href="#works">
                  {tx("ctaWork")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-card/60">
                <a href="#contact">
                  <Mail className="h-4 w-4" />
                  {tx("ctaContact")}
                </a>
              </Button>
            </div>
            <div className="mt-9 flex gap-8 border-t border-border pt-6">
              {heroStats.map(([nKey, lKey]) => (
                <div key={lKey}>
                  <div className="font-display text-3xl font-semibold text-primary-700">
                    {tx(nKey)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{tx(lKey)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — bare transparent PNG, no card behind */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <img
              src={heroImage}
              alt="portfolio hero"
              className="h-auto w-full object-contain [filter:drop-shadow(0_24px_32px_rgba(30,80,130,0.25))]"
            />

            <p className="mt-3 text-center text-[11px] text-muted-foreground">{tx("note")}</p>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-12 overflow-hidden rounded-full border border-border bg-card/70 py-3 backdrop-blur">
          <p className="handwritten animate-pulse text-center text-sm tracking-wide text-primary-700">
            {tx("marquee")}
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="sheet" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
        <p className="handwritten text-sm text-primary-600">↳ {tx("sheetKicker")}</p>
        <h2 className="font-display mt-2 text-4xl font-semibold sm:text-5xl">{tx("sheetTitle")}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{tx("sheetDesc")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {breakdown.map((c, i) => (
            <Card
              key={c.titleKey}
              className="group animate-fade-in rounded-3xl border-border bg-card/85 backdrop-blur transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-18px_rgba(56,130,190,0.45)]"
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
                <CardTitle className="mt-4 text-lg">{tx(c.titleKey)}</CardTitle>
                <CardDescription className="leading-7">{tx(c.descKey)}</CardDescription>
                <p className="handwritten mt-2 text-xs text-primary-600">↳ {tx(c.tagKey)}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
        <p className="handwritten text-sm text-primary-600">↳ {tx("worksKicker")}</p>
        <h2 className="font-display mt-2 text-4xl font-semibold sm:text-5xl">{tx("worksTitle")}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{tx("worksDesc")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {works.map((w) => (
            <div
              key={w.titleKey}
              className={`group relative overflow-hidden rounded-[1.8rem] border border-white/60 bg-gradient-to-br ${w.grad} aspect-[4/3] p-6 transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,white_0,transparent_45%),radial-gradient(circle_at_80%_90%,rgba(201,168,106,0.35),transparent_50%)]" />
              {w.image ? (
                <img
                  src={w.image}
                  alt={tx(w.titleKey)}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex justify-between text-primary-800/70">
                  <span className="text-3xl">{w.emoji}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 backdrop-blur transition group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-semibold text-[#3d322a]">
                    {tx(w.titleKey)}
                  </h3>
                  <p className="handwritten mt-1 text-sm text-[#6d5f4f]">{tx(w.catKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT + SERVICES */}
      <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-border bg-card/85 p-8 backdrop-blur">
            <p className="handwritten text-sm text-primary-600">↳ {tx("aboutKicker")}</p>
            <h2 className="font-display mt-2 text-4xl font-semibold">{tx("aboutTitle")}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{tx("aboutText")}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[tx("aboutTag1"), tx("aboutTag2"), tx("aboutTag3")].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-primary-50 px-3 py-1 text-xs text-primary-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 border-t border-dashed border-primary-200 pt-5">
              <p className="handwritten text-xs text-muted-foreground">↳ {tx("processKicker")}</p>
              <h3 className="font-display mt-1 text-2xl font-semibold">{tx("processTitle")}</h3>
              <div className="mt-4 space-y-3">
                {steps.map((s) => (
                  <div key={s.n} className="flex items-center gap-3 text-sm">
                    <span className="font-display w-8 text-primary-500 italic">{s.n}</span>
                    <span className="font-semibold">{tx(s.titleKey)}</span>
                    <span className="text-muted-foreground">— {tx(s.descKey)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="handwritten text-sm text-primary-600">↳ {tx("servicesKicker")}</p>
            <h2 className="font-display mt-2 text-4xl font-semibold">{tx("servicesTitle")}</h2>
            <p className="mt-3 text-muted-foreground">{tx("servicesDesc")}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <Card key={s.titleKey} className="rounded-3xl bg-card/85 backdrop-blur">
                  <CardHeader>
                    <s.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="mt-2 text-base">{tx(s.titleKey)}</CardTitle>
                    <CardDescription className="leading-7">{tx(s.descKey)}</CardDescription>
                    <p className="mt-2 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {tx(s.priceKey)}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[#1e3a5f] px-8 py-14 text-center text-[#f5efe2] sm:px-16">
          <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_20%_10%,#bae6fd_0,transparent_40%),radial-gradient(circle_at_85%_85%,#f5d67b_0,transparent_35%)]" />
          <p className="handwritten relative text-sm text-[#d9c49c]">✦ {tx("contactKicker")} ✦</p>
          <h2 className="font-display relative mx-auto mt-3 max-w-xl text-4xl leading-tight font-semibold sm:text-5xl">
            {tx("contactTitle")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-7 text-[#e6d9c2]/80">
            {tx("contactDesc")}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#e9dcc4] text-[#2e2620] hover:bg-white"
            >
              <a href="mailto:hello@myportfolio.site?subject=Project%20inquiry">
                <Send className="h-4 w-4" />
                {tx("contactBtn")}
              </a>
            </Button>
            <span className="handwritten self-center text-xs text-[#d9c49c]">
              {tx("contactAlt")} ♡
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
