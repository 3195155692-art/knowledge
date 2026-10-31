---
tags:
  - 脑机接口
  - Nature-Medicine
  - 运动重建
  - 脑脊髓接口
  - 皮层微刺激
  - BCI
  - SCI
年份: 2026
摘要: 全球有数百万人因脊髓损伤、卒中等神经系统疾病而生活在运动与感觉障碍之中。在此，我们报告一种"双重神经旁路"（double neural bypass, DNB）——一套混合神经假体系统，旨在严重完全性脊髓损伤后同时恢复即时的与持久的感觉运动功能。DNB 将皮层内脑机接口与针对脊髓和皮层的定向、模式化神经调控连接起来。这使与运动意图相关的脑信号能够实时直接控制使用者自身手部的运动，同时促进长期的感知运动恢复——即使在系统关闭之后也是如此。DNB 系统使用循环人工神经网络与强化学习实现精细抓握控制，并结合模式化脊髓刺激与由活动信息驱动的皮层内微刺激（"皮层镜像"）来促进神经可塑性与持久的功能恢复。在一名慢性 C4 感觉/C5 运动完全性四肢瘫参与者中，这种混合方法恢复了包括自主进食与精细物体操作在内的功能能力，同时产生了显著且持久的肘屈曲与腕部触觉改善。这些发现表明，把感知运动神经假体与针对脑与脊髓的靶向神经调控相结合，有潜力在严重瘫痪中恢复具有临床意义的功能。
---
# 精读报告 01：A neuroprosthesis for restoring hand movement and sensation in a person with complete tetraplegia

## 1. 文献信息

- **题目**：A neuroprosthesis for restoring hand movement and sensation in a person with complete tetraplegia
- **作者**：Santosh Chandrasekaran, Sarah K. Wandelt, Aniket Jangam, et al.（Feinstein Institutes / Battelle / Northwell 等）
- **期刊**：*Nature Medicine*
- **年份**：2026
- **DOI**：10.1038/s41591-026-04498-0
- **研究类型**：单例、混合干预（BCI + 脊髓刺激 + 皮层微刺激）临床研究
- **核心关键词**：double neural bypass, intracortical BCI, spinal cord stimulation, cortical microstimulation, cortical mirroring, tetraplegia

## 2. 一句话结论

在一名慢性 C4 感觉/C5 运动完全性四肢瘫患者中，**皮层内 BCI + 模式化脊髓刺激 + 皮层内微刺激（"皮层镜像"）** 组成的双重神经旁路，不仅让患者实时用自身手完成自主进食与精细抓握，还产生了**在关机后仍持续存在**的肘屈曲与腕部触觉改善——这是"神经假体即治疗"（替代 + 修复）第一次在同一系统内同时被验证。

## 3. 为什么这篇文章重要

运动 BCI 的主流叙事是"替代"：把脑信号接到外部设备或肌肉上，绕开损伤。而脊髓损伤康复的叙事是"修复"：靠刺激与训练促进可塑性。本文把两条线合成一条闭环：

```text
立刻替代：运动意图 → 神经解码 → 肌电/脊髓刺激 → 自身手部动作
长期修复：模式化脊髓刺激 + 与意图同步的皮层微刺激（cortical mirroring）
          → 促进可塑性 → 关机后仍保留功能增益
```

如果这一步能够被复制，"BCI 只是一副外接装置"的看法就需要修正：它也可能是**一种神经康复干预**。

## 4. 受试者与信号

- **受试者**：男性，入组时 42 岁，2020 年跳水事故导致双侧 C4 感觉/C5 运动 ASIA A 级完全性脊髓损伤；属于最严重的损伤类别（运动与感觉均完全丧失）。
- **植入**：皮层内 BCI 阵列（M1 等区域），手术计划使用 3 T MRI 规划；同时植入脊髓刺激电极。
- **研究节律**：每周 1–3 次实验访问，长期随访。
- **关键任务**：抓握与精细操作（自主进食、脆弱物体操作）、视觉遮蔽下的触觉定位测试、以及肘屈曲与腕部触觉的随访量化。

## 5. 技术路线

