---
tags:
  - 脑机接口
  - Communications-Medicine
  - 意识障碍
  - 运动想象
  - PDoC
年份: 2026
摘要: 背景 对长期意识障碍（PDoC）患者残余意识的准确评估仍是一项重大临床挑战，因为常规行为学工具可能低估隐蔽认知。本研究评估一套结构化、多阶段的运动想象脑机接口（MI-BCI）方案能否提供客观的、基于脑电图（EEG）的意识指标，以补充行为学评估。方法 44 名参与者（N = 44）使用可穿戴 EEG 完成重复的运动想象任务（PDoC：无反应觉醒综合征 UWS，n = 14；微意识状态 MCS，n = 17；闭锁综合征 LIS，n = 11；另有两名健全参与者作为基准；ClinicalTrials.gov: NCT03827187；2019-01-30）。该方案评估了感觉运动节律调制、有无神经反馈的训练，以及跨阶段的二选一问答。每次会话均实施标准行为学评估（CRS-R 与 WHIM）。结果 73.8% 的患者获得了显著的运动想象脑机接口解码准确率（DA），其中 90% 进入问答测试，并常超过 70% 的可用性阈值，显示出明显的个体间异质性。在显著的 MI-BCI 运行中，LIS 优于 MCS（p = 0.007）与 UWS（p = 0.048）；而在问答阶段，UWS 高于 MCS（p = 0.049），这由熟悉声音刺激驱动。采用留一被试交叉验证，将 DA 与行为学评估的预测相结合，可将平衡诊断准确率从 55% 提升至 62%，对 MCS 的灵敏度由 39% 提升至 69%，同时 LIS 灵敏度略有下降（78% 降至 67%）。感觉运动与顶叶皮层的任务相关活动可区分诊断组。结论 该结构化 MI-BCI 方案有望成为一种不依赖运动的、基于 EEG 的工具，用于区分 UWS、MCS 与 LIS。整合 DA 与空间模式可提供补充行为学评估的诊断信息，并推动用于评估 PDoC 意识的客观工具。
---
# 精读报告 07：Advancing EEG-based assessment of consciousness and cognition in prolonged disorders of consciousness

## 1. 文献信息

- **题目**：Advancing EEG-based assessment of consciousness and cognition in prolonged disorders of consciousness
- **作者**：Naomi du Bois, Attila Korik, Stephanie Hodge, et al.
- **期刊**：*Communications Medicine*
- **年份**：2026
- **文章号**：6:344
- **DOI**：10.1038/s43856-026-01574-x
- **发表时间**：2026-04-17
- **研究类型**：clinical EEG + motor-imagery BCI study
- **核心关键词**：PDoC, EEG, motor imagery BCI, UWS, MCS, LIS

## 2. 研究目的

研究直接针对一个非常现实的问题：

> **能否使用 wearable EEG + motor imagery BCI，在长期意识障碍患者中发现传统行为评估漏掉的认知活动？**

这比实验室中的普通 EEG classification 更接近：

> **真正可部署的 consciousness BCI。**

## 3. 研究对象

共 **44 名参与者**：

- UWS：14；
- MCS：17；
- LIS：11；
- 另有健康参与者作为 benchmark。

患者来自多种临床和生活环境，包括：

- 医院；
- care homes；
- private homes。

这使研究具有一定的现实场景价值。

## 4. 实验设计

研究采用重复 motor imagery：

> imagined movement tasks

并使用：

> wearable EEG。

整体 protocol 分多个阶段：

1. sensorimotor rhythm modulation；
2. BCI training；
3. training with neurofeedback；
4. binary question answering。

最终尝试回答：

> 患者是否能够通过脑活动回答问题？

## 5. 为什么使用 motor imagery

运动想象是 BCI 最经典的 paradigm。

例如：

```text
想象左手运动
     vs
想象右手运动
```

会引起不同的 sensorimotor rhythm modulation。

传统 BCI：

> MI → EEG → classifier → cursor。

这里则变成：

> MI → EEG → evidence of cognition / communication。

## 6. 研究的意义

它把意识检测从：

> “一次性 EEG biomarker”

推进到：

> **structured interactive BCI protocol。**

这一点非常重要。

因为意识不是一个简单的静态脑电状态。

真正临床上需要：

> **interaction。**

例如：

```text
系统发出指令
     ↓
患者产生内部反应
     ↓
EEG
     ↓
decoder
     ↓
系统继续交互
```

## 7. BCI 的核心价值

如果患者不能：

- 说话；
- 按按钮；
- 移动；
- 眨眼；

但仍然能够：

> modulate sensorimotor rhythms

那么 BCI 可以建立一个绕过运动输出的通道。

这正是：

> **cognitive-motor dissociation**

概念在工程上的落地。

## 8. 与 2024 NEJM 的关系

NEJM：

> 多中心研究证明 CMD 并不少见。

Communications Medicine：

> 尝试把这种思路转化成更系统的 wearable EEG + BCI protocol。

因此：

