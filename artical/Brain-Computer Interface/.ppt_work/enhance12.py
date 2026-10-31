#!/usr/bin/env python3
# enhance12: 第五轮修复（基于 pages11 → pages12）
# 根因：lint 估算用 content 级 fontSize（span 的 fontSize 只影响渲染）→ 把 content fontSize 对齐 span 视觉值，est 按真实字号下降
import xml.etree.ElementTree as ET, os, glob, unicodedata

SRC = 'pages11'; DST = 'pages12'
NS = 'https://www.larkoffice.com/sml/2.0'
def q(t): return f'{{{NS}}}{t}'
os.makedirs(DST, exist_ok=True)

def parse(fn):
    tree = ET.parse(fn); root = tree.getroot()
    slide = root if root.tag == q('slide') else root.find(q('slide'))
    if slide is None: slide = root
    return tree, root, slide

def data_of(slide): return slide.find(q('data'))

def get_attr(slide, eid):
    data = data_of(slide)
    for ch in data:
        if ch.get('id') == eid: return ch
    return None

def content_of(ch): return ch.find(q('content'))

def char_w(c, fs):
    if c.isspace(): return fs*0.33
    ea = unicodedata.east_asian_width(c)
    if ea in ('F','W'): return fs
    if ea == 'A': return fs  # CJK 上下文内按全角
    if c.isupper(): return fs*0.66
    if c.islower(): return fs*0.62
    if c.isdigit(): return fs*0.66
    return fs*0.62

def est_w(txt, fs):
    return sum(char_w(c, fs) for c in txt)

def split_to_width(txt, fs, max_w):
    """贪心切段，保证每段 est_w <= max_w（拉丁词保持原子）。"""
    segs = []
    cur = ''
    for ch in txt:
        if ch.isspace() and cur and est_w(cur+ch, fs) > max_w:
            segs.append(cur); cur = ''
            continue
        if est_w(cur+ch, fs) > max_w and cur:
            # 在标点后优先断
            if cur[-1] in '，。；：、「」（）——':
                segs.append(cur); cur = ch
            else:
                segs.append(cur); cur = ch
        else:
            cur += ch
    if cur: segs.append(cur)
    return segs

def set_content_fs(slide, eid, fs):
    el = get_attr(slide, eid)
    if el is None: return
    c = content_of(el)
    if c is not None:
        c.set('fontSize', str(fs))

def rebuild_p35(slide, eid, fs, w):
    """bFS 类：content fs + 段1 拆为短段（每段 1 行）。"""
    el = get_attr(slide, eid)
    if el is None: return
    c = content_of(el)
    if c is None: return
    c.set('fontSize', str(fs))
    ps = [p for p in c.iter(q('p'))]
    if not ps: return
    # 取各段文本
    def ptext(p):
        return ''.join(s.text or '' for s in p.iter(q('span')))
    texts = [ptext(p) for p in ps]
    if not texts: return
    segs = []
    for t in texts:
        if est_w(t, fs) <= w*0.98:
            segs.append(t)
        else:
            segs.extend(split_to_width(t, fs, w*0.98))
    # 重建（保持 strong>span 结构）
    parent = None
    for el2 in c.iter():
        if ps[0] in list(el2): parent = el2; break
    if parent is None: return
    proto = ps[0]
    p_attrs = dict(proto.attrib)
    strong = proto.find(q('strong'))
    span_attrs = None
    if strong is not None:
        s0 = strong.find(q('span'))
        if s0 is not None: span_attrs = dict(s0.attrib)
    else:
        s0 = proto.find(q('span'))
        if s0 is not None: span_attrs = dict(s0.attrib)
    if span_attrs is None: span_attrs = {}
    span_attrs['fontSize'] = str(fs)
    for p in ps: parent.remove(p)
    for seg in segs:
        np = ET.Element(q('p'), p_attrs)
        if strong is not None:
            nstrong = ET.SubElement(np, q('strong'))
            ns = ET.SubElement(nstrong, q('span'), span_attrs)
        else:
            ns = ET.SubElement(np, q('span'), span_attrs)
        ns.text = seg
        parent.append(np)

def process(fn):
    tree, root, slide = parse(fn)
    data = data_of(slide)
    pid = fn.split('-')[2].replace('.xml','')
    if pid == 'pzB':  # p7
        for eid, fs in (('baG',11.5),('bah',11),('baL',11)):
            set_content_fs(slide, eid, fs)
    elif pid == 'pze':  # p19
        set_content_fs(slide, 'bDS', 12)
    elif pid == 'pzc':  # p29
        set_content_fs(slide, 'bfl', 9.5)
    elif pid == 'pzR':  # p32
        set_content_fs(slide, 'bll', 9.5)
    elif pid == 'pzb':  # p35
        for eid in ('bFS','buF','buJ','bui'):
            el = get_attr(slide, eid)
            w = float(el.get('width', 184.9)) if el is not None else 184.9
            rebuild_p35(slide, eid, 9.5, w)
    elif pid == 'pzz':  # p36
        for eid in ('buh','bum','buU'):
            set_content_fs(slide, eid, 9)
    elif pid == 'pzU':  # p38
        for eid in ('bjd','bjq','bjh','bjt','bjL','bjY','bjQ','bjj','bjG'):
            set_content_fs(slide, eid, 9)
    ET.register_namespace('', NS)
    body = ET.tostring(root, encoding='unicode')
    if body.startswith('<?xml'): body = body[body.index('?>')+2:].lstrip('\n')
    with open(os.path.join(DST, os.path.basename(fn)), 'w', encoding='utf-8') as f:
        f.write(body)

for fn in sorted(glob.glob(SRC + '/page-*.xml')):
    process(fn)
print('done pages12')
