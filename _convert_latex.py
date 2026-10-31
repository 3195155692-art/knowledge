#!/usr/bin/env python3
"""把 algorithm 和 实验技术 文件夹下所有 md 中的 LaTeX 公式分隔符
从 \[...\] / \(...\) 统一改成 $$...$$ / $...$，确保 Obsidian 兼容。
代码块中的内容不处理。
"""
import re
from pathlib import Path

DIRS = [
    Path("/Users/oldma/knowledge/algorithm"),
    Path("/Users/oldma/knowledge/实验技术"),
]

def convert_formulas(text):
    # 先用占位符保护代码块（```...``` 和 `...`）
    code_blocks = []
    
    def protect_code(m):
        code_blocks.append(m.group(0))
        return f'@@CODEBLOCK{len(code_blocks)-1}@@'
    
    # 保护围栏代码块
    text = re.sub(r'```[\s\S]*?```', protect_code, text)
    # 保护行内代码
    text = re.sub(r'`[^`\n]+`', protect_code, text)
    
    # 转换块级公式 \[...\] → $$...$$
    text = re.sub(r'\\\[([\s\S]*?)\\\]', r'$$\1$$', text)
    # 转换行内公式 \(...\) → $...$
    text = re.sub(r'\\\(([\s\S]*?)\\\)', r'$\1$', text)
    
    # 恢复代码块
    for i, code in enumerate(code_blocks):
        text = text.replace(f'@@CODEBLOCK{i}@@', code)
    
    return text

total = 0
for d in DIRS:
    for f in sorted(d.glob("*.md")):
        content = f.read_text(encoding="utf-8")
        new_content = convert_formulas(content)
        if new_content != content:
            f.write_text(new_content, encoding="utf-8")
            # 统计转换了多少处
            old_bracket = len(re.findall(r'\\\[', content))
            old_paren = len(re.findall(r'\\\(', content))
            print(f"  {f.name}: 转换了 {old_bracket} 处 \\[...\\], {old_paren} 处 \\(...\\)")
            total += 1

print(f"\n共转换 {total} 个文件")
print("公式分隔符已统一为 $$...$$（块级）和 $...$（行内），Obsidian 可直接渲染。")
