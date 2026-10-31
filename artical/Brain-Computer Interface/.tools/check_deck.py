"""Layout QA for the generated deck.

LibreOffice is not installed on this machine, so instead of rasterising the slides this
script re-measures every text box straight out of the saved .pptx: it reads the real
geometry and run properties, then wraps the text with the same font file the deck
requests and compares the required height against the box height.

It flags:
  OVERFLOW   text needs more vertical room than the shape has
  BOUNDS     shape sits outside the slide
  TIGHT      less than 6% vertical slack
  COLLIDE    two *text* boxes (not decorative cards) overlap
"""

import os
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

from PIL import ImageFont

PPTX = (
    "/Users/oldma/knowledge/artical/Brain-Computer Interface/"
    "BCI_Consciousness_Literature_Deep_Read/"
    "组会汇报_脑机接口与意识_从意识检测到意识内容解码.pptx"
)

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
}
EMU = 914400.0
SLIDE_W = 13.333
SLIDE_H = 7.5

REG = "/System/Library/Fonts/STHeiti Light.ttc"
MED = "/System/Library/Fonts/STHeiti Medium.ttc"
LAT = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"
LAT_B = "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf"

_cache: dict = {}


def font(path: str, size_pt: float):
    px = max(6, int(round(size_pt * 4)))  # 4x supersample for stable metrics
    key = (path, px)
    if key not in _cache:
        idx = 0
        kwargs = {}
        if path.endswith(".ttc"):
            kwargs["index"] = 1 if ("Heiti" in path or "Hiragino" in path) else 0
        try:
            _cache[key] = ImageFont.truetype(path, px, **kwargs)
        except Exception:
            _cache[key] = ImageFont.truetype(LAT, px)
    return _cache[key]


def text_width_in(text: str, path: str, size_pt: float) -> float:
    """Advance width in inches."""
    f = font(path, size_pt)
    scale = 4  # supersample factor
    return (f.getlength(text) / scale) / 72.0


def wrap_lines(text: str, path: str, size_pt: float, avail_in: float) -> int:
    if not text.strip():
        return 1
    total = 0
    for hard in text.split("\n"):
        if not hard.strip():
            total += 1
            continue
        line = ""
        n = 1
        for ch in hard:
            trial = line + ch
            if text_width_in(trial, path, size_pt) > avail_in and line:
                n += 1
                line = ch
            else:
                line = trial
        total += n
    return total


def emu(v):
    return float(v) / EMU


def shape_font_path(run_font_name: str, bold: bool) -> str:
    if run_font_name and any(k in run_font_name for k in ("Heiti", "Hiragino", "雅黑", "YaHei")):
        return MED if bold else REG
    return LAT_B if bold else LAT


