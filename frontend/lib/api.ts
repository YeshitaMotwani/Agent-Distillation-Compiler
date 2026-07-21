const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface GenerateResponse {
  code: string;
  route: "student" | "teacher";
  latency_ms: number;
  router_confidence: number;
  passed?: boolean;
}

export async function generateCode(problem: string, forceRoute?: string): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ problem, force_route: forceRoute }),
  });
  if (!res.ok) throw new Error("Generation failed");
  return res.json();
}