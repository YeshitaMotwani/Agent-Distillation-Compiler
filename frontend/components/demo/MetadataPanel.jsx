"use client";

function Metric({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-2 border-b" style={{ borderColor: "var(--border)" }}>
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function MetadataPanel({ result, status }) {
  const latencyMs = result ? Math.round(result.latency_seconds * 1000) : null;

  if (!result && status !== "loading") {
    return <div className="text-sm text-slate-500">Generate code to see metadata.</div>;
  }

  return (
    <div className="space-y-1">
      <Metric label="Route" value={result?.route || "—"} />
      <Metric label="Latency" value={latencyMs !== null ? `${latencyMs}ms` : "—"} />
      <div className="flex justify-between text-sm py-2">
        <span className="text-slate-400">Status</span>
        <span className={`px-2 py-1 rounded text-xs ${status === "loading" ? "bg-slate-800 text-slate-300" : "bg-emerald-900 text-emerald-300"}`}>
          {status === "loading" ? "Generating" : "Done"}
        </span>
      </div>
    </div>
  );
}