"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TabsContext = { value: string; setValue: (v: string) => void };

const Ctx = React.createContext<TabsContext | null>(null);

function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const current = value ?? inner;
  const setValue = (v: string) => {
    setInner(v);
    onValueChange?.(v);
  };
  return (
    <Ctx.Provider value={{ value: current, setValue }}>
      <div className={cn(className)}>{children}</div>
    </Ctx.Provider>
  );
}

function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/60 bg-white/60 p-1.5 shadow-sm backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(Ctx);
  const active = ctx?.value === value;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => ctx?.setValue(value)}
      className={cn(
        "rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300",
        active
          ? "bg-[#2e2620] text-[#f7f1e5] shadow-md"
          : "text-muted-foreground hover:bg-white hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}

export { Tabs, TabsList, TabsTrigger };
