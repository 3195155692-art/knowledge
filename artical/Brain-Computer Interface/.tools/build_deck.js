/**
 * Builds the group-meeting deck for the BCI x Consciousness deep-read collection.
 * Content is drawn only from the local notes in BCI_Consciousness_Literature_Deep_Read/.
 */

const path = require("path");
const fs = require("fs");

const DEP =
  "/Users/oldma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const pptxgen = require(path.join(DEP, "pptxgenjs"));

const ASSETS = path.join(__dirname, "assets");
const OUT_DIR =
  "/Users/oldma/knowledge/artical/Brain-Computer Interface/BCI_Consciousness_Literature_Deep_Read";
const OUT_FILE = path.join(OUT_DIR, "组会汇报_脑机接口与意识_从意识检测到意识内容解码.pptx");

// ---------------------------------------------------------------- design system
const C = {
  ink: "0A1A2F",
  inkSoft: "13293F",
  inkLine: "24405C",
  navy: "17527A",
  navyDeep: "0F3A57",
  navyPale: "E7EFF6",
  cyan: "2FB8C6",
  cyanDeep: "1B8C99",
  cyanPale: "DCF1F3",
  amber: "D98A21",
  amberPale: "FCEEDA",
  paper: "F5F8FB",
  card: "FFFFFF",
  line: "DCE5EE",
  text: "16222E",
  sub: "5A6B7D",
  onDark: "EAF2F8",
  onDarkSub: "9FB4C7",
};
// Typefaces. Times New Roman is installed, so latin is exact. Microsoft YaHei is not
// installed on this machine (no Office either), so the deck uses Heiti SC — the macOS
// system hei and the closest available counterpart. Swap this one string to "微软雅黑"
// to regenerate a Windows-targeted build.
const F = "Heiti SC"; // CJK
const FL = "Times New Roman"; // latin / numerals
const SIZE = 1.09; // global type scale — larger text, boxes carry less dead space
const RADIUS = 0.13; // card corner radius, macOS-window feel
const W = 13.333;
const H = 7.5;
const M = 0.62; // side margin
const CW = W - 2 * M; // content width

const pres = new pptxgen();
pres.defineLayout({ name: "DECK16x9", width: W, height: H });
pres.layout = "DECK16x9";
pres.author = "组会汇报";
pres.company = "";
pres.subject = "BCI × Consciousness 文献精读";
pres.title = "脑机接口与意识：从意识检测到意识内容解码";

let pageNo = 0;

// ---------------------------------------------------------------- helpers
function notes(slide, text) {
  slide.addNotes(text);
}

function card(slide, x, y, w, h, o = {}) {
  slide.addShape(pres.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: o.radius === undefined ? RADIUS : o.radius,
    fill: { color: o.fill || C.card },
    line: { color: o.line || C.line, width: o.lineW === undefined ? 1 : o.lineW },
  });
}

/** A fully rounded bar/capsule. `h` (or `w`) is the thickness. */
function pill(slide, x, y, w, h, color) {
  slide.addShape(pres.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: Math.min(w, h) / 2,
    fill: { color },
    line: { color, width: 0 },
  });
}

/** Colour accent tucked just inside a card's top edge, clear of the rounded corners. */
function accentTop(slide, x, y, w, color) {
  pill(slide, x + 0.15, y + 0.1, w - 0.3, 0.08, color);
}

/** Colour accent tucked just inside a card's left edge. */
function accentLeft(slide, x, y, h, color) {
  pill(slide, x + 0.12, y + 0.14, 0.075, Math.max(0.16, h - 0.28), color);
}

function bar(slide, x, y, w, h, color) {
  // Everything in this deck is rounded — hairlines and accents included.
  slide.addShape(pres.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: Math.min(w, h) / 2,
    fill: { color },
    line: { color, width: 0 },
  });
}

/** Edge-to-edge strip that must stay square (bleeds off the slide). */
function sharpBar(slide, x, y, w, h, color) {
  slide.addShape(pres.ShapeType.rect, {
    x,
    y,
    w,
    h,
    fill: { color },
    line: { color, width: 0 },
  });
}

function t(slide, text, x, y, w, h, o = {}) {
  // A latin-only face must never carry CJK glyphs: PowerPoint would look for them in that
  // font's East Asian slot, fail, and fall back to boxes. Promote such runs to the CJK face.
  let face = o.face || F;
  if (face === FL && /[\u4e00-\u9fff]/.test(String(text))) face = F;
  const size = Math.round((o.size || 12) * SIZE * 2) / 2;
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace: face,
    fontSize: size,
    color: o.color || C.text,
    bold: !!o.bold,
    italic: !!o.italic,
    align: o.align || "left",
    valign: o.valign || "top",
    lineSpacing: o.line ? Math.round(o.line * SIZE * 2) / 2 : undefined,
    paraSpaceAfter: o.after === undefined ? undefined : o.after,
    charSpacing: o.spacing === undefined ? undefined : o.spacing,
    margin: o.margin === undefined ? 0 : o.margin,
    isTextBox: true,
    shrinkText: false,
  });
}

function header(slide, eyebrow, title, o = {}) {
  const dark = !!o.dark;
  slide.addImage({
    path: path.join(ASSETS, "wave_mark.png"),
    x: M,
    y: 0.46,
    w: 1.5,
    h: 0.42,
  });
  t(slide, eyebrow, M + 1.72, 0.42, CW - 3.2, 0.34, {
    size: 10.5,
    bold: true,
    spacing: 1.4,
    color: dark ? C.cyan : C.cyanDeep,
    valign: "middle",
  });
  pageNo += 1;
  t(slide, String(pageNo).padStart(2, "0"), W - M - 1.2, 0.42, 1.2, 0.34, {
    size: 10.5,
    face: FL,
    bold: true,
    color: dark ? C.onDarkSub : C.sub,
    align: "right",
    valign: "middle",
  });
  t(slide, title, M, 0.86, CW, 0.72, {
    size: o.size || 27,
    bold: true,
    color: dark ? C.onDark : C.navyDeep,
    valign: "middle",
  });
  pill(slide, M, 1.66, CW, 0.028, dark ? C.inkLine : C.line);
}

function footnote(slide, text, o = {}) {
  t(slide, text, o.x === undefined ? M : o.x, o.y === undefined ? 6.98 : o.y, o.w || CW, 0.3, {
    size: 9,
    color: o.color || C.sub,
    valign: "bottom",
  });
}

function slide_light(eyebrow, title, o) {
  const s = pres.addSlide();
  s.background = { color: C.paper };
  header(s, eyebrow, title, o);
  return s;
}

function slide_dark(eyebrow, title, o) {
  const s = pres.addSlide();
  s.background = { color: C.ink };
  header(s, eyebrow, title, Object.assign({ dark: true }, o));
  return s;
}

/** bullet list inside a box */
function bullets(slide, items, x, y, w, h, o = {}) {
  const arr = items.map((it, i) => {
    const isStr = typeof it === "string";
    const last = i === items.length - 1;
    return {
      text: isStr ? it : it.text,
      options: Object.assign(
        {
          bullet: o.bullet === undefined ? { code: "2022", indent: 14 } : o.bullet,
          breakLine: !last,
          color: o.color || C.text,
          fontSize: Math.round((o.size || 11.5) * SIZE * 2) / 2,
          fontFace: o.face || F,
          lineSpacing: Math.round((o.line || 17) * SIZE * 2) / 2,
          paraSpaceAfter: o.after === undefined ? 6 : o.after,
          bold: !!(isStr ? o.bold : it.bold),
        },
        isStr ? {} : it.options || {}
      ),
    };
  });
  slide.addText(arr, {
    x,
    y,
    w,
    h,
    valign: o.valign || "top",
    margin: 0,
    isTextBox: true,
    shrinkText: false,
  });
}

function stat(slide, big, label, x, y, w, o = {}) {
  t(slide, big, x, y, w, o.bigH || 1.0, {
    size: o.bigSize || 52,
    face: o.face || F,
    bold: true,
    color: o.bigColor || C.navy,
    valign: "bottom",
  });
  t(slide, label, x, y + (o.bigH || 1.0) - 0.02, w, o.labelH || 0.62, {
    size: o.labelSize || 11,
    color: o.labelColor || C.sub,
    line: 14.5,
  });
}

/** Full-bleed dark page that opens one act of the talk. */
function actDivider(num, title, en, lead, points) {
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addImage({ path: path.join(ASSETS, "wave_dark.png"), x: -0.3, y: 5.35, w: 13.95, h: 2.6 });
  sharpBar(s, 0, 0, W, 0.11, C.cyan);
  t(s, `第 ${num} 幕`, M, 1.46, 3.0, 0.4, {
    size: 13,
    bold: true,
    spacing: 2.4,
    color: C.cyan,
  });
  t(s, title, M, 1.9, 8.2, 1.0, { size: 40, bold: true, color: C.onDark });
  t(s, en, M, 2.96, 8.6, 0.4, { size: 13, face: FL, color: C.onDarkSub });
  pill(s, M, 3.56, 2.3, 0.04, C.amber);
  t(s, lead, M, 3.84, 8.3, 1.6, { size: 14, color: C.onDark, line: 21 });

  card(s, M + 8.8, 1.9, CW - 8.8, 3.54, { fill: C.inkSoft, line: C.inkLine });
  t(s, "这一幕要交代的问题", M + 9.1, 2.1, CW - 9.42, 0.32, {
    size: 11.5,
    bold: true,
    color: C.cyan,
  });
  points.forEach((p, i) => {
    t(s, `0${i + 1}`, M + 9.1, 2.5 + i * 0.96, 0.46, 0.36, {
      size: 12,
      face: FL,
      bold: true,
      color: C.amber,
    });
    t(s, p, M + 9.6, 2.48 + i * 0.96, CW - 9.92, 0.88, {
      size: 11,
      color: C.onDark,
      line: 15.5,
    });
  });
  return s;
}

/** The one-line takeaway that closes each paper. */
function conclusionBand(slide, text, o = {}) {
  const bx = o.x === undefined ? M : o.x;
  const by = o.y === undefined ? 6.14 : o.y;
  const bw = o.w === undefined ? CW : o.w;
  const bh = o.h === undefined ? 0.9 : o.h;
  const fill = o.fill || C.navyDeep;
  card(slide, bx, by, bw, bh, { fill, line: o.line || fill });
  t(slide, "汇报结论", bx + 0.32, by, 1.42, bh, {
    size: 11,
    bold: true,
    spacing: 1.2,
    color: C.cyan,
    valign: "middle",
  });
  t(slide, text, bx + 1.82, by, bw - 2.14, bh, {
    size: 12,
    bold: true,
    color: C.onDark,
    valign: "middle",
    line: 16.5,
  });
  return slide;
}

// ================================================================ 01 title
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addImage({ path: path.join(ASSETS, "wave_dark.png"), x: -0.3, y: 4.55, w: 13.95, h: 2.6 });
  sharpBar(s, 0, 0, W, 0.11, C.cyan);

  t(s, "BCI × CONSCIOUSNESS  ·  文献精读合集", M, 1.28, CW, 0.36, {
    size: 12,
    bold: true,
    spacing: 2.2,
    color: C.cyan,
  });
  t(s, "脑机接口与意识", M, 1.78, CW, 1.05, { size: 46, bold: true, color: C.onDark });
  t(s, "从「意识检测」到「意识内容解码」，再到闭环调控", M, 2.86, CW, 0.62, {
    size: 21,
    color: C.cyan,
  });
  pill(s, M, 3.66, 2.4, 0.04, C.amber);
  t(s, "8 篇文献精读  ·  三幕递进  ·  2023–2026  ·  组会汇报", M, 3.92, CW, 0.4, {
    size: 13.5,
    color: C.onDark,
  });
  t(
    s,
    "内容依据本地精读笔记整理；原文获取状态与校验值见合集 README 与 manifest.json。",
    M,
    6.92,
    CW,
    0.32,
    { size: 9.5, color: C.onDarkSub, valign: "bottom" }
  );
  notes(
    s,
    "开场：这次汇报把 8 篇精读笔记串成一条递进的线索——从「能不能检测到意识」，走到「能不能读取意识内容」，\n" +
      "最后走到「能不能反过来调控」。全场的中心句是：每前进一步，不是因为解码更准了，而是因为对照条件更严了。\n" +
      "提醒听众：本汇报基于本地精读笔记，03/04 两篇原文需机构订阅、笔记为摘要级提取，涉及它们的结论会单独标注。"
  );
}

// ================================================================ 02 outline
{
  const s = slide_light("OUTLINE", "三幕递进：一条关于「读数可信度」的线索");
  const items = [
    {
      n: "第一幕",
      head: "行为失效",
      q: "当患者无法做出反应，BCI 如何成为意识的旁路？",
      src: "01 Bodien 2024 · NEJM",
      tone: C.amber,
      tonePale: C.amberPale,
    },
    {
      n: "第二幕",
      head: "从检测到解读",
      q: "从「有没有」换成「是什么」——那我们凭什么说它是意识？",
      src: "02 Fischer 2025 · Neurology\n03 Kronemer 2025 · NRN",
      tone: C.navy,
      tonePale: C.navyPale,
    },
    {
      n: "第三幕",
      head: "内容重建与闭环",
      q: "语义与声音能被重建；能否进一步检测、干预、再检测？",
      src: "06 Tang · 04 Littlejohn · 05 Wairagkar\n07 du Bois · 08 Kordas",
      tone: C.cyanDeep,
      tonePale: C.cyanPale,
    },
  ];
  const gap = 0.26;
  const cwid = (CW - gap * 2) / 3;
  items.forEach((it, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.12, cwid, 3.28, { fill: C.card });
    accentTop(s, x, 2.12, cwid, it.tone);
    t(s, it.n, x + 0.32, 2.32, 2.0, 0.46, { size: 15, bold: true, color: it.tone });
    t(s, it.head, x + 0.26, 2.92, cwid - 0.52, 0.4, { size: 16, bold: true, color: C.text });
    t(s, it.q, x + 0.26, 3.36, cwid - 0.52, 1.2, { size: 12, color: C.sub, line: 17 });
    bar(s, x + 0.26, 4.58, cwid - 0.52, 0.014, C.line);
    t(s, it.src, x + 0.26, 4.72, cwid - 0.52, 0.6, { size: 9.5, color: it.tone, line: 13 });
  });
  card(s, M, 5.72, CW, 0.94, { fill: C.ink, line: C.ink });
  t(
    s,
    "一条主线：每前进一步，不是因为解码更准了，而是因为对照条件更严了。",
    M + 0.34,
    5.72,
    CW - 0.68,
    0.94,
    { size: 15, bold: true, color: C.onDark, valign: "middle" }
  );
  footnote(s, "顺序沿用合集 README 的推荐阅读顺序；编号与笔记文件名一一对应。");
  notes(
    s,
    "用三张卡片交代全场结构：行为失效 → 从检测到解读 → 内容重建与闭环。\n" +
      "每一幕换的东西不同：第一幕换的是问题的提法，第二幕换的是对照条件，第三幕换的是系统与患者的关系。\n" +
      "最后那句「对照条件更严了」是全场中心句，后面每一幕都会回到它。"
  );
}

