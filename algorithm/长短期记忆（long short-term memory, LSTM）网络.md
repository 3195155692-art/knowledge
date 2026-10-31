
---

## 一、先搞清楚：LSTM 在医学里干嘛用？

**场景 1**：ICU 患者每小时测一次生命体征（心率、血压、血氧、呼吸频率），连续记录了 48 小时。你想根据这 48 小时的序列，预测患者下一个小时会不会发生脓毒症。

**场景 2**：患者术后每天测 cTnI、肌酐、WBC，连续 7 天。你想根据这条时间曲线，预测患者会不会发生急性肾损伤（AKI）。

**场景 3**：糖尿病患者连续 90 天的血糖监测（CGM）数据，预测夜间低血糖风险。

这些数据的共同点：**是一条随时间变化的序列，前后时刻之间有依赖关系。**

LSTM（长短期记忆网络）就是处理这种**时序数据**的深度学习模型。

---

## 二、为什么普通神经网络搞不定时序数据？

普通神经网络假设每个输入都是独立的。但时序数据不是：

- 第 48 小时的血压和第 47 小时的血压有关
- 术后第 3 天的肌酐和第 1、2 天的趋势有关
- 你看到今天的血糖，要结合前几天的趋势判断

普通网络看一个时刻的输入，没法"记住"之前发生了什么。

RNN（循环神经网络）试图解决这个问题：它有一个"隐藏状态"，每处理一个新时刻，就把之前的信息带过来。但普通 RNN 有个致命问题——**长序列会"遗忘"**。

比如你看了 48 小时的 ICU 数据，到第 48 小时要做判断时，第 1 小时的信息早就被冲没了。这叫**梯度消失**。

LSTM 就是为了解决"长序列遗忘"问题发明的。

---

## 三、LSTM 到底在干嘛？——用"病历本"类比

想象你在管一个病人，每天写病历。

LSTM 有一个"细胞状态"（cell state），就像你的病历本。每天你会做三件事：

### 1. 遗忘门（Forget Gate）：该扔的扔

翻看病历本，有些旧信息没用了（比如患者 3 天前的临时医嘱已经执行完了），就把那几页撕掉。

### 2. 输入门（Input Gate）：该记的记

今天有新情况（比如今天肌酐升高了），把重要的新信息写进病历本。

### 3. 输出门（Output Gate）：该看的看

今天要做判断了（比如要不要升级抗生素），你从病历本里挑出相关的信息作为参考。

**关键洞察：LSTM 不是所有信息都记着，也不是所有信息都忘光，而是有选择地保留和更新。** 这就是"长短期记忆"的含义——重要的长期信息（比如患者有糖尿病）一直保留，不重要的短期信息（比如昨晚临时用了一支退烧药）逐步遗忘。

---

## 四、LSTM 的输入输出长什么样？

### 输入

形状是：**(样本数, 时间步, 特征数)**

比如：
- 1000 个患者
- 每个患者 48 个小时（时间步 = 48）
- 每个小时测 5 个指标（特征数 = 5）：心率、血压、血氧、呼吸、体温

输入张量形状：(1000, 48, 5)

### 输出

看你要做什么任务：

**任务 A：二分类（会不会发生脓毒症）**
- 输出一个概率：(1000, 1)
- 用最后一个时间步的隐藏状态接一个全连接层 + Sigmoid

**任务 B：预测下一个时刻的值（下一小时心率）**
- 输出 (1000, 1)，即下一小时的心率

**任务 C：序列标注（每个时刻都输出一个判断）**
- 输出 (1000, 48, 1)，即每个小时是否有脓毒症风险

---

## 五、LSTM 的关键参数

### 1. hidden_size（隐藏层维度）

每个时间步传递的隐藏向量长度。常见 32、64、128。越大模型越复杂，但越容易过拟合。

### 2. num_layers（层数）

堆几层 LSTM。常见 1–3 层。多层 LSTM 能学更复杂的时序模式，但训练更慢。

### 3. bidirectional（双向）

双向 LSTM：不仅看过去，还看未来。

但**医学时序预测不能用双向**！因为预测下一小时的脓毒症，你不可能"先看未来的数据"。双向 LSTM 只适合"已经有完整序列，做分类"的场景（比如看完整个 48 小时后判断会不会脓毒症）。

### 4. dropout

防止过拟合。

---

## 六、具体例子：预测 ICU 脓毒症

### 数据

每个患者 48 小时数据，每小时 5 个生命体征指标。标签是"第 49 小时是否发生脓毒症"（0/1）。

### 模型结构

```
输入 (batch, 48, 5)
    ↓
LSTM 层1 (hidden_size=64)
    ↓
LSTM 层2 (hidden_size=64)
    ↓
取最后一个时间步的输出
    ↓
全连接层 (64 → 32)
    ↓
Dropout (0.5)
    ↓
输出层 (32 → 1, Sigmoid)
```

### 结果

假设测试集 AUC=0.85，敏感度 80%，特异度 85%。

---

## 七、LSTM vs 其他时序模型

