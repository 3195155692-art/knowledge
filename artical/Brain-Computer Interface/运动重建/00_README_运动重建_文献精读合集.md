---
tags:
  - 脑机接口
  - 文献精读合集
  - 运动重建
  - 神经假体
  - BCI
年份: 2026
摘要: 本合集收录运动重建方向 6 篇代表性论文的精读笔记，时间窗口为 2024–2026 年，主题覆盖"脑 + 脊髓 + 皮层"三重组合的双重神经旁路、双手 QWERTY 打字神经假体、无监督潜在动力学对齐带来的长期免标定、手指运动打字的范式灵活性、非侵入运动想象神经反馈的卒中康复、以及感觉运动皮层中抓握力的神经模式编码。每篇笔记包含中文精读报告与按论文原有小节顺序的英文原文关键句提取。
---
# 文献精读合集：运动重建

## 1. 合集说明

- **方向**：运动与手功能重建 —— 从皮层活动恢复抓握、打字、独立操作与卒中后功能。
- **时间窗口**：2024–2026。
- **选文结构**：刻意同时收录**两条互不相同的技术路线**——① 植入式、面向重症瘫痪的功能替代与修复（笔记 01–04、06）；② 非侵入、面向卒中康复的神经反馈（笔记 05）。二者的人群、终点与证据要求完全不同，分开读会各自成立，合起来读才能看到真实图景。
- **收录范围**：6 篇（5 篇 PDF、1 篇结构化全文；其中 1 篇为预印本）。

## 2. 推荐阅读顺序

| 顺序 | 笔记 | 它回答的问题 |
| --- | --- | --- |
| ① | **02 Jude 2026（Nat Neurosci）** | 运动 BCI 能达到多高的数字交互通量？ |
| ② | **01 Chandrasekaran 2026（Nat Med）** | 除了替代，能否让神经系统"修一点回来"？ |
| ③ | **03 Karpowicz 2025（Nat Commun）** | 怎样才能不每天重新标定？ |
| ④ | **06 Blumenthal 2026（J Neurosci）** | 抓握的"用多大力"能不能被解出来？ |
| ⑤ | **04 Shah 2024（bioRxiv）** | 同一套手指意图能否支撑多种打字方式？ |
| ⑥ | **05 RehabSwift 2024（PNAS Nexus）** | 非侵入路线在卒中人群里做到了什么程度？ |

## 3. 整个方向的主线

```text
[通量与范式] 02 Jude 2026 ── 双手 QWERTY，110 字符/分、词错误率 1.6%，30 句标定
        ↓ 通量解决后，问题转向"能不能长期用、能不能修回来"
[替代 → 修复] 01 Chandrasekaran 2026 ── 脑 + 脊髓 + 皮层三重组合，关机后仍有增益
        ↓ 长期使用的最大敌人是神经接口漂移
[稳定性] 03 Karpowicz 2025 ── NoMAD 无监督对齐，数周至数月免标定（≥3 个月，猴数据）
        ↓ 光标、打字、抓握"有无"已解，但"用多大力"仍未解
[力控制机制] 06 Blumenthal 2026 ── 保持力与改变力使用不同神经模式，SC 也可供力信息
        ↓ 上述全部是植入式；另一条完全不同的路线是……
[非侵入康复] 05 RehabSwift 2024 ── 12 人、18 次训练、FMA-UE 36.75→46.17，但无对照组
        ↑
[范式起源] 04 Shah 2024 ── 手指打字的可行性；71%→95%（手指分组）、点选 vs 击键
```

## 4. 最值得汇报的核心观点

1. **数字交互通量已达实用量级**：Jude 2026 实现 110 字符/分（22 词/分）、词错误率 1.6%，标定仅需 30 句——超过既往手写解码。
2. **"替代"正在变成"替代 + 修复"**：Chandrasekaran 2026 的双重神经旁路在关机后仍改善肘屈曲与腕部触觉（随访 >2 个月），把神经假体重新定位为康复干预。
3. **免标定从愿望变成算法**：Karpowicz 2025 的 NoMAD 在猴运动皮层数据上实现≥3 个月的稳定解码，且完全无监督；对照基线中 ADAN 半衰期仅 7.12 天并出现 15 次解码失败。
4. **力控制有了机制级解法**：Blumenthal 2026 证明"保持"与"改变"抓握力由不同神经模式支配，且感觉皮层的模式在保持阶段对力的分类能力最高（P3 83.4%、P2 67.2%）。
5. **手指分组是精度杠杆**：Shah 2024 显示单指解码 71%，把相邻手指绑定成三组后升至 95%——用减少自由度换可用精度。
6. **非侵入路线的证据仍是"有前景"而非"已确立"**：RehabSwift 在 12 名慢性期卒中患者中实现 75% 达临床显著改善，但无对照组、随访仅 4–6 周，作者本人明确承认无法归因。

## 5. 一个值得深入研究的问题

> **Can a neuroprosthesis be evaluated by what remains after it is switched off?**
> **能否用"关机之后还剩什么"来评价一套神经假体？**

