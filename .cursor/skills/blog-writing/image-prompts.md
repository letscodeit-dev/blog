# Image and diagram prompts

Generate prompt blocks for each H2 (after intro) when drafting new posts. User creates assets in Figma or an image tool.

## Inline assets (this repo)

```
uploads/[slug]/cover.svg       — coverImage
uploads/[slug]/thumb.svg       — thumbnail
uploads/[slug]/figures/*.svg   — diagrams
uploads/[slug]/*.png           — screenshots
```

Markdown: `![alt text](/uploads/[slug]/filename.png)`

## Prompt block template

For each H2 section, output:

```
Image prompt — section [N]:
[Detailed description. Style: clean diagram, terminal screenshot mockup, infographic, or split comparison. Specific UI elements or data viz. Dark or light theme — match post tone.]

Aspect ratio: [16:9 hero | 4:3 inline | 1:1 social]

Alt text: [8–15 words, describes what the image shows]

Filename: [section-keyword].png or figures/[name].svg
```

## Alt text rules

- Describe content: "English source text in OpenAI tokenizer, 49 tokens"
- Not: "tokenizer screenshot" or "image 1"

## When screenshots are enough

For tokenizer tests, API dashboards, or course UIs: describe what to capture instead of generating art. Specify browser URL, visible metrics, and crop.

## Out of scope

This skill produces prompts and paths only. It does not generate SVG/PNG files.
