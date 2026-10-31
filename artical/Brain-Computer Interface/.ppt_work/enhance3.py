#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第三轮：lint 驱动迭代修复——按 lint 报告的 estimated/available 精确调整容器与字号
对每页循环：lint → 逐条 error 修复 → 重 lint，直到 0 error 或 5 轮未收敛"""
import xml.etree.ElementTree as ET
import subprocess, json, glob, os, re

NS = 'https://www.larkoffice.com/sml/2.0'
ET.register_namespace('', NS)
CW = 959.0; CH = 540.0
SK = "/Users/oldma/Library/Application Support/Doubao/Default/.doubao/agent_mode/workspace/.skills/ppt/scripts/xml_lint.py"

def bbox(el):
    x = float(el.get('topLeftX',0)); y = float(el.get('topLeftY',0))
    return (x, y, float(el.get('width',0)), float(el.get('height',0)))

def best_bg(sh, shapes):
    x,y,w,h = bbox(sh); x2,y2 = x+w, y+h
    best=None; best_area=0.0
    for s in shapes:
        if s is sh or s.get('type') in ('text',): continue
        sx,sy,sw,shh = bbox(s); sx2,sy2 = sx+sw, sy+shh
        ix = max(0, min(x2,sx2)-max(x,sx)); iy = max(0, min(y2,sy2)-max(y,sy))
        a = ix*iy
        if a > best_area and a >= 0.25*w*h:
            best=s; best_area=a
    return best

def all_shapes(slide):
    data = slide.find(f'{{{NS}}}data')
    return list(data.findall(f'{{{NS}}}shape')) if data is not None else []

def shrink_fs(sh, step=0.5):
    for sp in sh.iter(f'{{{NS}}}span'):
        fs = sp.get('fontSize')
        if fs:
            v = max(6.0, float(fs)-step)
            sp.set('fontSize', str(round(v,1)))
    # 同步收窄高度（容错）
    return

def wrap_on(sh):
    c = sh.find(f'{{{NS}}}content')
    if c is not None:
        c.set('wrap','true')

def set_h(sh, h):
    cur = float(sh.get('height',0))
    if h > cur:
        sh.set('height', str(round(h,1)))

def fix_one(slide, code, els, msg):
    shapes = all_shapes(slide)
    by_id = {s.get('id'): s for s in shapes}
    if code == 'text_may_overflow_shape':
        sh = by_id.get(els[0]) if els else None
        if sh is None: return False
        bg = best_bg(sh, shapes)
        if bg is not None:
            _,by,_,bgh = bbox(bg); _,sy,_,_ = bbox(sh)
            limit_h = by+bgh - sy - 3
        else:
            _,sy,_,_ = bbox(sh); limit_h = CH - sy - 3
        m = re.search(r'estimated ([\d.]+)px, available ([\d.]+)px', msg)
        if 'single line is too wide' in msg or 'may wrap inside' in msg or 'widen the shape' in msg:
            wrap_on(sh)
            # 优先扩宽（背景允许）
            if bg is not None:
                bx,_,bw,_ = bbox(bg); sx,_,_,_ = bbox(sh)
                avail_w = bx+bw - sx - 6
                cur_w = float(sh.get('width',0))
                if avail_w > cur_w + 4:
                    sh.set('width', str(round(avail_w,1)))
                    return True
            shrink_fs(sh, 1.0); set_h(sh, max(float(sh.get('height',0)), limit_h*0.5))
            return True
        if m:
            est = float(m.group(1))
            if est + 2 <= limit_h:
                set_h(sh, est + 2)
                return True
            shrink_fs(sh, 1.0)
            return True
        # 无数字信息：扩高到背景上限或缩字号
        if limit_h > float(sh.get('height',0)) + 3:
            set_h(sh, min(limit_h, float(sh.get('height',0)) + 8))
            return True
        shrink_fs(sh, 1.0)
        return True
    if code == 'text_overflows_container':
        sh = by_id.get(els[0]) if els else None
        if sh is None: return False
        bg = best_bg(sh, shapes)
        if bg is None: return False
        bx,by,bw,bh = bbox(bg); sx,sy,sw,shh = bbox(sh)
        # 收缩进背景
        changed = False
        if sx+sw > bx+bw - 2:
            sh.set('width', str(round(max(bx+bw - sx - 4, 8),1))); changed=True
        if sy+shh > by+bh - 2:
            # 背景内可用高度
            avail = by+bh - sy - 4
            if avail < 8:
                shrink_fs(sh, 1.5)
            else:
                sh.set('height', str(round(avail,1)))
            changed=True
        return changed
    if code == 'bbox_overlap':
        a = by_id.get(els[0]) if els else None
        b = by_id.get(els[1]) if len(els)>1 else None
        if a is None or b is None: return False
        ta, tb = a.get('type'), b.get('type')
        # 文本-文本：缩高或缩字号
        if ta=='text' and tb=='text':
            # 缩小上方元素的 height（若高度明显超需求）
            ax,ay,aw,ah = bbox(a); bx2,by2,bw2,bh2 = bbox(b)
            if ay+ah > by2+2:
                new_h = max(by2 - ay - 2, 6)
                if new_h < ah - 1:
                    a.set('height', str(round(new_h,1))); return True
                shrink_fs(a, 1.0); return True
        if ta=='text' and tb is not None and tb != 'text':
            # 文本被背景盖（文本顶部在背景外）→ 移进背景
            _,sy,_,_ = bbox(a); bx3,by3,_,_ = bbox(b)
            if sy < by3 - 1:
                a.set('topLeftY', str(round(by3 + 2,1))); return True
        if tb=='text' and ta is not None and ta != 'text':
            _,sy,_,_ = bbox(b); bx4,by4,_,_ = bbox(a)
            if sy < by4 - 1:
                b.set('topLeftY', str(round(by4 + 2,1))); return True
        # 默认：缩小先列出的元素高度
        shrink_fs(a, 1.0)
        return True
    if code == 'image_covers_text':
        # 缩小图片高度，让文字露出
        img = by_id.get(els[0]) if els else None
        txt = by_id.get(els[1]) if len(els)>1 else None
        if img is not None and img.tag.split('}')[1]=='img' and txt is not None:
            _,ty,_,_ = bbox(txt)
            iy = float(img.get('topLeftY',0))
            ih = float(img.get('height',0))
            if iy+ih > ty - 2:
                img.set('height', str(round(max(ty - iy - 4, 4),1)))
                return True
        if img is not None:
            ih = float(img.get('height',0))
            img.set('height', str(round(ih*0.88,1)))
            return True
        return False
    if code == 'text_color_contrast':
        sh = by_id.get(els[0]) if els else None
        if sh is not None:
            for sp in sh.iter(f'{{{NS}}}span'):
                if sp.get('color') == 'rgba(47, 184, 198, 1)':
                    sp.set('color', 'rgba(21, 118, 133, 1)')
            return True
        return False
    return False

def lint_page(path):
    out = subprocess.run(['python3', SK, '--input', path], capture_output=True, text=True).stdout
    try:
        j = json.loads(out[out.index('{'):])
    except Exception:
        return None
    return j

def main():
    os.makedirs('pages3', exist_ok=True)
    for f in sorted(glob.glob('pages2/page-*.xml')):
        tree = ET.parse(f); root = tree.getroot()
        slide = root if root.tag == f'{{{NS}}}slide' else root.find(f'{{{NS}}}slide')
        tmp = f + '.tmp.xml'
        for it in range(6):
            with open(tmp,'w',encoding='utf-8') as fo:
                fo.write(ET.tostring(slide, encoding='unicode'))
            j = lint_page(tmp)
            if j is None: break
            errs = []
            for s in j['slides']:
                errs.extend(s.get('errors', []))
            if not errs:
                break
            acted = False
            for e in errs:
                r = fix_one(slide, e['code'], e.get('elements') or [], e.get('message') or '')
                acted = acted or r
            if not acted:
                break
        out = f.replace('pages2/','pages3/')
        with open(out,'w',encoding='utf-8') as fo:
            fo.write(ET.tostring(slide, encoding='unicode'))
    os.path.exists(tmp) and os.remove(tmp)
    print('done pages3')

if __name__ == '__main__':
    main()
