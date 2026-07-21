"use client";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import RouterBadge from "./RouterBadge";
import type { GenerateResponse } from "@/lib/api";

export default function CodeOutput({ result }: { result: GenerateResponse }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(result.code.slice(0, i));
      i += 3;
      if (i > result.code.length) clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }, [result.code]);

  return (
    <div className="space-y-3">
      <SyntaxHighlighter language="python" style={oneDark} customStyle={{ borderRadius: 8 }}>
        {displayed}
      </SyntaxHighlighter>
      <div className="flex gap-2 flex-wrap text-xs">
        <RouterBadge route={result.route} />
        <span className="px-2 py-1 rounded bg-slate-800">⚡ {result.latency_ms}ms</span>
        <span className="px-2 py-1 rounded bg-slate-800">🔀 {(result.router_confidence * 100).toFixed(0)}%</span>
        {result.passed !== undefined && (
          <span className={`px-2 py-1 rounded ${result.passed ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`}>
            {result.passed ? "✓ Passed" : "✗ Failed"}
          </span>
        )}
      </div>
    </div>
  );
}