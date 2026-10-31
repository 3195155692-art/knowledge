#!/usr/bin/env python3
"""Rebuild two deck pages from the paper notes.

  user's 第19页 = slide 20  (06 Tang 2023, semantic reconstruction)
  user's 第24页 = slide 25  (05 Wairagkar 2025, brain-to-voice)

Both pages are rebuilt as a narrative chain that follows the reading note's own
logic, while every other part of the deck is left byte-identical.
"""
import os
import re
import shutil
import zipfile

from lxml import etree

D = "/Users/oldma/knowledge/artical/Brain-Computer Interface"
DECK = os.path.join(
    D, "BCI_Consciousness_Literature_Deep_Read",
    "组会汇报_脑机接口与意识_从意识检测到意识内容解码_润色版.pptx",
)
BACKUP = os.path.join(D, ".ppt_work", "润色版_backup_before_p19_p24.pptx")

P = "http://schemas.openxmlformats.org/presentationml/2006/main"
A = "http://schemas.openxmlformats.org/drawingml/2006/main"
EMU = 914400


def p_(t):
    return "{%s}%s" % (P, t)


def a_(t):
    return "{%s}%s" % (A, t)


def I(v):
    return int(round(v * EMU))


# ---- design tokens (read off the existing deck) -------------------------
INK = "16222E"
NAVY = "0F3A57"
TEAL = "1B8C99"
STEEL = "17527A"
MUTED = "5A6B7D"
AMBER = "D98A21"
CORAL = "E07A5F"
CARD_LINE = "DCE5EE"
CARD_FILL = "FFFFFF"
LATIN = "Times New Roman"
CJK = "SimHei"

# The deck's own convention: pure-Latin runs carry Times New Roman, anything with
# CJK (including CJK punctuation) carries the Chinese face. Follow it run by run
# so the rebuilt pages match the rest of the deck.
SCRIPT_SPLIT = re.compile(
    r"[\u2e80-\u9fff\u2460-\u24ff\u3000-\u303f\uff00-\uffef]+"
    r"|[^\u2e80-\u9fff\u2460-\u24ff\u3000-\u303f\uff00-\uffef]+"
)
CJK_SEG = re.compile(r"[\u2e80-\u9fff\u2460-\u24ff\u3000-\u303f\uff00-\uffef]")


def script_segments(text):
    for chunk in SCRIPT_SPLIT.findall(text):
        if chunk:
            yield chunk, bool(CJK_SEG.match(chunk))


def _shape_shell(sid, name, x, y, w, h, geom="rect", adj=None,
                 fill=None, line=None, line_w=12687):
    sp = etree.Element(p_("sp"))
    nv = etree.SubElement(sp, p_("nvSpPr"))
    c = etree.SubElement(nv, p_("cNvPr"))
    c.set("name", name)
    c.set("id", str(sid))
    etree.SubElement(nv, p_("cNvSpPr"))
    etree.SubElement(nv, p_("nvPr"))
    spPr = etree.SubElement(sp, p_("spPr"))
    xfrm = etree.SubElement(spPr, a_("xfrm"))
    xfrm.set("rot", "0")
    xfrm.set("flipH", "false")
    xfrm.set("flipV", "false")
    off = etree.SubElement(xfrm, a_("off"))
    off.set("x", str(I(x)))
    off.set("y", str(I(y)))
    ext = etree.SubElement(xfrm, a_("ext"))
    ext.set("cx", str(I(w)))
    ext.set("cy", str(I(h)))
    g = etree.SubElement(spPr, a_("prstGeom"))
    g.set("prst", geom)
    av = etree.SubElement(g, a_("avLst"))
    if adj is not None:
        gd = etree.SubElement(av, a_("gd"))
        gd.set("name", "adj")
        gd.set("fmla", "val %d" % adj)
    if fill:
        sf = etree.SubElement(spPr, a_("solidFill"))
        clr = etree.SubElement(sf, a_("srgbClr"))
        clr.set("val", fill)
        al = etree.SubElement(clr, a_("alpha"))
        al.set("val", "100000")
    else:
        etree.SubElement(spPr, a_("noFill"))
    ln = etree.SubElement(spPr, a_("ln"))
    ln.set("w", str(line_w))
    if line:
        sf2 = etree.SubElement(ln, a_("solidFill"))
        c2 = etree.SubElement(sf2, a_("srgbClr"))
        c2.set("val", line)
        al2 = etree.SubElement(c2, a_("alpha"))
        al2.set("val", "100000")
    else:
        etree.SubElement(ln, a_("noFill"))
    dash = etree.SubElement(ln, a_("prstDash"))
    dash.set("val", "solid")
    return sp


