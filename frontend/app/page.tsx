import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto text-center py-32 px-6">
        <h1 className="text-4xl font-bold mb-4">Agent Distillation Compiler</h1>
        <p className="text-slate-400 mb-8">Distilling a multi-agent coding teacher into a single-pass student model — 87.5% pass@1 at a fraction of the latency.</p>
        <Link href="/demo" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium">Try the demo</Link>
      </main>
    </div>
  );
}