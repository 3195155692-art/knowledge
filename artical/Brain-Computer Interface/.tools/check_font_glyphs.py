"""Catch text runs whose font cannot render them.

PowerPoint resolves East Asian glyphs from the run's <a:ea> face. pptxgenjs sets that to the
same name as <a:latin>, so a Chinese run written with a Latin-only face (Arial) turns into
boxes. This scans the saved deck for exactly that combination.
"""

import re
import sys
import zipfile

PPTX = (
    "/Users/oldma/knowledge/artical/Brain-Computer Interface/"
    "BCI_Consciousness_Literature_Deep_Read/"
    "组会汇报_脑机接口与意识_从意识检测到意识内容解码.pptx"
)

CJK = re.compile(r"[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]")
RUN = re.compile(r"<a:r>(.*?)</a:r>", re.S)
LATIN = re.compile(r'<a:latin typeface="([^"]*)"')
TEXT = re.compile(r"<a:t>(.*?)</a:t>", re.S)

# Faces that actually carry Simplified-Chinese glyphs.
CJK_FACES = ("Heiti", "Hiragino", "PingFang", "YaHei", "雅黑", "Songti", "Noto Sans CJK")


def main() -> int:
    bad = 0
    with zipfile.ZipFile(PPTX) as z:
        for n in sorted(z.namelist()):
            if not re.fullmatch(r"ppt/slides/slide\d+\.xml", n):
                continue
            xml = z.read(n).decode("utf-8")
            for run in RUN.findall(xml):
                face = LATIN.search(run)
                text = "".join(TEXT.findall(run))
                if (
                    face
                    and CJK.search(text)
                    and not any(k in face.group(1) for k in CJK_FACES)
                ):
                    bad += 1
                    print(f"{n}: face={face.group(1)!r} text={text[:40]!r}")
            # notes pages carry no visible glyphs, but check them too
    print(f"CJK runs on a non-CJK face: {bad}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