def mk_card(sid, name, x, y, w, h, fill=CARD_FILL, line=CARD_LINE):
    sp = _shape_shell(sid, name, x, y, w, h, geom="roundRect", adj=5556,
                      fill=fill, line=line, line_w=12700)
    tb = etree.SubElement(sp, p_("txBody"))
    bp = etree.SubElement(tb, a_("bodyPr"))
    for k, v in (("anchor", "t"), ("rtlCol", "false"), ("wrap", "square"),
                 ("lIns", "91440"), ("rIns", "91440"),
                 ("tIns", "45720"), ("bIns", "45720")):
        bp.set(k, v)
    etree.SubElement(bp, a_("noAutofit"))
    etree.SubElement(tb, a_("lstStyle"))
    para = etree.SubElement(tb, a_("p"))
    pPr = etree.SubElement(para, a_("pPr"))
    pPr.set("algn", "ctr")
    etree.SubElement(pPr, a_("defRPr"))
    etree.SubElement(para, a_("endParaRPr"))
    return sp


def mk_text(sid, name, x, y, w, h, paras, anchor="t", pad=(0, 0, 0, 0)):
    """paras: list of dicts with runs / algn / lnspc / spc_aft / bullet."""
    sp = _shape_shell(sid, name, x, y, w, h, geom="rect", adj=None,
                      fill=None, line=None, line_w=12687)
    tb = etree.SubElement(sp, p_("txBody"))
    bp = etree.SubElement(tb, a_("bodyPr"))
    bp.set("anchor", anchor)
    bp.set("rtlCol", "false")
    bp.set("anchorCtr", "false")
    bp.set("vert", "horz")
    bp.set("wrap", "square")
    bp.set("lIns", str(I(pad[0])))
    bp.set("rIns", str(I(pad[1])))
    bp.set("tIns", str(I(pad[2])))
    bp.set("bIns", str(I(pad[3])))
    etree.SubElement(bp, a_("noAutofit"))
    etree.SubElement(tb, a_("lstStyle"))
    for para in paras:
        el = etree.SubElement(tb, a_("p"))
        pPr = etree.SubElement(el, a_("pPr"))
        pPr.set("algn", para.get("algn", "l"))
        if para.get("bullet"):
            pPr.set("marL", "330200")
            pPr.set("indent", "-152400")
        else:
            pPr.set("marL", "0")
            pPr.set("indent", "0")
        pPr.set("defTabSz", "914400")
        kind, val = para.get("lnspc", ("spcPct", 100000))
        lnSpc = etree.SubElement(pPr, a_("lnSpc"))
        etree.SubElement(lnSpc, a_(kind)).set("val", str(val))
        if para.get("spc_aft"):
            aft = etree.SubElement(pPr, a_("spcAft"))
            etree.SubElement(aft, a_("spcPts")).set("val", str(para["spc_aft"]))
        if para.get("bullet"):
            bc = etree.SubElement(pPr, a_("buClr"))
            etree.SubElement(bc, a_("srgbClr")).set("val", para.get("bu_color", INK))
            etree.SubElement(pPr, a_("buFont")).set("typeface", "Arial")
            etree.SubElement(pPr, a_("buChar")).set("char", para.get("bu_char", "•"))
        etree.SubElement(pPr, a_("defRPr"))
        for text, sz, color, bold in para["runs"]:
            for chunk, is_cjk in script_segments(text):
                face = CJK if is_cjk else LATIN
                r = etree.SubElement(el, a_("r"))
                rPr = etree.SubElement(r, a_("rPr"))
                rPr.set("lang", "en-US")
                rPr.set("b", "true" if bold else "false")
                rPr.set("i", "false")
                rPr.set("strike", "noStrike")
                rPr.set("u", "none")
                rPr.set("sz", str(int(sz * 100)))
                sf = etree.SubElement(rPr, a_("solidFill"))
                etree.SubElement(sf, a_("srgbClr")).set("val", color)
                etree.SubElement(rPr, a_("latin")).set("typeface", face)
                etree.SubElement(rPr, a_("ea")).set("typeface", face)
                etree.SubElement(rPr, a_("cs")).set("typeface", face)
                etree.SubElement(rPr, a_("sym")).set("typeface", face)
                t = etree.SubElement(r, a_("t"))
                t.text = chunk
        etree.SubElement(el, a_("endParaRPr")).set("lang", "en-US")
    return sp


