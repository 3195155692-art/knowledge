---
aliases:
  - Skills 速查
  - 该用哪个技能
tags:
  - skills
  - 科研工具
  - 速查
安装日期: 2026-09-13
---

# Skills 调用速查

> 按「我想干的事」找技能。左边是任务，右边是推荐的库和技能名。返回入口见 [[科研 Skills 总览]]。

## 读文献

| 我想做的事 | 用哪个 |
| --- | --- |
| 单篇论文快速看懂 | `$alphaxiv`、`$paper-lookup`（[[Scientific Agent Skills]]） |
| 中英对照全文精读 | `$nature-reader`（[[Nature Skills]]） |
| 深度解读卡片 / 批判性阅读 | `$nature-paper-card`（[[Nature Skills]]） |
| 系统文献综述 | `$literature-review`、`$research-lookup`（[[Scientific Agent Skills]]）；[[ARS 学术研究套件]] 的综述模式 |
| 引文是否真实、是否被误用 | `$citation-audit`、`$nature-ref-verifier`（[[ARIS 自动科研]] / [[Nature Skills]]） |
| 批量管理参考文献 / 查重导出 | `$citation-management`、`$pyzotero`（[[Scientific Agent Skills]]） |

## 找方向

| 我想做的事 | 用哪个 |
| --- | --- |
| 从零找 idea（含查新） | `/idea-discovery`、`/novelty-check`（[[ARIS 自动科研]]） |
| 结构化脑暴 / 生成假设 | `$scientific-brainstorming`、`$hypothesis-generation`（[[Scientific Agent Skills]]） |
| 把想法打磨成可执行方案 | `/research-refine`、`/research-refine-pipeline`（[[ARIS 自动科研]]） |
| 创意与思路拓展 | `$creative-thinking-for-research`、`$brainstorming-research-ideas`（[[AI Research Skills]]） |

## 做实验

| 我想做的事 | 用哪个 |
| --- | --- |
| 实验设计与样本量 | `$experimental-design`、`$statistical-power`（[[Scientific Agent Skills]]） |
| 实验计划 → 实现 → 部署 | `/experiment-plan`、`/experiment-bridge`、`/run-experiment`（[[ARIS 自动科研]]） |
| 多任务排队跑实验 | `/experiment-queue`、`/monitor-experiment`（[[ARIS 自动科研]]） |
| 训练 / 微调 / 分布式训练 | [[AI Research Skills]]（deepspeed、axolotl、verl、megatron-core、peft…） |
| 量化与推理部署 | [[AI Research Skills]]（vllm、sglang、gptq、awq、gguf、tensorrt-llm…） |
| 跑评测 | `$lm-evaluation-harness`（[[AI Research Skills]]）；`$scholar-evaluation`（[[Scientific Agent Skills]]） |
| 实验结果统计与作图 | `$statistical-analysis`、`$scientific-visualization`、`$matplotlib`（[[Scientific Agent Skills]]） |
| 结果能不能支撑结论 | `/result-to-claim`、`/experiment-audit`（[[ARIS 自动科研]]） |

## 写论文

| 我想做的事 | 用哪个 |
| --- | --- |
| 整篇从零写或大改 | `/paperspine`（[[PaperSpine]]）、`/paper-write`（[[ARIS 自动科研]]） |
| 某一节怎么写（Intro / Method / Abstract） | `$research-paper-writing`（[[Research Paper Writing Skills]]） |
| ML / 系统会议论文写作规范 | `$ml-paper-writing`、`$systems-paper-writing`（[[AI Research Skills]]） |
| Nature 风格写作与润色 | `$nature-writing`、`$nature-polishing`（[[Nature Skills]]） |
| 数据可用性声明 / 统计报告 | `$nature-data`、`$nature-statistics`（[[Nature Skills]]） |
| 投稿模板与图表规范 | `$venue-templates`、`$scientific-visualization`（[[Scientific Agent Skills]]） |
| 公式推导 / 写证明 | `$formula-derivation`、`$proof-writer`、`$proof-checker`（[[ARIS 自动科研]]） |
| 定位论文贡献与主线 | `/research-refine`（[[ARIS 自动科研]]）、[[PaperSpine]] 的贡献确认阶段 |

