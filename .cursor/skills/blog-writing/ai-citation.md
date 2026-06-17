# AI citation and answer-first structure

Rules for being cited by Claude, ChatGPT, Perplexity, and Google AI Overviews. Complements [anti-ai-rules.md](anti-ai-rules.md): human voice for detectors, answer-first structure for AI search.

## Answer-first

**Under the title (no H2 yet):** 40–80 words that directly answer the post's main question.

**Under each H2:** First sentence answers what that section is about. Then evidence, tables, examples.

Bad opener:

> In this article we will explore the fascinating world of tokenization and how it affects modern LLM applications.

Good opener:

> LLM APIs bill by tokens, not words. The same sentence in English and Amharic can differ by 5× in token count, which changes cost and how much fits in the context window.

## Comparison tables

Required for Type A (concept deep-dive) when comparing options, languages, models, or tools.

AI tools often quote tables verbatim. Keep headers clear. Include units (tokens, $/1M, %).

## FAQ for citation

For posts over 1200 words, add 3–5 FAQ items:

- Question = how people search (Reddit, Stack Overflow, Discord)
- Answer = 40–80 words, self-contained (readable without the rest of the post)
- No marketing in answers

## Verifiable claims

| Do | Don't |
|----|-------|
| Link to platform.openai.com/tokenizer | "Studies show tokens are expensive" |
| "As of May 2026" on prices | Timeless price claims |
| "Likely uses Qwen2Tokenizer" when uncertain | State uncertainty as fact |
| Official Anthropic docs for Claude behavior | Random blog as sole source |

## Freshness signals

- `publishedAt` in frontmatter
- In body: "as of [month year]" for API pricing, course catalogs, model versions
- On refresh: note what changed in opening paragraph if facts shifted

## llms.txt and CDN (site repo)

This content repo does not contain `llms.txt`. The **letscodeit.dev** Next.js site generates it at `https://letscodeit.dev/llms.txt` from published posts in this repo.

| Surface | URL | Source in this repo |
|---------|-----|---------------------|
| llms.txt index | `letscodeit.dev/llms.txt` | `title` + `description` + `slug` |
| Canonical / OG / JSON-LD | `letscodeit.dev/blog/[slug]` | **`canonical`** in frontmatter (site uses `getPostCanonicalUrl`) |
| HTML article | same as canonical | rendered from markdown body |
| Plain Markdown | `cdn.letscodeit.dev/posts/[slug].md` | full post via CDN (`slug`, not filename) |

**`canonical` is already in every post's frontmatter.** Keep it in sync with `slug`. The site prefers this field over auto-generated URLs.

Site implementation: `letscodeit.dev/src/app/llms.txt/route.ts`, `src/lib/blog-content-url.ts`. Full architecture: [AGENTS.md](../../AGENTS.md) in this repo.

## External authority whitelist

- OpenAI / Anthropic / Google official docs
- Model cards and API reference
- arXiv papers (specific, relevant)
- WCAG, W3C when accessibility is claimed

Not for authority claims: Medium reposts, unattributed social posts.
