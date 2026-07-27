"use client";
import { useTypewriter } from "@/hooks/useTypewriter";

const SNIPPET = `def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True`;

export default function HeroEditor() {
  const displayed = useTypewriter(SNIPPET, 15);

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-slate-400">solution.py</span>
      </div>
      <pre className="p-4 text-sm text-slate-200 min-h-[180px] overflow-x-auto">
        <code>{displayed}<span className="animate-pulse">▍</span></code>
      </pre>
      <div className="flex flex-wrap gap-2 px-4 py-3 border-t text-xs" style={{ borderColor: "var(--border)" }}>
        <span className="px-2 py-1 rounded bg-emerald-900 text-emerald-300">🧠 Student</span>
        <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">⚡ 420ms</span>
        <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">🔀 91% confidence</span>
        <span className="px-2 py-1 rounded bg-emerald-900 text-emerald-300">✓ Passed</span>
      </div>
    </div>
  );
}