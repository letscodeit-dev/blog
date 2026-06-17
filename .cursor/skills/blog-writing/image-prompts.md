# Image prompts

Full rules: **[image-assets.md](image-assets.md)** (style, dimensions, SVG safety, validation).

## Quick reference

```
uploads/[asset-folder]/
  cover.svg    — 1920x640 viewBox
  thumb.svg    — 352x244 viewBox
  figures/*.svg
  *.png
```

Validate before delivery:

```bash
node .cursor/skills/blog-writing/scripts/validate-images.mjs posts/your-post.md
```

## Prompt template (per H2 diagram)

```
Image prompt — section [N]:
[Schematic diagram. Monospace labels, #1e1f23 + #f54e00, white/#eeefe9 cards.]

Aspect ratio: 960x560 viewBox for figures

Alt text: [8–15 words]

Filename: figures/[section-keyword].svg
```

Generate SVG in ASCII-only text. Run validator after creating files.
