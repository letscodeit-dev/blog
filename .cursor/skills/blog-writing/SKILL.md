---
name: blog-writing
description: >-
  Writes and refreshes Let's Code It blog posts for letscodeit.dev with
  human-sounding prose that resists AI detection (GPTZero, Originality,
  Copyleaks). Use when drafting, expanding, rewriting, or reviewing Markdown
  in posts/, article outlines, image assets, or frontmatter. Covers concept
  guides, opinion pieces, glossaries, resource roundups, and long-form AI/dev
  explainers in plain English.
---

# Blog writing — Let's Code It

## Mission

Produce posts that:

1. Read like a practicing developer wrote them after real work, not a content mill
2. **Pass major AI-detection tools as human-written** (GPTZero, Originality, Copyleaks)
3. Teach clearly: reader finishes smarter, not overwhelmed
4. Stay honest about limits, dates, and what was actually tested
5. Cross-link naturally to other letscodeit.dev posts
6. Ship with correct frontmatter and asset paths

**Priority when goals conflict:** anti-AI compliance and factual honesty beat word count and SEO padding. Rewrite until validator passes.

## Before drafting — mandatory reads

1. [voice-samples.md](voice-samples.md) — **the voice benchmark** (no gold-standard posts in this repo)
2. [anti-ai-rules.md](anti-ai-rules.md) — hard limits for AI detectors
3. [ai-citation.md](ai-citation.md) — answer-first structure for AI search citation
4. [../seo-content-optimization/semantic-kernel.md](../seo-content-optimization/semantic-kernel.md) — **semantic kernel** for SEO + GEO keyword mapping
5. [post-catalog.md](post-catalog.md) — slugs for internal links
6. [.ai/content-strategy.md](../../.ai/content-strategy.md) — pillars, patterns, topic gaps
7. [AGENTS.md](../../AGENTS.md) — how this repo connects to letscodeit.dev, CDN, and llms.txt

Existing files in `posts/` are **legacy content**. Use them for facts and structure ideas only. On refresh, bring them into anti-AI compliance. Do not copy their phrasing if it fails [anti-ai-rules.md](anti-ai-rules.md).

## Voice and tone

Editorial voice for **letscodeit.dev**. Practical, anti-hype, plain English.

- Specific over abstract: name models, APIs, dates, numbers
- Confident about what you tested; humble about what you did not
- **I** for personal experiments; **we** for team/project experience (pick one per post)
- Dry humor OK; meme-speak and LinkedIn-bro energy are not
- No selling. No "ultimate guide." No fake urgency

Full rules and compliant samples: [voice-samples.md](voice-samples.md)

## Anti-AI detection (non-negotiable)

All rules in [anti-ai-rules.md](anti-ai-rules.md). Summary:

| Rule | Limit |
|------|-------|
| Em-dash `—` | max 2 |
| Spaced dash ` - ` | max 8 |
| Tricolons "X, Y, and Z" | max 2 |
| Forbidden patterns | zero ("Whether you're", "Not X, but Y", etc.) |
| Banned clichés | zero |
| Paragraph openers | no However/Moreover/Furthermore/... |

Validator (must pass before delivery):

```bash
node .cursor/skills/blog-writing/scripts/validate-draft.mjs posts/your-slug.md
```

Paste the anti-AI self-check block from [anti-ai-rules.md](anti-ai-rules.md) with real counts.

## Post types — pick one

| Type | When | Structure |
|------|------|-----------|
| **A — Concept deep-dive** | One technical topic with data or experiments | Hook → problem → explanation → evidence (tables/screenshots) → takeaway |
| **B — Comprehensive guide** | Pillar content, terminology, hierarchy | Hook → glossary/sections → diagrams → "go deeper" links |
| **C — Reference / glossary** | Lookup-style definitions | Short intro → themed sections → cross-links |
| **D — Opinion** | Contrarian or industry take, 600–1200 words | Provocative hook → evidence → what actually happened → single conclusion |
| **E — Resource roundup** | Courses, tools, reading lists | Framing → categorized list with "best for / time" → honest verdict |

Type D skips FAQ. Types A, B, E should include FAQ for posts over 1200 words.

Type A deep-dives: at least one comparison table ([ai-citation.md](ai-citation.md)).