// ================================================================ 03 the problem
{
  const s = slide_light("WHY IT MATTERS", "问题的起点：评估手段的天花板");
  const colW = (CW - 0.36) / 2;

  card(s, M, 2.02, colW, 2.62, { fill: C.card });
  t(s, "行为学评估", M + 0.32, 2.24, colW - 0.64, 0.36, { size: 15, bold: true, color: C.amber });
  bullets(
    s,
    [
      "GCS、CRS-R 等量表都要求患者把认知转成可观察的动作或言语。",
      "在睡眠、麻醉、瘫痪、闭锁综合征、no-report 范式下失效。",
      "结果可能被系统性低估：认知仍在，输出通道损坏。",
    ],
    M + 0.32,
    2.66,
    colW - 0.64,
    1.8,
    { size: 11.5, line: 16.5 }
  );

  card(s, M + colW + 0.36, 2.02, colW, 2.62, { fill: C.card });
  t(s, "神经信号评估", M + colW + 0.68, 2.24, colW - 0.64, 0.36, {
    size: 15,
    bold: true,
    color: C.navy,
  });
  bullets(
    s,
    [
      "任务态 fMRI / EEG / fNIRS / 自主神经指标，不依赖运动输出。",
      "已有研究能在无反应患者中检出与执行指令一致的脑活动。",
      "代价：意识本身没有可直接观测的金标准，即 ground truth 缺失。",
    ],
    M + colW + 0.68,
    2.66,
    colW - 0.64,
    1.8,
    { size: 11.5, line: 16.5 }
  );

  card(s, M, 4.86, CW, 1.72, { fill: C.amberPale, line: C.amber, lineW: 1.25 });
  t(
    s,
    "所以真正的问题不是「他有没有反应」，而是：",
    M + 0.4,
    5.06,
    CW - 0.8,
    0.4,
    { size: 13, color: C.text }
  );
  t(s, "残余的意识与认知，是否仍然可被检测——甚至被读取？", M + 0.4, 5.46, CW - 0.8, 0.92, {
    size: 22,
    bold: true,
    color: C.amber,
    valign: "middle",
  });
  notes(
    s,
    "先讲清楚困境：行为学量表是临床金标准，但它把「认知」和「运动输出」绑在一起。\n" +
      "右边强调神经信号路线的价值与代价——代价就是整个汇报反复出现的 ground truth 问题。"
  );
}

// ================================================================ 04 literature map
{
  const s = slide_light("THE 8 PAPERS", "文献地图");
  const rows = [
    ["01", "Bodien 2024 · NEJM", "多中心队列", "临床起点：CMD 并不罕见", "全文"],
    ["02", "Fischer 2025 · Neurology", "综述 / 观点", "范式转换：从检测走向解码", "全文"],
    ["03", "Kronemer 2025 · NRN", "综述", "方法学约束：如何证明与意识相关", "摘要级"],
    ["06", "Tang 2023 · Nat Neurosci", "方法研究", "非侵入语义重建", "全文"],
    ["04", "Littlejohn 2025 · Nat Neurosci", "技术报告", "流式脑→语音", "摘要级"],
    ["05", "Wairagkar 2025 · Nature", "技术报告", "即时声音合成与表达性", "全文"],
    ["07", "du Bois 2026 · Commun Med", "临床研究", "可穿戴 EEG + 运动想象 BCI", "全文"],
    ["08", "Kordas 2026 · J Clin Med", "综述", "多模态 + AI + 闭环展望", "全文"],
  ];
  t(s, "编号", M, 1.86, 0.8, 0.3, { size: 10, bold: true, color: C.sub });
  t(s, "文献", M + 0.92, 1.86, 4.6, 0.3, { size: 10, bold: true, color: C.sub });
  t(s, "类型", M + 5.6, 1.86, 2.0, 0.3, { size: 10, bold: true, color: C.sub });
  t(s, "在本汇报中的角色", M + 7.7, 1.86, 2.72, 0.3, { size: 10, bold: true, color: C.sub });
  t(s, "提取深度", W - M - 1.5, 1.86, 1.5, 0.3, {
    size: 10,
    bold: true,
    color: C.sub,
    align: "right",
  });
  bar(s, M, 2.2, CW, 0.02, C.line);

  const rh = 0.545;
  rows.forEach((r, i) => {
    const y = 2.28 + i * rh;
    if (i % 2 === 0) card(s, M - 0.12, y - 0.045, CW + 0.24, rh - 0.05, { fill: "FFFFFF", line: "FFFFFF" });
    t(s, r[0], M, y, 0.8, rh - 0.1, {
      size: 12.5,
      face: FL,
      bold: true,
      color: C.cyanDeep,
      valign: "middle",
    });
    t(s, r[1], M + 0.92, y, 4.6, rh - 0.1, { size: 12, valign: "middle" });
    t(s, r[2], M + 5.6, y, 2.0, rh - 0.1, { size: 11, color: C.sub, valign: "middle" });
    t(s, r[3], M + 7.7, y, 2.72, rh - 0.1, { size: 11.5, color: C.navy, valign: "middle" });
    const deep = r[4] === "全文";
    t(s, r[4], W - M - 1.5, y, 1.5, rh - 0.1, {
      size: 10.5,
      align: "right",
      bold: deep,
      color: deep ? C.navy : C.amber,
      valign: "middle",
    });
  });
  bar(s, M, 2.28 + rows.length * rh - 0.06, CW, 0.02, C.line);
  footnote(
    s,
    "03、04 两篇原文经 Unpaywall / OpenAlex / Europe PMC 核验为闭源，需机构订阅；笔记为摘要级提取，汇报中已单独标注。"
  );
  notes(
    s,
    "这一页是索引，不用逐行念。指出两点：一是编号与本地笔记文件名一致，方便回查；" +
      "二是 03 与 04 是摘要级笔记，后面讲到时会标出来。"
  );
}

// ================================================================ 05 the thread
{
  const s = slide_light("THE THREAD", "领域主线：三幕递进");
  const acts = [
    {
      act: "第一幕 · 行为失效",
      shift: "换的是问题的提法",
      tone: C.amber,
      chips: [
        ["传统 BCI", "运动意图 → 设备控制"],
        ["语音 BCI", "语言意图 → 文字与声音"],
        ["意识 BCI", "脑信号 → 隐蔽认知"],
      ],
    },
    {
      act: "第二幕 · 从检测到解读",
      shift: "换的是对照条件",
      tone: C.navy,
      chips: [
        ["神经解码", "脑信号 → 语义表征"],
        ["意识内容解码", "脑信号 → 具体体验内容"],
        ["验证问题", "凭什么说这就是意识"],
      ],
    },
    {
      act: "第三幕 · 内容重建与闭环",
      shift: "换的是系统与患者的关系",
      tone: C.cyanDeep,
      chips: [
        ["语义与声音重建", "意义可读，声音可表达"],
        ["持续交互", "从一次检查到一段对话"],
        ["闭环调控", "检测 → 干预 → 再检测"],
      ],
    },
  ];
  const gapx = 0.3;
  const cwid = (CW - gapx * 2) / 3;
  acts.forEach((a, i) => {
    const x = M + i * (cwid + gapx);
    card(s, x, 1.9, cwid, 0.66, { fill: a.tone, line: a.tone });
    t(s, a.act, x + 0.3, 1.9, cwid - 0.6, 0.66, {
      size: 14,
      bold: true,
      color: "FFFFFF",
      valign: "middle",
    });
    t(s, a.shift, x + 0.3, 2.64, cwid - 0.6, 0.32, { size: 10.5, color: a.tone });
    a.chips.forEach((c, k) => {
      const y = 3.04 + k * 0.92;
      card(s, x, y, cwid, 0.82, { fill: C.card });
      accentLeft(s, x, y, 0.82, a.tone);
      t(s, c[0], x + 0.28, y + 0.08, cwid - 0.56, 0.32, {
        size: 12.5,
        bold: true,
        color: C.text,
      });
      t(s, c[1], x + 0.28, y + 0.42, cwid - 0.56, 0.32, { size: 10.5, color: C.sub });
    });
  });
  t(
    s,
    "从「输出通道」到「内容读取」，再到「闭环干预」——越往后走，工程可行性越低，而科学争议越大。",
    M,
    6.12,
    CW,
    0.4,
    { size: 13, bold: true, color: C.navyDeep }
  );
  notes(
    s,
    "这一页是全场的骨架，请慢慢讲。三幕各自换的东西不同：第一幕换的是问题的提法——不再问「有没有反应」，而问「能不能绕过坏掉的输出通道」；\n" +
      "第二幕换的是对照条件——要证明一个解码结果真的是意识，必须加入 no-report、意识/无意识对照；\n" +
      "第三幕换的是系统与患者的关系——从一次性检查变成持续交互，最后变成检测与干预的闭环。\n" +
      "底部那句话是全场中心句，后面每一幕都会回到它。"
  );
}

// ================================================================ A1 act divider
{
  const s = actDivider(
    1,
    "行为失效",
    "When behaviour stops being a trustworthy readout",
    "意识评估的传统做法是「让患者做出反应」。当运动输出通路损坏时，这个做法不是变得不准确，而是从根上失效——BCI 的第一重身份，正是绕开这条坏掉的通路。",
    [
      "为什么「没有反应」不能等于「没有认知」",
      "CMD 的真实规模，以及检出率的含义与下限",
      "从 state 到 conscious content：四层问题地图",
    ]
  );
  notes(
    s,
    "第一幕开场。三句话交代这一幕：先把临床困境说清楚，再用数据说明它并不罕见，最后给出一张贯穿全场的地图。\n" +
      "提醒听众：这一幕里 BCI 还不是通信工具，而是替代行为学的一把新尺子。"
  );
}

// ================================================================ 06 Bodien headline
{
  const s = slide_light("观点 1 · 01 Bodien 2024 · NEJM", "行为无反应 ≠ 认知不存在");
  card(s, M, 2.0, 4.5, 4.3, { fill: C.card });
  t(s, "CMD 检出率", M + 0.42, 2.22, 3.66, 0.3, { size: 11.5, bold: true, color: C.cyanDeep });
  t(s, "25%", M + 0.42, 2.56, 3.66, 1.34, {
    size: 70,
    face: FL,
    bold: true,
    color: C.navy,
    valign: "middle",
  });
  t(s, "60 / 241", M + 0.42, 3.94, 3.66, 0.44, {
    size: 19,
    face: FL,
    bold: true,
    color: C.amber,
  });
  t(
    s,
    "名「对指令无可观察反应」的意识障碍患者，在任务态 fMRI 或 EEG 上检出认知-运动分离。",
    M + 0.42,
    4.4,
    3.66,
    1.0,
    { size: 12, color: C.text, line: 17.5 }
  );
  bar(s, M + 0.42, 5.5, 3.66, 0.016, C.line);
  t(s, "阳性来源：仅 fMRI 11 例、仅 EEG 13 例；\n两种方法均为阳性 36 例。", M + 0.42, 5.6, 3.66, 0.56, {
    size: 10.5,
    color: C.sub,
    line: 15.5,
  });

  const rx = M + 4.5 + 0.3;
  const rw = CW - 4.8;
  card(s, rx, 2.0, rw, 1.92, { fill: C.card });
  t(s, "研究设计", rx + 0.36, 2.14, rw - 0.72, 0.32, { size: 13, bold: true, color: C.navy });
  bullets(
    s,
    [
      "353 名意识障碍成人，2006–2023 年、6 个国际中心的前瞻性队列。",
      "行为评估用 CRS-R，评估者盲于 fMRI/EEG 结果；只取第一天最佳表现。",
      "中位年龄 37.9 岁；伤后中位 7.9 个月（26% 在 28 天内）；50% 为创伤性病因。",
    ],
    rx + 0.36,
    2.5,
    rw - 0.72,
    1.3,
    { size: 11, line: 16 }
  );

  card(s, rx, 4.06, rw, 2.24, { fill: C.navyPale, line: C.navyPale });
  t(s, "CMD 的操作性定义", rx + 0.36, 4.24, rw - 0.72, 0.3, {
    size: 11.5,
    bold: true,
    color: C.navy,
  });
  t(
    s,
    "CRS-R 无指令跟随与可理解言语（听觉 <3、视觉 <5、口运动/言语 <3、交流 <1），且至少一项任务态 fMRI 或 EEG 阳性。任务包括运动想象、视听觉辨别，需持续数分钟。",
    rx + 0.36,
    4.6,
    rw - 0.72,
    1.5,
    { size: 10.5, color: C.text, line: 15 }
  );
  notes(
    s,
    "这是全场第一个硬数字：241 名无可观察指令反应的患者里，60 人（25%）检出 CMD。\n" +
      "同时给出操作性定义，避免大家把 CMD 当成「有意识」的同义词。\n" +
      "设计细节（CRS-R 盲评、第一天最佳表现）是这篇可信度的来源。"
  );
}

// ================================================================ 07 Bodien boundaries
{
  const s = slide_light("观点 1 · 边界", "25% 是下限，而不是上限");
  const gap = 0.28;
  const cwid = (CW - gap * 2) / 3;
  const items = [
    {
      k: "对照也只有 38% 阳性",
      body: "112 名可观察指令反应者中仅 43 人（38%）在任务态 fMRI/EEG 上出现对应反应。说明任务范式本身假阴性率很高。",
      tone: C.amber,
    },
    {
      k: "技术覆盖并不完整",
      body: "多数患者只做了单模态检查（仅 fMRI 或仅 EEG），而 60 例阳性里有 36 例是双模态共同检出——真实的 CMD 比例只会更高。",
      tone: C.navy,
    },
    {
      k: "关联不等于因果",
      body: "CMD 与更年轻、伤后时间更长、创伤性病因相关，但这是观察性结果，不能读成因果解释。",
      tone: C.cyanDeep,
    },
  ];
  items.forEach((it, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.0, cwid, 3.06, { fill: C.card });
    accentTop(s, x, 2.0, cwid, it.tone);
    t(s, it.k, x + 0.3, 2.24, cwid - 0.6, 0.66, { size: 14, bold: true, color: it.tone, line: 19 });
    t(s, it.body, x + 0.3, 3.0, cwid - 0.6, 1.86, { size: 11.5, color: C.text, line: 17 });
  });
  card(s, M, 5.4, CW, 1.24, { fill: C.ink, line: C.ink });
  t(s, "双向边界（汇报时必须说清）", M + 0.4, 5.56, CW - 0.8, 0.32, {
    size: 11.5,
    bold: true,
    color: C.cyan,
  });
  t(
    s,
    "单次阳性 ≠ 患者具有完整意识或决策能力；单次阴性 ≠ 患者没有意识。25% 描述的是一个检测结果，不是一个意识等级。",
    M + 0.4,
    5.9,
    CW - 0.8,
    0.62,
    { size: 13.5, bold: true, color: C.onDark, line: 19 }
  );
  notes(
    s,
    "这一页是这篇文献的诚实边界，也是后面所有讨论的前提。\n" +
      "重点：对照组 38% 的检出率，说明范式灵敏度有限，所以 25% 是下限。\n" +
      "收尾一定要读那句双向边界。"
  );
}

