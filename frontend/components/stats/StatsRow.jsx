"use client";
import { HERO_STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";

function Stat({ label, value, suffix }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-rose-400">{animated}{suffix}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

export default function StatsRow() {
  return (
    <section className="section py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {HERO_STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}