"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HoverGrowLink } from "@/components/HoverGrowLink";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { fetchCurrentUser, logout } from "@/lib/authClient";

export function AuthNavLinks() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchCurrentUser()
      .then((user) => setUsername(user?.username ?? null))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      setUsername(null);
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return <div className="h-11 w-32" aria-hidden="true" />;
  }

  if (username) {
    return (
      <>
        <LoadingOverlay visible={loggingOut} label="Logging out" />
        <div className="flex items-center gap-4 text-sm">
          <span className="text-white/55">Signed in as {username}</span>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="font-medium text-white transition-colors hover:text-white/70 disabled:opacity-50"
          >
            Log out
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <HoverGrowLink
        href="/login"
        className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#05070c] transition-colors hover:bg-white/85 sm:px-8"
      >
        Log in
      </HoverGrowLink>
      <HoverGrowLink
        href="/register"
        className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-6 font-medium text-white transition-colors hover:bg-white/5"
      >
        Register
      </HoverGrowLink>
    </div>
  );
}
