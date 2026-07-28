"use client";
import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function GenerateButton({ onClick, status }) {
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    if (status !== "done") {
      const hideTimeout = setTimeout(() => setShowDone(false), 0);
      return () => clearTimeout(hideTimeout);
    }

    const showTimeout = setTimeout(() => setShowDone(true), 0);
    const resetTimeout = setTimeout(() => setShowDone(false), 2000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(resetTimeout);
    };
  }, [status]);

  const label = status === "loading" ? "Generating..." : showDone ? "Completed" : "Generate Code";

  return (
    <button
      onClick={onClick}
      disabled={status === "loading"}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium bg-rose-600 hover:bg-rose-500 disabled:opacity-60 text-white transition"
    >
      {status === "loading" && <Loader2 size={16} className="animate-spin" />}
      {showDone && <Check size={16} />}
      {label}
    </button>
  );
}