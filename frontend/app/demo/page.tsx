"use client";
import { useState } from "react";
import { generateCode, GenerateResponse } from "@/lib/api";
import { MOCK_EXAMPLES } from "@/lib/mockData";
import CodeOutput from "@/components/CodeOutput";
import Header from "@/components/Header";

export default function DemoPage() {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState<string>("auto");

  async function handleGenerate() {
    setLoading(true);
    try {
      const res = await generateCode(problem, route === "auto" ? undefined : route);
      setResult(res);
    } catch {
      const mock = MOCK_EXAMPLES[Math.floor(Math.random() * MOCK_EXAMPLES.length)];
      setResult(mock);
    }
    setLoading(false);
  }

  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <textarea
            className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3"
            placeholder="Write a function to check if a number is prime..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
          <div className="flex gap-2 text-sm">
            {["auto", "student", "teacher"].map((r) => (
              <button key={r} onClick={() => setRoute(r)}
                className={`px-3 py-1 rounded ${route === r ? "bg-blue-600" : "bg-slate-800"}`}>
                {r}
              </button>
            ))}
          </div>
          <button onClick={handleGenerate} disabled={loading || !problem}
            className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-3 font-medium disabled:opacity-50">
            {loading ? "Thinking..." : "Generate"}
          </button>
          <div className="flex gap-2 flex-wrap">
            {MOCK_EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setProblem(ex.problem)}
                className="text-xs px-2 py-1 bg-slate-800 rounded">
                {ex.problem.slice(0, 30)}...
              </button>
            ))}
          </div>
        </div>
        <div>{result && <CodeOutput result={result} />}</div>
      </main>
    </div>
  );
}