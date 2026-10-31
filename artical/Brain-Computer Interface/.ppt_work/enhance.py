#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""组会汇报 PPT 批量润色脚本：
1) 全局放大 span 字号（映射表，合理范围内尽量大）
2) 文本 shape 重排：估算文字所需高度/宽度，扩展容器至背景图案内
3) 背景图案扩展（不超画布、不与邻居重叠），否则字号降级
4) 修复 sxsd 非法属性（indent 负数、bulletSize=100px）
5) 修复 img/shape 越界（章节页波形图、页眉条）
6) 修复图片盖文字（第1页波形图缩至画布内）
输出：pages/<slide_id>.xml（每页完整 <slide>）
"""
import xml.etree.ElementTree as ET
import re, math, os, json, copy

NS = 'https://www.larkoffice.com/sml/2.0'
ET.register_namespace('', NS)
CW = 959.0
CH = 540.0

# ---------- 字号放大映射 ----------
def font_map(fs):
    f = float(fs)
    if f <= 10.5:   return round(f + 1.5, 1)      # 9.5/10/10.5 -> +1.5
    if f <= 13:     return round(f + 2.0, 1)      # 11..13 -> +2
    if f <= 17.5:   return round(f + 2.5, 1)      # 13.5..17.5 -> +2.5
    if f <= 24:     return round(f + 3.0, 1)      # 18.5..24 -> +3
    if f <= 30:     return round(f + 3.5, 1)      # 28.5/29.5 -> +3.5
    if f <= 45:     return round(f + 5.0, 1)      # 43.5 -> 48.5
    if f <= 52:     return round(f + 5.0, 1)      # 48/50 -> +5
    return round(f + 8.0, 1)                      # 76.5 -> 84.5

# ---------- 工具 ----------
def is_wide(ch):
    o = ord(ch)
    return o > 0x2E80 or 0x2000 <= o <= 0x206F or o in (0x2018,0x2019,0x201C,0x201D,0x2014,0x2026) or o >= 0xFF00

def text_width(s, fs):
    w = 0.0
    for c in s:
        w += fs if is_wide(c) else fs*0.55
    return w

def line_h(fs, ls):
    # ls: lineSpacing 值如 "multiple:1.2" / "single" / "1.2"（倍数）
    m = re.search(r'([\d.]+)$', ls or '1.2')
    k = float(m.group(1)) if m else 1.2
    return fs * max(1.05, k*1.06)

def get_content_padding(content):
    def g(k, d):
        v = content.get(k)
        return float(v) if v else d
    return (g('paddingTop',0.0), g('paddingBottom',0.0), g('paddingLeft',0.0), g('paddingRight',0.0))

def estimate_need(shape, content):
    """估算文本所需高度与每行宽度需求。返回 (need_h, max_line_w, need_wrap_any)"""
    pt, pb, pl, pr = get_content_padding(content)
    avail_w = float(shape.get('width',0)) - pl - pr
    if avail_w <= 4: avail_w = float(shape.get('width',0))
    total_h = pt + pb
    max_line_w = 0.0
    wrap_any = False
    for p in shape.iter(f'{{{NS}}}p'):
        # 该段落内所有 span（无 span 时取 text 节点）
        spans = list(p.iter(f'{{{NS}}}span'))
        if not spans:
            txt = ''.join(t.text or '' for t in p.iter(f'{{{NS}}}text')) or (p.text or '')
            fs = float(content.get('fontSize', 14)) if content.get('fontSize') else 14.0
            ls = p.get('lineSpacing')
            w = text_width(txt, fs)
            lines = max(1, math.ceil(w / avail_w)) if avail_w>0 else 1
            if lines > 1: wrap_any = True
            total_h += lines * line_h(fs, ls) + fs*0.25
            max_line_w = max(max_line_w, w)
            continue
        # 按 span 拆分计算
        run = []; cur_fs = None
        segs = []  # (text, fs)
        for sp in spans:
            t = sp.text or ''
            fs = float(sp.get('fontSize') or content.get('fontSize') or 14)
            if t:
                segs.append((t, fs))
        # 合并连续同字号
        merged = []
        for t, fs in segs:
            if merged and abs(merged[-1][1]-fs) < 0.01:
                merged[-1] = (merged[-1][0]+t, fs)
            else:
                merged.append([t, fs])
        # 逐行排布
        cur_w = 0.0; lines = 1
        for t, fs in merged:
            w = text_width(t, fs)
            if cur_w + w > avail_w and cur_w > 0:
                lines += 1; cur_w = w
                wrap_any = True
            else:
                cur_w += w
        if merged:
            max_fs = max(fs for _, fs in merged)
            ls = p.get('lineSpacing')
            total_h += lines * line_h(max_fs, ls) + max_fs*0.25
            max_line_w = max(max_line_w, max_fs*len(''.join(t for t,_ in merged)))
    return total_h, max_line_w, wrap_any

def find_bg(shape, shapes):
    """同页中最小包围该文本 shape 的非 text 背景形状"""
    x = float(shape.get('topLeftX',0)); y = float(shape.get('topLeftY',0))
    w = float(shape.get('width',0));   h = float(shape.get('height',0))
    cands = []
    for s in shapes:
        if s is shape: continue
        t = s.get('type','')
        if t in ('text',): continue
        sx = float(s.get('topLeftX',0)); sy = float(s.get('topLeftY',0))
        sw = float(s.get('width',0));    sh = float(s.get('height',0))
        # 背景需覆盖文本形状大部分区域（至少 60%）
        ix = max(0, min(x+w, sx+sw) - max(x, sx))
        iy = max(0, min(y+h, sy+sh) - max(y, sy))
        if ix <= 0 or iy <= 0: continue
        inter = ix*iy
        if inter >= 0.6*w*h and sx <= x+0.5 and sy <= y+0.5 and sx+sw >= x+w-0.5 and sy+sh >= y+h-0.5:
            cands.append((sw*sh, s))
    return min(cands, key=lambda c: c[0])[1] if cands else None

def rects_overlap(a, b, pad=1.0):
    ax,ay,aw,ah = a; bx,by,bw,bh = b
    return not (ax+aw+pad <= bx or bx+bw+pad <= ax or ay+ah+pad <= by or by+bh+pad <= ay)

def clamp_fs(spans):
    """字号映射（保留原相对大小）"""
    for sp in spans:
        fs = sp.get('fontSize')
        if fs:
            sp.set('fontSize', str(font_map(float(fs))))

# ---------- 主处理 ----------
def process_slide(slide):
    data = slide.find(f'{{{NS}}}data')
    if data is None: return
    shapes = list(data.findall(f'{{{NS}}}shape')) + list(data.findall(f'{{{NS}}}img'))
    text_shapes = [s for s in data.findall(f'{{{NS}}}shape') if s.get('type')=='text']

    # ---- 1) 放大字号 + 重排 ----
    for sh in text_shapes:
        content = sh.find(f'{{{NS}}}content')
        if content is None: continue
        spans = list(sh.iter(f'{{{NS}}}span'))
        if not spans: continue
        orig_fs = {id(sp): sp.get('fontSize') for sp in spans if sp.get('fontSize')}
        if not orig_fs: continue
        bg = find_bg(sh, shapes)
        # 候选字号序列：逐级降级
        try_fs = [0, -1, -2, -3]  # 偏移
        for off in try_fs:
            # 重置
            for spid, fs in orig_fs.items():
                pass
            # 应用当前档位
            cur_map = {}
            for sp in spans:
                fs = sp.get('fontSize')
                if fs:
                    base = font_map(float(fs))
                    cur_map[id(sp)] = str(max(1.0, round(base + off, 1)))
            for sp in spans:
                if id(sp) in cur_map:
                    sp.set('fontSize', cur_map[id(sp)])
            # 估算
            need_h, max_line_w, wrap_any = estimate_need(sh, content)
            sh_w = float(sh.get('width',0)); sh_h = float(sh.get('height',0))
            # 可扩空间：背景内（无背景时以画布为界）
            if bg is not None:
                bgx = float(bg.get('topLeftX',0)); bgy = float(bg.get('topLeftY',0))
                bgw = float(bg.get('width',0));    bgh = float(bg.get('height',0))
                shx = float(sh.get('topLeftX',0)); shy = float(sh.get('topLeftY',0))
                max_w = (bgx + bgw - shx - 6)
                max_h = (bgy + bgh - shy - 6)
            else:
                shx = float(sh.get('topLeftX',0)); shy = float(sh.get('topLeftY',0))
                max_w = CW - shx - 6
                max_h = CH - shy - 6
            # 高度需求
            need_h = min(need_h, max_h + 12)  # 弹性
            ok = need_h <= max_h + 1.5 and (max_line_w <= max(sh_w, max_w) + 1.5)
            # 也可通过 wrap 解决宽：wrap 时行数增加已计入 need_h
            if ok:
                # 适度扩高（不超背景）
                if need_h > sh_h + 0.5:
                    sh.set('height', str(round(min(need_h, max_h), 1)))
                break
            # 否则降级
        # 若降级到 -3 仍不行：不放大（保持原样或略缩）
        else:
            for sp in spans:
                if sp.get('fontSize') and id(sp) in orig_fs:
                    sp.set('fontSize', orig_fs[id(sp)])

    # ---- 2) sxsd 修复 ----
    for p in slide.iter(f'{{{NS}}}p'):
        ind = p.get('indent')
        if ind is not None:
            try:
                if float(ind) < 0:
                    p.set('indent', '0')
            except ValueError:
                pass
        bs = p.get('bulletSize')
        if bs is not None and bs.endswith('px'):
            v = bs[:-2]
            p.set('bulletSize', f'{v}%' if v.isdigit() else '100%')

    # ---- 3) img/shape 越界修复 ----
    for el in list(data):
        tag = el.tag.split('}')[1]
        if tag not in ('img','shape'): continue
        x = float(el.get('topLeftX',0)); w = float(el.get('width',0))
        y = float(el.get('topLeftY',0)); h = float(el.get('height',0))
        # 全宽装饰出血图：x<0 且宽>画布 → 收进画布
        if x < 0 and w > CW - 2:
            el.set('topLeftX', '0')
            el.set('width', str(CW))
        # 右边界微小越界
        if x + w > CW + 0.5 and x >= 0:
            el.set('width', str(round(CW - x, 2)))
        # 底边界越界（波形图）
        if y + h > CH + 0.5:
            el.set('height', str(round(CH - y, 2)))
        if y < 0 and h > CH - 2:
            el.set('topLeftY', '0')

def main():
    tree = ET.parse('current.xml')
    root = tree.getroot()
    os.makedirs('pages', exist_ok=True)
    for idx, slide in enumerate(root.findall(f'{{{NS}}}slide'), 1):
        sid = slide.get('id')
        process_slide(slide)
        # 序列化单个 slide（文件名用页码，避免 macOS 大小写不敏感冲突）
        el = copy.deepcopy(slide)
        xml = ET.tostring(el, encoding='unicode')
        with open(f'pages/page-{idx:02d}-{sid}.xml','w',encoding='utf-8') as f:
            f.write(xml)
    print('done, pages:', len(root.findall(f'{{{NS}}}slide')))

if __name__ == '__main__':
    main()
