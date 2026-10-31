"use strict";

/**
 * Blank-background group-meeting deck.
 * Narrative: decoding -> independent use -> attributable clinical benefit.
 * All claims are sourced from the local BCI reading notes and report.
 */

const path = require("path");
const DEP =
  "/Users/oldma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const pptxgen = require(path.join(DEP, "pptxgenjs"));
const kit = require("/Users/oldma/.codex/skills/lky-report-ppt/scripts/deck_kit")(
  pptxgen,
  {
    cjk: "Heiti SC",
    latin: "Times New Roman",
  }
);

const {
  pres,
  C,
  F,
  FL,
  W,
  H,
  M,
  CW,
  card,
  pill,
  t,
  bullets,
  notes,
} = kit;

const OUT = path.join(
  "/Users/oldma/knowledge/artical/Brain-Computer Interface",
  "脑机接口组会汇报_从可解码到闭环修复_空白版.pptx"
);

let pageNo = 0;
const WHITE = "FFFFFF";

function hairline(slide, x, y, w, color = C.line, h = 0.022) {
  pill(slide, x, y, w, h, color);
}

function whiteSlide(eyebrow, title, opts = {}) {
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  pageNo += 1;

  t(slide, eyebrow, M, 0.28, 9.8, 0.3, {
    size: 12,
    bold: true,
    color: opts.accent || C.cyanDeep,
    spacing: 1.2,
  });
  t(slide, String(pageNo).padStart(2, "0"), W - M - 0.72, 0.28, 0.72, 0.3, {
    size: 12,
    face: FL,
    bold: true,
    color: C.sub,
    align: "right",
  });
  t(slide, title, M, 0.72, CW, 0.62, {
    size: opts.titleSize || 27,
    bold: true,
    color: C.navyDeep,
    valign: "middle",
  });
  hairline(slide, M, 1.47, CW, C.line);
  return slide;
}

function tinyTag(slide, text, x, y, color = C.cyanDeep, w = 1.4) {
  t(slide, text, x, y, w, 0.44, {
    size: 12,
    bold: true,
    color,
  });
}

function metric(slide, big, label, x, y, w, options = {}) {
  t(slide, big, x, y, w, options.h || 0.62, {
    size: options.size || 34,
    face: FL,
    bold: true,
    color: options.color || C.navy,
    valign: "bottom",
    align: options.align || "left",
  });
  t(slide, label, x, y + (options.h || 0.62) + 0.06, w, options.labelH || 0.66, {
    size: 12,
    color: C.sub,
    line: 18,
    align: options.align || "left",
  });
}

function lightConclusion(slide, text, opts = {}) {
  const x = opts.x === undefined ? M : opts.x;
  const y = opts.y === undefined ? 6.15 : opts.y;
  const w = opts.w === undefined ? CW : opts.w;
  const h = opts.h === undefined ? 0.82 : opts.h;
  card(slide, x, y, w, h, { fill: C.navyPale, line: C.navyPale });
  pill(slide, x + 0.14, y + 0.12, 0.075, h - 0.24, C.navy);
  t(slide, "汇报结论", x + 0.35, y, 1.25, h, {
    size: 12,
    bold: true,
    color: C.cyanDeep,
    valign: "middle",
  });
  t(slide, text, x + 1.58, y, w - 1.82, h, {
    size: 12.5,
    bold: true,
    color: C.navyDeep,
    valign: "middle",
    line: 18.5,
  });
}

function boundary(slide, text, y = 6.55, w = CW) {
  t(slide, "边界", M, y, 0.62, 0.3, {
    size: 12,
    bold: true,
    color: C.alert,
  });
  t(slide, text, M + 0.72, y, w - 0.72, 0.3, {
    size: 12,
    color: C.sub,
  });
}

function citations(slide, text) {
  t(slide, text, W - M - 2.3, 7.14, 2.3, 0.24, {
    size: 12,
    face: F,
    color: C.sub,
    align: "right",
  });
}

function sourceLine(slide, text) {
  t(slide, text, M, 7.14, CW - 2.55, 0.24, {
    size: 12,
    color: C.sub,
  });
}

function sectionTitle(slide, number, title, english, lead) {
  t(slide, number, M, 1.80, 1.1, 0.72, {
    size: 40,
    face: FL,
    bold: true,
    color: C.cyanDeep,
  });
  t(slide, title, M + 1.12, 1.82, 9.2, 0.72, {
    size: 32,
    bold: true,
    color: C.navyDeep,
  });
  t(slide, english, M + 1.12, 2.55, 9.2, 0.34, {
    size: 13,
    face: FL,
    color: C.sub,
  });
  hairline(slide, M, 3.08, CW, C.line);
  t(slide, lead, M, 3.33, 10.9, 0.78, {
    size: 14,
    color: C.text,
    line: 21,
  });
}

function noteText(text) {
  return String(text || "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// 01 — Cover with content
// ---------------------------------------------------------------------------
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };
  pageNo += 1;

  t(slide, "GROUP MEETING · LITERATURE SYNTHESIS", M, 0.46, 9.6, 0.32, {
    size: 12,
    face: FL,
    bold: true,
    color: C.cyanDeep,
    spacing: 1.5,
  });
  t(slide, "脑机接口：从可解码到可用\n从替代到闭环修复", M, 1.10, 10.7, 1.45, {
    size: 34,
    bold: true,
    color: C.navyDeep,
    line: 29,
  });
  t(
    slide,
    "2024–2026 年语言、运动、视觉、听觉与意识研究的证据地图",
    M,
    2.72,
    10.5,
    0.44,
    { size: 16, color: C.sub }
  );
  hairline(slide, M, 3.42, CW, C.line);

  const cards = [
    {
      x: M,
      accent: C.cyanDeep,
      title: "已越过“可解码”",
      body: "语音、打字、光幻视和隐蔽认知均已有可重复的神经证据。",
      refs: "[2][3][6][12][17]",
    },
    {
      x: M + 4.08,
      accent: C.amber,
      title: "少数越过“可独立使用”",
      body: "长期居家语音、跨月稳定解码与真实环境视觉使用仍是个例或小队列。",
      refs: "[2][7][11]",
    },
    {
      x: M + 8.16,
      accent: C.alert,
      title: "极少完成“临床归因”",
      body: "随机对照、长期安全性与可复制结局仍是多数方向共同短板。",
      refs: "[8][10][21]",
    },
  ];

  cards.forEach((item) => {
    card(slide, item.x, 3.72, 3.77, 2.25, { fill: WHITE, line: C.line });
    pill(slide, item.x + 0.16, 3.84, 0.78, 0.06, item.accent);
    t(slide, item.title, item.x + 0.24, 4.04, 3.28, 0.48, {
      size: 17,
      bold: true,
      color: C.navyDeep,
    });
    t(slide, item.body, item.x + 0.24, 4.55, 3.28, 0.92, {
      size: 12.5,
      color: C.text,
      line: 18,
    });
    t(slide, item.refs, item.x + 0.24, 5.55, 3.28, 0.28, {
      size: 12,
      color: C.sub,
    });
  });

  t(
    slide,
    "中心论点：下一阶段的竞争不是刷新解码纪录，而是建立长期稳定性、个体化成本、闭环安全性与临床终点。",
    M,
    6.35,
    CW,
    0.52,
    { size: 14, bold: true, color: C.navyDeep, line: 21 }
  );
  t(
    slide,
    "资料范围：38 篇独立精读文献；本稿选取 25 篇核心证据。整理日期：2026-10-17。",
    M,
    7.02,
    CW,
    0.26,
    { size: 12, color: C.sub }
  );

  notes(
    slide,
    "开场先给结论：BCI 的问题已经从能不能解码，变成能不能长期独立使用并证明临床获益。全篇按三道门展开；遇到单例、单臂和预印本时保留限定。25 篇核心证据在末尾尾注统一列出。"
  );
}

