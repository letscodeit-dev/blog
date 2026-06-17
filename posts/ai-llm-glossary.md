---
title: "Developer's AI glossary: tokens, RAG, agents in plain English"
slug: "ai-llm-glossary-terms-every-developer-should-know"
canonical: "https://letscodeit.dev/blog/ai-llm-glossary-terms-every-developer-should-know"
publishedAt: "2026-05-06"
description: "Plain-English definitions for LLM, RAG, embeddings, RLHF, and agents. 30+ terms with analogies, a comparison table, FAQ, and links to deeper guides."
category: "AI Foundations"
tags: ["ai", "llm", "beginners", "prompt-engineering", "embeddings", "rag"]
status: "published"
featured: false
coverImage: "/uploads/ai-llm-glossary/cover.svg"
thumbnail: "/uploads/ai-llm-glossary/thumb.svg"
---

This glossary defines 30+ AI and LLM terms in plain English: tokens, context windows, RAG, embeddings, fine-tuning, plus agent vocabulary. Each entry has a short definition plus an analogy, the way I'd explain it to a colleague who builds software but skipped the ML lecture series. Skip terms you already know.

## Foundations

These are the umbrella terms. They nest like Russian dolls: AI is the broadest, ML sits inside it, DL inside ML, and most LLMs are built on deep learning.

| Term | Scope | Typical example |
|------|-------|-----------------|
| AI | Any system that mimics human-like intelligence | Spam filter, Netflix recommendations |
| ML | Learns patterns from data instead of hand-written rules | Fraud detection from transaction history |
| DL | ML with deep (many-layer) neural networks | Face recognition, speech-to-text |
| LLM | DL model trained on text at massive scale | GPT-4, Claude, Llama, Gemini |

For the LLM-to-subagent product stack, see the [complete guide to models and agents](/blog/complete-guide-llms-models-agents-subagents).

### AI (Artificial Intelligence)

**Definition:** The broad field of making machines perform tasks that normally need human intelligence: recognizing images, understanding language, making decisions.

Netflix recommending a show is AI. A spam filter is AI. ChatGPT is AI. Wildly different systems, same umbrella label.

The term gets thrown around until it means almost nothing. When someone says "we use AI," ask what kind: a decision tree, a vision model, or a 100B-parameter language model?

### ML (Machine Learning)

**Definition:** A subset of AI where machines learn patterns from data instead of following explicit, hand-written rules.

Traditional programming is giving someone a recipe. Machine learning is showing them a hundred dishes and letting them infer the recipes.

Instead of writing rules like "if an email contains 'FREE' and three exclamation marks, mark it as spam," you feed a model thousands of labeled emails and let it discover the patterns. Sometimes it picks up signals a human would miss, like certain fonts correlating with spam.

### DL (Deep Learning)

**Definition:** A subset of machine learning that uses neural networks with many layers ("deep"). Strong at vision and speech, especially language tasks.

Face ID on your phone is deep learning. The model runs your face through dozens of layers, each extracting finer features, until it can say "yes, that's you."

"Deep" just means "lots of layers." Three layers isn't deep. Fifty is.

### Neural Network

**Definition:** A computing system inspired by biological brains: layers of interconnected nodes (neurons). Each connection has a weight; training adjusts those weights.

Picture a conveyor belt of tiny calculators. Each takes input, multiplies, compares, then passes output along. Thousands of micro-decisions add up to "this is a cat" or "this is fraud." Nobody programmed those decisions. They emerged after many training iterations.

A simple fraud-detection network might chain: transaction amount → location → time of day → purchase history. Each layer combines signals into a probability.

### Model

**Definition:** A trained neural network (or any ML system) that can predict or generate output. The frozen result of training: architecture plus learned weights.

Think of a chef who finished culinary school. Architecture is the kitchen. Training is practice. The model is the chef, ready to cook alone.

Major foundation models include GPT-4 along with Claude and Llama. After training they answer questions and write code. "Hold conversations" is generous: they sometimes state wrong things with full confidence. More on that under hallucination.

### Training

**Definition:** Teaching a model by showing data and adjusting weights to minimize error. Computationally brutal: days or weeks on thousands of GPUs.

Like a student doing practice problems: attempt, check, adjust. After thousands of reps, patterns stick.

Training a language model means feeding trillions of tokens scraped from the open web plus books and articles. Each step the model predicts the next token, gets feedback, and adjusts. Over billions of steps it picks up grammar and factual patterns.

