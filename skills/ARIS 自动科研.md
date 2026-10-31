---
aliases:
  - ARIS
  - Auto-claude-code-research-in-sleep
  - 自动科研
tags:
  - skills
  - 科研工具
  - 自动化
  - 论文写作
  - 审稿
  - 工作流
来源: https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep
技能数: 82
安装位置: ~/.codex/skills/
安装日期: 2026-09-13
---

# ARIS 自动科研（Auto-Research-In-Sleep）

> 把「找方向→跑实验→写论文→对抗审稿→返修重投」串成自动流程的科研工作台，主推跨模型互审。

## 作用

ARIS 以流程编排为核心，主线有两段：

- **主链**：`/research-pipeline` = 找 idea（W1）→ 实现实验（W1.5）→ 自动评审（W2）→ 写论文（W3）。
- **后论文**：`/rebuttal`（返修回复）、`/resubmit-pipeline`（换会议重投）、`/paper-talk`（讲稿）。

还有一整套论文工程技能：图表规范、海报、幻灯片、渲染 HTML 报告、公式推导、证明写作与检查、引用审查、论文数据核对、实验诚信审计、专利流水线、研究知识库（research-wiki）、面试速查表等。

它的核心设计是把**执行者**和**评审者**分开：执行方写代码写论文，评审方用另一个模型独立挑错，并把「评审是否真的独立」记录在结果里。

## 调用方法

- 用斜杠命令点名：`/research-pipeline`、`/idea-discovery`、`/novelty-check`、`/experiment-plan`、`/auto-review-loop`、`/paper-write`、`/rebuttal`、`/paper-talk`。
- 常用参数：`effort: lite | balanced | max | beast`（投入多少轮）、`assurance: draft | polished | conference-ready | submission`（审计严格度）、`venue:`、`sources:`、`gpu:`、`reviewer:`。
- 中文口语也能触发：「帮我找 idea 并跑自查」「审一下这篇论文的数据有没有对不上」。

## 包含的技能（82 个）

