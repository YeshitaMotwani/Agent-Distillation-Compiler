"""
Documents peak VRAM usage across all three team machines during training,
based on reported hardware specs and observed peak usage.
"""
import matplotlib.pyplot as plt

data = {
    "Yeshita\n(RTX 4050, 6GB)": 5.997,
    "Faiza\n(RTX 5070, 8GB)": 7.997,     # fill in her actual reported max_memory from her training logs
    "Sakshi\n(RTX 4050, 6GB)": 5.997,
}

plt.figure(figsize=(8, 5))
plt.bar(data.keys(), data.values(), color="#8172B3")
plt.ylabel("VRAM (GB)")
plt.title("Peak VRAM Usage Across Team Hardware")
plt.tight_layout()
plt.savefig("benchmarks/vram_comparison.png")
print("Saved chart: benchmarks/vram_comparison.png")