## 审稿与投稿

| 我想做的事 | 用哪个 |
| --- | --- |
| 投稿前自审 / 模拟审稿 | `$nature-reviewer`（[[Nature Skills]]）、`/research-review`（[[ARIS 自动科研]]） |
| 对抗式挑刺（找拒稿理由） | `/kill-argument`（[[ARIS 自动科研]]） |
| 数字与结论是否对得上原始结果 | `/paper-claim-audit`（[[ARIS 自动科研]]） |
| 论文诚信 / 造假痕迹审计 | `/integrity-forensics`（[[ARIS 自动科研]]） |
| 审稿意见回复信 | `$nature-response`（[[Nature Skills]]）、`/rebuttal`（[[ARIS 自动科研]]） |
| 换会议重投 | `/resubmit-pipeline`（[[ARIS 自动科研]]） |
| 申请基金 / 写标书 | `$grant-proposal`（[[ARIS 自动科研]]）、`$research-grants`（[[Scientific Agent Skills]]） |

## 做图 / 做稿

| 我想做的事 | 用哪个 |
| --- | --- |
| 论文方法图 / 插画 | `$paper-comic`（[[Paper Craft Skills]]）、`$paper-illustration`（[[ARIS 自动科研]]） |
| 数据配图（出版级） | `$nature-figure`（[[Nature Skills]]）、`$matplotlib`、`$scientific-visualization`（[[Scientific Agent Skills]]） |
| 演示幻灯片 / 讲稿 | `$paper-deck`（[[Paper Craft Skills]]）、`$nature-paper2ppt`（[[Nature Skills]]）、`/paper-talk`（[[ARIS 自动科研]]） |
| 会议海报 | `$paper-poster-html`（[[ARIS 自动科研]]）、`$latex-posters`、`$pptx-posters`（[[Scientific Agent Skills]]） |
| 深度解读长文 / HTML 报告 | `$paper-analyzer`（[[Paper Craft Skills]]）、`$render-html`（[[ARIS 自动科研]]） |
| 图片转可编辑 PPT | `$nature-image2ppt`（[[Nature Skills]]） |

## 专业计算与数据库

| 我想做的事 | 用哪个 |
| --- | --- |
| 生信 / 组学分析 | [[Scientific Agent Skills]]（scanpy、pydeseq2、pysam、nextflow、bulk-rnaseq…） |
| 化学 / 药物 / 分子模拟 | [[Scientific Agent Skills]]（rdkit、datamol、deepchem、diffdock、molecular-dynamics…） |
| 临床 / 医学数据处理 | [[Scientific Agent Skills]]（pyhealth、pydicom、pathml、clinical-reports…） |
| 物理 / 天文 / 材料 / 量子 | [[Scientific Agent Skills]]（astropy、pymatgen、qiskit、qutip、pennylane…） |
| 通用数据清洗与统计建模 | [[Scientific Agent Skills]]（polars、dask、statsmodels、pymc、scikit-learn、shap…） |
| 查某个公共数据库 | `$database-lookup` 或对应领域技能（[[Scientific Agent Skills]]） |

## 自动化与流程

| 我想做的事 | 用哪个 |
| --- | --- |
| 全自动跑一条研究流水线 | `/research-pipeline`（[[ARIS 自动科研]]）、`$autoresearch`（[[AI Research Skills]]） |
| 多轮自动改进论文直到过审 | `/auto-paper-improvement-loop`、`/auto-review-loop`（[[ARIS 自动科研]]） |
| 建研究知识库并持续积累 | `/research-wiki`、`/wiki-enrich`（[[ARIS 自动科研]]） |
| 实验日志标准化记录 | `$nature-experiment-log`（[[Nature Skills]]） |
| 把论文转成专利初稿 | `$nature-paper-to-patent`（[[Nature Skills]]）、`/patent-pipeline`（[[ARIS 自动科研]]） |

## 相关

- [[科研 Skills 总览]]
- [[ARS 学术研究套件]]
- [[Nature Skills]]
- [[Scientific Agent Skills]]
- [[ARIS 自动科研]]
- [[AI Research Skills]]
- [[Research Paper Writing Skills]]
- [[PaperSpine]]
- [[Paper Craft Skills]]
