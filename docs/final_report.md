# Agent Distillation Compiler — Final Technical Report

## 1. Problem & Approach
[compress multi-agent teacher → single-pass student, per original project brief]

## 2. Architecture
[teacher pipeline diagram, compression step, training pipeline — reference docs/architecture.md]

## 3. Dataset
- 538 total tasks (HumanEval + MBPP), 174 passing trajectories after all pipeline fixes
- Known limitation: below 800-1500 target; team decision to proceed and document honestly

## 4. Training Results
[pull from docs/best_checkpoint_selection.md — all three runs, eval_loss, pass@1]

## 5. Bugs Found & Fixed
[pull from docs/training_guide.md's consolidated list — Windows fused-CE, datasets shadowing,
HumanEval check() invocation, sandbox pytest-vs-plain-python, gitignore negation, etc.]

## 6. Evaluation
[pass@1 retention chart, VRAM comparison, CUDA vs Vulkan inference benchmark from Sakshi]

## 7. Limitations & Future Work
[data ceiling, router accuracy ceiling, what more data collection would likely improve]

## 8. Conclusion