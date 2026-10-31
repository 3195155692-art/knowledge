"""Read-only verification of the deck's font declarations.

Every text run must declare the East Asian face explicitly, otherwise PowerPoint falls
back to the theme's CJK font and text widths change. This checks that and reports which
typefaces the deck actually names. It never modifies the file.
"""

import re
import sys
import zipfile
from collections import Counter

PPTX = (
    "/Users/oldma/knowledge/artical/Brain-Computer Interface/"
    "BCI_Consciousness_Literature_Deep_Read/"
    "组会汇报_脑机接口与意识_从意识检测到意识内容解码.pptx"
)

LATIN = re.compile(r'<a:latin typeface="([^"]*)"')
EA = re.compile(r'<a:ea typeface="([^"]*)"')


def main() -> int:
    latin = Counter()
    ea = Counter()
    missing = 0
    slides = 0

    with zipfile.ZipFile(PPTX) as z:
        for n in sorted(z.namelist()):
            if not (n.startswith("ppt/slides/slide") and n.endswith(".xml")):
                continue
            slides += 1
            xml = z.read(n).decode("utf-8")
            latin.update(LATIN.findall(xml))
            ea.update(EA.findall(xml))
            missing += max(0, len(LATIN.findall(xml)) - len(EA.findall(xml)))

    print(f"slides: {slides}")
    print("latin typefaces:", dict(latin))
    print("east-asian typefaces:", dict(ea))
    print("runs missing an <a:ea> face:", missing)
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
