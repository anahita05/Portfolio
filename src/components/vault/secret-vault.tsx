"use client";

import * as React from "react";
import { useVaultStore } from "@/store/useVaultStore";
import { UnlockModal } from "./unlock-modal";

/**
 * Invisible vault host. Restores the session on mount and hosts the
 * password modal (opened from the navbar). Renders no section, text,
 * or cards — unlocking only swaps portfolio images main -> hide.
 */
export function SecretVault() {
  const { checkMe } = useVaultStore();

  React.useEffect(() => {
    checkMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UnlockModal />;
}
