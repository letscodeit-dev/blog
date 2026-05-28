---
title: "AI & LLM Glossary: Terms Every Developer Should Know"
slug: "ai-llm-glossary-terms-every-developer-should-know"
canonical: "https://letscodeit.dev/blog/ai-llm-glossary-terms-every-developer-should-know"
publishedAt: "2026-05-06"
description: "A plain-English field guide to AI and LLM terminology - definitions, analogies, and context for terms like RAG, RLHF, embeddings, and prompt engineering, without needing a CS degree."
category: "AI Foundations"
tags: ["ai", "llm", "beginners", "prompt-engineering", "embeddings", "rag"]
status: "published"
featured: false
coverImage: "/uploads/ai-llm-glossary/cover.svg"
thumbnail: "/uploads/ai-llm-glossary/thumb.svg"
---

If you've been around tech lately, you've probably opened an article and immediately wanted to close it - AI, ML, LLM, RAG, RLHF... It feels like everyone started speaking a language you forgot to learn. But beneath the buzzwords are real concepts - and once you understand them, the whole field clicks into place.

This guide is for anyone who wants to understand AI terminology without a computer science degree. I'm not going to dump academic definitions on you. I'll explain these the way I'd explain them to a colleague over coffee. If you already know a term - just scroll past it.

## Foundations

Let's start with the big picture. These terms nest inside each other: AI is the broadest, ML sits inside it, and DL sits inside ML. Think Russian dolls, but with more matrix multiplication.

### AI (Artificial Intelligence)

**Definition:** The broad field of making machines that can perform tasks that normally require human intelligence - recognizing images, understanding language, making decisions, all of it.

Netflix recommending a show is AI. A spam filter is AI. ChatGPT is AI. They're wildly different systems, but they all fall under the same umbrella.

The term gets thrown around so much it's almost lost its meaning. When someone says "we use AI," they could mean anything from a simple decision tree to a multi-billion-parameter language model. Always ask: what kind?

### ML (Machine Learning)

**Definition:** A subset of AI where machines learn patterns from data instead of following explicit, hand-written rules.

If traditional programming is giving someone a recipe, machine learning is showing them a hundred dishes and letting them figure out the recipes themselves.

Instead of writing rules like "if an email contains 'FREE' and three exclamation marks, mark it as spam," you feed a model thousands of labeled emails and let it discover the patterns. Fun fact: sometimes it picks up on things a human would never notice - like certain fonts correlating with spam.

### DL (Deep Learning)

**Definition:** A subset of machine learning that uses neural networks with many layers - hence "deep." Particularly good at image recognition, speech processing, and language understanding.

When your phone unlocks by recognizing your face, that's deep learning. The model processes your face through dozens of layers, each extracting more detailed features, until it can confidently say "yes, that's you."

The "deep" in deep learning just means "lots of layers." There's no magic threshold - three layers isn't deep, fifty is.

### Neural Network

**Definition:** A computing system inspired by biological brains, made of layers of interconnected nodes (neurons). Each connection has a weight, and the network learns by adjusting these weights.

Picture a conveyor belt, but instead of workers, there are tiny calculators. Each one takes input, does something simple - multiplied, compared, discarded - and passes it along. By the end, thousands of micro-decisions add up to an answer: "this is a cat" or "this is a fraudulent transaction." The cool part? Nobody programmed those decisions. They emerged on their own after thousands of iterations.

A simple fraud-detection network might look at: transaction amount → location → time of day → purchase history. Each layer combines these signals to produce a probability.

### Model

**Definition:** A trained neural network - or any ML system - that can make predictions or generate outputs. The model is the "frozen" result of training: the architecture plus all the learned weights.

Think of it as a chef who finished culinary school. The architecture is the kitchen. Training is years of practice. The model is the chef - ready to cook on their own.

GPT-4, Claude, and Llama are all models. After training, they became systems that can answer questions, write code, and hold conversations. Well, "hold conversations" is generous. Sometimes they confidently say completely wrong things and you almost want to applaud. But more on that later.

### Training

**Definition:** The process of teaching a model by showing it data and adjusting its internal weights to minimize errors. Computationally intensive - can take days or weeks on thousands of GPUs.

A student solving practice problems. They attempt an answer, check if it's right, adjust their understanding. After thousands of problems, the patterns are internalized.

