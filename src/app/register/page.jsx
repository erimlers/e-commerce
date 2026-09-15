import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div>
      <SiteHeader />
      <main className="px-6 py-16 md:px-12">
        <h1 className="mb-10 text-center font-serif text-4xl">Kayıt</h1>
        <AuthForm mode="register" />
      </main>
    </div>
  );
}