```text
运动意图（M1 皮层内阵列）
   ↓ 循环神经网络（稳定解码运动意图）
   ↓ 深度强化学习（力稳定 / 精细抓握）
脊髓模式化刺激 ──→ 手部肌肉（自身手运动）
   ↑ 同步触发
皮层内微刺激（S1，"cortical mirroring"）──→ 触觉反馈
   ↓
长期可塑性 → 关机后仍保留的肘屈曲与腕部触觉改善
```

## 6. 主要结果

- **功能恢复**：恢复自主进食与精细物体操作能力（例如需要感知是否夹稳脆弱物体的任务）。
- **关闭系统后仍然有效**：肘屈曲与腕部触觉产生显著且**持久**的改善。
- **感觉闭环生效**：在视觉遮蔽条件下，使用 S1 皮层内微刺激提供触觉反馈时，患者成功率提高（论文报告 100% 对机会水平），且患者只有在"感觉夹住了蛋壳"时才抬臂。
- **随访时长**：感觉/力量增益在停止刺激后的随访期内持续超过 2 个月。

## 7. 这是不是证明"完全性脊髓损伤可以被治愈"？

不是，而且界限相当严格：

```text
单例（n = 1）、开放标签、非随机      → 无法排除训练效应、安慰剂效应与自然恢复
干预是"组合拳"                       → 无法拆分 BCI、SCS、皮层微刺激各自的贡献
完全性损伤（ASIA A）却出现增益        → 与"完全性损伤无残余通路"的经典假设张力较大，
                                       作者的解释是 SCS 改变了残余上运动源的可招募阈值
随访仅 >2 个月                       → 长期（年）稳定性未知
```

作者自己在讨论中写明：既往证据显示 SCS 带来的功能恢复"局限于仍有部分残余自主控制的肌肉"，这提示**损伤严重程度仍是效果上限的决定因素**。

## 8. 与神经外科的直接关系

- **一次手术、两套靶点**：皮层阵列 + 脊髓刺激电极的组合意味着手术规划、麻醉与术后程控都要同时覆盖两个系统，本文提供了可行性证据与 MRI 规划流程。
- **"皮层镜像"是一个可迁移的技术概念**：把意图解码的时间点同步到皮层微刺激，使感觉反馈与运动意图配对——同一逻辑可用于卒中后康复与幻肢痛干预。
- **对完全性损伤患者的意义**：这是当前最可能改变"不可逆"叙述的人群，但也最需要严格的对照设计来支撑结论。

## 9. 文章的主要优势

1. 同时证明"即时替代"与"持久修复"，跳出了既往 BCI 只做替代的框架。
2. 感觉反馈被真正闭环：皮层内微刺激不只被报告为"有感觉"，而是影响了行为成功率。
3. 报告了随访期内关机后的持续增益，这是康复类终点中最有说服力的一类。

## 10. 局限

- 单例、开放标签，无法拆分三种干预成分的贡献，也无法排除自然恢复与训练效应。
- 增益集中在肘屈曲与腕部触觉，未证明手部精细功能的全面恢复。
- 系统复杂（皮层阵列 + 脊髓电极 + 强化学习控制器），设备负担与维护成本高，可扩展性未知。
- 随访时间有限（>2 个月），长期稳定性与电极寿命未评估。

## 11. 对研究的启示

1. **终点设计应从"任务成功"转向"关机后仍存在的增益"**——这是区分替代与修复的关键指标。
2. 若要在国内开展，建议采用"分阶段拆解"设计（先 SCS，后加皮层刺激），以应对"组合干预无法归因"的质疑。
3. 感觉闭环的行为学验证（视觉遮蔽 + 成功率）可作为可复用的评测范式。

## 12. 汇报时建议强调

> 这篇文章把运动 BCI 的目标从"接上外部装置"改写成"让神经系统自己修一点回来"；组合干预的代价是无法归因，收益是功能与随访双改善。

## 13. 参考来源

Chandrasekaran S, Wandelt SK, Jangam A, et al. *Nature Medicine.* 2026. DOI: 10.1038/s41591-026-04498-0.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句）+ **核心论点**（中文一句话）。
> 原文文件：`PDFs/01_A neuroprosthesis for restoring hand movement and sensation in a person with complete tetraplegia.pdf`（出版社正式版，31 页，含补充信息）。