Chandrasekaran 2026 给出了唯一一个"关机后仍有效"的当代证据，Karpowicz 2025 则把所有精力放在"开着的时候能不能稳住"。二者合起来暴露一个方法学空白：**目前没有公认的终点体系来区分"即时替代"与"持久修复"**。若这一体系建立起来，神经假体试验的设计、监管路径与临床价值评估都会随之改变。

## 6. 建议的汇报标题

> Motor neuroprostheses: from real-time replacement to durable repair
> 运动神经假体：从实时替代到持久修复

## 7. 文献清单

1. Chandrasekaran S, Wandelt SK, Jangam A, et al. A neuroprosthesis for restoring hand movement and sensation in a person with complete tetraplegia. *Nature Medicine.* 2026. DOI: 10.1038/s41591-026-04498-0.
2. Jude JJ, Levi-Aharoni H, Acosta AJ, et al. Restoring rapid natural bimanual typing with a neuroprosthesis after paralysis. *Nature Neuroscience.* 2026. DOI: 10.1038/s41593-026-02218-y.
3. Karpowicz BM, Ali YH, Wimalasena LN, et al. Stabilizing brain-computer interfaces through alignment of latent dynamics. *Nature Communications.* 2025. DOI: 10.1038/s41467-025-59652-y.
4. Shah NP, Willsey MS, Hahn N, et al. A flexible intracortical brain-computer interface for typing using finger movements. *bioRxiv* (preprint). 2024. DOI: 10.1101/2024.04.22.590630.
5. Darvishi S, Datta Gupta A, Hamilton-Bruce A, et al. Enhancing poststroke hand movement recovery: Efficacy of RehabSwift, a personalized brain–computer interface system. *PNAS Nexus.* 2024. DOI: 10.1093/pnasnexus/pgae240.
6. Blumenthal GH, Dekleva BM, Gontier C, et al. Distinct Neural Modes Carry Information About Attempted Grasp Timing and Force in the Sensorimotor Cortex. *Journal of Neuroscience.* 2026. DOI: 10.1523/JNEUROSCI.0205-26.2026.

## 8. 本地原文与获取状态

| 笔记 | 本地原文 | 版本 | 来源 | 状态 |
| --- | --- | --- | --- | --- |
| 01 Chandrasekaran 2026 | `PDFs/01_....pdf` | 出版社正式版（31 页） | nature.com（开放获取） | 已获取 |
| 02 Jude 2026 | `PDFs/02_....pdf` | 出版社正式版（27 页） | nature.com（开放获取） | 已获取 |
| 03 Karpowicz 2025 | `PDFs/03_....pdf` | 出版社正式版（17 页） | nature.com（开放获取） | 已获取 |
| 04 Shah 2024 | `PDFs/04_....pdf` | bioRxiv 预印本（2024-04-26 版，30 页） | bioRxiv | 已获取 |
| 05 RehabSwift 2024 | `FullText/05_....fulltext.xml` | JATS 全文（无 PDF） | Europe PMC | 已获取（结构化全文） |
| 06 Blumenthal 2026 | `FullText/06_....fulltext.xml` | JATS 全文（无 PDF） | Europe PMC | 已获取（结构化全文） |

> 说明：05、06 两篇的出版社 PDF 受下载限制，本地保存的是 Europe PMC 的结构化全文，按技能规范放在 `FullText/`；`check_notes.py` 因此会对这两篇给出 "no matching PDFs/<stem>.pdf" 警告（属预期）。

## 9. 每篇笔记的结构

每篇笔记统一为两层：

- **第一层（中文精读报告）**：文献信息 → 一句话结论 → 关键问题 / 为什么重要 → 受试者与信号或研究设计 → 技术路线（fenced 流程图）→ 主要结果 → 与相邻工作的对照表 → 证据边界（"这是不是证明…"）→ 与神经外科的关系 → 优势 / 局限 → 汇报建议 → 参考来源。
- **第二层（原文关键句与核心论点）**：按论文自身小节顺序（`## A1. …`），每节 2–5 条 verbatim 英文原句 + 中文注解 + 一条 `核心论点`。

## 10. 待办

- [ ] 04 Shah 2024 的本地文件为 bioRxiv 预印本；若已正式发表，需替换为出版社版本并复核数值。
- [ ] 05、06 若后续获得出版社 PDF，可将 `FullText/` 的 XML 升级为 PDF 版并同步笔记的版本标注。
- [ ] 补充一篇"脑-脊髓接口（brain-spine interface）行走重建"的文献——本合集的运动重建偏上肢，下肢通路未被覆盖。
- [ ] 深挖第 5 节提出的"关机后残留增益"终点体系，需要跨研究的对照表。

## 11. 边界声明

本合集的精读报告是**基于论文自身文字的整理与推论**，所有英文原句均可在 `PDFs/` 或 `FullText/` 的本地文件中逐条核对。单例与单臂研究被明确标注其证据等级限制，笔记中凡属推测的内容均以"本笔记推论"或明确措辞标注。任何把"单例可行性"读成"临床可用"、把"单臂改善"读成"疗效已证实"的解读，都不属于本合集的主张。
