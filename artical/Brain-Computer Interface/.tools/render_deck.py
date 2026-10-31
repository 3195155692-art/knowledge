"""Rasterise the saved .pptx for visual QA.

No LibreOffice on this machine, so this reads the actual package and redraws it with
Pillow: shape geometry, fills, lines, pictures and every text run, using the same font
files the deck requests. Native charts are drawn as a labelled placeholder frame.

Output: /tmp/deckpreview/slide-NN.png
"""

import os
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

from PIL import Image, ImageDraw, ImageFont

PPTX = (
    "/Users/oldma/knowledge/artical/Brain-Computer Interface/"
    "BCI_Consciousness_Literature_Deep_Read/"
    "组会汇报_脑机接口与意识_从意识检测到意识内容解码.pptx"
)
OUT = "/tmp/deckpreview"

A = "http://schemas.openxmlformats.org/drawingml/2006/main"
P = "http://schemas.openxmlformats.org/presentationml/2006/main"
R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PR = "http://schemas.openxmlformats.org/package/2006/relationships"

DPI = 130
SCALE = DPI  # px per inch
SLIDE_W, SLIDE_H = 13.333, 7.5
IMG_W, IMG_H = int(SLIDE_W * SCALE), int(SLIDE_H * SCALE)
EMU = 914400.0

CJK_LIGHT = ("/System/Library/Fonts/STHeiti Light.ttc", 1)   # Heiti SC Light
CJK_MEDIUM = ("/System/Library/Fonts/STHeiti Medium.ttc", 1)  # Heiti SC Medium
LATIN = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"
LATIN_B = "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf"

_fcache: dict = {}


def get_font(name: str, bold: bool, size_pt: float):
    px = max(6, int(round(size_pt * SCALE / 72.0)))
    key = (name, bold, px)
    if key in _fcache:
        return _fcache[key]
    if name and any(k in name for k in ("Heiti", "Hiragino", "雅黑", "YaHei")):
        path, idx = CJK_MEDIUM if bold else CJK_LIGHT
    else:
        path, idx = (LATIN_B if bold else LATIN), 0
    try:
        f = ImageFont.truetype(path, px, index=idx)
    except Exception:
        f = ImageFont.truetype(LATIN, px)
    _fcache[key] = f
    return f


def px(v_emu: str) -> float:
    return float(v_emu) / EMU * SCALE


def solid_color(el):
    if el is None:
        return None
    srgb = el.find(".//a:srgbClr", {"a": A})
    if srgb is not None and srgb.get("val"):
        return "#" + srgb.get("val")
    return None


def shape_fill(spPr):
    nofill = spPr.find("a:noFill", {"a": A})
    if nofill is not None:
        return None
    return solid_color(spPr.find("a:solidFill", {"a": A}))


def shape_line(spPr):
    ln = spPr.find("a:ln", {"a": A})
    if ln is None:
        return None, 0
    if ln.find("a:noFill", {"a": A}) is not None:
        return None, 0
    w = float(ln.get("w", "9525")) / EMU * SCALE
    c = solid_color(ln.find("a:solidFill", {"a": A}))
    return c, w


def text_runs(para):
    out = []
    for r in para.findall("a:r", {"a": A}):
        t = r.find("a:t", {"a": A})
        rPr = r.find("a:rPr", {"a": A})
        size = 18.0
        bold = False
        color = "#16222E"
        face = "Hiragino Sans GB"
        if rPr is not None:
            if rPr.get("sz"):
                size = float(rPr.get("sz")) / 100.0
            bold = rPr.get("b") == "1"
            c = solid_color(rPr.find("a:solidFill", {"a": A}))
            if c:
                color = c
            lat = rPr.find("a:latin", {"a": A})
            if lat is not None and lat.get("typeface"):
                face = lat.get("typeface")
        out.append({"text": (t.text or "") if t is not None else "", "size": size, "bold": bold, "color": color, "face": face})
    return out


def para_props(para):
    pPr = para.find("a:pPr", {"a": A})
    d = {"align": "l", "marL": 0.0, "lnSpc": None, "after": 0.0, "bullet": None}
    if pPr is None:
        return d
    d["align"] = pPr.get("algn", "l")
    if pPr.get("marL"):
        d["marL"] = px(pPr.get("marL"))
    sp = pPr.find("a:lnSpc/a:spcPts", {"a": A})
    if sp is not None and sp.get("val"):
        d["lnSpc"] = float(sp.get("val")) / 100.0
    af = pPr.find("a:spcAft/a:spcPts", {"a": A})
    if af is not None and af.get("val"):
        d["after"] = float(af.get("val")) / 100.0
    bu = pPr.find("a:buChar", {"a": A})
    if bu is not None:
        d["bullet"] = bu.get("char") or "\u25aa"
    return d


