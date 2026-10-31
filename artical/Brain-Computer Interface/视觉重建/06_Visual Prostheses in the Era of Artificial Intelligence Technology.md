---
tags:
  - 视觉重建
  - Eye-and-Brain
  - 人工视觉
  - 人工智能
  - 显著性提取
  - 系统综述
年份: 2025
摘要: 背景：过去几十年间，技术进步已使侵入式视觉假体从理论概念变为实际应用。然而功能结局仍然有限，尤其在视锐度方面。本综述旨在总结视网膜与皮层假体（RCPs）的当前进展，并批判性评估人工智能（AI）在推进这些系统中的作用。目的：描述当前 RCPs，并对旨在改善临床结局的图像与信号处理算法进行系统综述。患者与方法：我们对与 AI 服务于假体视觉的相关文献进行了系统综述，主要使用 PubMed，并辅以专门用于文献检索的 AI 研究助手 Elicit。在 PubMed 上共筛查 455 项研究，其中 23 项被纳入。另有 5 项研究通过 Elicit 识别并纳入。结果：对当前 RCPs 的分析揭示出多种局限，影响现有人工视觉所提供视觉流的质量。事实上，纳入综述的 28 项 AI 研究覆盖了 RCPs 的两类应用：从相机拍摄图像中提取显著性，以及电刺激与所感知光幻视之间的一致性。28 项研究中共有 14 项使用了人工神经网络，其中 12 项包含模型训练。有 7 项研究使用视觉假体数据进行了评估，其中 1 项在人类 RCP 受试者中进行了前瞻性评估。28 项研究中有 22 项使用来自人类或动物的经验数据进行了验证。在这些研究中，有 15 项使用模拟假体视觉进行验证。最后，在使用数学光幻视感知模型的 22 项研究中，14 项使用了对称的过度简化建模。结论：AI 算法在优化假体视觉方面展现出前景，尤其是在增强图像显著性提取与刺激策略方面。然而，当前大多数研究基于仿真。进一步的开发与真实环境验证，尤其是通过盲人患者的临床测试，对于评估其真实有效性至关重要。关键词：失明、视力障碍、视力恢复、人工智能、康复。
---
# 精读报告 06：Visual Prostheses in the Era of Artificial Intelligence Technology

## 1. 文献信息

- **题目**：Visual Prostheses in the Era of Artificial Intelligence Technology
- **作者**：Ilias Sarbout, Ayse Gungor, Mehdi Ounissi, et al.
- **期刊**：*Eye and Brain*
- **年份**：2025
- **DOI**：10.2147/EB.S524322
- **研究类型**：系统综述（文献检索 + AI 辅助检索）
- **核心关键词**：retinal and cortical prostheses, saliency extraction, phosphene consistency, simulated prosthetic vision, systematic review

## 2. 核心观点（本文主张什么）

本文的主张不是"AI 很有用"，而是一个更严格的判断：

> **AI 在假体视觉中的研究，绝大多数停留在仿真与模型层面；真正用人体假体数据验证的只有极少数，而这正是该领域最薄弱的一环。**

## 3. 检索与纳入

| 步骤 | 数量 |
| --- | --- |
| PubMed 筛查 | 455 项 |
| PubMed 纳入 | 23 项 |
| 经 Elicit 补充 | 5 项 |
| **最终纳入分析** | **28 项** |

## 4. 证据构成的量化分析（本文最有价值的部分）

```text
应用方向：
  ① 从相机图像提取显著性（决定"传什么给用户"）
  ② 电刺激与所感知光幻视之间的一致性（决定"怎么刺激"）

方法构成：
  使用人工神经网络（ANN）：14/28
    其中包含模型训练：12/14

验证强度：
  使用视觉假体数据评估：7/28
    其中在人类 RCP 受试者中前瞻性评估：1/28
  使用人类或动物经验数据验证：22/28
    其中使用"模拟假体视觉"验证：15/28

光幻视建模质量：
  使用数学光幻视模型的：22/28
    其中采用"对称、过度简化"建模的：14/22
```

> 三组数字放在一起读，结论非常清楚：**AI 方法用得不少（14/28 用 ANN），但真实验证极少（人体前瞻性 1/28），而基础的光幻视模型本身仍有一半以上是过度简化的对称模型（14/22）。**

