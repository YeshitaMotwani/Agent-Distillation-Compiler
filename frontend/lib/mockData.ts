export const MOCK_EXAMPLES = [
  {
    problem: "Write a function to check if a number is prime.",
    code: `def is_prime(n):\n    if n <= 1:\n        return False\n    if n <= 3:\n        return True\n    if n % 2 == 0 or n % 3 == 0:\n        return False\n    i = 5\n    while i * i <= n:\n        if n % i == 0 or n % (i + 2) == 0:\n            return False\n        i += 6\n    return True`,
    route: "student" as const,
    latency_ms: 420,
    router_confidence: 0.91,
    passed: true,
  },
  {
    problem: "Write a function that reverses a string.",
    code: `def reverse_string(s):\n    return s[::-1]`,
    route: "student" as const,
    latency_ms: 310,
    router_confidence: 0.95,
    passed: true,
  },
];

export const BENCHMARK_STATS = {
  student_pass_at_1: 87.5,
  teacher_pass_at_1: 87.5,
  vram_gb: 5.997,
  gen_speed: 31.1,
};

export const VRAM_DATA = [
  { name: "Yeshita (RTX 4050)", vram: 5.997 },
  { name: "Faiza (RTX 5070)", vram: 7.997 },
  { name: "Sakshi (RTX 4050)", vram: 5.997 },
];

export const BACKEND_SPEED_DATA = [
  { name: "CUDA (discrete)", prompt: 536.5, gen: 31.1 },
  { name: "Vulkan (discrete)", prompt: 352.0, gen: 27.4 },
  { name: "Vulkan (iGPU, partial)", prompt: 7.3, gen: 5.2 },
];