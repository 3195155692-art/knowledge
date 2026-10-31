---
tags:
  - 脑机接口
  - Journal-of-Clinical-Medicine
  - 多模态评估
  - 意识障碍
  - 神经退行性疾病
  - AI
年份: 2026
摘要: 意识的评估在很大程度上由急性或慢性脑损伤后获得性意识障碍的研究所塑造，但在神经退行性疾病中，类似的“行为表达不可靠”问题正日益凸显。当患者因严重运动障碍、觉醒波动、认知衰退、失语、失用或配合能力受损而无法可靠表达保存的认知、意识或意向性时，这一转化性问题尤为突出。在神经退行性疾病中，觉醒系统、大规模脑网络、认知与运动通路的退变同样可能使可观察行为成为衡量意识的不可靠指标。挑战不仅在于判断患者是否有反应，更在于追问：残余的意识、意向性或隐蔽认知是否仍可通过生理信号被检测到。本综述讨论了当代各类模态如何重塑这一评估。脑电图已从对背景活动的描述性指标，发展为能够在床旁探测事件相关反应、网络组织与皮层复杂度的工具。磁共振方法揭示了丘脑皮层与默认模式网络系统内的连通性改变，而功能性近红外光谱则补充了一种可便携、可在床旁重复并与主动范式结合的血流动力学方法。脑机接口通过将神经反应转化为指令跟随的证据、或在部分患者中转化为交流，提供了一个转化性的步骤；人工智能则通过从复杂的神经与血流动力学数据中提取具有临床意义的模式来强化这些方法。此外，自主神经指标（包括心率变异性与压力反射指数）被视为觉醒与投入的辅助生理背景，而非意识的直接标志物。由于关于隐蔽意识与认知-运动分离最成熟的证据来自获得性意识障碍，本综述将脑损伤文献作为方法学基础，而非可直接互换的神经退行性疾病证据。随后，本综述考察了这些方法如何适配神经退行性情境，尤其是 ALS、重度痴呆、伴认知波动的路易体病，以及交流或运动输出变得不可靠的情形。
---
# 精读报告 08：Multimodal Assessment of Consciousness with Brain-Computer Interfaces and Artificial Intelligence: From Acquired Brain Injury to Neurodegenerative Disease

## 1. 文献信息

- **题目**：Multimodal Assessment of Consciousness with Brain-Computer Interfaces and Artificial Intelligence: From Acquired Brain Injury to Neurodegenerative Disease
- **作者**：Bernard Kordas
- **期刊**：*Journal of Clinical Medicine*
- **年份/卷期/文章号**：2026; 15(14): 5398
- **DOI**：10.3390/jcm15145398
- **发表时间**：2026-07-09
- **文章类型**：Review
- **核心关键词**：BCI, artificial intelligence, consciousness assessment, acquired brain injury, neurodegeneration

## 2. 文章定位

这篇文章不是一个单中心的新型 BCI 实验，而是对：

> **BCI + AI + consciousness assessment**

这一交叉领域的综合性讨论。

它特别适合作为汇报最后一篇：

> **“这个领域未来会往哪里走？”**

## 3. 核心框架

作者讨论的方向可以概括为：

```text
Brain signals
   ↓
BCI
   ↓
AI / machine learning
   ↓
multimodal cognitive-state assessment
   ↓
consciousness evaluation
```

进一步延伸到：

- acquired brain injury；
- disorders of consciousness；
- neurodegenerative diseases；
- communication；
- rehabilitation。

## 4. 为什么需要 multimodal

单一 EEG 有明显局限：

```text
EEG
↓
high temporal resolution
×
limited spatial resolution
```

fMRI：

```text
fMRI
↓
high spatial resolution
×
poor temporal resolution
×
low portability
```

因此更合理的方向是：

```text
EEG
+
fMRI
+
fNIRS
+
physiological signals
+
behavior
```

再通过 AI 进行：

> multimodal fusion。

## 5. AI 在这里扮演什么角色

AI 并不是简单做一个：

> consciousness classifier。

更有价值的是：

### Feature extraction

从原始神经信号提取：

- spectral features；
- connectivity；
- temporal dynamics；
- network representation。

### Representation learning

寻找：

> neural state representation。

### Multimodal fusion

把：

- EEG；
- fMRI；
- physiology；
- behavioral data

整合起来。

### Personalized decoding

不同患者脑损伤位置不同。

因此：

> patient-specific adaptation

非常重要。

