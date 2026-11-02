const fs = require("fs");
const path = require("path");
const {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  LevelFormat,
  PageBreak,
  PageNumber,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} = require("docx");

const workdir = "/Users/oldma/knowledge/artical/Brain-Computer Interface";
const sourcePath = path.join(
  workdir,
  "植入式脑机接口在语言重建方向的发展与应用_报告_2026-11-02.md",
);
const outputPath = path.join(
  workdir,
  "植入式脑机接口在语言重建方向的发展与应用_报告_2026-11-02.docx",
);

const markdown = fs.readFileSync(sourcePath, "utf8");
const lines = markdown.split(/\r?\n/);

const COLORS = {
  ink: "1F2933",
  muted: "5B6573",
  accent: "0F5C5C",
  accentLight: "E8F2F1",
  rule: "B8C5C4",
  tableHeader: "DDEBE9",
  tableAlt: "F7FAF9",
  white: "FFFFFF",
};

const BODY_FONT = "Heiti SC";
const HEAD_FONT = "Heiti SC";
const LATIN_FONT = BODY_FONT;
const BODY_SIZE = 22;
const TABLE_SIZE = 17;

function cleanInline(text) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/〔([^〕]+)〕/g, "［$1］")
    .trim();
}

function inlineRuns(text, options = {}) {
  const cleaned = text
    .replace(/`([^`]+)`/g, "‹$1›")
    .replace(/\*\*/g, "");
  const runs = [];
  const italicParts = cleaned.split(/(\*[^*]+\*)/g).filter(Boolean);
  for (const part of italicParts) {
    const italic = part.startsWith("*") && part.endsWith("*");
    const value = italic ? part.slice(1, -1) : part;
    runs.push(
      new TextRun({
        text: value.replaceAll("‹", "").replaceAll("›", ""),
        font: {
          ascii: LATIN_FONT,
          hAnsi: LATIN_FONT,
          eastAsia: options.font || BODY_FONT,
        },
        size: options.size || BODY_SIZE,
        bold: options.bold || false,
        italics: italic,
        color: options.color || COLORS.ink,
      }),
    );
  }
  return runs;
}

function bodyParagraph(text, options = {}) {
  const isKeyword = text.startsWith("**关键词：**");
  const isSmall = text.startsWith("**报告日期") || text.startsWith("**副标题");
  return new Paragraph({
    children: inlineRuns(cleanInline(text), {
      font: BODY_FONT,
      size: isSmall ? 20 : options.size || BODY_SIZE,
      color: isSmall ? COLORS.muted : options.color || COLORS.ink,
    }),
    alignment: AlignmentType.JUSTIFIED,
    indent: isKeyword
      ? { left: 0, right: 0, firstLine: 0 }
      : { firstLine: 420 },
    spacing: {
      before: 0,
      after: isKeyword ? 220 : 110,
      line: 360,
      lineRule: "auto",
    },
    keepLines: true,
  });
}

function headingParagraph(text, level) {
  const isH1 = level === 1;
  const heading = isH1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2;
  return new Paragraph({
    heading,
    children: [
      new TextRun({
        text: cleanInline(text),
        font: {
          ascii: LATIN_FONT,
          hAnsi: LATIN_FONT,
          eastAsia: HEAD_FONT,
        },
        size: isH1 ? 32 : 26,
        bold: true,
        color: isH1 ? COLORS.accent : COLORS.ink,
      }),
    ],
    spacing: {
      before: isH1 ? 320 : 240,
      after: isH1 ? 170 : 120,
    },
    keepNext: true,
    keepLines: true,
    border: isH1
      ? {
          bottom: {
            color: COLORS.rule,
            style: BorderStyle.SINGLE,
            size: 6,
            space: 6,
          },
        }
      : undefined,
    pageBreakBefore: text === "1. 问题的提出与范围界定",
  });
}

function referenceParagraph(text) {
  const match = text.match(/^(\d+)\.\s+(.*)$/);
  const label = match ? `${match[1]}.` : "";
  const value = match ? match[2] : text;
  return new Paragraph({
    children: [
      new TextRun({
        text: `${label} `,
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: BODY_FONT },
        size: 20,
        bold: true,
        color: COLORS.accent,
      }),
      ...inlineRuns(cleanInline(value), { size: 20 }),
    ],
    alignment: AlignmentType.LEFT,
    indent: { left: 500, hanging: 500 },
    spacing: { before: 0, after: 100, line: 320, lineRule: "auto" },
    keepLines: true,
  });
}

function tableCell(text, options = {}) {
  return new TableCell({
    width: { size: options.width, type: WidthType.DXA },
    shading: options.shading
      ? { fill: options.shading, type: ShadingType.CLEAR, color: "auto" }
      : undefined,
    margins: {
      top: 100,
      bottom: 100,
      left: 110,
      right: 110,
    },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: inlineRuns(cleanInline(text), {
          font: BODY_FONT,
          size: TABLE_SIZE,
          bold: options.header || false,
          color: options.header ? COLORS.accent : COLORS.ink,
        }),
        alignment: AlignmentType.LEFT,
        spacing: { before: 0, after: 0, line: 250, lineRule: "auto" },
        keepLines: false,
      }),
    ],
  });
}

function parseTable(tableLines) {
  const rows = tableLines
    .filter((line) => !/^\|[\s:|-]+\|$/.test(line.trim()))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim()),
    );
  if (!rows.length) return null;

  const colCount = Math.max(...rows.map((row) => row.length));
  let widths;
  if (colCount === 6) {
    widths = [1200, 1550, 1700, 2250, 1226, 1100];
  } else if (colCount === 4) {
    widths = [1850, 2050, 2750, 2376];
  } else if (colCount === 3) {
    widths = [2800, 3000, 3226];
  } else {
    const base = Math.floor(9026 / colCount);
    widths = Array(colCount).fill(base);
    widths[widths.length - 1] += 9026 - base * colCount;
  }

  const tableRows = rows.map((row, rowIndex) => {
    const cells = [];
    for (let i = 0; i < colCount; i += 1) {
      cells.push(
        tableCell(row[i] || "", {
          width: widths[i],
          header: rowIndex === 0,
          shading:
            rowIndex === 0
              ? COLORS.tableHeader
              : rowIndex % 2 === 0
                ? COLORS.tableAlt
                : COLORS.white,
        }),
      );
    }
    return new TableRow({
      children: cells,
      tableHeader: rowIndex === 0,
      cantSplit: true,
    });
  });

  return new Table({
    rows: tableRows,
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: widths,
    layout: "fixed",
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.rule },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.rule },
      left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.rule },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.rule },
      insideHorizontal: {
        style: BorderStyle.SINGLE,
        size: 3,
        color: COLORS.rule,
      },
      insideVertical: {
        style: BorderStyle.SINGLE,
        size: 3,
        color: COLORS.rule,
      },
    },
    margins: { top: 40, bottom: 40 },
  });
}

const children = [];

// Title page
children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: "研究综述",
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: HEAD_FONT },
        size: 22,
        bold: true,
        color: COLORS.accent,
        characterSpacing: 80,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 900, after: 500 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "植入式脑机接口在语言重建方向的发展与应用",
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: HEAD_FONT },
        size: 42,
        bold: true,
        color: COLORS.ink,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 260 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "从神经信号可解码走向低负担、自然化、可长期使用的交流接口",
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: HEAD_FONT },
        size: 25,
        color: COLORS.muted,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 1000 },
  }),
  new Paragraph({
    children: [],
    border: {
      top: {
        color: COLORS.accent,
        style: BorderStyle.SINGLE,
        size: 14,
        space: 1,
      },
    },
    spacing: { before: 0, after: 550 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "文献范围：2019—2026 年代表性人体研究",
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: BODY_FONT },
        size: 22,
        color: COLORS.ink,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 160 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "证据类型：皮层内微电极阵列与高密度 ECoG",
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: BODY_FONT },
        size: 22,
        color: COLORS.ink,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 160 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "报告日期：2026 年 11 月 2 日",
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: BODY_FONT },
        size: 22,
        color: COLORS.ink,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 800 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "说明：本报告为研究现状综合，不构成临床适应证、器械安全或治疗建议。",
        font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: BODY_FONT },
        size: 18,
        color: COLORS.muted,
        italics: true,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
  }),
  new Paragraph({ children: [new PageBreak()] }),
);

// Body
let skipTitle = true;
let inReferences = false;
for (let i = 0; i < lines.length; i += 1) {
  const raw = lines[i];
  const line = raw.trim();

  if (!line) continue;
  if (line.startsWith("# ")) {
    if (skipTitle) {
      skipTitle = false;
    }
    continue;
  }
  if (
    line.startsWith("**副标题：") ||
    line.startsWith("**报告日期：")
  ) {
    continue;
  }
  if (line.startsWith("## ")) {
    const text = line.slice(3).trim();
    inReferences = text === "参考文献";
    children.push(headingParagraph(text, 1));
    continue;
  }
  if (line.startsWith("### ")) {
    children.push(headingParagraph(line.slice(4).trim(), 2));
    continue;
  }
  if (line === "---") {
    continue;
  }
  if (line.startsWith("|")) {
    const tableLines = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) {
      tableLines.push(lines[i].trim());
      i += 1;
    }
    i -= 1;
    const table = parseTable(tableLines);
    if (table) {
      children.push(table);
      children.push(
        new Paragraph({
          children: [],
          spacing: { before: 0, after: 80 },
        }),
      );
    }
    continue;
  }
  if (inReferences && /^\d+\.\s+/.test(line)) {
    children.push(referenceParagraph(line));
    continue;
  }
  if (line.startsWith("- ")) {
    children.push(
      new Paragraph({
        children: inlineRuns(cleanInline(line.slice(2))),
        bullet: { level: 0 },
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 0, after: 90, line: 330, lineRule: "auto" },
      }),
    );
    continue;
  }
  children.push(bodyParagraph(line));
}

const doc = new Document({
  creator: "Codex",
  title: "植入式脑机接口在语言重建方向的发展与应用",
  subject: "植入式脑机接口语言重建研究综述",
  description:
    "基于 2019–2026 年代表性人体研究的中文综述报告，含参考文献与证据边界。",
  styles: {
    default: {
      document: {
        run: {
          font: BODY_FONT,
          size: BODY_SIZE,
          color: COLORS.ink,
        },
        paragraph: {
          spacing: { line: 360, lineRule: "auto" },
        },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: HEAD_FONT },
          size: 32,
          bold: true,
          color: COLORS.accent,
        },
        paragraph: {
          spacing: { before: 320, after: 170 },
          keepNext: true,
          outlineLevel: 0,
        },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: HEAD_FONT },
          size: 26,
          bold: true,
          color: COLORS.ink,
        },
        paragraph: {
          spacing: { before: 240, after: 120 },
          keepNext: true,
          outlineLevel: 1,
        },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 540, hanging: 240 },
              },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: {
            top: 1200,
            bottom: 1200,
            left: 1440,
            right: 1440,
            header: 650,
            footer: 650,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "植入式脑机接口在语言重建方向的发展与应用",
                  font: {
                    ascii: LATIN_FONT,
                    hAnsi: LATIN_FONT,
                    eastAsia: BODY_FONT,
                  },
                  size: 17,
                  color: COLORS.muted,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              border: {
                bottom: {
                  color: COLORS.rule,
                  style: BorderStyle.SINGLE,
                  size: 3,
                  space: 4,
                },
              },
              spacing: { after: 0 },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "第 ",
                  font: {
                    ascii: LATIN_FONT,
                    hAnsi: LATIN_FONT,
                    eastAsia: BODY_FONT,
                  },
                  size: 17,
                  color: COLORS.muted,
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: LATIN_FONT,
                  size: 17,
                  color: COLORS.muted,
                }),
                new TextRun({
                  text: " 页",
                  font: {
                    ascii: LATIN_FONT,
                    hAnsi: LATIN_FONT,
                    eastAsia: BODY_FONT,
                  },
                  size: 17,
                  color: COLORS.muted,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 0 },
            }),
          ],
        }),
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(outputPath);
});
