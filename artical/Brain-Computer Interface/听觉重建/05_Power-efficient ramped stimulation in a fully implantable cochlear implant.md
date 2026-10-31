---
tags:
  - 听觉重建
  - Scientific-Reports
  - 人工耳蜗
  - 刺激波形
  - 能效优化
  - FICI
年份: 2025
摘要: 人工耳蜗（CI）是最成熟的神经调控装置之一，通过电刺激听神经提供听觉感知。传统刺激策略依赖对称双相矩形脉冲，而其他脉冲形状可能在神经激活与能效方面带来改善——对于功耗是关键限制的全植入式人工耳蜗系统尤其如此。本研究使用定制设计的全植入式人工耳蜗（FICI）系统，在豚鼠在体模型中比较了阳极优先的斜坡型双相脉冲形状与传统的阳极优先矩形脉冲。我们记录了针对四种电荷平衡波形（矩形、RampUp、RampDown 与 RampLong）的电诱发听性脑干反应（eABR）。在这项单受试者可行性研究中，与矩形脉冲相比，斜坡型波形诱发出显著更大的 eABR 振幅、更陡的输入-输出函数以及更短的潜伏期。此外，我们通过分析波形频谱及其在频率依赖介质模型中的衰减，刻画了电极-组织界面的传输效率。在对这些介质特异性损耗进行校正后，在阳极优先双相配置下，RampUp 与 RampLong 脉冲在阈下反应水平相对矩形脉冲显示出高达 19–22% 的功率效率改善。这些发现凸显了斜坡型刺激在不损害——有时甚至增强——神经激活的前提下降低能耗的潜力。此类改善对全植入式装置尤其有价值，可支持更长的电池寿命与更可持续的刺激策略，适用于下一代人工耳蜗。
---
# 精读报告 05：Power-efficient ramped stimulation in a fully implantable cochlear implant

## 1. 文献信息

- **题目**：Power−efficient ramped stimulation in a fully implantable cochlear implant
- **作者**：Mert Doğan, Ozlem Topcu, Hasan Ulusan, et al.
- **期刊**：*Scientific Reports*
- **年份/卷期**：2025; 15:41323
- **DOI**：10.1038/s41598-025-25077-2
- **研究类型**：单受试者可行性研究（豚鼠在体，全植入式人工耳蜗系统）
- **核心关键词**：ramped biphasic pulse, fully implantable cochlear implant, eABR, power efficiency, electrode-tissue interface

## 2. 一句话结论

在豚鼠在体的**全植入式人工耳蜗（FICI）**系统中，**阳极优先斜坡型双相脉冲**（RampUp / RampLong）相比传统矩形脉冲诱发出**更大的 eABR 振幅、更陡的输入-输出函数与更短的潜伏期**；在校正电极-组织界面衰减后，阈下反应水平下**功率效率提升达 19–22%**。对全植入式装置而言，这直接对应电池寿命与可持续刺激策略。

## 3. 为什么这篇文章重要

人工耳蜗常被视为"已经成熟的神经假体"，但**全植入式**（无外部言语处理器）的瓶颈之一是功耗：

```text
传统人工耳蜗：外部言语处理器 + 经皮传输 → 电池与体积限制在体外
全植入式    ：所有部件在体内 → 电池容量与更换成为核心工程约束
                → 功耗降低约 20%，续航相应延长，直接决定可行性
```

本文的意义在于：**在不改变硬件的前提下，仅通过改变刺激波形形状就获得能效收益，同时神经激活更强**。这是"同一器件、更好参数"的典型改进路径。

## 4. 实验设计

- **器件**：定制设计的全植入式人工耳蜗（FICI）刺激专用集成电路（IC），采用**连续交错采样（CIS）**策略，与临床接受的 CI 刺激范式一致。
- **动物模型**：豚鼠在体（single-subject feasibility）。
- **波形**：四种电荷平衡波形——**Rectangular（矩形）、RampUp、RampDown、RampLong**；均采用阳极优先双相配置。
- **读出**：电诱发听性脑干反应（eABR）——振幅、输入-输出函数斜率、潜伏期。
- **能效分析**：分析波形频谱及其通过频率依赖介质模型的衰减，校正电极-组织界面的介质特异性损耗后计算功率效率。
  - 效率定义：`(P_rectangular − P_waveform)/P_rectangular × 100%`，正值表示相对矩形基线功耗更低。

## 5. 主要结果

**电生理层面**

