#!/usr/bin/env python3
"""Set 1.5x line spacing across the deck, then re-fit every box it pushes out.

Rules, in order:
  1. a paragraph that wraps to two or more lines gets 150% line spacing;
     a genuinely single-line label keeps its old spacing, because "line spacing"
     has no visible meaning for one line and 150% only pushes the glyph down and
     into whatever sits below it;
  2. any box the new spacing pushes past its frame is grown in place, as far as
     its card and its neighbours allow;
  3. only if a box still cannot hold the text is its own line spacing stepped
     back down (and that is reported, page by page).
"""
import os
import shutil
import sys
import zipfile

from lxml import etree

SKILL = "/Users/oldma/.codex/skills/lky-report-ppt/scripts"
sys.path.insert(0, SKILL)
import check_layout as CL  # noqa: E402

D = "/Users/oldma/knowledge/artical/Brain-Computer Interface"
DECK = os.path.join(
    D, "BCI_Consciousness_Literature_Deep_Read",
    "组会汇报_脑机接口与意识_从意识检测到意识内容解码_润色版.pptx",
)
BACKUP = os.path.join(D, ".ppt_work", "润色版_backup_before_1.5lines.pptx")
if len(sys.argv) > 1:            # optional: work on a throwaway copy instead
    DECK = sys.argv[1]
    BACKUP = DECK + ".bak"

P = "http://schemas.openxmlformats.org/presentationml/2006/main"
A = "http://schemas.openxmlformats.org/drawingml/2006/main"
EMU = 914400.0


def p_(t):
    return "{%s}%s" % (P, t)


def a_(t):
    return "{%s}%s" % (A, t)


def emu(v):
    return float(v) / EMU


def px(v):
    return str(int(round(v * EMU)))


def slide_size(zf):
    return CL.slide_size(zf)


def measure_root(root):
    """Serialise a slide with SimHei swapped for an installed face so it can be measured."""
    xml = etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone=True)
    return xml.replace(b'typeface="SimHei"', b'typeface="Heiti SC"').replace(
        b'typeface="\xe9\xbb\x91\xe4\xbd\x93"', b'typeface="Heiti SC"')


def para_runs(para):
    return [r for r in para.findall(a_("r")) if r.find(a_("t")) is not None]


def para_text(para):
    return "".join((r.find(a_("t")).text or "") for r in para_runs(para))


def line_count(para, avail_in):
    runs = para_runs(para)
    if not runs:
        return 0
    rPr = runs[0].find(a_("rPr"))
    size, bold, face = 18.0, False, ""
    if rPr is not None:
        if rPr.get("sz"):
            size = float(rPr.get("sz")) / 100.0
        bold = rPr.get("b") == "true"
        lat = rPr.find(a_("latin"))
        if lat is not None:
            face = lat.get("typeface") or ""
    if "SimHei" in face:
        face = "Heiti SC"
    resolved = CL.font_index.resolve(face, bold)
    if resolved is None:
        return 1
    font = CL.font_for(resolved[0], resolved[1], size)
    if font is None:
        return 1
    pPr = para.find(a_("pPr"))
    marL = emu(pPr.get("marL")) if (pPr is not None and pPr.get("marL")) else 0.0
    return CL.wrap_lines(para_text(para), font, size, avail_in - marL)


def para_metrics(para, avail_in):
    """(lines, size_pt, line_spacing_pt, space_after_pt) — the checker's own model."""
    runs = para_runs(para)
    if not runs:
        return 0, 0.0, 0.0, 0.0
    rPr = runs[0].find(a_("rPr"))
    size = 18.0
    if rPr is not None and rPr.get("sz"):
        size = float(rPr.get("sz")) / 100.0
    lnspc, after = 1.2 * size, 0.0
    pPr = para.find(a_("pPr"))
    if pPr is not None:
        ln = pPr.find(a_("lnSpc"))
        if ln is not None:
            pts = ln.find(a_("spcPts"))
            pct = ln.find(a_("spcPct"))
            if pts is not None and pts.get("val"):
                lnspc = float(pts.get("val")) / 100.0
            elif pct is not None and pct.get("val"):
                lnspc = 1.2 * size * float(pct.get("val")) / 100000.0
        af = pPr.find(a_("spcAft"))
        if af is not None:
            ap = af.find(a_("spcPts"))
            if ap is not None and ap.get("val"):
                after = float(ap.get("val")) / 100.0
    return line_count(para, avail_in), size, lnspc, after