## 6. 从 diagnosis 到 communication

文章讨论的方向可以理解成：

### Stage 1

```text
EEG
 ↓
consciousness classification
```

### Stage 2

```text
EEG
 ↓
covert command detection
```

### Stage 3

```text
EEG
 ↓
yes/no communication
```

### Stage 4

```text
neural activity
 ↓
semantic decoding
 ↓
language
```

### Stage 5

```text
conscious content
 ↓
communication
```

这是目前最值得关注的技术路线。

## 7. 从 detection 到 closed-loop

更进一步：

```text
Brain signal
    ↓
AI decoder
    ↓
consciousness state
    ↓
neuromodulation
    ↓
new brain state
    ↓
BCI reassessment
```

形成：

> **closed-loop neurotechnology**

这意味着 BCI 不再只是 passive measurement。

而可能成为：

> assessment + intervention system。

## 8. 临床场景

### Acquired brain injury

例如：

- traumatic brain injury；
- stroke；
- hypoxic injury。

### Disorders of consciousness

- UWS；
- MCS；
- CMD。

### Neurodegenerative disease

尤其是：

- ALS；
- severe motor impairment；
- advanced neurodegenerative disorders。

这里 BCI 可以提供：

> communication channel。

## 9. 这篇综述最重要的判断

未来临床 consciousness BCI 需要解决的不只是：

> accuracy。

还需要：

- reliability；
- interpretability；
- generalizability；
- portability；
- patient-specific adaptation；
- ethical governance。

## 10. 与前面七篇文章的关系

可以把整个领域串成：

```text
Bodien 2024
“无行为反应 ≠ 无认知”
        ↓
Fischer 2025
“能否解码 covert consciousness？”
        ↓
Kronemer 2025
“如何证明 decoded signal 真正与意识相关？”
        ↓
Tang 2023
“semantic content 可以被 neural decoder 重建”
        ↓
Littlejohn 2025
“语言可以被连续实时输出”
        ↓
Wairagkar 2025
“神经活动可以直接生成声音”
        ↓
du Bois 2026
“wearable EEG + BCI 开始进入临床交互”
        ↓
Kordas 2026
“multimodal AI + BCI + closed-loop”
```

## 11. 目前真正的研究空白

综合这些文献，可以看到几个非常明显的 gap：

### Gap 1：意识状态与意识内容没有完全打通

当前研究：

> state decoding

和：

> content decoding

还是两条相对独立的路线。

### Gap 2：健康人 decoder 向患者迁移困难

健康人：

> stable neural representation

患者：

> damaged / reorganized network。

### Gap 3：ground truth 问题

意识本身没有直接可观测的 gold standard。

### Gap 4：实时性

fMRI semantic decoding 很强，但不适合真正实时 BCI。

### Gap 5：隐私

越强的 decoder：

> 越接近 mental privacy boundary。

## 12. 如果要做科研，可以考虑的方向

一个具有逻辑连续性的研究框架是：

> **Multimodal neural decoding of covert consciousness**

例如：

```text
EEG + fNIRS
      ↓
self-supervised representation learning
      ↓
multimodal fusion
      ↓
conscious vs unconscious discrimination
      ↓
semantic decoding
      ↓
personalized communication
```

如果再加入：

> language model / foundation model

可以进一步探索：

```text
brain representation
      ↓
semantic latent space
      ↓
language generation
```

## 13. 最终结论

这篇综述最适合支持一个判断：

> **未来意识 BCI 不太可能依赖单一脑信号或单一分类器，而更可能是多模态神经信号 + AI + 个体化模型 + 交互式 BCI 的组合。**

## 14. 参考来源

Kordas B. *J Clin Med.* 2026;15(14):5398. DOI: 10.3390/jcm15145398.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句，便于回查与直接引用）+ **核心论点**（中文一句话）。
> 原文文件：`PDFs/08_Multimodal Assessment of Consciousness with Brain-Computer Interfaces and Artificial Intelligence - From Acquired Brain Injury to Neurodegenerative Disease.pdf`（版本：正式版 Version of record，MDPI 开放获取，CC BY，共 35 页）。
> 结构提示：本文共 8 节——1 Introduction；2 Electrophysiological and Neuroimaging Techniques；3 BCI Across ABI and ND；4 AI-Assisted Multimodal Integration；5 Autonomic Measures；6 Future Directions；7 Limitations；8 Conclusions。

## A1. Abstract｜全文主张

