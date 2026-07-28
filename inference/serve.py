# """
# Model serving skeleton.
# Loads a HF checkpoint (or later GGUF) and exposes generate().
# """

# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch

# class ModelServer:
#     def __init__(self, model_path: str, device: str = None):
#         self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
#         self.tokenizer = AutoTokenizer.from_pretrained(model_path)
#         self.model = AutoModelForCausalLM.from_pretrained(
#             model_path,
#             torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
#         ).to(self.device)
#         self.model.eval()

#     def generate(self, prompt: str, max_new_tokens: int = 512, temperature: float = 0.7) -> str:
#         inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)
#         with torch.no_grad():
#             output = self.model.generate(
#                 **inputs,
#                 max_new_tokens=max_new_tokens,
#                 temperature=temperature,
#                 do_sample=temperature > 0,
#                 pad_token_id=self.tokenizer.eos_token_id,
#             )
#         text = self.tokenizer.decode(output[0], skip_special_tokens=True)
#         return text[len(prompt):].strip()


# if __name__ == "__main__":
#     # quick manual test
#     server = ModelServer("gpt2")  # replace with real checkpoint later
#     print(server.generate("Write a function that adds two numbers."))

# """
# Model serving skeleton.
# Loads a HF checkpoint or a GGUF checkpoint (via llama-cpp-python, using the
# CUDA/Vulkan builds from Week 1) and exposes a unified generate() interface.
# """

# import torch


# class ModelServer:
#     """
#     Unified interface over two backends:
#       - HuggingFace transformers (for .safetensors / HF-format checkpoints)
#       - llama.cpp via llama-cpp-python (for .gguf checkpoints)
#     Picks the backend automatically based on the file extension / path.
#     """

#     def __init__(self, model_path: str, device: str = None, n_gpu_layers: int = -1):
#         self.model_path = model_path
#         self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")

#         if model_path.lower().endswith(".gguf"):
#             self.backend = "gguf"
#             self._init_gguf(model_path, n_gpu_layers)
#         else:
#             self.backend = "hf"
#             self._init_hf(model_path)

#     def _init_hf(self, model_path: str):
#         from transformers import AutoModelForCausalLM, AutoTokenizer
#         self.tokenizer = AutoTokenizer.from_pretrained(model_path)
#         self.model = AutoModelForCausalLM.from_pretrained(
#             model_path,
#             torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
#         ).to(self.device)
#         self.model.eval()

#     def _init_gguf(self, model_path: str, n_gpu_layers: int):
#         from llama_cpp import Llama
#         # n_gpu_layers=-1 offloads all layers to GPU if available (CUDA build);
#         # set to 0 to force CPU-only.
#         self.llm = Llama(model_path=model_path, n_gpu_layers=n_gpu_layers, verbose=False)

#     def generate(self, prompt: str, max_new_tokens: int = 512, temperature: float = 0.7) -> str:
#         if self.backend == "gguf":
#             return self._generate_gguf(prompt, max_new_tokens, temperature)
#         return self._generate_hf(prompt, max_new_tokens, temperature)

#     def _generate_hf(self, prompt: str, max_new_tokens: int, temperature: float) -> str:
#         inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)
#         with torch.no_grad():
#             output = self.model.generate(
#                 **inputs,
#                 max_new_tokens=max_new_tokens,
#                 temperature=temperature,
#                 do_sample=temperature > 0,
#                 pad_token_id=self.tokenizer.eos_token_id,
#             )
#         text = self.tokenizer.decode(output[0], skip_special_tokens=True)
#         return text[len(prompt):].strip()

#     def _generate_gguf(self, prompt: str, max_new_tokens: int, temperature: float) -> str:
#         result = self.llm(
#             prompt,
#             max_tokens=max_new_tokens,
#             temperature=temperature,
#             echo=False,
#         )
#         return result["choices"][0]["text"].strip()


# if __name__ == "__main__":
#     # quick manual test (HF backend, small model for a fast smoke test)
#     server = ModelServer("gpt2")
#     print(server.generate("Write a function that adds two numbers."))
""""

Model serving with hybrid router integration.
Routes each problem through a complexity router:
  - "student" -> Llama3.1-8B QLoRA checkpoint (fast, local)
  - "teacher" -> DPO-aligned checkpoint (higher quality, used for complex tasks)

Router: inference/router.py + models/router.pkl (Yeshita, Week 7)
Student: models/sakshi_llama31_8b_rank4/checkpoint-9
DPO-aligned teacher: models/qlora-primary-dpo/checkpoint-7 (Faiza, Week 7)
"""

