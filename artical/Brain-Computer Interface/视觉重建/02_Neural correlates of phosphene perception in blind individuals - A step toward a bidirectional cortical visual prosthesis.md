---
tags:
  - 视觉重建
  - Science-Advances
  - 皮层视觉假体
  - 光幻视
  - 双向神经接口
  - V1
年份: 2025
摘要: 失明是对人类生活影响最重大的残疾之一。皮层假体有朝一日可能为部分盲人恢复功能性视力，但其成功取决于能否整合先进技术以实现所承诺的治疗收益。此前多数人体研究仅把电极用于刺激，这使得精确控制单个光幻视的外观十分困难。在本研究中，我们在两名盲人志愿者的视觉皮层中植入了 100 电极的皮层内微电极阵列。我们在施加电刺激以诱发视觉感知的同时，记录了电极周围的神经活动。除了展示刺激参数如何影响感知阈值、感知亮度以及区分两次独立刺激所需的最小时间间隔之外，我们的结果表明，主观视觉体验可以从记录的神经活动中被准确预测。这些结果凸显了利用邻近电极的神经活动来准确推断与控制视觉感知、进而发展皮层视觉假体的潜力。
---
# 精读报告 02：Neural correlates of phosphene perception in blind individuals: A step toward a bidirectional cortical visual prosthesis

## 1. 文献信息

- **题目**：Neural correlates of phosphene perception in blind individuals: A step toward a bidirectional cortical visual prosthesis
- **作者**：Fabrizio Grani, Cristina Soto-Sánchez, Alfonso Rodil Doblado, et al.（西班牙 Elche 大学 / Hospital General Universitario de Elche 等）
- **期刊**：*Science Advances*
- **年份**：2025
- **DOI**：10.1126/sciadv.adv8846
- **试验注册**：NCT02983370
- **研究类型**：两例受试者的人体实验（V1 皮层内阵列，刺激 + 同步记录）
- **核心关键词**：cortical visual prosthesis, phosphene, bidirectional interface, V1, intracortical microstimulation

## 2. 一句话结论

在**两名盲人志愿者的 V1 植入 100 通道皮层内微电极阵列**，一边施加电刺激诱发视觉感知、一边记录邻近电极的神经活动：结果不仅能刻画刺激参数与光幻视阈值/亮度/时间分辨的关系，更关键的是**主观视觉体验（阈值、亮度、光幻视数量）可以从神经活动被准确预测**。这为皮层视觉假体从"单向刺激"走向"**双向闭环**"提供了人体证据。

## 3. 为什么这篇文章重要

皮层视觉假体的核心难题不是"能不能让患者看到光点"，而是：

```text
刺激 → 光幻视 之间的映射不稳定
  ├─ 同一电极在不同日期所需电流不同
  ├─ 亮度受刺激序列影响（前一次刺激会改变下一次的感知）
  └─ 电极数量必须足够多（文献估计常用任务需 >625 个电极）
因为不知道患者"看到了什么"，参数调整只能靠反复试错
```

本文的做法是**在刺激的同时读神经活动**，用邻电极的活动反推患者的主观感受。这等价于给假体装上了"感知的传感器"，把开环刺激变成可校准的闭环系统。

## 4. 受试者与信号

- **受试者**：2 名盲人志愿者（#1 植入时 64 岁，术前 2.5 年失明；#2 植入时 61 岁，术前已失明 16 年）。
- **植入**：100 电极皮层内微电极阵列（UEA），位于**右侧枕极**；术前预测了 V1/V2/V3 的视网膜拓扑组织；**6 个月后再次手术取出阵列**。
- **任务**：心理物理学实验（阈值、亮度、时间分辨），其中混入假刺激（sham）试次以估计误报率；同步记录刺激周围电极的神经元放电。
- **关键指标**：神经阈值 vs 行为阈值、亮度预测、可分辨为两个光幻视的最小间隔（intertrain interval）。

## 5. 主要结果

- **假刺激误报率低**：#1 在阈值任务中仅 7.3% 的假试次报告有感知，#2 为 2.1%；在光幻视数量任务中分别为 5.2% 与 5.5%。这为"感知确实由刺激引起"提供了基本控制。
- **阈值可预测**：由神经活动推得的阈值（neural threshold）与由受试者回答得到的行为阈值高度相关（两名受试者多项实验均成立）。
- **亮度可预测**：以电极 26 为例，在电极 16 刺激后记录的神经活动与受试者报告的亮度相关（该组实验仅 #2 完成）。
- **光幻视数量可预测**：神经活动可估计受试者感知到几个光幻视。
- **时间分辨**：区分两次独立光幻视所需的最小间隔阈值为 **0.30 ± 0.07 s（#1）** 与 **0.33 ± 0.04 s（#2，均值 ± SD）**。
- **记录质量**：与首位志愿者的既往报道一致，两名受试者在整个研究期内均获得高质量记录，多数电极可持续采集可靠峰电位。

