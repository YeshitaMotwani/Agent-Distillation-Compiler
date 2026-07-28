"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { VRAM_DATA } from "@/lib/constants";
import { colors } from "@/styles/colors";

export default function VRAMChart() {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-1">Peak VRAM Across Team Hardware</h3>
      <p className="text-sm text-slate-400 mb-4">The entire pipeline — training and inference — fits within consumer 6-8GB laptop GPUs.</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={VRAM_DATA} margin={{ left: 0, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="name" stroke={colors.muted} fontSize={12} />
          <YAxis stroke={colors.muted} fontSize={12} unit="GB" />
          <Tooltip contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8 }} />
          <Bar dataKey="vram" fill={colors.success} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}