// ================================================================ A1 four levels
{
  const s = slide_light(
    "第一幕 · 01 Bodien 2024 · 框架",
    "四层问题：从「有没有意识」到「正在意识到什么」"
  );
  const lv = [
    ["Level 1", "状态解码", "UWS / MCS / CMD / LIS", "临床量表 + 任务态反应", "临床可用", C.amber],
    ["Level 2", "指令解码", "左 / 右、是 / 否、运动想象", "任务对照 + 行为锚点", "已验证", C.navy],
    ["Level 3", "语义解码", "语言、物体、人物、自传体信息", "语义相似度 + 下游任务", "健康人验证", C.cyanDeep],
    ["Level 4", "意识内容解码", "患者当下正在体验的内容", "no-report + 意识/无意识对照", "概念阶段", "E07A5F"],
  ];
  const gap = 0.24;
  const cwid = (CW - gap * 3) / 4;
  lv.forEach((l, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.0, cwid, 2.86, { fill: C.card });
    accentTop(s, x, 2.0, cwid, l[5]);
    t(s, l[0], x + 0.26, 2.26, 0.86, 0.32, {
      size: 11,
      face: FL,
      bold: true,
      color: l[5],
    });
    t(s, l[4], x + 1.16, 2.26, cwid - 1.42, 0.32, {
      size: 10,
      bold: true,
      color: l[5],
      align: "right",
    });
    t(s, l[1], x + 0.26, 2.52, cwid - 0.52, 0.46, {
      size: 16,
      bold: true,
      color: C.text,
    });
    bar(s, x + 0.26, 3.06, cwid - 0.52, 0.014, C.line);
    t(s, "识别", x + 0.26, 3.16, cwid - 0.52, 0.24, { size: 9.5, bold: true, color: C.sub });
    t(s, l[2], x + 0.26, 3.42, cwid - 0.52, 0.7, { size: 11, color: C.text, line: 15.5 });
    t(s, "证据要求", x + 0.26, 4.16, cwid - 0.52, 0.24, { size: 9.5, bold: true, color: C.sub });
    t(s, l[3], x + 0.26, 4.42, cwid - 0.52, 0.42, { size: 11, color: C.text, line: 15.5 });
  });
  t(
    s,
    "难点不是线性增加的：Level 1–2 还能靠任务对照，Level 3–4 必须靠 no-report 与意识／无意识对照——变的是证据标准，不只是模型精度。",
    M,
    5.06,
    CW,
    0.44,
    { size: 12.5, bold: true, color: C.navyDeep }
  );
  conclusionBand(
    s,
    "把临床诊断问题（他有没有意识）转化为一个 BCI 问题：当运动输出通道失效时，能否绕过它读取认知。"
  );
  notes(
    s,
    "这是全场的路线图，后面每一幕都会回到这四个层级。\n" +
      "重点不是「一级比一级难」，而是「一级比一级对证据的要求更严」：前两级可以靠任务和行为的对照，后两级必须用无报告范式和意识/无意识对照。\n" +
      "最后读一遍汇报结论——整场报告的起点就落在这一句上。"
  );
}

// ================================================================ A2 act divider
{
  const s = actDivider(
    2,
    "从检测到解读",
    "From detection to reconstruction",
    "如果患者确实在认知，下一个问题就不是「有没有」，而是「是什么」。这一步要求换掉整个范式，也第一次把「我们凭什么说这是意识」变成必须正面回答的问题。",
    [
      "从「患者有没有意识」到「患者正在意识到什么」",
      "能解码什么，以及解码「不能」证明什么",
      "意识必须拆成三个层次来看",
      "为什么「让患者报告」会污染我们要测的东西",
    ]
  );
  notes(
    s,
    "第二幕开场。这一幕是全场的理论重心，也是最容易讲快的一幕，请留足时间。\n" +
      "提示听众：接下来会连续出现四个必须分清的概念——解码、意识层次、报告、ground truth。"
  );
}

// ================================================================ 08 Fischer
{
  const s = slide_light("观点 2 · 02 Fischer 2025 · Neurology", "把问题从「有没有」换成「是什么」");
  card(s, M, 1.98, 5.68, 1.62, { fill: C.card });
  t(s, "旧问题 · consciousness detection", M + 0.34, 2.14, 5.0, 0.3, {
    size: 10.5,
    bold: true,
    color: C.sub,
  });
  t(s, "Does the patient have consciousness?", M + 0.34, 2.46, 5.0, 0.52, {
    size: 15,
    face: FL,
    bold: true,
    color: C.sub,
  });
  t(s, "要求患者隐蔽地执行一个指令任务（如想象打网球），再对照预期脑区。", M + 0.34, 2.98, 5.0, 0.48, {
    size: 10.5,
    color: C.sub,
    line: 14.5,
  });

  card(s, M + 5.96, 1.98, 6.13, 1.62, { fill: C.cyanPale, line: C.cyan, lineW: 1.25 });
  t(s, "新问题 · consciousness reconstruction", M + 6.3, 2.14, 5.5, 0.3, {
    size: 10.5,
    bold: true,
    color: C.cyanDeep,
  });
  t(s, "What is the patient consciously experiencing?", M + 6.3, 2.46, 5.5, 0.52, {
    size: 15,
    face: FL,
    bold: true,
    color: C.navyDeep,
  });
  t(s, "从脑活动中重建刺激、概念与语义内容，把意识评估从二分推向连续谱。", M + 6.3, 2.98, 5.5, 0.48, {
    size: 10.5,
    color: C.navyDeep,
    line: 14.5,
  });

  t(s, "现行范式的四个根本局限", M, 3.86, CW, 0.36, { size: 14, bold: true, color: C.navy });
  const lim = [
    ["灵敏度有限", "听懂、注意、形成正确心理表象、持续执行——任一环节失败都会造成假阴性。"],
    ["依赖先验神经解剖假设", "「想象打网球应激活运动区」这类假设，在脑网络已重组的重伤患者身上未必成立。"],
    ["测的是任务执行能力", "而不是患者正在经历的主观内容。"],
    ["把意识建构成二分现象", "忽略了意识体验本身的连续谱性质。"],
  ];
  const lw = (CW - 0.26 * 3) / 4;
  lim.forEach((l, i) => {
    const x = M + i * (lw + 0.26);
    card(s, x, 4.34, lw, 2.02, { fill: C.card });
    t(s, String(i + 1).padStart(2, "0"), x + 0.24, 4.5, lw - 0.48, 0.34, {
      size: 13,
      face: FL,
      bold: true,
      color: C.cyanDeep,
    });
    t(s, l[0], x + 0.24, 4.88, lw - 0.48, 0.42, { size: 12.5, bold: true, color: C.text, line: 16.5 });
    t(s, l[1], x + 0.24, 5.36, lw - 0.48, 0.9, { size: 10.5, color: C.sub, line: 15 });
  });
  footnote(s, "文献类型：Review / Perspective。检索范围：PubMed 与 Google Scholar，1990-01 至 2024-09。");
  notes(
    s,
    "这篇的核心贡献不是新算法，而是重新定义问题：从 consciousness detection 到 consciousness reconstruction。\n" +
      "四个局限里，最值得注意的是「依赖先验神经解剖假设」——它和 07 的脑地形结果以及 06 的跨被试失败互相印证。"
  );
}

// ================================================================ A2 decoding basics
{
  const s = slide_light("第二幕 · 02 Fischer 2025 · 概念", "neural decoding 在做什么");
  const rows = [
    [
      "传统 task-based 范式",
      "给一个指令 → 看预期脑区是否激活 → 判断「患者能否执行任务」",
      C.sub,
      C.paper,
    ],
    [
      "解码范式",
      "记录脑活动 → 用模型反推刺激、概念与语义 → 判断「患者正在加工什么内容」",
      C.navy,
      C.navyPale,
    ],
  ];
  rows.forEach((r, i) => {
    const y = 1.94 + i * 0.98;
    card(s, M, y, CW, 0.86, { fill: r[3], line: r[3] });
    t(s, r[0], M + 0.32, y, 3.1, 0.86, {
      size: 12.5,
      bold: true,
      color: r[2],
      valign: "middle",
    });
    t(s, r[1], M + 3.6, y, CW - 3.94, 0.86, {
      size: 12,
      color: C.text,
      valign: "middle",
      line: 16,
    });
  });

  const steps = ["刺激 / 内部状态", "脑活动", "机器学习模型", "重建：刺激、概念、语义"];
  const sw = (CW - 0.28 * 3) / 4;
  steps.forEach((v, i) => {
    const x = M + i * (sw + 0.28);
    card(s, x, 4.02, sw, 0.86, { fill: C.card });
    t(s, v, x + 0.16, 4.02, sw - 0.32, 0.86, {
      size: 12,
      bold: true,
      color: C.navyDeep,
      align: "center",
      valign: "middle",
      line: 15,
    });
    if (i < 3)
      t(s, "→", x + sw - 0.04, 4.02, 0.28, 0.86, {
        size: 13,
        color: C.cyan,
        align: "center",
        valign: "middle",
      });
  });

  card(s, M, 5.06, CW, 0.86, { fill: C.cyanPale, line: C.cyan, lineW: 1.25 });
  t(
    s,
    "例：患者听到「我昨天去公园散步」 → 语义解码器 → 「公园 / 散步 / 昨天」",
    M + 0.34,
    5.06,
    CW - 0.68,
    0.86,
    { size: 13, bold: true, color: C.navyDeep, valign: "middle" }
  );
  t(
    s,
    "关键区别：解码给出的是内容层面的证据，而不只是「脑活动增强了」——这是它比传统范式更接近「体验」的原因。",
    M,
    6.1,
    CW,
    0.4,
    { size: 12.5, bold: true, color: C.cyanDeep }
  );
  notes(
    s,
    "这一页把两种范式的差别讲成一句话：传统范式测的是「能不能做到」，解码范式测的是「正在加工什么」。\n" +
      "强调最后一行——内容层面的证据，才是它被认为更接近主观体验的理由。\n" +
      "同时埋下伏笔：能重建内容，并不自动等于重建了「体验」，下一页专门讲这个坑。"
  );
}

// ================================================================ 09 Fischer table
{
  const s = slide_light("观点 2 · 原文 Table 还原", "为什么要换范式：逐条对齐");
  const rows = [
    ["fMRI 依赖先验 ROI、预设功能解剖不变", "更少依赖预设感兴趣区，可针对个体定制"],
    ["依赖任意的统计阈值", "不依赖任意统计阈值"],
    ["EEG 对刺激的感觉成分与语义成分归属不确定", "分别评估感觉内容与语义内容"],
    ["依赖患者配合", "更少依赖患者配合"],
    ["把意识建构成二分现象", "沿连续谱评估隐蔽意识"],
    ["难以转化为 BCI", "易于转化为脑机接口"],
    ["间接评估患者体验", "更直接地评估患者体验"],
  ];
  card(s, M, 1.94, 6.3, 0.46, { fill: C.amber, line: C.amber });
  t(s, "现行范式的局限", M + 0.34, 1.94, 5.7, 0.46, {
    size: 12.5,
    bold: true,
    color: "FFFFFF",
    valign: "middle",
  });
  card(s, M + 6.52, 1.94, CW - 6.52, 0.46, { fill: C.navy, line: C.navy });
  t(s, "解码范式的潜在解法", M + 6.86, 1.94, CW - 7.0, 0.46, {
    size: 12.5,
    bold: true,
    color: "FFFFFF",
    valign: "middle",
  });
  const rh = 0.615;
  rows.forEach((r, i) => {
    const y = 2.5 + i * rh;
    if (i % 2 === 1) card(s, M, y - 0.05, CW, rh - 0.04, { fill: "ECF2F7", line: "ECF2F7" });
    pill(s, M + 0.1, y + 0.13, 0.055, Math.max(0.16, rh - 0.36), C.amber);
    t(s, r[0], M + 0.34, y, 5.85, rh - 0.12, { size: 12, color: C.text, valign: "middle" });
    pill(s, M + 6.66, y + 0.13, 0.055, Math.max(0.16, rh - 0.36), C.cyanDeep);
    t(s, r[1], M + 6.9, y, CW - 7.06, rh - 0.12, {
      size: 12,
      bold: true,
      color: C.navyDeep,
      valign: "middle",
    });
  });
  t(
    s,
    "七条一一对应：这不是「换个更好的分类器」，而是把评估目标整个换掉。",
    M,
    6.92,
    CW,
    0.34,
    { size: 12, bold: true, color: C.cyanDeep }
  );
  notes(
    s,
    "这张表是全文最实用的部分。逐条读会太慢，挑三条讲：不依赖任意阈值、分别评估感觉与语义、沿连续谱评估。\n" +
      "最后提醒：这张表承诺的是「潜在解法」，不是已验证的结果。"
  );
}

// ================================================================ A2 decoding != consciousness
{
  const s = slide_light("第二幕 · 02 Fischer 2025 · 核心难题", "能解码，不等于证明了意识");
  card(s, M, 1.96, 5.5, 4.06, { fill: C.card });
  t(s, "从刺激到体验，中间隔着好几步", M + 0.34, 2.1, 4.82, 0.34, {
    size: 13,
    bold: true,
    color: C.navy,
  });
  const chain = [
    ["stimulus", "刺激"],
    ["sensory processing", "感觉加工"],
    ["semantic processing", "语义加工"],
    ["attention", "注意"],
    ["conscious access", "意识通达"],
    ["subjective experience", "主观体验"],
  ];
  chain.forEach((c, k) => {
    const y = 2.5 + k * 0.5;
    const hot = k >= 4;
    card(s, M + 0.34, y, 4.82, 0.42, {
      fill: hot ? C.cyanPale : C.paper,
      line: hot ? C.cyan : C.line,
    });
    t(s, c[1], M + 0.52, y, 2.2, 0.42, {
      size: 11.5,
      bold: hot,
      color: C.text,
      valign: "middle",
    });
    t(s, c[0], M + 2.76, y, 2.24, 0.42, {
      size: 9.5,
      face: FL,
      color: C.sub,
      valign: "middle",
    });
  });
  t(
    s,
    "解码器能识别「语义加工」，但不能自动证明最后一步一定发生。",
    M + 0.34,
    5.52,
    4.82,
    0.48,
    { size: 11.5, bold: true, color: C.navyDeep }
  );

  const rx = M + 5.8;
  const rw = CW - 5.8;
  card(s, rx, 1.96, rw, 4.06, { fill: C.amberPale, line: C.amber, lineW: 1.25 });
  t(s, "模型预测出一个词，至少有三种解释", rx + 0.34, 2.1, rw - 0.68, 0.34, {
    size: 13,
    bold: true,
    color: C.amber,
  });
  const alts = [
    ["① 患者确实有意识地体验了它", "这是作者希望成立、也是最有临床含义的解释。"],
    ["② 患者进行了无意识语义加工", "语义加工可以在没有意识体验的情况下发生。"],
    ["③ 模型用到了与意识无关的统计线索", "例如刺激的物理属性、注意或唤醒带来的稳定相关。"],
  ];
  alts.forEach((a, k) => {
    const y = 2.54 + k * 1.0;
    t(s, a[0], rx + 0.34, y, rw - 0.68, 0.36, {
      size: 12.5,
      bold: true,
      color: C.navyDeep,
    });
    t(s, a[1], rx + 0.34, y + 0.36, rw - 0.68, 0.6, {
      size: 11,
      color: C.text,
      line: 15.5,
    });
  });
  t(
    s,
    "所以要加入对照：no-report、masking、意识／无意识条件、客观行为锚点、跨模态验证。",
    rx + 0.34,
    5.56,
    rw - 0.68,
    0.48,
    { size: 11.5, bold: true, color: C.amber }
  );
  conclusionBand(
    s,
    "BCI 的下一步不一定只是让患者「说出来」，而可能是从脑活动中推断「他正在经历什么」——但可解码 ≠ 可证明为意识。"
  );
  notes(
    s,
    "这是全场最重要的一页，请放慢。左边这条链说明：刺激进入大脑之后要经过好几步才可能变成体验，\n" +
      "而解码器能看到的只是其中某一步的痕迹。右边列出三种同样能产生这个预测的解释——\n" +
      "注意第②③两种解释都不需要意识存在，所以「解码成功」本身不构成意识证据。\n" +
      "最后落在汇报结论上：可解码 ≠ 可证明为意识，这是后面所有实验设计要守住的一条线。"
  );
}