## 6. 这是不是证明"可以精确控制患者看到什么"？

不能，界限如下：

```text
"可预测"≠"可控制"：本文证明了神经活动与主观感受的统计关联，
                   未展示闭环实时控制的完整循环
仅两名受试者、两个阵列位置（右侧枕极）
阵列在 6 个月后取出 → 无长期植入与稳定性数据
亮度实验仅一名受试者完成（软件原因）
受试者失明病因与病程差异大（2.5 年 vs 16 年）
```

作者的表述是"highlight the potential for using the neural activity of neighboring electrodes to accurately infer and control visual perceptions"——**potential**（潜力），不是已实现的闭环控制。

## 7. 与视网膜路线的分工

| 维度    | 视网膜假体（笔记 01、03、04）                            | 皮层假体（本文）         |
| ----- | --------------------------------------------- | ---------------- |
| 刺激部位  | 视网膜（下/脉络膜上）                                   | 视觉皮层 V1          |
| 必要条件  | 光感受器退化但下游通路保留                                 | 视网膜或视神经已无通路      |
| 证据状态  | 38 例（NEJM 2026）、44 通道 2.7 年（44-channel trial） | 2 人，6 个月植入       |
| 核心难点  | 像素分辨率、空间定位                                    | 光幻视可控性、电极数量、长期安全 |
| 本合集对应 | 01、03、04                                      | 02、05            |

## 8. 与神经外科的直接关系

- **体位、入路与靶区**：本文使用 10 mm 骨孔 + 神经导航引导，阵列植入右侧枕极，6 个月后取出——这是"临时研究性植入"的现实路径，可用于早期人体验证而不承担永久植入的长期风险。
- **视网膜拓扑预测的价值**：术前用皮层表面解剖预测 V1/V2/V3 的视网膜拓扑组织，直接决定电极覆盖的视觉空间对应关系；这是手术规划的一部分。
- **手术风险的可控性**：两例受试者均完成 6 个月植入与取出，为评估皮层假体手术可行性提供了初步安全信息。

## 9. 文章的主要优势

1. 首次在人体 V1 同时做刺激与记录，并验证主观感知（阈值、亮度、数量）与神经活动的关联。
2. 采用假刺激试次与低误报率控制，排除了"受试者猜测"这一常见混杂。
3. 给出时间分辨阈值的具体数值（0.30 / 0.33 s），这是设计刺激时序的实用参数。

## 10. 局限

- 仅两名受试者，且病程差异极大（2.5 年 vs 16 年），无法评估病程对结果的影响。
- 阵列在 6 个月后取出，无长期植入安全性、电极退化或胶质反应数据。
- 亮度相关分析仅一名受试者完成，主要结果部分依赖单例数据。
- "预测"是离线统计推断，论文未展示实时闭环系统；从预测到控制仍有工程距离。
- 未评估阵列位置（V1 vs V2）对预测精度的影响，尽管文中区分了 V2 电极。

## 11. 对研究的启示

1. **闭环是皮层假体的必经方向**：把"记录"纳入假体的核心功能，而不只是刺激系统的附属模块。
2. **光幻视数量的可预测性提示了时序参数设计空间**：既然多光幻视的感知可被测量，刺激序列的优化就有了客观依据。
3. **临时植入 + 取出的设计**可用于早期人体概念验证，是伦理上更易推进的路径。

## 12. 汇报时建议强调

> 这篇文章把皮层假体从"我们刺激，患者报告看到什么"变成"我们能从皮层读出患者看到了什么"——这是走向闭环视觉假体的关键一步。

## 13. 参考来源

Grani F, Soto-Sánchez C, Rodil Doblado A, et al. *Science Advances.* 2025. DOI: 10.1126/sciadv.adv8846.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句）+ **核心论点**（中文一句话）。
> 原文文件：`FullText/02_Neural correlates of phosphene perception in blind individuals - A step toward a bidirectional cortical visual prosthesis.fulltext.xml`（Europe PMC 收录的 **JATS 全文**）。
> ⚠️ 版本提示：本笔记基于结构化全文，页码请核对 *Science Advances* 正式版。

## A1. Abstract｜方法与结论