## A1. Abstract｜系统构成与结论

1. "The DNB links an intracortical brain-computer interface with targeted and patterned neuromodulation of the spinal cord and cortex."
   → 系统定义的三个组件：皮层解码 + 脊髓刺激 + 皮层刺激，缺一不可。
2. "This allows brain signals associated with movement intention to directly control the movement of the user’s own hand in real time while also promoting long-term sensorimotor recovery-even after the system is turned off."
   → "even after the system is turned off" 是本文最关键的一句：终点从"在线功能"扩展到"离线残留增益"。
3. "The DNB system uses recurrent artificial neural networks and reinforcement learning for fine grasp control, together with patterned spinal cord stimulation and activity-informed intracortical microstimulation (‘cortical mirroring’) to promote neuroplasticity and durable recovery of function."
   → 强化学习用于力稳定，皮层微刺激与意图同步——这是"皮层镜像"的完整定义。
4. "In a participant with chronic C4 sensory/C5 motor complete tetraplegia, this hybrid approach enabled recovery of functional abilities including self-feeding and manipulation of delicate objects, while also producing significant and persistent improvements in elbow flexion and wrist tactile sensation."
   → 结果的两层结构：功能任务（自主进食）+ 损伤层面指标（肘屈曲、腕部触觉）。

> **核心论点**：把运动假体与神经调控合并的目的不是提高在线性能，而是让功能增益在关机后仍然存在。

## A2. Results｜感觉闭环如何改变行为

1. "Visually blinded in both cases, the participant achieved a higher success rate (100% versus chance-level success without feedback) when the S1-ICMS-based somatosensory feedback was used, only lifting his arm when he felt he had the eggshell in his grasp (Fig. 4d)."
   → 感觉反馈的价值用"行为决策改变"来证明，而不是只用主观报告。

> **核心论点**：皮层微刺激提供的感觉不只是"有感知"，而是被真正纳入了运动决策回路。

## A3. Discussion｜为什么有效，以及边界在哪

1. "Our work and those by others have shown that functional recovery following SCS is restricted to muscles that show some level of residual volitional control16,25,26."
   → **作者自己承认的限制**：SCS 的效果受残余自主控制约束。
2. "Recent work suggests that tonic SCS renders residual supraspinal input functionally effective by altering motor recruitment thresholds, in a manner constrained by lesion severity27."
   → 机制解释：SCS 并未重建通路，而是下调了残余通路的招募阈值。
3. "Inspired by the distributed neural network architecture in primates30, we developed a nested control architecture combining a highly stable recurrent neural network for motor intent decoding and deep RL for force stabilization to allow the participant to perform precision-grasping tasks with high success."
   → 控制架构借鉴灵长类分布式网络：意图与力控制分层处理。
4. "This intervention enabled the participant, with impaired sensation in his right wrist, to detect significantly lower force levels, gains that persisted for more than 2 months even after cessation of stimulation in a follow-up period."
   → 量化随访：停止刺激后 >2 个月仍保留的力觉阈值改善。

> **核心论点**：当前机制解释是"阈值的可逆调制 + 训练诱导的可塑性"，而不是"通路再生"，因此疗效边界由损伤严重程度决定。

## A4. Methods｜受试者与任务定义

1. "The participant (male, 42-years old at study enrollment) sustained a bilateral C4 sensory/C5 motor American Spinal Injury Association (ASIA) Impairment Scale A SCI following a diving accident in 2020."
   → 最严重类别（ASIA A）的慢性期患者，使结果不具备"部分保留功能"的解释空间。
2. "Surgical planning was performed using a 3 T magnetic resonance imaging (MRI) scanner followed by implantation of an iBCI, and the study participant attended experimental sessions one to three times per week."
   → 手术规划与随访节律的具体设定，可直接作为方案参考。
3. "The participant, while blindfolded, reported the perceived location of three 1.5-s taps per filament applied in descending order of effective force (filament thickness) to randomized hand/wrist locations with no intervening washout periods."
   → 触觉评估的严格条件（遮蔽、随机位置、无洗脱期）使结果更难被"猜测"解释。

> **核心论点**：单例研究的说服力来自受试者的极端表型与严格的评估条件，而不是样本量。
