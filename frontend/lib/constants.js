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

export const EXAMPLE_PROBLEMS = [
  { title: "Two Sum", problem: "Given an array of integers and a target, return indices of the two numbers that add up to the target." },
  { title: "Binary Search", problem: "Implement binary search on a sorted array, returning the index of the target or -1 if not found." },
  { title: "LRU Cache", problem: "Design a Least Recently Used (LRU) cache with O(1) get and put operations." },
  { title: "Sudoku Solver", problem: "Write a function that solves a 9x9 Sudoku puzzle by filling empty cells." },
];