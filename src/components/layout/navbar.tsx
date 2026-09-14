"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Feather } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { LocaleSwitcher } from "@/components/common/locale-switcher";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const links = [
    { href: "#sheet" as const, label: t("sheet") },
    { href: "#works" as const, label: t("works") },
    { href: "#services" as const, label: t("services") },
    { href: "#contact" as const, label: t("contact") },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-lg font-bold text-primary" onClick={closeMenu}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Feather className="h-4 w-4" />
            </span>
            <span className="font-display">{t("brand")}</span>
          </a>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <nav className="animate-fade-in absolute inset-x-0 top-full flex flex-col gap-1 border-t border-border bg-background px-6 py-4 shadow-lg">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-primary"
              >
                {l.label}
              </a>
            ))}

            <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
              <LocaleSwitcher />
              <ThemeSwitcher />
              <Button asChild size="sm" className="rounded-full">
                <a href="#contact" onClick={closeMenu}>
                  {t("hire")}
                </a>
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Desktop left sidebar */}
      <aside className="fixed top-0 left-0 z-50 hidden h-screen w-60 flex-col justify-between border-r border-border bg-background/80 px-6 py-8 backdrop-blur lg:flex">
        <div>
          <a href="#top" className="flex items-center gap-2 text-lg font-bold text-primary">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Feather className="h-4 w-4" />
            </span>
            <span className="font-display">{t("brand")}</span>
          </a>

          <nav className="mt-10 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-secondary hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <Button asChild className="w-full rounded-full">
            <a href="#contact">{t("hire")}</a>
          </Button>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </aside>
    </>
  );
}
