export const NAV_ITEMS = [
  { label: "Demo", href: "/demo" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Architecture", href: "/architecture" },
  { label: "About", href: "/about" },
];

export const FEATURES = [
  {
    icon: "Zap",
    title: "Hybrid Intelligence",
    description: "A lightweight router decides per-request whether the fast student model or full teacher pipeline handles the task.",
  },
  {
    icon: "Gauge",
    title: "Low Latency, High Accuracy",
    description: "87%+ pass@1 retention at roughly 4x fewer model calls than the full multi-agent pipeline.",
  },
  {
    icon: "Cpu",
    title: "Efficient Compute",
    description: "Trained and served entirely on consumer 6-8GB GPUs via 4-bit QLoRA fine-tuning.",
  },
  {
    icon: "ShieldCheck",
    title: "Reliable Generation",
    description: "Every solution is verified in a sandboxed test environment before being trusted.",
  },
];

export const HERO_STATS = [
  { label: "Student pass@1", value: 87.5, suffix: "%" },
  { label: "Latency reduction", value: 75, suffix: "%" },
  { label: "Generation speedup", value: 3.4, suffix: "x" },
  { label: "VRAM footprint", value: 6, suffix: "GB" },
];