import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">stopwatch</h1>
        <nav className="space-y-2">
          <Link 
            href="/fullscreen" 
            className="block px-4 py-2 border hover:bg-muted transition-colors"
          >
            fullscreen
          </Link>
        </nav>
      </div>
    </div>
  );
}
