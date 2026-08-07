"use client";

type LoadingOverlayProps = {
  visible: boolean;
  label?: string;
};

export function LoadingOverlay({
  visible,
  label = "Loading",
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">{label}</span>
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="loading-dot loading-dot-green" />
        <span className="loading-dot loading-dot-cyan" />
        <span className="loading-dot loading-dot-purple" />
      </div>
    </div>
  );
}
