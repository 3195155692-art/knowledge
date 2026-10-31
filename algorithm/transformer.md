
---

## 一、先搞清楚：Transformer 在医学里干嘛用？

**场景 1：电子病历自动分析**。你想从大量非结构化的电子病历（病程记录、出院小结）中自动提取患者的病情要素，判断患者死亡风险。病历可能长达几千字，模型需要同时理解"3 周前的基础病"和"今天的最新检查结果"。

**场景 2：医学问答/文献检索**。像 ChatGPT 这样的医学问答系统，需要理解你的问题并从海量医学文献里找答案。

**场景 3：医学影像**。Vision Transformer（ViT）把 CT 切成小块后用 Transformer 处理，在肺癌分型、病理切片分类上性能已超过 CNN。

**场景 4：多模态模型**。同时读取影像、病历、检验结果，做综合诊断。

这些任务的底层都是 **Transformer** 架构。它是 2017 年 Google 发表的论文《Attention Is All You Need》提出的，现在几乎所有现代大模型（BERT、GPT、LLaMA、医学版的 ClinicalBERT、Med-PaLM）都是它的后代。

---

## 二、RNN 为什么不够用？

前面讲 RNN 时说过，RNN 处理序列像"排队"——必须一个字一个字按顺序读，读完第 1 个字才能读第 2 个。

这带来两个问题：

1. **不能并行**：训练时只能串行，第 2 个词要等第 1 个词算完，速度慢。
2. **长序列遗忘**：即使有 LSTM，句子太长时，开头和结尾的词依然难以建立联系。比如病历开头提到"患者 10 年前有乳腺癌"，3000 字之后才出现"骨转移"，RNN 很难把这两处联系起来。

Transformer 的思路完全不同：**不排队，而是让序列里每个词都能"一眼看到"所有其他词，直接计算它们之间的关联。** 这就是"自注意力"（Self-Attention）。

---

## 三、核心机制：Self-Attention 到底在干嘛？

### 直觉：读书时的"注意力"

你读这样一句话：

> "患者 3 年前确诊**它**，目前**肿瘤**进展，考虑肺转移。"

理解"它"指什么时，你的大脑会重点关注前面的"肿瘤"相关词，而不是"患者""3 年""目前"这些词。注意力会有**不同的权重**。

Self-Attention 就是让模型自动学会：处理每个词时，应该"看"其他哪些词、各看多少。

### 三个关键角色：Query、Key、Value

借用图书馆查书的比喻：

- **Query（Q，查询）**：你想问的问题，比如"我现在处理的这个词'它'，需要找什么信息？"
- **Key（K，键）**：每个词的"标签"，像图书馆每本书的书名索引
- **Value（V，值）**：每个词实际携带的信息，像书的内容

计算过程分三步：

1. **算相关性**：用当前词的 Query 去和所有词的 Key 做匹配，得到注意力分数（这个词和每个词有多相关）
2. **归一化**：用 softmax 把分数转成加起来等于 1 的权重
3. **加权汇总**：用这些权重对所有词的 Value 做加权求和，得到当前词的新表示

公式：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

别被公式吓到，拆开看就是"匹配打分→转权重→加权平均"。

### 为什么要除以 $\sqrt{d_k}$？

Q 和 K 是高维向量（比如 64 维），它们的点积会随着维度变大而数值变大，导致 softmax 后权重极端化（一个接近 1，其余接近 0），梯度消失。除以 $\sqrt{d_k}$ 把数值压回合理范围，训练更稳定。

### 深入：Q、K、V 到底是怎么来的？

上面说"每个词生成 Q、K、V"，实际上它们是**把同一个词向量分别乘三个不同的可学习矩阵**得到的：

$$
Q = X W^Q,\qquad K = X W^K,\qquad V = X W^V
$$

- $X$ 是输入序列，形状（序列长度 $n$，词向量维度 $d$），即 $(n, d)$
- $W^Q, W^K, W^V$ 是三个独立的权重矩阵，每个形状 $(d, d_k)$
- 乘出来的 $Q,K,V$ 形状都是 $(n, d_k)$

**为什么同一个词要投影出三份不同的向量？** 因为它们扮演的角色不同：
- Query 是"我在找什么"
- Key 是"我能提供什么索引"
- Value 是"我实际携带的内容"

让三个角色各自学习一套投影，模型才能灵活地表达"我要找的"和"别人有的"之间的匹配。

### 完整的一次自注意力（矩阵维度走一遍）

设序列长度 $n=10$、词向量维度 $d=512$、单头维度 $d_k=64$：

1. 计算注意力分数矩阵：

