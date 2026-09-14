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
        setSent(true);
        setTimeout(() => setSent(false), 4000);
      }}
      className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-name">{tx("formName")}</Label>
          <Input id="cf-name" required placeholder={tx("formNamePh")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-email">{tx("formEmail")}</Label>
          <Input id="cf-email" type="email" required placeholder={tx("formEmailPh")} />
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-type">{tx("formType")}</Label>
          <Input id="cf-type" placeholder={tx("formTypePh")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-budget">{tx("formBudget")}</Label>
          <Input id="cf-budget" placeholder={tx("formBudgetPh")} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="cf-msg">{tx("formMsg")}</Label>
        <Textarea id="cf-msg" required placeholder={tx("formMsgPh")} />
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full rounded-full text-base">
        {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        {sent ? tx("formSent") : tx("formSubmit")}
      </Button>
      <p className="handwritten mt-3 text-center text-xs text-muted-foreground">{tx("formNote")}</p>
    </form>
  );
}