// ---------------------------------------------------------------------------
// 02 — Three gates and evidence map
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "全场评价框架",
    "同一把尺子：可解码、可独立使用、临床获益可归因"
  );

  const cols = [
    {
      x: M,
      n: "01",
      title: "可解码",
      color: C.cyanDeep,
      body:
        "问题：神经活动中是否含有稳定信息？\n\n证据：语音、打字、内语、光幻视、隐蔽认知。\n\n已解决程度：多数方向已有明确阳性结果。",
      refs: "[3][6][12][17]",
    },
    {
      x: M + 4.08,
      n: "02",
      title: "可独立使用",
      color: C.amber,
      body:
        "问题：患者能否在家、少标定、长时间使用？\n\n证据：3,800 小时居家语音；至少 3 个月稳定解码；2.7 年视觉使用。\n\n已解决程度：单例或小队列。",
      refs: "[2][7][11]",
    },
    {
      x: M + 8.16,
      n: "03",
      title: "临床获益可归因",
      color: C.alert,
      body:
        "问题：是否有对照、可复制、长期安全并改变结局？\n\n证据：PRIMA 主要终点；DoC 队列与试点。\n\n已解决程度：仍缺随机或假刺激对照。",
      refs: "[8][10][21][22]",
    },
  ];

  cols.forEach((item) => {
    card(slide, item.x, 1.78, 3.77, 4.23, { fill: WHITE, line: C.line });
    t(slide, item.n, item.x + 0.22, 1.95, 0.65, 0.42, {
      size: 17,
      face: FL,
      bold: true,
      color: item.color,
    });
    t(slide, item.title, item.x + 0.93, 1.95, 2.42, 0.46, {
      size: 19,
      bold: true,
      color: C.navyDeep,
    });
    hairline(slide, item.x + 0.22, 2.51, 3.33, C.line);
    t(slide, item.body, item.x + 0.22, 2.72, 3.33, 2.78, {
      size: 12.5,
      color: C.text,
      line: 18,
    });
    t(slide, item.refs, item.x + 0.22, 5.55, 3.33, 0.28, {
      size: 12,
      color: C.sub,
    });
  });

  lightConclusion(
    slide,
    "可解码 ≠ 可独立使用 ≠ 临床有效；后面的每个方向都只回答“已经越过哪一道门”。"
  );
  notes(
    slide,
    "这一页是全场的评价尺子。先明确三个层级，后面语言、运动、视觉、听觉和意识都按同一顺序检查。强调 3,800 小时、3 个月与 2.7 年分别来自不同论文，不能横向当作同一终点。"
  );
}

// ---------------------------------------------------------------------------
// 03 — Act 1 divider with content
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第一幕｜通信与运动",
    "先把“能解出来”变成患者日常可用的交互通道"
  );
  sectionTitle(
    slide,
    "01",
    "通信与运动",
    "COMMUNICATION & MOTOR",
    "这一部分回答：高带宽、长期稳定和持久修复，哪一步已经真正发生？"
  );

  const items = [
    {
      x: M,
      big: "3,800 h",
      label: "ALS 患者无人协助居家使用",
      ref: "[2]",
      color: C.cyanDeep,
    },
    {
      x: M + 4.08,
      big: "110",
      label: "字符/分，最高 QWERTY 打字速度",
      ref: "[6]",
      color: C.amber,
    },
    {
      x: M + 8.16,
      big: ">2 mo",
      label: "关机后仍持续的感觉运动增益",
      ref: "[8]",
      color: C.alert,
    },
  ];
  items.forEach((item) => {
    card(slide, item.x, 4.35, 3.77, 1.58, { fill: WHITE, line: C.line });
    metric(slide, item.big, item.label, item.x + 0.24, 4.47, 3.28, {
      size: 28,
      color: item.color,
      h: 0.58,
    });
  });
  t(
    slide,
    "叙事顺序：居家可用性 → 模型可迁移性 → 高通量数字交互 → 免标定 → 持久修复",
    M,
    6.49,
    CW,
    0.34,
    { size: 13, bold: true, color: C.navyDeep }
  );
  citations(slide, "[2][6][8]");
  notes(
    slide,
    "第一幕不按论文年代，而按“患者关系”推进：先是实验室里的解码，再是居家使用，然后是跨患者模型和持久修复。三个数字只是入口，分别代表使用时长、交互通量和关机后增益。"
  );
}

// ---------------------------------------------------------------------------
// 04 — Speech long-term independent use
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第一幕｜语言重建",
    "长期独立使用：语音 BCI 的主指标从 WER 转向生活能力"
  );

  card(slide, M, 1.75, 7.25, 4.05, { fill: WHITE, line: C.line });
  tinyTag(slide, "Card et al. · Nature Medicine 2026", M + 0.24, 1.9, C.cyanDeep, 4.4);
  t(slide, "一名 ALS 重度构音障碍患者", M + 0.24, 2.25, 5.2, 0.42, {
    size: 18,
    bold: true,
    color: C.navyDeep,
  });

  metric(slide, "3,800 h", "近 2 年居家使用", M + 0.24, 2.82, 2.15, {
    size: 30,
    color: C.cyanDeep,
    h: 0.58,
  });
  metric(slide, "56 wpm", "自由使用平均速度", M + 2.54, 2.82, 2.15, {
    size: 30,
    color: C.navy,
    h: 0.58,
  });
  metric(slide, "92%", "自评句子至少基本正确", M + 4.84, 2.82, 2.05, {
    size: 30,
    color: C.amber,
    h: 0.58,
  });

  hairline(slide, M + 0.24, 4.25, 6.72, C.line);
  t(
    slide,
    "神经信号 → 语音解码文本 + 神经光标 → 个人电脑键鼠事件",
    M + 0.24,
    4.46,
    6.72,
    0.38,
    { size: 13, bold: true, color: C.navyDeep }
  );
  t(
    slide,
    "输出 18.3 万句、196 万词；维持工作、邮件、网页和视频通话。[2]",
    M + 0.24,
    4.98,
    6.72,
    0.72,
    { size: 12.5, color: C.text, line: 18 }
  );

  card(slide, M + 7.5, 1.75, 4.59, 4.05, { fill: WHITE, line: C.line });
  tinyTag(slide, "同时看另一项技术上限", M + 7.74, 1.9, C.amber, 3.9);
  t(slide, "Wairagkar 2025：直接合成声音", M + 7.74, 2.25, 3.9, 0.62, {
    size: 16.5,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "256 个皮层内电极，直接解码声学特征。[3]",
      "问句语调 90.5%；词重音 95.7%。[3]",
      "闭环音频反馈；可改变语调并演唱短旋律。[3]",
      "价值：恢复“像人说话”，而非只恢复文本。",
    ],
    M + 7.74,
    2.95,
    3.88,
    2.5,
    { size: 12, after: 4 }
  );

  boundary(
    slide,
    "单例 ALS；自评无独立金标准；提示词表表现不能等同于自由对话。",
    5.88
  );
  // Keep the conclusion clear of the caveat line.
  lightConclusion(
    slide,
    "长期居家使用证明“可用性”；99% 提示词表准确率与 92% 居家自评必须同时呈现。",
    { y: 6.24, h: 0.64 }
  );
  citations(slide, "[2][3]");
  notes(
    slide,
    "先读三个数字：3,800 小时、56 词每分、92% 自评。然后马上补限定：>99% 是提示性复制任务，不是自由对话；居家内容无法由研究者逐句核验。Wairagkar 把终点从文本推进到有语气的声音，但仍是单例。"
  );
}

