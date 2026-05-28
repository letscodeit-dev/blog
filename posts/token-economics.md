---
title: "Token Economics: What Your Text Actually Costs"
slug: "token-economics"
canonical: "https://letscodeit.dev/blog/token-economics"
publishedAt: "2026-05-28"
description: "LLM APIs charge by tokens, not words. See how language and tokenizer choice change cost—from Latin scripts to Amharic—and what a real system prompt costs at scale."
category: "AI Foundations"
tags: ["ai", "llm", "tokens", "tokenization", "api", "cost", "multilingual"]
status: "published"
featured: true
coverImage: "/uploads/token-economics/cover.svg"
thumbnail: "/uploads/token-economics/thumb.svg"
---

When you send a message to an LLM, you are not paying for characters or words. You pay for **tokens**.

A token is the unit the model splits text into before processing: every major model API bills on tokens. For an individual user, the language of a request changes what you spend—or how fast you burn through limits on a subscription. For a company handling millions of requests per day, the difference can be hundreds of thousands of dollars per year.

Many people hit token limits when using LLM agents heavily. I wanted to see how much the language of your prompts actually affects token count.

## Known tokenization problems

Modern language models use **Byte Pair Encoding (BPE)**: text is split into bytes first, then the most frequent byte pairs are merged into a single token—repeated until the vocabulary reaches the target size.

The tokenizer vocabulary is trained on a text corpus. The more often a word or syllable appears in training data, the more likely it becomes its own token.

The rule is simple: **a tokenizer is only as efficient as the exposure your language got during training.**

Note that proprietary models use their own closed tokenizers; the exact vocabulary is not published. The numbers in this article come from public tokenization tools and reflect real behavior, but internal tokenizer details can change between model versions without a public announcement.

### The multilingual gap

Most large language models were trained primarily on English text. That means the tokenizer vocabulary is dense with English words and morphemes—they often encode in a single token. Other languages look different.

When you send text in an underrepresented language, whole words are split into many small tokens. That means:

- **More tokens** → more compute per request
- **Higher API cost** for the same semantic content
- **Lower output quality**, because the model has less room left in the context window

More detail with examples below.

An important nuance: models are not only more expensive on non-Latin text—they also **perform worse**. Most internal representations and reasoning patterns were shaped on English. Working in another language spends part of the model’s “intellectual budget” on translation rather than on the task itself.

## Languages: comparative tokenization tables

Time to run some tests.

All data below uses OpenAI’s current `o200k_base` tokenizer (GPT-4o, GPT-4o mini, o1, o3, GPT-4.5, GPT-5.x). The legacy `cl100k_base` tokenizer (GPT-4, GPT-4 Turbo, GPT-3.5 Turbo) is not included in the comparison tables.