// ================================================================ 10 Kronemer
{
  const s = slide_light(
    "观点 3 · 03 Kronemer 2025 · Nat Rev Neurosci",
    "意识 BCI 为什么比普通 BCI 难"
  );
  card(s, M, 1.98, 4.6, 4.52, { fill: C.card });
  t(s, "先把「意识」拆成三个问题", M + 0.34, 2.16, 3.92, 0.36, {
    size: 13.5,
    bold: true,
    color: C.navy,
  });
  const tri = [
    ["Conscious level", "有多可能处于清醒 / 有意识状态（wakefulness、alertness）"],
    ["Conscious state", "某一时刻整体的意识状态"],
    ["Conscious content", "看到、听到、想到、感觉到的具体内容"],
  ];
  tri.forEach((it, i) => {
    const y = 2.62 + i * 1.16;
    card(s, M + 0.34, y, 3.92, 1.02, { fill: C.paper, line: C.paper });
    t(s, it[0], M + 0.52, y + 0.12, 3.56, 0.3, { size: 12, face: FL, bold: true, color: C.cyanDeep });
    t(s, it[1], M + 0.52, y + 0.44, 3.56, 0.54, { size: 10.5, color: C.text, line: 14.5 });
  });
  t(s, "检测 level 与解码 content 是两个完全不同的问题。", M + 0.34, 6.08, 3.92, 0.34, {
    size: 10.5,
    bold: true,
    color: C.navyDeep,
  });

  const rx = M + 4.6 + 0.3;
  const rw = CW - 4.9;
  card(s, rx, 1.98, rw, 3.16, { fill: C.amberPale, line: C.amber, lineW: 1.25 });
  t(s, "核心困难：ground truth 缺失", rx + 0.36, 2.16, rw - 0.72, 0.36, {
    size: 14,
    bold: true,
    color: C.amber,
  });
  bullets(
    s,
    [
      "普通 BCI 可以用行为结果作 ground truth；意识 BCI 恰恰缺这把标尺。",
      "一个生理信号可能只对应注意、觉醒、感觉加工或运动准备，而不等于 conscious experience。",
      "刺激报告本身会改变脑活动，因此需要 no-report paradigm。",
      "约束条件：masking、注意力操控、no-report、跨模态验证。",
    ],
    rx + 0.36,
    2.6,
    rw - 0.72,
    2.4,
    { size: 11.5, line: 16.5 }
  );
  card(s, rx, 5.3, rw, 1.2, { fill: C.card });
  t(s, "伦理：mental privacy", rx + 0.36, 5.44, rw - 0.72, 0.3, {
    size: 12,
    bold: true,
    color: C.navy,
  });
  t(
    s,
    "谁能运行 decoder、患者能否拒绝被解码、误判会不会影响医疗决策——意识 BCI 的伦理风险与运动 BCI 明显不同。",
    rx + 0.36,
    5.76,
    rw - 0.72,
    0.62,
    { size: 10.5, color: C.text, line: 15 }
  );
  t(s, "▍本篇笔记为摘要级提取：原文与综述正文需机构订阅，以上结论基于公开摘要。", M, 6.66, CW, 0.3, {
    size: 10,
    bold: true,
    color: C.amber,
  });
  notes(
    s,
    "这一页解释为什么意识 BCI 难：不是信号不够好，而是缺 ground truth。\n" +
      "务必念出底部那行——03 是摘要级笔记，正文细节未核实。"
  );
}

// ================================================================ A2 three levels
{
  const s = slide_light("第二幕 · 03 Kronemer 2025 · 概念框架", "先把「意识」拆成三个问题");
  const tri = [
    [
      "Conscious level",
      "意识水平",
      "有多可能处于清醒 / 有意识状态",
      "wakefulness、alertness、vigilance",
      C.navy,
    ],
    [
      "Conscious state",
      "意识状态",
      "某一时刻整体的意识状态",
      "随时间和情境变化的状态剖面",
      C.cyanDeep,
    ],
    [
      "Conscious content",
      "意识内容",
      "看到、听到、想到、感觉到的具体内容",
      "体验里的那个「什么」",
      "E07A5F",
    ],
  ];
  const gap = 0.3;
  const cwid = (CW - gap * 2) / 3;
  tri.forEach((a, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.0, cwid, 3.3, { fill: C.card });
    accentTop(s, x, 2.0, cwid, a[4]);
    t(s, a[0], x + 0.32, 2.2, cwid - 0.64, 0.34, {
      size: 13,
      face: FL,
      bold: true,
      color: a[4],
    });
    t(s, a[1], x + 0.32, 2.56, cwid - 0.64, 0.46, {
      size: 19,
      bold: true,
      color: C.text,
    });
    bar(s, x + 0.32, 3.12, cwid - 0.64, 0.014, C.line);
    t(s, a[2], x + 0.32, 3.26, cwid - 0.64, 0.9, { size: 12, color: C.text, line: 17 });
    t(s, a[3], x + 0.32, 4.2, cwid - 0.64, 0.7, { size: 10.5, color: C.sub, line: 15 });
  });
  t(
    s,
    "检测 level 与解码 content 是两个完全不同的问题——不是难度的差别，而是问题本身的差别：前者问「有没有、有多少」，后者问「是什么」。",
    M,
    5.4,
    CW,
    0.54,
    { size: 13, bold: true, color: C.navyDeep }
  );
  t(
    s,
    "一个神经或生理指标可以被叫作「意识标记物」，但必须先说清它对应三者中的哪一个——否则「alpha 功率升高」会被直接写成「意识增强」。",
    M,
    5.98,
    CW,
    0.5,
    { size: 11.5, color: C.sub, line: 16 }
  );
  notes(
    s,
    "这一页的作用是给整场汇报立一套词汇。level 问的是「有多清醒」，state 问的是「此刻整体状态」，content 问的是「体验里是什么」。\n" +
      "强调中间那句话：检测 level 和解码 content 不是同一个问题的难易版本，而是两个不同的问题——这决定了实验设计和证据标准都不一样。\n" +
      "如果时间和听众水平允许，可以举一个反例：脑电 alpha 功率升高不等于「意识增强」，它更可能对应觉醒水平的变化。"
  );
}

// ================================================================ A2 no-report
{
  const s = slide_light(
    "第二幕 · 03 Kronemer 2025 · 方法",
    "为什么「让患者报告」会污染我们要测的东西"
  );
  const rows = [
    {
      head: "① 传统做法：把报告也算进测量",
      tone: C.amber,
      pale: C.amberPale,
      chips: ["刺激", "患者报告「我看到了」", "脑信号"],
      caption: "报告这个动作本身会改变脑活动——测量动作进入了被测量的对象。",
    },
    {
      head: "② no-report paradigm：把报告拿出去",
      tone: C.cyanDeep,
      pale: C.cyanPale,
      chips: ["刺激", "脑 / 生理信号", "不要求显性报告"],
      caption: "研究的是 consciousness 本身，而不是 reporting process。",
    },
  ];
  rows.forEach((r, i) => {
    const y = 1.9 + i * 1.5;
    card(s, M, y, CW, 1.4, { fill: r.pale, line: r.tone, lineW: 1.25 });
    t(s, r.head, M + 0.34, y + 0.12, 6.6, 0.3, {
      size: 12.5,
      bold: true,
      color: r.tone,
    });
    const sw = (CW - 0.68 - 0.4) / 3;
    r.chips.forEach((c, k) => {
      const x = M + 0.34 + k * (sw + 0.2);
      card(s, x, y + 0.5, sw, 0.5, { fill: "FFFFFF", line: C.line });
      t(s, c, x + 0.1, y + 0.5, sw - 0.2, 0.5, {
        size: 11.5,
        bold: true,
        color: C.text,
        align: "center",
        valign: "middle",
      });
      if (k < 2)
        t(s, "→", x + sw - 0.02, y + 0.5, 0.2, 0.5, {
          size: 12,
          color: r.tone,
          align: "center",
          valign: "middle",
        });
    });
    t(s, r.caption, M + 0.34, y + 1.06, CW - 0.68, 0.26, {
      size: 10.5,
      color: C.text,
    });
  });

  const pts = [
    ["在 DoC 场景尤其关键", "「能不能报告」本身就是待检验的变量，不能既当测量工具、又当结论依据。", C.navy],
    ["它剥离的是报告过程", "不是降低要求，而是把「报告」从信号里分离出去。", C.cyanDeep],
    ["代价是失去行为锚点", "因此反过来要求更强的对照设计——这正是下一页四道对照的来由。", C.amber],
  ];
  const gap = 0.26;
  const cwid = (CW - gap * 2) / 3;
  pts.forEach((p, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 4.94, cwid, 1.16, { fill: C.card });
    accentLeft(s, x, 4.94, 1.16, p[2]);
    t(s, p[0], x + 0.26, 5.06, cwid - 0.5, 0.3, {
      size: 12,
      bold: true,
      color: p[2],
    });
    t(s, p[1], x + 0.26, 5.4, cwid - 0.5, 0.62, { size: 10.5, color: C.text, line: 15 });
  });
  t(s, "▍本页涉及 03 原文正文，笔记为摘要级提取：原文需机构订阅，以上为公开摘要与综述框架层面的整理。", M, 6.26, CW, 0.28, {
    size: 9.5,
    color: C.amber,
  });
  notes(
    s,
    "这一页回答「为什么要费劲做无报告范式」。核心一句：报告本身是脑活动的一部分，所以让患者报告，等于把测量工具混进了被测对象。\n" +
      "在意识障碍场景这一点更尖锐：能不能报告，本来就是我们要判断的事情，不能同时拿它当尺子。\n" +
      "提醒听众：no-report 的代价是失去行为锚点，所以必须用更严的对照补回来。"
  );
}

// ================================================================ A2 four controls
{
  const s = slide_light("第二幕 · 03 Kronemer 2025 · 验证", "一条解码结果要成立，需要四道对照");
  const cons = [
    [
      "Masking",
      "同一刺激，分「被意识知觉」与「阈下」两种条件；解码性能应随意识状态系统性变化。",
      C.cyanDeep,
    ],
    [
      "注意力操控",
      "同一刺激，分「注意」与「非注意」；用来排除注意相关加工被误读成意识。",
      C.navy,
    ],
    [
      "No-report",
      "不要求患者回答，把报告过程从信号中剥离出去。",
      C.amber,
    ],
    [
      "跨模态验证",
      "EEG + fMRI + 自主神经信号同时指向同一结论，而不是单一模态自证。",
      "E07A5F",
    ],
  ];
  const gap = 0.26;
  const cwid = (CW - gap * 3) / 4;
  cons.forEach((c, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.0, cwid, 3.0, { fill: C.card });
    accentTop(s, x, 2.0, cwid, c[2]);
    t(s, c[0], x + 0.26, 2.22, cwid - 0.52, 0.4, {
      size: 15,
      face: FL,
      bold: true,
      color: c[2],
    });
    t(s, c[1], x + 0.26, 2.76, cwid - 0.52, 2.0, { size: 11.5, color: C.text, line: 16.5 });
  });
  t(
    s,
    "判据：如果模型在 conscious condition 下能稳定重建内容，而在 unconscious condition 下明显下降，才更可能说明解码信号与 conscious access 相关。",
    M,
    5.16,
    CW,
    0.52,
    { size: 12.5, bold: true, color: C.navyDeep }
  );
  conclusionBand(
    s,
    "普通 BCI 可以用行为结果作为 ground truth；意识 BCI 恰恰面临 ground truth 缺失——这是它比普通 BCI 难的根本原因。"
  );
  notes(
    s,
    "四道对照可以理解为「排除法」：每一道都在排除一种「不需要意识也能解释」的可能。\n" +
      "masking 排除感觉阈值；注意力操控排除注意；no-report 排除报告动作；跨模态排除单一模态的偶然。\n" +
      "读完判据后，落到汇报结论：普通 BCI 有行为结果当金标准，意识 BCI 没有，这才是它根本性的难点。"
  );
}

// ================================================================ A3 act divider
{
  const s = actDivider(
    3,
    "内容重建与闭环",
    "Reconstructing content, and closing the loop",
    "当「读」这一步站稳，BCI 就从一次检查变成一条通道：语义可以被重建，语言可以流式输出，声音可以保留说话人的身份。再往前一步，就是检测、干预、再检测的闭环。",
    [
      "为什么「意义」而不是「词」才是接口",
      "流式输出与持续交互改变了什么",
      "为什么必须多模态一起读",
      "从检测走向闭环调控：新机会与新风险",
    ]
  );
  notes(
    s,
    "第三幕开场。这一幕从技术基础走到临床，最后收在闭环调控上。\n" +
      "提示听众：接下来的每一篇都在解决上一幕留下的一个问题——语义重建解决「内容」的问题，流式与交互解决「时间」的问题，多模态与闭环解决「证据」的问题。"
  );
}

