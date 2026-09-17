"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, KeyRound, Loader2, Lock } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVaultStore } from "@/store/useVaultStore";

/**
 * Beautiful password gate for the hidden vault section.
 * Posts to the Express backend; the JWT lives in an httpOnly cookie.
 */
export function UnlockModal() {
  const t = useTranslations("Vault");
  const { modalOpen, closeModal, unlock, busy, error, status } = useVaultStore();
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [shakeKey, setShakeKey] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const justUnlocked = status === "unlocked" && modalOpen;

  React.useEffect(() => {
    if (!modalOpen) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [modalOpen]);

  // Brief success flash, then close — images already swapped globally.
  React.useEffect(() => {
    if (!justUnlocked) return;
    const id = window.setTimeout(() => {
      closeModal();
    }, 900);
    return () => window.clearTimeout(id);
  }, [justUnlocked, closeModal]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || busy) return;
    const ok = await unlock(password);
    // Replay the shake animation on every failed attempt.
    if (!ok) setShakeKey((k) => k + 1);
  };

  const handleClose = () => {
    setPassword("");
    setShow(false);
    closeModal();
  };

  return (
    <Dialog open={modalOpen} onOpenChange={(v) => !v && handleClose()} className="max-w-md">
      <div className="relative overflow-hidden p-7 sm:p-9">
        <div
          className="atelier-wash-soft pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <motion.div
          key={shakeKey}
          animate={shakeKey > 0 && error ? { x: [0, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {justUnlocked ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2e2620] text-[#f5d67b] shadow-xl"
                >
                  <Check className="h-7 w-7" />
                </motion.span>
                <p className="font-display mt-5 text-2xl font-semibold">{t("success")}</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2e2620] text-[#f5d67b] shadow-md">
                  <Lock className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-4 text-3xl font-semibold">{t("modalTitle")}</h3>
                <p className="handwritten mt-1 text-sm text-muted-foreground">{t("modalDesc")}</p>

                <form onSubmit={submit} className="mt-6 space-y-3">
                  <label className="block text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">
                    {t("passwordLabel")}
                  </label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      ref={inputRef}
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("passwordPh")}
                      autoComplete="current-password"
                      className="pr-12 pl-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Hide password" : "Show password"}
                      className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-primary-50 hover:text-foreground"
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2 pt-1">
                    <Button type="submit" size="lg" disabled={!password || busy} className="flex-1 rounded-full">
                      {busy ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("unlocking")}
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          {t("unlockBtn")}
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      onClick={handleClose}
                      disabled={busy}
                      className="rounded-full"
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Dialog>
  );
}
