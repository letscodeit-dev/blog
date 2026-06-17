---
name: seo-content-optimization
description: >-
  Optimizes Let's Code It blog post SEO metadata (title, description, frontmatter)
  using category benchmarks. Use when improving CTR, rewriting meta descriptions,
  analyzing Search Console performance, or editing .ai/seo-benchmarks.md. Does not
  rewrite article body — use blog-writing skill for that.
---

# SEO content optimization — Let's Code It

Data-driven metadata optimization for `posts/*.md` on letscodeit.dev. Does not hardcode benchmarks — read fresh every activation.

## When this applies

- Rewriting `title`, `description` in frontmatter
- CTR recovery, SERP performance work
- Updating `.ai/seo-benchmarks.md` after new GSC data
- Cross-post metadata audit

## Out of scope

- Body content rewrites → use `blog-writing` skill
- Slug or URL changes without explicit user request
- New posts from scratch → `blog-writing` workflow
- Image generation

## Mandatory pre-work

1. Read [.ai/seo-benchmarks.md](../../../.ai/seo-benchmarks.md) — **never assume benchmarks from memory**
2. Read [.ai/content-strategy.md](../../../.ai/content-strategy.md) for positioning
3. Open target post; note `category` from frontmatter
4. Find matching category section in seo-benchmarks.md
5. If category not tracked: tell user and use cross-category principles

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

1. Read benchmarks + target post frontmatter
2. Show current title, description, category benchmark
3. Propose 3 title variants + 3 description variants
4. For each variant: target query, trigger used, char count, why it beats current
5. Wait for user selection
6. Apply to frontmatter
7. Self-check: sentence case, char counts
8. Show diff
9. Commit only if user asks: `seo: improve title and description for [slug]`

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

- `posts/[slug].md` (target)
- `.cursor/skills/blog-writing/post-catalog.md`

**Writes (with approval):**

- `posts/[slug].md` frontmatter only
- `.ai/seo-benchmarks.md`
