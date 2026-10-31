---
tags:
  - 脑机接口
  - Nature-Communications
  - 音量解码
  - 语音模式
  - 腹侧前中央回
  - BCI
年份: 2026
摘要: 改变说话模式与音量的能力，是人类嗓音交流表达范围的重要组成部分。然而，这些行为在腹侧前中央回（vPCG）中的编码尚未在神经元放电率的分辨率上被研究过。我们在一项语音神经假体临床试验中，对两名在 vPCG 植入皮层内微电极阵列的参与者进行了研究。vPCG 的神经元放电率随尝试的默做口型、耳语、正常或大声说话而强烈调制。在神经群体层面，模式/音量与音素内容被编码在不同的神经子空间中。两名参与者尝试的模式/音量可从 vPCG 被解码，准确率分别为 94% 与 89%，相应的神经准备性活动分别出现在发声起始前 640 ms 与 270 ms，其解码准确率达到 80%。随后我们开发了一个闭环音量解码器，在依据尝试音量调节脑到文本语音神经假体输出时，取得了 94% 的在线准确率。这些发现证明了从 vPCG 解码模式与音量的可行性，为能够合成更具表现力语音的语音神经假体铺平了道路。
---
# 精读报告 06：Encoding of speech modes and loudness in ventral precentral gyrus

## 1. 文献信息

- **题目**：Encoding of speech modes and loudness in ventral precentral gyrus
- **作者**：Aparna Srinivasan, Maitreyee Wairagkar, Carrina Iacobacci, et al.（UC Davis / BrainGate2）
- **期刊**：*Nature Communications*
- **年份/卷期**：2026; 17: 5301
- **DOI**：10.1038/s41467-026-71284-4
- **研究类型**：两受试者皮层内电生理 + 闭环解码验证
- **核心关键词**：speech mode, loudness, ventral precentral gyrus, preparatory activity, neural subspace, closed-loop decoding

## 2. 一句话结论

在两名皮层内阵列受试者（T15、T16）中，**说话模式与音量在腹侧前中央回的单个神经元放电率层面被强烈编码**，且与音素内容处在**不同的神经子空间**；尝试音量可以被解码（94% 与 89%），而且**发声前 640 ms / 270 ms 就能达到 80% 的准确率**，据此实现的闭环音量解码器在线准确率 94%。这为"脑到文本"输出加上了第一层可用的副语言维度（大小写/强调）。

## 3. 核心问题

语音 BCI 已能输出正确的词，但输出的词"没有语气"。要恢复表达力，必须先回答一个基础问题：

```text
说话方式（默做口型 / 耳语 / 正常 / 大声）与音量，
在运动皮层的放电率层面是否有可分离、可提前读取的编码？
```

此前只有 fMRI 层面的证据（前中央回随说话类型调制），本文把分辨率推进到**单个神经元放电率**，并追问其是否与音素编码共享子空间。

## 4. 受试者与信号

- **受试者**：T15 与 T16（BrainGate2 参与者；T15 与 Card 2026、Wairagkar 2025、Kunz 2025 为同一人）。
- **植入**：腹侧前中央回皮层内微电极阵列，覆盖 6v 与 55b/PEF 等分区。
- **行为条件**：尝试的默做口型（mimed）、耳语（whispered）、正常（normal）、大声（loud）四种说话模式；另设指示呼吸任务作为对照。
- **关键指标**：电极调谐比例、模式/音量解码准确率、解码时间进程（相对发声起始）、闭环在线准确率。

## 5. 技术路线

```text
四种说话模式 / 音量条件的尝试发声
   ↓ 皮层内阵列（6v、55b/PEF 等）
放电率调制（86% 电极同时调制音量与词）
   ↓ 子空间分析
模式/音量 与 音素内容 → 不同神经子空间
   ↓ 时间分辨解码 + 闭环
在线音量解码器（94%）→ 实时改变脑到文本输出的大小写/强调
```