1. "The assessment of consciousness has been shaped largely by research on acquired disorders of consciousness after acute or chronic brain injury, but similar problems of unreliable behavioral expression increasingly arise in neurodegenerative disease."
   → 本文的**跨领域桥梁**：ABI 的方法学基础 → 迁移到神经退行性疾病（ND）。
2. "This translational overlap is especially relevant when preserved cognition, awareness, or intentionality cannot be reliably expressed because of severe motor impairment, fluctuating arousal, cognitive decline, aphasia, apraxia, or impaired cooperation."
   → 六类“表达失败”的原因。
3. "The challenge is not only to determine if a patient responds, but also to ask if residual awareness, intentionality, or covert cognition can still be detected through physiological signals."
   → **问题重述**：从“是否响应”到“是否仍有隐蔽意识/意向性”。
4. "Electroencephalography has moved from a descriptive measure of background activity to a bedside tool capable of probing event-related responses, network organization, and cortical complexity."
   → EEG 的定位升级：描述性 → 探测性。
5. "Magnetic resonance methods reveal altered connectivity within thalamocortical and default mode network systems, while functional near-infrared spectroscopy adds a portable hemodynamic approach that may be repeated at the bedside and integrated with active paradigms."
6. "Brain–computer interfaces provide a translational step by converting neural responses into evidence of command following or, in selected patients, into communication, and artificial intelligence strengthens these approaches by extracting clinically meaningful patterns from complex neural and hemodynamic data."
7. "Additionally, autonomic measures, including heart rate variability and baroreflex indices, are considered as auxiliary physiological context for arousal and engagement, and not as direct markers of awareness."
   → **明确的边界声明**：自主神经指标不是意识标志物。
8. "Because the most mature evidence for covert awareness and cognitive-motor dissociation comes from acquired disorders of consciousness, this review treats brain injury literature as a methodological foundation instead of as directly interchangeable evidence for neurodegenerative disease."
   → 全文最重要的方法论立场：**方法学基础 ≠ 可直接互换的证据**。
9. "It then examines how these approaches may be adapted to neurodegenerative contexts, especially ALS, severe dementia, Lewy body disease with fluctuating cognition, and conditions in which communication or motor output becomes unreliable."
   → 四个重点 ND 场景。

> **核心论点**：本综述的价值不在“又列一遍技术”，而在于把**“行为不可靠”这一共同问题**在 ABI 与 ND 之间拆解为可迁移的方法学与不可迁移的证据两个部分。

## A2. Section 1 — Introduction｜两类疾病的差异与行为学的极限

1. "Disorders of consciousness are classically conceptualized through impaired wakefulness, impaired awareness, or dissociation between the two, and they remain among the most difficult states to characterize when motor output is limited or unreliable."
2. "In neurodegenerative disease, the problem often appears in a less stereotyped but equally important form, because degeneration can disrupt attention and awareness of the self, whereas motor neurodegenerative disease can limit the capacity to express preserved cognition through behavior."
   → ND 的两种失败模式：**认知本身退化** vs **表达通道退化**。
3. "Fluctuations in attention and awareness are prominent in dementia with Lewy bodies and can distinguish it clinically from Alzheimer's disease and vascular dementia."
4. "Neuroimaging studies in Lewy body dementia have linked changes in regional perfusion with hallucinations and fluctuations in consciousness, which supports a biological understanding of these phenomena, not a purely descriptive one."
   → 为“波动”提供生物学根据。
5. "In severe Alzheimer's disease, awareness may persist in forms that are difficult to capture by routine bedside assessment, and multimodal approaches combining electrophysiology and imaging may provide physiological and imaging measures that may support assessment."
6. "A key limitation... therefore, evidence from acquired brain injury is not treated here as directly transferable to Alzheimer's disease, Parkinsonian syndromes, Lewy body dementia, or ALS. Instead, it is used to identify assessment principles that may require adaptation to specific patterns of degeneration, motor impairment, cognitive fluctuation, and preserved or impaired communication."
7. "Standardized neurobehavioral testing improves diagnostic accuracy, yet clinically meaningful misclassification remains common when overt responses are inconsistent or absent."
8. "Functional neuroimaging has shown that some behaviorally unresponsive patients retain covert command following, first with functional magnetic resonance imaging performed during active tasks and later with more systematic approaches demonstrating willful modulation of brain activity."
9. "Electroencephalography has extended this principle to the bedside by detecting covert awareness through motor imagery and related methods in patients who could not demonstrate command following behaviorally."
10. "A subsequent reanalysis of the same dataset and the corresponding author reply illustrate that detection of covert command-following with EEG is sensitive to task structure, preprocessing choices, artifact handling, statistical assumptions, and convergent validation, and should not be interpreted as a simple binary output of a classifier."
    → **极重要的一段**：Cruse 2011 的数据重分析（Goldfine 等）与作者回应，说明 EEG 隐蔽意识检测对**任务结构、预处理、伪迹处理、统计假设**高度敏感。