Cost: millions in compute. Time: months. That is why almost nobody trains foundation models from scratch.

### Inference

**Definition:** Running a trained model on new input. What happens when you actually *use* the model. Usually far faster and cheaper than training.

Training is studying for an exam. Inference is taking it.

When you type into ChatGPT and get a reply, that is inference. The model is already trained; it applies learned patterns to your input. Every API call is inference. For what those calls cost in tokens, see [token economics](/blog/token-economics).

## LLM Core

These are the terms you hear in every AI product meeting.

### LLM (Large Language Model)

**Definition:** A neural network trained on massive text to understand and generate language. "Large" usually means billions of parameters.

An LLM is like someone who read a huge slice of the internet and internalized how language works. Imperfect recall, yet strong patterns for grammar and tone.

Models like GPT-4, Claude, Llama, or Gemini are LLMs. One underlying model can write essays, translate, generate code, and answer questions. That flexibility is what separates them from older single-purpose AI.

### Token & Tokenization

These two belong together.

**Token:** The basic unit of text an LLM processes. Can be a whole word, a subword, or a single character.

Tokens are LEGO bricks. "cat" is one brick. "un-believ-able" needs several. The model sees bricks, not words as you type them.

**Tokenization:** Splitting text into tokens before the model reads it.

"I can't believe it!" might become `["I", " can", "'", "t", " believe", " it", "!"]` (7 tokens). Rule of thumb: about 4 characters or ¾ of an English word per token.

"running" might split into `["run", "ning"]` because "-ning" is a common suffix. "the" stays one token because it is everywhere.

Why care? API billing is per token. Odd tokenization also explains weak spelling and arithmetic: the model literally does not see characters the way you do.

### Context Window

**Definition:** The max tokens an LLM can handle in one request (input plus output). Its working memory.

A small desk (4K tokens) fits a few pages. A huge desk (200K tokens) fits a book plus notes. Anything that falls off the edge is forgotten.

128K context can hold a long PDF and Q&A on it. 4K fits a short thread.

Capacity is not the same as quality. Many models handle the start and end of context well but get fuzzy in the middle ("lost in the middle"). Plan accordingly for long documents.

### Parameters

**Definition:** Internal weights and biases of a network, tuned during training. Parameter count is a rough capacity gauge.

More parameters mean more room to store patterns. A 7B model has 7 billion adjustable knobs.

GPT-3 has 175B parameters. Llama 3 ships from 8B to 70B. More parameters usually mean more capability and more cost, but architecture and training data matter as much as size.

### Transformer