```text
NEJM 2024
发现临床问题
      ↓
BCI protocol
      ↓
2026 wearable EEG
      ↓
未来 bedside BCI
```

## 9. 关键技术路线

```text
wearable EEG
     ↓
preprocessing
     ↓
sensorimotor rhythm
     ↓
motor imagery classifier
     ↓
binary decision
     ↓
communication / awareness assessment
```

相比 fMRI：

- 成本更低；
- 更便携；
- 更适合反复训练；
- 更容易走向家庭使用。

## 10. 重要局限

### 10.1 Motor imagery 不是所有患者都适合

严重脑损伤可能损害：

- attention；
- motor imagery；
- working memory；
- task comprehension。

因此：

> negative BCI result ≠ absence of consciousness。

### 10.2 EEG signal quality

wearable EEG 的：

- electrode impedance；
- movement artifacts；
- environmental noise

都会影响性能。

### 10.3 BCI performance 本身不是 consciousness 的直接指标

如果患者没有完成 BCI：

> 可能是 decoder failure。

而不是：

> patient unconscious。

## 11. 对未来研究的启示

真正理想的 consciousness BCI 应该从单一 paradigm 走向：

> **multimodal adaptive BCI**

例如：

```text
motor imagery
+
auditory language
+
semantic decoding
+
autonomic signals
+
EEG connectivity
        ↓
AI fusion model
        ↓
covert consciousness probability
```

## 12. 最值得注意的方向

未来的系统不应该只回答：

> “患者能不能想象动手？”

而应该逐步发展到：

> “患者能不能理解语言？”

> “能不能区分两个语义刺激？”

> “能不能回答开放式问题？”

> “能不能表达自己的体验？”

这才是真正意义上的 consciousness BCI。

## 13. 汇报建议

这篇文章最适合作为：

> **“从概念验证走向临床工程实现”**

的一页。

一句话：

> **意识 BCI 正从实验室 EEG paradigm 开始向 wearable、interactive、bedside system 发展。**

## 14. 参考来源

du Bois N, et al. *Communications Medicine.* 2026;6:344. DOI: 10.1038/s43856-026-01574-x.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句，便于回查与直接引用）+ **核心论点**（中文一句话）。
> 原文文件：`PDFs/07_Advancing EEG-based assessment of consciousness and cognition in prolonged disorders of consciousness.pdf`（版本：*Article in Press* 未编辑版，CC BY 4.0）。
> ⚠️ 版本提示：本地 PDF 是**未编辑的 in-press 版**，正文行号混排；下述正文引文已去掉行号，但与最终发表版可能存在措辞差异，正式引用前建议核对终版。Abstract 与 Plain language summary 可安全引用。

## A1. Abstract｜四段式结论

1. **Background**: "Accurate assessment of residual awareness in patients with Prolonged Disorders of Consciousness (PDoC) remains a major clinical challenge, as conventional behavioural tools can underestimate covert cognition."
   → 问题定义：**行为学工具会低估隐蔽认知**。
2. "This study evaluates whether a structured, multi-phase motor imagery Brain–Computer Interface (MI-BCI) protocol provides objective electroencephalography (EEG)-based indicators of awareness that complement behavioural assessments."
   → 定位是 **complement（补充）**，不是替代。
3. **Methods**: "Forty-four participants (N = 44) completed repeated imagined-movement tasks using wearable EEG (PDoC: Unresponsive Wakefulness Syndrome (UWS, n = 14), Minimally Conscious State (MCS, n = 17), Locked-In Syndrome (LIS, n = 11); two able-bodied participants as benchmarks; ClinicalTrials.gov: NCT03827187; 30-01-2019)."
   → 44 = 42 患者 + 2 健康基准；已注册临床试验。
4. "The protocol assessed sensorimotor rhythm modulation, training with and without neurofeedback, and binary question answering across phases."
5. **Results**: "Significant MI-BCI decoding accuracy (DA) is achieved by 73.8% of patients, of whom 90% progress to Q&A testing and frequently exceed the 70% usability threshold, revealing marked inter-individual heterogeneity."
   → **主结果三连**：73.8% → 90% → 但异质性极大。
6. "For significant MI-BCI runs, LIS outperform MCS (p = 0.007) and UWS (p = 0.048), while UWS exceed MCS during Q&A (p = 0.049), driven by familiar-voice stimuli."
   → **最反直觉的结果**：UWS 在问答阶段超过 MCS，且由熟悉声音驱动。
7. "Using leave-one-subject-out cross-validation, combining predictions from DA and behavioural assessments improves balanced diagnostic accuracy to 62% (from 55%), increasing sensitivity to MCS (39% to 69%), with a modest reduction in LIS sensitivity (78% to 67%)."
   → 融合模型的收益集中在**中间组 MCS**。
8. "Task-related activity over sensorimotor and parietal cortices differentiate diagnostic groups."
9. **Conclusions**: "The structured MI-BCI protocol demonstrates potential as a movement-independent, EEG-based tool for distinguishing UWS, MCS and LIS."

