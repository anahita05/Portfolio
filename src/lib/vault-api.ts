

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export type SecretProject = {
  id: string;
  title: string;
  meta: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
};

export type SecretVault = {
  kicker: string;
  title: string;
  intro: string;
  projects: SecretProject[];
  note: string;
};

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || (data as { ok?: boolean }).ok === false) {
    throw new Error((data as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return data as T;
}

export const vaultApi = {
  unlock: (password: string) =>
    req<{ ok: true; message: string }>("/api/auth/unlock", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
  me: () => req<{ ok: true; authenticated: boolean; expiresAt: number | null }>("/api/auth/me"),
  logout: () => req<{ ok: true; message: string }>("/api/auth/logout", { method: "POST" }),
  secret: () => req<{ ok: true; vault: SecretVault }>("/api/secret/content"),
};
