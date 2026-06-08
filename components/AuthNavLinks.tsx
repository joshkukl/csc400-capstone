"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchCurrentUser, logout } from "@/lib/authClient";

export function AuthNavLinks() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser()
      .then((user) => setUsername(user?.username ?? null))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await logout();
    setUsername(null);
    router.refresh();
  }

  if (loading) {
    return <div className="h-9 w-32" aria-hidden="true" />;
  }

  if (username) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <span className="text-foreground/50">Signed in as {username}</span>
        <button
          type="button"
          onClick={handleLogout}
          className="font-medium transition-colors hover:text-foreground/70"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link
        href="/login"
        className="font-medium transition-colors hover:text-foreground/70"
      >
        Log in
      </Link>
      <Link
        href="/register"
        className="inline-flex h-9 items-center justify-center rounded-full border border-foreground/15 px-4 font-medium transition-colors hover:bg-foreground/5"
      >
        Register
      </Link>
    </div>
  );
}
