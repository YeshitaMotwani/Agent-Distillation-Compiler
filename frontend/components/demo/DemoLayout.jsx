"use client";
import { useState } from "react";
import { generateCode } from "@/lib/api";
import ProblemInput from "./ProblemInput";
import ExampleCarousel from "./ExampleCarousel";
import ModelSelector from "./ModelSelector";
import GenerateButton from "./GenerateButton";
import OutputTabs from "./OutputTabs";
import MetadataPanel from "./MetadataPanel";

export default function DemoLayout() {
  const [problem, setProblem] = useState("");
  const [model, setModel] = useState("auto");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");

  async function handleGenerate() {
    setStatus("loading");
    try {
      const res = await generateCode({ problem, maxNewTokens: 1024,model });
      setResult(res);
      console.log("API response:", res);
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="section py-10 grid xl:grid-cols-[360px_1fr_300px] gap-6">
      <div className="space-y-6">
        <ProblemInput value={problem} onChange={setProblem} />
        <ExampleCarousel onSelect={setProblem} />
        <ModelSelector value={model} onChange={setModel} />
        <p className="text-xs text-slate-500">Routing is currently automatic (server-side).</p>
        <GenerateButton onClick={handleGenerate} status={status} />
      </div>

      <div className="card p-4 min-h-[400px]">
        <OutputTabs code={result?.code} status={status} />
      </div>

      <div className="card p-4">
        <MetadataPanel result={result} status={status} />
      </div>
    </div>
  );
}