1. "Most previous studies in humans used electrodes only for stimulation, which has made it challenging to precisely control the appearance of individual phosphenes."
   → 问题定义：单向刺激导致"无法精确控制单个光幻视"。
2. "Herein, we implanted an intracortical microelectrode array of 100 electrodes in the visual cortex of two blind volunteers."
   → 样本与器件规模：2 人、100 电极。
3. "Besides showing how stimulation parameters influence perceptual thresholds, perceived brightness, and the minimum interval required to distinguish separate stimuli, our results indicate that subjective visual experience can be accurately predicted from the recorded neural activity."
   → 三个可预测维度：阈值、亮度、时间分辨。

> **核心论点**：把记录功能并入视觉假体，可以把"主观感知"变成可测量的量。

## A2. Introduction｜为什么必须双向

1. "However, up to now it is not possible to control the appearance of individual phosphenes; therefore, many efforts are still needed to achieve the therapeutic benefits envisioned by this technology."
   → 明确陈述尚未解决的瓶颈。
2. "To enable visually impaired individuals to perform visual tasks such as recognize objects or navigate in complex environments, it is clear that prostheses must incorporate a substantial number of electrodes, generally exceeding 625."
   → 电极数量的量级要求（>625）说明 100 通道阵列属于原理验证阶段。
3. "Moreover, the features of the perceived phosphenes and the required current levels for perception may vary between different days, and the induced brightness could be affected by the sequence of stimulation used."
   → 不稳定性有两个来源：跨日漂移与刺激序列间的相互作用。

> **核心论点**：光幻视的时变与序列依赖是单向刺激方案无法自我校正的根本原因。

## A3. Human studies｜受试者与记录质量

1. "As with our first blind volunteer, we consistently obtained high quality recordings and most of the electrodes yielded reliable spikes over the whole study period."
   → 记录质量在整个研究期内稳定，是后续预测分析的前提。
2. "This device has been previously implanted for extended periods of time in the motor and sensory cortex of human subjects, allowing for both neural recordings and intracortical microstimulation."
   → 器件有既往人体使用记录，降低了"新器件风险"的解释负担。

> **核心论点**：双向能力的实现前提是长期稳定的记录质量，而不仅是刺激功能。

## A4. Using neural activity to measure thresholds｜控制与预测

1. "Both subjects performed well in the psychometric experiments, reporting perception in only 7.3% (subject #1) and 2.1% (subject #2) of the total number of sham trials."
   → 假刺激误报率低，是"感知由刺激引起"的关键控制。
2. "Behavioral thresholds for this task were defined as the charge at which the participants reported visual perceptions 50% of the time."
   → 阈值定义明确（50% 报告率），便于跨研究比较。

> **核心论点**：只有把假刺激误报率与阈值定义都写清楚，主观报告才能作为可靠的行为数据使用。

## A5. Estimating the number of phosphenes｜时间分辨

1. "The threshold intertrain interval, defined as the temporal separation at which participants reported perceiving two distinct phosphenes 50% of the time, was 0.30 ± 0.07 s (means ± SD) for subject #1 and 0.33 ± 0.04 s (means ± SD) for subject #2 (Fig. 5B)."
   → 时间分辨阈值约 0.3 s，是刺激时序设计的下限约束。
2. "Both subjects performed well on this task, with an overall rate of incorrect reports in sham trials of only 5.2% for subject #1 and 5.5% for subject #2."
   → 在多光幻视任务中，误报率同样被控制。

> **核心论点**：光幻视的时间分辨是有限且可测量的，这直接约束了假体可传达的时间信息带宽。

## A6. Discussion｜下一代的定义

1. "Our results go a step further and indicate that we can accurately predict not only phosphene thresholds but also brightness levels and the number of perceived phosphenes on the basis of the activity of neighboring electrodes in V1."
   → 从阈值扩展到亮度与数量，是"双向"的实际含义。
2. "Thus, implanting only in V1 reduces the invasiveness of the procedure, thereby minimizing the potential risks associated with implantation into several cortical areas."
   → 只用 V1 即可实现预测，意味着不必扩大植入范围——这是对手术方案的重要结论。
3. "Combined with the demonstration of artificial vision by electrical stimulation of occipital cortex in blind subjects, the results presented in this study underscore the significance of incorporating bidirectional communication with the brain in the next generation of cortical visual prostheses."
   → 作者的结论落在"下一代假体应具备双向通信"。

> **核心论点**：双向能力可以在单区（V1）植入的前提下实现，因此不必然以扩大手术范围、增加风险为代价。