11. "A brain–computer interface enables communication or control via neural activity instead of peripheral motor output, making it well-suited in conditions such as amyotrophic lateral sclerosis, where consciousness may be preserved despite progressive paralysis."
12. "Functional near-infrared spectroscopy is particularly attractive for this purpose because it is portable and suited to repeated bedside evaluation in fragile patients."

> **核心论点**：作者把“同一个数据集能被重分析出不同结论”当作**核心方法学警示**——这比任何单一阳性结果都更值得引用于汇报中。

## A3. Section 2 — 技术谱系与各自边界

> 本节以一张大表（Table）横向对比各模态：`Modality / Main Signal or Readout / What the Method Can Reveal / Main Clinical Advantage / Main Limitation`。表中要点：

1. **EEG 与事件相关电位** — 可揭示：residual auditory processing、command-following、ERP 成分；优势：bedside feasibility、high temporal resolution；局限：sensitive to artifacts、spatial resolution 低。
2. **结构 MRI** — 可揭示：white matter integrity、structural disconnection；优势：defines anatomical substrate；局限：indirect measure of function。
3. **静息态 fMRI** — 可揭示：default mode network、network integrity、covert awareness；优势：high spatial resolution；局限：limited bedside applicability。
4. **fNIRS** — 可揭示：cortical hemodynamic responses、residual awareness；优势：portable、repeatable、can be integrated with active paradigms；局限：limited cortical depth、susceptible to extracerebral/systemic confounds。
5. **BCI** — 可揭示：command-following、communication；优势：can convert neural activity into behavior/communication；局限：requires attention、training、and stable signal。
6. **自主神经指标**（HRV、baroreflex、skin conductance 等）— 可揭示：arousal regulation、autonomic engagement；优势：noninvasive、low burden；局限：**not a direct marker of awareness**。
7. **AI-assisted multimodal** — 可揭示：patient-level diagnostic/prognostic profiles；优势：can integrate heterogeneous data；局限：requires external validation（外部验证尚缺）。

> **核心论点**：这张表最适合作为汇报的“工具箱”页——每个模态都同时给出**能做什么**与**不能被误读成什么**，尤其是把自主神经指标和 AI 各自的边界写清楚。

## A4. Section 3 — BCI Across ABI and ND｜ABI 到 ND 的最强桥梁

1. "Brain–computer interfaces occupy a bridge position between acquired disorders of consciousness and neurodegenerative disease because they can test covert command-following when behavior is absent and support communication when motor output progressively fails."
   → BCI 的**双重角色**：诊断探针 + 通信通道。
2. "Within neurodegenerative disease, the most direct evidence comes from ALS and related severe motor impairment."
   → ALS 是证据最强的 ND 场景。
3. "Early P300 systems showed that paralyzed participants could use event-related responses to select commands on a screen, although performance was heterogeneous and depended on sustained attention and visual processing."
4. "Electrophysiological analysis also showed that people with severe ALS could achieve performance based on the P300 comparable to that of age-matched controls despite differences in ERP morphology associated with the disease, suggesting that classifier design may need to be adapted even when behavioral output remains usable."
   → **分类器需按疾病调整**，即便行为尚可用。
5. "Longitudinal home studies demonstrated that EEG systems can be deployed outside the laboratory and used independently for months by some patients with advanced ALS, with a technical complexity acceptable relative to the perceived benefit."
   → 家庭场景的长期可用性证据。
6. "A fully implanted cortical BCI enabled autonomous home communication in a locked-in patient with late-stage ALS, with reliable typing based on attempted movement and not on residual eye control."
   → 完全植入式、基于尝试动作而非眼控。
7. "The greatest translational value of BCI in ALS lies in preserving communication as disability progresses."
8. "In dementia, the role of BCI is less mature but still important. Direct communication restoration is usually not the primary goal because motor paralysis is not the dominant impairment in most patients. Instead, BCI is being explored to detect cognitive decline, track attentional engagement, and develop assessment tools that do not depend on motor output."
   → 痴呆场景的目标完全不同：**认知筛查与注意追踪**，而非通信。
