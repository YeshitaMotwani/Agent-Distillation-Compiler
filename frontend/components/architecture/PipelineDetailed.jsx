export default function PipelineDetailed() {
  const steps = [
    { title: "Problem + Tests", desc: "Input coding problem with test cases" },
    { title: "Planner", desc: "Breaks the problem into implementation steps" },
    { title: "Coder", desc: "Writes a candidate solution" },
    { title: "Complexity Router", desc: "Decides student (fast) vs teacher (thorough) path — trained on 538 real trajectory examples, 70.4% held-out accuracy" },
    { title: "Sandbox Tester", desc: "Runs the solution against tests inside an isolated Docker container" },
    { title: "Debugger (retry loop)", desc: "On failure, up to 3 retries with test error fed back into the prompt" },
    { title: "Trajectory Compression", desc: "Passing multi-step traces compressed into single-pass chain-of-thought — the core distillation step" },
    { title: "QLoRA Fine-tuning", desc: "4-bit LoRA fine-tuning on the compressed dataset, trained on consumer 6-8GB GPUs" },
    { title: "DPO Alignment", desc: "Preference-pair training on retry trajectories (rejected=early attempt, preferred=final) — 2.6x improvement in reward accuracy" },
    { title: "GGUF Export", desc: "Quantized and tested on both CUDA and Vulkan backends" },
  ];

  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={s.title} className="card p-4 flex gap-4">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(244,63,94,0.15)", color: "var(--primary)" }}>
            {i + 1}
          </div>
          <div>
            <div className="font-medium text-sm">{s.title}</div>
            <div className="text-sm text-slate-400 mt-0.5">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}