def one(text, sz, color, bold=False, lnspc=18.0, algn="l"):
    return [{"runs": [(text, sz, color, bold)], "algn": algn,
             "lnspc": ("spcPts", int(lnspc * 100))}]


def sp_tree(root):
    return root.find(p_("cSld")).find(p_("spTree"))


def rewrite_speaker_notes(xml_bytes, paragraphs):
    """Replace the body text of a notesSlide, keeping every placeholder intact."""
    root = etree.fromstring(xml_bytes)
    for sp in root.iter(p_("sp")):
        ph = sp.find(p_("nvSpPr")).find(p_("nvPr")).find(p_("ph"))
        if ph is None or ph.get("type") != "body":
            continue
        runs = [r for r in sp.iter(a_("r")) if r.find(a_("t")) is not None]
        for run, text in zip(runs, paragraphs):
            run.find(a_("t")).text = text
    return etree.tostring(root, xml_declaration=True, encoding="UTF-8",
                          standalone=True)


NOTES_20 = [
    "这一页按笔记的顺序讲一条链：① 先问对问题——不是「他听到了哪个词」，而是「他理解到了什么」；"
    "② 再看难点——BOLD 约 10 秒、语速每秒 2 个词以上，一张脑图被 20 多个词同时影响，逐词分类在这里是病态逆问题；\n"
    "③ 然后是解法——编码模型 + 语言模型 + beam search 的「生成→打分→择优」，输出的本来就会是一段改写过的话。",
    "④ 最后才是结果：72–82% 的时间点语义相似度显著高于随机，只读解码文本也能答对 9/16 道阅读理解题；"
    "但 WER 0.92–0.94，用逐词正确率衡量会低估它。\n"
    "最下面一行是这一页真正的落点：运动表征只在「试图说」时出现，语义表征在「想象」时同样可及——"
    "这是通往无法发声者的一扇门；代价是训练必须个体化，而且解码可以被主动抵抗。",
]

NOTES_25 = [
    "这一页把「声音」本身讲成一个独立的价值：文字 BCI 解决的是「说清楚」，但它丢掉了韵律，也丢掉了边说边听见自己。\n"
    "左边这条语言层级链说明这项研究停在最后一段——从发音相关的神经表征直接预测声学输出；"
    "它读到的还不是抽象思维，这既是它的强项，也是它的边界。",
    "四个小标题是一条链：为什么不再满足于文字 → 难在哪（连标准答案都没有，于是用 TTS 造标签、"
    "再从神经活动反推音节边界来对齐）→ 怎么做（只看过去 10 ms 的因果解码）→ 拿到什么（94.34%；"
    "合成语音 WER 43.75%，而他本人残余说话是 96.43%）。\n"
    "最下面一行是最容易被忽略也最动人的部分：词表外与拟声、默说、副语言，以及患者听到自己原本的声音。请把原话念出来。",
]


def shape_id(child):
    nv = child.find(p_("nvSpPr"))
    if nv is None:
        nv = child.find(p_("nvPicPr"))
    return int(nv.find(p_("cNvPr")).get("id"))


