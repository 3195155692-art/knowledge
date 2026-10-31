---
aliases:
  - paper-spine
  - 论文主线
tags:
  - skills
  - 论文写作
  - 工作流
  - LaTeX
来源: https://github.com/WUBING2023/PaperSpine
技能数: 1
安装位置: ~/.codex/skills/
安装日期: 2026-09-13
---

# PaperSpine

> 以「贡献优先、面向审稿人」为核心的论文写作与重构系统，先定主线再逐节写。

## 作用

PaperSpine 不是一个技能集合，而是**一个编排技能**（12 个阶段的流程都写在 SKILL.md 里）：

1. 先弄清目标场景（期刊 / 会议 / 报告 / 竞赛）和优秀样例
2. 和用户确认论文的「贡献」
3. 逐单元设计文章结构（主线 + 证据链）
4. 最后才动笔写或重建稿件

两条平级主流程：**Rewrite Existing**（改进已有论文或报告，但不降级成简单润色）和 **Build New**（从研究结果和整理好的材料生成稿件），最终输出 LaTeX / PDF / Word。

## 调用方法

- 推荐入口：`/paperspine`（已装好这个 Codex 提示词）。
- 或直接调用技能：`$paper-spine`，并说明是「改写已有论文」还是「从材料新建」。
- 首次运行若缺配置文件，会先拉起配置界面收集目标期刊、素材路径等信息，别跳过，否则它拿不到正确场景。

## 包含的技能（1 个）

| 技能 | 作用 |
| --- | --- |
| `paper-spine` | Write, rewrite, or build a paper or report (journal, conference, report, review, competit… |

## 注意事项

- 依赖 Python（脚本）；输出 LaTeX / Word 还需要对应工具链（Pandoc、TeX 等按需装）。
- 仓库里 `src/` 是唯一真源、`dist/` 是生成产物；**不要把整个仓库直接复制进 skills 目录**，只需 `paper-spine` 这一个技能目录（已按此方式安装）。
- 与 [[Research Paper Writing Skills]] 的分工：后者教每一段怎么写，PaperSpine 管整篇怎么搭、怎么产出成稿。

## 相关

- [[Research Paper Writing Skills]]
- [[ARS 学术研究套件]]
- [[ARIS 自动科研]]
