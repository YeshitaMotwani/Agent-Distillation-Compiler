"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function VRAMChart({ data }: { data: { name: string; vram: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ background: "#1e293b", border: "none" }} />
        <Bar dataKey="vram" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SpeedChart({ data }: { data: { name: string; prompt: number; gen: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ background: "#1e293b", border: "none" }} />
        <Bar dataKey="prompt" fill="#3b82f6" name="Prompt t/s" radius={[6, 6, 0, 0]} />
        <Bar dataKey="gen" fill="#10b981" name="Gen t/s" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}