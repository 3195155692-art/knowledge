---
aliases:
  - paper-craft-skills
  - 论文变图文幻灯片
tags:
  - skills
  - 论文写作
  - 绘图
  - 幻灯片
来源: https://github.com/zsyggg/paper-craft-skills
技能数: 3
安装位置: ~/.codex/skills/
安装日期: 2026-09-13
---

# Paper Craft Skills

> 把难读的论文拆成方法图、深度解读长文和幻灯片，偏「面向读者的再表达」。

## 作用

三个技能各管一种表达形式：

- **paper-comic**：论文 → 方法图解。先分析论文在做什么，推荐封面图 / 概览图 / 机制细节图方案，等你确认范围、张数、语言、风格后再生成，支持论文框架图风和温暖笔记风。
- **paper-analyzer**：论文 → 深度 HTML 长文。读全文、检索代码仓库、公式用 KaTeX 渲染、架构图用 Mermaid，输出可直接分享的网页。
- **paper-deck**：论文 → 高质感幻灯片。先做叙事结构和逐页视觉导演，再逐页生成 16:9 图片，最后合成 PPTX / PDF。

## 调用方法

- 直接说需求：「把这篇论文画成方法图」「把这篇论文做成深度解读」「把这篇论文做成不像 AI 的 PPT」。
- 也可以点名：`$paper-comic`、`$paper-analyzer`、`$paper-deck`。
- `paper-comic` 会先给方案让你确认，确认这步别省。

## 包含的技能（3 个）

| 技能 | 作用 |
| --- | --- |
| `paper-analyzer` | 将学术论文转化为深度HTML长文。6轮强制工作流、代码仓库搜索、公式渲染、Mermaid图表。 |
| `paper-comic` | 论文方法图解——用视觉图解彻底讲清楚一篇论文到底做了什么、怎么做的。 |
| `paper-deck` | 将论文、技术文章或知识内容制作成高真实感的 AIGC 幻灯片。先做叙事结构和逐页视觉导演，再调用生图模型生成每一页 16:9 slide image，最后合成为 PPTX/PDF… |

## 注意事项

- 生图和排版需要图像生成能力与网络；`paper-deck` 逐页生图，页数多时耗时和花费都会上去。
- 输出偏「给人看」，不做学术论断核查——核查请用 [[Nature Skills]] 或 [[ARIS 自动科研]] 里的审计类技能。

## 相关

- [[Nature Skills]]
- [[Scientific Agent Skills]]
- [[PaperSpine]]