We start from English source text: *"Many words map to one token, but some don't: indivisible. Unicode characters like emojis may be split into many tokens containing the underlying bytes. Sequences of characters commonly found next to each other may be grouped together: 1234567890"*, the example used in the tokenizer at [platform.openai.com/tokenizer](https://platform.openai.com/tokenizer) (official, OpenAI only). We translate it into other languages with an LLM and compare token counts.

![English source text in the OpenAI tokenizer — 49 tokens, 246 characters](/uploads/token-economics/tokenizer-en-49.png)

**Group 1 — Basic Latin** (overhead up to +31%)

| Language | Characters | o200k | Δ vs EN |
|----------|------------|-------|---------|
| English (EN) | 246 | 49 | — |
| Spanish (ES) | 293 | 63 | +14 (+29%) |
| French (FR) | 300 | 62 | +13 (+27%) |
| German (DE) | 281 | 64 | +15 (+31%) |

All three are very close to English—the tokenizer covers Latin script well. Small overhead comes from accented characters (ü, ö, ä, é, ñ, etc.) and slightly longer translations. German is a bit pricier because of long compounds (*Zeichenfolgen*, *zugrunde*) that do not fit in the vocabulary as whole tokens.

**Group 2 — Cyrillic and CJK** (overhead +27–96%)

| Language | Characters | o200k | Δ vs EN |
|----------|------------|-------|---------|
| Russian (RU) | 275 | 74 | +25 (+51%) |
| Ukrainian (UK) | 266 | 88 | +39 (+80%) |
| Belarusian (BE) | 279 | 96 | +47 (+96%) |

![Russian text in the OpenAI tokenizer — 72 tokens, 274 characters](/uploads/token-economics/tokenizer-ru-72.png)

Belarusian vs Ukrainian vs Russian — 96 / 88 / 74 tokens on the same alphabet. The gap reflects training data volume: the fewer texts the model saw in a language, the fewer words made it into the tokenizer vocabulary.

| Language | Characters | o200k | Δ vs EN |
|----------|------------|-------|---------|
| Chinese Simp. (ZH) | 92 | 62 | +13 (+27%) |
| Korean (KO) | 142 | 78 | +29 (+59%) |
| Arabic (AR) | 228 | 75 | +26 (+53%) |
| Thai (TH) | 200 | 87 | +38 (+78%) |
| Japanese (JA) | 148 | 95 | +46 (+94%) |
| Georgian (KA) | 279 | 91 | +42 (+86%) |
| Armenian (HY) | 285 | 88 | +39 (+80%) |

Chinese is surprisingly efficient: only +27% vs English despite logographic writing. One character often carries the meaning of a whole word, and the tokenizer covers frequent characters well.

![Japanese text in the OpenAI tokenizer — 95 tokens, 148 characters](/uploads/token-economics/tokenizer-ja-95.png)

The Japanese paradox: one of the shortest translations by character count (148 vs 246 for EN), but nearly 2× the token cost. Mixing three writing systems (hiragana, katakana, kanji) makes tokenization harder.

**Group 3 — “Token-heavy” scripts** (overhead +80–549%)

| Language | Characters | o200k | Δ vs EN |
|----------|------------|-------|---------|
| Hindi (HI) | 247 | 89 | +40 (+82%) |
| Bengali (BN) | 240 | 89 | +40 (+82%) |
| Gujarati (GU) | 232 | 84 | +35 (+71%) |
| Tamil (TA) | 286 | 98 | +49 (+100%) |
| Sinhala (SI) | 226 | 122 | +73 (+149%) |
| Telugu (TE) | 256 | 112 | +63 (+129%) |
| Khmer (KM) | 299 | 138 | +89 (+182%) |
| Burmese (MY) | 308 | 144 | +95 (+194%) |
| Amharic (AM) | 184 | 318 | +269 (+549%) |

Most languages in this group improved sharply from GPT-4 to current models: Georgian from 486 to 91, Armenian from 495 to 88, Burmese from 544 to 144. That came from expanding the tokenizer vocabulary in o200k.

The exception is **Amharic**: the only language where the transition barely helped (+549% vs +735% on the legacy tokenizer). OpenAI hardly expanded the Amharic portion of the vocabulary.

Note: Amharic is one of Ethiopia’s main languages and a working language of the federal government.

![Amharic text in the OpenAI tokenizer — 318 tokens, 184 characters. Each character is split into its own token](/uploads/token-economics/tokenizer-am-318.png)

### Comparing tokenizers across models

For cross-model comparison I use [tiktokenizer.vercel.app](https://tiktokenizer.vercel.app/)—it supports several tokenizers and is handy for side-by-side checks.

The same text in different languages is measured on four tokenizers: o200k (OpenAI: GPT-4o, o1, GPT-5.x), DeepSeek-V3, Qwen3, and Llama 3.3. Rare languages are omitted here.

| Language | Characters | o200k (GPT) | DeepSeek-V3 | Qwen3 | Llama 3.3 |
|----------|------------|-------------|-------------|-------|-----------|
| English (EN) | 246 | 49 | 55 | 57 | 52 |
| Spanish (ES) | 293 | 63 (+29%) | 70 (+27%) | 73 (+28%) | 68 (+31%) |
| French (FR) | 300 | 62 (+27%) | 71 (+29%) | 77 (+35%) | 72 (+38%) |
| German (DE) | 281 | 64 (+31%) | 77 (+40%) | 83 (+46%) | 79 (+52%) |
| Russian (RU) | 273 | 71 (+45%) | 76 (+38%) | 91 (+60%) | 83 (+60%) |
| Chinese Simp. (ZH) | 92 | 62 (+27%) | **46 (−16%)** | 55 (−4%) | 61 (+17%) |

**What stands out:**

- **Chinese is cheaper than English** on DeepSeek-V3 (−16%) and nearly even on Qwen3 (−4%)—both tokenizers are optimized for Chinese: characters are encoded as whole words and bigrams, not byte-by-byte. For the first time in these tables, a language beats English on efficiency.

- **o200k (GPT-4o, o1, GPT-5.x) is consistently best for European languages.** For Russian, the delta vs English is slightly worse than DeepSeek (+45% vs +38%), but better than Qwen3 and Llama 3.3 (+60%).

- **Russian on Asian-origin models:** DeepSeek-V3 gives the best Cyrillic result (+38%)—Russian-language content is well represented in Chinese models’ training data. Qwen3 and Llama 3.3 both land at +60%.

- **European languages (DE/FR/ES)** stay within +27–52% of English—small gaps, roughly similar across tokenizers.

**Academic references:**

- Petrov et al. (2023) — "Language Model Tokenizers Introduce Unfairness Between Languages" `arXiv:2305.15425` — measures "fertility" (tokens per word) for 164 languages
- Rust et al. (2021) — "How Good is Your Tokenizer?" `arXiv:2012.15613`

### Practical takeaway: a real system prompt

Now for the interesting part—what this costs in practice.

Take a simple SaaS support system prompt (~280 words, ~1300–1640 characters depending on language). Translations were done with an LLM.

**Token counts by language and tokenizer**

| Language | Characters | o200k | DeepSeek-V4 | Qwen3 | Llama 3.3 |
|----------|------------|-------|-------------|-------|-----------|
| English (EN) | 1294 | 280 | 287 | 287 | 284 |
| Spanish (ES) | 1458 | 332 (+19%) | 382 (+33%) | 376 (+31%) | 379 (+33%) |
| French (FR) | 1637 | 373 (+33%) | 424 (+48%) | 433 (+51%) | 430 (+51%) |
| German (DE) | 1608 | 374 (+34%) | 434 (+51%) | 448 (+56%) | 444 (+56%) |
| Russian (RU) | 1372 | 346 (+24%) | 399 (+39%) | 444 (+55%) | 409 (+44%) |
| Chinese Simp. (ZH) | 500 | 295 (+5%) | 261 (−9%) | 268 (−7%) | 313 (+10%) |

Russian on o200k is +24% vs English. The gap is modest, but at high volume it still matters: at 1M requests per day that is 66,000 extra tokens.

![English system prompt, o200k tokenizer — 280 tokens](/uploads/token-economics/tokenizer-system-en-o200k.png)

Chinese again beats English on DeepSeek-V4 (−9%) and Qwen3 (−7%). The Chinese translation uses 2.6× fewer characters (500 vs 1294)—each character carries more meaning.

![English system prompt, DeepSeek tokenizer — 286 tokens](/uploads/token-economics/tokenizer-system-en-deepseek.png)

![Chinese system prompt, DeepSeek tokenizer — 260 tokens (less than English)](/uploads/token-economics/tokenizer-system-zh-deepseek.png)

![Chinese system prompt, o200k tokenizer — 295 tokens](/uploads/token-economics/tokenizer-system-zh-o200k.png)

![Chinese system prompt, Qwen2.5-72B tokenizer — 268 tokens](/uploads/token-economics/tokenizer-system-zh-qwen.png)

**System prompt cost at 1M requests**

Input token prices (no cache / with cache). Accurate as of May 2026.

| Language | GPT-5.4 | GPT-5.4-mini | DeepSeek-V4-flash | Qwen3.5-plus |
|----------|---------|--------------|-------------------|--------------|
| Price / 1M tok | $2.50 / $0.25 | $0.75 / $0.075 | $0.14 / $0.0028 | $0.40 / $0.04 |
| English (EN) | $700 / $70 | $210 / $21 | $40 / ~$1 | $115 / $11 |
| Spanish (ES) | $830 / $83 | $249 / $25 | $53 / ~$1.5 | $150 / $15 |
| French (FR) | $932 / $93 | $280 / $28 | $59 / ~$1.5 | $173 / $17 |
| German (DE) | $935 / $94 | $280 / $28 | $61 / ~$1.5 | $179 / $18 |
| Russian (RU) | $865 / $86 | $260 / $26 | $56 / ~$1.5 | $178 / $18 |
| Chinese Simp. (ZH) | $738 / $74 | $221 / $22 | $37 / ~$1 | $107 / $11 |

> Llama 3.3-70B (Groq) does not support prompt caching as of May 2026.
> Qwen3.5-plus pricing is from Qwen’s official site; token counts in the table above were measured with Qwen3-235B-A22B (open-source). Both likely use Qwen2Tokenizer, but there is no official confirmation that the tokenizers are identical.

**Notable observations:**

- **DeepSeek-V4-flash is 5–19× cheaper than GPT-5.4** for the same text and language. A Chinese prompt on DeepSeek costs $37 per 1M requests—roughly **$0.000037 per request**.
- **Without cache:** GPT-5.4 is **~15–19×** more expensive than DeepSeek-V4-flash depending on language. GPT-5.4-mini is **~4–5×**.
- **With cache:** GPT-5.4 ($70–94) vs DeepSeek-V4-flash (~$1–2)—the gap grows to **~57×**, because DeepSeek’s cache discount is 50× vs GPT-5.4’s 10×. GPT-5.4-mini with cache ($21–28) vs DeepSeek-V4-flash with cache (~$1–2) is **~15–20×**.
- **Russian is not the most expensive** on o200k: $865 vs $932–935 for French and German.
- **Chinese is cheaper than English** on DeepSeek and Qwen3 thanks to tokenizer optimization for characters.

**So is it worth it, or penny-pinching?**

It all depends on token price—for cheap models the savings are small but real. With prompt caching, the language effect is close to zero.

For a typical user, the language of a prompt probably does not matter much.

For a business, it can.

## Conclusion

**Language matters, but less than it used to.** Current tokenizers (o200k) improved the picture for most languages. Russian on GPT-5.x costs only 24% more than English—that is no longer a disaster. But for Amharic, Burmese, and several others, the problem remains acute. Model and tokenizer choice affect cost as much as price per token: DeepSeek with cache can be 50–60× cheaper than GPT-5.4 with cache on the same text.

Understanding tokenization helps you make deliberate choices: which language to write prompts in, how to format data, when to enable cache, and how to structure a conversation. It is not complicated—but you need to know the variable exists.
