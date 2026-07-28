const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

/** @param {import('./apiTypes').GenerateRequest} params */
export function generateCode({ problem, maxNewTokens = 1024, model = "auto" }) {
  return apiFetch("/generate", {
    method: "POST",
    body: JSON.stringify({
      problem,
      max_new_tokens: maxNewTokens,
      force_route: model === "auto" ? null : model,
    }),
  });
}