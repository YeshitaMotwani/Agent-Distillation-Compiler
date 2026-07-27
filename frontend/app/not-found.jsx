import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3" style={{ background: "var(--background)" }}>
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-slate-400 text-sm">This page could not be found.</p>
      <Link href="/" className="text-rose-400 text-sm underline">Go home</Link>
    </div>
  );
}