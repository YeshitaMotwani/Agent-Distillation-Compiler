import PipelineNode from "./PipelineNode";
import PipelineArrow from "./PipelineArrow";

export default function PipelineDiagram() {
  return (
    <section className="section py-20">
      <span className="text-xs font-medium text-rose-400 uppercase tracking-wide">Architecture</span>
      <h2 className="text-3xl font-bold mt-2 mb-10">How It Works</h2>
      <div className="max-w-md">
        <PipelineNode title="Problem" subtitle="+ test cases" />
        <PipelineArrow />
        <PipelineNode title="Planner" subtitle="breaks down the approach" />
        <PipelineArrow />
        <PipelineNode title="Coder" subtitle="writes the solution" />
        <PipelineArrow />
        <PipelineNode title="Router" subtitle="decides student vs teacher" />
        <PipelineArrow />
        <div className="grid grid-cols-2 gap-4">
          <PipelineNode title="Student" subtitle="fast, single-pass" />
          <PipelineNode title="Teacher" subtitle="full pipeline, retries" />
        </div>
        <PipelineArrow />
        <PipelineNode title="Sandbox Tester" subtitle="verifies correctness" />
        <PipelineArrow />
        <PipelineNode title="Output" subtitle="verified solution" />
      </div>
    </section>
  );
}