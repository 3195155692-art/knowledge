# Brain-Computer Interface：检索结果

## 一、检索设定

- 检索词：`("speech neuroprosthesis"[Title/Abstract] OR "speech decoding"[Title/Abstract] OR "brain-to-voice"[Title/Abstract] OR "brain-to-text"[Title/Abstract] OR "inner speech"[Title/Abstract]) AND (2024:2026[dp])`
- 数据源：PubMed、Europe PMC、OpenAlex、Crossref、arXiv
- 排序：cited
- 年份范围：不限 – 不限
- 执行时间：2026-09-21 19:09 CST
- 命中：12 篇（含 DOI 12 篇；有开放获取版本 0 篇）

## 二、结果清单

| # | 题目 | 作者 | 期刊 | 年份 | 被引 | DOI | 来源 |
|---|------|------|------|------|------|-----|------|
| 1 | A generalizable speech neuroprosthesis. | Zachery M Fogg, Nicholas S Card, Maitreyee Wairagkar et al. | bioRxiv | 2026 | - | [10.64898/2026.07.23.739430](https://doi.org/10.64898/2026.07.23.739430) | pubmed |
| 2 | Decoding inner speech with functional connectivity. | Eduardo Abreu, Pedro Felipe Vazquez, Gabriela Castellano | Biomed Phys Eng Express | 2026 | - | [10.1088/2057-1976/ae451b](https://doi.org/10.1088/2057-1976/ae451b) | pubmed |
| 3 | Long-term independent use of an intracortical brain-computer interface for speech and cursor control. | Nicholas S Card, Tyler Singer-Clark, Hamza Peracha et al. | Nat Med | 2026 | - | [10.1038/s41591-026-04414-6](https://doi.org/10.1038/s41591-026-04414-6) | pubmed |
| 4 | An instantaneous voice-synthesis neuroprosthesis. | Maitreyee Wairagkar, Nicholas S Card, Tyler Singer-Clark et… | Nature | 2025 | - | [10.1038/s41586-025-09127-3](https://doi.org/10.1038/s41586-025-09127-3) | pubmed |
| 5 | Inner speech in motor cortex and implications for speech neuroprostheses. | Erin M Kunz, Benyamin Abramovich Krasa, Foram Kamdar et al. | Cell | 2025 | - | [10.1016/j.cell.2025.06.015](https://doi.org/10.1016/j.cell.2025.06.015) | pubmed |
| 6 | A streaming brain-to-voice neuroprosthesis to restore naturalistic communication. | Kaylo T Littlejohn, Cheol Jun Cho, Jessie R Liu et al. | Nat Neurosci | 2025 | - | [10.1038/s41593-025-01905-6](https://doi.org/10.1038/s41593-025-01905-6) | pubmed |
| 7 | Brain-to-text decoding with context-aware neural representations and large language models. | Jingyuan Li, Trung Le, Chaofei Fan et al. | J Neural Eng | 2025 | - | [10.1088/1741-2552/adfab1](https://doi.org/10.1088/1741-2552/adfab1) | pubmed |
| 8 | A brain-to-text framework for decoding natural tonal sentences. | Daohan Zhang, Zhenjie Wang, Youkun Qian et al. | Cell Rep | 2024 | - | [10.1016/j.celrep.2024.114924](https://doi.org/10.1016/j.celrep.2024.114924) | pubmed |
| 9 | An Accurate and Rapidly Calibrating Speech Neuroprosthesis. | Nicholas S Card, Maitreyee Wairagkar, Carrina Iacobacci et… | N Engl J Med | 2024 | - | [10.1056/nejmoa2314132](https://doi.org/10.1056/nejmoa2314132) | pubmed |
| 10 | The speech neuroprosthesis. | Alexander B Silva, Kaylo T Littlejohn, Jessie R Liu et al. | Nat Rev Neurosci | 2024 | - | [10.1038/s41583-024-00819-9](https://doi.org/10.1038/s41583-024-00819-9) | pubmed |
| 11 | Improving inner speech decoding by hybridisation of bimodal EEG and fMRI data. | Scott Wellington, Holly Wilson, Foteini Simistira Liwicki e… | Annu Int Conf IEEE Eng Med Biol Soc | 2024 | - | [10.1109/embc53108.2024.10781692](https://doi.org/10.1109/embc53108.2024.10781692) | pubmed |
| 12 | Exploring inter-trial coherence for inner speech classification in EEG-based brain-computer interface. | Diego Lopez-Bernal, David Balderas, Pedro Ponce et al. | J Neural Eng | 2024 | - | [10.1088/1741-2552/ad3f50](https://doi.org/10.1088/1741-2552/ad3f50) | pubmed |

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