9. "P300 measures have shown sensitivity to cognitive deterioration in Alzheimer's disease, with abnormalities linked to impaired language, memory, and executive function."
10. "In neurodegenerative disease, BCI may serve as a means of communication when conventional expression is impaired, and as a structured probe of attention, target selection, and goal maintenance."
11. "Initial neurofeedback studies using BCI training based on the P300 have shown short-term enhancement of ERP features associated with attention and improved behavioral performance after training, providing a mechanistic basis for future cognitive rehabilitation approaches..."
12. "BCI has also gained importance in the assessment of minimal consciousness and related states, where the central problem is not degeneration alone but the inability to translate preserved cognition into reliable behavior."
13. "Conceptual work in minimally conscious patients suggested that repeated BCI interaction might help preserve or reveal thinking directed toward a goal by restoring a contingency between covert intention and an external consequence."
    → **关键理论假说**：BCI 的“因果闭环”本身可能**恢复/保住**目标导向思维。
14. "A hybrid visual BCI combining P300 and steady-state visual evoked responses later detected awareness in a subset of patients with disorders of consciousness, including individuals without dependable bedside evidence of command following."
15. "Another study showed that an auditory P3-based BCI could identify the ability to follow commands in one minimally conscious patient who lacked a behavioral response at the bedside, illustrating the diagnostic value of BCI when standard bedside examination underestimates preserved cognition."
16. "A hybrid system combining P300 and steady-state visual evoked responses identified number processing and mental calculation in patients with disorders of consciousness, implying that some patients could engage in covert cognitive operations of a higher order, and not only orienting responses."
    → **从“能跟随指令”到“能做运算”**：高阶隐蔽认知。
17. "EEG studies of covert cognition also showed that active paradigms can reveal the ability to follow commands in patients whose bedside profile suggests more severe impairment, while simultaneously highlighting the variability and fragility of these signals across repeated testing."
18. "More recent audiovisual P300 studies found that BCI accuracy correlates with Coma Recovery Scale Revised scores and with later clinical improvement, which favors the interpretation that BCI metrics may carry prognostic as well as diagnostic information."
    → BCI 指标可能同时具备**诊断与预后**价值。
19. "First, BCI systems need to become more tolerant of sensory loss, fatigue, and limited learning capacity."
20. "Tactile and simplified paradigms, therefore, represent an important direction. A recent P300 approach combining electrical and vibration stimulation was specifically designed for users with lower learning ability or difficulty sustaining attention..."
    → 触觉范式 = 绕开视觉/注意瓶颈。
21. "Second, deployment in the home and remote calibration are likely to become standard design goals instead of optional refinements, because long-term usefulness depends more on daily reliability than on peak laboratory accuracy."
    → **一句可以直接用于汇报的判断**：日常可靠性 > 实验室峰值精度。
22. "Third, implanted and hybrid systems may increase the range of patients who can benefit when ocular control, scalp signal quality, or prolonged attention are insufficient for noninvasive platforms."
23. "Overall, BCI represents the strongest direct bridge between consciousness assessment and neurodegenerative disease, particularly in ALS, where the core clinical problem is not the absence of awareness but the loss of behavioral channels through which awareness and intention can be expressed."
    → 最精炼的一句总结。

> **核心论点**：BCI 是本文唯一被明确称为“**最强直接桥梁**”的技术；其价值在 ALS 中是通信，在 MCS 中是诊断探针，在痴呆中尚处于探索阶段——三者目标不同，不可混谈。

## A5. Section 4 — AI-Assisted Multimodal Integration｜融合、泛化与可解释性

1. "The importance of artificial intelligence in this field stems from the limitations of conventional clinical and visual assessment. Modern imaging and neurophysiological testing techniques provide multidimensional, high-resolution, and complex data that are beyond the scope of interpretation based on manual inspection."
2. "Machine learning and deep learning are more than tools for automation, but become methods for extracting latent structure from signals specific to modality."
   → AI 的定位：**提取潜结构**，而非自动看片。
