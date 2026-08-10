import Link from "next/link";

export function AppHeader() {
  return (
    <nav className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
      <Link href="/" className="font-semibold tracking-tight">
        StackRec
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link
          href="/history"
          className="text-foreground/60 transition-colors hover:text-foreground"
        >
          History
        </Link>
        <Link
          href="/account"
          className="text-foreground/60 transition-colors hover:text-foreground"
        >
          Account
        </Link>
        <Link
          href="/questionnaire"
          className="inline-flex h-8 items-center justify-center rounded-full bg-foreground px-4 font-medium text-background transition-colors hover:bg-foreground/85"
        >
          New
        </Link>
      </div>
    </nav>
  );
}
