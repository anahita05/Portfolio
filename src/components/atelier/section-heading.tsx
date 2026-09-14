import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <Badge variant="outline" className="bg-white/70">
          <span className="font-display italic">{index}</span>
          <span className="mx-1">✦</span>
          {eyebrow}
        </Badge>
      </div>
      <h2 className="font-display mt-4 text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-3 leading-8 text-muted-foreground">{copy}</p> : null}
    </Reveal>
  );
}