// ---------------------------------------------------------------------------
// 05 — Speech scale and expression
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第一幕｜语言重建",
    "从“一个患者一个模型”走向“预训练 + 少样本适配”"
  );

  card(slide, M, 1.74, 6.2, 4.2, { fill: WHITE, line: C.line });
  tinyTag(slide, "规模化证据", M + 0.24, 1.88, C.cyanDeep, 2.0);
  t(slide, "Fogg 2026：多用户语音解码器", M + 0.24, 2.22, 5.5, 0.42, {
    size: 18,
    bold: true,
    color: C.navyDeep,
  });
  metric(slide, "6 users", "跨病因、性别与说话策略联合训练", M + 0.24, 2.82, 2.0, {
    size: 29,
    color: C.cyanDeep,
    h: 0.56,
  });
  metric(slide, ">50%", "相对单用户模型的 WER 降幅", M + 2.42, 2.82, 2.0, {
    size: 29,
    color: C.navy,
    h: 0.56,
  });
  metric(slide, "<7%", "新用户 <200 句微调后的 WER", M + 4.54, 2.82, 1.42, {
    size: 29,
    color: C.amber,
    h: 0.56,
  });
  t(
    slide,
    "真正的瓶颈从“解码上限”转成“装机到可用的数据成本”。[4]",
    M + 0.24,
    4.16,
    5.72,
    0.62,
    { size: 13, bold: true, color: C.navyDeep, line: 19.5 }
  );
  boundary(slide, "预印本；同类 NeuroPort 阵列；以会话英语为主。", 5.44, 6.18);

  card(slide, M + 6.48, 1.74, 5.61, 1.95, { fill: WHITE, line: C.line });
  t(slide, "Srinivasan 2026：音量与说话模式", M + 6.72, 1.9, 5.1, 0.38, {
    size: 16.5,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "2 名参与者；模式/音量解码 94%、89%。[5]",
      "闭环音量在线 94%；发声前 640/270 ms 已达 80%。[5]",
    ],
    M + 6.72,
    2.35,
    5.0,
    1.08,
    { size: 12, after: 3 }
  );

  card(slide, M + 6.48, 3.89, 5.61, 2.05, { fill: WHITE, line: C.line });
  t(slide, "Kunz 2025：内语能力与隐私边界", M + 6.72, 4.05, 5.1, 0.38, {
    size: 16.5,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "4 名参与者；内语与尝试说话共享大部分编码。[19]",
      "移除 motor-intent 可降低泄漏；仍属离线验证。",
      "边界：内语可解 ≠ 可自由读心。",
    ],
    M + 6.72,
    4.48,
    5.0,
    1.2,
    { size: 12, after: 3 }
  );

  lightConclusion(
    slide,
    "语音方向的下一站是跨硬件/跨语言泛化，以及在线可验证的心理隐私保护。"
  );
  citations(slide, "[4][5][19]");
  notes(
    slide,
    "左侧是规模化，右侧是表达力和隐私。Fogg 的关键不是平均提升，而是每位参与者都优于个体模型，并且新用户只需不到 200 句。Srinivasan 与 Kunz 说明音量、模式和内语可能成为第二信息通道，但隐私防线还没有在线验证。"
  );
}

// ---------------------------------------------------------------------------
// 06 — Motor throughput and stability
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第一幕｜运动重建",
    "通量解决“能不能用”，无监督对齐解决“能不能一直用”"
  );

  card(slide, M, 1.74, 6.1, 4.22, { fill: WHITE, line: C.line });
  tinyTag(slide, "交互通量", M + 0.24, 1.89, C.cyanDeep, 1.5);
  t(slide, "Jude 2026：双手 QWERTY 神经假体", M + 0.24, 2.23, 5.4, 0.42, {
    size: 18,
    bold: true,
    color: C.navyDeep,
  });
  metric(slide, "110", "字符/分；约 22 词/分", M + 0.24, 2.84, 2.1, {
    size: 34,
    color: C.cyanDeep,
    h: 0.66,
  });
  metric(slide, "1.6%", "最优参与者词错误率", M + 2.55, 2.84, 2.0, {
    size: 34,
    color: C.amber,
    h: 0.66,
  });
  metric(slide, "30", "标定句子数", M + 4.75, 2.84, 1.15, {
    size: 34,
    color: C.navy,
    h: 0.66,
  });
  bullets(
    slide,
    [
      "两名参与者：T17 为 ALS，T18 为颈段脊髓损伤。[6]",
      "同一范式高于此前手写解码的约 90 字符/分。[6]",
      "逐日在线训练可缓解漂移，但尚非完全免标定。",
    ],
    M + 0.24,
    4.08,
    5.55,
    1.48,
    { size: 12, after: 4 }
  );

  card(slide, M + 6.38, 1.74, 5.71, 4.22, { fill: WHITE, line: C.line });
  tinyTag(slide, "长期稳定性", M + 6.62, 1.89, C.amber, 1.5);
  t(slide, "Karpowicz 2025：NoMAD", M + 6.62, 2.23, 5.0, 0.42, {
    size: 18,
    bold: true,
    color: C.navyDeep,
  });
  t(slide, "无监督潜在动力学对齐", M + 6.62, 2.72, 5.0, 0.34, {
    size: 13,
    color: C.sub,
  });

  const stabilityRows = [
    ["NoMAD", "≥3 个月稳定", C.navy],
    ["Aligned FA", "半衰期 45.1 天", C.sub],
    ["ADAN", "半衰期 7.12 天；15 次失败", C.alert],
  ];
  stabilityRows.forEach((row, i) => {
    const yy = 3.34 + i * 0.78;
    card(slide, M + 6.62, yy, 5.0, 0.58, {
      fill: i === 0 ? C.navyPale : WHITE,
      line: i === 0 ? C.navyPale : C.line,
    });
    t(slide, row[0], M + 6.78, yy, 1.32, 0.58, {
      size: 12,
      face: FL,
      bold: true,
      color: row[2],
      valign: "middle",
    });
    t(slide, row[1], M + 8.15, yy, 3.25, 0.58, {
      size: 12,
      color: C.text,
      valign: "middle",
    });
  });
  t(
    slide,
    "主要长期证据来自猴；人类数据用于闭环演示。[7]",
    M + 6.62,
    5.62,
    5.0,
    0.28,
    { size: 12, color: C.sub }
  );

  lightConclusion(
    slide,
    "运动方向的工程瓶颈正在从“速度不够”转为“标定成本、跨日稳定和多任务复用”。"
  );
  citations(slide, "[6][7]");
  notes(
    slide,
    "Jude 2026 用 110 字符每分和 30 句标定证明高速交互；Karpowicz 2025 则把稳定性量化成半衰期。要明确：NoMAD 的长期结果来自猴，不是人体长期随访。"
  );
}

