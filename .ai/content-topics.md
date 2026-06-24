# Editorial content topics

Backlog of blog and notes topics grounded in **real implementation** — not generic AI news roundups.

**Site app repo** (implementation): [letscodeit.dev](https://github.com/anton-kuptsov/letscodeit.dev) — `docs/patterns/`, `src/lib/`.

## Principles

| Rule | Rationale |
| --- | --- |
| Blog = depth | Guides, architecture, postmortems, comparisons with criteria |
| Notes = angle | 2 paragraphs, developer reaction — see letscodeit.dev `scripts/notes-seed-data.ts` and `src/lib/openai.ts` |
| Expertise from the build | Prefer topics tied to app patterns or shipping this site |
| No PR voice | Same editorial bar as note generation prompts — facts, specs, personal take |

### Article formula

1. Open the relevant `letscodeit.dev/docs/patterns/*.md` or `src/lib/*` module.
2. List 3 decisions made (and 1 rejected).
3. One diagram, screenshot, or code excerpt.
4. Title = problem, not technology (*"Why notes feel instant"*, not *"Suspense in Next.js"*).
5. Close with *what we'd do differently*.

---

## Anchor posts (start here)

Highest uniqueness; enough material already exists in-repo.

| # | Blog title | Source material (letscodeit.dev) |
| --- | --- | --- |
| 1 | We run a blog and a micro-blog on the same Next.js site | `src/lib/content.ts`, `src/lib/notes.ts`, `prisma/schema.prisma` |
| 2 | Synthetic social proof without faking traffic | `docs/patterns/note-engagement.md`, `docs/patterns/behavioral-factors.md` |
| 3 | Instant page transitions in Next.js App Router | `docs/patterns/instant-page-navigation.md` |

Pair each anchor with 3–5 notes reacting to news in the same niche.

---

## Cluster 1 — Blog + notes dual format

Rare split: long markdown in GitHub + short notes in Postgres.

| Format | Title | Angle |
| --- | --- | --- |
| Blog | Why we split editorial into blog posts and notes | Two formats, notes → blog funnel, why a single `/blog` wasn't enough |
| Blog | **GitHub as a CMS: markdown repo + Next.js frontend** — [published](https://letscodeit.dev/blog/github-as-cms-markdown-nextjs) | Outline: [content-outlines/github-as-cms.md](./content-outlines/github-as-cms.md) |
| Note | (react to decoupled CMS / content-repo releases) | Personal: *"this is how we ship"* |

**App repo:** `src/lib/github-blog-repo.ts`, `src/lib/blog-post-slugs.ts`, `src/lib/content.ts`

---

## Cluster 2 — Instant navigation (App Router)

| Format | Title | Angle |
| --- | --- | --- |
| Blog | Instant navigation in Next.js App Router without full-page reloads | Sync `page.tsx`, `loading.tsx`, `Suspense` checklist from pattern doc |
| Blog | Prefetching custom HTML anchors (not just `<Link>`) | `NoteBody.tsx` + `router.prefetch` for `note-keyword` links |
| Note | React 19 + Next 16 on an editorial site | DX changes that mattered — not a release recap |

**App repo:** `docs/patterns/instant-page-navigation.md`, `src/components/notes/NoteBody.tsx`

---

## Cluster 3 — SEO for micro-content

| Format | Title | Angle |
| --- | --- | --- |
| Blog | SEO for micro-content: when your "article" is two paragraphs | List = preview, detail = canonical; no full-text duplication on list |
| Blog | Building `llms.txt` alongside sitemap and RSS | One helper layer in `src/lib/note-seo.ts` |
| Note | Dynamic OG images for short notes | `getNoteShareImage` → `/api/og` — why not a static image |

**App repo:** `docs/patterns/notes-seo.md`, `src/app/llms.txt/route.ts`, `src/app/api/og/route.tsx`

---

## Cluster 4 — Social proof (synthetic engagement)

Honest write-up of what we built and explicit out-of-scope boundaries.

| Format | Title | Angle |
| --- | --- | --- |
| Blog | Seeding social proof on an editorial site (without faking traffic) | Seeded likes/comments vs fake SERP clicks — ethics + implementation |
| Blog | Building HN-style comment threads with LLM personas | Persona pool, cooldown, staggered cron, moderation realism |
| Blog | When synthetic engagement helps SEO — and when it doesn't | Layers 1–3 from `docs/patterns/behavioral-factors.md` |
| Note | Staggered publishing via cron | Likes over 40 min–48 h, not all at once |

**App repo:** `docs/patterns/note-engagement.md`, `src/lib/note-engagement/`

---

## Cluster 5 — AI in the editorial workflow

| Format | Title | Angle |
| --- | --- | --- |
| Blog | Prompt engineering for developer-facing news notes | `REWRITE_FROM_SOURCE_SYSTEM_PROMPT` in `src/lib/openai.ts` |
| Blog | RSS → draft → human publish: AI as editor's assistant, not autopilot | Adminka flow: Fetch → Generate → Publish; no auto-posting |
| Note | (react to AI slop / generated content news) | Draft generation, human publishes |

**App repo:** `src/lib/openai.ts`, `src/lib/tech-news/`, `src/app/adminka/candidates/`

---

## Cluster 6 — Design and shipping

| Format | Title | Angle |
| --- | --- | --- |
| Blog | Designing an editorial grid: Figma → SVG → Tailwind | `DESIGN.md` workflow, preview SVGs, `sips` PNG export |
| Blog | The slow art of shipping a blog people want to read | Meta-post aligned with site tagline |
| Note | Mobile rail vs desktop scroll-tick | One concrete UX trade-off from `DESIGN.md` |

**App repo:** `DESIGN.md`

---

## Cluster 7 — Comments and community

| Format | Title | Angle |
| --- | --- | --- |
| Blog | HN-style flat comments with quotes (not Reddit threads) | `replyToId` + `quoteExcerpt`, max one quote per thread |
| Blog | Real vs synthetic comments on the same page | GitHub auth for live users, cron for seeds |
| Note | GitHub-only auth for comments | Why not email / magic link |

**App repo:** `docs/patterns/note-comments.md`, `src/lib/note-comments.ts`

---

## Cluster 8 — Behavioral analytics

| Format | Title | Angle |
| --- | --- | --- |
| Blog | GA4 events for editorial sites: what to measure after launch | Event catalog: `note_keyword_click`, scroll depth, featured clicks |
| Blog | Measuring session depth without dark patterns | note-keyword links, featured posts — organic amplifiers |
| Note | `send_page_view: false` + SPA page tracking in Next.js | gtag bootstrap pattern |

**App repo:** `docs/patterns/ga4-events.md`, `src/lib/analytics.ts`

---

## Cluster 9 — Startups & shipping

Practical guides for founders who ship — idea validation, founder expertise, team, stack choices, solo vs co-founder, and AI-assisted building done right. Ground in real MVP decisions (e.g. this site's Next.js + GitHub-as-CMS stack) where possible.

| Format | Title | Angle |
| --- | --- | --- |
| Blog | **How to start a startup without chasing the dream blind** | Work the idea before you code: problem/solution fit, TAM sanity checks, early signals; monetization paths (SaaS, usage, marketplace, services) and pick criteria; read the idea through an investor lens (market, moat, unit economics, team) — when to pursue, pivot, or kill; anti-patterns: building because it feels cool |
| Blog | **Founder expertise and building your first team** | What expertise the founder must own (domain, customer, product judgment) vs what to hire or contract out; credibility gap investors notice; when to make first hires — employee vs contractor, generalist vs specialist; how to evaluate early teammates (skills, pace, alignment); light management at MVP stage: goals, feedback, avoiding premature hierarchy; link forward to solo vs co-founder decision |
| Blog | **What stack to pick when you need an MVP fast** | Decision matrix: time-to-ship, hiring pool, hosting cost, escape hatches; concrete stack for a content/product site vs SaaS vs mobile; what we'd pick today and what we'd defer |
| Blog | **Solo founder vs co-founder: can you do everything yourself?** — [published](https://letscodeit.dev/blog/solo-founder-vs-co-founder-mvp) | Outline: [content-outlines/solo-founder-vs-co-founder.md](./content-outlines/solo-founder-vs-co-founder.md). Experience-backed: solo vs partner, vibe-coding debt, co-founder buyout stories, 30-min audit |
| Blog | **Launch an MVP without a developer: solo founder playbook** — [published](https://letscodeit.dev/blog/non-technical-founder-mvp-fast) | [`posts/non-technical-founder-mvp-fast.md`](../posts/non-technical-founder-mvp-fast.md). Step-by-step: GitHub, Cursor, Next.js or mobile, Supabase, Vercel, commit+push CI/CD; screenshots; links to solo-founder and GEO posts |
| Blog | **Vibe coding vs vibe engineering** | Why prompt-and-ship without architecture breaks at scale; what vibe engineering adds — boundaries, tests, deployability, observability; when vibe coding is fine (throwaway prototype) vs when you need engineering discipline; tie to AI coding tools on a real repo |

**Source material:** shipping letscodeit.dev (Next.js 15, content repo, Vercel), editorial workflow in Cluster 5; no dedicated pattern doc yet — opinion + guide format.

---

## First-month plan

One strong blog post per week; 3–4 notes per week in the same cluster.

| Week | Blog (primary) | Notes theme |
| --- | --- | --- |
| 1 | GitHub as a CMS + blog/notes split | Decoupled CMS, markdown workflows |
| 2 | Instant navigation in App Router | Next.js perf, prefetch, `loading.tsx` |
| 3 | Seeding social proof (without fake traffic) | Cron, staggered likes, ethics |
| 4 | Prompt engineering for dev-notes | AI drafts, editorial voice, RSS |

---

## Status

| Topic | Status |
| --- | --- |
| **GitHub as a CMS** | published — [letscodeit.dev/blog/github-as-cms-markdown-nextjs](https://letscodeit.dev/blog/github-as-cms-markdown-nextjs) |
| **Solo founder vs co-founder** | published — [letscodeit.dev/blog/solo-founder-vs-co-founder-mvp](https://letscodeit.dev/blog/solo-founder-vs-co-founder-mvp) · [`posts/solo-founder-vs-co-founder.md`](../posts/solo-founder-vs-co-founder.md) |
| **Launch MVP without a developer (solo founder playbook)** | published — [letscodeit.dev/blog/non-technical-founder-mvp-fast](https://letscodeit.dev/blog/non-technical-founder-mvp-fast) · [`posts/non-technical-founder-mvp-fast.md`](../posts/non-technical-founder-mvp-fast.md) |
| Anchor 1 — blog + notes split | backlog |
| Anchor 2 — synthetic social proof | backlog |
| Anchor 3 — instant navigation | backlog |
| All other cluster topics | backlog |
| Cluster 9 — MVP stack for startups | backlog |
| Cluster 9 — How to start a startup (idea, monetization, investor lens) | backlog |
| Cluster 9 — Founder expertise and first team | backlog |
| Cluster 9 — Vibe coding vs vibe engineering | backlog |

Update this table when a post is drafted (`draft`) or published (`published` + link to `/blog/[slug]`).