$$
S = \frac{QK^T}{\sqrt{d_k}}
$$

$Q$ 是 $(10,64)$，$K^T$ 是 $(64,10)$，得到 $S$ 是 $(10,10)$。这个矩阵的第 $i$ 行第 $j$ 列就是"**第 i 个词对第 j 个词的关注分数**"。

2. 对每一行做 softmax（行内归一化）：

$$
A = \text{softmax}(S,\ \text{dim}=\text{row})
$$

$A$ 仍是 $(10,10)$，每行 10 个权重加起来等于 1。

3. 用注意力权重对 V 加权：

$$
Z = AV
$$

$A$ 是 $(10,10)$，$V$ 是 $(10,64)$，得到 $Z$ 是 $(10,64)$——每个词都变成了"融合了所有相关词信息"的新表示。

**关键直觉**：一个 $n\times n$ 的注意力矩阵，让任意两个词之间都有一条直接的边，信息一步可达，不需要像 RNN 那样依次传递。这就是 Transformer 不遗忘长距离依赖的原因。

---

## 四、具体算一个迷你 Attention

为了看清机制，用一个极简例子（不追求严谨，只看直觉）。

假设句子只有 3 个词（已经转成向量）：

- "患者"：$x_1 = [1, 0]$
- "发热"：$x_2 = [0, 1]$
- "感染"：$x_3 = [1, 1]$

假设简化后 Q、K、V 都等于输入向量本身（实际是通过不同的权重矩阵算出来的）。

现在处理"感染"（$x_3$），计算它和三个词的相关性（点积）：

$$
\text{score}_1 = x_3 \cdot x_1 = 1 \times 1 + 1 \times 0 = 1
$$

$$
\text{score}_2 = x_3 \cdot x_2 = 1 \times 0 + 1 \times 1 = 1
$$

$$
\text{score}_3 = x_3 \cdot x_3 = 1 \times 1 + 1 \times 1 = 2
$$

做 softmax（这里忽略 $\sqrt{d_k}$）：

$$
e^1 = 2.72,\quad e^1 = 2.72,\quad e^2 = 7.39
$$

$$
\text{总和} = 12.83
$$

权重：

$$
w_1 = 2.72/12.83 \approx 0.21,\quad w_2 = 0.21,\quad w_3 = 7.39/12.83 \approx 0.58
$$

所以"感染"的新表示 = 三个词 Value 的加权平均：

$$
z_3 = 0.21 \times [1,0] + 0.21 \times [0,1] + 0.58 \times [1,1] = [0.79, 0.79]
$$

可以看到，"感染"的新表示里有 58% 来自它自己，21% 来自"患者"，21% 来自"发热"。

**真正的模型里，每个词都会算一遍，最终得到一个"每个词都融合了所有相关词信息"的新序列。** 而且这些权重是学出来的，不是人工定的。

---

## 五、多头注意力（Multi-Head Attention）

一个"注意力头"只能学一种关系模式。比如医学句子里：
- 一个头可能关注"药物—剂量"关系
- 一个头关注"疾病—症状"关系
- 一个头关注"否定词—疾病"（"否认**高血压**"很重要）

所以 Transformer 并行使用**多个注意力头**（8 头、16 头），每个头有自己的 Q、K、V，各自学一种关系，最后把结果拼接起来。

直觉：不是用一个"通才"去看所有关系，而是派 8 个"专家"各自盯一种关系，再汇总意见。

### 多头的维度是怎么算的？

设模型总维度 $d_{model}=512$，用 $h=8$ 个头，则每个头的维度：

$$
d_k = d_v = \frac{d_{model}}{h} = \frac{512}{8} = 64
$$

每个头独立做一次 64 维的注意力，得到 $(n,64)$；8 个头的结果沿特征维度拼接回 $(n,512)$，再乘一个输出矩阵 $W^O$ 做线性融合：

$$
\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1,\ldots,\text{head}_h)W^O
$$

这样设计的妙处：**把总维度拆给多个头，总计算量和一个完整的单头注意力基本相同，但可以并行学习多种关系。**

### 深入：一个 Encoder 层的完整结构

一个标准 Encoder 层由两个子层组成，每个子层都包了"**残差连接 + 层归一化**"：

```
输入
 → 多头自注意力
 → 残差相加 + LayerNorm
 → 前馈网络（FFN，两层 MLP）
 → 残差相加 + LayerNorm
 → 输出
```

