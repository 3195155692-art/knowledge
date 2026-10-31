---
tags:
  - 意识研究
  - Nature-Reviews-Neuroscience
  - 隐蔽意识
  - 意识测量
  - 心理隐私
年份: 2025
摘要: 意识是私有的。虽然有意识的个体能够直接通达自身的意识体验，但若要判断他人的意识，则必须借助外显报告：即那些可观察的行为——例如面部表情、发声与身体姿态——由之推断意识的水平、状态与内容。然而，外显报告存在局限：它可能是错误的（例如源于故意欺骗或回忆偏差）、可能缺失（例如在睡眠与瘫痪时），也可能与研究目标相冲突（例如在无报告范式与静息态研究中）。这些局限促使研究者去寻找意识的隐蔽测量指标：即无需依赖外显行为即可揭示意识的生理信号。本综述重点介绍人类意识隐蔽测量的新兴进展，涵盖眼动、皮肤、呼吸与心脏信号。我们还讨论了如何区分与意识加工相关和无意识加工相关的生理信号这一难题。最后，我们探讨侵犯意识固有隐私所带来的伦理问题。
---
# 精读报告 03：Sleuthing subjectivity: a review of covert measures of consciousness

## 1. 文献信息

- **题目**：Sleuthing subjectivity: a review of covert measures of consciousness
- **作者**：Sharif I. Kronemer, Peter A. Bandettini, Javier Gonzalez-Castillo
- **期刊**：*Nature Reviews Neuroscience*
- **年份/卷期/页码**：2025; 26(8): 476–496
- **DOI**：10.1038/s41583-025-00934-1
- **文章类型**：Review
- **核心主题**：covert measures of consciousness, conscious level, conscious state, conscious content

## 2. 核心问题

意识有一个特殊属性：

> **consciousness is private.**

一个人可以直接体验自己的意识，但别人无法直接进入其主观体验。

因此外部研究者必须通过 observable behavior 或 physiological signals 推断意识。

传统方法依赖：

- 语言报告；
- 面部表情；
- 肢体动作；
- 眼动；
- 按键。

但这些方法在以下情况失效：

- 睡眠；
- 麻醉；
- 严重脑损伤；
- 瘫痪；
- locked-in syndrome；
- no-report paradigms。

## 3. 作者对 consciousness 的拆分

文章一个非常重要的概念框架是区分：

### Conscious level

“有多可能处于清醒/有意识状态”。

例如：

- wakefulness；
- alertness；
- vigilance。

### Conscious state

某一时刻整体的意识状态。

### Conscious content

具体体验内容：

- 看到什么；
- 听到什么；
- 想到什么；
- 感觉到什么。

这一区分对 BCI 非常重要。

因为：

> **检测 conscious level 与解码 conscious content 是两个完全不同的问题。**

## 4. Covert measures

文章讨论多种不依赖显性报告的生理指标，包括：

- pupil / eye metrics；
- skin conductance；
- respiration；
- heart signals；
- neural signals；
- multimodal physiological measurements。

重点并不是“找到一个万能 consciousness biomarker”，而是：

> **建立一组可以在没有行为报告时使用的客观指标。**

## 5. 最大方法学问题：意识 vs 无意识加工

这是全文最重要的科学问题之一。

一个生理信号可能与：

- attention；
- arousal；
- sensory processing；
- prediction；
- motor preparation

相关。

但这不意味着它一定对应 conscious experience。

因此研究必须区分：

```text
neural processing
       ↓
attention
       ↓
access
       ↓
conscious experience
```

而不能把所有高级神经加工都叫作 consciousness。

## 6. 对 BCI 的直接启示

BCI 常用分类：

```text
EEG → classifier → state
```

但如果 state 被命名为“consciousness”，必须非常谨慎。

例如：

> alpha power 增加

不能直接写成：

> consciousness increased

更合理的表述是：

> a neural/physiological marker associated with a conscious state or arousal condition.

## 7. 为什么 no-report paradigm 很重要

传统实验：

```text
刺激
 ↓
患者报告“看到了”
 ↓
脑信号
```

问题：

> 报告本身会改变脑活动。

no-report paradigm：

```text
刺激
 ↓
脑/生理信号
 ↓
不要求显性报告
```

这样可以更好地研究：

> consciousness 本身，而不是 reporting process。

## 8. 对 neural decoding 的约束

如果未来使用 AI 解码：

```text
EEG → semantic decoder → “cat”
```

必须进一步证明：

> decoder output 与 conscious perception 的关系。

可采用：

### Masking

同一刺激：

- consciously perceived；
- subliminal/unconscious。

### Attention manipulation

同一刺激：

- attended；
- unattended。

### No-report

不要求患者回答。

### Cross-modal validation

EEG + fMRI + autonomic signal。

## 9. 伦理问题

如果技术可以从脑活动推断：

> 一个人正在体验什么。

那么问题就不再只是：

> 能不能做到？

还包括：

- 谁拥有 neural data？
- 谁可以运行 decoder？
- 患者是否能够拒绝 decoding？
- 是否允许医疗机构读取无报告状态？
- decoder 的误判会不会影响医疗决策？
- 是否可能侵犯 mental privacy？

这意味着：

> **consciousness BCI 与传统运动 BCI 的伦理风险明显不同。**

