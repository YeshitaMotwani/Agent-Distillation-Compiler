import { FEATURES } from "@/lib/constants";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="section py-20">
      <span className="text-xs font-medium text-rose-400 uppercase tracking-wide">Features</span>
      <h2 className="text-3xl font-bold mt-2 mb-3">Why Agent Distillation?</h2>
      <p className="text-slate-400 max-w-xl mb-10">
        Production-grade cost optimization for LLM pipelines, built and benchmarked end-to-end.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} />
        ))}
      </div>
    </section>
  );
}