## 5. 传统假体视觉的三个硬约束

综述在引言中给出了当前 RCP 的能力边界：

1. **能准确诱发的光幻视数量只有几百个**（"limited to just a few hundred"），远不足以支撑阅读或导航。
2. **长时间刺激会导致脱敏**，光幻视模式难以保持一致。
3. **现有 RCP 提供的视锐度不足以支持在真实世界中导航**。

另据本文引用的流行病学数据：失明目前影响约 **4,300 万人**，预计到 **2050 年增至 1.15 亿**。

## 6. 为什么这篇要放在视觉合集的最后

前 5 篇分别代表五条技术线（视网膜下电刺激、脉络膜上电刺激、皮层双向、光声、皮层算法），本文提供的是**评价标尺**：

```text
读笔记 01（PRIMA 38 例）    → 属"少数走完人体临床终点"的例外
读笔记 02（2 例人体双向）   → 属"人体前瞻验证"稀缺证据之一
读笔记 03（4 例 2.7 年）    → 长期功能结局的少数来源
读笔记 04（光声，动物）     → 典型的前临床阶段
读笔记 05（MindSight，仿真）→ 正对应本文指出的"仿真为主"问题
```

## 7. 最大的科学难题

> **假体视觉的"图像 → 光幻视"映射既不确定也不稳定，而研究界用于替代它的仿真模型大多过度简化。**

这构成一个闭环困境：因为患者极少（可用的假体受试者数量少），难以收集大规模真实配对数据；因为缺少真实数据，算法只能依赖仿真；因为仿真过于简化，算法在真实场景中的效果无法预期。综述明确指出"real-world deployment of these methods remains impeded by the tiny pool of recipients with functioning prosthetic vision and incomplete modeling of the image-to-phosphenes flow"。

## 8. 对实验设计的启示

1. **任何新算法都应报告验证层级**：仿真 / 动物 / 假体数据 / 人体前瞻——本文给出了四级分类标准，可作为报告规范。
2. **光幻视模型需要个体化与非对称化**：14/22 使用对称简化模型是一个可立即改进的点。
3. **动态视觉被系统性忽略**：28 项研究中只有 12 项包含动态视觉方面，16 项只考虑静态图像或测量。
4. **显著性提取与刺激优化应联合评估**：二者分别影响"传什么"和"怎么传"，分开优化可能互相抵消。

## 9. 真正的创新点

它没有提出新算法，而是**把"AI + 视觉假体"这一模糊标签拆成了可核查的维度**（应用方向、方法类型、验证层级、模型质量），并用量化分布指出薄弱环节。对准备进入该方向的研究者而言，这是一份"该往哪里做"的清单。

## 10. 局限

- 系统综述但检索以 PubMed 为主（辅以 Elicit），可能遗漏工程类会议文献（如 IEEE 系列），而 AI 算法研究高度集中在这些渠道。
- 28 项纳入研究的异质性大，未做定量合并（meta 分析）。
- 未对纳入研究做偏倚风险评估（如样本量、盲法）。
- "对称过度简化模型"的判断标准未完全公开，复核困难。
- 作为 2025 年的综述，2026 年的新工作（如本合集的 PRIMA NEJM 结果）未纳入。

## 11. 汇报结论

> 视觉假体领域的 AI 研究不缺算法，缺的是真实验证：28 项研究中只有 1 项在人类假体受试者中做了前瞻性评估，而一半以上的光幻视模型仍是过度简化的对称模型。

## 12. 参考来源

Sarbout I, Gungor A, Ounissi M, et al. *Eye and Brain.* 2025. DOI: 10.2147/EB.S524322.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句）+ **核心论点**（中文一句话）。
> 原文文件：`FullText/06_Visual Prostheses in the Era of Artificial Intelligence Technology.fulltext.xml`（Europe PMC 收录的 **JATS 全文**）。
> ⚠️ 版本提示：本笔记基于结构化全文，页码请核对期刊正式版。

## A1. Abstract｜检索与构成

1. "A total of 455 studies were screened on PubMed, of which 23 were retained for inclusion."
   → 检索规模与纳入规模同时给出，便于判断筛选强度。
