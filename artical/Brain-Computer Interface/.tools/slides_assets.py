"""Generate the shared visual motif (a neural-signal trace) for the group-meeting deck.

Outputs transparent PNGs into .tools/assets/:
  wave_dark.png  -> cyan trace for dark slides
  wave_light.png -> navy trace for light slides
  wave_tall.png  -> narrow vertical-ish trace used as a corner accent
"""

import math
import os
import random

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "assets")
os.makedirs(OUT, exist_ok=True)


def _envelope(i: int, n: int, pad: float = 0.06) -> float:
    """Fade the trace in/out at both ends so it never butts hard against an edge."""
    t = i / (n - 1)
    if t < pad:
        return math.sin(math.pi * 0.5 * (t / pad)) ** 1.5
    if t > 1 - pad:
        return math.sin(math.pi * 0.5 * ((1 - t) / pad)) ** 1.5
    return 1.0


def _signal(n: int, seed: int, amp: float) -> list[float]:
    """Deterministic EEG-ish trace: slow drift + ripple + a few sharp transients."""
    rng = random.Random(seed)
    # pick spike positions, biased so they cluster a little like real bursts
    spikes = []
    for _ in range(14):
        spikes.append((rng.uniform(0.05, 0.95), rng.choice([-1.0, 1.0]) * rng.uniform(0.5, 1.0)))

    out = []
    for i in range(n):
        t = i / (n - 1)
        v = 0.0
        v += 0.55 * math.sin(2 * math.pi * 1.6 * t + 0.4)
        v += 0.30 * math.sin(2 * math.pi * 4.3 * t + 1.9)
        v += 0.18 * math.sin(2 * math.pi * 9.1 * t + 3.1)
        v += 0.10 * math.sin(2 * math.pi * 17.0 * t + 0.7)
        # small broadband texture
        v += 0.06 * math.sin(2 * math.pi * 41.0 * t + 2.2) * math.sin(2 * math.pi * 0.9 * t)
        # transients
        for pos, sign in spikes:
            d = abs(t - pos)
            if d < 0.010:
                v += sign * (1.0 - d / 0.010) ** 2 * 1.9
        out.append(v * amp * _envelope(i, n))
    return out


def _draw_trace(path, width, height, rgb, peak_alpha, lines, dpi=220):
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    mid = height / 2.0
    for idx, (seed, amp_scale, alpha_scale) in enumerate(lines):
        raw = _signal(width, seed=seed, amp=1.0)
        # normalise to [-1, 1] so transients never clip the canvas edge
        peak = max(abs(v) for v in raw) or 1.0
        vals = [v / peak * amp_scale for v in raw]
        pts = [(x, mid + v * (height * 0.45)) for x, v in enumerate(vals)]
        alpha = max(6, min(255, int(peak_alpha * alpha_scale)))
        draw.line(pts, fill=(rgb[0], rgb[1], rgb[2], alpha), width=3 if idx == 0 else 2, joint="curve")
    img.save(path, dpi=(dpi, dpi))
    return img.size


def main():
    # dark slides: bright signal cyan
    _draw_trace(
        os.path.join(OUT, "wave_dark.png"),
        3000,
        560,
        (0x2F, 0xB8, 0xC6),
        205,
        [(11, 1.00, 1.00), (77, 0.62, 0.38), (131, 0.40, 0.26)],
    )
    # light slides: quiet navy
    _draw_trace(
        os.path.join(OUT, "wave_light.png"),
        3000,
        560,
        (0x17, 0x52, 0x7A),
        92,
        [(11, 1.00, 1.00), (77, 0.58, 0.45)],
    )
    # a calm, thin accent for footers
    _draw_trace(
        os.path.join(OUT, "wave_thin.png"),
        2200,
        220,
        (0x2F, 0xB8, 0xC6),
        150,
        [(5, 0.75, 1.00)],
    )
    # the small repeating mark that sits in every slide header
    _draw_trace(
        os.path.join(OUT, "wave_mark.png"),
        1080,
        300,
        (0x2F, 0xB8, 0xC6),
        200,
        [(23, 0.95, 1.00)],
    )
    print("assets written to", OUT)
    for name in sorted(os.listdir(OUT)):
        p = os.path.join(OUT, name)
        print(" ", name, os.path.getsize(p), "bytes")


if __name__ == "__main__":
    main()