// ---------------------------------------------------------------------------
// 07 — Motor repair
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第一幕｜运动重建",
    "从实时替代到持久修复：关机之后还剩下什么？"
  );

  card(slide, M, 1.74, 8.1, 2.38, { fill: WHITE, line: C.line });
  tinyTag(slide, "Chandrasekaran 2026 · 双重神经旁路", M + 0.24, 1.88, C.cyanDeep, 3.2);

  const nodes = [
    { x: M + 0.3, title: "运动意图", sub: "M1 皮层阵列" },
    { x: M + 2.18, title: "模式化刺激", sub: "脊髓 + 皮层" },
    { x: M + 4.08, title: "自身手部", sub: "抓握与进食" },
    { x: M + 5.98, title: "触觉闭环", sub: "S1 微刺激" },
  ];
  nodes.forEach((node, i) => {
    card(slide, node.x, 2.34, 1.45, 0.98, { fill: C.navyPale, line: C.navyPale });
    t(slide, node.title, node.x + 0.1, 2.48, 1.25, 0.32, {
      size: 12,
      bold: true,
      color: C.navyDeep,
      align: "center",
    });
    t(slide, node.sub, node.x + 0.1, 2.82, 1.25, 0.28, {
      size: 12,
      color: C.sub,
      align: "center",
    });
    if (i < nodes.length - 1) {
      t(slide, "→", node.x + 1.51, 2.57, 0.58, 0.42, {
        size: 20,
        face: F,
        color: C.cyanDeep,
        align: "center",
      });
    }
  });
  t(
    slide,
    "单例、开放标签、三种干预同时施加；无法拆分各自贡献。[8]",
    M + 0.24,
    3.55,
    7.55,
    0.28,
    { size: 12, color: C.sub }
  );

  card(slide, M + 8.36, 1.74, 3.73, 2.38, { fill: WHITE, line: C.line });
  metric(slide, ">2 mo", "关机后增益持续", M + 8.6, 1.98, 2.9, {
    size: 32,
    color: C.alert,
    h: 0.58,
  });
  t(slide, "肘屈曲与腕部触觉改善", M + 8.6, 3.34, 3.12, 0.58, {
    size: 13,
    bold: true,
    color: C.navyDeep,
    line: 19.5,
  });

  card(slide, M, 4.35, 5.95, 1.68, { fill: WHITE, line: C.line });
  t(slide, "RehabSwift：非侵入康复路线", M + 0.24, 4.5, 5.3, 0.36, {
    size: 16,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "12 名慢性期卒中患者、18 次训练；FMA-UE 36.75 → 45.08 → 46.17。[9]",
      "75% 达到 MCID，但无对照组，疗效不能单独归因于 BCI。[9]",
    ],
    M + 0.24,
    4.94,
    5.45,
    1.04,
    { size: 12, after: 2 }
  );

  card(slide, M + 6.22, 4.35, 5.87, 1.68, { fill: WHITE, line: C.line });
  t(slide, "新的方法学问题", M + 6.46, 4.5, 5.2, 0.36, {
    size: 16,
    bold: true,
    color: C.navyDeep,
  });
  t(
    slide,
    "若终点只看“系统开启时的任务成功”，替代与修复将始终混在一起；关机后增益可能成为独立终点。",
    M + 6.46,
    4.95,
    5.2,
    0.78,
    { size: 12.5, color: C.text, line: 18 }
  );

  lightConclusion(
    slide,
    "从“接上外部装置”转向“让神经系统恢复一点”，首先需要新的终点体系。"
  );
  sourceLine(slide, "本汇报推论：以系统关闭后的残留功能作为修复终点，需另行前瞻验证。");
  citations(slide, "[8][9]");
  notes(
    slide,
    "这一页的关键不是单例治愈，而是终点发生了变化。Chandrasekaran 报告关机后仍有增益，但组合干预无法归因；RehabSwift 提供另一条康复路线，同样缺少对照。最后提出本汇报推论：关机后残留增益值得单独定义。"
  );
}

// ---------------------------------------------------------------------------
// 08 — Act 2 divider with mismatch
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第二幕｜感觉重建",
    "视觉开始给出临床终点，听觉仍是“器件成熟、闭环早期”"
  );
  sectionTitle(
    slide,
    "02",
    "视觉与听觉",
    "VISION & HEARING",
    "这一部分回答：器件、算法、功能结局和闭环控制，成熟度为何彼此错位？"
  );

  const items = [
    {
      x: M,
      big: "81.3%",
      label: "PRIMA 获得临床显著视力改善",
      ref: "[10]",
      color: C.cyanDeep,
    },
    {
      x: M + 4.08,
      big: "92.39%",
      label: "术前 MRI 预测儿童语言结局",
      ref: "[13]",
      color: C.amber,
    },
    {
      x: M + 8.16,
      big: "22 / 1 h",
      label: "无创闭环听觉注意的唯一基准",
      ref: "[15]",
      color: C.alert,
    },
  ];
  items.forEach((item) => {
    card(slide, item.x, 4.35, 3.77, 1.58, { fill: WHITE, line: C.line });
    metric(slide, item.big, item.label, item.x + 0.24, 4.47, 3.28, {
      size: 26,
      color: item.color,
      h: 0.56,
    });
  });
  t(
    slide,
    "核心矛盾：有临床终点，不等于闭环可控；器件成熟，不等于控制成熟。",
    M,
    6.49,
    CW,
    0.34,
    { size: 13, bold: true, color: C.navyDeep }
  );
  citations(slide, "[10][13][15]");
  notes(
    slide,
    "第二幕的角色是展示成熟度错位。视觉已经出现像药物试验一样的临床终点，听觉的人工耳蜗和预测模型也很成熟，但真正闭环的听觉注意控制仍只有单次健康人实验。"
  );
}

// ---------------------------------------------------------------------------
// 09 — Vision clinical endpoint
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第二幕｜视觉重建",
    "视网膜路线先到达临床终点：81.3% 出现显著视力改善"
  );

  card(slide, M, 1.74, 7.05, 4.13, { fill: WHITE, line: C.line });
  tinyTag(slide, "PRIMA · NEJM 2026 · n=38", M + 0.24, 1.9, C.cyanDeep, 3.0);
  metric(slide, "81.3%", "12 个月获得 ≥logMAR 0.2 改善", M + 0.24, 2.3, 2.6, {
    size: 36,
    color: C.cyanDeep,
    h: 0.68,
  });
  metric(slide, "+24.5", "平均改善字母数", M + 3.04, 2.3, 1.7, {
    size: 36,
    color: C.navy,
    h: 0.68,
  });
  metric(slide, "1.32", "平均假体视力 logMAR", M + 4.80, 2.3, 1.95, {
    size: 36,
    color: C.amber,
    h: 0.68,
  });
  t(
    slide,
    "主要终点的成功阈值预设为 50%；周边自然视力与基线无显著变化。[10]",
    M + 0.24,
    3.55,
    6.5,
    0.48,
    { size: 13, color: C.text, line: 19.5 }
  );
  t(
    slide,
    "6 人未完成 12 个月评估（3 例死亡）；作者使用多重插补。[10]",
    M + 0.24,
    4.18,
    6.5,
    0.34,
    { size: 12, color: C.sub }
  );
  boundary(
    slide,
    "开放标签、单臂、基线对照；主要终点是视力表，不是独立生活能力。",
    5.13,
    6.8
  );

  card(slide, M + 7.3, 1.74, 4.79, 2.68, { fill: WHITE, line: C.line });
  tinyTag(slide, "长期功能结局", M + 7.54, 1.9, C.amber, 2.2);
  t(slide, "44 通道脉络膜上假体", M + 7.54, 2.28, 4.2, 0.38, {
    size: 17,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "4 例；随访 2.7 年；无装置相关 SAE。[11]",
      "4/4 定位改善；2/4 空间辨别与物体识别改善。[11]",
      "可见无人协助下的新环境探索与障碍回避。[11]",
    ],
    M + 7.54,
    2.78,
    4.42,
    1.45,
    { size: 12, after: 3 }
  );

  card(slide, M + 7.3, 4.46, 4.79, 1.28, { fill: WHITE, line: C.line });
  t(slide, "证据轴", M + 7.54, 4.6, 1.0, 0.3, {
    size: 12,
    bold: true,
    color: C.cyanDeep,
  });
  t(
    slide,
    "动物机制 → 2 例双向 V1 → 4 例长期功能 → 38 例主要终点",
    M + 7.54,
    4.99,
    4.2,
    0.54,
    { size: 12.5, bold: true, color: C.navyDeep, line: 18 }
  );

  lightConclusion(
    slide,
    "视觉领域第一次有了可跨路线比较的临床基准；但它只覆盖视网膜下游通路仍可用的患者。"
  );
  citations(slide, "[10][11]");
  notes(
    slide,
    "PRIMA 是视觉部分的核心基准。读 81.3%、24.5 个字母和 logMAR 1.32。然后补边界：单臂、开放标签、6 人未完成、主要终点是视力表。Petoe 提供长期功能结局，但只有 4 例。"
  );
}

