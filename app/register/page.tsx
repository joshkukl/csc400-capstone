import { Suspense } from "react";
import { AppHeader } from "@/components/AppHeader";
import { RegisterForm } from "./RegisterForm";

function RegisterFormFallback() {
  return (
    <div className="rounded-2xl border border-foreground/10 p-8">
      <div className="h-8 w-40 animate-pulse rounded bg-foreground/10" />
      <div className="mt-8 h-40 animate-pulse rounded-xl bg-foreground/5" />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AppHeader />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <Suspense fallback={<RegisterFormFallback />}>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
