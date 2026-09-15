"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function AdminGuard({ children }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    api("/auth/me")
      .then((data) => {
        if (data.user.role !== "admin") {
          router.replace("/");
          return;
        }
        setOk(true);
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  if (!ok) {
    return <p className="px-6 py-16 font-sans text-sm text-metal">Yükleniyor…</p>;
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-4 md:px-12">
        <Link href="/admin" className="font-serif text-xl tracking-widest">
          CALDER Admin
        </Link>
        <nav className="flex gap-6 font-sans text-sm text-metal">
          <Link href="/admin/products" className="hover:text-ink">
            Ürünler
          </Link>
          <Link href="/admin/orders" className="hover:text-ink">
            Siparişler
          </Link>
          <Link href="/" className="hover:text-ink">
            Vitrin
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
