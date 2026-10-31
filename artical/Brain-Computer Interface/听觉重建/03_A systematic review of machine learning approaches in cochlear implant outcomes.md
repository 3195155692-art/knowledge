---
tags:
  - 听觉重建
  - npj-Digital-Medicine
  - 人工耳蜗
  - 机器学习
  - 预后预测
  - 系统综述
年份: 2025
摘要: 人工耳蜗（CI）已改变超过一百万听力障碍者的生活，其中包括仅九个月大的儿童。本系统综述批判性检视了当前关于应用机器学习（ML）技术预测人工耳蜗结局的文献。一项全面检索识别出 20 项相关研究。基于影像的研究在预测语言与言语感知结局方面表现出高准确率。神经功能测量为评估听神经的功能状态提供了可行途径，而临床与听力学预测因子已通过数据挖掘技术得到广泛探索。此外，基于机器学习的语音增强算法在改善噪声环境下的言语识别方面展现出前景，而这是人工耳蜗使用者面临的主要挑战。尽管有这些进展，在开发可直接整合进人工耳蜗编程的模型方面仍存在显著空白。把机器学习整合进人工耳蜗——在信号处理与设备编程等领域——具有巨大潜力，可支持听力障碍者的个体化诊疗。
---
# 精读报告 03：A systematic review of machine learning approaches in cochlear implant outcomes

## 1. 文献信息

- **题目**：A systematic review of machine learning approaches in cochlear implant outcomes
- **作者**：Anu Prasad Sreenivasan Nair, Srikanta K. Mishra, Pedro Andrade, et al.
- **期刊**：*npj Digital Medicine*
- **年份/卷期**：2025; 8:411
- **DOI**：10.1038/s41746-025-01733-9
- **研究类型**：系统综述（PRISMA，5 个数据库，2000–2024 年文献）
- **核心关键词**：machine learning, cochlear implant outcomes, neuroimaging, speech perception, prediction

## 2. 一句话结论

系统检索纳入 **20 项**研究：**影像学指标在预测语言与言语感知结局上准确率最高；神经功能测量可用于评估听神经状态；临床与听力学预测因子被数据挖掘广泛探索；ML 语音增强在噪声下言语识别上展现前景**——但**没有任何模型真正进入人工耳蜗编程流程**，这是当前最大的空白。

## 3. 为什么这篇文章重要

人工耳蜗是"最成熟的神经假体"，但其结局差异极大：同样植入，有人能打电话、有人只能感知环境声。医生目前无法在术前给出可靠预期。这条路线与脑中其他方向（运动、视觉、意识）的处境不同：

```text
运动/视觉/意识方向：主要瓶颈在"能否恢复功能"
人工耳蜗方向        ：功能恢复已有基础，主要瓶颈在"谁获益多少、能否个体化"
                     → 因此机器学习在这里的角色是"预后与个体化"，而非替代器件
```

本文把这条线的证据结构整理清楚了，并指出缺口在**临床落地**而非算法。

## 4. 证据结构

| 预测因子类别 | 证据表现 |
| --- | --- |
| 影像学（MRI 结构指标） | 对语言与言语感知结局预测**准确率高** |
| 神经功能测量 | 可评估听神经功能状态，属可行性路径 |
| 临床与听力学变量 | 通过数据挖掘被广泛探索（如耳聋病程、残余听力） |
| 语音增强算法 | 在噪声环境下改善言语识别，是人工耳蜗用户的主要痛点 |

## 5. 关键发现与缺口

- **重复发现的老变量**：多数被 ML 识别为重要预测因子的临床变量，此前在非 ML 研究中已被认识（如耳聋病程与句子识别分数的强关联）。
- **统计验证不足**：有研究报告随机森林优于线性模型，但"许多其他研究并未使用统计检验来验证这一说法"。
- **结局指标偏窄**：现有结局（如句子识别分数）可能无法涵盖影响 CI 成功的认知、听觉与情绪因素。
- **落地缺口**：没有模型被整合进人工耳蜗的编程流程。
- **被推荐的工具**：作者特别提到 CatBoost（开源梯度提升决策树算法），因其可整合临床、影像与人口学异构数据、无需大量预处理——这与本领域的"小样本、多模态"特征匹配。

## 6. 这是不是证明"AI 可以预测人工耳蜗效果"？

不能，边界如下：

```text
纳入仅 20 项研究，且异质性大 → 未做定量合并（meta 分析）
多数研究的样本量小        → 过拟合风险高（作者指出许多研究未做统计验证）
结局指标不统一            → 跨研究比较困难
零模型进入临床编程流程    → 从"预测准确率高"到"改变临床决策"仍有距离
```

## 7. 与笔记 04（JAMA Otolaryngol 2026）的关系

本文是 2025 年的系统综述，笔记 04 是同一主题下 2026 年的一项多中心研究（278 例儿童、三种语言、DTL 模型准确率 92.39%）。二者关系值得对照阅读：

| 维度 | 本文（综述 2025） | 笔记 04（原研究 2026） |
| --- | --- | --- |
| 角色 | 梳理领域证据与缺口 | 提供该缺口下的新证据 |
| 样本 | 20 项研究 | 278 例，3 中心、3 语言 |
| 主要发现 | 影像预测准确率高，但无临床落地 | 融合模型准确率 92.39%，显著优于纯临床模型 |
| 与本文缺口的关系 | 指出"缺临床整合" | 仍未整合进 CI 编程，但已具备多中心可推广性证据 |

## 8. 与听觉康复临床的关系