## Semantic kernel (SEO + GEO) — define before outline

Before proposing H2 outline, define the post's **semantic kernel** per [semantic-kernel.md](../seo-content-optimization/semantic-kernel.md):

| Layer | Draft now | Used later in |
|-------|-----------|---------------|
| Head term | One primary query | `title`, slug, opening paragraph |
| Secondary terms | 4–8 concepts | H2 headings, `tags` |
| Long-tail questions | 3–6 search phrasings | FAQ, section leads |
| GEO questions | 3–5 chat-style questions | FAQ answers (40–80 words each) |
| Entities | Tools, models, standards | Tables, definitions, outbound links |

Present the kernel table at outline stage. User confirms before drafting prose.

**Rules:**

- One head term per post; check `post-catalog.md` for cannibalization
- Map each secondary term to a planned H2 before writing
- FAQ questions must come from long-tail + GEO rows — not invented after the fact
- `tags` in frontmatter mirror secondary terms (5–8 max)
- Natural mentions only — never paste keyword lists into body (hurts GEO; see geo post)

For metadata-only tuning on published posts → `seo-content-optimization` skill (kernel audit + title/description).

## AI search citation (answer-first)

First paragraph = direct answer to the **head term** as a question (40–80 words). Each H2 opens with the section answer. Full rules: [ai-citation.md](ai-citation.md).

## Image assets

Generate and validate per **[image-assets.md](image-assets.md)**.

| Asset | Required |
|-------|----------|
| `cover.svg` + `thumb.svg` | every post |
| `figures/*.svg` | Type A/B recommended |
| `*.png` | screenshots when showing data |

After creating images:

```bash
node .cursor/skills/blog-writing/scripts/validate-images.mjs posts/your-post.md
```

SVG text must be **ASCII-only** (no em-dash, arrows, or special Unicode). See [image-assets.md](image-assets.md) for visual style and dimensions.

## Repo conventions

```
posts/[slug].md          — article with YAML frontmatter
uploads/[slug]/
  cover.svg              — coverImage
  thumb.svg              — thumbnail
  figures/               — inline SVGs or PNGs (optional)
```

### Frontmatter template

```yaml
---
title: "Sentence-style title"
slug: "url-slug"
canonical: "https://letscodeit.dev/blog/url-slug"
publishedAt: "YYYY-MM-DD"
description: "130-160 chars. Benefit-first, no clickbait."
category: "AI Foundations"   # or "Industry"
tags: ["ai", "topic-tag"]
status: "published"            # or "draft"
featured: false
coverImage: "/uploads/url-slug/cover.svg"
thumbnail: "/uploads/url-slug/thumb.svg"
---
```

`slug` is the public URL key. `canonical` must be `https://letscodeit.dev/blog/[slug]` — the site reads `canonical` from frontmatter for SEO metadata (not reconstructed from filename).

Filename (`posts/*.md`) may differ from `slug` (e.g. `anthropic-academy-courses-review.md` → slug `anthropic-academy-guide-free-ai-courses`). Internal links use `/blog/[slug]`.

**llms.txt:** links use `slug`; `canonical` should match the same URL. Markdown mirror: `https://cdn.letscodeit.dev/posts/[slug].md`. See [AGENTS.md](../../AGENTS.md).

### Images

- `![alt text](/uploads/[slug]/filename.png)` — alt describes what the screenshot shows
- PNG for screenshots; SVG for diagrams in `figures/`

### Internal linking

- **2–5 links** via `/blog/[slug]` ([post-catalog.md](post-catalog.md))
- **1–3 external authority links** for factual claims: official docs, papers — not random Medium posts

## Formatting

- Paragraphs: 2–4 sentences
- H2 every 200–400 words on long posts
- Tables for comparative data; blockquotes for caveats
- Standard markdown `-` bullets

## FAQ block (Types A, B, E — long posts)

```markdown
## Frequently asked questions

### Question phrased like a real search query?

Direct answer in 40–80 words. Specific. No marketing.
```

Pick 3–4 questions people actually ask (Reddit, Stack Overflow, Discord).

## Workflow — new post

