# Agent instructions — blog content repo

This repository is **content only**. It does not run the website.

| Repo | Role |
|------|------|
| **This repo** (`blog`) | Markdown posts (`posts/`), images (`uploads/`) |
| **[letscodeit.dev](https://github.com/anton-kuptsov/letscodeit.dev)** | Next.js 15 site that renders blog posts |

## How the site loads content

1. **Build/sync** (letscodeit.dev): `scripts/sync-blog-post-slugs.ts` reads `posts/*.md` from GitHub and upserts slugs into the site database.
2. **Runtime**: the site fetches markdown from the content repo (cached ~1h), parses frontmatter, renders HTML at `https://letscodeit.dev/blog/[slug]`.
3. **CDN**: published markdown and assets are also served from `https://cdn.letscodeit.dev` (mirrors this repo).

Default URLs (overridable via env on the site):

```
Content repo : https://raw.githubusercontent.com/letscodeit-dev/blog/main
CDN          : https://cdn.letscodeit.dev
Post MD      : https://cdn.letscodeit.dev/posts/[slug].md
Uploads      : https://cdn.letscodeit.dev/uploads/...  (or raw repo for /uploads paths)
```

Implementation: `letscodeit.dev/src/lib/blog-content-url.ts`, `src/lib/content.ts`.

## llms.txt and LLM discovery

**`llms.txt` lives on the site, not in this repo.** It is generated dynamically:

- URL: `https://letscodeit.dev/llms.txt`
- Route: `letscodeit.dev/src/app/llms.txt/route.ts`
- Convention: [llmstxt.org](https://llmstxt.org)
- Listed in `sitemap.xml`

What it includes for blog posts:

- Featured posts (when `featured: true` in frontmatter)
- All published posts with **title + short description** (from frontmatter / content summary)
- Link to each post: built from frontmatter `slug` (same URL as `canonical`)
- Note that plain Markdown is on the CDN (`getPostMarkdownCdnUrl`)

Shortcut on the site: `https://letscodeit.dev/blog/[slug].md` → 308 redirect to `https://cdn.letscodeit.dev/posts/[slug].md`.

**Implications for authors:**

- `canonical` in frontmatter is the **authoritative public URL**. The site uses it for `<link rel="canonical">`, Open Graph, JSON-LD, and share buttons (`getPostCanonicalUrl` in letscodeit.dev).
- `canonical` must equal `https://letscodeit.dev/blog/[slug]` where `[slug]` is the frontmatter `slug` field.
- `title` and `description` feed **llms.txt** and SERP — write them as citation-ready summaries.
- Only `status: "published"` posts appear on the site and in llms.txt.
- `featured: true` adds a post to the **Featured posts** section in llms.txt.
- Body structure (answer-first, FAQ, tables) is documented in `.cursor/skills/blog-writing/ai-citation.md`.

## slug, canonical, and filename

Three different identifiers — do not confuse them:

| Field | Where | Purpose |
|-------|--------|---------|
| **filename** | `posts/*.md` in this repo | Internal file name. **May differ from `slug`.** Site loads by filename via GitHub sync. |
| **slug** | frontmatter | Public path segment: `letscodeit.dev/blog/[slug]`, CDN `posts/[slug].md`, internal `/blog/[slug]` links. |
| **canonical** | frontmatter | Full canonical URL. Site prefers this over auto-built URLs. Must match `https://letscodeit.dev/blog/[slug]`. |

Examples in this repo:

| filename | slug | canonical |
|----------|------|-----------|
| `token-economics.md` | `token-economics` | `https://letscodeit.dev/blog/token-economics` |
| `anthropic-academy-courses-review.md` | `anthropic-academy-guide-free-ai-courses` | `https://letscodeit.dev/blog/anthropic-academy-guide-free-ai-courses` |
| `ai-llm-glossary.md` | `ai-llm-glossary-terms-every-developer-should-know` | `https://letscodeit.dev/blog/ai-llm-glossary-terms-every-developer-should-know` |

Internal links in markdown use **`/blog/[slug]`** (frontmatter slug), not the filename.

## Repo layout

```
posts/*.md          — article + YAML frontmatter (filename may differ from slug)
uploads/[name]/     — cover.svg, thumb.svg, figures/ (folder name is conventional, not enforced)
.ai/                — content strategy and SEO benchmarks for this blog
.cursor/skills/     — blog-writing and seo-content-optimization skills
```

## Frontmatter contract

Required fields the site expects:

```yaml
title: "..."
slug: "public-url-slug"            # path: /blog/[slug]; may differ from filename
canonical: "https://letscodeit.dev/blog/public-url-slug"  # must match slug; used for SEO + OG
publishedAt: "YYYY-MM-DD"
description: "130-160 chars"        # llms.txt, OG, listings
category: "AI Foundations"          # or "Industry"
tags: ["ai", "..."]
status: "published"                 # "draft" = hidden from site + llms.txt
featured: false
coverImage: "/uploads/.../cover.svg"
thumbnail: "/uploads/.../thumb.svg"
```

Image paths in markdown use `/uploads/...` — the site resolves them to CDN/repo URLs at render time.

## Writing workflow

Use the **`blog-writing`** skill (`.cursor/skills/blog-writing/SKILL.md`):

- Voice: `voice-samples.md`
- Anti-AI detectors: `anti-ai-rules.md` + `scripts/validate-draft.mjs`
- LLM citation (ChatGPT, Perplexity, AI Overviews): `ai-citation.md`
- SEO metadata only: `seo-content-optimization` skill + `.ai/seo-benchmarks.md`

After adding a new published post, the **site** must redeploy or run slug sync so the post appears in listings and llms.txt.

## License

CC BY 4.0 — see [LICENSE](LICENSE).
