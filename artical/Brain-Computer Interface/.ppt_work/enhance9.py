#!/usr/bin/env python3
# enhance8: 第二轮定点修复（基于 pages7 → pages8）
# 策略：按 lint 剩余 38 个 error 逐项定向修复，禁止移动跨语义组元素、禁止把字号压到放大前以下。
import xml.etree.ElementTree as ET, os, re, glob

SRC = 'pages7'; DST = 'pages9'
NS = 'https://www.larkoffice.com/sml/2.0'
def q(t): return f'{{{NS}}}{t}'
os.makedirs(DST, exist_ok=True)

def parse(fn):
    tree = ET.parse(fn); root = tree.getroot()
    slide = root if root.tag == q('slide') else root.find(q('slide'))
    if slide is None: slide = root
    return tree, root, slide

def data_of(slide):
    return slide.find(q('data'))

def text_of_p(p):
    ss = list(p.iterfind(q('span')))
    if ss: return ''.join(s.text or '' for s in ss)
    return p.text or ''

def char_w(c, fs):
    return fs*1.25 if ord(c) > 0x2E80 else fs*0.62

def est_w(txt, fs):
    return sum(char_w(c, fs) for c in txt)

def split_text_p(content, p, max_w, fs):
    """把单个 p 拆成两个 p（各含继承样式的 span），保证每段 est 宽 ≤ max_w*1.02。"""
    txt = text_of_p(p)
    if len(txt) <= 1: return
    if est_w(txt, fs) <= max_w*1.02: return
    per_chars = max(2, int(max_w / (fs*1.25)))
    n = len(txt)
    cut = max(per_chars, n - per_chars)
    while 0 < cut < n and txt[cut-1] not in '，。；：、「」（）——':
        cut += 1
    if cut <= 0 or cut >= n:
        cut = max(1, n//2)
    p1txt, p2txt = txt[:cut], txt[cut:]
    if not p1txt or not p2txt: return
    ss = list(p.iterfind(q('span')))
    attrs = dict(ss[0].attrib) if ss else {}
    parent = None
    for el in content.iter():
        if p in list(el):
            parent = el; break
    if parent is None: return
    idx = list(parent).index(p)
    parent.remove(p)
    pos = idx
    for seg in (p1txt, p2txt):
        np = ET.Element(q('p'))
        ns = ET.SubElement(np, q('span'), attrs)
        ns.text = seg
        parent.insert(pos, np); pos += 1

def ensure_span_style(p, fs, color=None):
    """把 p 直接文本转成带 fs 的 span；已有 span 则补 fs。"""
    ss = list(p.iterfind(q('span')))
    if ss:
        for s in ss:
            if fs is not None: s.set('fontSize', str(fs))
            if color: s.set('color', color)
    else:
        txt = p.text or ''
        attrs = {}
        if fs is not None: attrs['fontSize'] = str(fs)
        if color: attrs['color'] = color
        p.clear()
        ns = ET.SubElement(p, q('span'), attrs)
        ns.text = txt

def set_attr(slide, eid, **kw):
    data = data_of(slide)
    for ch in data:
        if ch.get('id') == eid:
            for k, v in kw.items():
                ch.set(k, str(v))
            return ch
    return None

def get_attr(slide, eid):
    data = data_of(slide)
    for ch in data:
        if ch.get('id') == eid:
            return ch
    return None

def content_of(ch):
    return ch.find(q('content'))

def move_to_end(slide, eid):
    data = data_of(slide)
    el = None
    for ch in list(data):
        if ch.get('id') == eid:
            el = ch; data.remove(ch); break
    if el is not None:
        data.append(el)

def process(fn):
    tree, root, slide = parse(fn)
    data = data_of(slide)
    pid = fn.split('-')[2].replace('.xml','')
    # ---- 通用：拆分 wrap 型长单行文本（p.text 与 span 双支持），span 补 fs ----
    if pid in ('pzB','pzn','pze','pzz','pzU','pzK','pzb'):
        for ch in data:
            if ch.tag != q('shape') or ch.get('type') != 'text': continue
            c = content_of(ch)
            if c is None: continue
            w = float(ch.get('width', 0))
            for p in list(c.iter(q('p'))):
                txt = text_of_p(p)
                if not txt: continue
                # 估算 fs：span 显式或 content 继承
                ss = list(p.iterfind(q('span')))
                fs = None
                if ss and ss[0].get('fontSize'):
                    fs = float(ss[0].get('fontSize'))
                if fs is None and c.get('fontSize'):
                    fs = float(c.get('fontSize'))
                if fs is None: fs = 16.0
                split_text_p(c, p, w, fs)
    # ---- 定点修复 ----
    if pid == 'pzB':  # p7
        baG = get_attr(slide, 'baG')
        if baG is not None:
            c = content_of(baG)
            for p in list(c.iter(q('p'))):
                ensure_span_style(p, 11.5)
            set_attr(slide, 'baG', height='100.5')
        set_attr(slide, 'bah', height='50.5')
    elif pid == 'pzO':  # p10
        # 组 y: 01=181 02=226 03=282 04=334；文本 span fs
        for eid, y, h, fs in (('brl',181,None,None),('brX',181,34,11),('brI',226,None,None),
                              ('brC',226,49,None),('brB',282,None,None),('brj',282,49,None),
                              ('brc',334,40,None),('brG',334,41,11)):
            el = get_attr(slide, eid)
            if el is None: continue
            if y is not None: set_attr(slide, eid, topLeftY=str(y))
            if h is not None: set_attr(slide, eid, height=str(h))
            if fs is not None:
                c = content_of(el)
                if c is not None:
                    for p in list(c.iter(q('p'))):
                        ensure_span_style(p, fs)
        set_attr(slide, 'brX', width='179')
        set_attr(slide, 'brG', width='179')
        set_attr(slide, 'brf', topLeftY='392', height='148')
    elif pid == 'pzn':  # p14
        set_attr(slide, 'bbn', height='38')
        set_attr(slide, 'bbz', topLeftY='401', height='35.7')
        set_attr(slide, 'bbd', height='296')
    elif pid == 'pzu':  # p15
        set_attr(slide, 'bej', height='334')
    elif pid == 'pze':  # p19 组重排
        for eid, y, h, fs in (('bDg',184,None,None),('bDS',184,33,12),('bDn',226,None,None),
                              ('bDs',226,44,12),('bDO',276,None,None),('bRa',276,17,12),
                              ('bDz',315,None,None),('bDW',315,33,12)):
            el = get_attr(slide, eid)
            if el is None: continue
            if y is not None: set_attr(slide, eid, topLeftY=str(y))
            if h is not None: set_attr(slide, eid, height=str(h))
            if fs is not None:
                c = content_of(el)
                if c is not None:
                    for p in list(c.iter(q('p'))):
                        ensure_span_style(p, fs)
    elif pid == 'pzC':  # p23
        set_attr(slide, 'bCA', topLeftY='200.5')
        set_attr(slide, 'bCU', height='82')
        set_attr(slide, 'bCX', topLeftY='283')
        set_attr(slide, 'bCe', height='83')
        bCr = get_attr(slide, 'bCr')
        if bCr is not None:
            set_attr(slide, 'bCr', width='820', height='24', topLeftX='45', topLeftY='482')
            c = content_of(bCr)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_span_style(p, 10.5, 'rgba(217, 138, 33, 1)')
            move_to_end(slide, 'bCr')
    elif pid == 'pzQ':  # p25
        set_attr(slide, 'bZh', topLeftY='142', height='36')
    elif pid == 'pzL':  # p26
        bZe = get_attr(slide, 'bZe')
        if bZe is not None:
            set_attr(slide, 'bZe', height='64')
            c = content_of(bZe)
            if c is not None: c.set('autoFit', 'shape-auto-fit')
    elif pid == 'pzc':  # p29
        set_attr(slide, 'bfl', width='401', height='106')
        el = get_attr(slide, 'bfl')
        if el is not None:
            c = content_of(el)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_span_style(p, 9.5)
        set_attr(slide, 'bfx', width='400', height='18.6')
    elif pid == 'pzJ':  # p30
        set_attr(slide, 'bfo', height='92')
    elif pid == 'pzY':  # p31
        for eid, y, h, fs in (('bBi',None,41,12),('bBP',None,41,12),('bBJ',None,40,10),
                              ('bBj',420,40,10)):
            el = get_attr(slide, eid)
            if el is None: continue
            if y is not None: set_attr(slide, eid, topLeftY=str(y))
            if h is not None: set_attr(slide, eid, height=str(h))
            if fs is not None:
                c = content_of(el)
                if c is not None:
                    for p in list(c.iter(q('p'))):
                        ensure_span_style(p, fs)
        set_attr(slide, 'bBS', height='230')
    elif pid == 'pzR':  # p32
        set_attr(slide, 'bll', height='118')
        el = get_attr(slide, 'bll')
        if el is not None:
            c = content_of(el)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_span_style(p, 9.5)
        move_to_end(slide, 'blF')
    elif pid == 'pzK':  # p33
        for eid, h in (('blg',44),('bFR',44)):
            set_attr(slide, eid, height=str(h))
    elif pid == 'pzb':  # p35
        set_attr(slide, 'bua', height='44')
    elif pid == 'pzz':  # p36
        set_attr(slide, 'bum', height='35')
    elif pid == 'pzU':  # p38
        set_attr(slide, 'bjG', height='32.5')
        set_attr(slide, 'bjc', topLeftY='498')
    # 写回（无 XML 声明头）
    ET.register_namespace('', NS)
    body = ET.tostring(root, encoding='unicode')
    if body.startswith('<?xml'): body = body[body.index('?>')+2:].lstrip('\n')
    with open(os.path.join(DST, os.path.basename(fn)), 'w', encoding='utf-8') as f:
        f.write(body)

for fn in sorted(glob.glob(SRC + '/page-*.xml')):
    process(fn)
print('done pages8')