- 斜坡型波形诱发的 eABR **振幅显著更大、输入-输出函数更陡、潜伏期更短**。
- 波形类型对振幅有显著主效应（Friedman 检验，χ² = 20.250，p < 0.0001）。
- 事后 Wilcoxon 符号秩检验：矩形 vs RampUp（Z = −2.521，p = 0.012）、vs RampDown（Z = −2.240，p = 0.025）、vs RampLong（Z = −2.521，p = 0.012）均显著；RampLong 与 RampUp/RampDown 之间亦显著（p = 0.012），而 RampUp 与 RampDown 之间无显著差异（Z = −0.700，p = 0.484）。
- 输入-输出斜率：矩形与 RampUp（p = 0.025）、RampDown（p = 0.017）、RampLong（p = 0.012）之间均有显著差异。

**能效层面（校正介质损耗后，阈下响应水平）**

| 波形 | 0.20 µV 水平效率增益 | 0.25 µV 水平效率增益 |
| --- | --- | --- |
| RampUp | 22.4% | 17.2% |
| RampLong | 19.6% | 18.4% |
| RampDown | 17.2% | 15.2% |
| 矩形（基线） | — | — |

论文结论强调：**RampUp 与 RampLong 在阈下反应水平下相对矩形脉冲获得约 19–22% 的功率效率改善**。

## 6. 这是不是证明"新一代人工耳蜗可以用斜坡波"？

不能，边界如下：

```text
单受试者、豚鼠在体可行性研究 → 无人体数据、无多受试者统计
能效增益是在"校正介质损耗后"计算的 → 依赖所采用的频率依赖介质模型，
                                      模型假设偏差会直接影响效率数字
效率是相对矩形基线的改进       → 不是绝对功耗测量
未评估长期刺激安全性           → 斜坡波形对组织的电荷分布与长期影响未涉及
未做人类心理物理学验证         → 论文援引他人研究（斜坡脉冲被人类 CI 使用者
                                感知为更响），但本文未验证感知等效性
```

作者自己的定位是 "single-subject feasibility study"，并称这是"真实植入条件下首个在体能效证据"。

## 7. 与人工耳蜗其他方向的定位

| 方向 | 代表工作 | 解决的问题 |
| --- | --- | --- |
| 预后预测 | 笔记 03（综述）、笔记 04（DTL 模型） | 谁获益多少 |
| **器件与能效** | **本文（斜坡波形）** | **装置能否全植入、续航多久** |
| 闭环与注意控制 | 笔记 01（Perspective）、笔记 02（EEG 闭环） | 噪声中如何锁定目标说话人 |
| 外科适应证 | 笔记 06（儿科 ABI 技术） | 无法植入耳蜗者怎么办 |

## 8. 与神经调控外科的关系

- **波形工程是可迁移的通用方法**：同样的"改变脉冲形状提升能效"思路适用于 DBS、SCS、皮层刺激等所有植入式神经调控装置（本合集意识促醒方向 SCS 使用的 70 Hz、210 µs 脉宽，是由耐受与觉醒反应决定的，未必是最优能效方案）。
- **机制假说具有神经生理依据**：作者提出斜坡脉冲更契合螺旋神经节神经元（SGN）对电流渐变的响应特性（更同步的放电），这与他人在人类受试者中观察到"斜坡脉冲更响"的行为结果一致。
- **全植入式的临床意义**：无体外部件的 CI 可减少佩戴负担、避免经皮传输的皮肤问题，并允许在洗澡/游泳等场景使用。

## 9. 文章的主要优势

1. 在真实的 FICI 系统中进行在体测试，而非体外电路或仿真——外部效度高于常见的波形研究。
2. 同时报告电生理（eABR 振幅、斜率、潜伏期）与能效两类指标，说明改进不是"牺牲激活换省电"。
3. 把电极-组织界面的介质衰减纳入效率计算，方法比直接比较电压/电流更严谨。
4. 采用 CIS 策略，与临床接受的刺激范式一致，便于向临床转化。

## 10. 局限

- 单受试者（n = 1）豚鼠在体研究，无统计功效可言。
- 效率增益依赖介质模型校正，属间接测量而非直接功耗测量。
- 未评估长期刺激的组织安全性与电极退化。
- 未做人类心理物理学验证（感知等效性、音质、电极间干扰）。
- 未比较不同电极阵列类型或不同刺激速率下的效果。

## 11. 汇报时建议用一句话总结

> 不换硬件、只换波形，就能在增强神经激活的同时省下约 20% 功耗——这对"全植入式"人工耳蜗是从"能不能做"到"能戴多久"的关键一步。

## 12. 参考来源

Doğan M, Topcu O, Ulusan H, et al. *Scientific Reports.* 2025;15:41323. DOI: 10.1038/s41598-025-25077-2.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句）+ **核心论点**（中文一句话）。
> 原文文件：`PDFs/05_Power-efficient ramped stimulation in a fully implantable cochlear implant.pdf`（出版社正式版，11 页）。
> ⚠️ 版本提示：原文标题中的连字符为 U+2212（"Power−efficient"），本笔记文件名与正文按 ASCII 连字符书写，未改变词义。