Training a language model means feeding it trillions of words from the internet, books, and articles. At each step, the model tries to predict the next word, gets feedback, and adjusts. Over billions of iterations, it learns grammar, facts, reasoning, and style.

The cost? Millions of dollars in compute. The time? Months. This is why not everyone trains models from scratch.

### Inference

**Definition:** Using a trained model to make predictions on new, unseen data. This is what happens when you actually *use* the model - typically much faster and cheaper than training.

If training is studying for an exam, inference is taking it.

When you type a question into ChatGPT and get an answer, that's inference. The model was already trained - it's just running learned patterns on your specific input. Every API call to an AI model is inference.

## LLM Core

Now we get to the good stuff - the terms you actually hear about every day.

### LLM (Large Language Model)

**Definition:** A neural network trained on massive amounts of text data to understand and generate human language. "Large" refers to the number of parameters - typically billions.

An LLM is like someone who has read a significant portion of the internet and developed an intuitive sense for how language works. They haven't memorized everything, but they've absorbed patterns of grammar, facts, reasoning styles, and even humor.

GPT-4, Claude, Llama, and Gemini are all LLMs. They can write essays, answer questions, translate languages, write code - all from the same underlying model. Same model, different tasks. That's what makes them different from older, single-purpose AI systems.

### Token & Tokenization

Let's cover these together since they're two sides of the same coin.

**Token** - the basic unit of text an LLM processes. Can be a word, part of a word, or even a single character.

Think of tokens like LEGO bricks. Some words are a single brick ("cat"). Others need several ("un-believ-able"). The model doesn't see whole words - it sees the bricks they're built from.

**Tokenization** - the process of breaking text into those tokens.

The sentence "I can't believe it!" might become: ["I", " can", "'", "t", " believe", " it", "!"] - 7 tokens. Roughly speaking, 1 token ≈ 4 characters or ¾ of a word in English.

The word "running" might split into ["run", "ning"] because the model learned that "-ning" is a common suffix. But "the" stays as one token because it appears so frequently.

Why does this matter? Because you're billed in tokens. And because weird tokenization is why LLMs sometimes struggle with spelling or math - they literally don't see words the way you do.

### Context Window

**Definition:** The maximum amount of text (in tokens) that an LLM can process at once - input and output combined. It's the model's working memory.

Think of it like a desk. A small desk (4K tokens) means you can only have a few documents open. A huge desk (200K tokens) means you can spread out an entire book, your notes, and reference materials. But once something falls off the edge, the model forgets it.

With a 128K context window, you could paste a 300-page book and ask questions about any part. With 4K, you'd handle a few pages at a time.

Here's the thing though: just because a model *can* process 128K tokens doesn't mean it does it well. Most models are great with the first and last parts of their context, but get fuzzy in the middle. This is called the "lost in the middle" problem and it's a real thing to keep in mind.

### Parameters

**Definition:** The internal variables (weights and biases) of a neural network, adjusted during training. The parameter count is a rough measure of a model's capacity.

More connections = more capacity to store knowledge and make nuanced decisions. A 7-billion-parameter model is like a brain with 7 billion adjustable knobs, each tuned during training.

GPT-3 has 175 billion parameters. Llama 3 comes in sizes from 8 billion to 70 billion. Generally, more parameters = more capable, but also more expensive. The relationship isn't perfectly linear though - architecture and training quality matter enormously.

### Transformer

**Definition:** The neural network architecture behind modern LLMs. Introduced in the 2017 paper "Attention Is All You Need," transformers use "attention" to weigh the importance of different parts of the input simultaneously.

Before transformers, models read text left to right, one word at a time, trying to remember everything. Transformers read the entire text at once and use attention to figure out which words matter most for each prediction. Like a highlighter that automatically marks the most relevant parts of every page.

In "The bank was flooded, so I went to the other bank," attention helps figure out that the first "bank" is a river bank and the second is a financial institution - by looking at all surrounding words at once, not just the ones before.

This architecture is why LLMs got so good so fast. Everything before transformers was a stepping stone. Everything after builds on them.

## Prompt Engineering

Alright, this is where things get practical. These are the terms you'll actually use when talking to an LLM.

### Prompt

**Definition:** The input text you give to an LLM to get a response. Can be a question, an instruction, a partial sentence, or any combination.

A prompt is like a question to a knowledgeable friend. The better and more specific the question, the better the answer. "Tell me about dogs" gets a vague response. "What's the difference between a golden retriever and a labrador for a family with small kids?" gets something actually useful.

