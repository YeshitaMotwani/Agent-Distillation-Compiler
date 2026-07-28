import { EXAMPLE_PROBLEMS } from "@/lib/constants";

export default function ExampleCarousel({ onSelect }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-300 font-medium">Examples</label>
      <div className="flex flex-col gap-2">
        {EXAMPLE_PROBLEMS.map((ex) => (
          <button
            key={ex.title}
            onClick={() => onSelect(ex.problem)}
            className="text-left text-sm px-3 py-2 rounded-lg border hover:border-rose-500 transition"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            {ex.title}
          </button>
        ))}
      </div>
    </div>
  );
}