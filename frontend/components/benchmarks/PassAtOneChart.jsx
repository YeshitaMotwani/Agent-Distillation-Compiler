"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { PASS_AT_1_DATA } from "@/lib/constants";
import { colors } from "@/styles/colors";

export default function PassAtOneChart() {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-1">pass@1 Across Configurations</h3>
      <p className="text-sm text-slate-400 mb-4">Two configs on the same base model converge to nearly identical accuracy — evidence the dataset size, not model capacity, is the binding constraint.</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={PASS_AT_1_DATA} margin={{ left: 0, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="name" stroke={colors.muted} fontSize={12} />
          <YAxis stroke={colors.muted} fontSize={12} unit="%" />
          <Tooltip contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8 }} />
          <Bar dataKey="passAt1" radius={[6, 6, 0, 0]}>
            {PASS_AT_1_DATA.map((entry, i) => (
              <Cell key={i} fill={i === 2 ? colors.warning : colors.primary} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}