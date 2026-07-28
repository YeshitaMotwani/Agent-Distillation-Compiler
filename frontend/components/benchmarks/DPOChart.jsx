"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DPO_IMPROVEMENT } from "@/lib/constants";
import { colors } from "@/styles/colors";

export default function DPOChart() {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-1">DPO Alignment — Preference Accuracy</h3>
      <p className="text-sm text-slate-400 mb-4">rewards/accuracies improved 2.6x across one epoch of preference-pair training (97 pairs from real retry trajectories).</p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={DPO_IMPROVEMENT} margin={{ left: 0, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="stage" stroke={colors.muted} fontSize={12} />
          <YAxis stroke={colors.muted} fontSize={12} unit="%" />
          <Tooltip contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8 }} />
          <Line type="monotone" dataKey="rewardAccuracy" stroke={colors.primary} strokeWidth={3} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}