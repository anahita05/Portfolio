"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Cloud, Lock, LockOpen, LogOut, Menu, Star } from "lucide-react";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { LocaleSwitcher } from "@/components/common/locale-switcher";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { revealFromElement } from "@/lib/view-transition";
import { useVaultStore } from "@/store/useVaultStore";

export function Navbar() {
  const t = useTranslations("Nav");
  const vt = useTranslations("Vault");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("#top");
  const openVaultModal = useVaultStore((s) => s.openModal);
  const vaultLogout = useVaultStore((s) => s.logout);
  const vaultStatus = useVaultStore((s) => s.status);
  const vaultLocked = vaultStatus !== "unlocked";

  const links = [
    { href: "#top", label: t("home"), hint: "00" },
    { href: "#featured", label: t("works"), hint: "01" },
    { href: "#gallery", label: t("sheet"), hint: "02" },
    { href: "#about", label: t("about"), hint: "03" },
    { href: "#services", label: t("services"), hint: "04" },
    { href: "#contact", label: t("contact"), hint: "05" },
  ];

  React.useEffect(() => {
    const onScroll = () => {
      const ids = [
        "top",
        "featured",
        "gallery",
        "about",
        "services",
        "contact",
      ];
      let current = "#top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 220) current = `#${id}`;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Vault box: locked -> open password modal; unlocked -> logout swaps back to main. */
  const goVault = () => {
    setOpen(false);
    if (vaultLocked) openVaultModal();
  };

  const handleVaultLogout = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    // Same circular reveal as the theme button, expanding from the logout icon.
    void revealFromElement(event, () => vaultLogout(), "to-locked");
  };

  return (
    <>
      {/* Mobile floating pills: brand bar + separate vault box */}
      <div className="fixed inset-x-3 top-3 z-50 space-y-2 lg:hidden">
        <div className="flex items-center justify-between rounded-full border border-white/70 bg-white/75 py-2 pr-2 pl-4 shadow-lg backdrop-blur-xl">
          <a
            href="#top"
            className="flex items-center gap-2 text-sm font-bold text-primary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e2620] text-[#f5d67b]">
              <span className="relative flex items-center justify-center">
                <Cloud className="h-4 w-4" />
                <Star className="absolute -top-2 -right-2 h-2.5 w-2.5 fill-current" />
                <Star className="absolute -bottom-1 -left-2 h-2 w-2 fill-current" />
              </span>
            </span>
            <span className="font-display text-base font-bold">
              {t("brand")}
            </span>
          </a>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label={t("openMenu")}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 rounded-full border border-white/70 bg-white/75 py-2 pr-2 pl-2 shadow-lg backdrop-blur-xl">
          <button
            onClick={goVault}
            disabled={!vaultLocked}
            title={vaultLocked ? vt("unlockBtn") : vt("success")}
            aria-label={vaultLocked ? vt("unlockBtn") : vt("success")}
            className="flex min-w-0 flex-1 items-center gap-2 text-left transition active:scale-[0.99] disabled:cursor-default"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2e2620] text-[#f5d67b]">
              {vaultLocked ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
            </span>
            <span className="block truncate text-sm font-bold text-primary">
              {vt("teaserKicker")}
            </span>
          </button>
          {!vaultLocked && (
            <button
              onClick={handleVaultLogout}
              title={vt("lockBtn")}
              aria-label={vt("lockBtn")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-white hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                active === l.href
                  ? "bg-[#2e2620] text-white"
                  : "hover:bg-white",
              )}
            >
              <span className="font-display mr-2 text-xs italic opacity-60">
                {l.hint}
              </span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
          <ThemeSwitcher />
        </div>
      </Sheet>

      {/* Desktop: separate vault box ABOVE the navbar rail */}
      <aside className="fixed top-1/2 left-5 z-50 hidden w-[15.5rem] -translate-y-1/2 lg:block">
        <div className="space-y-3">
          <div className="group flex w-full items-center gap-3 rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-[0_25px_60px_-20px_rgba(90,60,50,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">
            <button
              onClick={goVault}
              disabled={!vaultLocked}
              title={vaultLocked ? vt("unlockBtn") : vt("success")}
              aria-label={vaultLocked ? vt("unlockBtn") : vt("success")}
              className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-default"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#2e2620] text-[#f5d67b] shadow-md transition-transform duration-300 group-hover:scale-110">
                {vaultLocked ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-display block w-7 text-xs text-muted-foreground italic">
                  06
                </span>
                <span className="block truncate text-sm font-semibold text-foreground/80">
                  {vt("teaserKicker")}
                </span>
              </span>
            </button>
            {!vaultLocked && (
              <button
                onClick={handleVaultLogout}
                title={vt("lockBtn")}
                aria-label={vt("lockBtn")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-primary-50 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 shadow-[0_25px_60px_-20px_rgba(90,60,50,0.4)] backdrop-blur-xl">
          <div className="atelier-wash-soft border-b border-white/60 p-5">
            <a href="#top" className="group flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2e2620] text-[#f5d67b] shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                <span className="relative flex items-center justify-center">
                  <Cloud className="h-5 w-5" />
                  <Star className="absolute -top-2 -right-2 h-3 w-3 fill-current" />
                  <Star className="absolute -bottom-1 -left-2 h-2.5 w-2.5 fill-current" />
                </span>
              </span>
              <span>
                <span className="font-display block text-lg leading-tight font-bold">
                  {t("brand")}
                </span>
                <span className="handwritten block text-[11px] text-muted-foreground">
                  ✦ art atelier
                </span>
              </span>
            </a>
          </div>

          <nav className="space-y-1 p-3">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-[#2e2620] text-white shadow-md"
                      : "text-foreground/80 hover:translate-x-1 hover:bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "font-display w-7 text-xs italic",
                      isActive ? "text-[#f5d67b]" : "text-muted-foreground",
                    )}
                  >
                    {l.hint}
                  </span>
                  {l.label}
                  <span
                    className={cn(
                      "ml-auto h-1.5 w-1.5 rounded-full transition",
                      isActive
                        ? "bg-[#f5d67b]"
                        : "bg-transparent group-hover:bg-primary-300",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-between gap-2 border-t border-white/60 bg-white/50 p-4">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
          </div>
        </div>
      </aside>
    </>
  );
}