3. **4.1 证据**：multimodal FDG-PET + EEG 改善诊断与预后；rsfMRI + 实验室参数支持结局预测；fNIRS 分类器在床边检测残余意识/CMD。
4. **4.2 泛化**："A key limitation for AI translation is that models may not generalize across etiologies."
5. "Models trained predominantly on acquired brain injury cohorts may perform well when tested on patients with similar mechanisms of injury, time from onset, structural disconnection, medication exposure, and recovery trajectories. However, they may not generalize to neurodegenerative disease, where pathology is progressive, regionally selective, and often accompanied by chronic cognitive decline, sensory impairment, sleep–wake disruption, dysautonomia, and variable cooperation."
6. "AI models intended for neurodegenerative applications therefore require separate validation, recalibration, or transfer-learning strategies in disease-specific cohorts. External validation across etiologies should be treated as a prerequisite before model outputs are used for clinical interpretation."
   → **外部验证是前置条件**，不是加分项。
7. "A cautious interpretation of these developments is that AI may support patient-level stratification instead of immediate personalized clinical decision-making."
8. "Their clinical value will depend on prospective testing, external validation, transparent model outputs, and evidence that model-guided assessment improves decisions beyond repeated behavioral examination and conventional neurophysiology."
   → **最关键的判据**：模型是否比“反复行为评估 + 常规神经生理”带来更好的决策。
9. "Overall, AI-assisted analysis should be viewed as a tool for structured integration of multimodal data and not as a clinically established system for personalized consciousness assessment."
10. "In the context of neurodegenerative disease, AI models should therefore be considered promising translational tools, not independent agents."
11. **4.3 特征稳健性**："The robustness of analysis supported by AI in consciousness assessment depends not only on classification accuracy, but also on the stability and interpretability of the features used as model inputs."
12. "information relevant to consciousness may be distributed across frequency bands, scalp regions, and changing connectivity patterns, not contained in one isolated marker."
    → **没有一个孤立标志物**——与 du Bois 的多指标融合思路一致。
13. "spectral features are vulnerable to sedation, state of sleep or wakefulness, artifacts, and nonspecific encephalopathy, whereas connectivity and nonlinear measures depend strongly on preprocessing, reference montage, recording length, and artifact control."
14. "Feature robustness should therefore be evaluated across cohorts, devices, and clinical states, not only within one development dataset."
15. "Active EEG and fNIRS paradigms may provide stronger evidence of intentionality compared with passive recordings, but they also carry a higher risk of false negative results when patients cannot understand instructions, sustain attention, perceive the stimulus, or maintain stable arousal."
    → **主动范式的双刃剑**：证据更强，但假阴性风险更高（与 Fischer 的批评完全一致）。
16. **三种融合方式**：
    - "In early fusion, features from different modalities are concatenated before model training... increasing vulnerability to missing data, scale imbalance, and overfitting."
    - "In late fusion, separate models are trained for each modality and their outputs are combined at the decision level, which may be more robust when modalities differ in temporal resolution, spatial resolution, signal quality, and availability."
    - "Intermediate fusion uses representations learned from each modality and combines them in a shared latent space... but it requires larger datasets than are usually available in DoC or advanced neurodegenerative disease."
    → 这一段是**做多模态 BCI 时的设计决策清单**。
17. "Feature importance can support clinical trust only when it can be translated into neurophysiological terms."
18. "Post hoc explanation methods such as SHAP values, permutation importance, or saliency maps are useful only when they identify physiologically plausible features, not recording artifacts, site effects, medication exposure, acquisition protocol, or other confounders."
    → **可解释性的陷阱**：显著特征可能是伪迹或中心效应。
19. "A distinction is required between offline classification and online bedside operation. Many AI models in this field are trained and evaluated offline, after artifact correction, feature extraction, parameter tuning, and cross-validation. This setting is important for biomarker discovery and retrospective prognosis, but it does not guarantee that the model [will work online]."
    → **离线 vs 在线**的区分是本文反复强调的落地点。

> **核心论点**：AI 在这条链路上目前只能承担“**结构化整合与分层**”，不能承担“独立决策”；其可信度取决于特征是否可被翻译成神经生理语言，以及是否通过跨中心/跨病因的外部验证。

## A6. Section 5 — Autonomic Measures｜明确限定的辅助角色

1. "Autonomic measures are not direct markers of consciousness, but they may provide auxiliary physiological context for interpreting arousal and engagement during multimodal assessment."
   → **开门见山的边界声明**。
