"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeName = "light" | "dark" | "red";

interface ThemeState {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => {
        const current = get().theme;
        const order: ThemeName[] = ["light", "dark", "red"];
        const next = order[(order.indexOf(current) + 1) % order.length];
        set({ theme: next });
      },
    }),
    {
      name: "app-theme-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persisted: unknown) => {
        const state = (persisted as { state?: { theme?: unknown } })?.state;
        const t = state?.theme;
        if (t === "light" || t === "dark" || t === "red") {
          return { theme: t };
        }
        // migrate legacy names
        if (t === "angel") return { theme: "light" };
        if (t === "navy" || t === "noir") return { theme: "dark" };
        if (t === "pink") return { theme: "red" };
        return { theme: "light" };
      },
    }
  )
);
