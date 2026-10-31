#!/usr/bin/env python3
# enhance10: 第三轮定点修复（基于 pages9 → pages10）
import xml.etree.ElementTree as ET, os, glob

SRC = 'pages9'; DST = 'pages10'
NS = 'https://www.larkoffice.com/sml/2.0'
def q(t): return f'{{{NS}}}{t}'
os.makedirs(DST, exist_ok=True)

def parse(fn):
    tree = ET.parse(fn); root = tree.getroot()
    slide = root if root.tag == q('slide') else root.find(q('slide'))
    if slide is None: slide = root
    return tree, root, slide

def data_of(slide): return slide.find(q('data'))

def deep_spans(p):
    return [s for s in p.iter(q('span'))]

def text_of_p(p):
    ss = deep_spans(p)
    if ss: return ''.join(s.text or '' for s in ss)
    return p.text or ''

def char_w(c, fs):
    return fs*1.25 if ord(c) > 0x2E80 else fs*0.62

def est_w(txt, fs):
    return sum(char_w(c, fs) for c in txt)

def parent_of(c, p):
    for el in c.iter():
        if p in list(el): return el
    return None

def split_deep_p(c, p, max_w, fs):
    """深度拆分：p > strong > span 结构，拆成两个 p 保留 strong/span 样式。"""
    txt = text_of_p(p)
    if len(txt) <= 1: return
    if est_w(txt, fs) <= max_w*1.02: return
    per_chars = max(2, int(max_w / (fs*1.25)))
    n = len(txt)
    cut = max(per_chars, n - per_chars)
    while 0 < cut < n and txt[cut-1] not in '，。；：、「」（）——':
        cut += 1
    if cut <= 0 or cut >= n: cut = max(1, n//2)
    p1txt, p2txt = txt[:cut], txt[cut:]
    if not p1txt or not p2txt: return
    parent = parent_of(c, p)
    if parent is None: return
    idx = list(parent).index(p)
    # 模板：原 p 的第一个 strong（若有）与第一个 span 样式
    strong = p.find(q('strong'))
    span_tpl = None
    if strong is not None:
        s0 = strong.find(q('span'))
        if s0 is not None: span_tpl = dict(s0.attrib)
    elif p.find(q('span')) is not None:
        span_tpl = dict(p.find(q('span')).attrib)
    parent.remove(p)
    pos = idx
    for seg in (p1txt, p2txt):
        np = ET.Element(q('p'), dict(p.attrib))
        nstrong = ET.SubElement(np, q('strong'))
        ns = ET.SubElement(nstrong, q('span'), span_tpl or {})
        ns.text = seg
        parent.insert(pos, np); pos += 1

def ensure_deep_span_fs(p, fs, color=None):
    ss = deep_spans(p)
    if ss:
        for s in ss:
            s.set('fontSize', str(fs))
            if color: s.set('color', color)
    else:
        txt = p.text or ''
        attrs = {'fontSize': str(fs)}
        if color: attrs['color'] = color
        p.clear()
        ns = ET.SubElement(p, q('span'), attrs)
        ns.text = txt

def set_attr(slide, eid, **kw):
    data = data_of(slide)
    for ch in data:
        if ch.get('id') == eid:
            for k, v in kw.items(): ch.set(k, str(v))
            return ch
    return None

def get_attr(slide, eid):
    data = data_of(slide)
    for ch in data:
        if ch.get('id') == eid: return ch
    return None

def content_of(ch): return ch.find(q('content'))

def move_to_end(slide, eid):
    data = data_of(slide)
    el = None
    for ch in list(data):
        if ch.get('id') == eid:
            el = ch; data.remove(ch); break
    if el is not None: data.append(el)

def merge_li_p(slide):
    """li 下多个 p 合并为一个（文本拼接）。"""
    for li in slide.iter(q('li')):
        ps = list(li.findall(q('p')))
        if len(ps) > 1:
            first = ps[0]
            # 把后续 p 的文本并入 first 的最后一个 span
            tail = first.find(q('span'))
            if tail is None:
                strong = first.find(q('strong'))
                tail = strong.find(q('span')) if strong is not None else None
            for extra in ps[1:]:
                st = extra.find(q('span'))
                if st is None:
                    sg = extra.find(q('strong'))
                    st = sg.find(q('span')) if sg is not None else None
                if st is not None and st.text:
                    if tail is not None:
                        tail.text = (tail.text or '') + (st.text or '')
                li.remove(extra)

def process(fn):
    tree, root, slide = parse(fn)
    data = data_of(slide)
    pid = fn.split('-')[2].replace('.xml','')
    merge_li_p(slide)
    if pid == 'pze':  # p19 组重排
        for eid, y, h in (('bDg',184,None),('bDS',184,64.5),('bDn',254,None),('bDs',254,44),
                          ('bDO',302,None),('bRa',302,17),('bDz',330,None),('bDW',330,40.5)):
            el = get_attr(slide, eid)
            if el is None: continue
            if y is not None: set_attr(slide, eid, topLeftY=str(y))
            if h is not None: set_attr(slide, eid, height=str(h))
    elif pid == 'pzc':  # p29 bfl 拆 5 段 + 缩字
        bfl = get_attr(slide, 'bfl')
        if bfl is not None:
            set_attr(slide, 'bfl', height='95.5')
            c = content_of(bfl)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_deep_span_fs(p, 9.5)
                    fs = 9.5
                    w = float(bfl.get('width', 401))
                    split_deep_p(c, p, w, fs)
    elif pid == 'pzY':  # p31
        for eid, w, h in (('bBJ',167,40.5),('bBj',167,40.5)):
            set_attr(slide, eid, width=str(w), height=str(h))
        set_attr(slide, 'bBS', height='244')
    elif pid == 'pzR':  # p32 bll 拆 4 段 + 收窄
        bll = get_attr(slide, 'bll')
        if bll is not None:
            set_attr(slide, 'bll', width='364', height='67')
            c = content_of(bll)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_deep_span_fs(p, 9.5)
                    split_deep_p(c, p, 364, 9.5)
    elif pid == 'pzK':  # p33
        for eid, segs in (('blg', ['状态与内容', '没有打通']),
                          ('bFR', ['ground truth', '缺失'])):
            el = get_attr(slide, eid)
            if el is None: continue
            c = content_of(el)
            if c is None: continue
            ps = [p for p in c.iter(q('p'))]
            if not ps: continue
            parent = next((e for e in c.iter() if ps[0] in list(e)), None)
            if parent is None: continue
            # 取原 p 结构与 span 样式
            proto = ps[0]
            p_attrs = dict(proto.attrib)
            strong = proto.find(q('strong'))
            span_attrs = None
            if strong is not None:
                s0 = strong.find(q('span'))
                if s0 is not None: span_attrs = dict(s0.attrib)
            for p in ps: parent.remove(p)
            for seg in segs:
                np = ET.Element(q('p'), p_attrs)
                nstrong = ET.SubElement(np, q('strong'))
                ns = ET.SubElement(nstrong, q('span'), span_attrs or {})
                ns.text = seg
                parent.append(np)
    elif pid == 'pzb':  # p35
        for eid, w, h in (('bFS',184.9,53),('buF',184.9,53),('buJ',184.9,53),('bui',184.9,53)):
            el = get_attr(slide, eid)
            if el is None: continue
            set_attr(slide, eid, width=str(w), height=str(h))
            c = content_of(el)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_deep_span_fs(p, 9.5)
        bua = get_attr(slide, 'bua')
        if bua is not None:
            c = content_of(bua)
            if c is not None:
                ps = [p for p in c.iter(q('p'))]
                if ps:
                    parent = next((e for e in c.iter() if ps[0] in list(e)), None)
                    if parent is not None:
                        proto = ps[0]; p_attrs = dict(proto.attrib)
                        strong = proto.find(q('strong'))
                        span_attrs = None
                        if strong is not None:
                            s0 = strong.find(q('span'))
                            if s0 is not None: span_attrs = dict(s0.attrib)
                        for p in ps: parent.remove(p)
                        for seg in ('瓶颈不是精度，', '是对照条件'):
                            np = ET.Element(q('p'), p_attrs)
                            nstrong = ET.SubElement(np, q('strong'))
                            ns = ET.SubElement(nstrong, q('span'), span_attrs or {})
                            ns.text = seg
                            parent.append(np)
    elif pid == 'pzz':  # p36
        for eid, y, h in (('buh',158.5,36.5),('bum',280.5,36.5),('buU',319.5,36.5)):
            el = get_attr(slide, eid)
            if el is None: continue
            set_attr(slide, eid, topLeftY=str(y), height=str(h))
            c = content_of(el)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_deep_span_fs(p, 9)
    elif pid == 'pzU':  # p38
        for eid in ('bjd','bjq','bjh','bjt','bjL','bjY','bjQ','bjj'):
            el = get_attr(slide, eid)
            if el is None: continue
            set_attr(slide, eid, height='72.5')
            c = content_of(el)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_deep_span_fs(p, 9)
        bjG = get_attr(slide, 'bjG')
        if bjG is not None:
            set_attr(slide, 'bjG', height='33.5')
            c = content_of(bjG)
            if c is not None:
                for p in list(c.iter(q('p'))):
                    ensure_deep_span_fs(p, 9)
    ET.register_namespace('', NS)
    body = ET.tostring(root, encoding='unicode')
    if body.startswith('<?xml'): body = body[body.index('?>')+2:].lstrip('\n')
    with open(os.path.join(DST, os.path.basename(fn)), 'w', encoding='utf-8') as f:
        f.write(body)

for fn in sorted(glob.glob(SRC + '/page-*.xml')):
    process(fn)
print('done pages10')
