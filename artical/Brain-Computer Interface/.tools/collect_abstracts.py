"""Collect the published abstract of each paper into plain-text files.

Outputs /tmp/bci_abstracts/<NN>.txt, one file per paper, used to verify that each note's
frontmatter `摘要` really is a full translation of that paper's abstract.

For the six papers we hold locally the abstract is sliced out of the cached full text.
For 03 and 04 (no local PDF) it is fetched from the Europe PMC REST API.
"""

import json
import os
import re
import sys
import urllib.parse
import urllib.request

TEXT_DIR = "/tmp/lit_text"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "abstracts")

LOCAL = {
    "01": (
        "01_Bodien_2024_NEJM_Cognitive_Motor_Dissociation.txt",
        "BACKGROUND",
        "ABSTRACT\nCognitive Motor Dissociation",
    ),
    "02": ("02_Fischer_2025_Neurology_Reconstructing_Covert_Consciousness.txt", "Abstract", "RELATED ARTICLE"),
    "05": ("05_Wairagkar_2025_Nature_Instantaneous_Voice_Synthesis.txt", "Summary:", "Introduction:"),
    "06": ("06_Tang_2023_NatNeurosci_Semantic_Reconstruction.txt", "Abstract", "Introduction"),
    "07": ("07_duBois_2026_CommunicationsMedicine_EEG_BCI_Consciousness.txt", "Abstract", "Plain language summary"),
    "08": ("08_Kordas_2026_JCM_Multimodal_Consciousness_BCI_AI.txt", "Abstract", "Keywords:"),
}

REMOTE = {
    "03": "10.1038/s41583-025-00934-1",
    "04": "10.1038/s41593-025-01905-6",
}

EPMC = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"


def clean(text: str) -> str:
    text = text.replace("\u00ad", "")
    text = re.sub(r"<<<PAGE \d+>>>", " ", text)
    text = re.sub(r"-\s*\n\s*", "", text)      # rejoin hyphenated line breaks
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s+([,.;:])", r"\1", text)
    return text.strip()


def slice_local(fname: str, start: str, end: str) -> str:
    raw = open(os.path.join(TEXT_DIR, fname), encoding="utf-8").read()
    i = raw.find(start)
    if i < 0:
        raise SystemExit(f"start marker not found: {start!r} in {fname}")
    j = raw.find(end, i + len(start))
    if j < 0:
        raise SystemExit(f"end marker not found: {end!r} in {fname}")
    return clean(raw[i:j])


def fetch_remote(doi: str) -> str:
    q = urllib.parse.quote(f'DOI:"{doi}"')
    url = f"{EPMC}?query={q}&resultType=core&format=json&pageSize=1"
    with urllib.request.urlopen(url, timeout=45) as fh:
        payload = json.load(fh)
    hits = payload.get("resultList", {}).get("result", [])
    if not hits:
        raise SystemExit(f"Europe PMC returned no record for {doi}")
    rec = hits[0]
    abstract = rec.get("abstractText") or ""
    abstract = re.sub(r"<[^>]+>", " ", abstract)
    return clean(abstract)


def main() -> int:
    os.makedirs(OUT, exist_ok=True)
    for key, (fname, start, end) in sorted(LOCAL.items()):
        text = slice_local(fname, start, end)
        path = os.path.join(OUT, f"{key}.txt")
        open(path, "w", encoding="utf-8").write(text + "\n")
        print(f"{key}  {len(text):5d} chars  (local: {fname})")
    for key, doi in sorted(REMOTE.items()):
        text = fetch_remote(doi)
        path = os.path.join(OUT, f"{key}.txt")
        open(path, "w", encoding="utf-8").write(text + "\n")
        print(f"{key}  {len(text):5d} chars  (Europe PMC: {doi})")
    print("written to", OUT)
    return 0


if __name__ == "__main__":
    sys.exit(main())