**Definition:** The architecture behind modern LLMs. Introduced in the 2017 paper ["Attention Is All You Need"](https://arxiv.org/abs/1706.03762). Transformers use attention to weigh all input tokens at once.

Older models read left to right and tried to remember everything. Transformers read the full sequence and highlight what matters for each prediction.

In "The bank was flooded, so I went to the other bank," attention uses surrounding words to disambiguate river bank vs financial bank.

Transformers are why LLM quality jumped after 2017. Earlier architectures were stepping stones.

## Prompt Engineering

Terms you use when talking to an LLM in production.

### Prompt

**Definition:** The input text you send to get a response: a question, instruction, partial sentence, or mix.

A prompt is a question to a knowledgeable friend. Vague question, vague answer. "Tell me about dogs" vs "Golden retriever vs labrador for a family with toddlers" changes everything.

"Write a poem" is a prompt. "Write a haiku about debugging production at 2 AM" is better: specific, contextual, constrained.

### System Prompt

**Definition:** A hidden instruction that sets behavior for the whole conversation. Like a job description before the chat starts.

Regular prompt = question. System prompt = role. Example: "You are a senior reviewer. Be direct, cite bugs, show fixed code."

ChatGPT's default system prompt includes "You are a helpful assistant." Apps override it for tone and safety rules.

### Zero-shot, One-shot, Few-shot

Three techniques on a spectrum of how many examples you give before the task.

| Technique | Examples shown | When it helps |
|-----------|----------------|---------------|
| Zero-shot | 0 | Simple tasks the model already knows |
| One-shot | 1 | Format or tone you want copied once |
| Few-shot | 2–10 | Consistent classification or extraction |

**Zero-shot:** Ask without examples. "Translate to French: Hello, how are you?"

**One-shot:** One demo, then the task. "Convert to emoji: 'I had a great day' → 😊🌟. Now: 'The meeting was boring' → ?"

**Few-shot:** Several demos. Sentiment examples with labels, then a new sentence to classify.

Going from zero-shot to few-shot is often the cheapest prompt upgrade. Try it before fancy tooling.

### Temperature

**Definition:** A setting (often 0.0–2.0) controlling randomness. Low = deterministic. High = creative variance.

For code generation, use 0.1–0.3: boring and correct wins. For brainstorming, 0.8–1.2: surprises included, not all good.

### Top-p (Nucleus Sampling)

**Definition:** Controls randomness by keeping only the smallest set of likely next tokens whose combined probability exceeds *p*. Lower top-p = tighter sampling.

The model ranks next-token candidates. Top-p 0.9 might keep "the," "a," "my" and drop "pineapple" even if probability is non-zero.

Most teams tweak temperature and leave top-p at 1.0. That is fine for common cases.

## Fine-tuning & Training

How you adapt a general model to your domain.

### Pre-training

**Definition:** The first massive training pass on a huge text corpus. Where general language skill comes from.

Like general education: broad reading before any specialty. You are not specialized yet. You still have foundation knowledge.

GPT-4 pre-training consumed trillions of tokens and months of compute. Output: a general model that does many things adequately.

Unless you are at a well-funded lab, you consume pre-trained models; you do not run pre-training yourself.

### Fine-tuning

**Definition:** Further training a pre-trained model on a smaller, domain-specific dataset.

Pre-training = general education. Fine-tuning = residency in one field.

Fine-tune on legal docs for a legal assistant, or on internal wikis so the model knows your product names and policies.

### RLHF (Reinforcement Learning from Human Feedback)

**Definition:** Humans rank model outputs; the model learns to prefer higher-rated responses. How many chatbots learn to be helpful and refuse harmful requests.

Like a teacher marking essays: "this answer beats that one." Scale that to thousands of raters.

Without RLHF, a model might happily continue toxic or dangerous text because it pattern-matches training data. RLHF teaches preference for safe, useful answers. It also over-refuses sometimes; that tradeoff is still being tuned.

### LoRA (Low-Rank Adaptation)

**Definition:** Fine-tune by updating a small low-rank matrix instead of all weights. Cuts GPU memory and cost sharply.

Like adding a turbo instead of rebuilding the engine. A 70B full fine-tune wants a datacenter; LoRA often runs on one strong GPU by training ~0.1% of parameters.

LoRA is a big reason open-source fine-tuning took off on consumer hardware.

### Embeddings

**Definition:** A numeric vector representing text meaning. Similar concepts sit close in vector space; you can compare and search mathematically.

Embeddings are GPS coordinates for ideas. "King" sits near "queen." Fruit "apple" sits farther from Apple Inc. Classic demo: vector("king") minus vector("man") plus vector("woman") lands near vector("queen").

Search for "fix broken screen" can match "repair cracked display" without shared keywords because embeddings capture meaning.

Embeddings power RAG pipelines and semantic search. Once they click, half the AI stack makes sense.

## RAG & Tools

Terms for building apps that use live data and tools.

### RAG (Retrieval-Augmented Generation)

**Definition:** Retrieve relevant documents from an external store, inject them into the prompt, then generate an answer. Combines model fluency with fresh or private data.

Closed-book = exam from memory. Open-book RAG = exam with notes you fetch first.

A support bot with RAG searches current docs instead of stale training weights, pulls the right section, and answers from that text. For most internal Q&A products, RAG beats fine-tuning on cost and freshness. Structure those answers for AI citation too; see [what GEO actually tested on our blog](/blog/generative-engine-optimization-what-i-tested).

### Vector Database

**Definition:** Storage optimized for embeddings and fast similarity search across millions of vectors.

A SQL database indexes by ID or date. A vector DB indexes by meaning and returns nearest neighbors.

Pinecone, Weaviate, or Milvus are common choices. You embed documents once, embed the user query at runtime, retrieve top matches, pass them to the LLM.

That retrieval layer is what makes RAG scale beyond brute-force cosine loops.

### Semantic Search

**Definition:** Search by meaning, not exact keywords. Powered by embeddings.

Keyword search finds literal matches. Semantic search finds conceptually related pages even when wording differs.

Query "affordable vacation spots" can surface "budget-friendly destinations" without shared tokens.

### Agents

**Definition:** An AI system that plans steps, calls tools, and acts with limited autonomy. It runs workflows, not only chat replies.

A plain LLM advises. An agent might search the web, run scripts, query a DB, and write a file.

Task: "Research competitors and draft a comparison." An agent might search, scrape pricing, outline sections, and save a doc. Powerful and brittle: more autonomy means more failure modes. Start with single tool calls before full agent loops. Stack context: [LLMs, models, agents, subagents](/blog/complete-guide-llms-models-agents-subagents).

### Function Calling (Tool Use)

**Definition:** The model emits a structured request to call an external function (API, SQL, calculator). Your app runs it and returns results to the model.

The model is the manager who cannot touch the tools but specifies exactly which one and with what args.

User: "Weather in Tokyo?" Model outputs `get_weather(city="Tokyo")`. Your code calls the API, feeds JSON back, model replies in natural language.

Function calling is the primitive beneath agents.

## Evaluation & Safety

How you measure quality and limit harm.

### Hallucination

**Definition:** Fluent output that is factually wrong or fabricated. The model sounds sure anyway.

Like a student bluffing an oral exam with confident nonsense.

Ask "When did someone first walk on Proxima Centauri b?" and you may get a plausible year for an event that never happened. The model completes text; it does not verify facts unless you add retrieval or tools.

Hallucinations are the top production headache for LLM features. If you ship without a mitigation plan, you will find out from users.

### Benchmark

**Definition:** Standardized tests to compare models on tasks like reasoning, code, or math.

SAT for models: imperfect but shared vocabulary.

MMLU covers dozens of subjects. HumanEval tests code generation. GSM8K tests grade-school math. Vendor claims like "86.4% on MMLU" refer to these suites.

### Guardrails

**Definition:** Filters and policies between model output and users: block PII, redirect unsafe topics, force human review.

Bowling bumpers: they do not change how you bowl, they stop gutter balls.

A customer bot might block medical diagnoses, strip secrets, and escalate edge cases.

### Alignment

**Definition:** Research and training aimed at making AI behavior match human intent and values, not just literal prompts.

Genie vs wise advisor: aligned systems infer harmful intent and refuse or redirect.

Ask how to DDoS a competitor and an aligned model should refuse and suggest legitimate alternatives. Full alignment remains unsolved.

## Where to Go From Here

These fundamentals change slowly even when headlines do not.

**Try it.** Open any LLM. Change temperature. Write a few-shot prompt. Add a system prompt. Hands-on beats reading.

**Follow primary sources.** arXiv papers, Anthropic and OpenAI engineering posts, Hugging Face docs. For structured courses, [Anthropic Academy's free track](/blog/anthropic-academy-guide-free-ai-courses) is a sane starting point.

**Build small.** A RAG demo with a vector store, a LoRA fine-tune on a narrow task, or one function-calling endpoint cements vocabulary faster than scrolling definitions.

New terms appear weekly. With this set you can read release notes and architecture posts without feeling lost.

## A Few Hot Takes

**Bigger is not always better.** A 70B general model can lose to an 8B model fine-tuned (or RAG-augmented) for your task. LoRA makes specialization cheap.

**RAG before fine-tuning in most cases.** Cheaper, faster to iterate, and often more accurate for factual Q&A on your docs. Fine-tune when behavior or style must change inside the weights.

**Benchmarks are proxies.** Great MMLU scores do not guarantee your workflow works. Test on your data and your prompts.

## Frequently asked questions

### What is the difference between an LLM and a chatbot?

An LLM is the trained model that predicts text. A chatbot wraps that model with system prompts, memory, RAG retrieval, guardrails, plus UI. ChatGPT is a product; GPT-4 is a model inside it.

### What is RAG in simple terms?

RAG retrieves relevant documents from your knowledge base, puts them in the prompt, and asks the model to answer using that context. It reduces hallucinations on company-specific facts and keeps answers current without retraining.

### How many tokens fit in a context window?

It depends on the model (4K to 200K+ tokens). Input and output share the limit. Rough guide: 1 token ≈ 4 English characters. Long contexts do not guarantee the model uses the middle sections well.

### Should I fine-tune or use RAG for my company docs?

Start with RAG. It is faster to ship and easier to update when docs change. Fine-tune when you need consistent tone, format, or behavior that prompting and RAG cannot hold.
