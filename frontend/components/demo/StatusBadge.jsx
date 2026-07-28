import { cn } from "@/lib/utils";

export default function StatusBadge({ status }) {
  const map = {
    passed: { label: "Passed", cls: "bg-emerald-900 text-emerald-300" },
    failed: { label: "Failed", cls: "bg-red-900 text-red-300" },
    generating: { label: "Generating", cls: "bg-slate-800 text-slate-300" },
  };
  const s = map[status] || map.generating;
  return <span className={cn("px-2 py-1 rounded text-xs", s.cls)}>{s.label}</span>;
}