// ---------------------------------------------------------------------------
// 10 — Cortical visual control
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第二幕｜视觉重建",
    "皮层路线从“诱发光点”走向“预测并控制患者看到了什么”"
  );

  const flow = [
    { x: M, title: "刺激参数", sub: "V1 100 电极" },
    { x: M + 2.58, title: "邻近神经活动", sub: "同步记录" },
    { x: M + 5.16, title: "主观光幻视", sub: "阈值 / 亮度 / 数量" },
  ];
  flow.forEach((item, i) => {
    card(slide, item.x, 1.83, 2.1, 1.05, { fill: C.navyPale, line: C.navyPale });
    t(slide, item.title, item.x + 0.14, 2.02, 1.82, 0.34, {
      size: 14,
      bold: true,
      color: C.navyDeep,
      align: "center",
    });
    t(slide, item.sub, item.x + 0.14, 2.42, 1.82, 0.28, {
      size: 12,
      color: C.sub,
      align: "center",
    });
    if (i < flow.length - 1) {
      t(slide, "→", item.x + 2.11, 2.12, 0.44, 0.42, {
        size: 20,
        color: C.cyanDeep,
        align: "center",
      });
    }
  });
  t(
    slide,
    "Grani 2025：2 名盲人志愿者，植入 6 个月后取出。[12]",
    M,
    3.22,
    CW,
    0.34,
    { size: 12.5, color: C.sub }
  );

  card(slide, M, 3.78, 6.0, 1.95, { fill: WHITE, line: C.line });
  t(slide, "已经证明", M + 0.24, 3.94, 1.3, 0.34, {
    size: 13,
    bold: true,
    color: C.cyanDeep,
  });
  bullets(
    slide,
    [
      "阈值、亮度、光幻视数量可由神经活动预测。[12]",
      "假刺激误报率低，支持感知由刺激引起。",
      "两次独立光幻视最小间隔：0.30 / 0.33 秒。[12]",
    ],
    M + 0.24,
    4.38,
    5.4,
    1.12,
    { size: 12, after: 3 }
  );

  card(slide, M + 6.25, 3.78, 5.84, 1.95, { fill: WHITE, line: C.line });
  t(slide, "尚不能宣称", M + 6.49, 3.94, 1.8, 0.34, {
    size: 13,
    bold: true,
    color: C.alert,
  });
  bullets(
    slide,
    [
      "两例、短期植入，长期安全未知。",
      "统计预测不等于实时闭环控制。",
      "尚未完成“图像 → 光幻视”正向模型的人体验证。",
    ],
    M + 6.49,
    4.38,
    5.2,
    1.12,
    { size: 12, after: 3 }
  );

  lightConclusion(
    slide,
    "皮层视觉的下一步不是增加更多仿真指标，而是用人体配对数据校准刺激—感知模型。"
  );
  sourceLine(slide, "本汇报推论：Grani 的神经—感知配对数据可成为 MindSight 类算法的校准集。");
  citations(slide, "[12]");
  notes(
    slide,
    "Grani 的关键是把单向刺激变成刺激加记录，并证明主观光幻视的一些属性可从神经活动预测。它仍然不是完整闭环，且只有两例、六个月。最后的算法校准建议是本汇报推论。"
  );
}

// ---------------------------------------------------------------------------
// 11 — Hearing maturity mismatch
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第二幕｜听觉重建",
    "人工耳蜗很成熟，但闭环听觉 BCI 仍处在第一次实验"
  );

  const cols = [
    {
      x: M,
      eyebrow: "临床器件 + 预后",
      title: "术前 MRI 预测语言结局",
      big: "278",
      bigLabel: "儿童；3 国、3 语言",
      body:
        "融合模型准确率 92.39%，AUC 0.98；纯临床模型仅 53.57%。[13]\n\n仍缺外部独立验证与临床流程整合。",
      color: C.cyanDeep,
    },
    {
      x: M + 4.08,
      eyebrow: "AI 落地缺口",
      title: "系统综述",
      big: "20",
      bigLabel: "项人工耳蜗机器学习研究",
      body:
        "影像预测与语音增强有前景，但没有任何模型进入人工耳蜗编程流程。[14]\n\n缺口是工程与流程，不只是算法。",
      color: C.amber,
    },
    {
      x: M + 8.16,
      eyebrow: "真正闭环",
      title: "EEG 听觉注意反馈",
      big: "22",
      bigLabel: "名听力正常者；单次 1 小时",
      body:
        "干扰者神经追踪显著下降；目标者追踪未显著增强。[15]\n\n结果更像“抑制干扰”，不是“增强目标”。",
      color: C.alert,
    },
  ];

  cols.forEach((item) => {
    card(slide, item.x, 1.74, 3.77, 4.3, { fill: WHITE, line: C.line });
    tinyTag(slide, item.eyebrow, item.x + 0.22, 1.9, item.color, 3.2);
    t(slide, item.title, item.x + 0.22, 2.3, 3.28, 0.44, {
      size: 17,
      bold: true,
      color: C.navyDeep,
    });
    metric(slide, item.big, item.bigLabel, item.x + 0.22, 2.9, 2.9, {
      size: 32,
      color: item.color,
      h: 0.58,
    });
    t(slide, item.body, item.x + 0.22, 4.2, 3.28, 1.38, {
      size: 12.5,
      color: C.text,
      line: 18,
    });
  });

  t(
    slide,
    "儿童 ABI 的另一个现实：作者中心约 50% 植入儿童最终不使用装置。[16]",
    M,
    6.08,
    CW,
    0.28,
    { size: 12, color: C.sub }
  );
  lightConclusion(
    slide,
    "Mature device ≠ mature closed-loop BCI；听觉方向的临床价值很大，但闭环机制仍未确立。",
    { y: 6.4, h: 0.62 }
  );
  citations(slide, "[13][14][15][16]");
  notes(
    slide,
    "听觉要拆成三层：成熟器件与预测、AI 进入流程的缺口、真正的闭环控制。278 名儿童的高准确率并不等于临床采用；22 人单次实验也不等于注意训练。ABI 的 50% 不使用率说明功能目标必须保守。"
  );
}

