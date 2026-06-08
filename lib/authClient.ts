import type { AuthErrorResponse, AuthResponse, PublicUser } from "@/types/auth";

async function parseAuthResponse(
  response: Response,
): Promise<{ user?: PublicUser; error?: string }> {
  const data = (await response.json()) as AuthResponse | AuthErrorResponse;

  if (!response.ok) {
    return { error: "error" in data ? data.error : "Something went wrong." };
  }

  if ("user" in data) {
    return { user: data.user };
  }

  return { error: "Unexpected response from server." };
}

export async function fetchCurrentUser(): Promise<PublicUser | null> {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  const result = await parseAuthResponse(response);
  return result.user ?? null;
}

export async function login(
  username: string,
  password: string,
): Promise<{ user?: PublicUser; error?: string }> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  return parseAuthResponse(response);
}

export async function register(
  username: string,
  password: string,
): Promise<{ user?: PublicUser; error?: string }> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  return parseAuthResponse(response);
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
