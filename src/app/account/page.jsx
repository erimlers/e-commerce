"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { api } from "@/lib/api";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => router.replace("/login"));
  }, [router]);

  return (
    <StorefrontShell>
      <main className="px-6 py-16 md:px-16">
        <h1 className="font-serif text-4xl">Hesap</h1>
        {user ? (
          <p className="mt-6 font-sans text-sm text-metal">
            {user.name} · {user.email}
          </p>
        ) : (
          <p className="mt-6 font-sans text-sm text-metal">Yükleniyor…</p>
        )}
      </main>
    </StorefrontShell>
  );
}
