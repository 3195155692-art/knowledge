---
aliases:
  - K-Dense
  - scientific-agent-skills
  - 科研 Agent 技能库
tags:
  - skills
  - 科研工具
  - 生信
  - 化学
  - 医学
  - 统计
  - 数据库
来源: https://github.com/K-Dense-AI/scientific-agent-skills
技能数: 165
安装位置: ~/.codex/skills/
安装日期: 2026-09-13
---

# Scientific Agent Skills（K-Dense，165 个）

> 让 agent 真正去调科研数据库、分析工具和专业计算的技能库，本批里体量最大的一套。

## 作用

它解决的是「光会写不会算」的问题——每个技能都带可执行脚本、依赖清单和工具用法，覆盖：

- **生信 / 组学**：scanpy、anndata、scvi-tools、pydeseq2、pysam、deeptools、nextflow、bulk-rnaseq、polars-bio。
- **化学 / 药物**：rdkit、datamol、deepchem、molfeat、medchem、diffdock、molecular-dynamics、pkpd-modeling。
- **临床 / 医学**：clinical-reports、clinical-decision-support、treatment-plans、pyhealth、pathml、pydicom、bids。
- **物理 / 天文 / 量子 / 工程**：astropy、pymatgen、qiskit、qutip、cirq、pennylane、openpiv、fluidsim、simpy。
- **统计与数据**：statistical-analysis、statistical-power、statsmodels、pymc、scikit-learn、shap、networkx、polars、dask。
- **文献与写作**：paper-lookup、literature-review、citation-management、scientific-writing、venue-templates、latex-posters、pptx-posters、research-grants。
- **文档与效率**：pdf、docx、pptx、xlsx、markitdown、liteparse、infographics、generate-image。
- **实验室自动化**：opentrons-integration、pylabrobot、lab-hardware-cad、benchling-integration、labarchive-integration。

## 调用方法

- 直接描述分析任务，它会挑技能并把脚本跑起来，例如：
  - 「用 scanpy 跑一下这个 h5ad 的 QC 和 UMAP」
  - 「把这批 SMILES 做药物相似性过滤」
  - 「这批基因做个通路富集并解释结果」
- 点名调用：`$scanpy`、`$rdkit`、`$statistical-power` 等。
- 技能带脚本，**跑之前先确认环境**：Python 版本、依赖包是否装好、是否需要联网或 API key。

## 包含的技能（165 个）