def wrap(runs, avail_px):
    """Greedy wrap across a run list; returns list of lines, each a list of run slices."""
    if not runs:
        return [[]]
    chars = []
    for r in runs:
        for ch in r["text"]:
            chars.append((ch, r))
    lines, cur, curw = [], [], 0.0
    for ch, r in chars:
        w = get_font(r["face"], r["bold"], r["size"]).getlength(ch)
        if ch == "\n":
            lines.append(cur)
            cur, curw = [], 0.0
            continue
        if curw + w > avail_px and cur:
            lines.append(cur)
            cur, curw = [], 0.0
            if ch == " ":
                continue
        cur.append((ch, r))
        curw += w
    lines.append(cur)
    return lines


def draw_text_box(img, draw, sp, x, y, w, h):
    tx = sp.find(".//p:txBody", {"p": P})
    if tx is None:
        return
    bodyPr = tx.find("a:bodyPr", {"a": A})
    lIns = rIns = 0.1 * SCALE
    tIns = bIns = 0.05 * SCALE
    anchor = "t"
    if bodyPr is not None:
        anchor = bodyPr.get("anchor", "t")
        for k, dv in (("lIns", lIns), ("rIns", rIns), ("tIns", tIns), ("bIns", bIns)):
            if bodyPr.get(k) is not None:
                pass
        if bodyPr.get("lIns") is not None:
            lIns = px(bodyPr.get("lIns"))
        if bodyPr.get("rIns") is not None:
            rIns = px(bodyPr.get("rIns"))
        if bodyPr.get("tIns") is not None:
            tIns = px(bodyPr.get("tIns"))
        if bodyPr.get("bIns") is not None:
            bIns = px(bodyPr.get("bIns"))

    avail = w - lIns - rIns
    paras = []
    total_h = 0.0
    for para in tx.findall("a:p", {"a": A}):
        runs = text_runs(para)
        if not any(r["text"].strip() for r in runs):
            continue
        p = para_props(para)
        size = max(r["size"] for r in runs) if runs else 18
        ln = p["lnSpc"] or (size * 1.2)
        lines = wrap(runs, avail - p["marL"])
        paras.append({"lines": lines, "ln": ln, "props": p, "size": size})
        total_h += len(lines) * ln * SCALE / 72.0 + p["after"] * SCALE / 72.0

    start = y + tIns
    if anchor == "ctr":
        start = y + (h - total_h) / 2.0
    elif anchor == "b":
        start = y + h - bIns - total_h

    cy = start
    for par in paras:
        p = par["props"]
        lh = par["ln"] * SCALE / 72.0
        for li, line in enumerate(par["lines"]):
            lw = sum(get_font(r["face"], r["bold"], r["size"]).getlength(ch) for ch, r in line)
            if p["align"] == "ctr":
                cx = x + lIns + p["marL"] + (avail - p["marL"] - lw) / 2.0
            elif p["align"] == "r":
                cx = x + w - rIns - lw
            else:
                cx = x + lIns + p["marL"]
            if p["bullet"] and li == 0:
                bcol = next((r["color"] for _, r in line), "#16222E")
                sz = max(2, int(3.2 * SCALE / 72.0 * 2))
                draw.rectangle([cx - p["marL"] * 0.72, cy + lh * 0.34, cx - p["marL"] * 0.72 + sz, cy + lh * 0.34 + sz], fill=bcol)
            for ch, r in line:
                f = get_font(r["face"], r["bold"], r["size"])
                draw.text((cx, cy), ch, font=f, fill=r["color"], anchor="la")
                cx += f.getlength(ch)
            cy += lh
        cy += p["after"] * SCALE / 72.0


def chevron_poly(x, y, w, h):
    s = h * 0.42
    return [(x, y), (x + w - s, y), (x + w, y + h / 2), (x + w - s, y + h), (x, y + h), (x + s, y + h / 2)]


