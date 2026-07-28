import { cn } from "@/lib/utils";

const OPTIONS = ["auto", "student"];

export default function ModelSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-300 font-medium">Route</label>
      <div className="flex gap-1 rounded-lg p-1" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "flex-1 text-sm capitalize py-1.5 rounded-md transition",
              value === opt ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500">Teacher route disabled in this demo (6GB VRAM cannot reliably hold both models simultaneously — see Architecture page).</p>
    </div>
  );
}