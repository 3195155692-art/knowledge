---
tags:
  - 视觉重建
  - Nature-Communications
  - 光声刺激
  - 视网膜假体
  - 柔性器件
  - 人工视觉
年份: 2025
摘要: 光感受器退行性疾病是导致失明的主要原因，目前尚无有效治疗。视网膜假体旨在通过刺激残余视网膜细胞来恢复视力。在此，我们提出一种光声视网膜刺激技术。我们设计了一种聚二甲基硅氧烷与碳基柔性薄膜，可将近红外激光脉冲转换为具有 51 µm 横向分辨率的局部声场，从而精确刺激机械敏感的视网膜细胞。这种光声刺激在野生型与退化的离体大鼠视网膜中稳健且局部地调制了视网膜神经节细胞的活动。在视网膜下植入毫米级光声薄膜的动物中，脉冲激光刺激可在视觉通路上产生直至上丘的神经调制，并通过功能性超声成像测量到。该薄膜的生物安全性由短期不良事件缺失所确认，同时测得局部温升低于 1 °C。这些发现证明了光声刺激在盲人患者中实现高锐度视力恢复的潜力。视网膜假体旨在通过刺激残余视网膜细胞来恢复视力。在此，作者开发了一种光声刺激技术，使用基于 PDMS 与碳的柔性薄膜，通过近红外激光脉冲激活视网膜细胞，并在离体与在体实验中验证。
---
# 精读报告 04：A flexible photoacoustic retinal prosthesis

## 1. 文献信息

- **题目**：A flexible photoacoustic retinal prosthesis
- **作者**：Audrey Leong, Yueming Li, Thijs R. Ruikes, et al.（荷兰 / 欧洲多机构合作）
- **期刊**：*Nature Communications*
- **年份**：2025
- **DOI**：10.1038/s41467-025-67518-6
- **研究类型**：器件开发 + 离体/在体动物验证（离体大鼠视网膜、在体动物植入）
- **核心关键词**：photoacoustic stimulation, PDMS-carbon film, near-infrared laser, retinal ganglion cell, functional ultrasound

## 2. 一句话结论

提出一种**光声视网膜假体**：用聚二甲基硅氧烷（PDMS）与碳基柔性薄膜把近红外激光脉冲转换为**局部声场（横向分辨率 51 µm）**，从而刺激机械敏感的视网膜细胞。离体大鼠视网膜（野生型与退化型）中，光声刺激稳健且局部地调制了视网膜神经节细胞活动；在体植入后，刺激可沿视觉通路调制至上丘（功能性超声测量）；局部温升 <1 °C，未见短期不良事件。

## 3. 为什么这篇文章重要

现有视网膜假体分两类，各有硬约束：

```text
电刺激类（笔记 01、03）：电极与神经元之间的物理距离决定了分辨率与电流阈值，
                          且必须在眼内布置大量电极与导线
光遗传类：需要基因治疗导入光敏蛋白，临床转化路径长
本文思路：用"光声"这一间接机制——
          光（可精确聚焦、无需导线）→ 薄膜（把光能转成声压）→ 机械敏感通道
          等于用光学的定位精度 + 无基因改造的生理机制
```

其理论吸引力在于：**分辨率由光学聚焦与薄膜结构决定，可与电极数量解耦**。

## 4. 器件与技术参数

- **材料与结构**：PDMS–碳（CS）–PDMS 三明治结构的柔性薄膜，工程目标是**最小化向周围组织的热沉积**并抑制碳颗粒向生物组织扩散。
- **刺激源**：纳秒激光，波长 **1030 nm**（在眼介质中透射率高，且避免激发仍存留的外周光感受器；该波段范围取在 500–1150 nm 人眼介质最大透射区间）。
- **分辨率**：横向 **51 µm**。
- **能量吸收**：薄膜吸收 **>99%** 的入射红外激光能量。
- **声场分布**：最大声信号出现在薄膜表面下方 Z ≈ 34 µm 处，衰减至峰值 50% 的位置在 Z ≈ 232 µm（轴向压力剖面）。
- **温升**：局部温度升高 **<1 °C**。

## 5. 实验证据层级