## 6. 主要结果

- **编码强度**：总体 86% 的电极同时对音量水平与词显著调制。
- **分区差异**：T16 的 55b/PEF 阵列对词的调谐明显弱于 6v 阵列——85% 电极对音量调谐，但只有 63% 对词调谐。
- **解码准确率**：尝试的模式/音量在两名参与者中分别达到 94% 与 89%。
- **准备性编码**：T15 在发声起始前 640 ms、T16 在起始前 270 ms 即可达到 >80% 准确率。
- **峰值时间不同**：T15 在发声起始时达到 93% 峰值，T16 的 86% 峰值出现在起始后 270 ms。
- **闭环在线**：音量解码器在实时调制脑到文本输出时达到 94% 在线准确率（LOUD → 大写，NORMAL → 小写）。

## 7. 与 Wairagkar 2025 的区别与互补

| 维度 | 本文（Srinivasan 2026） | Wairagkar 2025 |
| --- | --- | --- |
| 研究对象 | 音量/说话模式 | 语调、重音、音高 |
| 输出的载体 | 脑到**文本**（大小写/强调） | 脑到**声音**（声学参数） |
| 神经机制贡献 | 模式/音量与音素在**不同子空间** | 韵律对应输出-零空间活动增强 |
| 闭环演示 | 音量闭环（94% 在线） | 语调/重音/音高闭环（90.5% / 95.7%） |
| 提前量证据 | 发声前 640 ms / 270 ms 可达 80% | 意外发现的全句输出-零预备活动 |

> 两篇合起来说明：**副语言特征不是语音解码的噪声，而是可以独立解出、并能在同一阵列上并行解码的第二个信息通道。**

## 8. 与神经外科的直接关系

- **电极覆盖的边界**：55b/PEF 对音量的调谐强于对词的调谐，提示不同分区贡献不同的信息维度——**多阵列、多区域的覆盖策略比单点优化更有价值**。
- **术前/术中规划**：如果目标是"有语气的语音"，声学参数（音量、语调）对应的皮层区域也需要被覆盖，这与只做"可懂度"的电极规划不同。
- **康复视角**：音量是一个比音高/语调更容易被患者掌握的控制维度（Wairagkar 2025 中患者明确抱怨难以精确调节音高），临床落地顺序应优先考虑低认知负担的维度。

## 9. 文章的主要优势

1. 把语音副语言特征的编码证据从 fMRI 推进到单神经元放电率层面。
2. 首次给出"模式/音量"与"音素内容"在群体层面处于不同子空间的直接证据，说明并行解码在原理上可行。
3. 闭环演示落到了真实可用的交互细节（实时大小写切换），而不是停留于离线指标。

## 10. 局限

- 两名受试者，且 T15 与 T16 的峰值时间与分区表现差异明显，个体差异大于共同规律。
- 受试者均有构音障碍，作者明确写道"两人的发声输出因构音障碍而减弱，T15 尤其明显"——这意味着任务本身（尤其"大声"）对他们的执行负担被低估。
- 音量被压缩为**离散两类**（NORMAL / LOUD），不是连续控制；论文也未验证长期使用中的稳定性。
- 闭环只验证了音量一个维度，语调/音高的同时并行闭环尚未与音量集成。

## 11. 汇报时建议用一句话总结

> 语音 BCI 正在从"解码内容"走向"解码怎么说"；本文证明音量与说话方式不仅能被解出，而且能在发声之前被读出来。

## 12. 参考来源

Srinivasan A, Wairagkar M, Iacobacci C, et al. *Nature Communications.* 2026;17:5301. DOI: 10.1038/s41467-026-71284-4.

---

# 附：关键句与核心论点（逐节原文提取）

> 提取方式：按论文原有小节顺序，逐节给出**原文关键句**（保留英文原句）+ **核心论点**（中文一句话）。
> 原文文件：`PDFs/06_Encoding of speech modes and loudness in ventral precentral gyrus.pdf`（出版社正式版，11 页）。