// ---------------------------------------------------------------------------
// 12 — Act 3 divider with content
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第三幕｜意识",
    "从“有没有意识”到“正在加工什么”，每一步都更难"
  );
  sectionTitle(
    slide,
    "03",
    "意识检测、促醒与内容",
    "DETECT · INTERVENE · DECODE",
    "这一部分回答：我们能否发现隐蔽认知、改变意识状态，并在不越过证据边界的情况下解码内容？"
  );

  const steps = [
    {
      x: M,
      n: "25%",
      title: "发现隐蔽认知",
      body: "241 名行为无指令反应者中 60 名检出 CMD。[1]",
      color: C.cyanDeep,
    },
    {
      x: M + 4.08,
      n: "44.7%",
      title: "尝试促醒",
      body: "CM-Pf/CL DBS 应答率约 44.7%，但仍无 RCT。[21]",
      color: C.amber,
    },
    {
      x: M + 8.16,
      n: "4 levels",
      title: "解码内容",
      body: "状态 → 指令 → 语义内容 → 主观体验；最后一级无 ground truth。[23]",
      color: C.alert,
    },
  ];
  steps.forEach((item) => {
    card(slide, item.x, 4.3, 3.77, 1.62, { fill: WHITE, line: C.line });
    metric(slide, item.n, item.title, item.x + 0.22, 4.44, 3.25, {
      size: 25,
      color: item.color,
      h: 0.48,
    });
    t(slide, item.body, item.x + 0.22, 5.23, 3.25, 0.55, {
      size: 12,
      color: C.sub,
      line: 17,
    });
  });
  t(
    slide,
    "叙事顺序：检测 → 干预 → 内容；技术越接近主观体验，证据标准必须越严格。",
    M,
    6.5,
    CW,
    0.34,
    { size: 13, bold: true, color: C.navyDeep }
  );
  citations(slide, "[1][21][23]");
  notes(
    slide,
    "第三幕是从可观察状态走向主观体验。先发现隐蔽认知，再尝试改变意识状态，最后才谈内容解码。四层阶梯是防止概念混淆的关键。"
  );
}

// ---------------------------------------------------------------------------
// 13 — Detect covert consciousness
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第三幕｜意识检测",
    "没有动作反应，不等于没有认知：BCI 开始成为“认知探针”"
  );

  card(slide, M, 1.74, 6.1, 4.06, { fill: WHITE, line: C.line });
  tinyTag(slide, "Bodien 2024 · NEJM · 多中心", M + 0.24, 1.9, C.cyanDeep, 3.5);
  metric(slide, "353", "意识障碍患者", M + 0.24, 2.36, 1.75, {
    size: 34,
    color: C.navy,
    h: 0.66,
  });
  metric(slide, "241", "行为上无指令反应", M + 2.18, 2.36, 1.82, {
    size: 34,
    color: C.cyanDeep,
    h: 0.66,
  });
  metric(slide, "60", "检出 CMD；占 25%", M + 4.15, 2.36, 1.62, {
    size: 34,
    color: C.alert,
    h: 0.66,
  });
  t(
    slide,
    "“认知—运动分离”：患者能理解并执行心理任务，但受损的输出通路无法显示动作。[1]",
    M + 0.24,
    3.55,
    5.55,
    0.72,
    { size: 13, color: C.text, line: 19.5 }
  );
  bullets(
    slide,
    [
      "11 名仅 fMRI；13 名仅 EEG；36 名 EEG + fMRI 阳性。[1]",
      "单次阴性不能证明无意识；任务理解、疲劳与镇静均可导致假阴性。",
    ],
    M + 0.24,
    4.42,
    5.55,
    1.08,
    { size: 12, after: 3 }
  );

  card(slide, M + 6.38, 1.74, 5.71, 4.06, { fill: WHITE, line: C.line });
  tinyTag(slide, "du Bois 2026 · 可穿戴 EEG-BCI", M + 6.62, 1.9, C.amber, 3.5);
  metric(slide, "44", "参与者；UWS 14 / MCS 17 / LIS 11", M + 6.62, 2.36, 4.9, {
    size: 30,
    color: C.navy,
    h: 0.66,
  });
  metric(slide, "73.8%", "获得显著运动想象解码", M + 6.62, 3.28, 2.15, {
    size: 30,
    color: C.cyanDeep,
    h: 0.66,
  });
  metric(slide, "39→69%", "MCS 灵敏度提升", M + 9.02, 3.28, 2.35, {
    size: 28,
    color: C.alert,
    h: 0.66,
  });
  t(
    slide,
    "融合后平衡诊断准确率 55% → 62%。[17]",
    M + 6.62,
    4.52,
    5.0,
    0.62,
    { size: 13, color: C.text, line: 19.5 }
  );
  budgetLine(slide);

  lightConclusion(
    slide,
    "BCI 的价值不是替代临床诊断，而是补充行为评估漏掉的认知活动。"
  );
  citations(slide, "[1][17]");
  notes(
    slide,
    "左侧先讲 353、241、60，得到 25% 的 CMD。右侧讲可穿戴 EEG-BCI：73.8% 有显著解码，融合行为评估后 MCS 灵敏度从 39% 到 69%。必须强调 BCI 阴性不等于无意识。"
  );
}

function budgetLine(slide) {
  t(slide, "边界：BCI 表现不是意识的直接生物标志物。", M + 6.62, 5.13, 5.0, 0.28, {
    size: 12,
    color: C.alert,
  });
}

// ---------------------------------------------------------------------------
// 14 — Neuromodulation
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第三幕｜意识促醒",
    "从解剖核团到网络与电场：机制正在变清楚，疗效仍未确立"
  );

  const cols = [
    {
      x: M,
      title: "哪里刺激",
      ref: "Warren 2025 · n=40",
      big: "VTT",
      body:
        "有效电场需越过 CM，覆盖 PF 下核与腹侧被盖束；纹状体保留更好者更可能改善。[18]\n\n回顾性；关键体素未通过 FDR。",
      color: C.cyanDeep,
    },
    {
      x: M + 4.08,
      title: "为什么有效",
      ref: "Zhang 2025 · n=23",
      big: "θ rhythm",
      body:
        "中央丘脑 θ 节律跨病因解释恢复差异，并识别早期表现差但最终恢复的亚组。[19]\n\n直接记录，但样本与指征存在选择偏倚。",
      color: C.amber,
    },
    {
      x: M + 8.16,
      title: "何时会失效",
      ref: "Wang 2025 · 29 例 / 682 位点",
      big: "burst / tonic",
      body:
        "爆发与强直放电分别关联意识状态、丘脑皮层连接和恢复。[20]\n\n记录在术中麻醉停药后，非日常觉醒状态。",
      color: C.alert,
    },
  ];
  cols.forEach((item) => {
    card(slide, item.x, 1.74, 3.77, 3.6, { fill: WHITE, line: C.line });
    t(slide, item.title, item.x + 0.22, 1.9, 3.25, 0.32, {
      size: 13,
      bold: true,
      color: item.color,
    });
    t(slide, item.ref, item.x + 0.22, 2.24, 3.25, 0.28, {
      size: 12,
      color: C.sub,
    });
    t(slide, item.big, item.x + 0.22, 2.66, 3.25, 0.52, {
      size: 24,
      face: FL,
      bold: true,
      color: C.navyDeep,
    });
    t(slide, item.body, item.x + 0.22, 3.36, 3.25, 1.48, {
      size: 12,
      color: C.text,
      line: 18,
    });
  });

  card(slide, M, 5.54, CW, 0.78, { fill: C.amberPale, line: C.amberPale });
  pill(slide, M + 0.14, 5.66, 0.075, 0.54, C.amber);
  t(
    slide,
    "证据坐标：CM-Pf/CL DBS 应答约 44.7%，仍无 RCT；唯一 Level 1 证据来自药物；TIS 仅 9 例、10 天试点。",
    M + 0.38,
    5.54,
    CW - 0.58,
    0.78,
    { size: 12.5, bold: true, color: C.navyDeep, valign: "middle", line: 18 }
  );
  t(
    slide,
    "本汇报推论：下一步应按病因、病程、CRS-R 分级和网络完整性分层，而不是继续汇总单臂病例。",
    M,
    6.5,
    CW,
    0.34,
    { size: 12, color: C.sub }
  );
  citations(slide, "[18][19][20][21][22]");
  notes(
    slide,
    "三栏分别回答哪里刺激、为什么有效、何时失效。把 Warren、Zhang、Wang 放在一起，才能看到丘脑—脑干—皮层通路的收敛。底部必须同时给出证据坐标：DBS 约 44.7% 应答但无 RCT，药物是唯一 Level 1，TIS 只有九例十天。"
  );
}

