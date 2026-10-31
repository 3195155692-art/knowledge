#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""enhance4：从 pages/（健康放大版）出发的精确修复
1) text_may_overflow_shape → 按 lint estimated 扩高 / 加宽 / wrap=true；背景放不下先扩背景，最后才缩字号（不低于原始）
2) text_overflows_container → 扩大背景卡以包含全部内部文本
3) bbox_overlap → 特例规则（数字大字卡缩高、宽度收进背景）
4) image_covers_text → 裁剪图片高度
5) text_color_contrast → 青色箭头加深"""
import xml.etree.ElementTree as ET
import subprocess, json, glob, os, re, copy

NS = 'https://www.larkoffice.com/sml/2.0'
ET.register_namespace('', NS)
CW = 959.0; CH = 540.0
SK = "/Users/oldma/Library/Application Support/Doubao/Default/.doubao/agent_mode/workspace/.skills/ppt/scripts/xml_lint.py"

# 反查表：放大后 → 原始
FONT_BACK = {10.5:9.5, 11.0:10.0, 12.0:10.5, 13.0:11.0, 13.5:11.5, 14.0:12.0,
             14.5:12.5, 15.0:13.0, 15.5:13.5, 16.0:14.0, 16.5:14.5, 18.0:15.5,
             20.0:16.5, 21.5:17.5, 23.0:18.5, 25.0:20.5, 27.0:22.0, 28.0:23.0,
             32.0:24.0, 33.0:28.5, 48.5:43.5, 53.0:48.0, 55.0:50.0, 84.5:76.5}

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

def shapes_of(slide):
    data = slide.find(f'{{{NS}}}data')
    return list(data.findall(f'{{{NS}}}shape')) if data is not None else []

def bbox_of_el(el):
    return (float(el.get('topLeftX',0)), float(el.get('topLeftY',0)),
            float(el.get('width',0)), float(el.get('height',0)))

def overlaps(a, b, pad=0.0):
    ax,ay,aw,ah = bbox_of_el(a); bx,by,bw,bh = bbox_of_el(b)
    return not (ax+aw <= bx+pad or bx+bw <= ax+pad or ay+ah <= by+pad or by+bh <= ay+pad)

def shrink_to_floor(sh, floor):
    """所有 span 字号降到 floor（不更低）；返回是否降了"""
    changed=False
    for sp in sh.iter(f'{{{NS}}}span'):
        fs = sp.get('fontSize')
        if fs and float(fs) > floor:
            sp.set('fontSize', str(round(max(float(fs)-1.0, floor),1))); changed=True
    return changed

def set_wrap(sh):
    c = sh.find(f'{{{NS}}}content')
    if c is not None and c.get('wrap') != 'true':
        c.set('wrap','true')

def grow_bg_to_fit(bg, texts, shapes, pad=4.0):
    """扩大背景卡，使其包含 texts 内全部文本 shape；避免与其它非内部元素重叠"""
    if bg is None: return
    bx,by,bw,bh = bbox(bg)
    max_r = bx+bw; max_b = by+bh
    for t in texts:
        tx,ty,tw,th = bbox(t)
        if tx+tw > max_r: max_r = tx+tw
        if ty+th > max_b: max_b = ty+th
    if max_r <= bx+bw+0.5 and max_b <= by+bh+0.5: return
    # 检查扩后与其它元素的重叠
    others = [s for s in shapes if s is not bg and s not in texts]
    new_w = max_r - bx + pad; new_h = max_b - by + pad
    safe = True
    for o in others:
        if o.get('type') in ('line','polyline'): continue
        ox,oy,ow,oh = bbox(o)
        if overlaps_rect((bx,by,new_w,new_h), (ox,oy,ow,oh), pad=2.0):
            safe = False; break
    if safe:
        bg.set('width', str(round(new_w,1)))
        bg.set('height', str(round(new_h,1)))
    return

def overlaps_rect(a, b, pad=0.0):
    ax,ay,aw,ah = a; bx,by,bw,bh = b
    return not (ax+aw <= bx+pad or bx+bw <= ax+pad or ay+ah <= by+pad or by+bh <= ay+pad)

def fix_overflow_shape(sh, msg, shapes):
    """text_may_overflow_shape 修复"""
    bg = best_bg(sh, shapes)
    sx,sy,sw,shh = bbox(sh)
    if bg is not None:
        bx,by,bw,bh = bbox(bg); limit_w = bx+bw - sx - 3; limit_h = by+bh - sy - 3
    else:
        limit_w = CW - sx - 3; limit_h = CH - sy - 3
    m = re.search(r'estimated ([\d.]+)px, available ([\d.]+)px', msg)
    if 'single line is too wide' in msg or 'may wrap inside' in msg or 'widen the shape' in msg:
        # 优先加宽（背景允许）
        if limit_w > sw + 3:
            sh.set('width', str(round(min(limit_w, sw + 24), 1)))
            return True
        # 允许换行 + 扩高到两行
        set_wrap(sh)
        need_h = float(m.group(1)) if m else shh
        new_h = need_h + 2
        if new_h <= limit_h:
            sh.set('height', str(round(new_h,1))); return True
        if bg is not None:
            grow_bg_to_fit(bg, [sh], shapes)
            return True
        shrink_to_floor(sh, 11.0)
        return True
    if m:
        est = float(m.group(1)); new_h = est + 2
        if new_h <= limit_h:
            sh.set('height', str(round(new_h,1))); return True
        if bg is not None:
            grow_bg_to_fit(bg, [sh], shapes); return True
        shrink_to_floor(sh, 11.0)
        return True
    # 无数字：扩高
    if limit_h > shh + 2:
        sh.set('height', str(round(min(limit_h, shh+12),1))); return True
    if bg is not None:
        grow_bg_to_fit(bg, [sh], shapes); return True
    shrink_to_floor(sh, 11.0)
    return True

def fix_overflows_container(sh, bg, shapes):
    """text_overflows_container：扩背景或收缩文本"""
    sx,sy,sw,shh = bbox(sh)
    if bg is None: return False
    grow_bg_to_fit(bg, [sh], shapes)
    # 再检查文本是否还在背景外（背景无法扩的情况）
    bx,by,bw,bh = bbox(bg)
    if sx+sw > bx+bw - 1:
        sh.set('width', str(round(max(bx+bw - sx - 3, 8),1)))
    if sy+shh > by+bh - 1:
        new_h = by+bh - sy - 3
        if new_h >= 8:
            sh.set('height', str(round(new_h,1)))
        else:
            shrink_to_floor(sh, 11.0)
    return True

def main():
    os.makedirs('pages4', exist_ok=True)
    for f in sorted(glob.glob('pages/page-*.xml')):
        tree = ET.parse(f); root = tree.getroot()
        slide = root if root.tag == f'{{{NS}}}slide' else root.find(f'{{{NS}}}slide')
        tmp = f + '.t4.xml'
        for it in range(6):
            with open(tmp,'w',encoding='utf-8') as fo:
                fo.write(ET.tostring(slide, encoding='unicode'))
            out = subprocess.run(['python3', SK, '--input', tmp], capture_output=True, text=True).stdout
            try: j = json.loads(out[out.index('{'):])
            except Exception: break
            errs=[]
            for s in j['slides']: errs.extend(s.get('errors', []))
            if not errs: break
            shapes = shapes_of(slide)
            by_id = {s.get('id'): s for s in shapes}
            acted = False
            for e in errs:
                code = e['code']; els = e.get('elements') or []
                msg = e.get('message') or ''
                if code == 'text_may_overflow_shape' and els:
                    sh = by_id.get(els[0])
                    if sh is not None:
                        acted = fix_overflow_shape(sh, msg, shapes) or acted
                elif code == 'text_overflows_container' and len(els) >= 2:
                    sh = by_id.get(els[0]); bg = by_id.get(els[1])
                    if sh is not None:
                        acted = fix_overflows_container(sh, bg, shapes) or acted
                elif code == 'bbox_overlap' and len(els) >= 2:
                    a = by_id.get(els[0]); b = by_id.get(els[1])
                    if a is not None and b is not None:
                        ta, tb = a.get('type'), b.get('type')
                        if ta=='text' and tb=='text':
                            ax,ay,aw,ah = bbox(a); bx,by,bw,bh = bbox(b)
                            if ay+ah > by + 1 and by - ay > 4:
                                a.set('height', str(round(max(by - ay - 2, 6),1))); acted = True
                            else:
                                acted = shrink_to_floor(a, 11.0) or acted
                        else:
                            # shape covers text：文本移入 shape
                            t = a if ta=='text' else b; bg2 = b if ta=='text' else a
                            tx,ty,tw,th = bbox(t); gx,gy,gw,gh = bbox(bg2)
                            if ty < gy - 1:
                                t.set('topLeftY', str(round(gy + 3,1))); acted = True
                            else:
                                acted = shrink_to_floor(t, 11.0) or acted
                elif code == 'image_covers_text' and len(els) >= 2:
                    img = by_id.get(els[0]); txt = by_id.get(els[1])
                    if img is not None and txt is not None:
                        _,ty,_,_ = bbox(txt)
                        iy = float(img.get('topLeftY',0)); ih = float(img.get('height',0))
                        if iy+ih > ty - 2:
                            img.set('height', str(round(max(ty - iy - 4, 4),1))); acted = True
                elif code == 'text_color_contrast' and els:
                    sh = by_id.get(els[0])
                    if sh is not None:
                        for sp in sh.iter(f'{{{NS}}}span'):
                            if sp.get('color') == 'rgba(47, 184, 198, 1)':
                                sp.set('color', 'rgba(21, 118, 133, 1)')
                        acted = True
            if not acted:
                break
        out_path = f.replace('pages/','pages4/')
        with open(out_path,'w',encoding='utf-8') as fo:
            fo.write(ET.tostring(slide, encoding='unicode'))
    if os.path.exists(tmp): os.remove(tmp)
    print('done pages4')

if __name__ == '__main__':
    main()
