"use client";
import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Download } from "lucide-react";

export default function CodeEditor({ code, status }) {
  const [displayed, setDisplayed] = useState("");
  const [copied, setCopied] = useState(false);
  const lastCodeRef = useRef(null);

  useEffect(() => {
    if (!code || code === lastCodeRef.current) return;
    lastCodeRef.current = code;

    let i = 0;
    const interval = setInterval(() => {
      i += 4;
      setDisplayed(code.slice(0, i));
      if (i >= code.length) clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }, [code]);

  function handleCopy() {
    navigator.clipboard.writeText(code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([code || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solution.py";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card p-0 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs text-slate-400">solution.py</span>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="text-slate-400 hover:text-white">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <button onClick={handleDownload} className="text-slate-400 hover:text-white">
            <Download size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {status === "loading" && (
          <div className="p-4 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 rounded animate-pulse" style={{ background: "var(--border)", width: `${60 + i * 8}%` }} />
            ))}
          </div>
        )}
        {status === "error" && (
          <div className="p-4 text-sm text-red-400">Generation failed. Try again.</div>
        )}
        {status !== "loading" && status !== "error" && (
          <SyntaxHighlighter language="python" style={oneDark} customStyle={{ margin: 0, background: "transparent", fontSize: "13px" }}>
            {displayed || "# Click Generate to see output"}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}