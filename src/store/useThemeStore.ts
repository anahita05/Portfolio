"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeName = "angel" | "navy" | "pink";

interface ThemeState {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "angel",

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => {
        const current = get().theme;
        const order: ThemeName[] = ["angel", "navy", "pink"];
        const next = order[(order.indexOf(current) + 1) % order.length];
        set({ theme: next });
      },
    }),
    {
      name: "app-theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