// ---------------------------------------------------------------------------
// 15 — Content decoding boundaries
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "第三幕｜意识内容",
    "从状态到内容：可解码、可重建语义，仍不等于可证明主观体验"
  );

  const levels = [
    {
      y: 1.82,
      n: "01",
      title: "状态检测",
      body: "UWS / MCS / LIS / CMD",
      evidence: "Bodien 2024",
      fill: C.cyanPale,
      accent: C.cyanDeep,
    },
    {
      y: 2.68,
      n: "02",
      title: "指令执行",
      body: "运动想象、yes/no、命令跟随",
      evidence: "du Bois 2026",
      fill: C.navyPale,
      accent: C.navy,
    },
    {
      y: 3.54,
      n: "03",
      title: "语义内容",
      body: "理解或想象的词语与概念",
      evidence: "Tang 2023",
      fill: C.amberPale,
      accent: C.amber,
    },
    {
      y: 4.40,
      n: "04",
      title: "意识体验",
      body: "患者此刻真正体验到了什么",
      evidence: "无可靠标准",
      fill: "FBE9E5",
      accent: C.alert,
    },
  ];

  levels.forEach((row) => {
    card(slide, M, row.y, 6.25, 0.7, { fill: row.fill, line: row.fill });
    t(slide, row.n, M + 0.18, row.y, 0.48, 0.7, {
      size: 13,
      face: FL,
      bold: true,
      color: row.accent,
      valign: "middle",
    });
    t(slide, row.title, M + 0.78, row.y, 1.42, 0.7, {
      size: 14,
      bold: true,
      color: C.navyDeep,
      valign: "middle",
    });
    t(slide, row.body, M + 2.24, row.y, 2.72, 0.7, {
      size: 12,
      color: C.text,
      valign: "middle",
    });
    t(slide, row.evidence, M + 4.98, row.y, 1.1, 0.7, {
      size: 12,
      color: row.accent,
      valign: "middle",
      align: "right",
    });
  });

  card(slide, M + 6.58, 1.82, 5.51, 1.55, { fill: WHITE, line: C.line });
  t(slide, "Tang 2023：语义重建", M + 6.82, 1.98, 5.0, 0.38, {
    size: 16.5,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "fMRI 重建连续语言含义，而非逐字转录。[24]",
      "跨听觉、视觉与想象语言；语义一致 ≠ 主观体验。",
    ],
    M + 6.82,
    2.42,
    4.95,
    0.9,
    { size: 12, after: 2 }
  );

  card(slide, M + 6.58, 3.55, 5.51, 1.55, { fill: WHITE, line: C.line });
  t(slide, "Littlejohn 2025：流式交流", M + 6.82, 3.71, 5.0, 0.38, {
    size: 16.5,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "80 ms 增量解码；约 46.5 词/分。[25]",
      "无需独立起始检测，但仍需主动尝试说话。",
    ],
    M + 6.82,
    4.15,
    4.95,
    0.9,
    { size: 12, after: 2 }
  );

  t(
    slide,
    "最关键的科学边界：可解码、可执行、可重建语义，都不自动等于可证明主观意识。[23]",
    M,
    5.43,
    CW,
    0.46,
    { size: 13, bold: true, color: C.alert, line: 19.5 }
  );
  lightConclusion(
    slide,
    "意识内容的 ground truth 必须依靠无报告范式、掩蔽、无意识对照和跨模态验证共同建立。",
    { y: 6.12 }
  );
  citations(slide, "[23][24][25]");
  notes(
    slide,
    "左侧是四级阶梯，必须逐层讲。状态、指令、语义已经有证据；第四层意识体验没有可靠 ground truth。Tang 能重建语义，Littlejohn 能做流式输出，但都不能证明主观体验。Kronemer 的 no-report 与对照设计是这里的核心。"
  );
}

// ---------------------------------------------------------------------------
// 16 — Synthesis
// ---------------------------------------------------------------------------
{
  const slide = whiteSlide(
    "全场综合",
    "四条趋势正在汇合，但真正待解的是“证据如何闭环”"
  );

  const trends = [
    {
      title: "精度 → 可用性",
      body: "居家时长、标定成本、真实环境使用",
      refs: "[2][6][11]",
    },
    {
      title: "个体模型 → 共享预训练",
      body: "多用户解码、潜在动力学、电场建模",
      refs: "[4][7][18]",
    },
    {
      title: "解剖核团 → 网络靶点",
      body: "丘脑—脑干—皮层通路与功能连接",
      refs: "[18][19][21]",
    },
    {
      title: "开环刺激 → 闭环控制",
      body: "感觉反馈、声音反馈、注意反馈、再检测",
      refs: "[3][8][15]",
    },
  ];

  trends.forEach((item, i) => {
    const x = M + (i % 2) * 4.08;
    const y = 1.76 + Math.floor(i / 2) * 1.48;
    card(slide, x, y, 3.77, 1.2, { fill: WHITE, line: C.line });
    t(slide, `0${i + 1}`, x + 0.2, y + 0.16, 0.45, 0.3, {
      size: 12,
      face: FL,
      bold: true,
      color: i % 2 === 0 ? C.cyanDeep : C.amber,
    });
    t(slide, item.title, x + 0.72, y + 0.13, 2.78, 0.36, {
      size: 14.5,
      bold: true,
      color: C.navyDeep,
    });
    t(slide, item.body, x + 0.72, y + 0.54, 2.78, 0.45, {
      size: 12,
      color: C.text,
    });
  });

  card(slide, M + 8.16, 1.76, 3.77, 2.76, { fill: C.navyPale, line: C.navyPale });
  t(slide, "本汇报推论", M + 8.42, 1.96, 3.2, 0.32, {
    size: 12,
    bold: true,
    color: C.cyanDeep,
  });
  t(
    slide,
    "下一阶段的竞争，不是一个更高的单指标，而是能否同时证明：\n\n长期稳定\n个体化成本可控\n闭环安全\n临床终点可重复",
    M + 8.42,
    2.38,
    3.2,
    1.92,
    { size: 14, bold: true, color: C.navyDeep, line: 21 }
  );

  t(slide, "留给组会的三个问题", M, 4.82, 3.4, 0.36, {
    size: 15,
    bold: true,
    color: C.navyDeep,
  });
  bullets(
    slide,
    [
      "关机后残留增益能否成为神经假体的独立终点？[8]",
      "语音共享表征来自生物学共性，还是同一硬件阵列？[4]",
      "意识内容何时能拥有不依赖行为的 ground truth？[23]",
    ],
    M,
    5.24,
    7.45,
    1.2,
    { size: 12.5, after: 4 }
  );

  card(slide, M + 7.78, 4.70, 4.15, 1.78, { fill: WHITE, line: C.line });
  t(slide, "最终判断", M + 8.02, 4.93, 3.65, 0.32, {
    size: 12,
    bold: true,
    color: C.alert,
  });
  t(
    slide,
    "BCI 正从“实验室可解码”进入“临床可用性”的验证期；证据质量将比单点性能更决定技术价值。",
    M + 8.02,
    5.36,
    3.65,
    0.96,
    { size: 13, bold: true, color: C.navyDeep, line: 19.5 }
  );
  citations(slide, "[2][4][6][8][10][18][23]");
  notes(
    slide,
    "最后只留五个趋势和三个问题。这一页右上是本汇报推论，不是单篇论文结论。最终落点是：单点性能不再决定技术价值，证据闭环才是下一阶段的门槛。"
  );
}

