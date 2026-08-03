import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display italic text-xl tracking-tight">
          Franco<span className="text-bleu">Live</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-body text-sm">
          <Link href="/teachers" className="hover:text-bleu transition-colors">
            Find a Teacher
          </Link>
          <Link href="/dashboard/learner" className="hover:text-bleu transition-colors">
            My Dashboard
          </Link>
          <Link href="/dashboard/teacher" className="hover:text-bleu transition-colors">
            Teach on FrancoLive
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/learner" className="hidden sm:inline text-sm font-medium hover:text-bleu">
            Log in
          </Link>
          <Link href="/teachers" className="btn-primary text-sm px-4 py-2">
            Find a Teacher
          </Link>
        </div>
      </div>
    </header>
  );
}
