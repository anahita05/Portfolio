"use client";

import * as React from "react";
import { Send, Check, TriangleAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ tx }: { tx: (key: string) => string }) {
  const [status, setStatus] = React.useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("type") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      // Misconfigured (missing key) — fall back to the visitor's email app.
      const subject = encodeURIComponent(
        `Portfolio contact — ${type || "new message"} — from ${name || email || "website"}`,
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nProject type: ${type}\nTimeline: ${budget}\n\n${message}`,
      );
      window.location.href = `mailto:anahita.sllp2000@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: `Portfolio contact — ${type || "new message"} — from ${name || email || "website"}`,
          message: `Name: ${name}\nEmail: ${email}\nProject type: ${type}\nTimeline: ${budget}\n\n${message}`,
          from_name: name || "Portfolio visitor",
          replyto: email,
          botcheck: data.get("botcheck") ? true : false,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (res.ok && json.success) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur sm:p-8"
    >
      {/* honeypot for Web3Forms bot protection */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
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
      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full text-base"
      >
        {status === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : status === "sent" ? (
          <Check className="h-4 w-4" />
        ) : status === "error" ? (
          <TriangleAlert className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {status === "sending"
          ? tx("formSending")
          : status === "sent"
            ? tx("formSent")
            : status === "error"
              ? tx("formError")
              : tx("formSubmit")}
      </Button>
      <p className="handwritten mt-3 text-center text-xs text-muted-foreground">{tx("formNote")}</p>
    </form>
  );
}
