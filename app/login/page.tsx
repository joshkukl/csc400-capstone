import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

function LoginFormFallback() {
  return (
    <div className="rounded-2xl border border-foreground/10 p-8">
      <div className="h-8 w-32 animate-pulse rounded bg-foreground/10" />
      <div className="mt-8 h-40 animate-pulse rounded-xl bg-foreground/5" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col">
      <nav className="border-b border-foreground/10 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          StackRec
        </Link>
      </nav>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
