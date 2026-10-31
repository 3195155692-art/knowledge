---
aliases:
  - AI-Research-SKILLs
  - AI 研究技能库
  - autoresearch
tags:
  - skills
  - 科研工具
  - AI研究
  - 训练
  - 微调
  - 推理
  - 评测
来源: https://github.com/Orchestra-Research/AI-Research-SKILLs
技能数: 98
安装位置: ~/.codex/skills/
安装日期: 2026-09-13
---

# AI Research Skills

> 把 AI 研究里最耗时间的工程活（训练、微调、评测、部署、排错）做成可直接调用的技能。

## 作用

按 AI 研究的工程链路分成 23 个类别：

- **模型与架构**：nanogpt、mamba、rwkv、torchtitan、litgpt
- **分词与数据**：huggingface-tokenizers、sentencepiece、nemo-curator、ray-data
- **微调**：axolotl、llama-factory、peft、unsloth
- **后训练 / RL**：verl、openrlhf、trl-fine-tuning、grpo-rl-training、simpo、slime、miles、torchforge
- **分布式训练**：deepspeed、megatron-core、pytorch-fsdp2、accelerate、ray-train、pytorch-lightning
- **优化与量化**：flash-attention、gptq、awq、hqq、gguf、bitsandbytes、model-pruning、model-merging、speculative-decoding、long-context、moe-training
- **推理部署**：vllm、sglang、tensorrt-llm、llama-cpp
- **评测与运维**：lm-evaluation-harness、bigcode-evaluation-harness、nemo-evaluator、mlflow、swanlab、tensorboard、weights-and-biases
- **Agent / RAG / 提示工程 / 可解释性 / 多模态**：langchain、llamaindex、crewai、autogpt、dspy、guidance、instructor、outlines、transformer-lens、pyvene、nnsight、saelens、clip、llava、whisper
- **论文写作**：ml-paper-writing、systems-paper-writing、academic-plotting、presenting-conference-talks
- **总编排**：`autoresearch`（两循环架构，自动跑实验并推进）

## 调用方法

- 想让它自己跑研究：`$autoresearch`，给一个方向和研究目标。
- 具体工程问题直接点名最省事，例如「用 DeepSpeed ZeRO-3 改这个训练脚本」「模型想量化到 4bit 部署，vLLM 和 llama.cpp 怎么选」「用 lm-evaluation-harness 跑 MMLU 并解释口径」。

## 包含的技能（98 个）

