"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CodeEditor from "./CodeEditor";

const TABS = ["Code", "Execution", "Logs"];

export default function OutputTabs({ code, status }) {
  const [active, setActive] = useState("Code");

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4 border-b mb-3" style={{ borderColor: "var(--border)" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={cn(
              "text-sm pb-2 px-1 transition",
              active === t ? "text-white border-b-2 border-rose-500" : "text-slate-400"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {active === "Code" && <CodeEditor code={code} status={status} />}
      {active !== "Code" && (
        <div className="text-sm text-slate-500 p-4">Coming soon.</div>
      )}
    </div>
  );
}