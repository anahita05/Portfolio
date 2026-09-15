"use client";

import { useTranslations } from "next-intl";
import { Cloud, Star, Heart, Globe, Mail, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="relative mx-auto w-full max-w-6xl px-6 pb-10">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-[#2e2620] text-[#f5efe2] shadow-2xl">
        <div
          className="absolute inset-0 opacity-50"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(245,214,123,0.4), transparent 40%), radial-gradient(circle at 85% 25%, rgba(249,219,227,0.35), transparent 40%), radial-gradient(circle at 60% 90%, rgba(221,208,247,0.3), transparent 45%)",
          }}
        />
        <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f5d67b] text-[#2e2620]">
                <span className="relative flex items-center justify-center">
                  <Cloud className="h-5 w-5" />
                  <Star className="absolute -top-2 -right-2 h-3 w-3 fill-current" />
                  <Star className="absolute -bottom-1 -left-2 h-2.5 w-2.5 fill-current" />
                </span>
              </span>
              <span className="font-display text-2xl">{nav("brand")}</span>
            </p>
            <p className="handwritten mt-3 text-sm text-[#e6d9c2]/80">{t("tagline")}</p>
            <div className="mt-5 flex gap-2">
              {[Globe, Mail, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-[#f5d67b] hover:text-[#2e2620]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#d9c49c] uppercase">
              {t("explore")}
            </p>
            <nav className="mt-4 grid gap-2 text-sm">
              {[
                { href: "#featured", label: nav("works") },
                { href: "#gallery", label: nav("sheet") },
                { href: "#about", label: nav("about") },
                { href: "#services", label: nav("services") },
                { href: "#contact", label: nav("contact") },
              ].map((l) => (
                <a key={l.href} href={l.href} className="w-fit transition hover:translate-x-1 hover:text-[#f5d67b]">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#d9c49c] uppercase">
              {t("studio")}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#e6d9c2]/85">{t("studioText")}</p>
            <p className="handwritten mt-3 text-xs text-[#d9c49c]">✦ {t("slots")} ✦</p>
          </div>
        </div>
        <div className="relative px-8 pb-6 sm:px-12">
          <Separator className="bg-white/15" />
          <p className="flex flex-wrap items-center justify-center gap-1.5 pt-5 text-center text-xs text-[#e6d9c2]/70">
            {t("text")}
            <Heart className="h-3 w-3 fill-[#f5d67b] text-[#f5d67b]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
