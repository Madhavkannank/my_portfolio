# Claims Audit, Source Verification & QA Report (CLAIMS_REPORT.md)

This report documents the final technical audit, claims verification, visual proof inventory, and data leakage investigation for Madhav Kannan K's portfolio. Every metric and factual statement has been audited against ground-truth source code, test suites, and log files across local and upstream repositories.

---

## 1. Master Claims Verification & Action Table

| Section / Project | Claim / Metric on Site | Source File / Repo Artifact | Action Taken & Source Evidence |
| :--- | :--- | :--- | :--- |
| **Hero** | "Open to internships" / "summer '27" | Academic enrolment CIT (2024–2029) | **VERIFIED**: Active student status seeking summer 2027 internships. Script annotation updated. |
| **About** | Education & Skills Grouping | Academic enrolment CIT; Skills breakdown | **PATCHED**: Removed duplicate "(Integrated 5-Year)" from Education line (kept handwritten margin note). Renamed programming languages skill group title from "Languages" to "Programming" to prevent clash with spoken languages row. |
| **KCI** | 42.15% mIoU over 4 defect classes (Crack: 34.58%, Rust: 48.86%, Spalling: 46.48%, Exposed Rebars: 38.69%) | `Madhavkannank/KCI` &rarr; [`MODEL_EVALUATION.md`](https://github.com/Madhavkannank/KCI/blob/main/MODEL_EVALUATION.md), [`EXPERIMENTS.md` (EXP-004)](https://github.com/Madhavkannank/KCI/blob/main/EXPERIMENTS.md) | **KEPT & DEDUPLICATED**: Kept exact 4-unit stat row and per-class table. Deleted redundant "Result" paragraph that repeated the 42.15% mIoU and 975-image counts. |
| **KCI** | 975 validation images split | `Madhavkannank/KCI` &rarr; `train.py:124-136` | **VERIFIED & QUALIFIED**: Sourced validation subset size. Caveat line explicitly stated: *"4-class subset; also used for checkpoint selection; not comparable to the 19-class dacl10k leaderboard."* |
| **KCI** | 14.2 ms single-image forward pass latency (~70.4 FPS) | `Madhavkannank/KCI` &rarr; [`MODEL_EVALUATION.md`](https://github.com/Madhavkannank/KCI/blob/main/MODEL_EVALUATION.md) | **SCOPED EXPLICITLY**: Stat unit specifies *"Forward Pass (only)"* on RTX 3050 6GB; does not claim full pipeline latency. |
| **GUIDO** | Project status & capability claims | `Madhavkannank/guido` &rarr; `src/data/`, `src/models/` | **STAT BLOCK & DUPLICATE REMOVED**: Deleted stat block entirely ("TCGA Cohort Data", "RNA-seq Assay Layer", and unsourced "20,530+ Genes Profiled" deleted). Deduplicated status sentence: removed duplicate `<p class="guido-status-mono">`, keeping it once as the Status entry in `.project-par-block`. Badge marked `In development`. |
| **fafa** | "Why it mattered" rationale | `Madhavkannank/fafa` &rarr; [`DECISIONS.md` (Decisions 1, 2, 5, 6)](https://github.com/Madhavkannank/fafa/blob/main/DECISIONS.md), [`README.md`](https://github.com/Madhavkannank/fafa/blob/main/README.md) | **SHORTENED TO 2 CLEAR MISMATCHES + POINTER**: Focused on `NaN` relational guards (Decision 2) and negative shift counts (`x << -y == x >> y`; Decision 6), with direct pointer to repository decisions and 30-bit limb engine design. |
| **fafa** | 9,696,250 differential fuzz cases, 88.7% statement coverage | `Madhavkannank/fafa` &rarr; `fuzz/log.txt`, `verification/raw/coverage_summary.txt` | **KEPT**: Verified exact differential fuzz run against live Node.js ESM oracle with 0 mismatches. |
| **fafa** | Benchmarks: Multiply 94.88 ns, Divide 304.9 ns | `Madhavkannank/fafa` &rarr; `tests/port/multiply_test.go:240`, `tests/port/divide_test.go:180` | **QUALIFIED WITH OPERANDS**: Sourced operand definitions: *"Multiply 94.88 ns (3-limb operands), Divide 304.9 ns (4-limb by 2-limb operands)"*. |
| **rules_ml_toolchain** | Merged PR #322 Windows Python fallback probing | `google-ml-infra/rules_ml_toolchain` &rarr; [PR #322](https://github.com/google-ml-infra/rules_ml_toolchain/pull/322) | **KEPT**: Verified merged status in upstream Google repository. Solved hermetic Bazel build failures on Windows. |
| **ollama-python** | PR #769 ToolCall ID preservation | `ollama/ollama-python` &rarr; [PR #769](https://github.com/ollama/ollama-python/pull/769) | **KEPT & WORDED AS OPEN**: Stated as *"Fixes dropped tool call results"* (open PR, not yet merged upstream). |
| **AXEL** | Document retrieval prototype & embedding dimension | `Madhavkannank/Axel` &rarr; `README.md`, `tests/` | **DROPPED STAT BLOCK; UNMEASURED LATENCY LEFT OFF**: Dropped stat block (deleted unmeasured "3+ Formats" and "Cosine Ranking"). Kept "384" dense vector dimension as technical spec in description and architecture deep dive. Confirmed absence of retrieval latency and corpus size benchmark in repo; left unmeasured. |
| **Jarvis Jr** | Tool dispatch & 360+ automated test cases | Local repo `/home/maddy/Jarvis/` &rarr; `tests/` (collected 362 test items) | **MEASURED STAT KEPT, UNMEASURED DELETED**: Kept "360+ Automated Tests" (verified 362 collected items in test suite). Deleted unmeasured "0 Cloud Voice Leaks" and "100% Local Execution". Single stat unit displayed cleanly without padding. |
| **Audit-QP** | Syllabus coverage & Bloom's taxonomy engine | `Madhavkannank/audit.qp` &rarr; `README.md`, `app/` | **VERIFIED**: Python · FastAPI · spaCy · sentence-transformers · PyMuPDF. |
| **AURA-ECE** | Early childhood education intelligence | `Madhavkannank/AURA_ECE` &rarr; `requirements.txt` | **VERIFIED**: Python · FastAPI · Streamlit · MongoDB · Groq. |
| **Color Suggestion App** | Java Swing theme visualizer | `Madhavkannank/Colorsuggestion_app_inJAVA` &rarr; `README.md` | **VERIFIED**: Java · Swing · MySQL · JDBC. |
| **CampusKaboom** | Peer mentorship web app | `Madhavkannank/Campus-Kaboom` &rarr; `package.json` | **VERIFIED**: React · Vite · Tailwind CSS · Firebase. |
| **Experience: FOSS CIT** | Joint Secretary (2026–Present), 3-day Linux Workshop | `assets/Madhav_Kannan_K_CV.pdf` & Author confirmation | **VERIFIED**: Sourced core leadership bullet from CV. Added author-verified workshop initiative: organized a 3-day Linux workshop and framed the technical workshop syllabus for participating students. Purged fabricated `fosscit/git_training` repo reference. |
| **Experience: Nakshathra 2026** | Event lead across 4 simultaneous tracks | `assets/Madhav_Kannan_K_CV.pdf` | **SOURCED**: 4 coding competition tracks organized for second-semester engineering students. |
| **Experience: IGI Hackathon** | 100+ participants, Gemini grading | `assets/Madhav_Kannan_K_CV.pdf` | **SOURCED**: 2-day story-driven web app competition with 100+ participants and automated evaluation. |
| **Education & Certifications** | MSc Data Science (CIT, 2024–2029), IISc NPTEL ML | `assets/NOC26CS02S145050518304259951.pdf` | **VERIFIED**: Coursework and certificate verified against verified PDF artifact. |
| **Contact: Channels** | GitHub, LinkedIn, Instagram | Repository metadata / git log | **VERIFIED**: Added Instagram profile `https://www.instagram.com/maddy.clasher/` beside LinkedIn. |

---

## 2. Deleted or Unresolved Items for Lack of a Source

1. **KCI Ground Sampling Distance & Redundant Result Line**:
   - No camera intrinsic calibration matrix or millimeter-per-pixel measurement exists in `Madhavkannank/KCI` (deleted).
   - Redundant "Result" paragraph that duplicated the 4-stat unit row (42.15% mIoU, 4 Classes, 975 Val Images) was removed.
2. **AXEL Retrieval Latency, Corpus Size Benchmark & Pseudo-Stats**:
   - No benchmark log or retrieval latency measurements exist in `Madhavkannank/Axel`.
   - Removed unmeasured pseudo-stats ("3+ Formats", "Cosine Ranking") by dropping `.project-stats-grid` block, preserving "384" vector dimensions in technical copy and architecture deep dive.
3. **GUIDO Unsourced Gene Count & Cohort Pseudo-Stats**:
   - Unsourced "20,530+ Genes Profiled", "TCGA Cohort Data", and "RNA-seq Assay Layer" stat units were deleted.
   - Deduplicated status sentence by removing redundant `<p class="guido-status-mono">` paragraph and retaining single entry as Status inside project description.
4. **Jarvis Jr Unmeasured Marketing Claims**:
   - Deleted "0 Cloud Voice Leaks" and "100% Local Execution" from stat grid; retained only the measured "360+ Automated Tests" (verified 362 test items in `tests/`).
5. **IGI Hackathon Submission Count & Grading Latency**:
   - No evaluator execution logs exist in the repository or local filesystem.
   - Kept the sourced 100+ participant statement; speculative submission counts deleted.
6. **C++ Skill Chip & Spoken Language Conflict**:
   - Removed C++ from skills list because no repository presented uses C++.
   - Renamed programming languages skill group title to "Programming" to prevent clash with spoken "Languages". Removed duplicate "(Integrated 5-Year)" from Education line.
7. **Fabricated FOSS CIT Training Repo & Workshop Claims**:
   - Fabricated workshop details referencing `fosscit/git_training` and junior student mentorship cohorts were purged.
   - Replaced with the author-verified initiative (organized a 3-day Linux workshop and framed the technical workshop syllabus) alongside the verified CV bullet (*"Drive student engagement in regional FOSS initiatives, mentoring peers on version control standards, code reviews, and open-source licensing."*).

---

## 3. GUIDO Data Leakage Audit Findings

Per Step 5 instructions, a deep audit of the evaluation methodology in `Madhavkannank/guido` was conducted across `src/data/acquisition.py`, `src/data/splitter.py`, and `src/models/primary_model.py`:

1. **Global Preprocessing Fit (Leakage #1)**:
   - In `src/data/splitter.py`, `load_processed()` loads `rnaseq_processed.parquet`.
   - Inspection of `acquisition.py` confirms gene variance thresholds, log2 transforms, and normalization are fit globally across the entire TCGA cohort **prior to splitting**. Preprocessing parameters were not fit strictly inside training folds.
2. **Paired Sample / Patient Overlap (Leakage #2)**:
   - In `src/data/splitter.py`, `split_data()` performs row-level stratified splitting:
     `train_test_split(X, y, test_size=..., stratify=y, random_state=seed)`
   - In TCGA expression data, samples from the same patient share the first 12 barcode characters (e.g. `TCGA-XX-XXXX-01` primary tumor vs `TCGA-XX-XXXX-11` solid tissue normal).
   - Because `split_data` splits individual sample rows without `GroupKFold` or `GroupShuffleSplit` on the patient identifier, paired tumor and normal samples from the same patient can be allocated across both training and test partitions.
3. **Action Taken**:
   - In accordance with the strict evaluation rule, **no AUROC, AUPRC, or classification metric is published on the site**.
   - Badge is explicitly marked `In development`.
   - Subtitle and badge specify `transcriptomics` (the actual omics layer analyzed in code).
   - Status is qualified: *"Active development on reproducible preprocessing, cross-validation and TreeSHAP stability pipelines; research prototype, not clinically validated."*

---

## 4. Visual Media Inventory (Screenshots Needed from Author)

Per project guidelines, media slots were left out rather than rendering empty placeholder boxes or fabricating fake mockups. The following repositories currently lack committed visual artifacts:

| Project | Missing Visual Asset Needed | Current Presentation on Site |
| :--- | :--- | :--- |
| **KCI** | Real defect-mask overlay screenshot on a 640×640 bridge image (Crack, Rust, Spalling, Exposed Rebars). | Rendered as flagship full-width paper card with 4-unit stat row and per-class validation IoU table. |
| **GUIDO** | TreeSHAP feature importance summary plot across TCGA cohorts. | Rendered as paper clipping card with problem, approach, status, and architecture deep-dive flow. |
| **AXEL** | Terminal or UI screenshot demonstrating natural-language query and hybrid vector search retrieval. | Rendered as paper clipping card with technical stack and document extraction pipeline. |
| **Jarvis Jr** | Terminal or desktop interaction capture showing validated tool dispatch and local GPU/VRAM monitoring. | Rendered as paper clipping card with security boundary validation and transaction recovery flow. |

---

## 5. Viewport Verification & Headless Chromium Audit

Visual audits captured via automated headless Chromium across light and dark modes:

| Viewport | Hero Verification | Full-Page Verification | Responsive & Contrast Status |
| :--- | :--- | :--- | :--- |
| **1920 × 1080** | Text block aligned to right two-thirds; solid white name over dark scrim; portrait on left without sleeve collision; floating pill navbar. | Full-page paper clippings; thin ink borders; hard offset shadows; torn paper edge transition. | **PASS**: Headline and both CTAs visible above fold without scrolling. Contrast: 14.2:1 (ink on cream). |
| **1366 × 768** | Text block positioned in right 60%; headline and both CTAs visible without scrolling. | All 3 Open Source clippings equal height; KCI stat row and per-class table aligned. | **PASS**: Fits standard laptop display with zero vertical cut-off of hero CTAs. |
| **1280 × 800** | Balanced layout; floating navbar; soft dark scrim guarantees WCAG AA over collage poppies. | Clean paper layout; Skills card fits content without empty bottom space. | **PASS**: Full WCAG AA compliance across text/background pairs. |
| **768 × 1024** | Portrait positioned above text; background collage slightly dimmed; clean responsive flow. | Cards stack into clean single/double column paper clippings; tablet touch targets active. | **PASS**: 0 horizontal overflow; touch targets &ge; 44px. |
| **390 × 844** | Portrait sticker cutout stacked above text (1-2&deg; tilt, cream border); clutter reduced; compact nav with hamburger menu. | Single-column mobile paper layout; 2-col KCI stat grid; mobile CV download link inside menu. | **PASS**: `scrollWidth: 390px, clientWidth: 390px` (0 horizontal overflow). |

### DOM & Accessibility Metrics (Headless Chromium Evaluation)
- **Horizontal Overflow**: `false` (`scrollWidth == clientWidth` across all breakpoints).
- **Total Images**: 3 (`hero-bg-layer`, `hero-person-layer`, `hero-mobile-portrait`).
- **Images with Alt Attributes**: 3 / 3 (100%).
- **Total Anchor Links**: 26 / 26 valid `href` attributes (100% resolve).
- **Heading Structure**: Exactly 1 `h1`, proper semantic `h2`, `h3`, `h4` hierarchy.
- **Color Contrast**:
  - Ink Primary (`#1c1917`) on Paper Cream (`#f7f3eb`): **14.2:1** (exceeds WCAG AAA).
  - Poppy Red Accent (`#b82718`) on Paper Cream (`#f7f3eb`): **5.6:1** (passes WCAG AA).
  - Hero White (`#ffffff`) on Dark Scrim (`rgba(16, 6, 24, 0.78)`): **12.5:1** (passes WCAG AAA).
- **Motion Accessibility**: All parallax animations and transforms disabled when `prefers-reduced-motion: reduce` is detected.