// ================================================================ 11 Tang
{
  const s = slide_light("观点 4 · 06 Tang 2023 · Nat Neurosci", "语义可以被重建");
  card(s, M, 1.98, 5.1, 2.34, { fill: C.card });
  t(s, "非侵入式 · fMRI", M + 0.36, 2.16, 4.4, 0.32, { size: 12, bold: true, color: C.sub });
  t(s, "脑信号 → 语义表征 → 语言", M + 0.36, 2.5, 4.4, 0.56, {
    size: 21,
    bold: true,
    color: C.navyDeep,
  });
  t(
    s,
    "被试连续听自然叙事故事；编码模型把语言放在高维语义空间里，解码器再反推语义并生成候选词序列。",
    M + 0.36,
    3.16,
    4.4,
    1.0,
    { size: 11.5, color: C.text, line: 16.5 }
  );

  card(s, M, 4.46, 5.1, 2.04, { fill: C.navyPale, line: C.navyPale });
  t(s, "关键判断", M + 0.36, 4.6, 4.4, 0.3, { size: 11.5, bold: true, color: C.navy });
  bullets(
    s,
    [
      "重建结果不逐字正确，但在语义层面保持了较强一致性——学的不是声音，是意义。",
      "意义的重建可以跨模态：听到的语言、想象说的语言、无声视频，共用同一个解码器。",
    ],
    M + 0.36,
    4.94,
    5.1 - 0.72,
    1.5,
    { size: 11, line: 16 }
  );

  const rx = M + 5.1 + 0.3;
  const rw = CW - 5.4;
  card(s, rx, 1.98, rw, 2.2, { fill: C.card });
  t(s, "测到了什么", rx + 0.36, 2.14, rw - 0.72, 0.32, { size: 13, bold: true, color: C.cyanDeep });
  bullets(
    s,
    [
      "72–82% 的时间点，解码结果与原始故事的 BERTScore 显著高于随机水平。",
      "只让被试阅读解码出来的文字，16 道阅读理解题中答对 9 道——解码文本在行为上真的可用。",
      "在多个皮层区域都能分别解出连续语言，不是单一区域的产物。",
    ],
    rx + 0.36,
    2.52,
    rw - 0.72,
    1.58,
    { size: 11, line: 16 }
  );

  card(s, rx, 4.32, rw, 2.18, { fill: C.amberPale, line: C.amber, lineW: 1.25 });
  t(s, "但不能就此说「读心」", rx + 0.36, 4.48, rw - 0.72, 0.32, {
    size: 12.5,
    bold: true,
    color: C.amber,
  });
  bullets(
    s,
    [
      "跨被试训练的 decoder 只略高于随机——训练必须个体化，且需要被试配合。",
      "默算、默想动物、讲另一个故事，都能显著压低解码性能：语义解码可被有意识抵抗。",
      "fMRI 无法做成实时 BCI；语义重建 ≠ 逐字转录。",
    ],
    rx + 0.36,
    4.86,
    rw - 0.72,
    1.56,
    { size: 10.5, line: 15 }
  );
  notes(
    s,
    "这是整条技术链的 proof of principle：非侵入、语义层面、跨模态。\n" +
      "两个必须念的数字：72–82% 的时间点语义相似度显著高于随机；只读解码文本也能答对 9/16 道阅读理解题。\n" +
      "右边的「不能就此说读心」同样重要——尤其是跨被试训练几乎失败，以及解码可以被主动抵抗。"
  );
}

// ================================================================ A3 meaning not words
{
  const s = slide_light("第三幕 · 06 Tang 2023 · 方法", "为什么「意义」才是接口");
  card(s, M, 1.94, 5.5, 1.72, { fill: C.paper, line: C.line });
  t(s, "脑 → 词", M + 0.34, 2.1, 4.82, 0.4, { size: 17, bold: true, color: C.sub });
  t(
    s,
    "识别的是刺激本身：这个人听到了哪个词。仍然接近 stimulus recognition。",
    M + 0.34,
    2.56,
    4.82,
    0.94,
    { size: 11.5, color: C.text, line: 16.5 }
  );
  card(s, M + 5.8, 1.94, CW - 5.8, 1.72, { fill: C.cyanPale, line: C.cyan, lineW: 1.25 });
  t(s, "脑 → 意义", M + 6.14, 2.1, CW - 6.48, 0.4, {
    size: 17,
    bold: true,
    color: C.navyDeep,
  });
  t(
    s,
    "重建的是这个人理解到的内容。更接近高层级的认知表征，也更接近意识研究关心的东西。",
    M + 6.14,
    2.56,
    CW - 6.48,
    0.94,
    { size: 11.5, color: C.text, line: 16.5 }
  );
  t(
    s,
    "意识体验往往不是感官像素，而是整合后的语义与概念内容——所以语义层面的「差不多」，比逐词正确率更接近我们真正想读的东西。",
    M,
    3.8,
    CW,
    0.44,
    { size: 13, bold: true, color: C.navyDeep }
  );

  const pts = [
    [
      "指标选择本身就是立场",
      "不同词可以表达同一意思（“we were busy” 与 “we had a lot of work”），所以用 BERTScore 这类意义相似度衡量；用 WER 衡量会系统性低估这套系统的价值。",
      C.cyanDeep,
    ],
    [
      "行为学验证：解码文本真的可用",
      "只让被试阅读解码出来的文字，16 道阅读理解题中答对 9 道。",
      C.navy,
    ],
    [
      "意义是跨模态共享的",
      "听过的语言、想象说的语言、无声视频，共用同一个解码器。",
      C.amber,
    ],
  ];
  const gap = 0.26;
  const cwid = (CW - gap * 2) / 3;
  pts.forEach((p, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 4.38, cwid, 1.94, { fill: C.card });
    accentTop(s, x, 4.38, cwid, p[2]);
    t(s, p[0], x + 0.28, 4.6, cwid - 0.56, 0.68, { size: 12.5, bold: true, color: p[2], line: 17 });
    t(s, p[1], x + 0.28, 5.3, cwid - 0.56, 0.98, { size: 10.5, color: C.text, line: 15 });
  });
  notes(
    s,
    "这一页回答「为什么是语义，而不是词」。左边是刺激识别，右边是意义重建——后者才对应意识研究关心的层级。\n" +
      "第二点很实用：用词错率评价这类系统会冤枉它，因为同义表达本来就允许不同词；要用意义相似度和下游任务可用性来评价。\n" +
      "第三点给后面做铺垫：意义是跨模态共享的，这正是把语义解码迁移到听觉语言、想象语言的依据。"
  );
}

// ================================================================ A3 semantic limits
{
  const s = slide_light("第三幕 · 06 Tang 2023 · 边界", "语义解码的四个代价");
  const costs = [
    ["设备", "fMRI 需要大型设备与完全配合，无法直接做成实时临床 BCI。", C.navy],
    ["训练", "跨被试训练的 decoder 只略高于随机，模型必须个体化，且需要被试配合。", C.cyanDeep],
    ["抵抗", "默算、默想动物、讲另一个故事，都会显著压低解码性能——解码可以被有意识地抵抗。", C.amber],
    ["隐私", "如果语义可以被恢复，mental privacy 就从假设变成一个现实问题。", "E07A5F"],
  ];
  const gap = 0.26;
  const cwid = (CW - gap * 3) / 4;
  costs.forEach((c, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 1.98, cwid, 2.3, { fill: C.card });
    accentTop(s, x, 1.98, cwid, c[2]);
    t(s, c[0], x + 0.26, 2.18, cwid - 0.52, 0.38, {
      size: 15,
      bold: true,
      color: c[2],
    });
    t(s, c[1], x + 0.26, 2.68, cwid - 0.52, 1.5, { size: 11, color: C.text, line: 15.5 });
  });
  card(s, M, 4.44, CW, 1.5, { fill: C.navyPale, line: C.navyPale });
  t(s, "本汇报推论", M + 0.34, 4.58, 1.6, 0.3, {
    size: 11,
    bold: true,
    spacing: 1.2,
    color: C.navy,
  });
  t(
    s,
    "在一篇以「能解码多少」为卖点的论文里，最有价值的证据其实是「可以被抵抗」：它证明输出真的取决于被试当下的认知状态，而不是信号里一个稳定的指纹。这也意味着，跨被试失败的结论不能直接外推到意识障碍患者——我们无从确认他们能不能表达「不合作」。",
    M + 0.34,
    4.9,
    CW - 0.68,
    0.94,
    { size: 11.5, color: C.text, line: 16.5 }
  );
  conclusionBand(
    s,
    "语义解码目前仍是 proof of principle；真正临床可用的版本，需要把同样的能力搬到 EEG / ECoG / iEEG 上做实时解码。"
  );
  notes(
    s,
    "四个代价里，前两个是设备与训练成本，后两个更值得讨论。\n" +
      "「抵抗」这一条请重点讲：它看起来是限制，其实是质量证明——说明解码依赖被试的认知状态。\n" +
      "底部那条推论是把 06 和后面的临床场景连起来：跨被试失败不等于患者不可解码，因为患者未必能表达「不合作」。"
  );
}

// ================================================================ A3 streaming
{
  const s = slide_light("第三幕 · 04 Littlejohn 2025 · 概念", "延迟不是体验问题，而是范式问题");
  const rows = [
    {
      head: "① 等待式：先判断有没有在说，再解码整段",
      tone: C.amber,
      pale: C.amberPale,
      chips: ["检测语音起始", "收集整段信号", "解码", "合成"],
      caption: "系统必须知道一句话什么时候开始、什么时候结束。",
    },
    {
      head: "② 流式：神经流一直进，80 ms 一块地解",
      tone: C.cyanDeep,
      pale: C.cyanPale,
      chips: ["神经流", "80 ms 分块", "在线解码", "即时合成"],
      caption: "不需要独立的语音起始检测器，也不需要等一句话说完。",
    },
  ];
  rows.forEach((r, i) => {
    const y = 1.9 + i * 1.14;
    card(s, M, y, CW, 1.02, { fill: r.pale, line: r.tone, lineW: 1.25 });
    t(s, r.head, M + 0.34, y + 0.06, 5.6, 0.28, { size: 12, bold: true, color: r.tone });
    const sw = (CW - 0.68 - 0.5) / 4;
    r.chips.forEach((c, k) => {
      const x = M + 0.34 + k * (sw + 0.166);
      card(s, x, y + 0.4, sw, 0.44, { fill: "FFFFFF", line: C.line });
      t(s, c, x + 0.06, y + 0.4, sw - 0.12, 0.44, {
        size: 10.5,
        bold: true,
        color: C.text,
        align: "center",
        valign: "middle",
      });
      if (k < 3)
        t(s, "→", x + sw - 0.02, y + 0.4, 0.18, 0.44, {
          size: 11,
          color: r.tone,
          align: "center",
          valign: "middle",
        });
    });
    t(s, r.caption, M + 0.34, y + 0.8, CW - 0.68, 0.22, { size: 8.5, color: C.text });
  });

  const pts = [
    ["系统一直在听", "连续工作、减少等待，支持自然对话——而不是一问一答。", C.cyanDeep],
    ["不需要开始 / 结束信号", "解码器自己完成隐式的语音检测，患者不用先「启动」系统。", C.navy],
    ["关键数字", "80 ms 增量解码；单次推理在 80 ms 内完成的比例约 99.3%；流式约 46.5 词/分，延迟合成约 24.8 词/分。", C.amber],
  ];
  const gap = 0.26;
  const cwid = (CW - gap * 2) / 3;
  pts.forEach((p, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 4.26, cwid, 1.5, { fill: C.card });
    accentTop(s, x, 4.26, cwid, p[2]);
    t(s, p[0], x + 0.28, 4.48, cwid - 0.56, 0.4, { size: 13, bold: true, color: p[2] });
    t(s, p[1], x + 0.28, 4.94, cwid - 0.56, 0.78, { size: 10.5, color: C.text, line: 15 });
  });
  t(
    s,
    "本汇报推论：流式改变的不只是速度，而是「系统一直在场」这个前提——而持续在场，恰好是意识评估最需要的那个前提。",
    M,
    5.78,
    CW,
    0.34,
    { size: 12, bold: true, color: C.navyDeep }
  );
  conclusionBand(
    s,
    "从 assessment 到 communication 的关键跨越：问题不再只是「能不能检测到」，而是「能不能持续表达」。"
  );
  notes(
    s,
    "这一页把「延迟」从工程细节提升为范式问题：等待式系统必须切分句子，流式系统则是连续在场。\n" +
      "关键数字念三个就够：80 ms、约 99.3%、46.5 对 24.8 词/分。注意 04 的笔记是摘要级，引用时说明。\n" +
      "底部推论是全场主线的一部分：流式带来的「持续在场」，是第三幕后半段「持续交互」的技术前提。"
  );
}

// ================================================================ 12 two speech routes
{
  const s = slide_light(
    "观点 5 · 04 Littlejohn 2025 & 05 Wairagkar 2025",
    "两条路线：流式语言 vs 直接声学"
  );
  const colW = (CW - 0.34) / 2;
  const cols = [
    {
      x: M,
      tag: "04 · Nature Neuroscience 2025",
      head: "流式脑→语音",
      tone: C.navy,
      rows: [
        ["记录", "高密度皮层表面电极（ECoG），重点覆盖言语感觉运动皮层"],
        ["模型", "RNN-T 类模型，按 80 ms 增量在线解码，不依赖独立的语音起始检测器"],
        ["结果", "流式合成约 46.5 词/分（延迟合成 24.8 词/分）；单次推理在 80 ms 内完成的比例约 99.3%"],
        ["代价", "1024 词通用句集上，语音 WER 中位数约 40.8%，文本约 30.7%"],
      ],
      foot: "本篇笔记为摘要级提取。",
    },
    {
      x: M + colW + 0.34,
      tag: "05 · Nature 2025",
      head: "即时声音合成",
      tone: C.cyanDeep,
      rows: [
        ["记录", "皮层内 4 个微电极阵列共 256 个电极，约 1 ms 数据包实时进入系统"],
        ["模型", "Transformer 直接预测声学语音特征，再驱动合成器输出声音"],
        ["结果", "6 选 1 句子匹配平均准确率 94.34%；合成语音 WER 43.75%，而患者自身残余语音为 96.43%"],
        ["边界", "因果（实时）合成质量仍低于事后合成（倒谱失真 2.9 对 2.4）"],
      ],
      foot: "基于本地全文，含作者自陈局限。",
    },
  ];
  cols.forEach((c) => {
    card(s, c.x, 1.98, colW, 4.42, { fill: C.card });
    accentTop(s, c.x, 1.98, colW, c.tone);
    t(s, c.tag, c.x + 0.34, 2.18, colW - 0.68, 0.28, {
      size: 10,
      face: FL,
      bold: true,
      color: c.tone,
    });
    t(s, c.head, c.x + 0.34, 2.48, colW - 0.68, 0.46, { size: 20, bold: true, color: C.navyDeep });
    c.rows.forEach((r, i) => {
      const y = 3.04 + i * 0.76;
      t(s, r[0], c.x + 0.34, y, 1.0, 0.3, { size: 11, bold: true, color: c.tone });
      t(s, r[1], c.x + 1.42, y, colW - 1.76, 0.74, { size: 11, color: C.text, line: 15.5 });
    });
    t(s, c.foot, c.x + 0.34, 6.08, colW - 0.68, 0.28, { size: 9.5, color: C.sub });
  });
  t(
    s,
    "共同结论：BCI 已从「解码想移动什么」走到「解码想说什么，以及声音该怎么表达」。",
    M,
    6.56,
    CW,
    0.36,
    { size: 13.5, bold: true, color: C.navyDeep }
  );
  notes(
    s,
    "把两篇语音 BCI 放在一起对照：一条是「流式语言模型」，一条是「直接声学合成」。\n" +
      "05 最关键的数字是合成语音 WER 43.75% 对患者自身残余语音 96.43%——这是可懂度的实质提升。\n" +
      "同时点出两张牌面下的代价：流式的 WER 仍高；实时的音质仍不如事后合成。"
  );
}