> **核心论点**：这不是“BCI 能检测意识”的又一次证明，而是“**BCI 指标能与行为学指标互补并改善分类**”的一次多中心临床验证——且受益最大的是最容易被误诊的 MCS。

## A2. Plain language summary｜作者给公众的版本

1. "Some people with severe brain injuries seem unresponsive, yet their brains may still show signs of awareness."
2. "We worked with people in different states of consciousness and those with locked-in syndrome, a rare condition marked by complete paralysis, but intact consciousness – across hospitals, care homes, and private homes."
3. "The results showed that many could change their brain signals, suggesting intentional thinking, especially those with locked-in syndrome."
4. "These findings show that this kind of brain-computer system could help doctors detect hidden awareness in people who cannot move or speak, and may eventually assist with diagnosis and basic communication."

> **核心论点**：作者刻意区分“改变脑信号”与“意识”本身——用的动词是 **suggesting intentional thinking**，而非证明意识。

## A3. Introduction｜概念、误诊与指南分歧

1. "Disorders of Consciousness (DoC) refer to a spectrum of altered conscious states resulting from an acquired brain injury. When a DoC persists beyond four weeks, it is termed a Prolonged Disorder of Consciousness (PDoC)."
   → **四周**是 DoC → PDoC 的分界。
2. "Consciousness comprises two components: wakefulness, driven by subcortical arousal systems (primarily the brainstem and thalamus), and awareness, which depends on a distributed frontoparietal network supporting higher-order cognitive processing and perception of self and environment."
   → **wakefulness（皮层下唤醒）vs awareness（额顶网络）** 的双成分框架。
3. "Clinical presentations are on a continuum; coma (no wakefulness or awareness, typically transient); Unresponsive Wakefulness Syndrome (UWS), wakefulness is present but awareness is absent; and the Minimally Conscious State (MCS), wakeful with minimal or fluctuating awareness."
   → 术语与判据（UWS：醒而无知；MCS：微小/波动意识）。
4. "Although not part of the DoC spectrum, Locked-In Syndrome (LIS) can be misdiagnosed as a DoC using behavioural assessment tools, as the condition results in near-total paralysis that can mask preserved awareness."
5. "People with LIS retain consciousness awareness and can typically communicate via eye movements or blinking – although this ability is lost in Complete Locked-In Syndrome (CLIS) due to additional oculomotor impairment."
   → **CLIS**：连眼动都失去，行为学彻底失效。
6. "However, a fundamental limitation shared by all behavioural assessment tools is their reliance on the patient's ability to produce overt motor or verbal responses."
   → 全文的问题陈述句。
7. "For patients with a PDoC, this presents a significant challenge – fluctuations in arousal, sedative side effects of medication, the presence of a tracheotomy, or severe motor impairments may prevent consistent behavioural output."
   → 四类常见干扰：**波动、镇静、气切、运动障碍**。
8. "Consequently, up to 40% of MCS patients are misdiagnosed as being in UWS."
   → **最高 40% 的 MCS 被误诊为 UWS**——全文最重要的临床动机数字。
9. "Accurate diagnosis is critical for appropriate prognostication, to maximise quality of life and to guide decisions around longer term continuation of treatment."
10. "A survey of forty-four LIS patients in France reported an average diagnostic delay of 78.1 days, with some cases exceeding 1,460 days (four years) – attributed to misinterpretation of symptoms."
    → LIS 平均延误 78.1 天，最长超 4 年。
11. "These findings highlight the urgent need for objective diagnostic tools that do not rely on motor behaviour or vocalisation alone to assess consciousness."
12. "A landmark study by Owen et al. (2006) demonstrated covert awareness in a patient with an apparent UWS by measuring neural responses to motor imagery tasks using functional magnetic resonance imaging (fMRI). Monti et al. (2010) extended this fMRI-based protocol to achieve yes/no communication."
    → 传承链条起点：Owen 2006 → Monti 2010。
13. "However, fMRI is costly and not always accessible, prompting the development of alternative methods such as electroencephalography (EEG). Cruse et al. (2011) demonstrated that EEG, a non-invasive, bedside-compatible method, could detect covert awareness in DoC."
    → fMRI → EEG 的动因：**成本与可及性**。
14. "Sensorimotor rhythms (SMRs), typically in the 8–12 Hz (µ) and 18–26 Hz (β) ranges, are modulated during both movement and kinaesthetic motor imagery (MI)."
    → SMR 的频段定义（µ 8–12 Hz；β 18–26 Hz）——MI-BCI 的生理基础。
15. "Cruse et al. (2011) demonstrated intentional SMR modulation in three UWS patients, indicating misdiagnosis or state transition."
16. "Coyle et al. (2015) moved beyond one-off detection to closed-loop training for MCS patients, using a motor imagery brain-computer interface (MI-BCI), marking a shift toward BCI as a trainable skill."
    → **范式转变关键词**：from passive testing to interactive training。
