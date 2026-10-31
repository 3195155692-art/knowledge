#!/usr/bin/env python3
# enhance11: 第四轮修复（基于 pages10 → pages11）
# 根因：多数 est 偏大源于 p 的 lineSpacing="fixed:NN" 大行距 → 统一改为 multiple:1.5
import xml.etree.ElementTree as ET, os, glob

SRC = 'pages10'; DST = 'pages11'
NS = 'https://www.larkoffice.com/sml/2.0'
def q(t): return f'{{{NS}}}{t}'
os.makedirs(DST, exist_ok=True)

def parse(fn):
    tree = ET.parse(fn); root = tree.getroot()
    slide = root if root.tag == q('slide') else root.find(q('slide'))
    if slide is None: slide = root
    return tree, root, slide

def data_of(slide): return slide.find(q('data'))

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

def merge_li_p(slide):
    for li in slide.iter(q('li')):
        ps = list(li.findall(q('p')))
        if len(ps) > 1:
            first = ps[0]
            tail = first.find(q('span'))
            if tail is None:
                strong = first.find(q('strong'))
                tail = strong.find(q('span')) if strong is not None else None
            for extra in ps[1:]:
                st = extra.find(q('span'))
                if st is None:
                    sg = extra.find(q('strong'))
                    st = sg.find(q('span')) if sg is not None else None
                if st is not None and st.text and tail is not None:
                    tail.text = (tail.text or '') + (st.text or '')
                li.remove(extra)

def set_p_line_spacing(slide, eids, ls='multiple:1.5'):
    data = data_of(slide)
    for ch in data:
        if ch.get('id') not in eids: continue
        c = content_of(ch)
        if c is None: continue
        for p in c.iter(q('p')):
            p.set('lineSpacing', ls)

def process(fn):
    tree, root, slide = parse(fn)
    data = data_of(slide)
    pid = fn.split('-')[2].replace('.xml','')
    merge_li_p(slide)
    if pid == 'pzB':
        set_p_line_spacing(slide, {'baL','bah','baG'})
    elif pid == 'pze':
        set_p_line_spacing(slide, {'bDS','bDW','bDs'})
    elif pid == 'pzc':
        set_p_line_spacing(slide, {'bfl'})
    elif pid == 'pzR':
        set_p_line_spacing(slide, {'bll'})
    elif pid == 'pzb':
        set_p_line_spacing(slide, {'bFS','buF','buJ','bui'})
        set_attr(slide, 'bui', height='67')
    elif pid == 'pzz':
        set_p_line_spacing(slide, {'buh','bum','buU'})
        set_attr(slide, 'bum', topLeftY='279.5')
    elif pid == 'pzU':
        set_p_line_spacing(slide, {'bjd','bjq','bjh','bjt','bjL','bjY','bjQ','bjj','bjG'})
    ET.register_namespace('', NS)
    body = ET.tostring(root, encoding='unicode')
    if body.startswith('<?xml'): body = body[body.index('?>')+2:].lstrip('\n')
    with open(os.path.join(DST, os.path.basename(fn)), 'w', encoding='utf-8') as f:
        f.write(body)

for fn in sorted(glob.glob(SRC + '/page-*.xml')):
    process(fn)
print('done pages11')