// ================================================================ A3 expressiveness
{
  const s = slide_light("第三幕 · 05 Wairagkar 2025 · Nature", "声音不只是「说了什么」");
  card(s, M, 1.96, 4.6, 4.12, { fill: C.card });
  t(s, "语言有很多层级，这项研究抓的是最后一段", M + 0.32, 2.12, 3.96, 0.32, {
    size: 12,
    bold: true,
    color: C.navy,
  });
  const layers = ["thought 想法", "semantic 语义", "linguistic 语言", "phonological 音位", "articulatory 发音", "acoustic 声学"];
  layers.forEach((l, i) => {
    const hot = i >= 4;
    const y = 2.52 + i * 0.5;
    card(s, M + 0.32, y, 3.96, 0.44, {
      fill: hot ? C.cyanPale : C.paper,
      line: hot ? C.cyan : C.line,
    });
    t(s, l, M + 0.5, y, 3.6, 0.44, {
      size: 11.5,
      bold: hot,
      color: C.text,
      valign: "middle",
    });
  });
  t(
    s,
    "本研究报告的是：从发音相关神经表征直接预测声学输出。",
    M + 0.32,
    5.5,
    3.96,
    0.5,
    { size: 10.5, color: C.sub, line: 14.5 }
  );

  const rx = M + 4.9;
  const rw = CW - 4.9;
  const ev = [
    [
      "副语言特征被解出来了",
      "除音位内容外，还从皮层内活动解码出副语言特征，参与者可以实时调节合成语音的语调，并演唱短旋律。",
      C.cyanDeep,
    ],
    [
      "能说词表以外的声音",
      "可以直接产生非词声音与感叹词，这是依赖语言模型 / 词表的语音 BCI 做不到的；而且这些类别并未用于训练。",
      C.navy,
    ],
    [
      "默说也能合成",
      "只在有声模仿说话上训练过的解码器，对默说（mimed speech）同样能合成（r = 0.82±0.03，与有声条件无统计差异），参与者还反馈默说更省力。",
      C.amber,
    ],
    [
      "身份被保留下来",
      "合成的是他自己的声音。参与者用它报告：听到自己的声音「made me feel happy and it felt like my real voice」。",
      "E07A5F",
    ],
  ];
  ev.forEach((e, i) => {
    const y = 1.96 + i * 1.02;
    card(s, rx, y, rw, 0.92, { fill: C.card });
    accentLeft(s, rx, y, 0.92, e[2]);
    t(s, e[0], rx + 0.3, y + 0.08, rw - 0.56, 0.3, { size: 12.5, bold: true, color: e[2] });
    t(s, e[1], rx + 0.3, y + 0.4, rw - 0.56, 0.5, { size: 10.5, color: C.text, line: 14.5 });
  });

  t(
    s,
    "声音同时传递情绪、强调、语调与说话方式——所以 speech BCI 的目标从 text output 转向 natural communication。",
    M,
    6.12,
    CW,
    0.36,
    { size: 12, bold: true, color: C.navyDeep }
  );
  notes(
    s,
    "这一页把「表达性」讲成一个独立的价值，而不是语音输出的附加功能。\n" +
      "左边这条语言层级链说明：这项研究抓的是发音到声学这一段，是最靠近输出的那一层——这也是它的边界所在，它读到的还不是抽象思维。\n" +
      "右边四条里，最容易被忽略也最动人的是第四条：患者听到自己原本的声音。请把原话念出来。"
  );
}

// ================================================================ 13 counterintuitive
{
  const s = slide_dark("05 Wairagkar 2025 · Nature", "一个反直觉的发现");
  s.addImage({ path: path.join(ASSETS, "wave_dark.png"), x: -0.3, y: 5.6, w: 13.95, h: 2.6 });

  card(s, M, 2.06, 5.5, 1.9, { fill: C.inkSoft, line: C.inkLine });
  t(s, "output-potent 维度", M + 0.4, 2.22, 4.7, 0.32, { size: 12, bold: true, color: C.cyan });
  t(s, "2.5%", M + 0.4, 2.52, 2.2, 0.9, {
    size: 44,
    face: FL,
    bold: true,
    color: C.onDark,
    valign: "middle",
  });
  t(s, "的神经活动方差", M + 2.7, 2.9, 2.5, 0.4, { size: 11.5, color: C.onDarkSub });
  t(s, "解码相关系数 r = 0.82", M + 0.4, 3.44, 4.7, 0.4, {
    size: 13,
    face: FL,
    color: C.onDark,
  });

  card(s, M + 5.76, 2.06, 6.33, 1.9, { fill: C.inkSoft, line: C.inkLine });
  t(s, "output-null 维度", M + 6.16, 2.22, 5.5, 0.32, { size: 12, bold: true, color: C.amber });
  t(s, "97.5%", M + 6.16, 2.52, 2.28, 0.9, {
    size: 44,
    face: FL,
    bold: true,
    color: C.onDark,
    valign: "middle",
  });
  t(s, "的神经活动方差", M + 8.52, 2.9, 3.2, 0.4, { size: 11.5, color: C.onDarkSub });
  t(s, "解码相关系数 r = 0.85", M + 6.16, 3.44, 5.5, 0.4, {
    size: 13,
    face: FL,
    color: C.onDark,
  });

  card(s, M, 4.2, CW, 1.42, { fill: C.inkSoft, line: C.cyan, lineW: 1.25 });
  t(
    s,
    "只占 2.5% 方差的「输出相关」维度，解码效果几乎与占 97.5% 方差的「输出无关」维度相当。",
    M + 0.4,
    4.38,
    CW - 0.8,
    0.46,
    { size: 14.5, bold: true, color: C.onDark }
  );
  t(
    s,
    "作者的解释：言语运动皮层的多数活动并不直接驱动发声，而是在为整句做计划与缓冲（「整句缓冲、逐渐清空」）。这部分「看不见的输出」，反而给因果解码提供了提前量。",
    M + 0.4,
    4.88,
    CW - 0.8,
    0.66,
    { size: 11.5, color: C.onDarkSub, line: 16 }
  );
  t(
    s,
    "对工程的意义：低时延解码之所以可行，靠的可能正是这部分「准备性活动」。",
    M,
    5.86,
    CW,
    0.4,
    { size: 12.5, bold: true, color: C.cyan }
  );
  notes(
    s,
    "这一页单独拎出来，因为它对组里做解码的人最有用：真正携带语音信息的不一定是「驱动发声」的那部分活动。\n" +
      "2.5% 对 97.5% 的对比，说明大部分方差是任务相关的准备/缓冲活动，而不是输出本身。"
  );
}

// ================================================================ 14 du Bois
{
  const s = slide_light(
    "观点 6 · 07 du Bois 2026 · Communications Medicine",
    "从概念验证走向床旁系统"
  );
  const chips = [
    ["44", "名参与者：UWS 14 / MCS 17 / LIS 11，另 2 名健全者作基准"],
    ["73.8%", "的患者获得显著的运动想象 BCI 解码准确率"],
    ["90%", "的显著者进入问答阶段，常超过 70% 的可用性阈值"],
  ];
  const cwid = (CW - 0.24 * 2) / 3;
  chips.forEach((c, i) => {
    const x = M + i * (cwid + 0.24);
    card(s, x, 1.92, cwid, 1.5, { fill: C.card });
    t(s, c[0], x + 0.3, 2.02, cwid - 0.6, 0.66, {
      size: 26,
      face: FL,
      bold: true,
      color: C.navy,
      valign: "middle",
    });
    t(s, c[1], x + 0.3, 2.7, cwid - 0.6, 0.64, {
      size: 10.5,
      color: C.sub,
      line: 15,
    });
  });

  s.addChart(
    pres.ChartType.bar,
    [
      { name: "整合前", labels: ["平衡诊断准确率", "MCS 灵敏度", "LIS 灵敏度"], values: [55, 39, 78] },
      { name: "整合 MI-BCI DA 后", labels: ["平衡诊断准确率", "MCS 灵敏度", "LIS 灵敏度"], values: [62, 69, 67] },
    ],
    {
      x: M - 0.1,
      y: 3.6,
      w: 6.35,
      h: 3.0,
      barDir: "col",
      barGrouping: "clustered",
      barGapWidthPct: 55,
      chartColors: ["B9CBDC", "17527A"],
      showTitle: true,
      title: "留一被试交叉验证：整合 DA 前后的诊断性能（%）",
      titleFontSize: 10.5,
      titleColor: C.text,
      titleFontFace: F,
      showValue: true,
      dataLabelPosition: "outEnd",
      dataLabelFontSize: 9.5,
      dataLabelColor: C.text,
      dataLabelFontFace: FL,
      valAxisMinVal: 0,
      valAxisMaxVal: 100,
      valAxisLabelFontSize: 9,
      valAxisLabelColor: C.sub,
      valAxisLabelFontFace: FL,
      catAxisLabelFontSize: 10,
      catAxisLabelColor: C.text,
      catAxisLabelFontFace: F,
      valGridLine: { color: "E3EAF1", size: 0.75 },
      catGridLine: { style: "none" },
      showLegend: true,
      legendPos: "b",
      legendFontSize: 9.5,
      legendFontFace: F,
      legendColor: C.sub,
    }
  );

  const rx = M + 6.5;
  const rw = CW - 6.5;
  card(s, rx, 3.6, rw, 3.0, { fill: C.card });
  t(s, "最锋利的一处：与行为学不共线", rx + 0.34, 3.76, rw - 0.68, 0.32, {
    size: 13,
    bold: true,
    color: C.amber,
  });
  bullets(
    s,
    [
      "解码准确率与 WHIM 显著相关（偏相关 r = 0.43，p = 0.02），与 CRS-R 无关（p = 0.89）。",
      "单模态排名：WHIM 59.4% ＞ DA 57.3% ＞ CRS-R 49.4%——行为学金标准 CRS-R 反而是三者中最弱。",
      "收益集中在 MCS：灵敏度 39% → 69%；LIS 反而略降（78% → 67%），提示 LIS 仍以 DA 单独预测最好。",
    ],
    rx + 0.34,
    4.18,
    rw - 0.68,
    2.3,
    { size: 11, line: 16 }
  );
  notes(
    s,
    "这一页从「方法」转到「临床价值」。核心论证是：BCI 指标之所以有用，是因为它与行为学不共线。\n" +
      "注意作者自己也承认，诊断本来就是用有缺陷的尺子做出来的，所以「DA 与 CRS-R 无关」并不令人意外——真正的问题在尺子。"
  );
}

// ================================================================ A3 interaction
{
  const s = slide_light("第三幕 · 07 du Bois 2026 · 临床应用", "意识评估不是一次横断面检查");
  card(s, M, 1.98, 5.5, 2.3, { fill: C.amberPale, line: C.amber, lineW: 1.25 });
  t(s, "一次性检查的三种失败模式", M + 0.34, 2.12, 4.82, 0.32, {
    size: 13,
    bold: true,
    color: C.amber,
  });
  bullets(
    s,
    [
      "疲劳：越到测试后段，表现越差。",
      "注意波动：单次测量的信噪比本就很低。",
      "单次阴性：很容易被读成「无意识」，于是把「这一次没测到」当成「没有」。",
    ],
    M + 0.34,
    2.54,
    4.82,
    1.6,
    { size: 11, line: 16 }
  );

  const rx = M + 5.8;
  const rw = CW - 5.8;
  card(s, rx, 1.98, rw, 2.3, { fill: C.card });
  t(s, "结构化、多阶段的交互方案（44 人）", rx + 0.34, 2.12, rw - 0.68, 0.32, {
    size: 13,
    bold: true,
    color: C.navy,
  });
  bullets(
    s,
    [
      "阶段推进：感觉运动节律调制 → BCI 训练 → 有 / 无神经反馈训练 → 二选一问答。",
      "每次会话同步做 CRS-R 与 WHIM 行为学评估，两种尺子都留着。",
      "73.8% 的患者达到显著的解码准确率，其中 90% 进入问答阶段。",
    ],
    rx + 0.34,
    2.54,
    rw - 0.68,
    1.6,
    { size: 11, line: 16 }
  );

  card(s, M, 4.42, CW, 1.5, { fill: C.card });
  t(s, "从「检查」到「对话」：交互回路", M + 0.34, 4.54, 6.0, 0.3, {
    size: 12.5,
    bold: true,
    color: C.cyanDeep,
  });
  const loop = ["系统发出指令", "患者产生内部反应", "EEG", "decoder", "系统继续交互"];
  const lw = (CW - 0.68 - 0.64) / 5;
  loop.forEach((v, i) => {
    const x = M + 0.34 + i * (lw + 0.16);
    card(s, x, 4.9, lw, 0.46, { fill: C.cyanPale, line: C.cyanPale });
    t(s, v, x + 0.06, 4.9, lw - 0.12, 0.46, {
      size: 10.5,
      bold: true,
      color: C.navyDeep,
      align: "center",
      valign: "middle",
    });
    if (i < 4)
      t(s, "→", x + lw - 0.02, 4.9, 0.18, 0.46, {
        size: 11,
        color: C.cyan,
        align: "center",
        valign: "middle",
      });
  });
  t(
    s,
    "本汇报推论：这把「一次表现」换成「随时间的可重复性」，等于把单次阴性从「证据」降级为「一个事件」。04 的流式与 07 的持续交互其实是同一件事的两个层面——一个是通道连续，一个是关系连续。",
    M + 0.34,
    5.36,
    CW - 0.68,
    0.56,
    { size: 11, color: C.text, line: 15 }
  );
  conclusionBand(
    s,
    "意识 BCI 正从实验室的 EEG 范式，走向 wearable、interactive、bedside 的系统。"
  );
  notes(
    s,
    "这一页把 07 的「结构化多阶段协议」讲成一个范式变化，而不是流程细节。\n" +
      "左边三种失败模式是每个做临床测量的人都会遇到的，请具体讲：疲劳和注意波动会造成假阴性，而假阴性会被当作「无意识」的证据。\n" +
      "右边给出答案：把一次性检查换成持续交互，让「一次没做到」不再等于「做不到」。\n" +
      "底部推论是全场的第二句主线：通道的连续性与关系的连续性，其实是同一个方向的两次推进。"
  );
}