"Write a poem" is a prompt. "Write a haiku about debugging production code at 2 AM" is a much better one - specific, contextual, constrained.

### System Prompt

**Definition:** A hidden instruction that sets the model's behavior, personality, or constraints for the entire conversation. Like giving the model a role before the conversation starts.

If a regular prompt is a question, the system prompt is the job description. It tells the model: "You are a helpful coding assistant who always explains things with analogies and never writes code without comments." Everything after that is filtered through this lens.

ChatGPT's system prompt includes "You are a helpful assistant." Developers can customize: "You are a senior code reviewer. Be direct, point out bugs, suggest improvements with code examples."

### Zero-shot, One-shot, Few-shot

These three belong together - they're on a spectrum.

**Zero-shot** - asking the model to do something without any examples. You're relying entirely on its pre-existing knowledge.

Like telling someone "write a cover letter" without showing them any. They'll do it based on what they've seen in the world, but the style might not match what you want.

"Translate this to French: Hello, how are you?" - zero-shot.

**One-shot** - giving the model exactly one example before the task.

Like showing someone one sample cover letter and saying "write another like this." They pick up format, tone, and structure from that single example.

"Convert these to emoji summaries: 'I had a great day' → '😊🌟'. Now convert: 'The meeting was boring' → ?"

**Few-shot** - giving the model several examples (typically 2-10) before the task. This dramatically improves output quality and consistency.

Like giving a new employee a style guide with multiple examples. After seeing the pattern a few times, they internalize it.

"Classify the sentiment: 'I love this product' → Positive. 'This is terrible' → Negative. 'It works I guess' → Neutral. 'Absolutely amazing experience' → ?"

The jump from zero-shot to few-shot is probably the single most practical improvement you can make to your prompts. Try it before anything else.

### Temperature

**Definition:** A setting (usually 0.0 to 2.0) that controls how creative or deterministic the output is. Low = predictable. High = varied and creative.

Generating code? Use 0.1–0.3. You want boring, predictable, correct output. Writing creatively or brainstorming? Go 0.8–1.2 - the model will start producing things that surprise you. Sometimes brilliant, sometimes the kind that make you go "really?" That's normal.

### Top-p (Nucleus Sampling)

**Definition:** An alternative to temperature for controlling randomness. The model only considers the smallest set of most likely tokens whose combined probability exceeds p. Lower top-p = more focused.

Imagine the model choosing its next word from a ranked list. Top-p says "only consider options that together make up 90% of the probability." It cuts off the weird, unlikely tail while keeping the reasonable choices.

With top-p at 0.9, the model might consider "the," "a," "my" but ignore "pineapple" or "quantum" - even if those have non-zero probability. Cleaner than temperature alone.

In practice, most people just adjust temperature and leave top-p at 1.0. That's fine for most use cases.

## Fine-tuning & Training

So far we've covered what models are and how to talk to them. Now let's look at how you make a model *yours*.

### Pre-training

**Definition:** The initial, massive training phase where a model learns general language patterns from a huge corpus of text. This is where it picks up grammar, facts, reasoning, and world knowledge.

Pre-training is like getting a general education - going through school, reading widely, learning how the world works. You're not specialized yet, but you have a broad foundation.

GPT-4 was pre-trained on trillions of tokens from the internet, books, and other sources. It cost millions of dollars in compute and took months. The result was a general-purpose model that could do many things reasonably well.

Nobody does pre-training themselves unless they work at a well-funded company or research lab. You use what's available.

### Fine-tuning

**Definition:** Taking a pre-trained model and training it further on a smaller, specialized dataset to improve performance on specific tasks or domains.

If pre-training is general education, fine-tuning is medical school. You already know how to read, write, and think - now you're specializing.

Take a general LLM and fine-tune it on legal documents to create a legal assistant. Or fine-tune it on your company's documentation so it answers questions about your specific products accurately.

### RLHF (Reinforcement Learning from Human Feedback)

**Definition:** A training technique where humans rank different model outputs, and the model learns to prefer the responses humans rated higher. This is how models learn to be helpful, honest, and harmless.

Imagine a student writing essays and a teacher grading them: "This answer is better than that one - here's why." Over time, the student internalizes what makes a good answer. RLHF is that feedback loop, scaled up with thousands of human raters.