- **术前咨询的现实改善**：若能可靠预测，术前谈话可以从"大概率能听懂"变为带置信区间的个体化预期。
- **设备编程的潜在接口**：作者指出的缺口（模型未进入 CI 编程）是工程问题而非科学问题——需要厂商 API 与临床流程的配合。
- **候选者选择**：影像学预测因子的高准确率，对边缘候选者（解剖条件不典型）的决策最有价值。

## 9. 文章的主要优势

1. PRISMA 规范、5 个数据库、明确的时间范围（2000–2024）与检索日期，方法透明。
2. 同时覆盖四类预测因子（影像、神经功能、临床/听力学、语音增强），结构清晰。
3. 明确指出"许多研究未做统计验证"与"零模型进入编程流程"两个硬缺陷。
4. 给出可操作建议（如 CatBoost 适合本领域的小样本多模态特征）。

## 10. 局限

- 仅纳入 20 项研究，且未做定量合并或偏倚风险评估。
- 检索时间截至 2024 年初，2025–2026 年的新证据（如笔记 04）未纳入。
- 未讨论模型的可解释性、数据隐私与跨中心泛化问题。
- 对"语音增强"方向与"结局预测"方向的关系未做深入整合。

## 11. 汇报时建议用一句话总结

> 人工耳蜗的 AI 研究不缺准确率，缺的是把模型接进编程流程——这是工程与产业问题，而非算法问题。

## 12. 参考来源

Nair APS, Mishra SK, Andrade P, et al. *npj Digital Medicine.* 2025;8:411. DOI: 10.1038/s41746-025-01733-9.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句）+ **核心论点**（中文一句话）。
> 原文文件：`PDFs/03_A systematic review of machine learning approaches in cochlear implant outcomes.pdf`（出版社正式版，12 页）。

## A1. Abstract｜范围与结论

1. "Cochlear implants (CIs) have transformed the lives of over one million individuals with hearing impairment, including children as young as nine months."
   → 用规模与最年幼使用者界定该技术的成熟度。
2. "A comprehensive search identified 20 relevant studies."
   → 纳入规模偏小，决定了本综述的证据上限。
3. "Imaging-based studies demonstrated high predictive accuracy for language and speech perception outcomes."
   → 影像学是当前表现最好的预测因子类别。
4. "Despite these advancements, a significant gap remains in developing models that can be directly integrated into CI programming."
   → **本综述的核心判断**：缺口在临床整合，不在算法。

> **核心论点**：人工耳蜗的 ML 研究已具备预测能力，但尚未进入临床决策与设备编程流程。

## A2. Abstract（背景）｜为什么需要预测

1. "However, outcomes in speech perception vary widely among CI recipients."
   → 结局差异大是研究的动因。
2. "Despite the knowledge about the factors, predicting individual CI outcomes remains challenging."
   → 已知影响因素 ≠ 能做出个体预测。
3. "For example, compared to general linear models (GLMs), ML can handle diverse data types and explore nonlinear relationships, providing a more comprehensive understanding of the factors contributing to CI outcomes."
   → ML 的优势在于异构数据与非线性关系，而非某一指标的提升。

> **核心论点**：预测困难来自因素间的非线性组合，而不是单一变量的缺失。

## A3. Results｜影像预测的证据

1. "These studies show the role of early auditory brain development and the preservation of specific brain regions in predicting CI outcomes, demonstrating the potential of neuroimaging and ML techniques in personalizing CI candidacy and post-surgical expectations."
   → 影像预测的临床含义：个体化候选者评估与术后预期。
2. "Tan et al. used functional magnetic resonance imaging (fMRI) to predict language skills in children with congenital sensorineural hearing loss (SNHL) before the CI surgery (n = 23, mean age: 20 months, range = 8–67 months)."
   → 具体研究的样本与年龄范围，提示该类研究普遍样本小。

> **核心论点**：影像预测的证据集中在儿童语言结局，且样本量普遍偏小。

## A4. Discussion｜方法学的不足

1. "Numerous clinical variables recognized by ML studies as predictors of CI outcomes have already been identified in the existing literature, including studies that did not use ML approaches."
   → **重要的自省**：ML 的"新发现"多是既有变量的再确认。
2. "While studies such as Sun et al. reported that RF outperformed linear models in predicting CI outcomes, many others did not use statistical tests to validate these claims."
   → 算法比较缺乏统计验证，是常见的报告缺陷。
3. "For example, Kim et al. and Crowson et al. found a strong association between the duration of deafness and sentence recognition scores, yet these outcome measures may not fully capture the broader spectrum of cognitive, auditory, and emotional factors that influence CI success."
   → 结局指标的狭窄性限制了模型的可解释价值。
4. "Notably, CatBoost—an open-source algorithm for gradient boosting on decision trees—could be a valuable tool for predicting CI outcomes as it can incorporate diverse clinical, imaging, and demographic data without extensive preprocessing, making it well-suited for capturing the multifaceted nature of CI success."
   → 作者给出的具体方法建议，可直接用于研究设计。

> **核心论点**：本领域的瓶颈不是算法能力，而是结局定义、统计严谨性与临床整合。

## A5. Methods｜检索规范

1. "The review protocol followed the Preferred Reporting Items for Systematic Review and Meta-Analysis (PRISMA)."
   → 方法学规范化声明。
2. "Five scientific databases, PubMed, Embase, Scopus, CINAHL, and CENTRAL, were searched to identify articles published between 2000 and 2024 that investigated the application of ML to predict outcomes after CI."
   → 五库检索与 24 年时间跨度，覆盖全面但需注意技术迭代速度快。

> **核心论点**：检索范围越宽、技术更新越快，"未纳入最新证据"的风险就越高——本综述的截止时间使其未覆盖 2025–2026 年的进展。
