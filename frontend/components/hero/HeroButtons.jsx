import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/demo" className="px-6 py-3 rounded-lg font-medium bg-rose-600 hover:bg-rose-500 text-white transition">
        Try Live Demo
      </Link>
      <Link href="/benchmarks" className="px-6 py-3 rounded-lg font-medium border text-slate-200 hover:bg-slate-800 transition" style={{ borderColor: "var(--border)" }}>
        View Benchmarks
      </Link>
    </div>
  );
}