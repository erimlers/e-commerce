import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <StorefrontShell>
      <main className="py-16">
        <h1 className="mb-10 text-center font-serif text-4xl">Kayıt</h1>
        <AuthForm mode="register" />
      </main>
    </StorefrontShell>
  );
}
