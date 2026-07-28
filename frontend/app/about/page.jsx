import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import TeamGrid from "@/components/architecture/TeamGrid";

export const metadata = {
  title: "About — Agent Distillation Compiler",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="section py-16 space-y-10">
        <div>
          <span className="text-xs font-medium text-rose-400 uppercase tracking-wide">About</span>
          <h1 className="text-3xl font-bold mt-2 mb-3">The Project</h1>
          <p className="text-slate-400 max-w-2xl">
            A final-year B.Tech project distilling a multi-agent coding pipeline into a single fine-tuned model —
            comparable accuracy at roughly 4x fewer model calls, trained entirely on consumer 6-8GB laptop GPUs.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Team</h2>
          <TeamGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
}