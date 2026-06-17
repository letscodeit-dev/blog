# Image assets — generation and validation

Rules for cover, thumbnail, inline diagrams, and screenshots in `uploads/`.

## Folder layout

```
uploads/[asset-folder]/
  cover.svg              # required — frontmatter coverImage
  thumb.svg              # required — frontmatter thumbnail
  figures/*.svg          # inline diagrams (Type A, B)
  *.png                  # screenshots (experiments, tokenizer, UI)
```

**`[asset-folder]`** is usually a short kebab-case name (`token-economics`, `geo-generative-engine-optimization`). It may differ from frontmatter `slug`. Paths in frontmatter and markdown must match the real folder name.

## Required assets per post type

| Type | cover + thumb | Inline figures | Screenshots |
|------|---------------|----------------|-------------|
| A — Concept deep-dive | required | 1–2 SVG diagrams recommended | optional (data evidence) |
| B — Comprehensive guide | required | 2–4 SVG diagrams | rare |
| C — Glossary | required | optional | rare |
| D — Opinion | required | optional | rare |
| E — Resource roundup | required | optional | optional (UI captures) |

Every published post needs **cover.svg** and **thumb.svg** even if the body has no inline images.

## Visual style (match existing blog)

Reference: `uploads/token-economics/cover.svg`, `uploads/complete-guide-llms-models-agents-subagents/figures/`.

| Element | Value |
|---------|--------|
| Background | `#ffffff` (cover/figures) or brand gradient on some covers |
| Surface cards | `#eeefe9`, `#fdfdf8` |
| Text / lines | `#1e1f23` |
| Accent | `#f54e00` |
| Muted fills | `#bfc1b7`, `#8a8d86` |
| Font | `ui-monospace, SFMono-Regular, Menlo, monospace` |
| Grid lines | `#1e1f23` at 8–16% opacity |
| Corner radius | 8–16px on cards |

Tone: technical editorial, not stock illustration. Monospace labels, schematic UI, comparison tables as graphics.

## Dimensions

| Asset | viewBox | Notes |
|-------|---------|--------|
| `cover.svg` | `0 0 1920 640` | Hero / OG; `preserveAspectRatio="xMidYMid slice"` |
| `thumb.svg` | `0 0 352 244` | Listing card thumbnail |
| `figures/*.svg` | `0 0 960 560` typical | Inline article width |

## SVG authoring rules (critical)

Broken SVG will not render in Cursor, browsers, or on the CDN.

1. **ASCII-only text** inside `<text>` nodes. Use `-` and `|` instead of em-dash, middle dot, arrows, ellipsis.
2. **Escape XML entities**: `&amp;` for `&`, `&lt;` for `<`.
3. **No control characters** (ASCII 0–31 except tab/LF in structure).
4. **Valid XML**: every SVG must pass `xmllint --noout file.svg`.
5. **Accessibility**: root `<svg>` needs `role="img"` and `<title id="...">` referenced by `aria-labelledby`.
6. **`<defs>` before use**: place markers, gradients, and filters before elements that reference them.
7. **Self-contained**: no external fonts, images, or CSS URLs.

## PNG screenshots

- Real captures from browser/tools (tokenizer, dashboards, course UIs).
- Descriptive filename: `tokenizer-en-49.png`, not `image1.png`.
- Alt text must state what is visible and key numbers on screen.

## Markdown image syntax

```markdown
![English tokenizer screenshot showing 49 tokens](/uploads/token-economics/tokenizer-en-49.png)
```

Rules:

- Path starts with `/uploads/`
- Alt: **8–15 words**, describes content (not "image" or "figure 1")
- Same path must exist on disk
- Prefer SVG for diagrams; PNG for photographic screenshots

## Frontmatter paths

```yaml
coverImage: "/uploads/[asset-folder]/cover.svg"
thumbnail: "/uploads/[asset-folder]/thumb.svg"
```

Must match real files. Site resolves `/uploads/...` to CDN at render time.

## Generation workflow (agent)

When drafting or finishing a post:

1. Pick `asset-folder` name; create `uploads/[asset-folder]/`.
2. Generate **cover.svg** and **thumb.svg** first (same visual concept, different crop).
3. For each major H2 that needs a diagram, add `figures/[topic].svg`.
4. For experiments, capture or specify PNG screenshots with exact filename and alt text.
5. Wire paths into frontmatter and markdown `![...]()` references.
6. Run image validator (below); fix until **PASS**.
7. Open one SVG in editor or browser to confirm it renders.

## Image prompt template (per H2 diagram)

```
Image prompt — section [N]:
[Schematic diagram. Style: monospace labels, #1e1f23 + #f54e00 accent, white/#eeefe9 cards.
 Specific elements and layout. No decorative clipart.]

Aspect ratio: 16:9 (960x560 viewBox) | 4:3 inline

Alt text: [8–15 words]

Filename: figures/[section-keyword].svg
```

## Validation (mandatory before delivery)

```bash
node .cursor/skills/blog-writing/scripts/validate-images.mjs posts/your-post.md
```

Checks:

- `coverImage` and `thumbnail` files exist
- Every `![...](/uploads/...)` path exists
- SVG files are well-formed XML (via `xmllint` when installed)
- No invalid control characters in SVG text
- Alt text present; warns if outside 8–15 words
- cover/thumb viewBox dimensions (warn)

Run together with draft validator:

```bash
node .cursor/skills/blog-writing/scripts/validate-draft.mjs posts/your-post.md
node .cursor/skills/blog-writing/scripts/validate-images.mjs posts/your-post.md
```

## Self-check output (paste before delivery)

```
Image validation:
- cover.svg: [exists | viewBox]
- thumb.svg: [exists | viewBox]
- Inline images: [N] referenced, [N] on disk
- SVG xmllint: [pass / fail list]
- Validator: [PASS / FAIL]
```