// ================================================================ 15 du Bois caveats
{
  const s = slide_light("观点 6 · 需要标注的地方", "两处需要谨慎阅读的结果");
  const colW = (CW - 0.3) / 2;

  card(s, M, 1.98, colW, 2.94, { fill: C.card });
  accentTop(s, M, 1.98, colW, C.navy);
  t(s, "① 一个尚未区分的效应", M + 0.34, 2.2, colW - 0.68, 0.34, {
    size: 14,
    bold: true,
    color: C.navy,
  });
  t(
    s,
    "限定「显著 run」后，UWS 组在问答阶段的解码准确率反而高于 MCS 组（p = 0.049）。",
    M + 0.34,
    2.6,
    colW - 0.68,
    0.7,
    { size: 11.5, bold: true, color: C.text, line: 16.5 }
  );
  bullets(
    s,
    [
      "解释 A：问答由熟悉的照护者／亲属录音，情感显著性提升了 UWS 患者的投入度。",
      "解释 B：UWS 组本身被标准行为学评估系统性低估。",
      "作者并列给出两种解释，并未区分——这正是「MI-BCI 可能发现被漏掉的人」的最强线索，也仍是待检验的问题。",
    ],
    M + 0.34,
    3.38,
    colW - 0.68,
    1.5,
    { size: 10.5, line: 15 }
  );

  card(s, M + colW + 0.3, 1.98, colW, 2.94, { fill: C.amberPale, line: C.amber, lineW: 1.25 });
  t(s, "② 一个数字不一致", M + colW + 0.64, 2.2, colW - 0.68, 0.34, {
    size: 14,
    bold: true,
    color: C.amber,
  });
  t(
    s,
    "融合模型的平衡诊断准确率，在文中出现了三个数值：",
    M + colW + 0.64,
    2.6,
    colW - 0.68,
    0.4,
    { size: 11.5, color: C.text }
  );
  const vals = [
    ["61.81%", "Results"],
    ["63.21%", "Discussion"],
    ["62%", "Abstract"],
  ];
  vals.forEach((v, i) => {
    const x = M + colW + 0.64 + i * ((colW - 0.68) / 3);
    t(s, v[0], x, 3.06, (colW - 0.68) / 3 - 0.1, 0.46, {
      size: 19,
      face: FL,
      bold: true,
      color: C.amber,
    });
    t(s, v[1], x, 3.54, (colW - 0.68) / 3 - 0.1, 0.3, { size: 10, color: C.sub });
  });
  t(
    s,
    "引用时建议写作「约 62%（61.8–63.2%）」，或以出版社终版为准。",
    M + colW + 0.64,
    3.9,
    colW - 0.68,
    0.44,
    { size: 10.5, bold: true, color: C.text, line: 15 }
  );

  card(s, M, 5.08, CW, 1.5, { fill: C.navyDeep, line: C.navyDeep });
  t(s, "③ 一个关键限定：诊断本身就是用有缺陷的尺子做出的", M + 0.4, 5.18, CW - 0.8, 0.32, {
    size: 13.5,
    bold: true,
    color: C.cyan,
  });
  t(
    s,
    "“At issue is whether diagnoses formed using assessment measures that require overt behavioural responses are accurate.”",
    M + 0.4,
    5.54,
    CW - 0.8,
    0.46,
    { size: 11.5, italic: true, face: FL, color: C.onDark, line: 15.5 }
  );
  t(
    s,
    "作者用这一句把问题打回原点：CRS-R 与 WHIM 都要求外显行为，因此不能拿它们当作「意识」的绝对金标准。",
    M + 0.4,
    6.04,
    CW - 0.8,
    0.44,
    { size: 11, color: C.onDarkSub, line: 15.5 }
  );
  notes(
    s,
    "这一页体现读书笔记的纪律：把增强结论的数字和削弱结论的数字一起留下。\n" +
      "UWS 反超 MCS 这个结果，作者自己也没有定论，我们如实呈现两种解释。\n" +
      "数字不一致的三个数值并列保留，引用时给区间。"
  );
}

// ================================================================ A3 multimodal
{
  const s = slide_light("第三幕 · 08 Kordas 2026 · 多模态", "为什么必须一起读");
  card(s, M, 1.96, 5.5, 2.68, { fill: C.card });
  t(s, "单一模态各自的边界", M + 0.34, 2.1, 4.82, 0.32, {
    size: 13,
    bold: true,
    color: C.navy,
  });
  const mods = [
    ["EEG", "时间分辨率高、可床旁；但空间分辨率有限，且背景活动异常时信号质量差。", C.cyanDeep],
    ["fMRI", "空间分辨率高；但时间分辨率差、不可移动，重症患者转运困难。", C.navy],
    ["fNIRS", "可便携、可在床旁重复、能结合主动范式；但只是间接的血流动力学指标。", C.amber],
  ];
  mods.forEach((m, i) => {
    const y = 2.5 + i * 0.7;
    t(s, m[0], M + 0.34, y, 0.9, 0.62, { size: 11.5, face: FL, bold: true, color: m[2] });
    t(s, m[1], M + 1.32, y, 4.5, 0.62, { size: 10.5, color: C.text, line: 14.5 });
  });

  const rx = M + 5.8;
  const rw = CW - 5.8;
  card(s, rx, 1.96, rw, 2.68, { fill: C.navyPale, line: C.navyPale });
  t(s, "融合的目标：把各自的盲区互相补上", rx + 0.34, 2.1, rw - 0.68, 0.32, {
    size: 13,
    bold: true,
    color: C.navy,
  });
  const fuse = ["EEG", "fMRI", "fNIRS", "生理信号", "行为学"];
  const fw = (rw - 0.68 - 0.32) / 3;
  fuse.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = rx + 0.34 + col * (fw + 0.16);
    const y = 2.5 + row * 0.62;
    card(s, x, y, fw, 0.5, { fill: "FFFFFF", line: C.line });
    t(s, f, x + 0.06, y, fw - 0.12, 0.5, {
      size: 11,
      bold: true,
      color: C.navyDeep,
      align: "center",
      valign: "middle",
    });
  });
  t(s, "AI 融合 → 多模态认知状态评估", rx + 0.34, 3.82, rw - 0.68, 0.7, {
    size: 12.5,
    bold: true,
    color: C.navyDeep,
    line: 17,
  });

  card(s, M, 4.8, CW, 1.16, { fill: C.card });
  bullets(
    s,
    [
      "作者明确限定：自主神经指标（心率变异性、压力反射指数）是觉醒与投入的辅助生理背景，不是意识的直接标志物。",
      "本汇报推论：单一模态的阴性结果，无法区分「没有意识」和「这个模态看不到」——这正是必须多模态的根本理由，而不是把准确率再抬几个百分点。",
    ],
    M + 0.34,
    4.94,
    CW - 0.68,
    0.9,
    { size: 11, line: 15.5 }
  );
  notes(
    s,
    "这一页回答「为什么要折腾多模态」。依次说清三种模态各自的边界，再指出融合的意义是互补盲区，不是简单叠加准确率。\n" +
      "第一条要注意：作者本人明确把自主神经指标限定为背景信息，不是意识标志物——这个限定要保留。\n" +
      "底部推论请重点讲：单一模态的阴性，本身不携带「没有意识」这个信息。"
  );
}

// ================================================================ 16 Kordas
{
  const s = slide_light(
    "观点 7 · 08 Kordas 2026 · J Clin Med",
    "下一阶段：多模态 + AI + 个体化 + 闭环"
  );
  t(s, "从诊断到交流：五个阶段", M, 1.9, CW, 0.34, { size: 13.5, bold: true, color: C.navy });
  const stages = [
    ["Stage 1", "意识状态分类"],
    ["Stage 2", "隐蔽指令检测"],
    ["Stage 3", "是 / 否 交流"],
    ["Stage 4", "语义解码 → 语言"],
    ["Stage 5", "意识内容 → 交流"],
  ];
  const sw = (CW + 0.3 * 4) / 5;
  stages.forEach((st, i) => {
    const x = M + i * (sw - 0.3);
    s.addShape(pres.ShapeType.chevron, {
      x,
      y: 2.24,
      w: sw,
      h: 0.82,
      fill: { color: i < 3 ? C.navy : C.cyanDeep },
      line: { color: i < 3 ? C.navy : C.cyanDeep, width: 0 },
    });
    t(s, st[0], x + 0.34, 2.33, sw - 0.6, 0.26, {
      size: 9.5,
      face: FL,
      bold: true,
      color: "CFE3EE",
    });
    t(s, st[1], x + 0.34, 2.59, sw - 0.62, 0.4, {
      size: 12,
      bold: true,
      color: "FFFFFF",
      valign: "middle",
    });
  });

  card(s, M, 3.36, 7.55, 3.0, { fill: C.card });
  t(s, "从检测到闭环", M + 0.36, 3.52, 6.8, 0.32, { size: 13.5, bold: true, color: C.navy });
  const loop = ["脑信号", "AI 解码", "意识状态", "神经调控", "再评估"];
  const lw = (6.84 - 0.16 * 4) / 5;
  loop.forEach((v, i) => {
    const x = M + 0.36 + i * (lw + 0.16);
    card(s, x, 4.04, lw, 1.02, { fill: C.paper, line: C.line });
    t(s, v, x + 0.08, 4.04, lw - 0.16, 1.02, {
      size: 11.5,
      bold: true,
      color: C.navyDeep,
      align: "center",
      valign: "middle",
    });
    if (i < 4)
      t(s, "→", x + lw - 0.02, 4.04, 0.2, 1.02, {
        size: 12,
        color: C.cyan,
        align: "center",
        valign: "middle",
      });
  });
  t(
    s,
    "BCI 不再只是被动测量，而可能成为「评估 + 干预」系统：检测 → 干预 → 再检测。",
    M + 0.36,
    5.3,
    6.84,
    0.9,
    { size: 11.5, color: C.text, line: 16.5 }
  );

  const rx = M + 7.85;
  const rw = CW - 7.85;
  card(s, rx, 3.36, rw, 3.0, { fill: C.navyPale, line: C.navyPale });
  t(s, "AI 在其中的四个角色", rx + 0.34, 3.52, rw - 0.68, 0.32, {
    size: 13.5,
    bold: true,
    color: C.navy,
  });
  const roles = [
    ["特征提取", "频谱、连接性、时间动态、网络表征"],
    ["表征学习", "寻找可迁移的神经状态表征"],
    ["多模态融合", "EEG / fMRI / fNIRS / 生理 / 行为"],
    ["个体化解码", "不同患者损伤位置不同，需要患者级适配"],
  ];
  roles.forEach((r, i) => {
    const y = 3.98 + i * 0.58;
    t(s, r[0], rx + 0.34, y, 1.5, 0.52, { size: 11.5, bold: true, color: C.cyanDeep, valign: "top" });
    t(s, r[1], rx + 1.92, y, rw - 2.26, 0.52, { size: 10.5, color: C.text, line: 14 });
  });
  notes(
    s,
    "收尾的展望页：五个阶段 + 闭环 + AI 的四个角色。\n" +
      "提醒听众，闭环部分目前仍是概念性的，08 是综述，不是实验结果。"
  );
}

// ================================================================ A3 closed loop
{
  const s = slide_dark("第三幕 · 08 Kordas 2026 · 闭环", "从检测到闭环：把「测量」和「干预」绑在一起");
  s.addImage({ path: path.join(ASSETS, "wave_dark.png"), x: -0.3, y: 5.9, w: 13.95, h: 2.6 });
  const loop = ["脑信号", "AI 解码", "意识状态", "神经调控", "新的大脑状态", "再评估"];
  const lw = (CW - 0.68 - 0.2 * 5) / 6;
  loop.forEach((v, i) => {
    const x = M + i * (lw + 0.2);
    card(s, x, 1.94, lw, 0.86, { fill: C.inkSoft, line: C.inkLine });
    t(s, v, x + 0.06, 1.94, lw - 0.12, 0.86, {
      size: 11.5,
      bold: true,
      color: i === 3 ? C.amber : C.onDark,
      align: "center",
      valign: "middle",
      line: 14.5,
    });
    if (i < 5)
      t(s, "→", x + lw - 0.01, 1.94, 0.22, 0.86, {
        size: 12,
        color: C.cyan,
        align: "center",
        valign: "middle",
      });
  });
  card(s, M, 2.94, CW, 0.5, { fill: C.ink, line: C.cyan, lineW: 1.25 });
  t(s, "检测 → 干预 → 再检测：BCI 不再只是被动测量，而可能成为「评估 + 干预」系统", M + 0.3, 2.94, CW - 0.6, 0.5, {
    size: 12.5,
    bold: true,
    color: C.cyan,
    valign: "middle",
  });

  const colW = (CW - 0.32) / 2;
  card(s, M, 3.58, colW, 2.24, { fill: C.inkSoft, line: C.inkLine });
  t(s, "闭环解决了什么", M + 0.32, 3.72, colW - 0.64, 0.32, {
    size: 13.5,
    bold: true,
    color: C.cyan,
  });
  bullets(
    s,
    [
      "把「相关」变成「因果」：如果调控改变了信号、信号变化又伴随状态变化，说明该信号确实与状态相关。",
      "让 BCI 从被动测量变成 assessment + intervention system。",
      "把「读完就结束」的评估，变成可以反复修正的过程。",
    ],
    M + 0.32,
    4.1,
    colW - 0.64,
    1.7,
    { size: 11, line: 15.5, color: C.onDark }
  );
  const rx2 = M + colW + 0.32;
  card(s, rx2, 3.58, colW, 2.24, { fill: C.inkSoft, line: C.amber, lineW: 1.25 });
  t(s, "闭环同时制造了什么（本汇报推论）", rx2 + 0.32, 3.72, colW - 0.64, 0.32, {
    size: 13.5,
    bold: true,
    color: C.amber,
  });
  bullets(
    s,
    [
      "ground truth 不再独立：调控本身改变了状态，「再检测」读到的可能不是自然状态。",
      "因此闭环研究必须预设「自然状态基线 + 调控后对照」，否则因果解释会绕回自己。",
      "伦理问题的性质也变了：从 mental privacy（读不读得到）变成 agency（能不能被调控、谁来授权）。",
    ],
    rx2 + 0.32,
    4.1,
    colW - 0.64,
    1.7,
    { size: 11, line: 15.5, color: C.onDark }
  );
  t(
    s,
    "这也是目前文献里最薄的一环：08 把闭环作为展望提出，尚无临床证据支持，伦理授权问题更是基本空白。",
    M,
    5.9,
    CW,
    0.24,
    { size: 11, bold: true, color: C.amber }
  );
  conclusionBand(
    s,
    "未来意识 BCI 不太可能依赖单一脑信号或单一分类器，而更可能是多模态神经信号 + AI + 个体化模型 + 交互式 BCI 的组合。",
    { fill: C.inkSoft, line: C.cyan }
  );
  notes(
    s,
    "这一幕的收束，也是全场的落点。回路本身是 08 提出的：脑信号 → AI 解码 → 意识状态 → 神经调控 → 新的大脑状态 → 再评估。\n" +
      "左边讲闭环的价值：它能把相关性推进到因果性，这是纯观察研究做不到的。\n" +
      "右边讲它的代价，这部分是我的推论，请明确说是推论：一旦你同时测量和干预，就失去了一个独立的参照点；\n" +
      "所以闭环实验必须自带「自然状态基线 + 调控后对照」的设计，否则因果解释会自我循环。\n" +
      "同时点出伦理性质的变化：从隐私问题变成授权问题——这是我认为最值得做的空白。"
  );
}

