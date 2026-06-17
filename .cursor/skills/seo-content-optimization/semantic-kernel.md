# Semantic kernel — SEO + GEO keyword framework

Defines how to extract and map the **semantic kernel** (семантическое ядро) of a blog post for classic SEO and generative engine optimization (GEO). Used by `seo-content-optimization` (audit) and `blog-writing` (drafting).

## What the semantic kernel is

The semantic kernel is the structured set of search intents a post is meant to satisfy — not a keyword-stuffing list. It connects:

| Layer | Purpose | Primary surface |
|-------|---------|-----------------|
| **Head term** | Main query the page should rank for | `title`, slug, first paragraph |
| **Secondary terms** | Supporting concepts that reinforce topical authority | H2 headings, body, `tags` |
| **Long-tail / questions** | Specific phrasings people type or ask aloud | FAQ, H2 leads, answer-first paragraphs |
| **Entities** | Named tools, models, standards, acronyms | Tables, definitions, outbound links |
| **GEO queries** | Natural-language questions AI chatbots receive | FAQ questions, 40–80 word self-contained answers |

SEO and GEO share the same kernel. SEO maps head + secondary terms to metadata and headings. GEO maps questions + entities to quotable passages and tables.

## Kernel extraction — audit (existing post)

Run this **before** proposing title/description changes or reporting gaps.

### Inputs (read in order)

1. Post frontmatter: `title`, `slug`, `description`, `category`, `tags`
2. Body: H2/H3 outline, first paragraph, FAQ, tables
3. GSC data if user provides it (queries, impressions, CTR, position)
4. `.ai/seo-benchmarks.md` — category winning formula
5. `.ai/content-strategy.md` — pillar/cluster map (avoid cannibalization)
6. `post-catalog.md` — sibling posts competing for same head term

### Extraction steps

1. **Infer head term** — highest-intent query this post should own:
   - GSC: query with most impressions where page already ranks 4–20
   - No GSC: derive from slug + H1 + opening paragraph answer
2. **List secondary terms** — 4–8 supporting keywords from H2s, repeated concepts, `tags`
3. **List long-tail questions** — 3–6 real search phrasings (Reddit, SO, "People also ask" style)
4. **List entities** — proper nouns, acronyms, products, papers cited
5. **Classify intent** — informational (default), comparison, how-to, definition/glossary, opinion
6. **Map coverage** — mark each term as covered / weak / missing in current draft

### Output template (show user before metadata proposals)

```markdown
## Semantic kernel — [slug]

**Head term:** [primary keyword phrase]
**Intent:** [informational | comparison | how-to | glossary | opinion]
**Pillar:** [cluster from content-strategy.md]

| Type | Term / question | Covered? | Where |
|------|-----------------|----------|-------|
| Head | ... | ✅/⚠️/❌ | title, §... |
| Secondary | ... | ... | H2, tags |
| Long-tail | ... | ... | FAQ, body |
| Entity | ... | ... | table, link |
| GEO question | ... | ... | FAQ answer |

**Cannibalization check:** [sibling post slug or "none"]
**Gaps:** [terms missing or weak — suggest H2, FAQ, or table]
**Metadata alignment:** title [✅/⚠️], description [✅/⚠️], tags [✅/⚠️]
```

### Audit rules

- Head term must appear in `title` (natural phrasing, not exact-match stuffing)
- Head term or close variant in first 80 words (answer-first paragraph)
- Each secondary term should map to at least one H2 or dedicated subsection
- Every FAQ question should match a long-tail or GEO query from the kernel
- `tags` should mirror secondary terms (5–8 tags max)
- If two published posts share the same head term → flag cannibalization; propose angle split
- Do not add keywords the post does not substantively cover

## Kernel definition — new post (blog-writing)

Define the kernel **before** H2 outline approval. User confirms or adjusts.

### Definition steps

1. User topic + post type (A–E from blog-writing skill)
2. Pick **one head term** — specific enough to rank, broad enough for 1500+ words if Type A/B
3. Draft **4–8 secondary terms** — concepts the reader must understand
4. Draft **3–6 long-tail questions** — how people actually search
5. Draft **3–5 GEO questions** — natural-language chat queries (often longer than SEO long-tails)
6. List **entities** to name, define, or link
7. Check `post-catalog.md` + content-strategy pillar map for conflicts
8. Map terms → planned H2s and FAQ before writing prose

### Output template (present at outline stage)

Same table as audit template, with "Where" column filled with **planned** sections instead of existing ones.

### Writing constraints from kernel

| Kernel item | Where it lands |
|-------------|----------------|
| Head term | Title, slug, opening 40–80 words, one H2 |
| Secondary | H2 headings (rephrase for humans, keep term) |
| Long-tail | FAQ `###` questions or dedicated short sections |
| GEO questions | FAQ answers — self-contained 40–80 words |
| Entities | Glossary entries, comparison tables, outbound doc links |

**Anti-stuffing:** each secondary term 2–4 natural mentions in body. Never paste keyword lists into prose (see GEO post lessons).

## SEO metadata mapping

When proposing title/description variants (seo-content-optimization workflow):

| Variant field | Must reflect |
|---------------|--------------|
| Title (60–65 chars) | Head term + hook |
| Description (130–160 chars) | Head term benefit + artifact (table, FAQ, checklist) |
| `tags` | Top secondary terms |

For each title/description variant, state: **target query** (= head term or long-tail), trigger, char count.

## GEO mapping

GEO does not use a separate keyword list. It uses the **GEO questions** row from the kernel:

- Answer-first opening = direct answer to head term as a question
- Each H2 lead = answer to the section's implied question
- FAQ = long-tail + GEO questions with citable 40–80 word blocks
- Tables = entity comparisons AI tools quote verbatim

Cross-ref: [blog-writing/ai-citation.md](../blog-writing/ai-citation.md).

## GSC-enhanced extraction

When user pastes Search Console data:

1. Sort queries by impressions (position 4–20 = optimization opportunity)
2. Promote high-impression queries to head term or secondary if content supports them
3. Demote queries with high impressions but wrong intent (flag as "content gap" or "ignore")
4. Propose new FAQ items for question-shaped queries with low CTR
5. Record winning query in seo-benchmarks.md Update history when confirmed

## Examples (abbreviated)

**token-economics**

| Type | Example |
|------|---------|
| Head | LLM token economics |
| Secondary | tokenization, context window, API pricing, multilingual tokens |
| Long-tail | how much does GPT-4 cost per token |
| GEO | How do tokens affect LLM API cost? |
| Entity | tiktoken, BPE, OpenAI tokenizer |

**ai-llm-glossary**

| Type | Example |
|------|---------|
| Head | AI LLM glossary |
| Secondary | transformer, RAG, fine-tuning, embeddings |
| Long-tail | what is RAG in LLM |
| GEO | What does RAG mean in AI? |
| Entity | Claude, GPT, MCP, vector database |