def text_rects(root):
    """(x, text_top, w, text_h, preview, shape_y) for every text-bearing shape."""
    out = []
    for s in shape_list(root):
        body = s["body"]
        if body is None or not s["text"]:
            continue
        l, r, t, b, anchor = body_insets(body)
        avail = s["w"] - l - r
        if avail <= 0.05:
            continue
        need = 0.0
        for para in body.findall(a_("p")):
            if not para_text(para).strip():
                continue
            lines, size, lnspc, after = para_metrics(para, avail)
            need += lines * lnspc / 72.0 + after / 72.0
        if need <= 0:
            continue
        text_h = max(need, 0.02)
        if anchor == "ctr":
            text_top = s["y"] + (s["h"] - need) / 2.0 + t
        elif anchor == "b":
            text_top = s["y"] + s["h"] - b - text_h
        else:
            text_top = s["y"] + t
        out.append((s["x"], text_top, s["w"], text_h, s["text"][:70], s["y"]))
    return out


def set_lnspc(para, pct):
    pPr = para.find(a_("pPr"))
    if pPr is None:
        pPr = etree.Element(a_("pPr"))
        para.insert(0, pPr)
    ln = pPr.find(a_("lnSpc"))
    if ln is None:
        ln = etree.Element(a_("lnSpc"))
        pPr.insert(0, ln)
    for ch in list(ln):
        ln.remove(ch)
    spc = etree.SubElement(ln, a_("spcPct"))
    spc.set("val", str(int(pct * 1000)))


def current_pct(para):
    pPr = para.find(a_("pPr"))
    if pPr is None:
        return 100
    ln = pPr.find(a_("lnSpc"))
    if ln is None:
        return 100
    pct = ln.find(a_("spcPct"))
    if pct is not None and pct.get("val"):
        return float(pct.get("val")) / 1000.0
    pts = ln.find(a_("spcPts"))
    if pts is not None and pts.get("val"):
        runs = para_runs(para)
        rPr = runs[0].find(a_("rPr")) if runs else None
        size = float(rPr.get("sz")) / 100.0 if (rPr is not None and rPr.get("sz")) else 18.0
        return float(pts.get("val")) / 100.0 / (1.2 * size) * 100.0
    return 100


def shape_list(root):
    out = []
    for sp in root.iter(p_("sp")):
        xfrm = sp.find(p_("spPr")).find(a_("xfrm")) if sp.find(p_("spPr")) is not None else None
        if xfrm is None:
            continue
        off, ext = xfrm.find(a_("off")), xfrm.find(a_("ext"))
        if off is None or ext is None:
            continue
        cNvPr = sp.find(p_("nvSpPr")).find(p_("cNvPr"))
        body = sp.find(p_("txBody"))
        has_fill = sp.find(p_("spPr")).find(a_("solidFill")) is not None
        text = ""
        if body is not None:
            for para in body.findall(a_("p")):
                t = para_text(para).strip()
                if t:
                    text = t
                    break
        out.append({
            "el": sp, "id": cNvPr.get("id"), "body": body, "fill": has_fill,
            "text": text,
            "x": emu(off.get("x")), "y": emu(off.get("y")),
            "w": emu(ext.get("cx")), "h": emu(ext.get("cy")),
        })
    return out


def move(sp, x, y, w, h):
    xfrm = sp.find(p_("spPr")).find(a_("xfrm"))
    xfrm.find(a_("off")).set("x", px(x))
    xfrm.find(a_("off")).set("y", px(y))
    xfrm.find(a_("ext")).set("cx", px(w))
    xfrm.find(a_("ext")).set("cy", px(h))


