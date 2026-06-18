# Outline: GitHub as a CMS — markdown repo + Next.js frontend

**Status:** published — [`posts/github-as-cms-markdown-nextjs.md`](../../posts/github-as-cms-markdown-nextjs.md) · [letscodeit.dev/blog/github-as-cms-markdown-nextjs](https://letscodeit.dev/blog/github-as-cms-markdown-nextjs)  
**Content repo:** this repo (`posts/`, `uploads/`)  
**App repo:** [letscodeit.dev](https://github.com/anton-kuptsov/letscodeit.dev)  
**Slug:** `github-as-cms-markdown-nextjs`

---

## Working title options

**Chosen (published):** **We skipped Contentful: GitHub as a CMS for our Next.js blog**

1. ~~GitHub as a CMS: how we publish blog posts from a markdown repo~~ *(descriptive — draft title)*
2. **We don't have a CMS — we have a GitHub repo and a build step** *(hook — partial match to chosen title)*
3. **Decoupled content for a Next.js blog without Contentful** *(SEO-friendly)*

**Lead angle:** Posts live in a separate repo; the Next.js app fetches markdown at runtime (cached), syncs slug metadata at build, and writes assets back via the GitHub API. No admin UI for long-form — git is the editor.

---

## Architecture

```
┌─────────────────────┐         build / npm run db:sync-blog-slugs
│  blog (this repo)   │ ───────────────────────────────────────────┐
│  posts/*.md         │                                            ▼
│  uploads/notes/*    │ ◄── PAT upload (PR merge)    ┌─────────────────────────┐
└─────────┬───────────┘      adminka note images     │  Postgres               │
          │                                          │  blog_post_slugs         │
          │ raw.githubusercontent.com                │  post_like_stats         │
          │ (runtime fetch, 1h cache)                └───────────┬─────────────┘
          ▼                                                      │ slug list
┌─────────────────────┐         unstable_cache 1h              │
│  letscodeit.dev     │ ◄──────────────────────────────────────┘
│  Next.js app        │
│  /blog/[slug]       │
└─────────────────────┘
          │
          ▼
   cdn.letscodeit.dev  ← note images (/uploads/notes/)
```

### Data flow (three paths)

| Path | When | Source |
| --- | --- | --- |
| **Read posts** | Page request | `blog_post_slugs` → raw GitHub → `gray-matter` + `markdown-it` |
| **Sync slugs** | `npm run build` | GitHub API listing → upsert `blog_post_slugs` + `blog-categories.generated.ts` |
| **Write assets** | Adminka note image upload | GitHub Contents API → PR squash-merge (or direct push) |

---

## Outline

### 1. The problem we were solving

- Wanted markdown in git (diffs, history, write anywhere) without running a headless CMS.
- Blog posts change rarely; notes are short and live in Postgres — long-form doesn't belong in the app DB.
- Deploying content shouldn't require redeploying the app for every typo fix — but we still need fast pages and valid slugs for likes/API.

**Keep short:** 2–3 paragraphs, no vendor bashing.

### 2. Two repos, one product

| Repo | Role |
| --- | --- |
| `blog` (this repo) | Source of truth: `posts/*.md`, frontmatter, images under `/uploads/` |
| `letscodeit.dev` | Renderer: fetch, parse, SEO, likes keyed by slug |

Posts are files, not DB rows. Categories/tags are derived from frontmatter at parse time (`letscodeit.dev/src/lib/content.ts`).

### 3. Frontmatter contract

Example for this repo:

```yaml
---
title: "GitHub as a CMS"
slug: github-as-cms-markdown-nextjs
canonical: "https://letscodeit.dev/blog/github-as-cms-markdown-nextjs"
description: "How we publish markdown from a separate GitHub repo in Next.js."
publishedAt: "2026-06-18"
category: "Industry"
tags: [nextjs, github, markdown]
featured: false
status: published
coverImage: /uploads/github-as-cms-markdown-nextjs/cover.svg
thumbnail: /uploads/github-as-cms-markdown-nextjs/thumb.svg
---
```

**Parsing:** `gray-matter` → `markdown-it` → heading anchors, table wrappers, asset URL resolution (`letscodeit.dev/src/lib/blog-content-url.ts`).

### 4. Reading posts at runtime

Key module: `letscodeit.dev/src/lib/content.ts`

1. `fetchPostFilesFromDb()` — published filenames from `blog_post_slugs` (build-synced index).
2. Fallback: `fetchPostFilesFromGithub()` if DB empty (local dev without sync).
3. `fetchMarkdown(filename)` — `CONTENT_REPO_URL/posts/{filename}` with `revalidate: 3600`, tag `blog-posts`.
4. `getAllPosts()` — `unstable_cache` + React `cache()` for per-request dedup.

**Why not read GitHub API on every request?** Rate limits + latency. DB slug index is cheap; markdown bodies are cached an hour.

**Code to cite:** `fetchPostFilesFromDb` / `fetchMarkdown` / `getAllPostsCached`.

### 5. Build-time slug sync

Key modules: `letscodeit.dev/scripts/sync-blog-post-slugs.ts`, `src/lib/blog-post-slugs.ts`

Runs on every `npm run build`:

1. `loadAllPostsFromGithub()` — full directory listing via GitHub API.
2. Upsert `blog_post_slugs` (slug, filename, status, `publishedAt`).
3. Delete stale slugs removed from repo.
4. Regenerate `src/lib/blog-categories.generated.ts` for nav labels.

**Why a DB table for slugs?**

- `POST /api/blog/[slug]/like` validates against `isPublishedBlogPostSlug()` without fetching all markdown.
- Sitemap and static paths can trust the index.
- App deploy pins "what exists" even if runtime cache is warm.

**Code to cite:** `syncPublishedBlogPostSlugs`, `isPublishedBlogPostSlug`.

### 6. Asset URLs: raw GitHub vs CDN

`letscodeit.dev/src/lib/blog-content-url.ts`:

- Post images: relative paths → `CONTENT_REPO_URL` (raw GitHub or Cloudflare Pages).
- Note images: `/uploads/notes/*` → `CONTENT_CDN_URL` (`cdn.letscodeit.dev`).

Same content repo serves blog assets and note uploads; CDN for published assets.

### 7. Writing back to GitHub (note images)

Not all content is read-only. Adminka uploads note images via `saveNoteImage()` → `uploadToBlogRepo()`.

Flow in `letscodeit.dev/src/lib/github-blog-repo.ts`:

1. If `GITHUB_CONTENT_DIRECT_PUSH=true` → PUT to `main`.
2. Else → create branch → commit file → open PR → wait mergeable → squash merge.

**Why PR flow?** Protected `main`. PAT needs merge permission or bypass.

**Validation:** magic bytes, 5 MB cap, allowed MIME types (`src/lib/note-image-upload.ts`).

### 8. Decisions we made

| Decision | Rationale |
| --- | --- |
| Separate content repo | Content PRs ≠ app PRs; non-devs can commit markdown only |
| Runtime fetch + cache, not build-time static generation of all posts | New post goes live without app redeploy (after slug sync on next build — **nuance to be honest about**) |
| `blog_post_slugs` at build | Cheap validation, likes API, category manifest |
| `gray-matter` + `markdown-it`, not MDX in repo | Simpler author experience; no React in markdown files |
| GitHub API for uploads, not S3 | One repo for all static assets; git history on images |

### 9. What we rejected

| Alternative | Why not |
| --- | --- |
| Posts in Postgres (`Post` model exists but unused for blog) | Markdown in DB is painful to edit; migrations for content |
| Full SSG of every post at build | Rebuild app for every article; slow CI |
| Git submodule in app repo | Submodule UX; wanted hard separation |
| Contentful / Sanity | Cost + complexity for a solo editorial site |
| Read GitHub API on every page view | Rate limits; slower than raw + cache |

### 10. Trade-offs (be honest)

- **New post visibility:** Markdown is cached 1h; slug appears after next app build (sync script). True "instant publish" needs `revalidateTag('blog-posts')` webhook — not shipped yet.
- **No WYSIWYG** for blog — authors use VS Code / Obsidian / github.dev.
- **Draft posts** rely on frontmatter `status: draft` — filtered at parse, but slug sync still indexes them (status field in DB).
- **Single branch** (`main`) — no preview deployments per content PR without extra work.

### 11. What we'd do differently

Candidates for the closing section:

- GitHub webhook → `revalidateTag('blog-posts')` on push to content repo.
- Preview URL for content PRs (Vercel preview + branch raw URL).
- Optional: commit markdown from adminka for notes cross-posted as blog (not built).

### 12. When this pattern fits

**Good fit:**

- Solo or small team, comfortable with git
- Publish frequency: weekly, not hourly
- Markdown + frontmatter is enough (no complex relational content)

**Poor fit:**

- Non-technical authors need a GUI
- Heavy localization / workflow / scheduling
- Sub-minute publish SLA

---

## Diagrams & assets for the post

1. Architecture diagram (above — redraw for blog)
2. Screenshot: `posts/` folder on GitHub
3. Screenshot: frontmatter in editor
4. Code snippet: slug sync loop (short)
5. Optional: sequence diagram for image upload PR flow

---

## Companion notes (same week)

| Note angle | Trigger |
| --- | --- |
| Decoupled CMS / git-based publishing product launch | *"We ship posts this way — separate repo, no Contentful"* |
| GitHub branch protection + automated merges | *"Our image uploads open a PR and squash-merge — PAT needs merge rights"* |
| raw.githubusercontent.com as origin | *"We fetch markdown from raw URLs, cache 1h — deploy doesn't block typo fixes"* |

---

## SEO

- **Title:** GitHub as a CMS: Markdown Repo + Next.js Frontend
- **Description:** How letscodeit.dev publishes blog posts from a separate GitHub repo — runtime fetch, build-time slug sync, and API uploads without Contentful.
- **Tags:** `nextjs`, `github`, `markdown`, `architecture`
- **Category:** Industry

---

## Source files (checklist when drafting)

| File (letscodeit.dev) | Use in article |
| --- | --- |
| `src/lib/content.ts` | Read path, caching, parsing |
| `src/lib/blog-post-slugs.ts` | Build sync, slug validation |
| `src/lib/github-blog-repo.ts` | Upload / PR flow |
| `src/lib/blog-content-url.ts` | CDN vs raw URL |
| `src/lib/note-image-upload.ts` | Write path example |
| `scripts/sync-blog-post-slugs.ts` | Build hook |
| `.env.example` | Env vars table |
| `prisma/schema.prisma` → `BlogPostSlug` | Why DB index exists |

---

## Publishing checklist

- [x] Write markdown in `posts/github-as-cms-markdown-nextjs.md` (this repo)
- [x] Add cover/thumb under `uploads/github-as-cms-markdown-nextjs/`
- [ ] Merge to `main`
- [ ] Deploy letscodeit.dev (runs `sync-blog-post-slugs`)
- [ ] Verify `/blog/github-as-cms-markdown-nextjs`
- [x] Update status in [content-topics.md](../content-topics.md) → `published`