| 技能 | 作用 |
| --- | --- |
| `ablation-planner` | Use when main results pass result-to-claim (`claim_supported = yes` or `partial`) and abl… |
| `alphaxiv` | Quick single-paper lookup via AlphaXiv LLM-optimized summaries with tiered source fallbac… |
| `"analyze-results"` | Analyze ML experiment results, compute statistics, generate comparison tables and insight… |
| `"arxiv"` | Search, download, and summarize academic papers from arXiv. |
| `auto-paper-improvement-loop` | Autonomously improve a generated paper via GPT-6-Astra xhigh review → implement fixes → r… |
| `"auto-review-loop"` | Autonomous multi-round research review loop. |
| `"auto-review-loop-llm"` | Autonomous research review loop using any OpenAI-compatible LLM API. |
| `"auto-review-loop-minimax"` | Autonomous multi-round research review loop using MiniMax API. |
| `citation-audit` | Zero-context verification that every bibliographic entry in the paper is real, correctly… |
| `claims-drafting` | Draft patent claims for an invention. |
| `comm-lit-review` | Communications-domain literature review with Claude-style knowledge-base-first retrieval. |
| `"deepxiv"` | Search and progressively read open-access academic papers through DeepXiv. |
| `"dse-loop"` | Autonomous design space exploration loop for computer architecture and EDA. |
| `embodiment-description` | Write detailed embodiment descriptions for patent specifications. |
| `exa-search` | AI-powered web search via Exa with content extraction. |
| `experiment-audit` | Audit experiment integrity before claiming results. |
| `experiment-bridge` | Workflow 1.5: Bridge between idea discovery and auto review. |
| `"experiment-plan"` | Turn a refined research proposal or method idea into a detailed, claim-driven experiment… |
| `experiment-queue` | SSH job queue for multi-seed/multi-config ML experiments with OOM-aware retry, stale-scre… |
| `"feishu-notify"` | Send notifications to Feishu/Lark. |
| `figure-description` | Process user-provided patent figures and generate formal drawing descriptions. |
| `figure-spec` | Generate deterministic publication-quality architecture, workflow, and pipeline diagrams… |
| `formula-derivation` | Structures and derives research formulas when the user wants to 推导公式, build a theory line… |
| `gemini-search` | Search research papers via Gemini for broad literature discovery. |
| `grant-proposal` | Draft a structured grant proposal from research ideas and literature. |
| `"idea-creator"` | Generate and rank research ideas given a broad direction. |
| `"idea-discovery"` | Workflow 1: Full idea discovery pipeline to go from a broad research direction to validat… |
| `"idea-discovery-robot"` | Workflow 1 adaptation for robotics and embodied AI. |
| `integrity-forensics` | Run the Anti-Autoresearch integrity-forensics DETERMINISTIC slice (numeric core + rules-o… |
| `interview-cheatsheet` | Generate a long-form Chinese interview-prep cheat sheet on a specific ML/LLM topic — form… |
| `invention-structuring` | Structure a raw invention idea into a formal invention disclosure. |
| `jurisdiction-format` | Compile patent application into jurisdiction-specific filing format. |
| `kill-argument` | Two-thread adversarial review: a fresh reviewer constructs the strongest 200-word rejecti… |
| `"mermaid-diagram"` | Generate Mermaid diagrams from user requirements. |
| `meta-apply` | Privileged applier that LANDS meta-optimize / corpus-audit patches the user approved, wit… |
| `meta-optimize` | Analyze ARIS usage logs and propose optimizations to SKILL.md files, reviewer prompts, an… |
| `"monitor-experiment"` | Monitor running experiments, check progress, collect results. |
| `"novelty-check"` | Verify research idea novelty against recent literature. |
| `openalex` | Search academic papers via OpenAlex API for open citation data, institutional affiliation… |
| `overleaf-sync` | Two-way sync between a local paper directory and an Overleaf project, so ARIS audit/edit… |
| `paper-claim-audit` | Zero-context verification that every number, comparison, and scope claim in the paper mat… |
| `"paper-compile"` | Compile LaTeX paper to PDF, fix errors, and verify output. |
| `"paper-figure"` | Generate publication-quality figures and tables from experiment results. |
| `paper-illustration` | Generate publication-quality AI illustrations for academic papers using Gemini image gene… |
| `paper-illustration-image2` | Generate publication-quality academic illustrations through a local Codex app-server brid… |
| `"paper-plan"` | Generate a structured paper outline from review conclusions and experiment results. |
| `paper-poster` | DEPRECATED — superseded by /paper-poster-html. |
| `paper-poster-html` | DEFAULT poster pipeline — build an academic conference poster (ICML/NeurIPS/ICLR/CVPR/...… |
| `paper-slides` | Generate conference presentation slides (beamer LaTeX → PDF + editable PPTX) from a compi… |
| `paper-talk` | End-to-end conference talk pipeline: paper → slide outline → Beamer + PPTX → per-page pol… |
| `"paper-write"` | Draft LaTeX paper section by section from an outline. |
| `paper-writing` | Workflow 3: Full paper writing pipeline that goes from a narrative report to a polished,… |
| `patent-novelty-check` | Assess patent novelty and non-obviousness against prior art. |
| `patent-pipeline` | Full patent drafting pipeline from invention description to jurisdiction-formatted filing… |
| `patent-review` | Get an external patent examiner review of a patent application. |
| `"pixel-art"` | Generate pixel art SVG illustrations for READMEs, docs, or slides. |
| `prior-art-search` | Search patent databases and academic literature for prior art relevant to an invention. |
| `proof-checker` | Rigorous mathematical proof verification and fixing workflow. |
| `proof-orchestrator` | Manage a stateful, run-directory-based proof project with Codex: continuation across runs… |
| `"proof-writer"` | Writes rigorous mathematical proofs for ML/AI theory. |
| `qzcli` | Manage GPU compute jobs on the Qizhi (启智) platform using qzcli — a kubectl-style CLI tool. |
| `rebuttal` | Workflow 4: Submission rebuttal pipeline. |
| `render-html` | Render an ARIS Markdown / JSON artifact (IDEA_REPORT, AUTO_REVIEW, KILL_ARGUMENT, PAPER_P… |
| `"research-lit"` | Search and analyze research papers, find related work, summarize key ideas. |
| `research-pipeline` | Full end-to-end research pipeline: from a broad research direction through idea discovery… |
| `"research-refine"` | Turn a vague research direction into a problem-anchored, elegant, frontier-aware, impleme… |
| `"research-refine-pipeline"` | Run an end-to-end workflow that chains `research-refine` and `experiment-plan`. |
| `"research-review"` | Get a deep critical review of research from GPT using a secondary Codex agent. |
| `research-wiki` | Persistent research knowledge base that accumulates papers, ideas, experiments, claims, a… |
| `resubmit-pipeline` | Workflow 5: orchestrate a text-only resubmit of a polished paper to a different venue und… |
| `result-to-claim` | Use when experiments complete to judge what claims the results support, what they don't,… |
| `"run-experiment"` | Deploy and run ML experiments on local or remote GPU servers. |
| `semantic-scholar` | Search published venue papers (IEEE, ACM, Springer, etc.) via Semantic Scholar API. |
| `serverless-modal` | Run GPU workloads on Modal — training, fine-tuning, inference, batch processing. |
| `slides-polish` | Per-page Codex review + targeted python-pptx / Beamer fixes for academic talk slides. |
| `specification-writing` | Write the full patent specification from claims and invention disclosure. |
| `system-profile` | Profile a target (script, process, GPU, memory, interconnect) for performance analysis. |
| `training-check` | Interactively monitor training metrics from the current Codex session, periodically check… |
| `vast-gpu` | Rent, manage, and destroy GPU instances on vast.ai. |
| `web-debug-search` | Search GitHub, Stack Exchange, Chinese technical communities, official documentation, and… |
| `wiki-enrich` | Fill in the per-paper TODO sections of research-wiki/papers/<slug>.md pages that literatu… |
| `writing-systems-papers` | Paragraph-level structural blueprint for 10-12 page systems papers targeting OSDI, SOSP,… |

## 注意事项

- 辅助脚本放在 `~/.codex/aris-src`，并在 Codex 配置里注册了 `ARIS_REPO` 指向它，技能里的 `$ARIS_REPO/tools/...` 才能解析到。
- **Codex 基础评审属于同族评审**，结果会标 `review_independence: same-family`、`acceptance_status: provisional`；要真正跨模型评审需另配 MCP 评审服务（codex-exec / claude-review / gemini-review）。
- 部分技能需要 API key 或 GPU 平台（vast、modal、启智等）。
- 技能之间靠 `shared-references/*.md` 共享契约，这批文件已补装到技能根目录。

## 相关

- [[AI Research Skills]]
- [[ARS 学术研究套件]]
- [[PaperSpine]]
- [[Skills 调用速查]]
