import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PipelineDetailed from "@/components/architecture/PipelineDetailed";
import TechBadges from "@/components/architecture/TechBadges";
import BugList from "@/components/architecture/BugList";

export const metadata = {
  title: "Architecture — Agent Distillation Compiler",
};

export default function ArchitecturePage() {
  return (
    <main>
      <Navbar />
      <div className="section py-16 space-y-14">
        <div>
          <span className="text-xs font-medium text-rose-400 uppercase tracking-wide">Architecture</span>
          <h1 className="text-3xl font-bold mt-2 mb-3">How It Works</h1>
          <p className="text-slate-400 max-w-2xl">
            From multi-agent teacher pipeline to single-pass student model — the full distillation flow.
          </p>
        </div>

        <PipelineDetailed />

        <div>
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <TechBadges />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Bugs Found & Fixed</h2>
          <p className="text-sm text-slate-400 mb-4">Several silently corrupted evaluation results before being caught through manual verification.</p>
          <BugList />
        </div>
      </div>
      <Footer />
    </main>
  );
}