#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第二轮精修：文本 shape 收缩进背景图案、字号回退、修复 bbox_overlap 与图片遮文字"""
import xml.etree.ElementTree as ET
import math, os, copy
from enhance import font_map, estimate_need, get_content_padding, text_width, line_h, is_wide

NS = 'https://www.larkoffice.com/sml/2.0'
ET.register_namespace('', NS)
CW = 959.0; CH = 540.0

def bbox(el):
    x = float(el.get('topLeftX',0)); y = float(el.get('topLeftY',0))
    w = float(el.get('width',0));   h = float(el.get('height',0))
    return (x, y, x+w, y+h)

def best_bg(sh, shapes):
    """放宽版背景识别：与文本相交面积最大的非 text 形状"""
    x,y,x2,y2 = bbox(sh)
    best = None; best_area = 0.0
    for s in shapes:
        if s is sh or s.get('type') in ('text',): continue
        sx,sy,sx2,sy2 = bbox(s)
        ix = max(0, min(x2,sx2)-max(x,sx)); iy = max(0, min(y2,sy2)-max(y,sy))
        a = ix*iy
        if a > best_area and a >= 0.25*((x2-x)*(y2-y)):
            best = s; best_area = a
    return best

def set_spans(spans, vals):
    for sp, v in zip(spans, vals):
        sp.set('fontSize', str(v))

def fit_text(sh, shapes):
    """把文本 shape 约束进背景（或画布）内；字号从当前放大值逐步回退"""
    content = sh.find(f'{{{NS}}}content')
    if content is None: return
    spans = [sp for sp in sh.iter(f'{{{NS}}}span') if sp.get('fontSize')]
    if not spans: return
    orig = [float(sp.get('fontSize')) for sp in spans]
    base = [font_map(v) for v in orig]
    bg = best_bg(sh, shapes)
    if bg is not None:
        bx, by, bx2, by2 = bbox(bg)
    else:
        bx, by, bx2, by2 = 0.0, 0.0, CW, CH
    sx = float(sh.get('topLeftX',0)); sy = float(sh.get('topLeftY',0))
    # 约束宽/高
    limit_w = bx2 - sx - 2
    limit_h = by2 - sy - 2
    # 宽度收缩（若超背景）
    cur_w = float(sh.get('width',0))
    if cur_w > limit_w:
        sh.set('width', str(round(max(limit_w, 8), 1)))
    # 字号迭代：off 0..-6
    chosen = None
    for off in range(0, -7, -1):
        vals = [max(1.0, round(v + off, 1)) for v in base]
        set_spans(spans, vals)
        need_h, max_w, wrap = estimate_need(sh, content)
        pt, pb, pl, pr = get_content_padding(content)
        avail_w = float(sh.get('width',0)) - pl - pr
        ok_h = need_h <= limit_h + 1.5
        ok_w = max_w <= avail_w + 2 or wrap
        if ok_h and ok_w:
            chosen = vals
            # 设置高度为需要高度（不超背景）
            nh = min(need_h, limit_h)
            if nh > 2:
                sh.set('height', str(round(nh, 1)))
            break
    if chosen is None:
        # 全部失败：回到原始字号，且收缩高度到背景内
        set_spans(spans, orig)
        cur_h = float(sh.get('height',0))
        if cur_h > limit_h:
            sh.set('height', str(round(max(limit_h, 4), 1)))
    # 确保文本 shape 不超背景右/下边界
    x2 = float(sh.get('topLeftX',0)) + float(sh.get('width',0))
    y2 = float(sh.get('topLeftY',0)) + float(sh.get('height',0))
    if x2 > bx2 + 0.5 and bx2 < CW:
        sh.set('width', str(round(max(bx2 - float(sh.get('topLeftX',0)), 8), 1)))
    if y2 > by2 + 0.5 and by2 < CH:
        sh.set('height', str(round(max(by2 - float(sh.get('topLeftY',0)), 4), 1)))

def process(slide):
    data = slide.find(f'{{{NS}}}data')
    if data is None: return
    shapes = list(data.findall(f'{{{NS}}}shape'))
    text_shapes = [s for s in shapes if s.get('type')=='text']

    # 第一遍：所有文本 shape 约束进背景/画布
    for sh in text_shapes:
        fit_text(sh, shapes)

    # 第二遍：特殊情况修复
    # 1) 数字大字卡（height 过大导致重叠）：baz/bZC/bZe 等——已在 fit 中收缩高度
    # 2) 第32页 blF 移入 blV：文本顶部在背景外
    for sh in text_shapes:
        bg = best_bg(sh, shapes)
        if bg is None: continue
        bx, by, bx2, by2 = bbox(bg)
        sx = float(sh.get('topLeftX',0)); sy = float(sh.get('topLeftY',0))
        if sy < by - 0.5:
            # 文本顶部在背景外 → 上移进背景
            sh.set('topLeftY', str(round(by + 2, 1)))

    # 3) 对比度：青色箭头加深
    for sh in text_shapes:
        for sp in sh.iter(f'{{{NS}}}span'):
            col = sp.get('color')
            if col == 'rgba(47, 184, 198, 1)':
                sp.set('color', 'rgba(21, 118, 133, 1)')

def main():
    import glob
    os.makedirs('pages2', exist_ok=True)
    for f in sorted(glob.glob('pages/page-*.xml')):
        tree = ET.parse(f); root = tree.getroot()
        slide = root if root.tag == f'{{{NS}}}slide' else root.find(f'{{{NS}}}slide')
        process(slide)
        out = f.replace('pages/', 'pages2/')
        xml = ET.tostring(slide, encoding='unicode')
        with open(out, 'w', encoding='utf-8') as fo:
            fo.write(xml)
    print('done pages2')

if __name__ == '__main__':
    main()
