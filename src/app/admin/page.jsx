"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";

export default function AdminHomePage() {
  return (
    <AdminGuard>
      <main className="px-6 py-12 md:px-12">
        <h1 className="font-serif text-3xl">Yönetim</h1>
        <p className="mt-4 max-w-md font-sans text-sm text-metal">Ürün ve sipariş kayıtlarını buradan yönet.</p>
      </main>
    </AdminGuard>
  );
}