2. "The analysis of current RCPs highlights various limitations affecting the quality of the visual flow provided by current artificial vision."
   → 结论的落点是"视觉流质量"，即信息带宽问题。
3. "Indeed, the 28 reviewed studies on AI covered two applications for RCPs including extraction of saliency in camera captured images, and consistency between electrical stimulation and perceived phosphenes."
   → 两类应用定义了该领域的研究版图。
4. "A total of 14 out of 28 studies involved the use of artificial neural networks, of which 12 included model training."
   → AI 方法的使用比例，但需与验证层级一起读。
5. "Evaluation with data from a visual prosthesis was conducted in 7 studies, including 1 that was prospectively assessed with a human RCP."
   → **本文最有力的一个数字**：人体前瞻性评估仅 1/28。
6. "Finally, out of 22 studies leveraging a mathematical model for phosphenes perception, 14 used a symmetrical oversimplified modeling."
   → 基础模型本身就过度简化，是比"验证不足"更根本的问题。

> **核心论点**：该领域的 AI 研究在方法上活跃，但在验证与基础建模上严重不足。

## A2. Introduction｜假体的能力边界

1. "Blindness currently affects around 43 million people worldwide, a number which is expected to increase to 115 million by 2050."
   → 需求规模与增长趋势，是投入该方向的宏观理由。
2. "Various RCPs have enabled blind individuals to perform simple visual tasks. However, present RCPs technology does not deliver sufficient visual acuity to navigate in the world."
   → 现有能力与需求之间的差距被明确陈述。
3. "Notably, the number of phosphenes that can be accurately elicited is limited to just a few hundred. Also, due to desensitization, it is challenging to maintain consistent phosphene patterns during prolonged neural stimulation."
   → 两个硬约束：光幻视数量上限与长时间刺激的脱敏。

> **核心论点**：硬件层面的光幻视数量与稳定性限制，是算法优化的前提条件而非可绕过的问题。

## A3. Studies on Phosphenes Perception Optimization｜不确定性的来源

1. "Even with state-of-the-art phosphene modeling, prediction of shapes, location, and brightness of phosphenes remains challenging due to intra-patient variability in neural responses arising from cortical stimulation."
   → 个体内变异是预测困难的根源。
2. "A first study used previously measured visual percepts as a dictionary to optimize image recognition and then evaluate them under simulated prosthetic vision settings using AI. However, such an approach is valid only when the phosphenes can be elicited in a consistent manner, without drifting or intensity changes."
   → 指出该类方法的隐含前提（光幻视稳定），而该前提在临床中并不总是成立。

> **核心论点**：把光幻视视为稳定字典的方法，其有效性被脱敏与漂移现象直接削弱。

## A4. Methodology and Validation｜验证层级的分布

1. "AI approaches focus on the optimization of electrical stimulation protocols, which are often evaluated using simulated prosthetic vision (15 studies)."
   → 主要的评估手段是仿真，而非真实患者。
2. "Also, 12 out of 28 studies have included dynamic aspects of vision, meaning that 16 out of 28 studies considered only static measurements or images in their methodology."
   → 动态视觉被系统性忽略，与真实导航需求不匹配。
3. "It has been suggested that sighted individuals build mechanisms of internal visual representations through a tradeoff between spatial complexity and temporally increased complexity."
   → 该引述提示：时间维度的信息可能以牺牲空间复杂度为代价换取，这对假体的信息编码策略有直接启发。

> **核心论点**：当前研究的验证环境（静态、仿真）与真实使用条件（动态、真实场景）之间存在系统性错位。

## A5. Discussion and Perspectives｜为什么难以落地

1. "However, at present, real-world deployment of these methods remains impeded by the tiny pool of recipients with functioning prosthetic vision and incomplete modeling of the image-to-phosphenes flow."
   → **一句话点出困境的两端**：受试者池极小 + 图像到光幻视的建模不完整。
2. "Yet, most advances have been demonstrated only in simulated vision with just a few investigations carried out on data from animals or humans."
   → 与摘要形成呼应，是全文的核心判断。

> **核心论点**：受试者稀缺与模型不完整互为因果，构成该领域难以自我强化的闭环困境。
