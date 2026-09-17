"use client";

import { create } from "zustand";
import { vaultApi, type SecretVault } from "@/lib/vault-api";

export type VaultStatus = "checking" | "locked" | "unlocked";

interface VaultState {
  status: VaultStatus;
  modalOpen: boolean;
  busy: boolean;
  error: string | null;
  vault: SecretVault | null;
  openModal: () => void;
  closeModal: () => void;
  checkMe: () => Promise<void>;
  unlock: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const selectIsUnlocked = (s: VaultState) => s.status === "unlocked";

export const useVaultStore = create<VaultState>()((set, get) => ({
  status: "checking",
  modalOpen: false,
  busy: false,
  error: null,
  vault: null,

  openModal: () => set({ modalOpen: true, error: null }),
  closeModal: () => {
    if (get().busy) return;
    set({ modalOpen: false, error: null });
  },

  checkMe: async () => {
    try {
      await vaultApi.me();
      set({ status: "unlocked", vault: null });
    } catch {
      set({ status: "locked", vault: null });
    }
  },

  unlock: async (password: string) => {
    set({ busy: true, error: null });
    try {
      await vaultApi.unlock(password);
      set({ status: "unlocked", vault: null, busy: false });
      return true;
    } catch (e) {
      set({ busy: false, error: e instanceof Error ? e.message : "Something went wrong." });
      return false;
    }
  },

  logout: async () => {
    // Lock the UI first so the reveal animation captures the image swap;
    // the cookie clear follows (still locked even if it already expired).
    set({ status: "locked", vault: null, modalOpen: false, error: null });
    try {
      await vaultApi.logout();
    } catch {
    }
  },
}));
