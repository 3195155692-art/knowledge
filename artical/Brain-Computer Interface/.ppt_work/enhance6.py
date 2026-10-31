#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""enhance6：保守收敛版。基于 lint 精确数值回填尺寸；bbox_overlap 只缩字号不位移；字号下限 11.5。"""
import xml.etree.ElementTree as ET
import subprocess, json, glob, os, re, tempfile

NS = 'https://www.larkoffice.com/sml/2.0'
ET.register_namespace('', NS)
CW = 959.0; CH = 540.0
SK = "/Users/oldma/Library/Application Support/Doubao/Default/.doubao/agent_mode/workspace/.skills/ppt/scripts/xml_lint.py"
TMPD = tempfile.mkdtemp(prefix='ppt6_')

def bbox(el):
    return (float(el.get('topLeftX',0)), float(el.get('topLeftY',0)),
            float(el.get('width',0)), float(el.get('height',0)))

def shapes_of(slide):
    data = slide.find(f'{{{NS}}}data')
    return list(data) if data is not None else []

def owner_limit(sh, shapes):
    sx,sy,sw,shh = bbox(sh)
    best=None; best_area=-1
    idx = next((i for i,c in enumerate(shapes) if c is sh), len(shapes))
    for c in shapes[:idx]:
        if c.tag.split('}')[1] != 'shape' or c.get('type') in ('text',): continue
        if c.find(f'{{{NS}}}fill') is None: continue
        cx,cy,cw,chh = bbox(c)
        ix2 = max(0, min(sx+sw, cx+cw+2)-max(sx,cx-2))
        iy2 = max(0, min(sy+shh, cy+chh+2)-max(sy,cy-2))
        a = ix2*iy2
        if a > best_area: best_area=a; best=c
    if best is None: return CW-sx-3, CH-sy-3, None
    bx,by,bw,bh = bbox(best)
    return (bx+bw-sx-3, by+bh-sy-3, best)

def shrink_fs(sh, step=0.5, floor=11.5):
    changed=False
    for sp in sh.iter(f'{{{NS}}}span'):
        fs = sp.get('fontSize')
        if fs:
            v = max(floor, float(fs)-step)
            if v < float(fs): sp.set('fontSize', str(round(v,1))); changed=True
    return changed

def fix_one(slide, e):
    code = e['code']; els = e.get('elements') or []
    shapes = shapes_of(slide)
    by_id = {s.get('id'): s for s in shapes}
    msg = e.get('message') or ''
    if code == 'text_may_overflow_shape':
        sh = by_id.get(els[0]) if els else None
        if sh is None: return False
        lim_w, lim_h, _ = owner_limit(sh, shapes)
        m = re.search(r'estimated ([\d.]+)px, available ([\d.]+)px', msg)
        if m:
            est = float(m.group(1))
            cur_h = float(sh.get('height',0))
            target = min(est+2, lim_h, cur_h+40)
            if target > cur_h + 0.5:
                sh.set('height', str(round(target,1))); return True
            shrink_fs(sh, 0.5); return True
        m2 = re.search(r'estimated line ([\d.]+)px, available ([\d.]+)px', msg)
        if m2:
            est_w = float(m2.group(1))
            cur_w = float(sh.get('width',0))
            target = min(max(est_w+4, cur_w+8), lim_w, cur_w+40)
            if target > cur_w + 0.5 and target <= lim_w:
                sh.set('width', str(round(target,1))); return True
            c = sh.find(f'{{{NS}}}content')
            if c is not None: c.set('wrap','true')
            cur_h = float(sh.get('height',0))
            target_h = min(cur_h+26, lim_h)
            if target_h > cur_h + 0.5:
                sh.set('height', str(round(target_h,1))); return True
            shrink_fs(sh, 0.5); return True
        cur_h = float(sh.get('height',0))
        target = min(cur_h+20, lim_h)
        if target > cur_h + 0.5:
            sh.set('height', str(round(target,1))); return True
        return shrink_fs(sh, 0.5)
    if code == 'text_overflows_container':
        sh = by_id.get(els[0]) if els else None
        if sh is None: return False
        ov = e.get('overflow') or {}
        right = float(ov.get('right') or 0); bottom = float(ov.get('bottom') or 0)
        sx,sy,sw,shh = bbox(sh)
        if right > 0:
            sh.set('width', str(round(max(sw-right-2, 8),1)))
        if bottom > 0:
            sh.set('height', str(round(max(shh-bottom-2, 6),1)))
        return right>0 or bottom>0
    if code == 'bbox_overlap':
        a = by_id.get(els[0]) if els else None
        b = by_id.get(els[1]) if len(els)>1 else None
        t = a if (a and a.get('type')=='text') else (b if (b and b.get('type')=='text') else None)
        if t is None: return False
        return shrink_fs(t, 0.5)
    if code == 'image_covers_text':
        img = by_id.get(els[0]) if els else None
        txt = by_id.get(els[1]) if len(els)>1 else None
        if img is not None and txt is not None:
            _,ty,_,_ = bbox(txt)
            iy = float(img.get('topLeftY',0)); ih = float(img.get('height',0))
            if iy+ih > ty - 2:
                img.set('height', str(round(max(ty - iy - 4, 4),1))); return True
        return False
    if code == 'text_color_contrast':
        sh = by_id.get(els[0]) if els else None
        if sh is not None:
            for sp in sh.iter(f'{{{NS}}}span'):
                col = sp.get('color')
                if col in ('rgba(255, 255, 255, 1)','rgba(220, 241, 243, 1)','rgba(245, 248, 251, 1)'):
                    sp.set('color', 'rgba(15, 58, 87, 1)')
                elif col == 'rgba(47, 184, 198, 1)':
                    sp.set('color', 'rgba(21, 118, 133, 1)')
            return True
        return False
    return False

def main():
    srcs = sorted(glob.glob('pages4/page-*.xml'))
    os.makedirs('pages6', exist_ok=True)
    for f in srcs:
        tree = ET.parse(f); root = tree.getroot()
        slide = root if root.tag == f'{{{NS}}}slide' else root.find(f'{{{NS}}}slide')
        tmp = os.path.join(TMPD, os.path.basename(f))
        for it in range(3):
            with open(tmp,'w',encoding='utf-8') as fo:
                fo.write(ET.tostring(slide, encoding='unicode'))
            out = subprocess.run(['python3', SK, '--input', tmp], capture_output=True, text=True).stdout
            try: j = json.loads(out[out.index('{'):])
            except Exception: break
            errs=[]
            for s in j['slides']: errs.extend(s.get('errors', []))
            if not errs: break
            acted = False
            for e in errs:
                acted = fix_one(slide, e) or acted
            if not acted: break
        with open(f.replace('pages4/','pages6/'),'w',encoding='utf-8') as fo:
            fo.write(ET.tostring(slide, encoding='unicode'))
    print('done pages6')

if __name__ == '__main__':
    main()
