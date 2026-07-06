"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/PasswordInput";
import { register } from "@/lib/authClient";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/questionnaire";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await register(username, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-foreground/10 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
      <p className="mt-1 text-sm text-foreground/50">
        Register to start your stack recommendation.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-xl border border-foreground/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40"
            placeholder="Choose a username"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/50">
        Already have an account?{" "}
        <Link
          href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
