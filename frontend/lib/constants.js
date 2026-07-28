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

export const PASS_AT_1_DATA = [
  { name: "Ablation (rank 8)", passAt1: 88.2 },
  { name: "Primary (rank 32)", passAt1: 87.5 },
  { name: "Secondary (Llama3.1-8B)", passAt1: 31.2 },
];

export const LATENCY_COMPARISON = [
  { name: "Teacher (4+ calls)", calls: 4 },
  { name: "Student (1 call)", calls: 1 },
];

export const VRAM_DATA = [
  { name: "Yeshita\n(RTX 4050)", vram: 5.997 },
  { name: "Faiza\n(RTX 5070)", vram: 7.997 },
  { name: "Sakshi\n(RTX 4050)", vram: 5.997 },
];

export const BACKEND_SPEED_DATA = [
  { name: "CUDA (discrete)", prompt: 536.5, gen: 31.1 },
  { name: "Vulkan (discrete)", prompt: 352.0, gen: 27.4 },
  { name: "Vulkan (iGPU, partial)", prompt: 7.3, gen: 5.2 },
];

export const DPO_IMPROVEMENT = [
  { stage: "Before DPO", rewardAccuracy: 22.5 },
  { stage: "After DPO", rewardAccuracy: 58.8 },
];

export const ROUTER_ACCURACY = { value: 70.4, correct: 76, total: 108 };

export const HERO_METRICS = [
  { label: "Best pass@1", value: "88.2%" },
  { label: "Model calls reduced", value: "4x fewer" },
  { label: "Min VRAM required", value: "6GB" },
  { label: "DPO improvement", value: "2.6x" },
];

export const TECH_STACK = [
  "LangGraph", "Unsloth (QLoRA)", "TRL (SFT + DPO)", "Docker",
  "llama.cpp (GGUF)", "FastAPI", "Next.js", "Tailwind CSS",
  "Recharts", "Weights & Biases", "Ollama", "Groq/Gemini API",
];

export const BUGS_FOUND = [
  { title: "Windows Unsloth crash", detail: "Fused cross-entropy loss returned near-zero free memory on WDDM, crashing training. Fixed via a targeted monkey-patch (upstream issue #3827)." },
  { title: "Package shadowing", detail: "Local datasets/ and docker/ folders silently shadowed the pip packages of the same name." },
  { title: "Silent false-positive verification", detail: "HumanEval's check() function was never invoked under pytest, and MBPP's bare-assert tests weren't pytest-discoverable — both silently reported success regardless of actual code correctness." },
  { title: "Function-name mismatches", detail: "Coder/debugger prompts weren't strict enough about matching exact test function names, causing repeated NameErrors across all retries." },
  { title: "Gitignore directory-vs-contents", detail: "Patterns like models/ exclude the whole directory as a unit, silently blocking ! negation exceptions meant to track specific files inside." },
];

export const TEAM = [
  { name: "Yeshita Motwani", role: "Model Training & Distillation Lead", github: "YeshitaMotwani" },
  { name: "Faiza Bagban", role: "Dataset Pipeline & Primary Training Lead", github: "Faiza-Bagban" },
  { name: "Sakshi Kolhe", role: "Systems, Sandbox & Inference Lead", github: "SakshiKolhe-3095" },
];