17. "Participants received both auditory and visual real-time feedback across multiple sessions, with auditory feedback (particularly music) shown to improve motor imagery Decoding Accuracy (DA)."
    → 音乐反馈优于噪音反馈——本文后续用 F(M)/F(PN) 延续这一设计。
18. "Despite growing support for BCIs in supplementing the CRS-R, the current gold-standard behavioural assessment tool, the Royal College of Physicians (RCP) guidelines continues to recommend behavioural assessments (favouring the CSR-R). The RCP argues that there is not enough evidence for neuroimaging-based methodologies to enter routine clinical practice alone."
19. "In contrast, the American Academy of Neurology (AAN) and the European Academy of Neurology (EAN) recognise the additive potential of neuroimaging and electrophysiological tools under specific conditions."
20. "All three organisations share concerns, however, regarding standardisation, cost-effectiveness, and real-world feasibility of these technologies."
    → **指南分歧点很清楚**：不是“有没有用”，而是“证据够不够 + 可不可标准化/可负担”。本文正是对着这三点做的。
21. "However, despite these advances, EEG-based MI-BCI systems remain blind to the integrity of the neural networks supporting consciousness."
    → 作者自陈现有 MI-BCI 的盲区：**看不到网络完整性**。
22. "Functional connectivity (FC) analysis offers a systems-level view of the network dynamics that support awareness – including the Default Mode Network (DMN) and the Fronto-Parietal Network (FPN)."
23. "disruptions in these intrinsic networks are consistently associated with loss of awareness, while residual or reorganised connectivity in key hubs such as the medial Prefrontal Cortex (mPFC), Posterior Cingulate Cortex (PCC), and dorsolateral Prefrontal Cortex (dlPFC) can distinguish between DoC states."
24. "Combining FC with EEG-based MI-BCI could move diagnostic tools beyond binary classifiers toward network-informed diagnostics."
    → 本文的野心：**从二分类器走向网络信息驱动的诊断**。

> **核心论点**：临床痛点不是“检测不到意识”，而是“**误诊率高且延迟长**”；而解决方案必须是低成本、可床边、可重复的（EEG），并需同时提供行为学之外的独立信息（DA + 空间特征 + 连接性）。

## A4. Introduction 末段｜研究目标与贡献声明

1. "the present study evaluates a multi-phase, longitudinal EEG-based MI-BCI protocol for patients with PDoC and LIS."
2. "The study protocol incorporates command-following assessment, real-time neurofeedback, and structured yes/no communication – rolled out in three phases: assessment (sessions 1–2), training and feedback (sessions 3–6), and binary question-answering (sessions 7–10/13)."
3. "The primary focus is to determine whether cognition can be profiled by analysing the aggregate decoding performance within each question category – thereby using the BCI as a scientific instrument to probe domain-specific awareness."
   → **关键定位**：BCI 在这里是**科学仪器（scientific instrument）**，用于探测分域认知，而非仅仅是通信工具。
4. "This study represents one of the largest EEG-based MI-BCI investigations to date involving patients with UWS, MCS, and LIS/CLIS (n = 42)."
5. "Participants were tested in real-world environments, such as hospitals, care homes, and private residences – enhancing the system's ecological validity and clinical relevance."
   → **生态效度**是本文与实验室研究的关键差异。
6. "Importantly, this work moves beyond one-off detection paradigms by integrating training, communication, and behavioural comparison (CRS-R, WHIM) in a longitudinal framework."
7. "We demonstrate that most participants achieve significantly above chance level MI-BCI decoding accuracy, with LIS generally achieving higher accuracies than UWS and MCS across paradigms."
8. "Group-level modelling identifies DA as a key predictor distinguishing LIS from UWS, while the inclusion of traditional behavioural measures further improves classification."
9. "Despite paradigm-dependent variation in DA, overall DA, motor-associative cortical activation patterns, and connectivity features supplement existing behavioural indicators, suggesting that DA offers complementary diagnostic information beyond traditional behavioural assessment."

> **核心论点**：本文的三个可检验主张是——① 多数患者能完成 MI-BCI；② DA 能独立区分 LIS 与 UWS；③ DA 与行为学**互补**（融合后分类更好）。

## A5. Methods｜样本与设计

1. "This study was registered on ClinicalTrials.gov (NCT03827187; 30th January, 2019), and included 42 patients (aged 17–73 years; 13 females, 29 males)."
2. "Patients were diagnosed as follows: 14 with unresponsive wakefulness syndrome (UWS), 17 with minimally conscious state (MCS), 10 with locked-in syndrome (LIS), and 1 with complete locked-in syndrome (total LIS participants, n = 11). Two able-bodied males (aged 20 and 23) were included as benchmarks (AB, n = 2)."
   → 含 1 例 **CLIS**——这是极少见且极有价值的数据点。
