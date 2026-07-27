"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--background)" }}>
      <p className="text-red-400 text-sm">Something went wrong.</p>
      <button onClick={reset} className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm">
        Try again
      </button>
    </div>
  );
}