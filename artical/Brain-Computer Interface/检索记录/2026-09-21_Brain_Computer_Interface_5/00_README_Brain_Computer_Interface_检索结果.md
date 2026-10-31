# Brain-Computer Interface：检索结果

## 一、检索设定

- 检索词：`("cochlear implant"[Title/Abstract] OR "auditory brainstem implant"[Title/Abstract] OR "auditory prosthesis"[Title/Abstract]) AND ("machine learning"[Title/Abstract] OR "deep learning"[Title/Abstract] OR "neural decoding"[Title/Abstract] OR outcome[Title/Abstract]) AND (2024:2026[dp])`
- 数据源：PubMed、Europe PMC、OpenAlex、Crossref、arXiv
- 排序：cited
- 年份范围：不限 – 不限
- 执行时间：2026-09-21 19:10 CST
- 命中：2 篇（含 DOI 2 篇；有开放获取版本 0 篇）

## 二、结果清单

| # | 题目 | 作者 | 期刊 | 年份 | 被引 | DOI | 来源 |
|---|------|------|------|------|------|-----|------|
| 1 | A deep learning framework for understanding cochlear implants. | Annesya Banerjee, Mark R Saddler, Julie G Arenberg et al. | bioRxiv | 2025 | - | [10.1101/2025.07.16.665227](https://doi.org/10.1101/2025.07.16.665227) | pubmed |
| 2 | Cochlear Implant Artifacts Removal in EEG-Based Objective Auditory Rehabilitation Assessment. | Qi Zheng, Yubo Wu, Jianing Zhu et al. | IEEE Trans Neural Syst Rehabil Eng | 2024 | - | [10.1109/tnsre.2024.3438149](https://doi.org/10.1109/tnsre.2024.3438149) | pubmed |

## 三、下一步：取全文

1. 看 `manifest.json` 的 `oa` 字段：`true` 表示存在开放获取版本，可直接下载。
2. 中文文献、以及只有订阅才能获取的英文文献，改用 `nature-downloader` skill 走机构授权（会复用你已登录的浏览器）。
3. 下载好的 PDF 放进本目录的 `PDFs/`，并把文件名回填到 `manifest.json` 的 `file` 字段。

## 四、随附数据文件

| 文件 | 用途 |
|------|------|
| `results.csv` | Excel / Numbers 打开，人工筛选、标星 |
| `results.ris` | 导入 Zotero / EndNote / NoteExpress |
| `results.bib` | 供 LaTeX / Obsidian 引用 |
| `results.json` | 含摘要的结构化数据，供后续程序化处理 |
| `manifest.json` | 本批次台账（来源、OA 状态、下载状态） |
