"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { LATENCY_COMPARISON } from "@/lib/constants";
import { colors } from "@/styles/colors";

export default function LatencyChart() {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-1">Model Calls Per Request</h3>
      <p className="text-sm text-slate-400 mb-4">The teacher pipeline requires planning, coding, testing, and often debug retries — 4+ sequential calls. The student answers in one.</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={LATENCY_COMPARISON} layout="vertical" margin={{ left: 20, right: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis type="number" stroke={colors.muted} fontSize={12} />
          <YAxis type="category" dataKey="name" stroke={colors.muted} fontSize={12} width={140} />
          <Tooltip contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8 }} />
          <Bar dataKey="calls" fill={colors.primary} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}