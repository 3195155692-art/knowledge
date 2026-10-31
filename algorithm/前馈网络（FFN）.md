
---

## 一、先搞清楚：前馈网络（FFN）干嘛用？

**场景**：前馈网络（Feed-Forward Network，FFN），也叫全连接网络/多层感知机（MLP），是最基础的神经网络结构。它既可以独立完成表格数据的分类/回归，也作为组件出现在几乎所有现代网络里——比如 Transformer 每个注意力块后面都跟一个 position-wise FFN。

"前馈"指信息只从输入层单向流向输出层，没有环、没有回头连接（这是它和 RNN 的根本区别）。

---

## 二、基本结构：一层一层堆叠

一个三层 FFN：

```
输入层      隐藏层        输出层
 x1 ─┐
     ├─ 神经元 h1 ─┐
 x2 ─┤            ├─ 神经元 y1
     ├─ 神经元 h2 ─┤
 x3 ─┘            └─ 神经元 y2
```

每一层做的事：

$$
\mathbf{h} = \sigma(W\mathbf{x} + \mathbf{b})
$$

- $W$：权重矩阵，决定每个输入对神经元的影响强度
- $\mathbf{b}$：偏置，整体平移
- $\sigma$：激活函数（ReLU、GELU、sigmoid 等），引入非线性
- 没有激活函数，多层线性叠加仍等价于一层线性，网络学不到复杂关系

### 直觉：流水线会诊

把 FFN 想成一条流水线：每一层是一组"评委"，各自对输入做加权打分、再过一道门槛（激活函数），把结果交给下一层；越往后的层，组合出的特征越抽象。第一层看原始指标，后面的层看"指标的组合"。

### 单个神经元在算什么

一个神经元就是"加权求和 + 激活"：

$$
z = \sum_i w_i x_i + b,\qquad a = \sigma(z)
$$

---

## 三、手算一个神经元

输入 $x=[1, 2]$，权重 $w=[0.5, -0.5]$，偏置 $b=0.1$，激活用 ReLU（$\max(0,z)$）。

### 第 1 步：加权求和

$$
z = 0.5\times1 + (-0.5)\times2 + 0.1 = 0.5 - 1.0 + 0.1 = -0.4
$$

### 第 2 步：激活

$$
a = \text{ReLU}(-0.4) = \max(0, -0.4) = 0
$$

**解读**：这个神经元在当前输入下没有被激活（输出 0），相当于"关门"。换成 ReLU 后，负的加权和被直接截断，这是 ReLU 稀疏激活的特点。

### 再看一层的矩阵运算直觉

若隐藏层有多个神经元，就是用权重矩阵 $W$ 一次算出所有神经元的 z，再统一激活。维度关系：

$$
\mathbf{x}\in\mathbb{R}^{d_{in}},\quad W\in\mathbb{R}^{d_{out}\times d_{in}},\quad \mathbf{h}\in\mathbb{R}^{d_{out}}
$$

---

## 四、为什么需要"深"和非线性：万能近似定理

**万能近似定理**：只要隐藏层足够宽、且带非线性激活，一个单隐藏层的 FFN 理论上能以任意精度逼近几乎任何连续函数。

直觉：非线性神经元像一块块可弯折的"积木"，足够多的积木能拼出任意复杂的曲线/曲面。但定理只保证"能表示"，不保证"能学出来"（数据、优化、泛化是另一回事）。

实践中倾向"更深而不是更宽"：深层结构用更少参数表达层级特征，效率更高。

---

## 五、FFN 在现代网络里的角色

| 出现位置 | 作用 |
|---|---|
| Transformer block | 注意力做"信息混合"，position-wise FFN 对每个位置独立做非线性变换、增强表达 |
| CNN 分类头 | 卷积提特征后，全连接层做最终分类 |
| 独立 MLP | 表格数据、特征向量的回归/分类 |
| 词嵌入投影 | 维度变换（如 lm_head） |

Transformer 里典型 FFN（先升维再降维，中间 GELU）：

$$
\text{FFN}(x) = W_2\,\text{GELU}(W_1 x + b_1) + b_2
$$

通常中间维度是模型维度的 4 倍，提供额外的表达容量。

---

## 六、FFN vs CNN vs RNN

| | FFN/MLP | CNN | RNN |
|---|---|---|---|
| 连接方式 | 全连接 | 局部卷积、权重共享 | 循环、带记忆 |
| 结构先验 | 无 | 空间局部性 | 时间顺序 |
| 适合数据 | 表格/特征向量 | 图像、网格 | 序列 |
| 参数量 | 大（全连接） | 较省 | 中等 |
| 信息流 | 单向无环 | 单向、局部 | 有环（时间展开） |

---

## 七、代码（PyTorch）

独立 MLP（用于表格分类）：

```python
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, in_dim, hidden, n_classes):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden, hidden),
            nn.ReLU(),
            nn.Linear(hidden, n_classes)   # 输出 logits，外接 softmax/交叉熵
        )
    def forward(self, x):
        return self.net(x)
```

Transformer 风格的 position-wise FFN：

```python
class TransformerFFN(nn.Module):
    def __init__(self, d_model, d_ff):
        super().__init__()
        self.w1 = nn.Linear(d_model, d_ff)
        self.act = nn.GELU()
        self.w2 = nn.Linear(d_ff, d_model)
    def forward(self, x):
        return self.w2(self.act(self.w1(x)))
```

R 中（配合 nnet）：

```r
library(nnet)
fit <- nnet(label ~ ., data = train, size = 16, decay = 0.01, maxit = 200)
```

---

## 八、论文里怎么写

**方法**：

> 采用多层前馈网络，隐藏层使用 ReLU 激活并施加 Dropout（0.2），输出层为全连接层产生类别 logits，经 softmax 得到概率，以交叉熵损失训练。

**结果**：

> 该 MLP 在验证集上 AUROC 为 0.88，与基线 Logistic 回归（0.81）相比有所提升，提示特征间非线性组合提供了额外预测信息。

---

## 九、最常见的坑

1. **忘记激活函数。**
   多层线性仍等价于一层，网络失去意义；除最后输出层外一般都要加非线性。

2. **参数量过大、过拟合。**
   全连接对小样本很容易记住训练集，用 Dropout、权重衰减、正则和早停。

3. **输入不标准化。**
   量纲差异大时训练不稳、收敛慢，先做标准化/归一化。

4. **维度对不上。**
   权重矩阵形状要与输入/输出维度匹配，注意 batch 维度。

5. **权重初始化不当。**
   全零初始化会让所有神经元学到一样的东西，用 Xavier/He 初始化。

6. **把 FFN 直接用于高维图像/长序列。**
   全连接会参数爆炸且忽略空间/时序结构，图像用 CNN、序列用 RNN/Transformer。

---

## 十、判断清单

用 FFN 前问：

1. 输入是不是表格/特征向量（而非图像、序列）？
2. 隐藏层是否加了非线性激活？
3. 是否做了输入标准化、合理初始化？
4. 小样本是否加了 Dropout/正则防过拟合？
5. 输出层是否与任务匹配（分类接 softmax、回归不加）？
6. 若数据是图像/序列，是否应改用 CNN/RNN/Transformer？

**一句话总结**：前馈网络是信息单向流动、由"线性加权+非线性激活"层层堆叠而成的最基础神经网络，万能近似定理保证其表达能力，既独立用于表格数据，也作为 Transformer FFN、CNN 分类头等组件存在；它没有结构先验、参数易膨胀，关键是加非线性、做标准化和正则，并按数据类型选择更合适的专用网络。