// ---------------------------------------------------------------------------
// 17–19 — Endnotes
// ---------------------------------------------------------------------------
const references = [
  "[1] Bodien YG, Allanson J, Cardone P, et al. Cognitive Motor Dissociation in Disorders of Consciousness. N Engl J Med. 2024;391(7):598–608. doi:10.1056/NEJMoa2400645.",
  "[2] Card NS, Singer-Clark T, Peracha H, et al. Long-term independent use of an intracortical brain-computer interface for speech and cursor control. Nat Med. 2026;32(7):2504–2510. doi:10.1038/s41591-026-04414-6.",
  "[3] Wairagkar M, Card NS, Singer-Clark T, et al. An instantaneous voice-synthesis neuroprosthesis. Nature. 2025;644(8075):145–152. doi:10.1038/s41586-025-09127-3.",
  "[4] Fogg ZM, Card NS, Wairagkar M, et al. A generalizable speech neuroprosthesis. bioRxiv. 2026. doi:10.64898/2026.07.23.739430. [preprint]",
  "[5] Srinivasan A, Wairagkar M, Iacobacci C, et al. Encoding of speech modes and loudness in ventral precentral gyrus. Nat Commun. 2026;17:5301. doi:10.1038/s41467-026-71284-4.",
  "[6] Jude JJ, Levi-Aharoni H, Acosta AJ, et al. Restoring rapid natural bimanual typing with a neuroprosthesis after paralysis. Nat Neurosci. 2026. doi:10.1038/s41593-026-02218-y.",
  "[7] Karpowicz BM, Ali YH, Wimalasena LN, et al. Stabilizing brain-computer interfaces through alignment of latent dynamics. Nat Commun. 2025. doi:10.1038/s41467-025-59652-y.",
  "[8] Chandrasekaran S, Wandelt SK, Jangam A, et al. A neuroprosthesis for restoring hand movement and sensation in a person with complete tetraplegia. Nat Med. 2026. doi:10.1038/s41591-026-04498-0.",
  "[9] Darvishi S, Datta Gupta A, Hamilton-Bruce A, et al. Enhancing poststroke hand movement recovery: Efficacy of RehabSwift, a personalized brain-computer interface system. PNAS Nexus. 2024. doi:10.1093/pnasnexus/pgae240.",
  "[10] Holz FG, Le Mer Y, Muqit MMK, et al. Subretinal Photovoltaic Implant to Restore Vision in Geographic Atrophy Due to AMD. N Engl J Med. 2026. doi:10.1056/NEJMoa2501396.",
  "[11] Petoe MA, Abbott CJ, Titchener SA, et al. A Second-Generation (44-Channel) Suprachoroidal Retinal Prosthesis: A Single-Arm Clinical Trial of Feasibility. Ophthalmol Sci. 2025. doi:10.1016/j.xops.2024.100525.",
  "[12] Grani F, Soto-Sánchez C, Rodil Doblado A, et al. Neural correlates of phosphene perception in blind individuals: A step toward a bidirectional cortical visual prosthesis. Sci Adv. 2025. doi:10.1126/sciadv.adv8846.",
  "[13] Wang Y, Yuan D, Dettman S, et al. Forecasting Spoken Language Development in Children With Cochlear Implants Using Preimplant Magnetic Resonance Imaging. JAMA Otolaryngol Head Neck Surg. 2026. doi:10.1001/jamaoto.2025.4694.",
  "[14] Nair APS, Mishra SK, Andrade P, et al. A systematic review of machine learning approaches in cochlear implant outcomes. npj Digit Med. 2025;8:411. doi:10.1038/s41746-025-01733-9.",
  "[15] Haro S, Beauchene C, Quatieri TF, Smalt CJ. A Brain-Computer Interface for Improving Auditory Attention in Multi-Talker Environments. IEEE Access. 2025. doi:10.1109/ACCESS.2025.3623842.",
  "[16] Kullar PJ, Freeman S, Rutherford S, et al. Paediatric auditory brainstem implant: How we do it. Acta Neurochir. 2026. doi:10.1007/s00701-025-06762-7.",
  "[17] du Bois N, Korik A, Hodge S, et al. Advancing EEG-based assessment of consciousness and cognition in prolonged disorders of consciousness. Commun Med. 2026;6:344. doi:10.1038/s43856-026-01574-x.",
  "[18] Warren AEL, Raguž M, Friedrich H, et al. A human brain network linked to restoration of consciousness after deep brain stimulation. Nat Commun. 2025. doi:10.1038/s41467-025-61988-4.",
  "[19] Zhang H, Ge Q, Liu X, et al. A shared central thalamus mechanism underlying diverse recoveries in disorders of consciousness. Nat Commun. 2025. doi:10.1038/s41467-025-65360-4.",
  "[20] Wang H, Hu Y, Ge Q, et al. Thalamic burst and tonic firing selectively indicate patients' consciousness level and recovery. Innovation (Camb). 2025. doi:10.1016/j.xinn.2025.100846.",
  "[21] Zhou Y, Cao T, Zhu S, et al. Neural Circuit Mechanisms of Disorders of Consciousness and Potential Therapeutic Targets of Brain Stimulation. CNS Neurosci Ther. 2026. doi:10.1002/cns.71037.",
  "[22] Hu G, Song C, Wu D, et al. Temporal Interference Stimulation of Centromedian-Parafascicular Complex in Disorders of Consciousness: A Pilot Study. Ann Clin Transl Neurol. 2026. doi:10.1002/acn3.70477.",
  "[23] Kronemer SI, Bandettini PA, Gonzalez-Castillo J. Sleuthing subjectivity: a review of covert measures of consciousness. Nat Rev Neurosci. 2025;26(8):476–496. doi:10.1038/s41583-025-00934-1.",
  "[24] Tang J, LeBel A, Jain S, Huth AG. Semantic reconstruction of continuous language from non-invasive brain recordings. Nat Neurosci. 2023;26(5):858–866. doi:10.1038/s41593-023-01304-9.",
  "[25] Littlejohn KT, Cho CJ, Liu JR, et al. A streaming brain-to-voice neuroprosthesis to restore naturalistic communication. Nat Neurosci. 2025;28:902–912. doi:10.1038/s41593-025-01905-6.",
];

function endnotesSlide(items, part, totalParts) {
  const slide = whiteSlide(
    `尾注 ${part}/${totalParts}`,
    "参考文献与证据状态"
  );
  t(
    slide,
    "编号与正文中的 [n] 一一对应；预印本、单例/单臂与模型研究保留原文限定。",
    M,
    1.62,
    CW,
    0.34,
    { size: 12, color: C.sub }
  );

  items.forEach((ref, i) => {
    const y = 1.98 + i * 0.72;
    t(slide, ref, M, y, CW, 0.66, {
      size: 12,
      face: FL,
      color: C.text,
      line: 18,
    });
    if (i < items.length - 1) {
      hairline(slide, M, y + 0.68, CW, C.line);
    }
  });
  notes(
    slide,
    `尾注第 ${part} 页。正文所有关键数字均通过编号指向这里。预印本在条目末尾明确标注；无法从原文核验的二次转述未作为证据使用。`
  );
}

endnotesSlide(references.slice(0, 7), 1, 4);
endnotesSlide(references.slice(7, 14), 2, 4);
endnotesSlide(references.slice(14, 20), 3, 4);
endnotesSlide(references.slice(20, 25), 4, 4);

pres.author = "组会汇报";
pres.company = "";
pres.subject = "脑机接口文献组会汇报";
pres.title = "脑机接口：从可解码到可用，从替代到闭环修复";

pres.writeFile({ fileName: OUT }).then(() => {
  console.log(`written: ${OUT}`);
  console.log(`slides: ${pageNo}`);
});
