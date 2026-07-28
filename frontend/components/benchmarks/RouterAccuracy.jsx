import { ROUTER_ACCURACY } from "@/lib/constants";

export default function RouterAccuracy() {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-1">Hybrid Router Accuracy</h3>
      <p className="text-sm text-slate-400 mb-4">
        Trained on 538 labeled examples from real trajectory data, using 4 lightweight text features.
      </p>
      <div className="flex items-end gap-3">
        <span className="text-4xl font-bold text-rose-400">{ROUTER_ACCURACY.value}%</span>
        <span className="text-sm text-slate-400 mb-1">{ROUTER_ACCURACY.correct}/{ROUTER_ACCURACY.total} correct on held-out data</span>
      </div>
    </div>
  );
}