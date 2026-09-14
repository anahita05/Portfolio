import { setRequestLocale } from "next-intl/server";
import { PortfolioLanding } from "@/components/portfolio-landing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PortfolioLanding />;
}