| 技能 | 作用 |
| --- | --- |
| `adaptyv` | How to use the Adaptyv Bio Foundry API and Python SDK for protein experiment design, subm… |
| `aeon` | This skill should be used for time series machine learning tasks including classification… |
| `analytical-method-validation` | Plan, execute, and document validation, verification, and transfer of analytical procedur… |
| `anndata` | Data structure for annotated matrices in single-cell analysis. |
| `arbor` | Autonomously improve a real artifact (code, training recipe, agent harness, data pipeline… |
| `arboreto` | Infer gene regulatory networks (GRNs) from gene expression data using scalable algorithms… |
| `astropy` | Core Python library for astronomy and astrophysics workflows that need Astropy APIs, incl… |
| `autoskill` | Observe the user's screen via screenpipe, detect repeated research workflows, match them… |
| `benchling-integration` | Benchling Python SDK and REST API integration for registry entities, inventory, ELN entri… |
| `bgpt-paper-search` | Search scientific papers and retrieve structured experimental data extracted from full-te… |
| `bids` | Use this skill when working with Brain Imaging Data Structure (BIDS) datasets: organizing… |
| `biopython` | Comprehensive molecular biology toolkit. |
| `bioservices` | Unified Python interface to 40+ bioinformatics services. |
| `bulk-rnaseq` | End-to-end bulk RNA-seq orchestrator — takes raw FASTQ reads through QC and trimming (Fas… |
| `cellxgene-census` | Query the CZ CELLxGENE Census programmatically for versioned public single-cell and spati… |
| `cirq` | Google quantum computing framework. |
| `citation-management` | Comprehensive citation management for academic research. |
| `clinical-decision-support` | Prepare and validate research-only clinical decision-support evaluation, evidence-profile… |
| `clinical-reports` | Create safety-bounded draft structures and run local deterministic checks for clinical ca… |
| `cobrapy` | Constraint-based metabolic modeling (COBRA). |
| `consciousness-council` | Run a multi-perspective Mind Council deliberation on any question, decision, or creative… |
| `dask` | Distributed computing for larger-than-RAM pandas/NumPy workflows. |
| `database-lookup` | Query documented public database APIs with explicit endpoints, filters, pagination, and p… |
| `datalad` | Retrieve, version, and publish scientific datasets with DataLad and git-annex, and captur… |
| `datamol` | Pythonic wrapper around RDKit with simplified interface and sensible defaults. |
| `deepchem` | Molecular ML with diverse featurizers and pre-built datasets. |
| `deepspot-m` | Generate transcriptome-wide virtual spatial transcriptomics from H&E histology with DeepS… |
| `deeptools` | NGS analysis toolkit. |
| `depmap` | Query the Cancer Dependency Map (DepMap) for cancer cell line gene dependency scores (CRI… |
| `dhdna-profiler` | Extract cognitive patterns and thinking fingerprints from any text. |
| `diffdock` | DiffDock and DiffDock-L molecular docking. |
| `dnanexus-integration` | Build and operate reproducible genomics workloads on DNAnexus with the dx CLI, dxpy, apps… |
| `docx` | Use this skill whenever the user wants to create, read, edit, or manipulate Word document… |
| `esm` | Use when working directly with the `esm` Python SDK, ESM3 or ESMC model IDs, Forge/Biohub… |
| `etetoolkit` | Analyze, manipulate, compare, annotate, and visualize phylogenetic or other hierarchical… |
| `experimental-design` | Design experiments and studies BEFORE data is collected — choosing a design, randomizing,… |
| `exploratory-data-analysis` | Perform bounded, local exploratory analysis of explicitly supported scientific files. |
| `flowio` | Read, inspect, and write Flow Cytometry Standard (FCS) 2.0, 3.0, and 3.1 files with FlowI… |
| `fluidsim` | Plan, configure, inspect, restart, and analyze bounded FluidSim computational-fluid-dynam… |
| `folklore-variant-evidence` | Retrieve ClinGen gene-disease validity assertions for a public gene or disease, and revie… |
| `generate-image` | Generate or edit images with AI models through the OpenRouter Image API (Gemini, Seedream… |
| `geniml` | Use Geniml for audited local genomic-interval workflows: validate BED and universe contra… |
| `genomic-coordinates` | Convert genomic intervals between coordinate conventions, normalise and compare variant r… |
| `genomic-intelligence` | Predict regulatory features, gene structure, and expression directly from DNA sequence us… |
| `geomaster` | Comprehensive geospatial science skill covering remote sensing, GIS, spatial analysis, ma… |
| `geopandas` | Guidance and local audit tools for Python workflows that directly use GeoPandas GeoSeries… |
| `get-available-resources` | Detect host inventory and effective CPU, memory, disk, scheduler, container, and accelera… |
| `gget` | Fast CLI/Python queries to 20+ bioinformatics databases. |
| `ginkgo-cloud-lab` | Submit and manage protocols on Ginkgo Bioworks Cloud Lab (cloud.ginkgo.bio), a web-based… |
| `glycoengineering` | Analyze and engineer protein glycosylation. |
| `gtars` | Use Gtars for local genomic interval models and set algebra, overlaps and counts, consens… |
| `histolab` | Lightweight WSI tile extraction and preprocessing. |
| `hugging-science` | Use when the user is doing AI/ML work in a scientific domain such as biology, chemistry,… |
| `hypogenic` | Plans and audits use of ChicagoHAI HypoGeniC/HypoRefine for LLM-assisted hypothesis gener… |
| `hypothesis-generation` | Formulate evidence-bounded scientific questions, candidate hypotheses, rival explanations… |
| `imaging-data-commons` | Query and download public cancer imaging data from NCI Imaging Data Commons. |
| `infographics` | Create professional infographics using Nano Banana Pro AI with smart iterative refinement. |
| `iso-standards-readiness` | Prepares and structurally reviews readiness evidence for ISO management-system and labora… |
| `kdense-exa-search` | Web toolkit powered by Exa, tuned for scientific and technical content. |
| `modal` | Modal is a serverless cloud platform for running Python on demand, including on-demand GP… |
| `kdense-pytorch-lightning` | Deep learning framework (PyTorch Lightning / lightning package). |
| `lab-hardware-cad` | Design custom laboratory hardware as parametric build123d models and export fabrication-r… |
| `labarchive-integration` | Securely integrate with the official LabArchives ELN REST-like API and Inventory API v1. |
| `lamindb` | Use when working with LaminDB, the open-source lineage-native lakehouse for biological da… |
| `latchbio-integration` | Build, register, debug, and operate bioinformatics workflows on Latch using the Python SD… |
| `latex-posters` | Create professional research posters in LaTeX using beamerposter, tikzposter, or baposter. |
| `liteparse` | Local document and PDF parsing that returns spatial text with bounding boxes. |
| `literature-review` | Conduct comprehensive, systematic literature reviews using multiple academic databases (P… |
| `markdown-mermaid-writing` | Comprehensive markdown and Mermaid diagram writing skill. |
| `market-research-reports` | Build evidence-traceable market research reports and assumption-driven market sizing or f… |
| `markitdown` | Convert heterogeneous documents and selected URIs to Markdown with Microsoft MarkItDown f… |
| `matchms` | Process, clean, compare, and search tandem mass spectra with matchms. |
| `matlab` | Build, review, migrate, and safely plan MATLAB or GNU Octave numerical workflows, includi… |
| `matplotlib` | Low-level plotting library for full customization. |
| `medchem` | Medicinal chemistry filters for compound triage. |
| `molecular-dynamics` | Run and analyze molecular dynamics simulations with OpenMM and MDAnalysis. |
| `molfeat` | Molecular featurization for ML (100+ featurizers). |
| `ncats-arax` | Queries the NCATS Translator ARAX production API for bounded, typed, provenance-rich one-… |
| `networkx` | Create, analyze, and visualize complex networks and graphs in Python with NetworkX. |
| `neurokit2` | Use NeuroKit2 to build or audit reproducible research workflows for physiological time-se… |
| `neuropixels-analysis` | Analyze Neuropixels extracellular recordings end-to-end with SpikeInterface. |
| `nextflow` | Build, run, and debug Nextflow data pipelines and nf-core workflows end to end. |
| `omero-integration` | Securely inspect and automate microscopy data workflows against OMERO.server with omero-p… |
| `onekgpd` | Query the 1000 Genomes Project dataset (3,202 whole-genome-sequenced individuals, GRCh38)… |
| `ontology-term-resolution` | Resolve free-text scientific labels to ontology term IDs and validate existing CURIEs aga… |
| `open-notebook` | Self-hosted, open-source alternative to Google NotebookLM for AI-powered research and doc… |
| `openpiv` | Particle Image Velocimetry (PIV) analysis with OpenPIV. |
| `opentrons-integration` | Author, review, migrate, simulate, and troubleshoot official Opentrons Python Protocol AP… |
| `optimize-for-gpu` | GPU-accelerates scientific Python on NVIDIA hardware and verifies that the result is corr… |
| `pacsomatic` | Operator toolkit for nf-core/pacsomatic matched tumor-normal workflows from BAM inputs. |
| `paper-lookup` | Search 18 scholarly APIs for papers, preprints, citations, open-access full text, reposit… |
| `paperclip` | Search and read full-text biomedical papers, FDA/PMDA/EMA regulatory documents, clinical… |
| `paperzilla` | Chat with your agent about projects, recommendations, and canonical papers in Paperzilla. |
| `parallel-web` | Use Parallel CLI for web search, URL extraction, deep research, structured data enrichmen… |
| `pathml` | Use PathML for local, research-only computational pathology workflows: load and tile slid… |
| `pathogen-variant-surveillance` | Query live pathogen genomic surveillance data through the GenSpectrum LAPIS API to find w… |
| `pathway-enrichment` | Run pathway and gene-set enrichment analysis on gene lists or ranked gene data, then inte… |
| `pdf` | Use this skill whenever the user wants to do anything with PDF files. |
| `peer-review` | Prepare evidence-bounded, constructive peer-review drafts and structured manuscript asses… |
| `pennylane` | Hardware-agnostic quantum ML framework with automatic differentiation. |
| `phylogenetics` | Build and analyze phylogenetic trees using MAFFT (multiple alignment), IQ-TREE 2 (maximum… |
| `pi-agent` | Build with and use Pi, the minimal terminal coding harness. |
| `pkpd-modeling` | Pharmacokinetic and pharmacodynamic modelling and simulation - non-compartmental analysis… |
| `polars` | High-performance DataFrame library for Python ETL, analytics, and pandas migration. |
| `polars-bio` | High-performance genomic interval operations and bioinformatics file I/O on Polars DataFr… |
| `pptx` | Use this skill any time a .pptx or .potx file is involved in any way — as input, output,… |
| `pptx-posters` | Create and audit editable scientific posters in macro-free PowerPoint (.pptx) from author… |
| `primekg` | Query the Precision Medicine Knowledge Graph (PrimeKG) for multiscale biological data inc… |
| `protocolsio-integration` | Read, validate, and safely export protocols.io data with current official REST/MCP contra… |
| `pufferlib` | Version-aware guidance for PufferLib reinforcement-learning environments, vectorization,… |
| `pydeseq2` | Differential gene expression analysis for bulk RNA-seq with PyDESeq2, including formulaic… |
| `pydicom` | Use pydicom to read, inspect, write, transform, and safely preflight local DICOM datasets… |
| `pyhealth` | Build clinical/healthcare deep-learning pipelines with PyHealth — loading EHR/signal/imag… |
| `pylabrobot` | Develop and review PyLabRobot lab-automation resources, liquid-handling plans, offline si… |
| `pymatgen` | Analyze, validate, convert, and transform materials structures and computed materials dat… |
| `pymc` | Bayesian modeling with PyMC. |
| `pymoo` | Multi-objective optimization framework. |
| `pyopenms` | Complete mass spectrometry analysis platform. |
| `pysam` | Python/HTSlib workflows for genomic files. |
| `pytdc` | Use Therapeutics Data Commons through the PyTDC Python package for registry discovery, ap… |
| `pyzotero` | Interact with Zotero reference management libraries using the pyzotero Python client. |
| `qiskit` | Build, simulate, transpile, and execute quantum circuits with Qiskit and IBM Quantum Runt… |
| `qutip` | Simulate and audit closed and open quantum-system models with QuTiP 5, including determin… |
| `rdkit` | Cheminformatics toolkit for fine-grained molecular control. |
| `relsa-severity-assessment` | Multivariate severity assessment and humane endpoint prediction for laboratory animal stu… |
| `research-grants` | Write competitive research proposals for NSF, NIH, DOE, DARPA, and Taiwan NSTC. |
| `research-lookup` | Compile current scholarly evidence for a scientific manuscript or research brief. |
| `rowan` | Rowan is a cloud-native molecular modeling and medicinal-chemistry workflow platform with… |
| `scanpy` | Standard single-cell RNA-seq analysis pipeline. |
| `scholar-evaluation` | Provide qualitative-first, evidence-traceable developmental review of scholarly works and… |
| `scientific-brainstorming` | Facilitates evidence-aware scientific ideation with independent generation, structured di… |
| `scientific-critical-thinking` | Evaluate scientific claims and evidence quality. |
| `scientific-schematics` | Create publication-quality scientific diagrams using Nano Banana 2 AI with smart iterativ… |
| `scientific-slides` | Build slide decks and presentations for research talks. |
| `scientific-visualization` | Create and audit truthful, accessible, publication-ready scientific figures with Matplotl… |
| `scientific-writing` | Draft, revise, and audit scientific manuscripts or reports with explicit evidence provena… |
| `scikit-bio` | Biological data toolkit. |
| `scikit-learn` | Machine learning in Python with scikit-learn. |
| `scikit-survival` | Build, evaluate, and audit right-censored or competing-risk survival workflows with sciki… |
| `scvelo` | RNA velocity analysis with scVelo. |
| `scvi-tools` | Deep generative models for single-cell omics. |
| `seaborn` | Statistical visualization with pandas integration. |
| `shap` | Explain and audit machine-learning predictions with SHAP. |
| `simpy` | Build, inspect, test, and analyze bounded process-based discrete-event simulations with S… |
| `stable-baselines3` | Production-ready reinforcement learning algorithms (PPO, SAC, DQN, TD3, DDPG, A2C) with s… |
| `statistical-analysis` | Guided statistical analysis for research data - test selection, assumption checking, effe… |
| `statistical-power` | Sample-size and statistical power calculations for planning studies. |
| `statsmodels` | Statistical models library for Python. |
| `sympy` | Use when you need exact symbolic math in Python — algebra, calculus, equation solving, sy… |
| `tamarind` | Access a collection of open-source molecular design and structural biology tools on the T… |
| `tiledbvcf` | Efficient storage and retrieval of genomic variant data using TileDB. |
| `timesfm-forecasting` | Zero-shot time series forecasting with Google's TimesFM foundation model. |
| `torch-geometric` | PyTorch Geometric (PyG) for graph neural networks — node/link/graph classification, messa… |
| `torchdrug` | Build and troubleshoot TorchDrug 0.2.1 workflows for molecular graphs, property predictio… |
| `transformers` | Hugging Face Transformers for loading Hub models, running pipeline inference, text genera… |
| `treatment-plans` | Format and structurally validate local treatment-plan documentation after clinical decisi… |
| `umap-learn` | Use UMAP-learn for nonlinear dimensionality reduction, 2D/3D embeddings, clustering prepr… |
| `uncertainty-and-units` | Track physical units and propagate measurement uncertainty in scientific calculations usi… |
| `usfiscaldata` | Query the U.S. |
| `vaex` | Use this skill for processing and analyzing large tabular datasets (billions of rows) tha… |
| `venue-templates` | Prepare journal manuscripts, conference papers, research posters, and grant documents usi… |
| `waypoint-bio` | Use when working with Outpost Bio's open microbiome foundation models - the Waypoint chec… |
| `what-if-oracle` | Run structured What-If scenario analysis with 4–6 branch possibility exploration (best, l… |
| `xlsx` | Create, edit, analyze, or convert Excel spreadsheets (.xlsx, .xlsm, .xltx) where the work… |
| `zarr-python` | Chunked N-D arrays for cloud storage (Zarr-Python 3). |

## 注意事项

- 官方提示：整包 165 个技能占用较多常驻上下文，**建议只保留真正常用的子集**。
- 部分技能会联网或调用外部服务（Exa、Parallel、Benchling、NCBI、Materials Project 等），需要自备凭据。
- 与另外两个仓库重名的技能已改名：`modal` → `kdense-modal`、`pytorch-lightning` → `kdense-pytorch-lightning`、`exa-search` → `kdense-exa-search`。

## 相关

- [[AI Research Skills]]
- [[Nature Skills]]
- [[Skills 调用速查]]
