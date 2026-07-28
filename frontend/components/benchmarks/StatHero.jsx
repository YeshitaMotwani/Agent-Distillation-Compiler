import { HERO_METRICS } from "@/lib/constants";

export default function StatHero() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {HERO_METRICS.map((m) => (
        <div key={m.label} className="card p-5 text-center">
          <div className="text-2xl md:text-3xl font-bold text-rose-400">{m.value}</div>
          <div className="text-xs text-slate-400 mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  );
}