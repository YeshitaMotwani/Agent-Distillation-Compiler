# Agent Distillation Compiler

![CI](https://github.com/YeshitaMotwani/Agent-Distillation-Compiler/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10%2B-blue.svg)

Distilling a slow, expensive multi-agent coding pipeline into a single fine-tuned model that solves problems in one pass — at a fraction of the latency and cost, with comparable accuracy.

---

## What This Is

Most AI coding assistants run a multi-step pipeline under the hood: plan the approach, write the code, test it, debug on failure, retry. That's accurate but expensive — every request costs 4+ model calls.

This project builds that full multi-agent teacher pipeline, then **distills its behavior into a single small model** that produces the same quality output in one pass. The result: **~87-88% pass@1 retention at roughly 4x fewer model calls**, running entirely on consumer 6-8GB laptop GPUs.

Full architecture, dataset, and training plan: `docs/architecture.md`

## Team

Final-year B.Tech project — 3-person team, hardware-split by role:

| Member | Focus | Hardware |
|---|---|---|
| Yeshita Motwani | Model training, distillation pipeline, router, frontend | RTX 4050, 6GB |
| Faiza Bagban | Dataset pipeline, primary training run, DPO pairs | RTX 5070, 8GB |
| Sakshi Kolhe | Systems, sandbox, inference serving, cross-backend benchmarking | RTX 4050, 6GB |

## Architecture

```
Problem + tests
      │
      ▼
┌─────────────┐
│   Planner   │  breaks problem into steps
└──────┬──────┘
       ▼
┌─────────────┐
│    Coder    │  writes the solution
└──────┬──────┘
       ▼
┌─────────────┐      fail      ┌─────────────┐
│   Sandbox   │ ──────────────▶│  Debugger   │
│   Tester    │◀────────────── │  (retry)    │
└──────┬──────┘      retry     └─────────────┘
       │ pass
       ▼
    Trajectory logged → compressed → SFT training data
```

A **teacher router** (`agents/teacher_router.py`) tries a local Ollama model first, falling back to Groq/Gemini API teachers on failure — so the pipeline works whether you have a local GPU or not.

Passing trajectories are compressed (`agents/compressor.py`) from a multi-step trace into a single coherent chain-of-thought, forming the supervised fine-tuning dataset for the student model.

A **hybrid complexity router** (`inference/router.py`) then decides, per incoming request, whether the fast student model suffices or the full teacher pipeline is needed.

## Results

| Run | Base Model | Rank | Eval Loss | pass@1 |
|---|---|---|---|---|
| Ablation | Qwen2.5-Coder-7B-Instruct | 8 | 0.538 | 88.2% (15/17) |
| Primary | Qwen2.5-Coder-7B-Instruct | 32 | 0.495 | 87.5% |
| Secondary experiment | Llama-3.1-8B-Instruct | 4 | 1.022 | 31.2% |

Two independently trained configurations on the same base model converge to nearly identical pass@1 despite differing LoRA rank — strong evidence that **dataset size (174 examples), not training configuration, is the binding constraint** on further improvement. This is documented honestly rather than hidden: the original target was 800-1500 examples.

**DPO alignment:** rewards/accuracies improved from 0.225 → 0.588 across one epoch of preference-pair training, a 2.6x improvement in the model's ability to prefer correct code over buggy code.

**Cross-hardware inference (CUDA vs Vulkan, RTX 4050):**

| Backend | Device | Prompt (t/s) | Generation (t/s) |
|---|---|---|---|
| CUDA | RTX 4050 (discrete) | 536.5 | 31.1 |
| Vulkan | RTX 4050 (discrete) | 352.0 | 27.4 |
| Vulkan | Radeon 740M (iGPU, partial offload) | 7.3 | 5.2 |

**Router:** 70.4% held-out accuracy (76/108) routing easy vs. hard tasks to student vs. teacher, trained on 538 labeled trajectory examples using 4 lightweight text features.

**VRAM footprint across team hardware:** 5.997–7.997 GB peak, confirming the entire pipeline (QLoRA training + inference) fits comfortably within consumer 6-8GB GPUs.

Full charts: `benchmarks/`. Full writeup: `docs/final_report.md`, `docs/model_card.md`, `docs/training_guide.md`, `docs/dpo_alignment_results.md`.

## Tech Stack

| Layer | Tools |
|---|---|
| Teacher orchestration | LangGraph |
| Teacher models | Ollama (local) + Groq/Gemini (API fallback) |
| Fine-tuning | Unsloth (QLoRA 4-bit), TRL (SFT + DPO) |
| Sandbox execution | Docker |
| Inference export | llama.cpp (GGUF, CUDA + Vulkan backends) |
| Backend | FastAPI |
| Frontend | Next.js, Tailwind CSS, Recharts, Framer Motion |
| Tracking | Weights & Biases |

## Repository Structure

```
agents/            # planner, coder, debugger, sandbox executor, teacher router
training/          # QLoRA and DPO training scripts (per team member's config), shared W&B config
datasets/          # raw trajectories, compressed SFT data, train/val/test splits
evaluation/        # pass@1 checkpoint eval, final benchmark suite
inference/         # router, GGUF export, serving
backend/           # FastAPI serving endpoint (wraps inference/serve.py)
frontend/          # Next.js demo UI (landing, live demo, benchmarks, architecture, about)
docker_configs/    # sandbox execution Dockerfile
docs/              # architecture, training guide, final report, bug log
benchmarks/        # comparison charts
```

## Live Demo (Frontend)

A recruiter-facing demo UI — landing page, live code generation, real benchmark charts, and architecture walkthrough.

**Pages:**
- `/` — landing page with animated hero, feature cards, pipeline overview
- `/demo` — live code generation against the real backend (problem input, examples, generated code with copy/download, latency + route metadata)
- `/benchmarks` — real project results: pass@1 comparison, latency, VRAM footprint, CUDA vs Vulkan speed, DPO improvement, router accuracy
- `/architecture` — detailed pipeline breakdown, tech stack, bugs found & fixed
- `/about` — team and project summary

**Known limitation:** the live demo defaults to student-only routing. Sequential loading of both student and teacher models exceeds available VRAM on 6GB consumer GPUs — a genuine hardware constraint, not a design limitation. The teacher pipeline and router are fully implemented and verified independently (see `docs/final_report.md`).

### Running the frontend + backend together

**Terminal 1 — backend:**
```bash
cd backend
pip install fastapi uvicorn
python -m uvicorn main:app --port 8000
```
Wait for `Application startup complete.` (loads the student model, takes ~10-60s).

**Terminal 2 — frontend:**
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:3000`.

**Environment:** `frontend/.env.local` should contain:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Setup — Backend / Pipeline

See `docs/architecture.md` and per-member environment setup notes (e.g. `docs/env_sakshi.md`) for exact dependency versions and Windows-specific fixes (CUDA toolkit, gitignore patterns, package version pins).

```bash
pip install -r requirements.txt
ollama pull qwen2.5:7b-instruct-q4_K_M
python -m agents.run_pipeline   # smoke test the teacher pipeline
```

## Training Tracking (W&B)

All training runs (primary QLoRA, ablation run, and any future experiments) log to a single shared Weights & Biases project so results are directly comparable across configurations.

**Project:** `agent-distillation-compiler`

**To log a training run to the shared project:**

1. Log in to W&B locally:
   ```bash
   wandb login
   ```
   (get your API key from https://wandb.ai/authorize)

2. Ask to be added as a collaborator on the shared project if not already invited (wandb.ai project settings → Users).

3. Use the shared config helper instead of calling `wandb.init()` directly:
   ```python
   from training.wandb_config import init_wandb_run

   run = init_wandb_run(
       run_name="faiza-primary-rank32",   # descriptive, includes your name + config
       config={"rank": 32, "batch_size": 2, "grad_accum": 8},
       tags=["primary"],                  # or ["ablation"], etc.
   )
   ```

4. Log metrics as usual (`wandb.log({...})` inside your training loop) and call `run.finish()` at the end.

## Known Limitations

- **Dataset size**: 174 passing examples, below the original 800-1500 target. Pass@1 plateaued across configurations rather than improving with more training — a genuine data ceiling, not a config issue.
- **Router accuracy**: 70.4% using simple hand-crafted features; a learned embedding-based router would likely outperform this heuristic.
- **MBPP vs HumanEval gap**: MBPP's terser, more ambiguous problem statements consistently showed lower pass rates than HumanEval across every teacher and student configuration tested.

## Bugs Found & Fixed Along the Way

Several non-obvious bugs were silently corrupting evaluation results before being caught through manual verification — documented in detail in `docs/training_guide.md`:

- A Windows-specific crash in Unsloth's fused cross-entropy loss (upstream issue [#3827](https://github.com/unslothai/unsloth/issues/3827))
- A local `datasets/` folder silently shadowing the pip `datasets` package
- HumanEval's `check()` function never being invoked under `pytest`, causing false-positive passes regardless of code correctness
- Coder/debugger prompts not being strict enough about matching exact function names, causing repeated `NameError` failures
- A `.gitignore` directory-vs-contents pattern bug that silently blocked tracking of needed files