3. "All participants were naïve to the task, with the exception of one MCS participant who had previously taken part in an earlier study by Coyle et al. (2015)."
4. "The approved protocol involved experimental procedures that did not include any therapeutic or clinical intervention; accordingly, the research was conducted as a non-interventional basic science study."
   → **定位为基础科学研究**，不是干预试验——这影响其结论的适用范围。
5. "For participants lacking capacity, consent was provided by a consultee, such as the participant's next of kin or legally authorised carer."
   → 代理知情同意流程。
6. "Movement imagery tasks were selected for each patient with input from family or clinicians, avoiding injured brain regions and favouring arm movements when possible."
   → **个体化任务选择**：避开损伤区、优先手部——值得借鉴的设计细节。
7. "Patients imagined one movement combination throughout the study: left vs. right arm, right arm vs. feet, or left arm vs. feet."
8. "With consent from a family member or caregiver, a gentle massage between runs was permitted to rouse the patient if they appeared to fall asleep."
   → 现实场景下的“唤醒”操作——实验室研究通常不会写进方法。
9. **三阶段结构（Table 1）**：Phase I（sessions 1–2，A=Assessment、F(PN)=Pink Noise 反馈）；Phase II（sessions 3–6，T=Training、F(M)=Music 反馈）；Phase III（sessions 7–10/13，Q&A）。
10. "Participants advanced to the next phase when decoding accuracy exceeded 70% or when task-related DAs were statistically greater than baseline (one-tailed paired t-test, α = 0.05)."
11. "The 70% threshold corresponds to performance well above the 99% upper bound of the binomial chance level for 90 trials, providing a conservative operational benchmark for reliable BCI control."
    → **70% 阈值有统计依据**，不是拍脑袋。

> **核心论点**：方法学上最值得学的是三点——**个体化运动想象选择、分阶段进阶判据（含统计依据）、真实生活场景采集**。

## A6. Results — Decoding accuracy examples and metrics｜进阶流程

1. "Following Phase I (assessment), 8 of 14 UWS, 13 of 17 MCS, 10 of 11 LIS patients, and both AB participants progressed to Phase II (training and feedback; N = 33, 73.8% of patients passed assessment)."
   → **73.8%** 的来源。
2. "Having completed Phase II, 6 UWS, 12 MCS, 10 LIS, and both AB participants advanced to Phase III (Q&A; N = 30, 90% of patients progressed to Q&A)."
   → **90%** 的来源。
3. "The number of sessions completed by each patient varied between 4 and 13."
4. "Decoding Accuracy (DA) refers to the percentage of correctly classified imagined movements – and throughout the analyses, 'significant runs' refer to MI BCI runs where DA during the task period was significantly higher than during the corresponding baseline (one-tailed t-test, α = 0.05)."
   → **significant run 的操作定义**，这是读后文所有统计的前提。
5. "Inspection of participant- and run-specific DA, visualised in Figure 4, reveal substantial variability in both initial performance and longitudinal patterns across runs and sessions."
6. "Strong task-related DA was not uniformly accompanied by corresponding changes in reference/baseline decoding accuracy, particularly for PDoC participants, indicating that task-specific modulation and baseline performance can vary independently across these individuals."
   → **Task DA 与 baseline DA 可解耦**——单看总体准确率会误判。

> **核心论点**：73.8% / 90% 这两个数字描述的是**流程通过率**，不是“有意识比例”；且个体轨迹差异极大，组均值会掩盖关键个体。

## A7. Results — Group analysis｜组间比较

1. "A Kruskal-Wallis test on data from all runs revealed a significant group effect (H(2) = 12.047, p = 0.0012, ε2 = 0.36)."
2. "Dunn post hoc comparisons with Holm correction showed the LIS group achieved significantly higher DA than both MCS (p = 0.033) and UWS (p = 0.034) groups, with no significant difference between MCS and UWS."
   → 全 runs 分析：**LIS > MCS ≈ UWS**。
3. "Restricting the analysis to significant runs (Figure 5b) confirmed group differences (Kruskal-Wallis: (H(2) = 10.026, p = 0.007, ε2 = 0.29). Dunn post hoc tests with Holm correction again showed higher DA in the LIS group compared to MCS (p = 0.007), and UWS (p = 0.048)."
4. "A Kruskal-Wallis test was used to evaluate diagnostic group variance in the proportion of significant runs across paradigms and did not find significant group differences (H(2) = 4.65, p = 0.098, ε2 = 0.12)."
   → **重要限定**：差距体现在 **DA 高低**，而不在 **显著 run 的比例**。
5. "Descriptive statistics for both tests indicated that the AB group's mean and median were higher than those of the diagnostic groups, providing a benchmark for interpreting patients' MI results."

> **核心论点**：LIS > PDoC 是稳健的（两种分析口径都成立），但“能做”与“做得好”是两件事——显著 run 比例无组间差异，说明**能力存在与否**并不能区分诊断组。

## A8. Results — Q&A question category analysis｜认知分域与熟悉声音效应