def drop_shapes(tree, keep_ids):
    for child in list(tree):
        if child.tag in (p_("sp"), p_("pic")) and shape_id(child) not in keep_ids:
            tree.remove(child)


def next_id(tree, start):
    used = {shape_id(c) for c in tree if c.tag in (p_("sp"), p_("pic"))}
    while start in used:
        start += 1
    return start


# ======================================================================
#  slide 20 - 06 Tang 2023 : 语义可以被重建
# ======================================================================
def build_slide20(tree):
    drop_shapes(tree, keep_ids={2, 3, 4, 5, 6})
    nid = next_id(tree, 7)

    def nid_():
        nonlocal nid
        v = nid
        nid += 1
        return v

    L, R, W, H = 0.62, 6.77, 5.94, 2.08
    rows = [1.90, 4.10]
    cards = [
        (L, rows[0], "① 问的是什么 · 非侵入式 fMRI", "从「识别」到「重建」",
         "不是问「他听到了哪个词」，而是问「他理解到了什么」——前者是在小词表里做分类，"
         "后者才接近意识研究真正关心的那一层。", STEEL),
        (R, rows[0], "② 难在哪：慢信号遇上快语言", "一张脑图，20 多个词",
         "BOLD 响应要 10 秒才走完，而自然语速每秒 2 个词以上：每张脑图都被 20 多个词同时影响。"
         "逐词分类在这里是个病态逆问题。", TEAL),
        (L, rows[1], "③ 怎么绕过去：不分类，改生成", "生成 → 打分 → 择优",
         "编码模型预测脑响应，语言模型负责「像人话」，beam search 搜索词序列——"
         "它输出的是一段改写过的话，不是原文转录。", AMBER),
        (R, rows[1], "④ 结果：保住了意思，没保住字", "语义成立，逐字失败",
         "72–82% 的时间点语义相似度高于随机；只看解码文本做阅读理解，16 题答对 9 题。"
         "但 WER 0.92–0.94，逐词正确率会低估它。", CORAL),
    ]
    for x, y, eyebrow, big, body, accent in cards:
        tree.append(mk_card(nid_(), "card", x, y, W, H))
        tree.append(mk_text(nid_(), "eyebrow", x + 0.36, y + 0.16, W - 0.72, 0.30,
                            one(eyebrow, 13.0, accent, bold=True, lnspc=16.0)))
        tree.append(mk_text(nid_(), "bigline", x + 0.36, y + 0.50, W - 0.72, 0.50,
                            one(big, 22.0, NAVY, bold=True, lnspc=26.0)))
        tree.append(mk_text(nid_(), "body", x + 0.36, y + 1.06, W - 0.72, 0.84,
                            one(body, 12.0, INK, lnspc=17.5)))

    tree.append(mk_text(
        nid_(), "band", 0.62, 6.36, 12.093, 0.52,
        one("为什么这一步对整条线重要：运动表征只在「试图说」时出现，语义表征在「想象」时同样可及"
            "——这是通往无法发声者的一扇门；代价是训练必须个体化，且解码可被有意识抵抗。",
            13.0, NAVY, bold=True, lnspc=16.5)))
    return tree


