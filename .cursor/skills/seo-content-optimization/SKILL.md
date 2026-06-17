---
name: seo-content-optimization
description: >-
  SEO audit and metadata optimization for Let's Code It blog posts: extracts semantic
  kernel (head term, secondary keywords, long-tail and GEO queries), then optimizes
  title, description, and frontmatter using category benchmarks. Use for CTR recovery,
  keyword mapping, Search Console analysis, semantic audits, or editing
  .ai/seo-benchmarks.md. Does not rewrite article body — use blog-writing skill for that.
---

# SEO content optimization — Let's Code It

Data-driven **semantic kernel extraction** and metadata optimization for `posts/*.md` on letscodeit.dev. Does not hardcode benchmarks — read fresh every activation.

## When this applies

- **SEO audit** — semantic kernel extraction, keyword gap analysis, cannibalization check
- Rewriting `title`, `description`, `tags` in frontmatter
- CTR recovery, SERP performance work
- Updating `.ai/seo-benchmarks.md` after new GSC data
- Cross-post metadata audit
- GEO alignment check (FAQ ↔ long-tail questions, answer-first ↔ head term)

## Out of scope

- Body content rewrites → use `blog-writing` skill
- Slug or URL changes without explicit user request
- New posts from scratch → `blog-writing` workflow
- Image generation

## Mandatory pre-work

1. Read [.ai/seo-benchmarks.md](../../../.ai/seo-benchmarks.md) — **never assume benchmarks from memory**
2. Read [.ai/content-strategy.md](../../../.ai/content-strategy.md) for positioning
3. Read [semantic-kernel.md](semantic-kernel.md) — extraction rules and output template
4. Open target post; note `category` from frontmatter
5. Find matching category section in seo-benchmarks.md
6. If category not tracked: tell user and use cross-category principles
7. Read `.cursor/skills/blog-writing/post-catalog.md` for cannibalization check

## Title rules

- 60–65 characters max (count before proposing)
- Include head keyword the post should rank for (from GSC if available, else slug + H1)
- Sentence case
- Psychological hook: benefit, curiosity gap, specificity, authority, or novelty
- Forbidden: "Complete", "Comprehensive", "Ultimate", "Definitive"
- Weak endings: bare "Guide" or "Tutorial" without a hook

## Description rules

- 130–160 characters (count before proposing)
- First sentence: concrete benefit or problem solved
- Second sentence: artifacts reader gets (tables, FAQ, examples, checklist)
- Active voice
- No "Ready to get started?", "Let's go!", "Dive in!"
- Do not restate title verbatim
- Mention FAQ or tables if present in body

## Workflow

### Phase 1 — Semantic kernel audit (always first)

1. Read benchmarks + full target post (not only frontmatter)
2. Extract semantic kernel per [semantic-kernel.md](semantic-kernel.md):
   - Head term, intent, pillar/cluster
   - Secondary terms, long-tail questions, entities, GEO questions
   - Coverage map (✅ / ⚠️ / ❌) with section references
3. Cannibalization check against `post-catalog.md`
4. List **gaps** — missing H2, FAQ, table, or tag opportunities (recommendations only; body edits → blog-writing skill)
5. Show kernel table to user; wait for confirmation or corrections

### Phase 2 — Metadata optimization

6. Show current title, description, tags, category benchmark
7. Propose 3 title variants + 3 description variants (aligned to confirmed head term)
8. For each variant: **target query** (= head or long-tail from kernel), trigger used, char count, why it beats current
9. Propose `tags` update if secondary terms in kernel ≠ current tags
10. Wait for user selection
11. Apply to frontmatter
12. Self-check: head term in title, sentence case, char counts, tags match kernel
13. Show diff
14. Commit only if user asks: `seo: improve title and description for [slug]`

### Audit-only mode

If user asks for SEO audit without metadata rewrite: deliver Phase 1 only (kernel table + gaps + cannibalization + metadata alignment flags).

## When user provides new GSC data

1. Read seo-benchmarks.md
2. Check if any post exceeds category benchmark
3. Propose benchmark update with date, slug, metric
4. Wait for confirmation
5. Add entry to Update history section

## Files

**Reads every run:**

- `.ai/seo-benchmarks.md`
- `.ai/content-strategy.md`

**May read:**

- `posts/[slug].md` (target — full body for kernel extraction)
- `.cursor/skills/blog-writing/post-catalog.md`
- `.cursor/skills/blog-writing/ai-citation.md` (GEO alignment)

**Writes (with approval):**

- `posts/[slug].md` frontmatter only (`title`, `description`, `tags`)
- `.ai/seo-benchmarks.md`

## Reference

- [semantic-kernel.md](semantic-kernel.md) — head term, secondary/long-tail/GEO extraction, output templates, GSC rules