| 模型 | 特点 | 医学场景 |
|---|---|---|
| 逻辑回归（用每个时间点作为特征） | 简单，但不考虑时序顺序 | 简单基线 |
| 传统时序模型（ARIMA、Prophet） | 统计模型，需要平稳序列 | 单一指标预测（血糖趋势） |
| RNN | 简单但长序列遗忘 | 短序列 |
| LSTM | 能处理长序列、有门控 | ICU 预警、AKI 预测 |
| GRU | LSTM 的简化版，参数少 | 数据量小时 |
| Transformer | 新范式，并行计算 | 长序列、大数据 |
| TCN（时间卷积网络） | 用卷积处理时序 | 近期流行 |

新手从 LSTM 入门够用。现在 Transformer 在时序领域也很火，但 LSTM 依然是医学时序文献里最常见的。

---

## 八、最常见的坑

1. **数据没标准化。**
   心率 60–100，血压 80–200，数值范围差很多。每个特征先标准化（Z-score）再喂给 LSTM。

2. **时间步对齐错误。**
   不同患者的测量频率可能不一样（有的每小时测，有的每 4 小时测）。要重采样到统一时间网格，缺失值要插补。

3. **泄露未来信息。**
   预测第 49 小时脓毒症，输入里不能包含第 49 小时的数据。也不能用双向 LSTM（因为它会"偷看"未来）。

4. **序列太长。**
   2000 个时间步的 LSTM 训练很慢。考虑截断、下采样，或者用 Transformer。

5. **样本量小还堆很多层。**
   500 个样本堆 3 层 LSTM + hidden_size=256 一定过拟合。医学时序数据通常不大，从 1 层、hidden_size=32 开始。

6. **只看训练集 loss。**
   LSTM 很容易过拟合。看验证集 AUC，用 early stopping。

7. **不平衡数据。**
   脓毒症发生率可能只有 5–10%。用 class weight、focal loss、或调整分类阈值。

---

## 九、代码框架（PyTorch）

```python
import torch
import torch.nn as nn

class SepsisLSTM(nn.Module):
    def __init__(self, input_size=5, hidden_size=64, num_layers=2):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=0.3
        )
        self.fc = nn.Linear(hidden_size, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        # x: (batch, seq_len, input_size)
        lstm_out, (h_n, c_n) = self.lstm(x)
        # 取最后一个时间步的输出
        last_out = lstm_out[:, -1, :]  # (batch, hidden_size)
        out = self.fc(last_out)
        return self.sigmoid(out)

model = SepsisLSTM(input_size=5, hidden_size=64, num_layers=2)
criterion = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# 训练
for epoch in range(50):
    model.train()
    for X_batch, y_batch in train_loader:
        optimizer.zero_grad()
        y_pred = model(X_batch)
        loss = criterion(y_pred.squeeze(), y_batch)
        loss.backward()
        optimizer.step()
```

输入数据准备：

```python
# X 形状: (n_patients, 48, 5)
# y 形状: (n_patients,)
import numpy as np
from sklearn.preprocessing import StandardScaler

# 假设 raw_data 形状是 (n_patients, 48, 5)
n, t, f = raw_data.shape
scaler = StandardScaler()
X_scaled = scaler.fit_transform(raw_data.reshape(-1, f)).reshape(n, t, f)
```

---

## 十、论文里怎么写

**方法**：

> 我们构建了一个双层 LSTM 模型用于预测 ICU 患者 48 小时内的脓毒症发生。输入为每小时记录的 5 项生命体征（心率、收缩压、血氧、呼吸频率、体温），共 48 个时间步。所有特征按训练集均值和标准差标准化。模型隐藏层维度 64，采用 dropout=0.3，Adam 优化器（lr=1e-3），batch size 64，早停 patience=10。按患者划分训练/验证/测试集 = 7:1:2。

**结果**：

> 在独立测试集（n=500）上，模型预测脓毒症的 AUC 为 0.85（95%CI 0.81–0.89），在最佳截断值下敏感度 80%，特异度 85%。与传统 logistic 回归（AUC=0.72）相比，LSTM 提升了 0.13 的 AUC（DeLong P<0.001）。

---

## 十一、LSTM vs CNN 处理图像：一张表

| | CNN | LSTM |
|---|---|---|
| 擅长处理 | 空间数据（图像） | 时间数据（序列） |
| 医学场景 | 胸片、CT、病理切片 | ICU 时序、CGM 血糖、术后曲线 |
| 数据形状 | (H, W, C) | (time_steps, features) |
| 关键操作 | 卷积、池化 | 门控（遗忘/输入/输出） |
| 能不能并行 | 卷积可以并行 | 时间步必须串行 |

现在也有 CNN+LSTM 混合模型：先用 CNN 从每帧图像提取特征，再用 LSTM 处理时序特征。比如视频手术动作识别、动态超声心动图分析。

---

## 十二、最后给你一个清单

做医学时序 LSTM 项目时：

1. 明确预测目标：分类（会不会生病）还是回归（下一个值是多少）？
2. 对齐时间网格，处理缺失值。
3. 每个特征标准化。
4. 按患者划分数据集，不要泄露未来信息。
5. 从简单模型开始：1 层 LSTM，hidden_size=32。
6. 监控验证集 AUC，early stopping。
7. 和 logistic 回归基线比，证明 LSTM 真的有用。
8. 报告敏感度、特异度、AUC，带 95%CI。
9. 不平衡数据用 class weight 或调整阈值。
