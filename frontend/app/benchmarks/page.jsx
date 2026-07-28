import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import StatHero from "@/components/benchmarks/StatHero";
import PassAtOneChart from "@/components/benchmarks/PassAtOneChart";
import LatencyChart from "@/components/benchmarks/LatencyChart";
import VRAMChart from "@/components/benchmarks/VRAMChart";
import BackendSpeedChart from "@/components/benchmarks/BackendSpeedChart";
import DPOChart from "@/components/benchmarks/DPOChart";
import RouterAccuracy from "@/components/benchmarks/RouterAccuracy";

export const metadata = {
  title: "Benchmarks — Agent Distillation Compiler",
};

export default function BenchmarksPage() {
  return (
    <main>
      <Navbar />
      <div className="section py-16">
        <span className="text-xs font-medium text-rose-400 uppercase tracking-wide">Results</span>
        <h1 className="text-3xl font-bold mt-2 mb-3">Benchmarks</h1>
        <p className="text-slate-400 max-w-2xl mb-10">
          Real measured results across three independently trained configurations, two inference backends, and three consumer GPUs.
        </p>

        <StatHero />

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <PassAtOneChart />
          <LatencyChart />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <VRAMChart />
          <RouterAccuracy />
        </div>
        <div className="mb-6">
          <BackendSpeedChart />
        </div>
        <div>
          <DPOChart />
        </div>
      </div>
      <Footer />
    </main>
  );
}