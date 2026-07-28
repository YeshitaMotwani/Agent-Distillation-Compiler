"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { BACKEND_SPEED_DATA } from "@/lib/constants";
import { colors } from "@/styles/colors";

export default function BackendSpeedChart() {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-1">CUDA vs Vulkan Inference Speed</h3>
      <p className="text-sm text-slate-400 mb-4">Same GGUF-quantized model, same RTX 4050. CUDA is ~52% faster on prompt processing; the AMD iGPU proves cross-vendor portability but isn&apos;t a performance path for models this size.</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={BACKEND_SPEED_DATA} margin={{ left: 0, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis dataKey="name" stroke={colors.muted} fontSize={12} />
          <YAxis stroke={colors.muted} fontSize={12} unit=" t/s" />
          <Tooltip contentStyle={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="prompt" name="Prompt (t/s)" fill={colors.primary} radius={[6, 6, 0, 0]} />
          <Bar dataKey="gen" name="Generation (t/s)" fill={colors.success} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}