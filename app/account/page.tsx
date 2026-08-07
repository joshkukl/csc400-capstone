"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { PasswordInput } from "@/components/PasswordInput";
import { changePassword, fetchCurrentUser } from "@/lib/authClient";
import type { PublicUser } from "@/types/auth";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCurrentUser()
      .then((currentUser) => {
        if (!currentUser) {
          router.replace("/login?redirect=/account");
          return;
        }
        setUser(currentUser);
      })
      .finally(() => setCheckingAuth(false));
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }

    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setSubmitting(true);
    const result = await changePassword(
      currentPassword,
      newPassword,
      confirmPassword,
    );
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess("Password updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  if (checkingAuth || !user) {
    return (
      <main className="flex flex-1 flex-col">
        <AppHeader />
        <div className="mx-auto flex w-full max-w-md flex-1 items-center justify-center px-6 py-12">
          <p className="text-sm text-foreground/50">Loading account…</p>
        </div>
      </main>
    );
  }

  const createdAt = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="flex flex-1 flex-col">
      <LoadingOverlay visible={submitting} label="Updating password" />
      <AppHeader />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <div className="rounded-2xl border border-foreground/10 p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Account Info</h1>
          <p className="mt-1 text-sm text-foreground/50">
            View your account details and update your password.
          </p>

          <div className="mt-8 rounded-xl border border-foreground/10 px-4 py-4 text-sm">
            <p>
              <span className="text-foreground/50">Username:</span>{" "}
              <span className="font-medium">{user.username}</span>
            </p>
            <p className="mt-2">
              <span className="text-foreground/50">Member since:</span>{" "}
              <span className="font-medium">{createdAt}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-medium"
              >
                Current password
              </label>
              <PasswordInput
                id="currentPassword"
                value={currentPassword}
                onChange={setCurrentPassword}
                autoComplete="current-password"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium"
              >
                New password
              </label>
              <PasswordInput
                id="newPassword"
                value={newPassword}
                onChange={setNewPassword}
                autoComplete="new-password"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm new password
              </label>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
                placeholder="Re-enter new password"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-35"
            >
              {submitting ? "Updating..." : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
