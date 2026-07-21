import Header from "@/components/Header";
import { VRAMChart, SpeedChart } from "@/components/BenchmarkChart";
import { VRAM_DATA, BACKEND_SPEED_DATA, BENCHMARK_STATS } from "@/lib/mockData";

export default function BenchmarksPage() {
  const stats = [
    { label: "Student pass@1", value: `${BENCHMARK_STATS.student_pass_at_1}%` },
    { label: "Teacher pass@1", value: `${BENCHMARK_STATS.teacher_pass_at_1}%` },
    { label: "VRAM footprint", value: `${BENCHMARK_STATS.vram_gb} GB` },
    { label: "Gen speed (CUDA)", value: `${BENCHMARK_STATS.gen_speed} tok/s` },
  ];
  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto p-6 space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-slate-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{s.value}</div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <section>
          <h2 className="text-lg font-semibold mb-3">VRAM Footprint Across Team Hardware</h2>
          <VRAMChart data={VRAM_DATA} />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3">CUDA vs Vulkan Inference Speed</h2>
          <SpeedChart data={BACKEND_SPEED_DATA} />
        </section>
      </main>
    </div>
  );
}