| 层级 | 结果 |
| --- | --- |
| 离体视网膜 | 野生型与退化（P23H）大鼠视网膜中，光声刺激稳健且局部地调制 RGC 活动 |
| 薄膜特异性对照 | 相同激光条件下，**直接照射（无薄膜）仅 3.6 ± 0.9% 的 RGC 出现活动改变**；**薄膜上光声刺激时为 77 ± 20%** |
| 在体 | 毫米级薄膜视网膜下植入，脉冲激光刺激产生沿视觉通路至上丘的神经调制（功能性超声成像） |
| 生物安全 | 无短期不良事件，局部温升 <1 °C |

> "3.6% vs 77%"这一对照是本文最有力的证据：它把"可能是激光直接激活视网膜"这一替代解释排除掉了。

## 6. 这是不是证明"光声假体可以用于患者"？

远未到。需明确的边界：

```text
证据全部来自动物（大鼠离体 + 动物在体）→ 无人体数据、无人体安全性数据
刺激对象是"机械敏感通道"（Piezo1/2、TRPV1、TRP 通道等）
  → 作者自己指出 RPE 细胞的机械敏感通道可能介导潜在不良效应
超声刺激可能促进血管生成 → 作者提示这或与 AMD、糖尿病视网膜病变相关
在体验证使用功能性超声测量上丘反应 → 属间接的神经调制证据，不是"视觉"证据
无长期植入稳定性与慢性安全性数据
```

作者把结论限定为 "demonstrate the potential of photoacoustic stimulation"——是潜力，不是可用性。

## 7. 与其他视觉重建路线的定位

| 路线 | 刺激机制 | 分辨率决定因素 | 证据状态 |
| --- | --- | --- | --- |
| 视网膜下电刺激（PRIMA） | 电 | 像素尺寸（100 µm → logMAR 1.32） | 38 例人体（笔记 01） |
| 脉络膜上电刺激 | 电 | 电极-神经元距离 | 4 例人体 2.7 年（笔记 03） |
| **光声（本文）** | **光→声压→机械敏感通道** | **光学聚焦 + 薄膜结构（51 µm）** | **大鼠离体 + 在体** |
| 皮层内电刺激 | 电 | 电极间距与光幻视可控性 | 2 例人体（笔记 02） |

## 8. 与临床的潜在关系

- **无需基因改造**：与光遗传路线相比，临床转化路径更短，伦理与监管障碍更小。
- **无需经眼内布线**：薄膜是独立的被动器件，不需要穿出眼球的导线与刺激单元——这一点若能成立，可显著简化手术与长期维护。
- **安全性的核心未知是慢性效应**：温升 <1 °C 是短期数据；机械敏感通道的长期激活、超声促血管生成效应都需长期动物实验回答。
- **适用的患者层次**：与电刺激视网膜假体相同——仍需残余视网膜细胞（尤其神经节细胞）存活，因此不适用于视网膜完全毁损者（那需要皮层假体）。

## 9. 文章的主要优势

1. 用"有薄膜 vs 无薄膜"的对照（77% vs 3.6%）干净地排除了激光直接激活的解释。
2. 同时报告离体细胞层面与在体通路层面的证据，并给出功能性超声这一客观读出。
3. 主动讨论机械敏感通道介导不良效应与超声促血管生成等潜在风险，而非只讲优势。
4. 材料设计目标明确（减少热沉积、抑制碳颗粒扩散），而不是只追求刺激效率。

## 10. 局限

- 全部证据来自动物（大鼠离体视网膜 + 动物在体），无人体数据。
- 在体"视觉通路激活"以功能性超声观测上丘反应为代理，不是行为学视觉证据。
- 无长期植入数据（稳定性、纤维包裹、碳颗粒长期扩散）。
- 薄膜为被动器件，刺激位置与模式受光投射精度约束，尚无图像化刺激的实现方案。
- 未给出可达到的空间分辨率在视觉任务中的等效视锐度（无法与 logMAR 对比）。

## 11. 对研究的启示