def analyse(xml: str):
    root = ET.fromstring(xml)
    findings = []
    boxes = []

    for sp in root.iter("{%s}sp" % NS["p"]):
        xfrm = sp.find(".//a:xfrm", NS)
        body = sp.find(".//p:txBody", NS)
        if xfrm is None or body is None:
            continue
        off = xfrm.find("a:off", NS)
        ext = xfrm.find("a:ext", NS)
        if off is None or ext is None:
            continue
        x, y = emu(off.get("x")), emu(off.get("y"))
        w, h = emu(ext.get("cx")), emu(ext.get("cy"))

        if x < -0.35 or y < -0.35 or x + w > SLIDE_W + 0.35 or y + h > SLIDE_H + 0.35:
            findings.append(("BOUNDS", round(x, 2), round(y, 2), f"{round(x+w,2)}x{round(y+h,2)}"))

        # body insets
        bodyPr = body.find("a:bodyPr", NS)
        inset_l = inset_r = 0.1
        inset_t = inset_b = 0.05
        if bodyPr is not None:
            if bodyPr.get("lIns") is not None:
                inset_l = emu(bodyPr.get("lIns"))
            if bodyPr.get("rIns") is not None:
                inset_r = emu(bodyPr.get("rIns"))
            if bodyPr.get("tIns") is not None:
                inset_t = emu(bodyPr.get("tIns"))
            if bodyPr.get("bIns") is not None:
                inset_b = emu(bodyPr.get("bIns"))
        avail = w - inset_l - inset_r
        if avail <= 0.05:
            continue

        need = 0.0
        has_text = False
        for para in body.findall("a:p", NS):
            runs = para.findall("a:r", NS)
            if not runs:
                continue
            para_text = "".join((r.find("a:t", NS).text or "") for r in runs if r.find("a:t", NS) is not None)
            if not para_text.strip():
                continue
            has_text = True
            pPr = para.find("a:pPr", NS)
            marL = 0.0
            if pPr is not None and pPr.get("marL"):
                marL = emu(pPr.get("marL"))

            first = runs[0]
            rPr = first.find("a:rPr", NS)
            size = 18.0
            bold = False
            face = ""
            if rPr is not None:
                if rPr.get("sz"):
                    size = float(rPr.get("sz")) / 100.0
                bold = rPr.get("b") == "1"
                lat = rPr.find("a:latin", NS)
                if lat is not None:
                    face = lat.get("typeface") or ""
            path = shape_font_path(face, bold)

            lnspc = 1.2 * size
            if pPr is not None:
                sp_pts = pPr.find("a:lnSpc/a:spcPts", NS)
                if sp_pts is not None and sp_pts.get("val"):
                    lnspc = float(sp_pts.get("val")) / 100.0
            after = 0.0
            if pPr is not None:
                sp_after = pPr.find("a:spcAft/a:spcPts", NS)
                if sp_after is not None and sp_after.get("val"):
                    after = float(sp_after.get("val")) / 100.0

            nlines = wrap_lines(para_text, path, size, avail - marL)
            need += nlines * lnspc / 72.0 + after / 72.0

        if not has_text:
            continue
        need += inset_t + inset_b
        boxes.append((x, y, w, h, round(need, 3), para_preview(body)))

        if need > h + 0.005:
            findings.append(
                ("OVERFLOW", round(need - h, 3), f"box {round(w,2)}x{round(h,2)}", para_preview(body))
            )
        elif need > h * 0.94:
            findings.append(
                ("TIGHT", round(h - need, 3), f"box {round(w,2)}x{round(h,2)}", para_preview(body))
            )

    # text-vs-text collisions
    for i in range(len(boxes)):
        for j in range(i + 1, len(boxes)):
            a, b = boxes[i], boxes[j]
            ox = min(a[0] + a[2], b[0] + b[2]) - max(a[0], b[0])
            oy = min(a[1] + a[3], b[1] + b[3]) - max(a[1], b[1])
            if ox > 0.06 and oy > 0.06:
                findings.append(("COLLIDE", round(ox, 2), round(oy, 2), f"{a[5][:28]} | {b[5][:28]}"))

    return findings


def para_preview(body) -> str:
    for para in body.findall("a:p", NS):
        txt = "".join((r.find("a:t", NS).text or "") for r in para.findall("a:r", NS) if r.find("a:t", NS) is not None)
        if txt.strip():
            return txt.strip().replace("\n", " ")[:70]
    return ""


def main() -> int:
    with zipfile.ZipFile(PPTX) as z:
        names = sorted(
            (n for n in z.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", n)),
            key=lambda n: int(re.findall(r"\d+", n)[-1]),
        )
        bad = 0
        for n in names:
            findings = analyse(z.read(n).decode("utf-8"))
            idx = int(re.findall(r"\d+", n)[-1])
            hard = [f for f in findings if f[0] in ("OVERFLOW", "BOUNDS", "COLLIDE")]
            soft = [f for f in findings if f[0] == "TIGHT"]
            if hard or soft:
                print(f"--- slide {idx}")
            for f in hard:
                bad += 1
                print("   ", f[0], f[1:], )
            for f in soft:
                print("    TIGHT", f[1:])
        print(f"\n{len(names)} slides scanned; {bad} blocking finding(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
