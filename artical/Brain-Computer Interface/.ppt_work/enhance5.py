#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""enhance5：从 pages/（健康放大版）出发，基于 lint 报告的精确数值做确定性修复。
原则：不移动元素 y（除非容器溢出需要）、不缩小字号（除非空间不足），只按 lint 数值回填尺寸。"""
import xml.etree.ElementTree as ET
import subprocess, json, glob, os, re

NS = 'https://www.larkoffice.com/sml/2.0'
ET.register_namespace('', NS)
CW = 959.0; CH = 540.0
SK = "/Users/oldma/Library/Application Support/Doubao/Default/.doubao/agent_mode/workspace/.skills/ppt/scripts/xml_lint.py"

def bbox(el):
    return (float(el.get('topLeftX',0)), float(el.get('topLeftY',0)),
            float(el.get('width',0)), float(el.get('height',0)))

def shapes_of(slide):
    data = slide.find(f'{{{NS}}}data')
    out = list(data) if data is not None else []
    return [c for c in out if c.tag.split('}')[1] in ('shape','img')]

def set_h(sh, h, limit=None):
    cur = float(sh.get('height',0))
    target = h if limit is None else min(h, limit)
    if target > cur: sh.set('height', str(round(target,1)))
    return target

def set_w(sh, w, limit=None):
    cur = float(sh.get('width',0))
    target = w if limit is None else min(w, limit)
    if target > cur: sh.set('width', str(round(target,1)))
    return target

def shrink_fs(sh, step=0.5, floor=10.0):
    changed=False
    for sp in sh.iter(f'{{{NS}}}span'):
        fs = sp.get('fontSize')
        if fs:
            v = max(floor, float(fs)-step)
            if v < float(fs): sp.set('fontSize', str(round(v,1))); changed=True
    return changed

def owner_limit(sh, shapes):
    """返回文本可用的最大宽/高（其 owner 卡内，若无则画布）"""
    sx,sy,sw,shh = bbox(sh)
    best=None; best_area=-1
    # 与 lint 相同：z-behind（顺序在前）+ 相交面积
    idx = next((i for i,c in enumerate(shapes) if c is sh), len(shapes))
    for c in shapes[:idx]:
        if c is sh or c.tag.split('}')[1] != 'shape': continue
        if c.get('type') in ('text',): continue
        if c.find(f'{{{NS}}}fill') is None: continue
        cx,cy,cw,chh = bbox(c)
        ix = max(0, min(sx+sw, cx+cw)-max(sx,cx))
        iy = max(0, min(sy+shh, cy+chh)-max(sy,cy))
        if iy<=0 or ix<=0: continue
        # 扩展 2px adjacency
        ix2 = max(0, min(sx+sw, cx+cw+2)-max(sx,cx-2))
        iy2 = max(0, min(sy+shh, cy+chh+2)-max(sy,cy-2))
        a = ix2*iy2
        if a > best_area:
            best_area=a; best=c
    if best is None:
        return CW-sx-3, CH-sy-3, None
    bx,by,bw,bh = bbox(best)
    return (bx+bw-sx-3, by+bh-sy-3, best)

def fix_one(slide, e):
    code = e['code']; els = e.get('elements') or []
    shapes = shapes_of(slide)
    by_id = {s.get('id'): s for s in shapes}
    msg = e.get('message') or ''
    if code == 'text_may_overflow_shape':
        sh = by_id.get(els[0]) if els else None
        if sh is None: return False
        m = re.search(r'estimated ([\d.]+)px, available ([\d.]+)px', msg)
        if m:
            est = float(m.group(1))
            lim_w, lim_h, owner = owner_limit(sh, shapes)
            # 高度类：h = est + 2
            if set_h(sh, est+2, lim_h) >= est+2-0.5:
                return True
            # 空间不足：缩字号
            shrink_fs(sh, 1.0)
            return True
        m2 = re.search(r'estimated line ([\d.]+)px, available ([\d.]+)px', msg)
        if m2:
            est_w = float(m2.group(1))
            lim_w, lim_h, owner = owner_limit(sh, shapes)
            # 宽度类：加宽
            cur_w = float(sh.get('width',0))
            if cur_w + 4 <= lim_w and est_w + 6 <= lim_w:
                sh.set('width', str(round(min(max(est_w+6, cur_w+12), lim_w),1)))
                return True
            # 无法加宽：wrap=true（默认）+ 扩高
            c = sh.find(f'{{{NS}}}content')
            if c is not None: c.set('wrap','true')
            # 估算多行高度：lint 未给，先扩高到 lim_h
            if set_h(sh, float(sh.get('height',0))+24, lim_h) > float(sh.get('height',0)):
                return True
            shrink_fs(sh, 1.0)
            return True
        # 其它：扩高 20
        lim_w, lim_h, owner = owner_limit(sh, shapes)
        return set_h(sh, float(sh.get('height',0))+20, lim_h) > float(sh.get('height',0))
    if code == 'text_overflows_container':
        sh = by_id.get(els[0]) if els else None
        owner = by_id.get(els[1]) if len(els)>1 else None
        if sh is None: return False
        ov = e.get('overflow') or {}
        right = float(ov.get('right') or 0); bottom = float(ov.get('bottom') or 0)
        left = float(ov.get('left') or 0); top = float(ov.get('top') or 0)
        if owner is not None:
            ox,oy,ow,oh = bbox(owner)
            sx,sy,sw,shh = bbox(sh)
            # 尝试扩 owner（不超画布、不压下方元素）
            grow = False
            if right > 0 and ox+ow+right+6 <= CW:
                # 检查扩后与其它元素重叠（下方 y 同带）
                owner.set('width', str(round(ow+right+6,1))); grow=True
            elif bottom > 0 and oy+oh+bottom+6 <= CH:
                owner.set('height', str(round(oh+bottom+6,1))); grow=True
            if grow: return True
            # 不能扩：把文本收缩进 owner
            if right > 0:
                sh.set('width', str(round(max(ow+ox - sx - 3, 8),1)))
            if bottom > 0:
                new_h = oy+oh - sy - 3
                if new_h >= 6: sh.set('height', str(round(new_h,1)))
                else: shrink_fs(sh, 1.5)
            return True
        # 无 owner（报告里没有）：收缩到画布
        lim_w, lim_h, _ = owner_limit(sh, shapes)
        if right > 0: sh.set('width', str(round(max(lim_w, 8),1)))
        if bottom > 0: sh.set('height', str(round(max(lim_h, 6),1)))
        return True
    if code == 'bbox_overlap':
        a = by_id.get(els[0]) if els else None
        b = by_id.get(els[1]) if len(els)>1 else None
        if a is None or b is None: return False
        ta, tb = a.get('type'), b.get('type')
        # 非文本 shape 覆盖文本（occlusion）：把文本移到 shape 上方/外
        t = a if ta=='text' else (b if tb=='text' else None)
        s = b if ta=='text' else (a if tb=='text' else None)
        if t is not None and s is not None and s.get('type') != 'text':
            tx,ty,tw,th = bbox(t); sx,sy,sw,shh = bbox(s)
            # 移到 shape 上方（若空间允许）
            if ty > sy + 1 and sy - 2 >= th + 4:
                # 上移（y 减小）：保持底不碰 shape 顶
                new_y = max(sy - th - 2, 0)
                t.set('topLeftY', str(round(new_y,1)))
                return True
            # 移到 shape 下方
            if ty + th <= sy + shh + 1 and sy + shh + th + 4 <= CH:
                t.set('topLeftY', str(round(sy + shh + 3,1)))
                return True
            # 两者都不可：缩字号
            return shrink_fs(t, 1.0)
        # 文本-文本重叠：上移或缩字号
        if ta=='text' and tb=='text':
            ax,ay,aw,ah = bbox(a); bx,by,bw,bh = bbox(b)
            if ay < by and by - ay > 4 and ah > 8:
                a.set('height', str(round(max(by - ay - 2, 6),1))); return True
            return shrink_fs(a, 1.0)
        return False
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
            # 报告消息里含文字颜色：改为可读的深色
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
    os.makedirs('pages5', exist_ok=True)
    for f in sorted(glob.glob('pages/page-*.xml')):
        tree = ET.parse(f); root = tree.getroot()
        slide = root if root.tag == f'{{{NS}}}slide' else root.find(f'{{{NS}}}slide')
        tmp = f + '.t5.xml'
        for it in range(5):
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
                r = fix_one(slide, e)
                acted = acted or r
            if not acted: break
        out_path = f.replace('pages/','pages5/')
        with open(out_path,'w',encoding='utf-8') as fo:
            fo.write(ET.tostring(slide, encoding='unicode'))
    if os.path.exists(tmp): os.remove(tmp)
    print('done pages5')

if __name__ == '__main__':
    main()