## A1. Abstract｜方法与结论

1. "While conventional stimulation strategies rely on symmetric biphasic rectangular pulses, alternative pulse shapes may offer improvements in neural activation and energy efficiency-particularly for fully implantable CI systems where power consumption is a key limitation."
   → 研究动因：全植入式的功耗约束。
2. "In this single-subject feasibility study, ramped waveforms elicited significantly larger eABR amplitudes, steeper input-output functions, and shorter latencies compared to rectangular pulses."
   → 电生理证据的三个维度同时改善。
3. "After correcting for these medium-specific losses, in the anodic-first biphasic configuration, RampUp and RampLong pulses demonstrated up to 19-22% improvement in power efficiency relative to rectangular pulses at subthreshold response levels."
   → 能效数字及其限定条件（校正介质损耗、阳极优先、阈下水平）。
4. "These findings highlight the potential of ramped stimulation to reduce energy consumption without compromising-and in some cases enhancing-neural activation."
   → "without compromising"是关键：不是以激活为代价换省电。

> **核心论点**：波形形状是独立于硬件的一个优化维度，能同时改善激活与能效。

## A2. Introduction / 背景｜机制假说

1. "In the anodic-first configuration examined in this study, ramped pulses may better align with the intrinsic dynamics of spiral ganglion neurons (SGNs), which are more responsive to gradual changes in current and exhibit more synchronized firing when exposed to stimuli with increasing amplitude."
   → 机制假说：斜坡脉冲契合 SGN 对电流渐变的响应特性（用词为 "may"）。
2. "It has been shown that neural stimulation is by far the most power-hungry task of a CI system."
   → 功耗问题集中在刺激环节，这决定了优化对象。

> **核心论点**：波形优化的合理性来自神经元对电流渐变与突变的不同响应，而非经验试错。

## A3. Methods｜器件与范式

1. "The custom stimulator integrated circuit (IC) used in this study was previously developed as part of a FICI system."
   → 使用既有定制 IC，说明这是系统级而非电路级研究。
2. "Stimulation is synchronized using a continuous interleaved sampling (CIS) strategy, enabling sequential, interleaved activation of electrodes at a fixed rate-consistent with clinically accepted CI stimulation paradigms."
   → 采用临床通行的 CIS 策略，提高了向临床转化的可行性。
3. "Efficiency was then quantified as (Prectangular − Pwaveform)/Prectangular × 100%, such that more positive values indicate reduced power requirements compared to the rectangular baseline."
   → 效率定义明确，便于与其他研究比较。

> **核心论点**：能效比较必须在可复核的定义与临床一致的刺激范式下进行。

## A4. Results｜统计与波形间差异

1. "A Friedman test indicated a significant main effect of waveform type on amplitude (X2 = 20.250, p < 0.0001)."
   → 波形类型对振幅有显著主效应。
2. "Post hoc Wilcoxon signed-rank tests (standardized statistic value of Z) showed significant differences between Rectangular and RampUp (Z = –2.521, p = 0.012), RampDown (Z = –2.240, p = 0.025), and RampLong (Z = –2.521, p = 0.012)."
   → 三种斜坡波形均优于矩形，RampDown 的优势相对最弱。
3. "RampLong also differed significantly from RampUp (Z = –2.521, p = 0.012) and RampDown (Z = –2.521, p = 0.012), while RampUp and RampDown did not differ significantly from each other (Z = –0.700, p = 0.484)."
   → 差异的层级结构：RampLong 最特殊，RampUp ≈ RampDown。

> **核心论点**：斜坡方向与形态对神经激活的影响存在可测差异，不是"只要斜坡就一样好"。

## A5. Discussion / Conclusion｜能效与临床意义

1. "After correcting for medium attenuation, both anodic-first RampUp and anodic-first RampLong demonstrate approximately 19–22 % improvements in power efficiency at sub-threshold response levels."
   → 校正后的效率区间（注意限定在阈下水平）。
2. "Importantly, by incorporating electrode–tissue interface attenuation into the analysis, we provide the first in vivo evidence that ramped pulses offer up to 22% power efficiency gains relative to rectangular pulses under realistic implant conditions."
   → 作者主张的新颖性：真实植入条件下的首个在体能效证据。
3. "In follow-up work, Navntoft et al. further reported that ramped pulses are perceived as louder by human CI users-likely a behavioral correlate of the increased neural synchrony we observed in animal recordings."
   → 动物电生理与人类行为结果的呼应，是本文结论向临床外推的主要依据。

> **核心论点**：能效优化的临床价值最终取决于人类使用者的感知等效性，而这一点目前只由他人研究间接支持。
