---
title: "What GEO is and what actually gets you cited by chatbots"
slug: "generative-engine-optimization-what-i-tested"
canonical: "https://letscodeit.dev/blog/generative-engine-optimization-what-i-tested"
publishedAt: "2026-06-17"
description: "Generative engine optimization shapes content so ChatGPT and Perplexity cite you. We ran experiments on our dev blog and separated signal from GEO hype."
category: "AI Foundations"
tags: ["ai", "geo", "seo", "llms-txt", "perplexity", "chatgpt", "content"]
status: "published"
featured: false
coverImage: "/uploads/geo-generative-engine-optimization/cover.svg"
thumbnail: "/uploads/geo-generative-engine-optimization/thumb.svg"
---

GEO (generative engine optimization) is how you structure and publish content so AI chatbots and answer engines quote your pages when someone asks a question. Classic SEO chases blue links in Google. GEO chases citations inside ChatGPT, Perplexity, and other answer products. We spent several weeks tuning [letscodeit.dev](https://letscodeit.dev) for that goal. This post is what survived our hype filter.

## What GEO is (and what it is not)

GEO is the set of editorial and technical choices that make your content easy for a language model to retrieve and summarize with clear attribution. It is not a replacement for SEO. Search still sends steady traffic. GEO adds a second discovery path that grows as more people ask questions in chat instead of typing keywords into a search box.

![Split comparison of classic SEO and generative GEO goals](/uploads/geo-generative-engine-optimization/figures/seo-vs-geo.svg)

| Dimension | SEO (classic) | GEO (generative) |
|-----------|-------------|------------------|
| Primary consumer | Search crawler + ranking algorithm | LLM + retrieval layer behind a chat product |
| Success signal | Clicks from SERP | Citations and links inside AI answers |
| Unit of value | Page rank for a query | Quotable passage, table, or definition |
| Typical winner | Comprehensive page + backlinks | Answer-first paragraph + verifiable fact |
| Time horizon | Months of indexing | Can appear after next crawl or index refresh |

"AI SEO" as a buzzword often means keyword stuffing with chatbot flavor. Real GEO looks more like technical writing: short direct answers, tables with units, dated claims, and primary sources.

When people say "the AI read our site," they usually mean an [LLM](/blog/complete-guide-llms-models-agents-subagents) behind a product retrieved a chunk of text and paraphrased it. The product might also call tools, search the web, or read a curated index. GEO covers all of those paths, not just one trick.

Understanding the stack helps set expectations. A chat product is not a bare model. It wraps an LLM with retrieval, browsing, and policy layers. GEO that only optimizes for "the model" misses half the pipeline. We write for the retrieval step: clear headings, extractable paragraphs, and definitions that survive paraphrase.

## Why GEO matters if you publish technical content

We still get most visitors from search and direct links. GEO traffic is smaller today, but the sessions look different. Someone already has a question formed in natural language. If your page answers it in the first paragraph, the chatbot has less reason to blend five mediocre sources into mush.

We cannot prove a universal lift. No vendor publishes a stable "citation rank" API. What we can say: when we ask Perplexity or ChatGPT about topics we have covered with answer-first structure and tables, our URLs show up more often than before we reorganized the blog. Sample size is our site, not an industry study.

For developer content the bar is higher. Models cross-check factual claims against other sources. A post with invented statistics or vague authority links is less likely to get cited and more likely to get paraphrased without attribution. That matches what we saw when we stripped unsourced numbers from older drafts.

We also stopped treating GEO as a single channel. Perplexity shows source links by default. ChatGPT behavior depends on browse mode and the model snapshot. Google AI Overviews pull from its own index. One format might help in one product and do nothing in another. We optimize for quotable structure across all of them and accept that attribution will be uneven.

## What answer engines actually consume

Answer engines do not magically ingest your brand. They touch a small set of surfaces. On letscodeit.dev we control four of them.

![Content flow from markdown repo to AI answer engines](/uploads/geo-generative-engine-optimization/figures/content-flow.svg)

| Surface | URL pattern | What the model sees |
|---------|-------------|---------------------|
| HTML article | `letscodeit.dev/blog/[slug]` | Rendered page, metadata, JSON-LD from the Next.js site |
| llms.txt index | `letscodeit.dev/llms.txt` | Title + short description per published post |
| Plain Markdown | `cdn.letscodeit.dev/posts/[slug].md` | Full post source from the content repo |
| Frontmatter | inside the `.md` file | `canonical`, `description`, `featured`, dates |

The `canonical` field in each post is the authoritative public URL. The site uses it for Open Graph and share links. The `description` field doubles as the summary line in `llms.txt`. We treat it as a standalone definition, not a teaser.

Plain Markdown matters because some pipelines prefer raw text over HTML noise. A redirect on the site (`/blog/[slug].md`) points to the CDN copy. Same words, fewer tags.

Length still costs money somewhere in the stack. A cited paragraph might be short, but retrieval often loads a larger chunk first. [Token economics](/blog/token-economics) applies here too: dense tables and long intros burn context before the model reaches your conclusion. GEO favors tight answer blocks over sprawling introductions.

### Crawlers you may see in server logs

A crawl in your hosting logs is not a citation in a chat answer. It is still the earliest signal we get that a product fetched our pages. We filter CDN and Vercel access logs for the bot names below. Version numbers in User-Agent strings change; we verify each one against the vendor policy page, not a blog copy-paste.

| Bot | Vendor | Typical role | Policy |
|-----|--------|--------------|--------|
| GPTBot | OpenAI | Pre-crawl and training index | [openai.com/gptbot](https://openai.com/gptbot) |
| OAI-SearchBot | OpenAI | Search index for answer products | [openai.com/searchbot](https://openai.com/searchbot) |
| ChatGPT-User | OpenAI | Live fetch when a user asks ChatGPT to browse a URL | [openai.com/bot](https://openai.com/bot) |
| PerplexityBot | Perplexity | Index crawl for Perplexity search | [perplexity.ai/perplexitybot](https://perplexity.ai/perplexitybot) |
| ClaudeBot | Anthropic | Index crawl | [anthropic.com](https://www.anthropic.com/) (bot contact in UA) |
| DeepSeekBot | DeepSeek | Index crawl | [deepseek.com/bot](https://www.deepseek.com/bot) |
| xAI-SearchBot | xAI | Search index | [x.ai](https://x.ai/) |
| Google-CloudVertexBot | Google Cloud | Vertex AI grounding crawl | [cloud.google.com/vertex-ai-bot](https://cloud.google.com/vertex-ai-bot) |

Google AI Overviews still lean on Google's main search index. We do not treat `Google-CloudVertexBot` as a stand-in for that pipeline.

`robots.txt` is a separate decision from GEO copy. Blocking `GPTBot` does not stop `ChatGPT-User` from fetching a URL when a user triggers browse. Allowing `OAI-SearchBot` or `PerplexityBot` is closer to "please index me for answers." We allow search-oriented bots on letscodeit.dev and check logs a few times a year. Your policy on training crawls is your call.

### How the blog is split across two repos

We publish Markdown in a content-only GitHub repo. A separate Next.js app ([letscodeit.dev](https://github.com/anton-kuptsov/letscodeit.dev)) renders it. At build time the site syncs post slugs into a database. At runtime it fetches each `.md` file, parses frontmatter, and renders HTML. A CDN mirror serves the same Markdown at `cdn.letscodeit.dev/posts/[slug].md`.

That split changed how we think about GEO. The words live in Git. The discovery layer (`llms.txt`, sitemap, RSS, canonical tags) lives on the site. A good GEO pass touches both: write answer-first body copy here, ensure the site exposes `llms.txt` and stable canonical URLs there. We cannot edit `llms.txt` from this repo, but every `description` we write here feeds it.

## Tactics we tested on letscodeit.dev

We grouped changes into a short experiment log. None of this is a controlled A/B test. It is what we shipped and watched.

**Answer-first intros.** The first paragraph under the title states the conclusion. The first sentence under each H2 answers that section's question. Pages we rewrote this way produced cleaner quotes when we pasted them into ChatGPT and asked for a summary. Pages with "welcome" intros did not.

**Comparison tables.** Chatbots often reproduce tables intact. We added at least one per deep-dive (SEO vs GEO above is the pattern). Headers include units. Cells hold facts, not adjectives.

**FAQ blocks with self-contained answers.** Each answer is 40–80 words and readable without the rest of the post. Questions match how people phrase searches ("Is GEO the same as SEO?") rather than marketing headings ("Why choose us?").

**Primary outbound links.** We link to OpenAI docs, Anthropic docs, [llmstxt.org](https://llmstxt.org), and spec pages. We dropped Medium posts as sole proof for behavioral claims.

**llms.txt plus CDN Markdown.** After `llms.txt` went live, the index listed every published post with its description. CDN Markdown gave models a clean source file. We do not know which surface each product prefers. Offering both is cheap.

**Voice that sounds human.** We run drafts through anti-AI lint rules (em-dash limits, banned filler phrases, varied sentence length). Stiff "SEO copy" fails twice: readers bounce and the prose looks machine-made. GEO needs specificity: dates, product names, things we actually tried. That overlaps with sounding like humans wrote it.

**What failed or overpromised.**

- Rewriting every heading as a question looked robotic and tripped our anti-AI lint rules.
- Pasting keyword lists meant for Google into the body did nothing visible.
- Fake precision ("73% more citations") with no source is worse than no number at all.
- Chasing GPTZero score as the main KPI made the prose stiff. Human voice and GEO overlap. They are not the same target.

## A practical GEO checklist for your next post

Use this before you hit publish on any technical article.

1. First paragraph answers the main question in 40–80 words.
2. `description` in frontmatter works as a standalone summary (it feeds `llms.txt`).
3. `canonical` equals `https://letscodeit.dev/blog/[slug]` for your slug.
4. At least one comparison table with clear headers.
5. Each H2 section opens with a direct sentence, then evidence.
6. Two to five internal links to related posts on the same site.
7. One to three outbound links to official documentation for non-obvious claims.
8. Date-stamp prices, API behavior, and model names ("as of June 2026").
9. FAQ with three to five real questions if the post exceeds 1200 words.
10. Run an anti-AI lint pass so the post sounds human, not template-generated.
11. Spot-check access logs for AI crawler user-agents (`PerplexityBot`, `GPTBot`, `OAI-SearchBot`, etc.) against vendor bot policy pages.

If you maintain a separate content repo and a Next.js site like we do, redeploy or sync slug index after you add a published post. Otherwise `llms.txt` lags behind GitHub.

## Frequently asked questions

### What is generative engine optimization (GEO)?

GEO is the practice of structuring web content so AI answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews) can retrieve your pages, quote passages, and include links. It complements classic SEO. Success looks like a cited passage or link inside an AI answer, not only a position in traditional search results.

### Is GEO the same as SEO?

No. SEO optimizes for search engine rankings and SERP clicks. GEO optimizes for citation inside AI-generated answers. Shared tactics include clear headings and factual accuracy. GEO adds answer-first paragraphs, quotable tables, `llms.txt` indexes, and plain Markdown mirrors that models can ingest without HTML noise.

### Does llms.txt help with ChatGPT citations?

`llms.txt` follows the [llmstxt.org](https://llmstxt.org) convention: a machine-readable index of your site with titles and short descriptions. It helps models discover what you publish. It does not guarantee citation. We treat it as discovery infrastructure, the same way a sitemap helps crawlers without promising rank.

### How do I know if AI tools are citing my site?

Check analytics referrers for domains like `perplexity.ai` or `chatgpt.com` if your host passes them through. Filter access logs for crawler user-agents such as `PerplexityBot`, `OAI-SearchBot`, or `GPTBot` (see table above). A crawl means the URL was fetched; it does not prove a citation. Manually ask tools questions your post answers and see whether your URL appears. There is no stable public API for "citation count" across all products as of June 2026. Referrer logs, bot logs, and manual spot checks are the practical stack.

## What we would do next

We will refresh older posts that still open with context instead of answers. We plan to add FAQ blocks where they are missing. Structured data (FAQPage JSON-LD) belongs in the Next.js repo. The FAQ text starts here in Markdown.

GEO is younger than SEO. The products change monthly. What held this month: direct answers, tables, honest sources, and files machines can read without parsing a layout engine. We will keep measuring on our site and drop tactics that stop working.

When you ask whether GEO is "worth it," our answer is narrow: if you already publish technical content, the marginal cost of answer-first structure and a real `llms.txt` is low. The upside is uneven attribution across products you do not control. We treat GEO like accessibility or performance: build it into the publishing workflow and verify occasionally, rather than buying a miracle playbook.