| 技能 | 作用 |
| --- | --- |
| `evolving-ai-agents` | Provides guidance for automatically evolving and optimizing AI agents across any domain u… |
| `academic-plotting` | Generates publication-quality figures for ML papers from research context. |
| `huggingface-accelerate` | Simplest distributed training API. |
| `audiocraft-audio-generation` | PyTorch library for audio generation including text-to-music (MusicGen) and text-to-sound… |
| `autogpt-agents` | Autonomous AI agent platform for building and deploying continuous agents. |
| `autoresearch` | Orchestrates end-to-end autonomous AI research projects using a two-loop architecture. |
| `awq-quantization` | Activation-aware weight quantization for 4-bit LLM compression with 3x speedup and minima… |
| `axolotl` | Expert guidance for fine-tuning LLMs with Axolotl - YAML configs, 100+ models, LoRA/QLoRA… |
| `evaluating-code-models` | Evaluates code generation models across HumanEval, MBPP, MultiPL-E, and 15+ benchmarks wi… |
| `quantizing-models-bitsandbytes` | Quantizes LLMs to 8-bit or 4-bit for 50-75% memory reduction with minimal accuracy loss. |
| `blip-2-vision-language` | Vision-language pre-training framework bridging frozen image encoders and LLMs. |
| `brainstorming-research-ideas` | Guides researchers through structured ideation frameworks to discover high-impact researc… |
| `chroma` | Open-source embedding database for AI applications. |
| `clip` | OpenAI's model connecting vision and language. |
| `ara-compiler` | Compiles any research input — PDF papers, GitHub repositories, experiment logs, code dire… |
| `constitutional-ai` | Anthropic's method for training harmless AI through self-improvement. |
| `evaluating-cosmos-policy` | Evaluates NVIDIA Cosmos Policy on LIBERO and RoboCasa simulation environments. |
| `creative-thinking-for-research` | Applies cognitive science frameworks for creative thinking to CS and AI research ideation. |
| `crewai-multi-agent` | Multi-agent orchestration framework for autonomous AI collaboration. |
| `deepspeed` | Expert guidance for distributed training with DeepSpeed - ZeRO optimization stages, pipel… |
| `dspy` | Build complex AI systems with declarative programming, optimize prompts automatically, cr… |
| `faiss` | Facebook's library for efficient similarity search and clustering of dense vectors. |
| `optimizing-attention-flash` | Optimizes transformer attention with Flash Attention for 2-4x speedup and 10-20x memory r… |
| `gguf-quantization` | GGUF format and llama.cpp quantization for efficient CPU/GPU inference. |
| `gptq` | Post-training 4-bit quantization for LLMs with minimal accuracy loss. |
| `grpo-rl-training` | Expert guidance for GRPO/RL fine-tuning with TRL for reasoning and task-specific model tr… |
| `guidance` | Control LLM output with regex and grammars, guarantee valid JSON/XML/code generation, enf… |
| `hqq-quantization` | Half-Quadratic Quantization for LLMs without calibration data. |
| `huggingface-tokenizers` | Fast tokenizers optimized for research and production. |
| `instructor` | Extract structured data from LLM responses with Pydantic validation, retry failed extract… |
| `knowledge-distillation` | Compress large language models using knowledge distillation from teacher to student model… |
| `lambda-labs-gpu-cloud` | Reserved and on-demand GPU cloud instances for ML training and inference. |
| `langchain` | Framework for building LLM-powered applications with agents, chains, and RAG. |
| `langsmith-observability` | LLM observability platform for tracing, evaluation, and monitoring. |
| `implementing-llms-litgpt` | Implements and trains LLMs using Lightning AI's LitGPT with 20+ pretrained architectures… |
| `llama-cpp` | Runs LLM inference on CPU, Apple Silicon, and consumer GPUs without NVIDIA hardware. |
| `llama-factory` | Expert guidance for fine-tuning LLMs with LLaMA-Factory - WebUI no-code, 100+ models, 2/3… |
| `llamaguard` | Meta's 7-8B specialized moderation model for LLM input/output filtering. |
| `llamaindex` | Data framework for building LLM applications with RAG. |
| `llava` | Large Language and Vision Assistant. |
| `evaluating-llms-harness` | Evaluates LLMs across 60+ academic benchmarks (MMLU, HumanEval, GSM8K, TruthfulQA, HellaS… |
| `long-context` | Extend context windows of transformer models using RoPE, YaRN, ALiBi, and position interp… |
| `mamba-architecture` | State-space model with O(n) complexity vs Transformers' O(n²). |
| `training-llms-megatron` | Trains large language models (2B-462B parameters) using NVIDIA Megatron-Core with advance… |
| `miles-rl-training` | Provides guidance for enterprise-grade RL training using miles, a production-ready fork o… |
| `ml-paper-writing` | Write publication-ready ML/AI papers for NeurIPS, ICML, ICLR, ACL, AAAI, COLM. |
| `ml-training-recipes` | Battle-tested PyTorch training recipes for all domains — LLMs, vision, diffusion, medical… |
| `mlflow` | Track ML experiments, manage model registry with versioning, deploy models to production,… |
| `modal-serverless-gpu` | Serverless GPU cloud platform for running ML workloads. |
| `model-merging` | Merge multiple fine-tuned models using mergekit to combine capabilities without retrainin… |
| `model-pruning` | Reduce LLM size and accelerate inference using pruning techniques like Wanda and SparseGP… |
| `moe-training` | Train Mixture of Experts (MoE) models using DeepSpeed or HuggingFace. |
| `nanogpt` | Educational GPT implementation in ~300 lines. |
| `nemo-curator` | GPU-accelerated data curation for LLM training. |
| `nemo-evaluator-sdk` | Evaluates LLMs across 100+ benchmarks from 18+ harnesses (MMLU, HumanEval, GSM8K, safety,… |
| `nemo-guardrails` | NVIDIA's runtime safety framework for LLM applications. |
| `nnsight-remote-interpretability` | Provides guidance for interpreting and manipulating neural network internals using nnsigh… |
| `fine-tuning-serving-openpi` | Fine-tune and serve Physical Intelligence OpenPI models (pi0, pi0-fast, pi0.5) using JAX… |
| `openrlhf-training` | High-performance RLHF framework with Ray+vLLM acceleration. |
| `fine-tuning-openvla-oft` | Fine-tunes and evaluates OpenVLA-OFT and OpenVLA-OFT+ policies for robot action generatio… |
| `outlines` | Guarantee valid JSON/XML/code structure during generation, use Pydantic models for type-s… |
| `peft-fine-tuning` | Parameter-efficient fine-tuning for LLMs using LoRA, QLoRA, and 25+ methods. |
| `phoenix-observability` | Open-source AI observability platform for LLM tracing, evaluation, and monitoring. |
| `pinecone` | Managed vector database for production AI applications. |
| `presenting-conference-talks` | Generates conference presentation slides (Beamer LaTeX PDF and editable PPTX) from a comp… |
| `prompt-guard` | Meta's 86M prompt injection and jailbreak detector. |
| `pytorch-fsdp2` | Adds PyTorch FSDP2 (fully_shard) to training scripts with correct init, sharding, mixed p… |
| `pytorch-lightning` | High-level PyTorch framework with Trainer class, automatic distributed training (DDP/FSDP… |
| `pyvene-interventions` | Provides guidance for performing causal interventions on PyTorch models using pyvene's de… |
| `qdrant-vector-search` | High-performance vector similarity search engine for RAG and semantic search. |
| `ray-data` | Scalable data processing for ML workloads. |
| `ray-train` | Distributed training orchestration across clusters. |
| `ara-research-manager` | Records research provenance as a post-task epilogue, scanning conversation history at the… |
| `ara-rigor-reviewer` | Performs ARA Seal Level 2 semantic epistemic review on Agent-Native Research Artifacts, s… |
| `rwkv-architecture` | RNN+Transformer hybrid with O(n) inference. |
| `sparse-autoencoder-training` | Provides guidance for training and analyzing Sparse Autoencoders (SAEs) using SAELens to… |
| `segment-anything-model` | Foundation model for image segmentation with zero-shot transfer. |
| `sentence-transformers` | Framework for state-of-the-art sentence, text, and image embeddings. |
| `sentencepiece` | Language-independent tokenizer treating text as raw Unicode. |
| `sglang` | Fast structured generation and serving for LLMs with RadixAttention prefix caching. |
| `simpo-training` | Simple Preference Optimization for LLM alignment. |
| `skypilot-multi-cloud-orchestration` | Multi-cloud orchestration for ML workloads with automatic cost optimization. |
| `slime-rl-training` | Provides guidance for LLM post-training with RL using slime, a Megatron+SGLang framework. |
| `speculative-decoding` | Accelerate LLM inference using speculative decoding, Medusa multiple heads, and lookahead… |
| `stable-diffusion-image-generation` | State-of-the-art text-to-image generation with Stable Diffusion models via HuggingFace Di… |
| `experiment-tracking-swanlab` | Provides guidance for experiment tracking with SwanLab. |
| `systems-paper-writing` | Comprehensive guide for writing systems papers targeting OSDI, SOSP, ASPLOS, NSDI, and Eu… |
| `tensorboard` | Visualize training metrics, debug models with histograms, compare experiments, visualize… |
| `tensorrt-llm` | Optimizes LLM inference with NVIDIA TensorRT for maximum throughput and lowest latency. |
| `torchforge-rl-training` | Provides guidance for PyTorch-native agentic RL using torchforge, Meta's library separati… |
| `distributed-llm-pretraining-torchtitan` | Provides PyTorch-native distributed LLM pretraining using torchtitan with 4D parallelism… |
| `transformer-lens-interpretability` | Provides guidance for mechanistic interpretability research using TransformerLens to insp… |
| `fine-tuning-with-trl` | Fine-tune LLMs using reinforcement learning with TRL - SFT for instruction tuning, DPO fo… |
| `unsloth` | Expert guidance for fast fine-tuning with Unsloth - 2-5x faster training, 50-80% less mem… |
| `verl-rl-training` | Provides guidance for training LLMs with reinforcement learning using verl (Volcano Engin… |
| `serving-llms-vllm` | Serves LLMs with high throughput using vLLM's PagedAttention and continuous batching. |
| `weights-and-biases` | Track ML experiments with automatic logging, visualize training in real-time, optimize hy… |
| `whisper` | OpenAI's general-purpose speech recognition model. |

## 注意事项

- 这类技能是**指导型**（教 agent 正确使用某个框架），真正跑起来仍需要对应环境：GPU、CUDA、框架版本。
- 仓库同时提供 npm 包（@orchestra-research/ai-research-skills）作为统一安装入口。

## 相关

- [[Scientific Agent Skills]]
- [[ARIS 自动科研]]
- [[Skills 调用速查]]
