---
aliases:
  - ARS
  - academic-research-skills
  - 学术研究套件
tags:
  - skills
  - 科研工具
  - 论文写作
  - 文献检索
  - 审稿
来源: https://github.com/Imbad0202/academic-research-skills-codex
技能数: 1
安装位置: ~/.codex/skills/
安装日期: 2026-09-13
---

# ARS 学术研究套件（Academic Research Suite）

> 一套编排式科研工作流，覆盖从深度调研、写论文到模拟审稿的全流程。

## 作用

它把整条学术流水线拆成可组合的模式：深度调研、文献综述 / 系统综述 / meta 分析、研究问题打磨、论文撰写与修订、引用与学术诚信核查、模拟审稿与编辑决定信、研究到论文的管线，以及实验方案设计。

在 Codex 里装的是官方 Codex 原生版本（单入口 `academic-research-suite`，带 `ars-*` 别名）。原仓库 Imbad0202/academic-research-skills 是 Claude Code 版本，其 README 明确指路 Codex 用户改用这个姊妹仓库。

## 调用方法

- 直接描述任务即可，例如「帮我做一次这个方向的系统综述」「按这封审稿意见改稿」。
- 点名调用：`$academic-research-suite`。
- 指令里给出场景参数会更稳：目标期刊 / 会议、投入深度、审稿严格度。
- 产物通常落在项目目录（报告、修订稿、核查清单），建议先建一个工作目录。

## 包含的技能（1 个）

| 技能 | 作用 |
| --- | --- |
| `academic-research-suite` | ARS-Codex workflows for research, academic writing, manuscript review, research-to-paper… |

## 注意事项

- 核心流程是提示词驱动，**不需要 Python**；只有可选功能（引用核验、投稿包校验等）才需要 Python / Pandoc。
- 项目里若已有 `paper/`、`references.bib` 这类素材，先告诉它，命中率更高。

## 相关

- [[Nature Skills]]
- [[PaperSpine]]
- [[Research Paper Writing Skills]]
- [[ARIS 自动科研]]