def main() -> int:
    os.makedirs(OUT, exist_ok=True)
    with zipfile.ZipFile(PPTX) as z:
        names = z.namelist()
        slides = sorted(
            (n for n in names if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)),
            key=lambda n: int(re.findall(r"\d+", n)[-1]),
        )
        for n in slides:
            idx = int(re.findall(r"\d+", n)[-1])
            img = Image.new("RGB", (IMG_W, IMG_H), "#FFFFFF")
            draw = ImageDraw.Draw(img)
            root = ET.fromstring(z.read(n).decode("utf-8"))

            # slide background
            bg = root.find(".//p:bg//a:srgbClr", {"p": P, "a": A})
            if bg is not None and bg.get("val"):
                img.paste("#" + bg.get("val"), [0, 0, IMG_W, IMG_H])

            # relationships for pictures
            rels = {}
            rel_path = n.replace("slides/", "slides/_rels/") + ".rels"
            if rel_path in names:
                rr = ET.fromstring(z.read(rel_path).decode("utf-8"))
                for rel in rr:
                    rels[rel.get("Id")] = rel.get("Target")

            tree = root.find(".//p:cSld/p:spTree", {"p": P})
            if tree is None:
                continue

            for node in list(tree):
                tag = node.tag.split("}")[1]
                if tag == "pic":
                    xfrm = node.find(".//a:xfrm", {"a": A})
                    blip = node.find(".//a:blip", {"a": A})
                    if xfrm is None or blip is None:
                        continue
                    off, ext = xfrm.find("a:off", {"a": A}), xfrm.find("a:ext", {"a": A})
                    x, y = px(off.get("x")), px(off.get("y"))
                    w, h = px(ext.get("cx")), px(ext.get("cy"))
                    target = rels.get(blip.get("{%s}embed" % R), "")
                    media = os.path.normpath(os.path.join("ppt/slides", target)).replace("\\", "/")
                    if media in names:
                        from io import BytesIO

                        pic = Image.open(BytesIO(z.read(media))).convert("RGBA")
                        pic = pic.resize((max(1, int(w)), max(1, int(h))), Image.LANCZOS)
                        img.paste(pic, (int(x), int(y)), pic)
                    continue

                if tag == "graphicFrame":
                    xfrm = node.find(".//p:xfrm", {"p": P})
                    if xfrm is None:
                        continue
                    off, ext = xfrm.find("a:off", {"a": A}), xfrm.find("a:ext", {"a": A})
                    x, y = px(off.get("x")), px(off.get("y"))
                    w, h = px(ext.get("cx")), px(ext.get("cy"))
                    draw.rectangle([x, y, x + w, y + h], outline="#C9D6E2", width=2)
                    continue

                if tag != "sp":
                    continue

                spPr = node.find(".//p:spPr", {"p": P})
                if spPr is None:
                    continue
                xfrm = spPr.find("a:xfrm", {"a": A})
                if xfrm is None:
                    continue
                off, ext = xfrm.find("a:off", {"a": A}), xfrm.find("a:ext", {"a": A})
                if off is None or ext is None:
                    continue
                x, y = px(off.get("x")), px(off.get("y"))
                w, h = px(ext.get("cx")), px(ext.get("cy"))
                prst_el = spPr.find("a:prstGeom", {"a": A})
                prst = prst_el.get("prst") if prst_el is not None else "rect"
                fill = shape_fill(spPr)
                lc, lw = shape_line(spPr)
                if fill or lc:
                    if prst == "roundRect":
                        # read the real corner radius: adj is a fraction of min(w,h)*100000
                        rad = 0.0
                        gd = spPr.find('.//a:gd[@name="adj"]', {"a": A})
                        if gd is not None and gd.get("fmla"):
                            try:
                                rad = float(gd.get("fmla").split()[-1]) / 100000.0 * min(w, h)
                            except Exception:
                                rad = 0.0
                        draw.rounded_rectangle(
                            [x, y, x + w, y + h],
                            radius=max(1, int(rad)),
                            fill=fill,
                            outline=lc,
                            width=max(1, int(lw)) if lc else 0,
                        )
                    elif prst == "ellipse":
                        draw.ellipse([x, y, x + w, y + h], fill=fill, outline=lc, width=max(1, int(lw)) if lc else 0)
                    elif prst == "chevron":
                        draw.polygon(chevron_poly(x, y, w, h), fill=fill, outline=lc)
                    elif prst == "line":
                        draw.line([x, y, x + w, y + h], fill=lc or "#000000", width=max(1, int(lw or 1)))
                    else:
                        draw.rectangle([x, y, x + w, y + h], fill=fill, outline=lc, width=max(1, int(lw)) if lc else 0)
                draw_text_box(img, draw, node, x, y, w, h)

            img.save(os.path.join(OUT, f"slide-{idx:02d}.png"))
        print("rendered", len(slides), "slides to", OUT)
    return 0


if __name__ == "__main__":
    sys.exit(main())
