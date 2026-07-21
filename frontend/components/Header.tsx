import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <span className="font-bold text-lg text-blue-400">Agent Distillation Compiler</span>
      <nav className="flex gap-6 text-sm text-slate-300">
        <Link href="/demo">Demo</Link>
        <Link href="/benchmarks">Benchmarks</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}