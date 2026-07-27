import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Features from "@/components/cards/Features";
import PipelineDiagram from "@/components/pipeline/PipelineDiagram";
import StatsRow from "@/components/stats/StatsRow";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Agent Distillation Compiler",
  description: "Hybrid Student-Teacher AI Code Generation Platform",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <PipelineDiagram />
      <StatsRow />
      <Footer />
    </main>
  );
}