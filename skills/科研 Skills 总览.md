---
aliases:
  - Skills 总览
  - 科研 Skills
tags:
  - skills
  - 科研工具
  - MOC
来源: 本地安装记录（2026-09-13）
技能数: 371
安装位置: ~/.codex/skills/
安装日期: 2026-09-13
---

# 科研 Skills 总览

> 本地 Codex 里装好的 8 套科研技能库，共 371 个技能目录。这张笔记是入口，用来快速判断该用哪一套、以及怎么调用。

## 一句话选型

| 库 | 技能数 | 什么时候用它 |
| --- | --- | --- |
| [[ARS 学术研究套件]] | 1 | 一套编排式科研工作流，覆盖从深度调研、写论文到模拟审稿的全流程。 |
| [[Nature Skills]] | 19 | 面向 Nature 系投稿的中文友好技能库：精读、写作、润色、审稿、返修、绘图、PPT、专利。 |
| [[Scientific Agent Skills]] | 165 | 让 agent 真正去调科研数据库、分析工具和专业计算的技能库，本批里体量最大的一套。 |
| [[ARIS 自动科研]] | 82 | 把「找方向→跑实验→写论文→对抗审稿→返修重投」串成自动流程的科研工作台，主推跨模型互审。 |
| [[AI Research Skills]] | 98 | 把 AI 研究里最耗时间的工程活（训练、微调、评测、部署、排错）做成可直接调用的技能。 |
| [[Research Paper Writing Skills]] | 1 | 一套偏方法论写作的轻量技能：怎么把已经做完的研究组织成清楚的论文。 |
| [[PaperSpine]] | 1 | 以「贡献优先、面向审稿人」为核心的论文写作与重构系统，先定主线再逐节写。 |
| [[Paper Craft Skills]] | 3 | 把难读的论文拆成方法图、深度解读长文和幻灯片，偏「面向读者的再表达」。 |

上表合计 370 个可调用技能；另有 1 个共享支持包 `nature-shared` 和 ARIS 的 `shared-references` 共享契约目录，两者都被其他技能引用，**不单独调用**。

## 怎么调用（通用）

Codex 里触发技能有两种方式，任选其一：

1. **直接描述任务**——最省事。技能描述里写了触发场景，命中就会自动加载，例如「把这篇论文做成中英文对照的 reader」会命中 `nature-reader`。
2. **点名调用**——写 `$技能名`，例如 `$scanpy`、`$research-paper-writing`；ARIS 和 PaperSpine 还提供斜杠命令，例如 `/research-pipeline`、`/paperspine`。

几个通用习惯：

- 说清**输入在哪**（PDF 路径、数据目录、已有稿件）和**想要什么产出**（Markdown / PPTX / PDF / 图表）。
- 长流程（写论文、跑实验、做 PPT）先建一个工作目录，让产物有地方落。
- 技能只是说明书，真正跑起来还需要对应环境：Python 包、GPU、API key、LaTeX 等，缺什么它会提示。
- **装完要新开一个对话才生效**。

## 安装信息

- 安装位置：`~/.codex/skills/`（每个技能一个目录，里面是 SKILL.md 加所需脚本和参考文件）
- 安装日期：2026-09-13
- ARIS 的辅助脚本放在 `~/.codex/aris-src`，并在 Codex 配置里注册了 `ARIS_REPO`
- PaperSpine 同时装了 `/paperspine` 提示词（`~/.codex/prompts/paperspine.md`）
- 有三处重名已改名：`kdense-modal`、`kdense-pytorch-lightning`、`kdense-exa-search`

## 注意

371 个技能意味着每个对话都会带上这些技能的名称和描述，**常驻上下文不小**。如果发现回答变慢或选错技能，可以只保留常用的一部分——K-Dense 官方也建议不要整包装。

## 相关

- [[Skills 调用速查]]
- [[ARS 学术研究套件]]
- [[Nature Skills]]
- [[Scientific Agent Skills]]
- [[ARIS 自动科研]]
- [[AI Research Skills]]
- [[Research Paper Writing Skills]]
- [[PaperSpine]]
- [[Paper Craft Skills]]
