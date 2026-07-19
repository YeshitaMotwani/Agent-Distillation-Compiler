"""
Exports a trained LoRA checkpoint to GGUF format via llama.cpp for
lightweight CPU/GPU inference (used in Week 8 backend serving).
"""
import subprocess
import os

def export_to_gguf(model_dir: str, output_path: str, quant_type: str = "Q4_K_M"):
    """
    model_dir: path to the merged/saved HF model (LoRA adapter + base, merged)
    output_path: where to write the .gguf file
    quant_type: quantization level (Q4_K_M is a good balance for 6GB cards)
    """
    llama_cpp_convert = "llama.cpp/convert_hf_to_gguf.py"  # adjust to your llama.cpp checkout path
    if not os.path.exists(llama_cpp_convert):
        raise FileNotFoundError(
            "llama.cpp not found. Clone it first: git clone https://github.com/ggml-org/llama.cpp"
        )

    subprocess.run([
        "python", llama_cpp_convert,
        model_dir,
        "--outfile", output_path,
        "--outtype", quant_type.lower()
    ], check=True)
    print(f"Exported to {output_path}")

if __name__ == "__main__":
    export_to_gguf(
        model_dir="models/yeshita_ablation_rank16_merged",
        output_path="models/yeshita_ablation_rank16.gguf"
    )