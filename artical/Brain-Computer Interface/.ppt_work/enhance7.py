#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""enhance7：最终定点修复。输入 pages4（基线），输出 pages7。全部动作人工设计。"""
import xml.etree.ElementTree as ET
import glob, os, re, shutil

NS = 'https://www.larkoffice.com/sml/2.0'
ET.register_namespace('', NS)

def load(fname):
    tree = ET.parse(fname)
    root = tree.getroot()
    slide = root if root.tag == f'{{{NS}}}slide' else root.find(f'{{{NS}}}slide')
    return slide

def save(slide, fname):
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(ET.tostring(slide, encoding='unicode'))

def by_id(slide, i):
    data = slide.find(f'{{{NS}}}data')
    for c in data:
        if c.get('id') == i:
            return c
    return None

def set_attr(slide, i, **kw):
    el = by_id(slide, i)
    if el is None:
        print('  !! missing', i); return
    for k, v in kw.items():
        el.set(k, str(round(v, 1) if isinstance(v, float) else v))

def split_text(slide, i, part1, part2):
    """把 shape 的第一个 p 拆成两个 p（保留 span 样式）。"""
    el = by_id(slide, i)
    if el is None:
        print('  !! missing', i); return
    content = el.find(f'{{{NS}}}content')
    if content is None:
        print('  !! no content', i); return
    first_p = content.find(f'{{{NS}}}p')
    if first_p is None:
        print('  !! no p', i); return
    spans = list(first_p.findall(f'{{{NS}}}span'))
    if not spans:
        print('  !! no span', i); return
    # 重组文本
    full = ''.join(s.text or '' for s in spans)
    if part1 + part2 != full:
        # 允许部分匹配：按位置分割
        if part1 not in full:
            print(f'  !! split text not found in {i}: "{part1}" in "{full[:40]}"'); return
        idx = full.index(part1) + len(part1)
        p1t, p2t = full[:idx], full[idx:]
        # 若 p2t 与 part2 不完全一致也接受（截断于 part2 长度处可能）
    else:
        p1t, p2t = part1, part2
    # 构建两个新 p
    def make_p(text):
        p = ET.Element(f'{{{NS}}}p')
        for s in spans:
            ns = ET.SubElement(p, f'{{{NS}}}span')
            for k, v in s.items():
                ns.set(k, v)
            ns.text = text
            break  # 只保留第一个 span 的样式；多 span 拆分太复杂，多数单 span
        return p
    p1, p2 = make_p(p1t), make_p(p2t)
    # 替换第一个 p 为 p1，在 p1 后插入 p2
    parent = content
    pos = list(parent).index(first_p)
    parent.remove(first_p)
    parent.insert(pos, p1)
    parent.insert(pos + 1, p2)