1. "In the Q&A phase, the MI-BCI was used primarily as a cognitive assessment tool to examine whether participants with PDoC could intentionally modulate neural activity in response to different categories of questions (biographical, logical, numerical, and situational)."
2. "Welch ANOVAs revealed significant group differences (all runs; F(2, 13.69) = 4.64, p = 0.029, ω2adj = 0.3, significant runs; (F(2, 13.52) = 7.94, p = 0.005, ω2adj = 0.46)."
3. "Games-Howell post-hoc tests revealed that, with all runs included, LIS had higher DA than MCS (p = 0.028) and UWS (p = 0.042)."
4. "When analyses included significant runs only, DA was higher for the UWS group compared to the MCS group (p = 0.049) and not compared with the LIS group."
   → **本文明星结果**：限定显著 run 后，**UWS 反而高于 MCS**。
5. "UWS and MCS participants achieved mean accuracies of 76-78%, and LIS participants exceeded 80%, whereas accuracies derived from baseline intervals were substantially lower 54-65.5%."
6. "The Q&A task presented pre-recorded questions spoken by a familiar caregiver or relative."
   → 机制线索：**熟悉照护者/亲属的声音**。
7. "The suggestion is that emotionally salient auditory input potentially enhanced cognitive engagement in UWS patients, consistent with prior evidence showing that meaningful stimuli can activate residual cortical networks in UWS despite widespread disconnection."
   → 两种解释之一：情感显著性提升参与度。
8. "That this paradigm-specific effect emerged only in UWS indicates a potential moderating effect of emotionally salient stimuli on BCI engagement in lower awareness states."
9. "Additionally – or alternatively – the UWS participants may collectively exhibit more awareness than previously assumed, which was not evident through standard behavioural diagnostic tests but became observable over time, via movement-independent responses using the MI-BCI."
   → 两种解释之二：**UWS 组本身被低估**。

> **核心论点**：这一结果有两种解释（熟悉声音提升投入 / UWS 群体被系统性低估），作者诚实地并列给出——这正是“MI-BCI 可能发现行为学漏掉的人”的最强线索，但尚未被区分。

## A9. Results — Paradigm-specific differences｜线性混合效应模型

1. "A linear mixed-effects model (LMM) was fitted with task paradigm as a fixed effect and participant as a random intercept, to test whether MI-BCI performance varied across task paradigms. The model included significant MI-BCI runs only."
2. "The assessment paradigm was excluded because it employed a block design, which introduces temporal correlations that may inflate classification performance by capturing slow signal drift rather than stimulus-specific neural responses."
   → **方法学透明的典范**：主动排除会虚高准确率的 block 设计。
3. "For the UWS group, adding random intercepts did not significantly improve model fit (p = 0.13), whereas including task paradigm as a fixed effect significantly improved fit compared to the null model (p = 1.76 x10-6)."
4. "Pairwise comparisons showed higher DA during Q&A compared to training (p = 0.002) and feedback (p = 1.22 x10-6), with no difference between training and feedback (p = 0.12). The Intraclass Correlation Coefficient (ICC) indicated a low between-participant variance (ICC = 0.076)."
   → UWS：**问答题表现优于训练/反馈**，且个体间差异小。
5. "In contrast, random intercepts significantly improved model fit for both the MCS (p = 0.009) and the LIS (p = 2.76 x10-77) group, while paradigm had no significant effect on DA in either group (α = 0.05)."
6. "between-participant variance was low in the MCS group (ICC = 0.103)... while in the LIS group, ICC was high (0.731), indicating that inter-individual differences were the dominant source of variation in DA."
7. "These results suggest that only the UWS group was sensitive to paradigm differences, whereas inter-individual variability among LIS patients accounted for the majority of variance in DA."
   → **三组三种方差结构**：UWS 对任务范式敏感；MCS 变异性在个体内；LIS 变异性在个体间。

> **核心论点**：诊断分组决定了“变异来自哪里”——这直接影响未来试验设计：对 UWS 应优化任务范式，对 LIS 应做个体化建模。

## A10. Results — DA vs CRS-R vs WHIM｜哪把尺子更贴近 BCI

1. "CRS-R and WHIM scores were strongly correlated (Pearson's r(28) = 0.66, p = 6.94 x10-5, 95% CI [0.40, 0.82]), indicating substantial agreement between both behavioural assessment measures."
2. "Partial correlations between participants peak DA and CRS-R and WHIM scores, controlling for diagnostic group, revealed DA was significantly associated with WHIM (partial Pearson's r(28) = 0.43, p = 0.02), but not with CRS-R (p = 0.89) measures."
   → **全文最锋利的一处不一致**：DA 与 WHIM 相关，与 CRS-R 无关。
3. "However, given the CRS-R and/or WHIM (and/or similar) measures were employed to form the diagnosis, these results are not surprising. At issue is whether diagnoses formed using assessment measures that require overt behavioural responses are accurate."
   → 作者用一句话点回根本问题：**诊断本身就是用有缺陷的尺子做的**。