## 10. 对科研选题的启示

如果要做一个真正有价值的 consciousness BCI 项目，建议把研究问题拆成：

### Aim 1
检测 conscious level。

### Aim 2
区分 conscious / unconscious processing。

### Aim 3
解码 conscious content。

### Aim 4
验证 decoder 是否跨状态、跨患者稳定。

### Aim 5
研究 ethical / privacy boundary。

## 11. 汇报建议

这篇文章最适合放在：

> **“为什么意识 BCI 比普通 BCI 难？”**

这一页。

一句话：

> **普通 BCI 可以用行为结果作为 ground truth；意识 BCI 恰恰面临 ground truth 缺失的问题。**

## 12. 参考来源

Kronemer SI, Bandettini PA, Gonzalez-Castillo J. *Nat Rev Neurosci.* 2025;26:476–496. DOI: 10.1038/s41583-025-00934-1.

---

# 附：关键句与核心论点（摘要级提取）

> ⚠️ **当前状态：全文未获取**。*Nature Reviews Neuroscience* 为订阅制期刊，经 Unpaywall / OpenAlex / Europe PMC / 预印本检索确认**无合法开放版本**，需要机构订阅才能取得正文。因此本节的“关键句”来自**公开可获取的摘要（verbatim）**；逐节正文提取将在拿到全文后补充。
> 已确认检索路径与结果：Unpaywall `is_oa: false`；OpenAlex `oa_status: closed`、`any_repository_has_fulltext: false`；Europe PMC `inEPMC: N`；Europe PMC 预印本源（SRC:PPR）无对应记录。

## A1. Abstract 关键句（逐句对应全文结构）

1. "Consciousness is private."
   → **七个单词的纲领句**：意识的第一属性是私有性。
2. "Although conscious beings directly access their own conscious experiences, the consciousness of others must be inferred through overt report: observable behaviours - such as overt facial expressions, vocalizations and body gestures - that suggest the level, state and content of consciousness."
   → 定义 **overt report**，并顺带给出意识的三个维度：**level / state / content**。
3. "However, overt report is limited because it can be erroneous (for example, resulting from wilful deception or being subject to recall error), absent (for example, during sleep and paralysis) or conflict with research goals (for example, in no-report paradigms and resting-state studies)."
   → **三条失效路径**：可错（主观欺骗/回忆偏差）、缺失（睡眠、瘫痪）、与研究目标冲突（no-report 范式、静息态）。
4. "These limitations encourage the search for covert measures of consciousness: physiological signals that disclose consciousness without relying on overt behaviour."
   → **covert measures 的定义句**——这是本文的核心术语，也是与 BCI 对接的接口。
5. "This Review highlights emerging covert measures of consciousness in humans, including eye, skin, respiratory and heart signals."
   → 综述覆盖的四类生理通道：**眼、皮肤、呼吸、心脏**。
6. "We also address the challenge of distinguishing physiological signals linked to conscious versus unconscious neural processing."
   → 全文最具科学难度的部分：**意识加工 vs 无意识加工的区分**。
7. "Finally, we consider the ethical implications of infringing on the innate privacy of consciousness."
   → 落点回到开头那句 "Consciousness is private"——**隐私是首尾呼应的问题**。

> **核心论点**：这篇综述的结构本身就是一条完整论证：**意识私有 → 只能靠 overt report 推断 → overt report 在特定条件下必然失效 → 转向 covert measures → 但 covert measures 面临"意识/无意识加工"不可分的困难 → 最终回到伦理与隐私**。

## A2. 需要在汇报中特别标注的三点

1. **术语价值**：本文把 `level / state / content` 三分建立为一个稳定的分析框架（摘要中即出现），可以直接用于区分"检测意识"与"解码意识内容"这两类不同任务。
2. **no-report paradigm 的位置**：摘要把 no-report 范式列为"overt report 与研究目标冲突"的典型场景，意味着 covert measures 的动机同时包含**科学理由**（避免报告污染脑活动）与**临床理由**（患者无法报告）。
3. **尚缺的部分**：正文中对各生理通道（瞳孔、皮肤电、呼吸、心率）的证据强度分级、以及"conscious vs unconscious processing"的可判别性论证，**在本笔记中暂时缺失**——这是拿到全文后最需要补写的内容。

> **核心论点（待全文验证）**：本文最可能的关键判断是"没有任何单一 covert measure 足以单独指认意识"，因此其结论很可能指向**多指标收敛**，这与 Kordas 2026 和 du Bois 2026 的结论方向一致。

## A3. 待补清单（拿到全文后按此逐节提取）

- [ ] Section：Why overt report fails（三类失效的正文展开）
- [ ] Section：Eye-based measures（瞳孔、眨眼、微眼动等，含证据强度）
- [ ] Section：Skin / respiratory / cardiac measures（含证据强度）
- [ ] Section：Neural measures（与 EEG/fMRI 标记的关系）
- [ ] Section：Conscious vs unconscious processing（判别策略与不可判别性论证）
- [ ] Section：No-report paradigms（设计逻辑与代表研究）
- [ ] Section：Ethics of mental privacy（与 Fischer 2025 伦理讨论的异同）
- [ ] Section：Limitations / Future directions