def main():
    os.makedirs('pages7', exist_ok=True)
    def S(f, fn):
        src = f'pages4/{f}'
        if not os.path.exists(src):
            print('  !! no file', src); return
        slide = load(src)
        fn(slide)
        save(slide, f'pages7/{f}')

    # p1: 波形图裁高，露出页脚
    S('page-01-pzX.xml', lambda s: set_attr(s, 'bAa', height=166))

    # p2: 页脚 06/04 说明行
    S('page-02-pzj.xml', lambda s: set_attr(s, 'bAI', height=46))

    # p4: 表格页脚行 + 第 8 行角色列缩字号
    S('page-04-pzw.xml', lambda s: (set_attr(s, 'baJ', height=37), set_attr(s, 'bHr', height=32)))
    # bHr 缩字号：13（含拉丁 est 172.32/0.85=202.7 需 w≥227 超限）
    def p4(s):
        set_attr(s, 'baJ', height=37)
        for sp in by_id(s, 'bHr').iter(f'{{{NS}}}span'):
            sp.set('fontSize', '13.0')
    S('page-04-pzw.xml', p4)

    # p7: CMD 检出率说明行 + 研究设计正文
    def p7(s):
        set_attr(s, 'bah', height=51)
        set_attr(s, 'baG', width=499, height=92)
    S('page-07-pzB.xml', p7)

    # p9: Level 4 证据要求 + 卡加高 + 3 个标签拆行
    def p9(s):
        set_attr(s, 'brN', height=33)
        set_attr(s, 'bxC', height=214)
        split_text(s, 'bxB', 'UWS / MCS /', 'CMD / LIS')
        split_text(s, 'bxM', '左 / 右、是 / 否、', '运动想象')
        split_text(s, 'brm', '语言、物体、人物、', '自传体信息')
    S('page-09-pzi.xml', p9)

    # p10: 章节卡 4 组压缩（01-04），04 组入卡
    def p10(s):
        set_attr(s, 'brl', topLeftY=181, height=49)
        set_attr(s, 'brX', topLeftY=181, height=49)
        set_attr(s, 'brI', topLeftY=238, height=49)
        set_attr(s, 'brC', topLeftY=238, height=49)
        set_attr(s, 'brB', topLeftY=295, height=49)
        set_attr(s, 'brj', topLeftY=295, height=49)
        split_text(s, 'brj', '意识必须拆成', '三个层次来看')
        set_attr(s, 'brc', topLeftY=352, height=40)
        set_attr(s, 'brG', topLeftY=352, height=40)
        split_text(s, 'brG', '为什么「让患者报告」', '会污染我们要测的东西')
    S('page-10-pzO.xml', p10)

    # p11: 两张卡正文拆行
    def p11(s):
        split_text(s, 'bJb', '而不是患者正在经历的', '主观内容。')
        split_text(s, 'bJr', '忽略了意识体验本身的', '连续谱性质。')
    S('page-11-pzW.xml', p11)

    # p14: 主观体验行 + 卡高、结论行、右卡加高
    def p14(s):
        set_attr(s, 'bbn', height=36)
        set_attr(s, 'bbq', height=36)
        set_attr(s, 'bbG', height=36)
        set_attr(s, 'bbS', height=297)
    S('page-14-pzn.xml', p14)

    # p15: 左卡加高 + 底部说明行
    def p15(s):
        set_attr(s, 'bej', height=331)
        set_attr(s, 'beM', height=36)
    S('page-15-pzu.xml', p15)

    # p17: 两张卡正文
    S('page-17-pzS.xml', lambda s: (set_attr(s, 'bRW', height=50), set_attr(s, 'bRc', height=50)))

    # p19: 章节卡组压缩（通用：owner=bDN 的文本按 y 分组重排）
    def p19(s):
        bDN = by_id(s, 'bDN')
        if bDN is None:
            print('  !! no bDN'); return
        data = s.find(f'{{{NS}}}data')
        texts = []
        for c in data:
            if c.tag.split('}')[1] != 'shape' or c.get('type') != 'text':
                continue
            x, y = float(c.get('topLeftX', 0)), float(c.get('topLeftY', 0))
            w, h = float(c.get('width', 0)), float(c.get('height', 0))
            dx, dy, dw, dh = float(bDN.get('topLeftX')), float(bDN.get('topLeftY')), float(bDN.get('width')), float(bDN.get('height'))
            if x >= dx and x + w <= dx + dw and y >= dy and y + h <= dh + 4:
                texts.append((y, c))
        texts.sort()
        # 组：相邻 y 差 < 30 归一组
        groups = []
        for y, c in texts:
            if groups and y - groups[-1][-1][0] < 30:
                groups[-1].append((y, c))
            else:
                groups.append([(y, c)])
        # 组目标 y：第一组保持原首元素 y，其余按间距 57
        if len(groups) >= 2:
            ys = [g[0][0] for g in groups]
            base = ys[0]
            new_ys = [base, base + 57, base + 114, base + 171][:len(groups)]
            for g, ny in zip(groups, new_ys):
                for y, c in g:
                    c.set('topLeftY', str(round(ny, 1)))
                    # 组高统一 49（最后组 40）
                    h = 49 if g is not groups[-1] else 40
                    c.set('height', str(h))
        # 最后一组文本拆行（owner 内 04 组）
        last = groups[-1]
        last.sort()
        # 找出文本最长的元素拆行
        for y, c in last:
            content = c.find(f'{{{NS}}}content')
            if content is None: continue
            txt = ''.join(sp.text or '' for sp in content.iter(f'{{{NS}}}span'))
            if len(txt) > 14:
                half = len(txt) // 2
                # 尽量在中文字符边界拆
                cut = half
                while cut < len(txt) and not (txt[cut-1] in '、，。「」：' or txt[cut] in '、，。「」：'):
                    cut += 1
                if cut >= len(txt): cut = half
                split_text(s, c.get('id'), txt[:cut], txt[cut:])
    S('page-19-pze.xml', p19)

    # p20: 测到了什么 正文 + 卡加高
    def p20(s):
        set_attr(s, 'bRS', height=162)
        set_attr(s, 'bMw', height=122)
    S('page-20-pzF.xml', p20)

    # p21: 指标卡加高 + 正文
    def p21(s):
        set_attr(s, 'bMc', height=171)
        set_attr(s, 'bMh', height=99)
    S('page-21-pzt.xml', p21)

    # p23: 复杂页——两条说明行拉长入卡、关键数字卡加高、结论条内重排
    def p23(s):
        set_attr(s, 'bCU', height=80)
        set_attr(s, 'bCA', topLeftY=198.4, height=18.2, width=390)
        set_attr(s, 'bCe', height=81)
        set_attr(s, 'bCX', topLeftY=281, height=18.2, width=400)
        set_attr(s, 'bCh', height=115)
        set_attr(s, 'bVE', height=66)
        set_attr(s, 'bCV', height=78)
        set_attr(s, 'bCu', height=36)
        set_attr(s, 'bCG', height=36)
        set_attr(s, 'bCr', topLeftY=482, height=37)
        for sp in by_id(s, 'bCr').iter(f'{{{NS}}}span'):
            sp.set('color', 'rgba(217, 138, 33, 1)')
    S('page-23-pzC.xml', p23)

    # p25: 层级说明回顶部、右卡加高、卡下移
    def p25(s):
        set_attr(s, 'bZh', topLeftY=152.6)
        set_attr(s, 'bZX', height=82)
        set_attr(s, 'bZi', height=49)
        set_attr(s, 'bZp', topLeftY=372)
        set_attr(s, 'bZk', topLeftY=378)
        set_attr(s, 'bZm', topLeftY=401)
    S('page-25-pzQ.xml', p25)

    # p26: 97.5% 数字缩字号入卡
    def p26(s):
        set_attr(s, 'bZe', height=104)
        for sp in by_id(s, 'bZe').iter(f'{{{NS}}}span'):
            sp.set('fontSize', '46.0')
    S('page-26-pzL.xml', p26)

    # p28: 右卡正文加高
    S('page-28-pza.xml', lambda s: set_attr(s, 'biN', height=122))

    # p29: 解释 A 正文加宽减行
    S('page-29-pzc.xml', lambda s: set_attr(s, 'bfl', width=400, height=90))

    # p30: 底部卡加高
    S('page-30-pzJ.xml', lambda s: (set_attr(s, 'bfo', height=90), set_attr(s, 'bfk', height=80)))

    # p31: AI 角色卡加高 + 两行拆行
    def p31(s):
        set_attr(s, 'bBS', height=224)
        set_attr(s, 'bBJ', height=48)
        set_attr(s, 'bBj', height=48)
        split_text(s, 'bBi', '频谱、连接性、', '时间动态、网络表征')
        split_text(s, 'bBP', '寻找可迁移的', '神经状态表征')
    S('page-31-pzY.xml', p31)

    # p32: 页脚条内两行重排 + 闭环卡加高
    def p32(s):
        set_attr(s, 'bla', height=175)
        set_attr(s, 'bll', height=137)
        set_attr(s, 'blu', height=36)
        set_attr(s, 'blL', height=36)
        set_attr(s, 'blF', topLeftY=482)
    S('page-32-pzR.xml', p32)

    # p33: 两个 Gap 标题拆行
    def p33(s):
        split_text(s, 'blg', '状态与内容', '没有打通')
        split_text(s, 'bFR', 'ground truth', '缺失')
    S('page-33-pzK.xml', p33)

    # p35: 第 4 卡加高 + 正文 + 标题拆行
    def p35(s):
        set_attr(s, 'buZ', height=254)
        set_attr(s, 'bui', height=116)
        split_text(s, 'bua', '瓶颈不是精度，', '是对照条件')
    S('page-35-pzb.xml', p35)

    # p36: 4 行卡加高覆盖两行、bum 归位 06 行、04 行结论加高
    def p36(s):
        for i, h in (('bjM', 78), ('buP', 78), ('bjJ', 78), ('bug', 78)):
            set_attr(s, i, height=h)
        set_attr(s, 'bum', topLeftY=282, height=37)
        set_attr(s, 'buU', height=36)
    S('page-36-pzz.xml', p36)

    # p38: 参考文献行距拉开 + 08 归位右列第 4 行 + 页脚下移
    def p38(s):
        rows = [('bjd', 143), ('bjq', 226), ('bjh', 309), ('bjt', 392),
                ('bjL', 143), ('bjY', 226), ('bjQ', 309), ('bjj', 392)]
        for i, y in rows:
            set_attr(s, i, topLeftY=y, height=82)
        set_attr(s, 'bjG', topLeftY=505, height=30)
    S('page-38-pzU.xml', p38)

    print('done pages7')

if __name__ == '__main__':
    main()