4. "we fitted a multinomial logistic regression model with diagnosis (UWS, MCS, LIS) as the outcome. UWS was set as the reference category."
5. "To provide subject-level external validation, predictive performance was estimated using leave-one-subject-out (LOSO) cross-validation. This approach ensured that each participant's diagnosis was predicted from a model trained on all other participants, avoiding within-sample bias."
6. "A balanced accuracy of 55.4% (CI: 38-73%) was observed, indicating moderate classification performance across groups – correctly identifying 4/8 UWS, 5/13 MCS, and 7/9 LIS cases."
7. "The model performed best for LIS classification (recall = 77.78%, CI: 45-94%), and was weaker for MCS (recall = 38.46%, CI: 18-64%)."
   → DA 单独对 LIS 最有判别力，对 MCS 很弱。
8. "Using LOSO held-out predictions, single-modality balanced accuracies were 57.3% for DA, 49.4% for CRS-R, and 59.4% for WHIM."
   → **单模态排名**：WHIM 59.4% > DA 57.3% > CRS-R 49.4%——行为学金标准 CRS-R 竟是三者中最弱。
9. "A three-model majority-vote ensemble with probability-based tie-breaking achieved a balanced accuracy of 61.81% ((95% CI: 43-80.4), macro-F1 = 0.633, and class-wise recalls of 50.0% (UWS), 69.2% (MCS), and 66.7% (LIS)."
10. "A ~5% improvement in diagnostic accuracy is achieved when integrating MI-BCI DA as a metric alongside behavioural (CRS-R, WHIM) predictor measures; most notably improving recall for the intermediate MCS group – while acknowledging the wide uncertainty around the estimates."
    → 收益精确描述：**约 +5%，主要惠及 MCS**。
11. "However, the reduced predictive performance for LIS in the integrated ensemble model suggests that MI-BCI DA alone remains the most robust predictor of LIS."
    → 融合并非全面更优：**LIS 仍以 DA 单独预测最好**。

> **核心论点**：BCI 指标的价值是“**与行为学不共线**”——它与 WHIM 相关而与 CRS-R 无关，因此能补上 CRS-R 的盲区，尤其是 MCS。

> ⚠️ **数字不一致提示（需在终版核对）**：融合模型的平衡准确率在本文中出现三个数值——Results 表格段为 **61.81%**，Discussion 为 **63.21%（95% CI: 44–80%）**，Abstract 为 **62%（from 55%）**。引用时建议以终版为准，或统一写作“约 62%（61.8–63.2%）”。

## A11. Results — Brain topography｜空间特征

1. "In the AB (benchmark) group, activity was consistently localised to sensorimotor and somatosensory regions across paradigms. In contrast, the PDoC and LIS groups (particularly PDoC) showed more spatially diverse and less stereotyped patterns."
   → 健康人集中、患者弥散——**不能用健康人的空间假设去套患者**（与 Fischer 的批评一致）。
2. "during the Assessment paradigm the difference in MI-weighted CSP values between LIS and UWS in the parietal region was significant (Welch ANOVA and Games-Howell post-hoc, F(2, 11.8) = 7.16, p = 0.009, ω2adj = 0.45, LIS>UWS, p = 0.009)"
3. "during the Q&A paradigm, the difference between LIS and MCS in the sensorimotor region was significant (Kruskal-Wallis and Dunn post-hoc tests with Holm correction; H(2) = 8.801, p = 0.012, ε2 = 0.28, LIS>MCS, p = 0.015)."
4. "These results suggest that LIS participants produce stronger and more discriminable motor imagery-related activation patterns compared with PDoC patients, particularly early on in the protocol, as well as in the Q&A task which requires a yes/no response to a question as opposed to simple command following."
5. "These findings implicate the sensorimotor-parietal network in the preserved capacity for motor imagery and volitional modulation in LIS... demonstrating that BCI performance reflects physiologically meaningful activation, rather than random variance."
   → **对“BCI 准确率是不是随机波动”这一批评的直接回应**。

> **核心论点**：空间特征提供了 DA 之外的**独立证据维度**（感觉运动-顶叶网络），使结论不依赖单一指标。

## A12. Results — Functional connectivity｜探索性

1. "Exploratory source-level FC analyses suggested group differences largely consistent with known thalamo-frontal and DMN–FPN disruptions in UWS compared with MCS and LIS."
2. "These patterns were most evident in the alpha band, extending into the theta band for UWS–LIS comparisons during the Q&A task."
3. "Given the low-density (16-channel) montage, these source-space results are presented as exploratory only."
   → 作者主动降级：**16 通道 → 只能探索性**。

> **核心论点**：连接性结果与已知的丘脑-额叶 / DMN-FPN 损伤机制一致，但因电极密度限制只能作为旁证；**主结论仍由 sensor-level 与行为学结果支撑**。

## A13. Discussion｜解读、机制与局限

1. "As expected, descriptive statistics show they achieved the highest decoding accuracies (DAs); however, peak performances in some diagnostic groups occasionally approached these benchmark levels."
   → 患者高峰值偶尔接近健康基准。
