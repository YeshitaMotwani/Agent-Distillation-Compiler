import Header from "@/components/Header";

const TEAM = [
  { name: "Yeshita Motwani", role: "Model Training", github: "YeshitaMotwani" },
  { name: "Faiza Bagban", role: "Dataset Pipeline", github: "Faiza-Bagban" },
  { name: "Sakshi Kolhe", role: "Systems & Inference", github: "SakshiKolhe-3095" },
];

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto p-6 space-y-10">
        <section>
          <h2 className="text-lg font-semibold mb-3">Pipeline</h2>
          <p className="text-slate-400 text-sm">Problem → Planner → Coder → Sandbox Tester → Debugger (retry loop) → Router decides Student vs Teacher for future requests.</p>
        </section>
        <section className="grid md:grid-cols-3 gap-4">
          {TEAM.map((m) => (
            <a key={m.name} href={`https://github.com/${m.github}`} target="_blank"
              className="bg-slate-900 rounded-lg p-4 hover:bg-slate-800 transition">
              <div className="font-medium">{m.name}</div>
              <div className="text-xs text-slate-400">{m.role}</div>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}