1. Confirm post type (A–E) with user
2. Read [voice-samples.md](voice-samples.md) + [anti-ai-rules.md](anti-ai-rules.md)
3. **Define semantic kernel** (head term, secondary, long-tail, GEO questions, entities) — show table; wait for approval
4. Propose: 3 title variants (aligned to head term), hook paragraph, H2 outline mapped to kernel
5. **Wait for outline approval** unless user says "write it all"
6. Draft section by section; answer-first under each H2; cover kernel coverage as you go
7. Create image assets in `uploads/[asset-folder]/` per [image-assets.md](image-assets.md)
8. Add FAQ from long-tail + GEO rows in kernel (if type and length warrant it)
9. Run both validators; fix until **PASS**:
   ```bash
   node .cursor/skills/blog-writing/scripts/validate-draft.mjs posts/your-post.md
   node .cursor/skills/blog-writing/scripts/validate-images.mjs posts/your-post.md
   ```
9. Paste anti-AI self-check + image validation summary
10. Present frontmatter; write file after approval
11. Update [post-catalog.md](post-catalog.md) for new slugs

## Workflow — refresh existing post

1. Read current post fully
2. **Extract semantic kernel** (audit template in [semantic-kernel.md](../seo-content-optimization/semantic-kernel.md)) — show gaps vs current content
3. List: outdated facts, anti-AI violations, missing cross-links, **keyword gaps** from kernel
4. Propose keep / rewrite / expand / remove plan; wait for approval
5. Rewrite phrasing to pass validator (legacy posts will likely need substantial edits)
6. Re-run both validators until **PASS**
7. Paste anti-AI self-check + image validation summary

## Self-check before delivery

- [ ] Semantic kernel table delivered; head term in title + opening paragraph
- [ ] Each planned secondary term has an H2 or subsection; FAQ covers long-tail + GEO rows
- [ ] [voice-samples.md](voice-samples.md) tone, not generic AI blog voice
- [ ] Validator **PASS** (not "probably fine")
- [ ] Anti-AI self-check pasted with real counts
- [ ] Em-dash ≤2, tricolons ≤2, zero forbidden patterns
- [ ] `canonical` matches `https://letscodeit.dev/blog/[slug]` from frontmatter
- [ ] `description` works as llms.txt / SERP summary
- [ ] 2–5 internal links from catalog
- [ ] External citations for non-obvious claims
- [ ] At least one honest limitation or caveat
- [ ] Answer-first opening and H2 leads ([ai-citation.md](ai-citation.md))
- [ ] At least one comparison table on Type A posts
- [ ] No unsourced statistics
- [ ] `validate-images.mjs` **PASS**; cover + thumb exist; SVGs render
- [ ] Alt text 8–15 words on inline images

## Mistakes to confess if caught

- Banned cliché slipped through → apologize once, scan all similar, fix together
- Em-dash over budget → recount, replace with commas or new sentences
- Invented statistic → remove immediately, never argue to keep
- Validator claimed PASS without running → re-run and show output
- SVG will not open → check ASCII-only text, run `validate-images.mjs`, fix with `xmllint`

## Related skills

- **SEO audit + metadata** (semantic kernel, title, description, CTR) → `seo-content-optimization` skill. Reads [semantic-kernel.md](../seo-content-optimization/semantic-kernel.md) + `.ai/seo-benchmarks.md`. Does not rewrite body.

## Out of scope

- Git commit/push unless explicitly requested
- Site rendering / CMS (this repo is content only)

## Additional resources

- [voice-samples.md](voice-samples.md) — voice benchmark
- [anti-ai-rules.md](anti-ai-rules.md) — GPTZero / Originality / Copyleaks rules
- [ai-citation.md](ai-citation.md) — Perplexity / ChatGPT citation structure
- [../seo-content-optimization/semantic-kernel.md](../seo-content-optimization/semantic-kernel.md) — SEO + GEO keyword kernel
- [image-assets.md](image-assets.md) — image generation and validation rules
- [image-prompts.md](image-prompts.md) — quick prompt template
- [post-catalog.md](post-catalog.md) — cross-link slugs
- [.ai/content-strategy.md](../../.ai/content-strategy.md) — pillars and gaps
- [AGENTS.md](../../AGENTS.md) — site repo, CDN, llms.txt
- [scripts/validate-draft.mjs](scripts/validate-draft.mjs) — prose lint
- [scripts/validate-images.mjs](scripts/validate-images.mjs) — image lint
