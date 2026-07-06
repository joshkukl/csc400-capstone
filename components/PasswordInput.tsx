"use client";

import { useId, useState } from "react";

type PasswordInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
  placeholder: string;
  minLength?: number;
};

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a14.2 14.2 0 0 1-2.28 3.32" />
      <path d="M6.61 6.61A14.2 14.2 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export function PasswordInput({
  id,
  value,
  onChange,
  autoComplete,
  placeholder,
  minLength = 8,
}: PasswordInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id={inputId}
        type={showPassword ? "text" : "password"}
        autoComplete={autoComplete}
        required
        minLength={minLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-foreground/15 bg-transparent py-3 pl-4 pr-11 text-sm outline-none transition-colors focus:border-foreground/40"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShowPassword((visible) => !visible)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/45 transition-colors hover:text-foreground/70"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