Without RLHF, an LLM would happily answer "How do I make a bomb?" with detailed instructions - it's just continuing text, no ethics involved. With RLHF, human raters showed the model: "this response is good, this one is not - even if technically correct." The model learned to be helpful AND safe. Though, to be fair, it sometimes overdoes it and refuses perfectly harmless questions. That's a known issue and people are working on it.

### LoRA (Low-Rank Adaptation)

**Definition:** A technique for fine-tuning large models efficiently by training only a small subset of parameters (low-rank matrices) instead of the entire model. Dramatically reduces compute and memory requirements.

Instead of rebuilding an entire car engine to improve performance, LoRA is like adding a turbocharger - a small, targeted modification that makes a big difference without touching the rest.

Fine-tuning a 70-billion-parameter model normally requires dozens of GPUs. With LoRA, you can do it on a single GPU by training only 0.1% of the parameters. The model keeps its general knowledge while learning your specific task.

This is what made the whole open-source fine-tuning movement possible. Without LoRA, you'd need a datacenter. With it, a decent workstation will do.

### Embeddings

**Definition:** A numerical representation of text as a vector - a list of numbers - that captures its meaning. Similar concepts have similar vectors, enabling mathematical operations on meaning.

Embeddings are like GPS coordinates for concepts. "King" and "queen" are close on the map. "Apple" (fruit) and "orange" are nearby. "Apple" (fruit) and "Apple" (company) are farther apart. You can even do math: king - man + woman ≈ queen.

When you search for "how to fix a broken screen," embeddings help find articles about "repairing cracked displays" even though they don't share the exact same words - because the meanings are close in vector space.

This concept is the backbone of RAG, semantic search, and recommendation systems. Once you understand embeddings, a lot of other things start making sense.

## RAG & Tools

This is where things get really practical - the terms you'll need when building actual applications.

### RAG (Retrieval-Augmented Generation)

**Definition:** A technique where the model first searches an external knowledge base for relevant information, then uses that information to generate its response. Combines the model's language skills with up-to-date or domain-specific data.

RAG is the difference between taking an exam closed-book (the model relies only on its training memory) and open-book (the model can look up information first). The model is smarter when it can reference materials.

A customer support chatbot using RAG doesn't rely on its training data (which might be months old). Instead, it searches your current product documentation, finds the relevant section, and generates an answer based on that - ensuring accuracy and freshness.

If you're building anything with AI that needs to reference real data, you probably want RAG. It's the most practical pattern in production right now.

### Vector Database

**Definition:** A database optimized for storing and searching embeddings (vectors). Enables fast similarity searches across millions or billions of documents.

A regular database is like a filing cabinet organized by name or date. A vector database is like a librarian who understands what each document is about and can instantly find the ones most similar to your query - even if they don't share the same words.

Pinecone, Weaviate, and Milvus are the popular ones. You store embeddings of all your company documents, then when a user asks a question, you convert the question to an embedding and find the most similar documents.

This is RAG's storage layer. Without a vector database, you'd be doing slow, brute-force comparisons.

### Semantic Search

**Definition:** Search that understands the meaning and intent behind a query, not just keyword matching. Powered by embeddings, it finds results that are conceptually related even without exact word overlap.

Keyword search is like looking up a word in a dictionary's index - you only find exact matches. Semantic search is like asking a librarian who understands what you actually need and points you to the right section, even if you described it imperfectly.

Searching for "affordable vacation spots" with keyword search might miss an article titled "Budget-friendly destinations for your next trip." Semantic search catches it because the meanings align, even though the words differ.

### Agents

**Definition:** An AI system that can plan, use tools, and take multi-step actions autonomously. Unlike a chatbot that just responds, an agent can break down a goal into steps, execute them, and adapt based on results.

A regular LLM is like a consultant who gives advice. An agent is like a consultant who also has access to your computer, can send emails, run scripts, check databases, and actually get things done.

An AI agent tasked with "research competitors and write a comparison report" might: search the web, scrape websites, analyze pricing data, draft a report, and save it to your Google Drive - all on its own.

Agents are hyped, and for good reason. But they're also unpredictable. The more autonomy you give an AI, the more ways it can go off the rails. Start with simple tool use before going full agent. For the full stack (LLM → model → product → agent → subagent), see [The Complete Guide to LLMs, Models, Agents, and Subagents](/blog/complete-guide-llms-models-agents-subagents).

### Function Calling (Tool Use)