- **残差连接（Residual）**：把子层输出和输入直接相加，即 $x + \text{sublayer}(x)$，为梯度提供直通通道，深层网络才训得动。
- **层归一化（Layer Normalization）**：对**每个样本自己**的特征做归一化（均值 0、方差 1）。它和 CNN 里的 BatchNorm 不同——BatchNorm 沿 batch 维度统计、在序列长度不一的 NLP 里不稳定；LayerNorm 沿特征维度统计，与 batch 大小无关，所以 Transformer 用 LayerNorm。
- **前馈网络（FFN）**：逐位置独立地做两次线性变换，中间用 ReLU/GELU：

$$
\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2
$$

注意注意力层负责"词与词之间混合信息"，FFN 负责"每个位置内部做特征变换"，两者交替进行。

### 两种 mask（掩码）

- **Padding mask（填充掩码）**：句子长短不一，要补齐到相同长度，补齐的位置（如 `<PAD>`）没有意义，注意力时要把这些位置的分数设为 $-\infty$（softmax 后变 0），防止模型关注空内容。
- **Causal / Look-ahead mask（因果掩码）**：只用在 Decoder 里。生成第 $t$ 个词时，只能看到第 $1$ 到 $t$ 个词，不允许"偷看"未来词。实现上把注意力矩阵的上三角（未来位置）全部设为 $-\infty$。

### 计算复杂度：Transformer 的代价

自注意力的复杂度是 $O(n^2 \cdot d)$——序列长度 $n$ 是平方增长，因为要算 $n\times n$ 个两两关系。

- 当序列很长（整本书、长病历、高分辨率病理图）时，$n^2$ 会成为显存和计算的瓶颈
- 这催生了各种"高效注意力"（稀疏注意力、线性注意力、FlashAttention 等），以及长上下文模型（滑动窗口、分块）

---

## 六、位置编码（Positional Encoding）

自注意力有个"副作用"：它处理词时是**同时看所有词**的，完全不知道词的顺序。对它来说，"患者发热"和"发热患者"是一样的——这显然不行。

RNN 靠"一个接一个读"天然带顺序，Transformer 没有这个机制，于是**人为给每个词加一个"位置标签"**，这就是位置编码。

做法是把一个由正弦/余弦函数生成的、与位置相关的向量加到词向量上：

$$
PE_{(pos, 2i)} = \sin(pos / 10000^{2i/d})
$$

$$
PE_{(pos, 2i+1)} = \cos(pos / 10000^{2i/d})
$$

你不用记公式，只要知道：**每个位置得到一个独特的"坐标"，模型据此区分第 1 个词和第 100 个词**。

---

## 七、Encoder–Decoder 整体结构

一个完整的 Transformer 包含两部分：

- **Encoder（编码器）**：一堆 Encoder 层堆叠（每层 = 多头注意力 + 前馈网络 + 残差连接 + 层归一化），负责"理解"输入。
- **Decoder（解码器）**：额外多一个带掩码的注意力（masked attention，保证生成第 t 个词时只能看到前 t-1 个词，不能偷看答案），负责"生成"输出。

不同任务用不同部分：

| 任务 | 用哪部分 | 代表模型 |
|---|---|---|
| 文本理解、分类、病历风险预测 | 只用 Encoder | BERT、ClinicalBERT、BioBERT |
| 文本生成、对话 | 只用 Decoder | GPT 系列、LLaMA、Med-PaLM |
| 翻译、摘要 | Encoder + Decoder | 原始 Transformer、T5 |

---

## 八、Transformer 在医学里的具体应用

### 1. 电子病历风险预测

ClinicalBERT（BioBERT）在大量病历上预训练后，输入 ICU 患者的病程记录，预测住院死亡率、再入院风险。它的优势正是能把长病历中相隔很远的信息联系起来。

### 2. 医学影像：Vision Transformer（ViT）

把 CT 切成 16×16 的小图块（patch），每个图块当成一个"词"，输入 Transformer。配合迁移学习，ViT 在肺结节、糖网、病理分型等任务上性能已接近或超过 CNN。

### 3. 医学问答

Med-PaLM、ChatGPT 等用 Decoder 架构，理解医学问题并生成回答。

### 4. 蛋白质结构与药物发现

AlphaFold 2 用 Transformer 的变体处理氨基酸序列；药物-分子结合预测也大量使用 Transformer。

---

## 九、Transformer vs RNN/CNN

| | RNN/LSTM | CNN | Transformer |
|---|---|---|---|
| 擅长数据 | 时间序列 | 图像（空间局部特征） | 文本、长序列、多模态 |
| 全局关系建模 | 差（要一步步传） | 中（靠堆叠扩大感受野） | 强（一步直达） |
| 能否并行 | 否 | 能 | 能 |
| 数据量需求 | 小 | 中 | 大 |
| 可解释性 | 中 | 中（Grad-CAM） | 中（可视化注意力权重） |
| 典型医学用途 | ICU 时序、CGM | 胸片、CT | 病历、病理、大模型 |