1. **新机制的价值需要用对照来锚定**：本文的 77% vs 3.6% 是同类研究中的范式做法。
2. **等效视锐度（logMAR）应成为视觉假体研究的通用报告项**，否则不同机制之间无法比较。
3. **慢性安全性的实验设计需要提前启动**：机械通道长期激活与超声促血管生成是必须回答的问题，越晚做越可能推翻整个路线。

## 12. 汇报时建议强调

> 这是一条"绕过电极也绕过基因治疗"的新路径：用光声转换在 51 µm 尺度上激活视网膜，离体与在体证据都成立，但离人体还隔着一整套慢性安全性实验。

## 13. 参考来源

Leong A, Li Y, Ruikes TR, et al. *Nature Communications.* 2025. DOI: 10.1038/s41467-025-67518-6.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句）+ **核心论点**（中文一句话）。
> 原文文件：`PDFs/04_A flexible photoacoustic retinal prosthesis.pdf`（出版社正式版，15 页）。

## A1. Abstract｜机制与结论

1. "We designed a polydimethylsiloxane and carbon-based flexible film that converts near-infrared laser pulses into a localized acoustic field with 51-µm lateral resolution, allowing precise stimulation of mechanosensitive retinal cells."
   → 机制链：激光 → 声场 → 机械敏感细胞；分辨率数字 51 µm 是核心指标。
2. "This photoacoustic stimulation robustly and locally modulated retinal ganglion cell activity in both wild-type and degenerated ex vivo rat retinae."
   → "wild-type and degenerated"说明机制不依赖正常的感光通路。
3. "The biosafety of the film was confirmed by the absence of short-term adverse effects, while local thermal increases were measured below 1 °C."
   → 安全性证据的强度受限于 "short-term"。

> **核心论点**：光声转换可以在视网膜层面实现高分辨率的局部刺激，而不需要电极阵列或基因改造。

## A2. Results｜机制特异性与分辨率

1. "Using identical laser conditions to those applied on the film, only 3.6 ± 0.9% of recorded RGCs showed a modified activity following direct film stimulation, compared to 77 ± 20% of recorded RGCs following on-film photoacoustic stimulation."
   → **本文最关键的对照**：排除"激光直接激活"的替代解释。
2. "The axial pressure profile shows that the maximum acoustic signal is generated at the Z = 34 µm from the surface of the film upon illumination and attenuates to 50% of its peak value at Z = 232 µm (Fig. 1d, right)."
   → 声场随距离衰减快，这既保证局部性，也意味着薄膜必须靠近目标细胞。
3. "Furthermore, we found that the PA film absorbs more than 99% of the infrared laser energy."
   → >99% 的能量吸收是低热损伤风险的结构基础。

> **核心论点**：刺激确实由薄膜转换的声压介导，而非激光的直接光热或光化学作用。

## A3. Discussion｜潜在风险与波段选择

1. "RPE cells express several mechanosensitive channels, including Piezo1 and 2, TRPV1, 2 and 4, and 35, among others, which may mediate potential adverse effects."
   → 作者主动指出机制本身的潜在风险来源。
2. "Ultrasound stimulation might promote angiogenesis, which could contribute to diseases such as AMD and diabetic retinopathy."
   → 一条常被忽略的长期风险：超声促血管生成。
3. "A nanosecond laser with a 1030-nm wavelength was chosen to maximize transmission to the retina, while avoiding triggering responses in photoreceptors, as AMD patients may retain peripheral vision."
   → 波长选择同时考虑透射率与"避免激活残余光感受器"两个目标。

> **核心论点**：同一机制既带来优势（无导线、高分辨率），也带来特有风险（机械通道激活、促血管生成），必须在临床前阶段量化。

## A4. Statistical analysis｜方法学细节

1. "Statistical significance was analyzed with two-sided Wilcoxon signed-rank tests and two-sided Mann-Whitney U tests (Figs. 2–6)."
   → 非参数检验，与样本量小、分布未知的情形匹配。
2. "Finally, to estimate confidence intervals for a statistic of unknown distribution (average rCBV variations in Fig. 7) we used bootstrapped estimation (1000 samples, 95% confidence intervals)."
   → 功能性超声指标采用自助法估计置信区间，方法透明。

> **核心论点**：小样本动物研究的关键在于统计方法的匹配性与透明度，而非显著性本身。
