"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BUGS_FOUND } from "@/lib/constants";

export default function BugList() {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-2">
      {BUGS_FOUND.map((bug, i) => (
        <div key={bug.title} className="card overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-medium text-sm">{bug.title}</span>
            <ChevronDown size={16} className={`transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-slate-400">{bug.detail}</div>
          )}
        </div>
      ))}
    </div>
  );
}