**Definition:** The ability of an LLM to request that the application call a specific function (API, database query, calculator, etc.) with specific arguments. The model doesn't execute the function itself - it outputs a structured request, and the system runs it and feeds the result back.

The model is like a manager who can't use the tools directly but knows exactly which tool is needed and how to specify the job. "Hey, run this database query for me and bring me the results so I can analyze them."

A user asks "What's the weather in Tokyo?" The model outputs: get_weather(city="Tokyo"). Your system calls the weather API, gets the result, feeds it back, and the model generates a natural language response.

This is the building block for agents. Before you have agents, you have function calling. See also [how tool use fits in the hierarchy](/blog/complete-guide-llms-models-agents-subagents).

## Evaluation & Safety

The last piece: how do you know if a model is any good, and how do you keep it from causing trouble?

### Hallucination

**Definition:** When an LLM generates information that sounds plausible but is factually incorrect or entirely made up. The model is confident, but wrong.

Like a student who didn't study but is really good at sounding confident during an oral exam. They'll give you a detailed, well-structured answer that's completely invented. Sounds right, but isn't.

Ask an LLM "What year did the first person walk on the surface of Proxima Centauri b?" and it might confidently answer "2041" - because it's generating plausible-sounding text, not because it knows this hasn't happened.

Hallucination is the number one pain for anyone running AI in production. Seriously. If you're building an LLM-powered product and not thinking about hallucinations - you're already on fire, you just can't feel it yet.

### Benchmark

**Definition:** A standardized test used to measure and compare model performance on specific tasks. Provides objective metrics for evaluating reasoning, coding, math, or general knowledge.

Benchmarks are like standardized tests for models - SAT, GRE, professional certifications. They don't capture everything, but they give a common yardstick.

MMLU tests knowledge across 57 subjects from law to physics. HumanEval measures coding ability. GSM8K tests grade-school math. When a company says "our model scores 86.4% on MMLU," that's a benchmark result.

### Guardrails

**Definition:** Rules, filters, or systems put in place to prevent an AI model from generating harmful, inappropriate, or off-topic content. A safety layer between the model and the user.

Guardrails are like bowling bumpers - they keep the ball from going into the gutter. They don't change how the ball is thrown, but they prevent the worst outcomes.

A customer-facing AI might have guardrails that block responses containing personal data, redirect political questions, prevent medical diagnoses, and flag potentially harmful requests for human review.

### Alignment

**Definition:** The research area focused on ensuring AI systems behave in ways that match human values, intentions, and expectations. An aligned model does what you want, not just what you literally asked.

Alignment is the difference between a genie who grants your exact wish (with disastrous unintended consequences) and a wise advisor who understands what you actually mean and helps you get there safely.

Ask an unaligned model "How do I make my competitor's website go down?" and it might give you DDoS instructions. An aligned model recognizes the harmful intent and responds ethically - perhaps by suggesting legitimate competitive strategies instead.

This is still an open research problem. Nobody has solved alignment completely.

## Where to Go From Here

Understanding these terms is the first step. The field moves fast, but the fundamentals stay relatively stable.

**Try it yourself.** Open any LLM and experiment with temperature settings, few-shot prompts, and system prompts. The best way to internalize these concepts is to see them in action.

**Follow the research.** Papers on arXiv, blog posts from Anthropic and OpenAI, and the Hugging Face community are great places to see how these concepts evolve in practice.

**Build something.** A simple RAG pipeline with a vector database, a fine-tuned model with LoRA, or an agent with function calling - even small projects cement these ideas faster than any glossary.

There are more terms than I covered here, and new ones pop up every week. But if you understand these, you can already read articles, watch talks, and not feel completely lost. From here it's just practice. Open any LLM, play with temperature, try few-shot prompts. You can't break anything.

## A Few Hot Takes

**Bigger isn't automatically better.** A 70-billion-parameter model doesn't always beat an 8-billion-parameter one. On specific tasks, a smaller model fine-tuned for your use case will often outperform the giant. LoRA is your friend.

**RAG > Fine-tuning in 80% of cases.** Before you train a model on your own data, try RAG. It's cheaper, faster, and usually gives better results. Fine-tuning is for when RAG already isn't enough.

**Don't trust benchmarks blindly.** MMLU, HumanEval, GSM8K - these are synthetic tests. A model can score great and still be useless for your specific case. Test on your own data.