2. "Heart rate variability, indices based on entropy, and baroreflex sensitivity reflect cardiovascular regulation and its interaction with central autonomic networks, but they are strongly influenced by cardiovascular disease, medication, circadian variation, and recording conditions."
3. "HRV measures have differed between unresponsive wakefulness syndrome and minimally conscious state, and the addition of HRV descriptors to EEG features has improved classification in selected cohorts."
4. "Indices of HRV complexity have also been associated with CRS-R scores and with resting-state fMRI connectivity within the central autonomic network."
5. "However, the interpretation remains indirect. A change in HRV may reflect preserved network integrity, emotional or sensory responsiveness, cardiovascular instability, medication effects, nonspecific arousal, or recording conditions instead of subjective awareness."
   → **六种替代解释**——这段可以直接引用来说明“为什么生理指标不能等同意识”。
6. "Electrocardiographic monitoring over 24 h has shown that patients with disorders of consciousness can retain day–night variation in heart rate and selected HRV measures, although these rhythms may be altered and less differentiated across diagnostic groups."
7. "Such observations are clinically useful because they caution against interpreting a single brief recording as representative of the patient's overall state."
8. "Repeated autonomic sampling may help identify periods of greater physiological stability or arousal, during which active EEG, fNIRS, or BCI paradigms may be more interpretable. This does not make autonomic monitoring a consciousness test. Instead, it may help define the conditions under which other tests should be performed."
   → **最实用的定位**：自主神经指标用来**选时机**，不用来判定意识。
9. "Autonomic measures have also been explored as prognostic markers in disorders of consciousness... These studies are promising, but their clinical meaning remains limited by cohort size, heterogeneity, and the need for independent validation."
10. "These findings do not establish autonomic measures as biomarkers of consciousness. They indicate instead that autonomic dysfunction may shape the clinical context in which cognition, attention, communication, and responsiveness are assessed."

> **核心论点**：把 HRV 等指标定位为“**评估时机的选择器**”而非“意识标志物”，是本文对多模态评估体系的一个具体而克制的贡献。

## A7. Section 6 — Future Directions｜从“加标志物”到“学会一起读”

1. "The field is now approaching a point at which adding isolated biomarkers may be less useful than learning how to read existing signals together."
   → **本节乃至全文的题眼**。
2. "impaired consciousness should be understood as a disturbance of distributed systems, not as a failure of one measurable signal."
3. "A patient may be awake but inattentive, physiologically unstable, fatigued, unable to produce a motor response, or briefly more responsive than at the time of examination. Repeated assessment is not a methodological luxury, but a way of separating a transient state from a reproducible clinical pattern."
   → **重复评估不是奢侈，而是分离瞬态与稳定的必要手段**。
4. "Instead of treating EEG, fMRI, fNIRS, and BCI paradigms as separate tests, the figure presents them as complementary sources of information that may be integrated computationally to support patient-level assessment, prognosis, and treatment planning, with autonomic measures considered only as optional physiological context."
5. "The intended output is not a single universal biomarker, but a structured patient-level profile that may guide diagnosis, recovery prediction, selection of optimal assessment windows, longitudinal tracking, BCI-based communication, and selection of candidates for future neuromodulation or rehabilitation studies."
   → **输出形态**：个体化档案，而不是通用标志物。
6. "Artificial intelligence will face the same test. Many models perform well in the datasets in which they were developed, but clinical relevance begins only when they remain reliable outside those conditions."
7. "Artificial intelligence may support diagnosis and prognosis in disorders of consciousness, but only if model outputs are interpretable, externally validated, and robust to heterogeneous clinical data."
8. "Advanced dementia may make awareness difficult to assess because cognition, attention, arousal, and behavioral expression deteriorate together. Late-stage motor neuron disease poses a different problem. Intention may be preserved, but the channels through which intention is expressed can disappear."
   → **两种 ND 的对照**：痴呆是“内部退化”，ALS 是“通道消失”。
9. "BCI research should now move away from short demonstrations of feasibility as the main benchmark of success. The more difficult question is whether these systems can work when patients are tired, slow to respond, visually or auditorily impaired, medically fragile, or living outside a specialist research environment."
   → **对 BCI 领域最直接的批评**：别再以短时可行性演示作为主要成功标准。
10. "For patients with late-stage ALS, medical usefulness will depend on reliability, comfort, ethical acceptability, and sustained function in daily life."
11. "Evidence that an implantable BCI can remain functional over several years is particularly important, because it shifts attention from proof of concept to durability."
12. "In advanced ALS and related conditions, BCI may have a dual role: it may support communication, but it may also offer a structured way to test for preserved intention when conventional behavioral responses have disappeared."
13. "More intensive monitoring is not automatically better care. A useful assessment pathway is one that improves diagnosis, prognosis, or treatment decisions without creating excessive burden for the patient or the clinical team."
    → **负担也是指标**：更密集的监测未必是更好的照护。

