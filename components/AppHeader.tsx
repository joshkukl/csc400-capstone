import Link from "next/link";

export function AppHeader() {
  return (
    <nav className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
      <Link href="/" className="font-semibold tracking-tight">
        StackRec
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link
          href="/account"
          className="font-medium transition-colors hover:text-foreground/70"
        >
          Account Info
        </Link>
        <Link
          href="/questionnaire"
          className="font-medium transition-colors hover:text-foreground/70"
        >
          Get Recommendation
        </Link>
      </div>
    </nav>
  );
}
