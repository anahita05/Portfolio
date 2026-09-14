import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { portfolioFontClass } from "../fonts/portfolio-font";
import { ThemeInitializer } from "@/components/common/theme-initializer";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Portfolio — Creative Designer & Visual Artist",
  description: "Portfolio of selected works, services and commissions in white, sky blue and gold",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <ThemeInitializer />
      </head>
      <body className={`${portfolioFontClass} min-h-screen antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen">
            <Navbar />
            <div className="flex min-h-screen flex-1 flex-col lg:pl-60">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}