// ================================================================ 17 gaps
{
  const s = slide_light("OPEN PROBLEMS", "五个真正的研究空白");
  const gaps = [
    ["Gap 1", "状态与内容没有打通", "state decoding 与 content decoding 目前仍是两条相对独立的路线。", C.navy],
    ["Gap 2", "跨人群迁移困难", "健康人的稳定神经表征，难以直接迁移到受损、重组的患者脑网络。", C.cyanDeep],
    ["Gap 3", "ground truth 缺失", "意识本身没有可直接观测的金标准，只能间接验证。", C.amber],
    ["Gap 4", "实时性", "fMRI 语义解码能力最强，却无法支撑真正的实时 BCI。", C.navyDeep],
    ["Gap 5", "隐私边界", "decoder 越强，越逼近 mental privacy 的边界。", C.amber],
  ];
  const gap = 0.24;
  const cwid = (CW - gap * 4) / 5;
  gaps.forEach((g, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.16, cwid, 3.9, { fill: C.card });
    accentTop(s, x, 2.16, cwid, g[3]);
    t(s, g[0], x + 0.26, 2.42, cwid - 0.52, 0.3, {
      size: 10.5,
      face: FL,
      bold: true,
      color: g[3],
    });
    t(s, g[1], x + 0.26, 2.78, cwid - 0.52, 0.94, { size: 14, bold: true, color: C.text, line: 19 });
    bar(s, x + 0.26, 3.82, cwid - 0.52, 0.014, C.line);
    t(s, g[2], x + 0.26, 3.98, cwid - 0.52, 1.9, { size: 11, color: C.sub, line: 16 });
  });
  t(s, "五个空白里，前三个是科学问题，后两个是工程与治理问题。", M, 6.32, CW, 0.34, {
    size: 12,
    bold: true,
    color: C.navyDeep,
  });
  notes(
    s,
    "从「文献讲了什么」转到「我们还能做什么」。这五个空白是后面讨论的引子。\n" +
      "如果组里要做选题，Gap 3（ground truth）和 Gap 2（迁移）是最容易形成具体实验设计的两个。"
  );
}

// ================================================================ 18 stance
{
  const s = slide_dark("OUR STANCE", "三条不能混用的层级");
  const layers = [
    ["①", "神经信息可解码", "有信息，而且能被模型稳定读出。", "工程事实", C.cyan],
    ["②", "covert cognition", "患者确实在做与任务一致的认知加工。", "临床推断", C.amber],
    ["③", "主观意识本身", "患者正在体验什么——无法被外部直接观测。", "无法直接验证", "E07A5F"],
  ];
  layers.forEach((l, i) => {
    const y = 2.12 + i * 1.16;
    card(s, M, y, CW, 0.98, { fill: C.inkSoft, line: C.inkLine });
    accentLeft(s, M, y, 0.98, l[4]);
    t(s, l[0], M + 0.3, y, 0.5, 0.98, { size: 17, color: l[4], valign: "middle" });
    t(s, l[1], M + 0.86, y, 3.5, 0.98, {
      size: 17,
      bold: true,
      color: C.onDark,
      valign: "middle",
    });
    t(s, l[2], M + 4.5, y, 5.3, 0.98, {
      size: 11.5,
      color: C.onDarkSub,
      valign: "middle",
    });
    t(s, l[3], W - M - 2.1, y, 1.9, 0.98, {
      size: 11,
      bold: true,
      color: l[4],
      align: "right",
      valign: "middle",
    });
  });
  t(s, "证据强度自上而下递减：上一层不能自动推出下一层。", M, 5.68, CW, 0.36, {
    size: 13,
    bold: true,
    color: C.onDark,
  });
  bar(s, M, 6.16, CW, 0.02, C.inkLine);
  t(
    s,
    "双向边界：单次阳性 ≠ 完整意识；单次阴性 ≠ 无意识。可解码 ≠ 可证明为意识。",
    M,
    6.34,
    CW,
    0.44,
    { size: 15, bold: true, color: C.cyan }
  );
  notes(
    s,
    "这是整个汇报的方法论立场，也是我们读这批文献时最想守住的一条线。\n" +
      "凡是要把结论往外推一步的时候，先回到这一页看看推的是哪一层。"
  );
}

// ================================================================ A4 my reading
{
  const s = slide_light("讨论 · 本汇报推论", "这条线上真正的瓶颈在哪里");
  const pts = [
    [
      "01",
      "瓶颈不是精度，是对照条件",
      "Level 1–2 靠任务对照就够；Level 3–4 必须靠 no-report 与意识／无意识对照。验证问题不解决时，精度越高，错误越有说服力。",
      C.amber,
    ],
    [
      "02",
      "从「测试」到「对话」才是可行性的关键",
      "一次性检查的失败模式（疲劳、注意波动、单次阴性）会被误读成「无意识」；持续交互把单次阴性从「证据」降级为「一个事件」。",
      C.navy,
    ],
    [
      "03",
      "闭环同时解决了旧问题、制造了新问题",
      "它能验证因果，代价是 ground truth 不再独立——所以闭环研究必须自带「自然状态基线 + 调控后对照」。",
      C.cyanDeep,
    ],
    [
      "04",
      "伦理问题的性质会变",
      "前期讨论的是 mental privacy（读不读得到）；到了闭环阶段，问题变成 agency（能不能被调控、谁来授权）。03 停在隐私，08 没有展开授权。",
      "E07A5F",
    ],
  ];
  const gap = 0.26;
  const cwid = (CW - gap * 3) / 4;
  pts.forEach((p, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.0, cwid, 3.5, { fill: C.card });
    accentTop(s, x, 2.0, cwid, p[3]);
    t(s, p[0], x + 0.26, 2.2, 1.2, 0.36, {
      size: 15,
      face: FL,
      bold: true,
      color: p[3],
    });
    t(s, p[1], x + 0.26, 2.62, cwid - 0.52, 1.1, {
      size: 14,
      bold: true,
      color: C.text,
      line: 19,
    });
    bar(s, x + 0.26, 3.76, cwid - 0.52, 0.014, C.line);
    t(s, p[2], x + 0.26, 3.9, cwid - 0.52, 1.5, {
      size: 10.5,
      color: C.sub,
      line: 15,
    });
  });
  t(
    s,
    "以上四条由本次汇报引用的证据推出，不是任何一篇作者的结论；其中第 1 条与第 3 条是我认为最值得立项的两个方向。",
    M,
    5.7,
    CW,
    0.4,
    { size: 12, bold: true, color: C.navyDeep }
  );
  notes(
    s,
    "这一页是我自己的判断，请先声明「以下是我的推论，不是文献结论」，再逐条讲。\n" +
      "第 1 条可以这样展开：如果我们只能提高解码精度，却拿不出更严的对照，那么审稿人问的问题仍然是「你怎么知道这不是无意识加工」。\n" +
      "第 3 条展开：闭环是最有想象力的方向，但它要求我们同时设计「怎么干预」和「怎么证明干预有效」，这是当前文献里最薄的地方。\n" +
      "讲完这一页直接进入讨论问题。"
  );
}

// ================================================================ A4 eight takeaways
{
  const s = slide_light("讨论 · 汇总", "八篇文献的汇报结论");
  const rows = [
    ["01", "Bodien 2024", "行为无反应 ≠ 认知不存在；把临床诊断问题转化成一个 BCI 问题。", "起点", C.amber],
    ["02", "Fischer 2025", "从「检测」到「解码」；但可解码 ≠ 可证明为意识。", "范式转换", C.navy],
    ["03", "Kronemer 2025", "普通 BCI 有行为 ground truth，意识 BCI 没有。", "方法学约束", C.cyanDeep],
    ["06", "Tang 2023", "语义解码仍是 proof of principle；下一步是在 EEG/ECoG/iEEG 上做实时语义解码。", "技术地基", C.navyDeep],
    ["04", "Littlejohn 2025", "从 assessment 到 communication：问题变成「能不能持续表达」。", "通道连续", C.cyanDeep],
    ["05", "Wairagkar 2025", "从「想移动什么」到「想说什么、以及声音该怎么表达」。", "输出丰富度", "E07A5F"],
    ["07", "du Bois 2026", "意识 BCI 正从实验室范式走向 wearable、interactive、bedside。", "临床落地", C.amber],
    ["08", "Kordas 2026", "未来是多模态 + AI + 个体化 + 交互式的组合，并指向闭环。", "方向", C.navy],
  ];
  t(s, "编号", M, 1.84, 0.7, 0.28, { size: 9.5, bold: true, color: C.sub });
  t(s, "文献", M + 0.8, 1.84, 2.1, 0.28, { size: 9.5, bold: true, color: C.sub });
  t(s, "一句话汇报结论", M + 3.0, 1.84, 6.85, 0.28, { size: 9.5, bold: true, color: C.sub });
  t(s, "在主线上的位置", W - M - 2.0, 1.84, 2.0, 0.28, {
    size: 9.5,
    bold: true,
    color: C.sub,
    align: "right",
  });
  bar(s, M, 2.16, CW, 0.02, C.line);
  const rh = 0.56;
  rows.forEach((r, i) => {
    const y = 2.24 + i * rh;
    if (i % 2 === 0) card(s, M - 0.12, y - 0.045, CW + 0.24, rh - 0.05, { fill: "FFFFFF", line: "FFFFFF" });
    t(s, r[0], M, y, 0.7, rh - 0.1, {
      size: 12,
      face: FL,
      bold: true,
      color: r[4],
      valign: "middle",
    });
    t(s, r[1], M + 0.8, y, 2.1, rh - 0.1, {
      size: 11.5,
      face: FL,
      color: C.text,
      valign: "middle",
    });
    t(s, r[2], M + 3.0, y, 6.85, rh - 0.1, { size: 11.5, color: C.text, valign: "middle" });
    t(s, r[3], W - M - 2.0, y, 2.0, rh - 0.1, {
      size: 11,
      bold: true,
      color: r[4],
      align: "right",
      valign: "middle",
    });
  });
  bar(s, M, 2.24 + rows.length * rh - 0.09, CW, 0.02, C.line);
  notes(
    s,
    "这一页是全场的一句话索引，用于收束和答疑定位，不必逐条念。\n" +
      "建议只点三行：02（可解码 ≠ 可证明为意识）、03（没有 ground truth）、08（指向闭环）。\n" +
      "如果要现场定位某篇文献的结论，直接从这一页指过去。"
  );
}

// ================================================================ 19 discussion
{
  const s = slide_dark("DISCUSSION", "留给组会的三个问题");
  const qs = [
    ["Q1", "如果我们来做，ground truth 从哪来？", "在缺少金标准的前提下，怎样设计出让审稿人接受的对照条件（masking / no-report / 意识-无意识对照）？"],
    ["Q2", "解码器要不要跨被试？", "06 显示跨被试几乎等于随机，07 显示个体间方差是 LIS 的主要来源——我们该做个体化，还是做可迁移的表征？"],
    ["Q3", "哪一步最值得先做？", "状态检测、语义解码、语音输出、闭环干预，四者共享同一批信号与同一套伦理约束，先手应该落在哪里？"],
  ];
  const gap = 0.3;
  const cwid = (CW - gap * 2) / 3;
  qs.forEach((q, i) => {
    const x = M + i * (cwid + gap);
    card(s, x, 2.3, cwid, 4.3, { fill: C.inkSoft, line: C.inkLine });
    accentTop(s, x, 2.3, cwid, i === 1 ? C.amber : C.cyan);
    t(s, q[0], x + 0.34, 2.56, cwid - 0.68, 0.36, {
      size: 15,
      face: FL,
      bold: true,
      color: i === 1 ? C.amber : C.cyan,
    });
    t(s, q[1], x + 0.34, 3.06, cwid - 0.68, 1.5, {
      size: 17,
      bold: true,
      color: C.onDark,
      line: 23,
    });
    bar(s, x + 0.34, 4.66, cwid - 0.68, 0.018, C.inkLine);
    t(s, q[2], x + 0.34, 4.86, cwid - 0.68, 1.5, {
      size: 11.5,
      color: C.onDarkSub,
      line: 16.5,
    });
  });
  t(s, "谢谢，欢迎补充与质疑。", M, 6.78, CW, 0.36, {
    size: 12,
    color: C.cyan,
    align: "center",
  });
  notes(
    s,
    "留三个具体、可争论的问题，避免讨论停留在「这个方向很重要」。\n" +
      "每个问题都已经绑定了文献中的具体证据，讨论时可以随时回指。"
  );
}

// ================================================================ 20 references
{
  const s = slide_light("REFERENCES", "参考文献与数据来源");
  const refs = [
    "01  Bodien YG, Allanson J, Cardone P, et al. Cognitive Motor Dissociation in Disorders of Consciousness. N Engl J Med. 2024;391(7):598–608. doi:10.1056/NEJMoa2400645",
    "02  Fischer D, Edlow BL, Freeman HJ, et al. Reconstructing Covert Consciousness: Neural Decoding as a Novel Consciousness Assessment. Neurology. 2025;104(4):e210208. doi:10.1212/WNL.0000000000210208",
    "03  Kronemer SI, Bandettini PA, Gonzalez-Castillo J. Sleuthing subjectivity: a review of covert measures of consciousness. Nat Rev Neurosci. 2025;26(8):476–496. doi:10.1038/s41583-025-00934-1",
    "04  Littlejohn KT, Cho CJ, Liu JR, et al. A streaming brain-to-voice neuroprosthesis to restore naturalistic communication. Nat Neurosci. 2025;28:902–912. doi:10.1038/s41593-025-01905-6",
    "05  Wairagkar M, Card NS, Singer-Clark T, et al. An instantaneous voice-synthesis neuroprosthesis. Nature. 2025;644:145–152. doi:10.1038/s41586-025-09127-3",
    "06  Tang J, LeBel A, Jain S, Huth AG. Semantic reconstruction of continuous language from non-invasive brain recordings. Nat Neurosci. 2023;26(5):858–866. doi:10.1038/s41593-023-01304-9",
    "07  du Bois N, Korik A, Hodge S, et al. Advancing EEG-based assessment of consciousness and cognition in prolonged disorders of consciousness. Commun Med. 2026;6:344. doi:10.1038/s43856-026-01574-x",
    "08  Kordas B. Multimodal Assessment of Consciousness with Brain-Computer Interfaces and Artificial Intelligence: From Acquired Brain Injury to Neurodegenerative Disease. J Clin Med. 2026;15(14):5398. doi:10.3390/jcm15145398",
  ];
  const colW = (CW - 0.5) / 2;
  refs.forEach((r, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * (colW + 0.5);
    const y = 1.98 + row * 1.04;
    t(s, r, x, y, colW, 0.98, {
      size: 10,
      face: FL,
      color: C.text,
      line: 14.5,
      valign: "top",
    });
  });
  bar(s, M, 6.18, CW, 0.02, C.line);
  t(
    s,
    "原文状态：01 / 02 / 05 / 06 / 07 / 08 已在本合集 PDFs/ 目录本地存档（含 SHA-256 校验）；03 与 04 经验证不存在合法开放获取版本，需机构订阅，对应笔记为摘要级提取。",
    M,
    6.34,
    CW,
    0.56,
    { size: 10, color: C.sub, line: 14 }
  );
  notes(
    s,
    "最后一页供回查。所有数字都来自本合集的精读笔记与其引用的原文；03、04 两篇为摘要级提取。"
  );
}

// ---------------------------------------------------------------- write
pres.writeFile({ fileName: OUT_FILE }).then((f) => {
  console.log("written:", f);
  const st = fs.statSync(OUT_FILE);
  console.log("size:", st.size, "bytes; slides:", pageNo);
});
