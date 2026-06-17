# Content strategy — Let's Code It blog

**Last updated:** June 2026  
**Apply when:** writing a new post, refreshing existing content, planning topics

## Positioning

letscodeit.dev blog = **plain-English AI/dev education** for practitioners. Anti-hype, experiment-backed, honest about limits. Not a product catalog.

**Categories:** `AI Foundations`, `Industry`

## Content patterns (validated in-repo)

| Pattern | Length | Structure | Best for |
|---------|--------|-----------|----------|
| **Concept deep-dive** | 1500–2500 words | Hook → mechanism → data/tables → cost/impact → conclusion | token-economics |
| **Comprehensive guide** | 2000–3500 words | Hook → hierarchy/glossary → diagrams → cross-links | complete-guide-llms... |
| **Reference / glossary** | long, scannable | Intro → themed sections → links | ai-llm-glossary |
| **Opinion** | 600–1200 words | Contrarian hook → evidence → conclusion | why-ai-wont-replace-developers |
| **Resource roundup** | 800–1500 words | Framing → categorized list → verdict | anthropic-academy |

## Pillar + cluster map

| Pillar | Cluster posts |
|--------|---------------|
| LLM fundamentals | complete-guide, ai-llm-glossary, token-economics |
| AI career / industry | why-ai-wont-replace-developers |
| Learning paths | anthropic-academy |

When writing a new post, link into the nearest pillar. Avoid two posts competing for the same head term without a clear angle difference.

## AI-tool citation rules (Claude, ChatGPT, Perplexity, Google AI Overviews)

### Answer-first

- First paragraph under the title = direct answer to the main question (40–80 words)
- First paragraph under each H2 = direct answer to that section's question
- No "Welcome to this guide" or "Let's dive in"

### Verifiable specifics

- Cite official docs for behavioral claims (OpenAI, Anthropic, model cards)
- Date-stamp prices and API behavior: "as of May 2026"
- Never invent statistics. If you cannot source it, cut it.

### Comparison tables

Deep-dives (Pattern concept) should include at least one comparison table. AI tools cite tables wholesale.

### FAQ

Posts over 1200 words: 3–5 FAQ items with self-contained 40–80 word answers. Phrase questions like real searches.

### Authority links (outbound)

Prefer: official API docs, platform.openai.com, docs.anthropic.com, papers, WCAG.  
Avoid: random Medium posts, unattributed Dribbble for factual claims.

### Freshness

Use `publishedAt` in frontmatter. Mention "as of [year]" for prices, model versions, course catalogs.

### llms.txt and CDN

Blog content is consumed by LLMs through the **letscodeit.dev** site, not only HTML:

- `https://letscodeit.dev/llms.txt` — auto-generated index (title + description per published post)
- `https://cdn.letscodeit.dev/posts/[slug].md` — plain Markdown mirror of this repo

`description` and `featured` in frontmatter directly affect llms.txt. `canonical` is the authoritative URL for SEO (already in every post). See [AGENTS.md](../../AGENTS.md).

## Topic gaps (candidates)

- Prompt caching in production
- Choosing a model for agent workloads (cost vs quality)
- MCP setup walkthrough (hands-on)
- Token budget for multilingual products
- Evaluating AI coding tools on real repos

## Anti-patterns (all categories)

- Title/description restating each other
- Generic hooks: "Ready to get started?", "Dive in!"
- Fake statistics without source
- Keyword-stuffed URLs and titles
- Walls of text without H2 breaks

## Update protocol

When publishing a new post:

1. Add row to `.cursor/skills/blog-writing/post-catalog.md`
2. Update pillar/cluster map above if needed
3. After GSC data available, update `.ai/seo-benchmarks.md`
