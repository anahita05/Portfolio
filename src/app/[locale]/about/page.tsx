import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight, CodeXml, ExternalLink } from "lucide-react";
import {
  CAKE_SHOP_GITHUB_URL,
  CAKE_SHOP_LIVE_URL,
  TEMPLATE_NEXT_GITHUB_URL,
  TEMPLATE_NEXT_LIVE_URL,
  TODO_QBC_GITHUB_URL,
  SOCIALLY_QBC_GITHUB_URL,
  TWEETER_GITHUB_URL,
  TWEETER_LIVE_URL,
  CS50_GITHUB_URL,
} from "@/data/atelier";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("About");

  const techs = [
    "Next.js 15 (App Router)",
    "TypeScript",
    "Tailwind CSS",
    "next-intl",
    "Zustand + localStorage",
    "shadcn/ui",
    "ESLint",
    "pnpm",
  ];

  return (
    <div className="mx-auto max-w-3xl animate-fade-in px-6 py-16">
      <h1 className="text-3xl font-bold text-primary">{t("title")}</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        {t("description")}
      </p>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>{t("archTitle")}</CardTitle>
          <CardDescription>{t("archDesc")}</CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">{t("techTitle")}</h2>
        <div className="flex flex-wrap gap-3">
          {techs.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-primary-50 px-4 py-2 text-sm text-primary-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">{t("projectsTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t("projectsDesc")}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              title: t("p1T"),
              desc: t("p1D"),
              repo: CAKE_SHOP_GITHUB_URL,
              live: CAKE_SHOP_LIVE_URL,
            },
            {
              title: t("p2T"),
              desc: t("p2D"),
              repo: TEMPLATE_NEXT_GITHUB_URL,
              live: TEMPLATE_NEXT_LIVE_URL,
            },
            {
              title: t("p3T"),
              desc: t("p3D"),
              repo: TODO_QBC_GITHUB_URL,
              live: undefined as string | undefined,
            },
            {
              title: t("p4T"),
              desc: t("p4D"),
              repo: SOCIALLY_QBC_GITHUB_URL,
              live: undefined as string | undefined,
            },
            {
              title: t("p5T"),
              desc: t("p5D"),
              repo: TWEETER_GITHUB_URL,
              live: TWEETER_LIVE_URL,
            },
            {
              title: t("p6T"),
              desc: t("p6D"),
              repo: CS50_GITHUB_URL,
              live: undefined as string | undefined,
            },
          ].map((p) => (
            <Card key={p.repo}>
              <CardHeader>
                <CardTitle className="text-base">{p.title}</CardTitle>
                <CardDescription>{p.desc}</CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary-50"
                  >
                    <CodeXml className="h-3.5 w-3.5" />
                    {t("sourceLabel")}
                  </a>
                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("liveLabel")}
                    </a>
                  ) : null}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Button asChild variant="outline" className="mt-10">
        <Link href="/">
          {t("backToHome")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </Button>
    </div>
  );
}