def body_insets(body):
    bp = body.find(a_("bodyPr")) if body is not None else None
    l, r, t, b, anchor = 0.1, 0.1, 0.05, 0.05, "t"
    if bp is not None:
        anchor = bp.get("anchor", "t")
        l = emu(bp.get("lIns")) if bp.get("lIns") else l
        r = emu(bp.get("rIns")) if bp.get("rIns") else r
        t = emu(bp.get("tIns")) if bp.get("tIns") else t
        b = emu(bp.get("bIns")) if bp.get("bIns") else b
    return l, r, t, b, anchor


def main():
    if not os.path.exists(BACKUP):
        shutil.copy2(DECK, BACKUP)
    zin = zipfile.ZipFile(DECK)
    items = [(i, zin.read(i.filename)) for i in zin.infolist()]
    W, H = slide_size(zin)

    steps = [150, 145, 140, 135, 130, 125, 120, 115, 110, 100]
    report = []
    out = []
    for info, data in items:
        name = info.filename
        if not (name.startswith("ppt/slides/slide") and name.endswith(".xml")):
            out.append((info, data))
            continue

        root = etree.fromstring(data)
        shapes = shape_list(root)
        text_shapes = [s for s in shapes if s["body"] is not None and s["text"]]

        # --- rule 1: multi-line paragraphs get 150% -----------------------
        changed_ids = set()
        for s in text_shapes:
            l, r, t, b, anchor = body_insets(s["body"])
            avail = s["w"] - l - r
            paras = [p for p in s["body"].findall(a_("p")) if para_text(p).strip()]
            total = sum(line_count(p, avail) for p in paras)
            if total >= 2:
                for p in paras:
                    set_lnspc(p, 150)
                changed_ids.add(s["id"])

        # --- rules 2 and 3: re-fit anything pushed out of its frame --------
        for _ in range(14):
            xml = measure_root(root)
            findings, _unmeasured = CL.analyse(xml.decode("utf-8"), W, H, 0.06)
            boxes = text_rects(root)
            blocking = [f for f in findings if f[0] in ("OVERFLOW", "COLLIDE", "BOUNDS")]
            if not blocking:
                break
            progressed = False
            shapes = shape_list(root)
            by_text = {}
            for s in shapes:
                if s["text"]:
                    by_text.setdefault(s["text"][:70], []).append(s)
            for kind, detail, preview in blocking:
                if kind != "OVERFLOW":
                    continue
                need = float(detail.split("needs ")[1].split("in")[0])
                cands = [c for c in by_text.get(preview[:70], [])
                         if c["id"] in changed_ids]
                if not cands:
                    continue          # a pre-existing issue, not ours to rewrite
                s = cands[0]
                if s["body"] is None:
                    continue
                l, r, t, b, anchor = body_insets(s["body"])
                # container = smallest filled shape that contains this text box
                cont = None
                for c in shapes:
                    if c is s or not c["fill"]:
                        continue
                    if (c["x"] - 0.01 <= s["x"] and c["y"] - 0.01 <= s["y"]
                            and c["x"] + c["w"] >= s["x"] + s["w"]
                            and c["y"] + c["h"] >= s["y"] + s["h"]):
                        if cont is None or c["w"] * c["h"] < cont["w"] * cont["h"]:
                            cont = c
                cont_top = (cont["y"] + 0.06) if cont else 0.30
                cont_bottom = (cont["y"] + cont["h"] - 0.06) if cont else H - 0.30
                # where the text actually sits (a top-anchored box does not move
                # its text when the frame grows, so track the text rectangles)
                mine = None
                for bx in boxes:
                    if bx[4][:70] == preview[:70] and bx[0] - 0.02 <= s["x"] <= bx[0] + bx[2] + 0.02:
                        mine = bx
                        break
                if mine is None:
                    continue
                mx, my, mw, mh = mine[0], mine[1], mine[2], mine[3]
                my_bottom = my + mh
                top_limit, bottom_limit = cont_top, cont_bottom
                for bx in boxes:
                    if bx is mine:
                        continue
                    if bx[0] + bx[2] < mx + 0.05 or bx[0] > mx + mw - 0.05:
                        continue                      # different column
                    b_top, b_bottom = bx[1], bx[1] + bx[3]
                    if b_top >= my_bottom - 0.01:
                        bottom_limit = min(bottom_limit, b_top - 0.04)
                    elif b_bottom <= my + 0.01:
                        top_limit = max(top_limit, b_bottom + 0.04)
                want_h = need + 0.005
                if my_bottom <= bottom_limit + 0.005:
                    # the text itself is inside its card and clear of its neighbours;
                    # stretch the frame over it so the file is self-consistent
                    if want_h > s["h"] + 0.005:
                        move(s["el"], s["x"], s["y"], s["w"], want_h)
                        progressed = True
                    continue
                # the text runs past the card or into the next block: lift the box
                # (which takes the text with it) if there is room above, otherwise
                # step this one box's spacing back down until it fits.
                shift = my_bottom - bottom_limit
                new_y = s["y"] - shift
                if new_y >= top_limit - 0.001 and new_y >= cont_top - 0.001:
                    move(s["el"], s["x"], new_y, s["w"], want_h)
                    progressed = True
                    continue
                # last resort: step this box's spacing back down
                paras = [p for p in s["body"].findall(a_("p")) if para_text(p).strip()]
                for pct in steps[1:]:
                    for p in paras:
                        set_lnspc(p, pct)
                    trial = CL.analyse(measure_root(root).decode("utf-8"),
                                       W, H, 0.06)[0]
                    bad = [f for f in trial
                           if f[0] == "OVERFLOW" and f[2][:70] == preview[:70]]
                    if not bad:
                        report.append((name, preview[:40], pct))
                        progressed = True
                        break
                else:
                    report.append((name, preview[:40], None))
            if not progressed:
                break

        # --- post-pass: whatever still overlaps is eased off, box by box ------
        for _ in range(10):
            trial, _u = CL.analyse(measure_root(root).decode("utf-8"), W, H, 0.06)
            blocking = [f for f in trial if f[0] in ("OVERFLOW", "COLLIDE")]
            if not blocking:
                break
            shapes = shape_list(root)
            did = False
            for kind, detail, preview in blocking:
                frags = [preview[:70]] if kind != "COLLIDE" else [
                    part.strip() for part in preview.split(" | ")]
                target, names = None, []
                for frag in frags:
                    for cand in shapes:
                        if (cand["id"] in changed_ids and cand["body"] is not None
                                and cand["text"][:len(frag)] == frag):
                            target, nm = cand, cand["text"][:70]
                            names.append(nm)
                            break
                if target is None:
                    continue
                paras = [p for p in target["body"].findall(a_("p"))
                         if para_text(p).strip()]
                here = current_pct(paras[0])
                cleared = False
                for pct in steps[1:]:
                    if pct >= here:
                        continue
                    for p in paras:
                        set_lnspc(p, pct)
                    t2, _u2 = CL.analyse(measure_root(root).decode("utf-8"), W, H, 0.06)
                    still = [f for f in t2 if f[0] in ("OVERFLOW", "COLLIDE")
                             and any(f[2][:len(nm)] == nm or nm[:26] in f[2] for nm in names)]
                    if not still:
                        report.append((name, preview[:40], pct))
                        cleared = did = True
                        break
                if not cleared:
                    report.append((name, preview[:40], None))
                    did = True
            if not did:
                break

        out.append((info, etree.tostring(root, xml_declaration=True,
                                         encoding="UTF-8", standalone=True)))

    head = [o for o in out if o[0].filename == "[Content_Types].xml"]
    tail = [o for o in out if o[0].filename != "[Content_Types].xml"]
    with zipfile.ZipFile(DECK, "w", zipfile.ZIP_DEFLATED) as zout:
        for info, data in head + tail:
            zi = zipfile.ZipInfo(info.filename, date_time=info.date_time)
            zi.compress_type = info.compress_type
            zi.external_attr = info.external_attr
            zout.writestr(zi, data)

    print("deck written:", DECK)
    for name, text, pct in report:
        if pct is None:
            print(f"  UNRESOLVED {name}  {text}  -> could not fit even at 100%")
        else:
            print(f"  reduced    {name}  {text}  -> {pct}% line spacing")


if __name__ == "__main__":
    main()