## A1. Abstract｜问题与结论

1. "However, the encoding of these behaviors in the ventral precentral gyrus (vPCG) has not been studied at the resolution of neuronal firing rates."
   → 空白点被精确定义在"分辨率"上，而不是"区域"上。
2. "At the neural ensemble level, mode/loudness and phonemic content were encoded in distinct neural subspaces."
   → 子空间分离是本文最重要的机制性结论，它让并行解码在原理上成立。
3. "Attempted mode/loudness could be decoded from vPCG with 94% and 89% accuracy for the two participants, and corresponding neural preparatory activity at 640 ms and 270 ms before speech onset enabled 80% decoding accuracy, respectively."
   → 两个参与者的提前量差距（640 ms vs 270 ms）本身就是个体差异的证据。
4. "We then developed a closed-loop loudness decoder that achieved 94% online accuracy in modulating a brain-to-text speech neuroprosthesis output based on attempted loudness."
   → 闭环的落点是"输出格式"（大小写），说明副语言信息可以直接改变界面行为。

> **核心论点**：说话方式与音量是独立于音素的可解码信息维度，并且可以在发声之前被读取。

## A2. Results｜调谐、解码与提前量

1. "Overall, 86% of electrodes showed significant modulation to both loudness levels and words."
   → 音量与词信息在同一电极上高度重叠，说明"音量会污染内容解码"是一个必须处理的问题。
2. "However, there was markedly less word tuning on T16’s 55b/PEF array compared to the 6v array (Supplementary Fig. 1d): 85% of electrodes were significantly tuned to loudness whereas only 63% were tuned to words."
   → 分区功能分工的实际数字，是电极布局规划的直接依据。
3. "For both participants, loudness could be decoded well before speech onset, with over 80% accuracy at 640 ms before onset for T15 and 270 ms before onset for T16, indicating preparatory encoding of speech loudness."
   → 提前量意味着 BCI 可以在语音生成之前先设定输出格式，这是工程上最有价值的一条。
4. "For T15, peak decoding accuracy of 93% was achieved at speech onset (Fig.3a), while for T16, peak accuracy of 86% occurred 270 ms after speech onset."
   → 两人的峰值时间不同（起始时 vs 起始后），提示解码窗口需要按人标定。

> **核心论点**：音量信息在发声前就已存在于皮层活动中，但可利用的时间窗因人而异。

## A3. Discussion｜作者对定位的判断

1. "Our study shows that attempted loudness can also be decoded from spiking activity and be used to enrich brain-to-text BCI output."
   → 本文与语音合成路线的分工：它不改变声音，而是丰富文本输出的表达。

> **核心论点**：副语言解码的价值不必依附于语音合成，也可以直接在文本输出上体现。

## A4. Methods｜任务实现与闭环映射

1. "Each trial started with the cue displayed first and a “delay” period (indicated by a red square) of 2 s during which the participant read the cue and prepared for execution."
   → 2 秒延迟期是"准备性编码"得以被观察到的任务设计基础。
2. "Both participants were able to perform the task, although their vocal output was reduced due to their dysarthria—especially for T15."
   → 任务对患者是有负担的；对"大声"这一类指令尤其如此。
3. "As the attempted words were decoded, we learnt their temporal alignment using the logit-to-phoneme alignment algorithm and applied on-screen text display formatting (uppercase for LOUD, lowercase for NORMAL) based on whether LOUD was predicted for ≥50% of the duration of the word (if not, it was displayed in lowercase as NORMAL) (Fig. 4c)."
   → 闭环的具体判据：以词的时长内 ≥50% 判为 LOUD 为界，属于可复核的工程细节。

> **核心论点**：闭环一旦落到"阈值 + 输出格式"这样的可复核规则上，副语言解码就从概念验证变成了界面功能。