import sys
import os

_cwd = sys.path[0]
if _cwd in sys.path:
    sys.path.remove(_cwd)
from unsloth import FastLanguageModel
sys.path.insert(0, _cwd)

import torch
from inference.router import ComplexityRouter

_PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ROUTER_PATH = os.path.join(_PROJECT_ROOT, "models", "router.pkl")
STUDENT_CHECKPOINT = os.path.join(_PROJECT_ROOT, "models", "yeshita_ablation_rank16")
TEACHER_CHECKPOINT = os.path.join(_PROJECT_ROOT, "models", "qlora-primary-dpo", "checkpoint-7")

MAX_SEQ_LENGTH = 512


class HybridModelServer:
    """
    Serves code-generation requests by routing each problem through a
    ComplexityRouter, then generating with the appropriate model.
    Student model is always loaded; teacher model is loaded lazily on first use
    (saves VRAM on machines where both won't fit simultaneously).
    """

    def __init__(
        self,
        router_path: str = ROUTER_PATH,
        student_path: str = STUDENT_CHECKPOINT,
        teacher_path: str = TEACHER_CHECKPOINT,
        max_seq_length: int = MAX_SEQ_LENGTH,
    ):
        self.teacher_path = teacher_path
        self.max_seq_length = max_seq_length

        print(f"Loading router from {router_path}...")
        self.router = ComplexityRouter.load(router_path)

        print(f"Loading student model from {student_path}...")
        self.student_model, self.student_tokenizer = FastLanguageModel.from_pretrained(
            model_name=student_path,
            max_seq_length=max_seq_length,
            load_in_4bit=True,
            device_map={"": 0},
        )
        FastLanguageModel.for_inference(self.student_model)

        self._teacher_model = None
        self._teacher_tokenizer = None

    def _load_teacher(self):
        if self._teacher_model is None:
            # Free student model's VRAM before loading teacher — both can't
            # fit simultaneously on 6GB. Swap, don't stack.
           import torch
           import gc
           del self.student_model
           del self.student_tokenizer
           self.student_model = None
           self.student_tokenizer = None
           gc.collect()
           torch.cuda.empty_cache()
          
           gc.collect()
           torch.cuda.empty_cache()
           print(f"Loading teacher model from {self.teacher_path}...")
           self._teacher_model, self._teacher_tokenizer = FastLanguageModel.from_pretrained(
                model_name=self.teacher_path,
                max_seq_length=self.max_seq_length,
                load_in_4bit=True,
                device_map={"": 0},
            )
           FastLanguageModel.for_inference(self._teacher_model)
    def _load_student(self):
        if self.student_model is None:
            import torch
            import gc
            del self.teacher_model
            del self.teacher_tokenizer
            self.teacher_model = None
            self.teacher_tokenizer = None
            gc.collect()
            torch.cuda.empty_cache()
            gc.collect()
            torch.cuda.empty_cache()
            print(f"Reloading student model from {self.student_path}...")
            self.student_model, self.student_tokenizer = FastLanguageModel.from_pretrained(
                model_name=self.student_path,
                max_seq_length=self.max_seq_length,
                load_in_4bit=True,
                device_map={"": 0},
            )
            FastLanguageModel.for_inference(self.student_model)

    def _generate(self, model, tokenizer, prompt: str, max_new_tokens: int = 512) -> str:
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            do_sample=False,
            pad_token_id=tokenizer.eos_token_id,
        )
        generated = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return generated[len(prompt):].strip()

    def generate(self, problem: str, max_new_tokens: int = 512, force_route: str = None) -> dict:
        route = force_route if force_route in ("student", "teacher") else self.router.predict(problem)
        prompt = f"Problem:\n{problem}\n\nSolve this in Python."

        if route == "teacher":
            self._load_teacher()
            code = self._generate(self._teacher_model, self._teacher_tokenizer, prompt, max_new_tokens)
        else:
            self._load_student()
            code = self._generate(self.student_model, self.student_tokenizer, prompt, max_new_tokens)

        return {"code": code, "route": route}


if __name__ == "__main__":
    server = HybridModelServer()
    result = server.generate("Write a function that adds two numbers.")
    print(f"Route: {result['route']}")
    print(f"Code:\n{result['code']}")