# ======================================================================
#  slide 25 - 05 Wairagkar 2025 : 声音不只是「说了什么」
# ======================================================================
def build_slide25(tree):
    keep = {2, 3, 4, 5, 6, 7, 8} | set(range(9, 21))
    drop_shapes(tree, keep_ids=keep)
    nid = next_id(tree, 21)

    def nid_():
        nonlocal nid
        v = nid
        nid += 1
        return v

    # stretch the left (ladder) card so both columns share one baseline
    for child in tree.iter(p_("sp")):
        if shape_id(child) == 7:
            child.find(p_("spPr")).find(a_("xfrm")).find(a_("ext")).set("cy", str(I(4.34)))

    # closing line under the ladder
    tree.append(mk_text(nid_(), "laddernote", 0.94, 5.56, 3.96, 0.62,
                        one("本研究停在最后一段：从发音相关的神经表征直接预测声学输出。",
                            11.0, MUTED, lnspc=16.0)))

    x, w = 5.42, 7.29
    ys = [1.96, 3.07, 4.19, 5.30]
    hs = [1.00, 1.00, 1.00, 1.00]
    items = [
        (STEEL, "① 为什么不再满足于「变成文字」",
         "文字 BCI 解决的是「说清楚」；它丢掉了韵律，也丢掉了边说边听见自己——"
         "而这两样才是自然交谈的前提。"),
        (TEAL, "② 难在哪：连标准答案都没有",
         "患者已经说不清，没人知道他打算何时说、说什么。作者改用 TTS 生成目标语音当标签，"
         "再从神经活动本身反推音节边界来做对齐。"),
        (AMBER, "③ 怎么做：只看过去 10 ms",
         "只取过去 10 ms 的神经信号做因果解码，直接预测频谱与音高再交给合成器；"
         "不必等整句说完，也不经过文字、词表或离散音素。"),
        (CORAL, "④ 拿到什么",
         "6 选 1 句子匹配平均 94.34%；合成语音 WER 43.75%，而他本人残余说话是 96.43%。"
         "作者也承认代价：因果合成质量仍略低于事后合成（倒谱失真 2.9 对 2.4）。"),
    ]
    for (accent, title, body), y, h in zip(items, ys, hs):
        tree.append(mk_card(nid_(), "card", x, y, w, h))
        tree.append(_shape_shell(nid_(), "capsule", x + 0.12, y + 0.14, 0.075, h - 0.28,
                                 geom="roundRect", adj=50000, fill=accent, line=accent,
                                 line_w=12700))
        tree.append(mk_text(nid_(), "cardtitle", x + 0.30, y + 0.07, w - 0.60, 0.32,
                            one(title, 16.0, accent, bold=True, lnspc=19.0)))
        tree.append(mk_text(nid_(), "cardbody", x + 0.30, y + 0.44, w - 0.60, h - 0.52,
                            one(body, 11.5, INK, lnspc=16.0)))

    tree.append(mk_text(
        nid_(), "band", 0.62, 6.40, 12.093, 0.48,
        one("文字 BCI 做不到的三件事：词表外与拟声（这些类别根本没参与训练）；"
            "默说也能合成（r = 0.82，参与者说更省力）；副语言与身份——语调、重音、音高可实时调制，"
            "还能唱短旋律，听到的是「我自己的声音」。",
            13.0, NAVY, bold=True, lnspc=16.5)))
    return tree


def main():
    if not os.path.exists(BACKUP):
        shutil.copy2(DECK, BACKUP)
    with zipfile.ZipFile(DECK) as zin:
        items = [(i, zin.read(i.filename)) for i in zin.infolist()]

    out = []
    for info, data in items:
        if info.filename in ("ppt/slides/slide20.xml", "ppt/slides/slide25.xml"):
            root = etree.fromstring(data)
            tree = sp_tree(root)
            if info.filename.endswith("slide20.xml"):
                build_slide20(tree)
            else:
                build_slide25(tree)
            data = etree.tostring(root, xml_declaration=True,
                                  encoding="UTF-8", standalone=True)
        elif info.filename == "ppt/notesSlides/notesSlide20.xml":
            data = rewrite_speaker_notes(data, NOTES_20)
        elif info.filename == "ppt/notesSlides/notesSlide25.xml":
            data = rewrite_speaker_notes(data, NOTES_25)
        out.append((info, data))

    head = [o for o in out if o[0].filename == "[Content_Types].xml"]
    tail = [o for o in out if o[0].filename != "[Content_Types].xml"]
    with zipfile.ZipFile(DECK, "w", zipfile.ZIP_DEFLATED) as zout:
        for info, data in head + tail:
            zi = zipfile.ZipInfo(info.filename, date_time=info.date_time)
            zi.compress_type = info.compress_type
            zi.external_attr = info.external_attr
            zout.writestr(zi, data)
    print("rebuilt:", DECK)
    print("backup :", BACKUP)


if __name__ == "__main__":
    main()