---

## 十、代码框架（PyTorch，最小示例）

直接用 PyTorch 内置的 Transformer Encoder 做病历文本分类：

```python
import torch
import torch.nn as nn

class ClinicalTransformer(nn.Module):
    def __init__(self, vocab_size=30000, d_model=128,
                 nhead=8, num_layers=4, num_classes=2):
        super().__init__()
        # 词 ID 转向量
        self.embedding = nn.Embedding(vocab_size, d_model)
        # 位置编码（简单实现用可学习位置）
        self.pos_embedding = nn.Embedding(512, d_model)
        # Transformer 编码器
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead,
            dim_feedforward=512, dropout=0.1,
            batch_first=True
        )
        self.transformer = nn.TransformerEncoder(
            encoder_layer, num_layers=num_layers
        )
        self.fc = nn.Linear(d_model, num_classes)

    def forward(self, x):
        # x: (batch, 序列长度)，内容是词的 ID
        positions = torch.arange(x.size(1), device=x.device).unsqueeze(0)
        h = self.embedding(x) + self.pos_embedding(positions)
        h = self.transformer(h)
        h = h.mean(dim=1)          # 所有位置平均池化
        return self.fc(h)
```

实际项目通常直接用预训练模型（HuggingFace transformers 库）：

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# 生物医学专用预训练模型
model_name = "emilyalsentzer/Bio_ClinicalBERT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name, num_labels=2
)

# 输入病历文本
inputs = tokenizer("患者发热 3 天，意识模糊，考虑脓毒症...",
                   return_tensors="pt", truncation=True, max_length=512)
outputs = model(**inputs)
```

---

## 十一、论文里怎么写

**方法**：

> 我们使用 BioClinicalBERT 预训练模型（基于 Transformer 编码器，12 层，隐藏维度 768，12 个注意力头）对电子病历文本进行编码。将出院小结截断/补齐至 512 个 token，模型经 <[BOS_never_used_51bce0c785ca2f68081bfa7d91973934]> 位置输出经全连接层和 softmax 输出住院死亡风险概率。采用 AdamW 优化器（学习率 2e-5）、batch size 16、训练 5 个 epoch，按患者划分训练/验证/测试集。

**结果**：

> 模型在独立测试集上预测住院死亡的 AUC 为 0.89（95%CI 0.86–0.92），显著优于基于结构化变量的 Logistic 回归（AUC 0.78，DeLong P<0.001）。注意力权重可视化显示，模型主要关注诊断、并发症和最后 48 小时的病情描述。

---

## 十二、最常见的坑

1. **数据量小还从头训练 Transformer。**
   Transformer 有几千万到上亿参数，小数据集必过拟合。医学场景一律用预训练模型微调（BioBERT、ClinicalBERT、ViT 等）。

2. **序列长度超了没截断。**
   BERT 类模型默认最长 512 个 token，长病历要截断或分段。截断策略要合理（比如保留出院小结+最后一段病程，而不是简单砍掉后面）。

3. **按记录划分而不是按患者划分。**
   同一患者多次就诊不能同时出现在训练集和测试集，否则数据泄露。

4. **注意力可视化过度解读。**
   注意力权重高不等于模型"真的理解"了这个词，它只是计算过程的中间量。解释要谨慎。

5. **所有任务都套 Transformer。**
   几百例 ICU 时序数据，LSTM 又快又稳；简单的影像分类，ResNet 完全够用。Transformer 的优势在大数据、长序列、多模态，不是万能的。

6. **忽略算力。**
   Transformer 训练吃显存、吃时间。没有 GPU 时优先用小模型或冻结大部分层只微调顶层。

---

## 十三、最后给你一个判断清单

用 Transformer 前问：

1. 数据是**文本、长序列或多模态**吗？（普通表格数据用 XGBoost）
2. 有预训练模型可用吗？（医学优先 ClinicalBERT/BioBERT/ViT）
3. 数据量够吗？（几百例别从头训）
4. 序列长度怎么处理？（>512 token 要截断或分段）
5. 有没有按患者划分数据集？
6. 有没有 GPU？评估算力是否够用

**一句话总结**：Transformer 用自注意力让序列里每个位置都能直接"看见"所有其他位置，解决了 RNN 不能并行、长序列遗忘的问题；在医学领域它是电子病历分析、医学大模型和 ViT 的底层架构，但数据量小的简单任务不一定需要它。
