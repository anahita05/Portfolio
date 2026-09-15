"use client";

import * as React from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ tx }: { tx: (key: string) => string }) {
  const [sent, setSent] = React.useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") ?? "");
        const email = String(data.get("email") ?? "");
        const type = String(data.get("type") ?? "");
        const budget = String(data.get("budget") ?? "");
        const message = String(data.get("message") ?? "");

        const subject = encodeURIComponent(
          `Portfolio contact — ${type || "new message"} — from ${name || email || "website"}`,
        );
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nProject type: ${type}\nTimeline: ${budget}\n\n${message}`,
        );
        window.location.href = `mailto:anahita.sllp2000@gmail.com?subject=${subject}&body=${body}`;

        setSent(true);
        setTimeout(() => setSent(false), 4000);
      }}
      className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-name">{tx("formName")}</Label>
          <Input id="cf-name" name="name" required placeholder={tx("formNamePh")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-email">{tx("formEmail")}</Label>
          <Input id="cf-email" name="email" type="email" required placeholder={tx("formEmailPh")} />
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-type">{tx("formType")}</Label>
          <Input id="cf-type" name="type" placeholder={tx("formTypePh")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-budget">{tx("formBudget")}</Label>
          <Input id="cf-budget" name="budget" placeholder={tx("formBudgetPh")} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="cf-msg">{tx("formMsg")}</Label>
        <Textarea id="cf-msg" name="message" required placeholder={tx("formMsgPh")} />
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full rounded-full text-base">
        {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        {sent ? tx("formSent") : tx("formSubmit")}
      </Button>
      <p className="handwritten mt-3 text-center text-xs text-muted-foreground">{tx("formNote")}</p>
    </form>
  );
}