> **核心论点**：本领域的下一步不是发明新标志物，而是**把已有信号整合成个体化档案**，并以“可靠、舒适、可持续、可负担”而非“实验室峰值”作为成功标准。

## A8. Section 7 — Limitations｜作者自陈

1. "the evidence base is intentionally translational and not etiologically uniform."
2. "Although this evidence is highly relevant to the general problem of dissociation between preserved inner processing and impaired outward expression, it cannot be transferred directly to Alzheimer's disease, Lewy body dementia, Parkinsonian syndromes, amyotrophic lateral sclerosis, or other neurodegenerative conditions."
   → 反复强调的可迁移性限制。
3. "Neurodegenerative disorders differ in disease tempo, anatomical selectivity, cognitive profile, motor involvement, autonomic burden, and fluctuation of arousal. The conclusions of this review therefore concern methodological adaptation and future validation, not clinical interchangeability between brain injury and neurodegeneration."
   → **一句话限定全文**：是方法学适配，不是临床等价。
4. "Second, the available evidence is uneven across modalities. EEG, fMRI, and BCI studies have provided an important proof of principle..., whereas fNIRS and autonomic measures are still at an earlier stage of clinical validation in many contexts."
5. "The evidence for communication through BCI is strongest in amyotrophic lateral sclerosis. Meanwhile, the role of BCI in dementia is still mainly exploratory."
6. "It should not be assumed that a method validated in one diagnostic group will have the same performance, tolerability, or interpretability in another."
7. "Third, many studies rely on small samples, single-center cohorts, heterogeneous inclusion criteria, and variable preprocessing or classification pipelines."
8. "High performance within a development cohort may not translate into robust clinical performance across hospitals, devices, recording protocols, disease etiologies, or levels of medical complexity."
9. "External validation, transparent reporting, interpretable model outputs, and prospective testing will be necessary before such approaches can be treated as clinical decision tools."
   → **四项落地前提**。
10. "Finally, physiological signals should not be interpreted as direct equivalents of consciousness, because none of these measures alone proves subjective awareness, intentionality, or communicative competence."
11. "Their clinical value is strongest when they converge with repeated behavioral assessment, longitudinal trends, and a plausible neurobiological interpretation."
    → **三重合流判据**：重复行为评估 + 纵向趋势 + 可解释的神经生物学机制。
12. "Only English-language publications were considered, which may introduce language bias."
13. "The literature is also vulnerable to publication bias, because positive findings, successful classification models, and technically feasible BCI or AI systems are more likely to be reported than negative or unsuccessful attempts."
    → **发表偏倚**：阴性 BCI 结果几乎不发表——读这一领域时的重要提醒。
14. "some degree of author judgment is unavoidable in a narrative review. This limitation was addressed by separating evidence levels, adding an evidence map, and including a targeted critical appraisal of representative studies instead of using the review to support equivalence claims across etiologies."
    → 作者自述用**证据分级 + 证据地图 + 代表性研究批判性评价**来弥补叙述性综述的局限。

> **核心论点**：本文的可信度恰恰来自它反复声明“不能外推”；引用它时应把它当作**方法学地图**，而不是“某技术已在某病中有效”的证据来源。

## A9. Section 8 — Conclusions｜收束

1. "Research in acquired disorders of consciousness has shown that behavior alone can be an insufficient proxy for awareness, when motor output, arousal, attention, or cooperation is compromised, and this principle is increasingly relevant to selected neurodegenerative conditions."
2. "The strongest direct neurodegenerative application is currently found in ALS and related severe motor impairment, whereas applications in dementia and Parkinsonian syndromes remain more exploratory and require validation in each disease context."
3. "The reviewed evidence indicates that residual awareness, intentionality, and cognitive engagement may persist in selected patients despite profoundly limited outward responsiveness."
4. "A clinically useful assessment model should therefore combine bedside examination with targeted physiological measures instead of treating these approaches as separate domains."
   → **核心结论**：不是替代，而是**合并**。
5. "The next step for the field is to convert multimodal evidence into reliable diagnostic and prognostic decisions that improve communication, care planning, and therapeutic selection."

> **核心论点**：全文落点是**决策**——多模态证据只有转化为更好的沟通方案、照护计划与治疗选择，才算真正完成转化。