2. "Overall, 8/11 UWS, 13/17 MCS, and 10/11 LIS patients (73.8% of recruited patients) achieved significant DA during Phase I, with 6/8 UWS, 12/13 MCS and 10/10 LIS (90% of the patients who passed the Assessment phase) completing phase III – suggesting volitional modulation of brain activity was preserved in a high proportion of patients within this study cohort."
3. "An evaluation of diagnostic group differences in the proportion of significant runs, across (a) paradigms and (b) question categories, revealed no significant effects, suggesting comparable (a) motor imagery capacity and (b) potential ability to communicate yes-no answers, across diagnostic groups."
4. "The latter interpretation remains theoretical and requires further empirical testing to assess whether patients can reliably use motor imagery to communicate yes-no responses on a single trial basis however the results demonstrate the average overall response to repetitions of questions may enable, albeit slow, communication."
   → **极其重要的限定**：可达的是**重复平均后的慢速交流**，不是单试次可靠交流。
5. "As illustrated in Figure 4, group averages can obscure inter-individual variability – masking individuals whose MI-BCI performance is substantially better than is suggested by their diagnostic group mean."
6. "The marked heterogeneity in MI-BCI performance across PDoC groups reinforces the growing consensus that preserved covert awareness may be underestimated in patients with PDoC, when assessment relies on tools that require overt behavioural responses."
7. "Furthermore, the presence of exceptionally high-performing LIS participants highlights the potential for some individuals with LIS to approach maximal DA, in a short time-frame. Such cases motivate the development of responder-focused, individually tailored MI-BCI protocols."
   → 结论指向 **responder-focused（按反应者分层）** 的个体化方案。
8. "In binary motor imagery BCIs, classification accuracies of approximately 70% are commonly adopted as a criterion for reliable control, reflecting statistically significant performance above chance and practical usability, while higher accuracies (≥75–80%) are typically required for sustained online or clinical applications."
   → 阈值常规范式（70% / ≥75–80%）。
9. "It should be noted, however, that inter-run and inter-session variability, which is more pronounced in these participant groups due to factors such as fluctuating awareness, fatigue, and engagement, makes it more difficult to assume reliable cross-run DA."
   → **跨 run 稳定性仍是软肋**。
10. "The gradual performance improvements observed in a subset of participants (Figure 4) suggest that feedback-driven learning and sustained engagement can enhance MI control."
11. "These findings indicate that performance may further improve with extended exposure, real-time adaptive feedback, and motivational engagement paradigms."
    → 三条改进方向：**更长时间、实时自适应反馈、动机化设计**。
12. "Grouping questions into distinct cognitive categories enabled assessment of category-specific decoding accuracy as a means of probing differential conscious awareness, rather than validating the MI-BCI as a communication channel per se."
13. "The randomised presentation and balanced phrasing of Yes/No questions minimised the likelihood of auditory or linguistic confounds in significant runs."
14. "all auditory cues were temporally and procedurally separated from the MI task window, identical across conditions, and too brief to account for sustained decoding differences; occasional tactile re-alerting occurred only between runs."
    → **对“是不是听觉/唤醒混淆”这一质疑的逐条防御**。
15. "These controls make it unlikely that the observed MI-specific effects were driven by auditory or arousal-related factors, although we acknowledge this as a potential limitation."
16. "Future studies will implement counterbalanced Yes/No mappings, auditory-control conditions, and formal multiplicity corrections to further substantiate and refine this approach."
    → 明确列出下一步的三项控制。
17. "Although this study represents the most comprehensive MI-BCI protocol trialled in a PDoC population to date, involving fifteen NHS hospitals in the UK and the NRH in Ireland in patient recruitment – unequal group sizes constrained some statistical comparisons, though the analysis of all MI-BCI runs achieved 91% power and large effect sizes were found for the analyses of group variance based on MI-BCI DA values."
    → 15 家 NHS 医院 + 爱尔兰 NRH；统计功效 91%。
18. "EEG instability due to non-stationary brain states, linked to fatigue, arousal, medication, or learning – remains a challenge, often resulting in covariate shift."
19. "DA could likely be improved through more fine-grained, participant-specific band optimisation, with adaptive classifiers, feature adaptation, or data space adaptation also representing promising strategies to mitigate these effects."
    → 工程改进清单：频带个体化 + 自适应分类器 / 特征自适应 / 数据空间自适应。
20. "Furthermore, although concurrent EMG was not recorded, visual inspection did not reveal sustained artefacts consistent with muscle activity. Given the severe motor impairment of participants, systematic EMG contamination is unlikely. Nevertheless, the integration of EMG and eye-tracking would benefit future research, to further rule out residual movement influences."
    → 承认缺少 EMG/眼动控制。

> **核心论点**：本文的诚实之处在于把“能显著解码”与“能可靠交流”严格分开；它的结论是**诊断补充**，并把“跨 run 稳定性 + 自适应校准 + 个体化频带”列为真正的工程瓶颈。
