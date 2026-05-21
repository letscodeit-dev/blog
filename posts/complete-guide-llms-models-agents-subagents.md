---
title: "The Complete Guide (Almost): LLMs, Models, Agents, and Subagents in Plain English"
slug: "complete-guide-llms-models-agents-subagents"
canonical: "https://letscodeit.dev/blog/complete-guide-llms-models-agents-subagents"
publishedAt: "2026-05-20"
description: "From the GPT brand to the subagent: the AI hierarchy without confusing the terms."
category: "AI Foundations"
tags: ["ai", "agents", "llm", "beginners"]
status: "published"
featured: true
coverImage: "/uploads/complete-guide-llms-models-agents-subagents/cover.svg"
thumbnail: "/uploads/complete-guide-llms-models-agents-subagents/thumb.svg"
---

If you've ever opened an article about AI and felt like everyone else is speaking a different language — you're not alone. Let's figure it out together.

LLM, agent, subagent, model — people often use these words as synonyms, but they mean different things. **"The complete guide (almost)"** because the focus here is the **vocabulary and hierarchy**. Prompts, context, skills, and MCP — briefly; there's a "go deeper" section at the end.

### Hierarchy

![Full hierarchy: from AI to agent with subagents](/uploads/complete-guide-llms-models-agents-subagents/figures/hierarchy.svg)

## Glossary: from AI to product

### LLM — large language model

An **LLM (Large Language Model)** is a neural network trained on huge amounts of text. You give it text as input — it **predicts the next word, again and again**, until it has a full answer: a chat reply, code, a translation, a summary.

An LLM doesn't "understand" language like a human and doesn't "recognize" speech (voice uses other systems). It continues a phrase the way similar phrases appeared in training data. *Language* means text; *large* means scale (billions of parameters).

**How is an LLM different from "just AI"?**

**AI** is the big umbrella: systems that do tasks that used to need a human.

**LLM** is one kind of those systems: built for **text** (and anything you can turn into text — code, JSON, prompts).

| "Just AI" | LLM |
|---|---|
| Recognizes faces in photos | Generates and extends text |
| Filters spam in email | Answers in chat |
| Recommends movies | Writes code from a description |
| Runs a warehouse robot | Summarizes a document |

> **Common mistake.** ChatGPT is a **product** (an application). GPT-4o is a **model** inside it. "Ask ChatGPT" means you're using a product, not a "bare" model in a vacuum.

### Families and specific models

**GPT, Claude, Llama, Gemini, Kimi, DeepSeek, Qwen** are not individual models — they're **family names** (product lines). Like "iPhone" at Apple: the word alone doesn't tell you if it's a Pro or an SE.

Family examples: **GPT** (OpenAI), **Claude** (Anthropic), **Llama** (Meta) — plus Gemini, Kimi, DeepSeek, Qwen.

A **specific model** is one **frozen** version after training: fixed weights, size, release date. Like a printed book — it isn't rewritten on the fly.

Examples: **GPT-4o, o1** · **Claude Opus 4.6, Sonnet 4.6, Haiku 4.5** · **Llama 3.1 70B** · and counterparts from Gemini, DeepSeek, Qwen.

Inside the Claude family there are three tiers:

- **Opus** — highest quality, most expensive
- **Sonnet** — balance of cost and quality
- **Haiku** — faster and cheaper

Opus 4.6 and Sonnet 4.6 are **different** models: different weights, speed, and price.

### Products are not models

**ChatGPT, Claude Code, GitHub Copilot, Cursor** are **products**: applications that *use* models inside them.

- **ChatGPT** — a web UI for GPT models
- **Claude Code** — a coding tool built on Claude
- **Copilot** — an editor extension that uses various models
- **Codex** — used to be a separate code-focused model; today the name can also appear on products — don't confuse it with "just a chat"

**Analogy.** The model is the **engine**. The product is the **car**. In ChatGPT you get in the car; the engine (GPT-4o, etc.) isn't visible. In Cursor it's a different car — it might use the same engine (GPT-4o, Claude Sonnet 4.6) but with a different interface and features.

> **Common mistake.** ChatGPT **won't update a file on your disk by itself** — the product has no access until you grant it. Expecting "chat in the browser" to act on your machine means confusing a product with an agent.

> In ChatGPT with search enabled: "Research competitors and write a report." You get text in the chat, often with up-to-date data. There is no `report.md` on disk — the product replied, but didn't touch your system.

### Why everything gets confused

When you type "find the weather" in ChatGPT, it feels like **ChatGPT** went on the internet. Behind one window there are several layers:

![One ChatGPT window: you, product, tool, model, answer](/uploads/complete-guide-llms-models-agents-subagents/figures/chatgpt-layers.svg)

The model is only one step. Same logic for a competitor report: finished text in the chat, but inside — search first, then the model wording the answer.

### What a model cannot do on its own

A model is a **text predictor**. You give text — it continues. It doesn't "think" or "decide" in the human sense.

On its own, a model **cannot**:

- Open a browser and search Google
- Write a file on your computer
- Send an email
- Run your code and check if it works

Like a LEGO robot on a table: it assembles from bricks you put in the prompt. It doesn't go to the store for new pieces or onto the internet. **Tools** and **agents** handle that.

> Ask an LLM in chat only, with no search or files, to "research competitors…" — you get a plan, tips, a report template. No real prices or live sites "as of today" unless tools are wired in.

## How to talk to a model

### Prompt and system prompt

A **prompt** is any text you send the model: a question, a task, a chunk of code.

"Write code" is weak. "Write a Python function that takes a list of numbers and returns only the even ones" is clear.

A **system prompt** is a hidden instruction for the whole conversation. You usually don't see it; the product sets it.

Same model, same question "How do I solve 5x + 2 = 3?":

- without a system prompt — straight to "x = 0.2";
- with a prompt like "you're a tutor, don't give the final answer, guide step by step" — questions instead of the answer.

**ChatGPT**, **Cursor**, **Claude Code** — each has its own system prompt (helpful assistant, code, files).

### Prompt engineering — not magic, a loop

**Prompt engineering** isn't "spells" — it's steadily improving how you phrase the task.

1. **Set a goal** — what should the output be?
2. **Write a draft** — keep it simple
3. **Check the result**
4. **Refine** — format, details, steps
5. **Check again** — until it's good enough

**Example: job posting.**

Weak:

```
Write a job posting for a developer.
```

Better:

```
Write a job description for a senior Python developer.
Company: fintech startup, 50 people.
Stack: Python, FastAPI, PostgreSQL, Docker.
Terms: remote, salary range $120k–$180k USD.

Include: company overview, requirements, responsibilities, benefits, how to apply.
```

**The first line matters a lot.** Prefer a direct instruction, not a hint: not "I was reading about Redis…", but "Name three companies that use Redis in production and what they use it for."

> Weak: "Write a report on competitors." Better: "Research 5 direct competitors in niche X. Table: name, pricing, key features. Then 2 paragraphs of takeaways. Markdown format."

Deeper techniques (prompt markup, in-prompt examples, evaluation on datasets) belong in separate posts; the loop above is enough to start.

## Tools: the model's "hands"

A **tool (tool use)** is a function the model **asks to invoke**; your **app or service** actually runs it.

![Tool use loop: model requests, app runs, model answers](/uploads/complete-guide-llms-models-agents-subagents/figures/tool-loop.svg)

The model doesn't hit your database or disk by itself. It returns something like: "call `web_search` with these parameters" → the program runs it → the result goes back to the model → the model answers you.

**When you need tools:** fresh data (weather, prices), actions with side effects (email, files, APIs), your private database.

**When you don't:** general knowledge, translation, a one-off question with no action.

> If you're parsing the model's reply with regex to "extract" a fact — you probably needed a **tool**, not a longer prompt.

> For a competitor report, the model may request `web_search` → your app fetches pages → results return to context → the model writes from **fresh** data. Without a tool — only what was in training.

## Agent

An **agent** is software wrapped around a model: the same LLM plus **tools** and a **plan** (what to do next, what to call, when to stop).

An agent can search the web, run code, read and write files, call APIs.

**The model answers a question. The agent does a task.**

- "How do I build a website?" → the model explains
- "Build a website" → the agent creates files, writes code, runs it, checks

**Agent = model + tools + planning.**

**The model knows. The agent acts.**

> "Research competitors and write a report" — the agent picks the steps: search → read sites → compare → save `report.md`. You set the goal, not every click.

## Subagent

A **subagent** is an agent **started by another agent** for part of a job.

![Subagents: manager delegates search, analysis, and writing](/uploads/complete-guide-llms-models-agents-subagents/figures/subagents.svg)

> For the same competitor-report task, the manager agent delegates:

- searcher subagent — the web
- analyst subagent — compare pricing and features
- writer subagent — final text

The manager assembles the result.

**Why:** separate roles, parallel work, less noise in each agent's context.

**When it's overkill:** a one-sentence task ("write a sort function") — one agent or even plain chat with a model is enough.

## How it all fits together

### All levels at a glance

One task — *"Research competitors and write a report"* — looks different at each level:

| Level | What you get |
|---|---|
| **Model** in chat | Advice and a plan, no real search, no file |
| **Product** with search (ChatGPT, etc.) | Report in chat with fresh data, disk untouched |
| **+ tools** | Web search, fresh data in the reply |
| **Agent** | Search, draft, `report.md` in your project |
| **Agent + subagents** | Search, analysis, and writing in parallel; manager merges |

The full hierarchy (beyond this example) is in the [diagram at the top](#hierarchy).

- **Model** — knows and answers
- **Agent** — acts
- **Subagents** — scale a large task

## Workflows and agents: when to use what

A **workflow** is several model calls **following a fixed plan**. You control every step.

Example: bug screenshot → description → repro steps → completeness check → polish. A "creator + critic" pattern.

An **agent** gets a **goal and tools**; the model chooses the order of steps.

> Fixed plan: (1) list 5 competitors, (2) price table, (3) conclusion text — three scripted model calls → **workflow**. One line "make the report," steps chosen on the fly → **agent**.

| | Workflow | Agent |
|---|---|---|
| Step plan | Yours upfront | Decided as it goes |
| Control | Maximum | By goal |
| When | Steps are known | Steps are unclear |

## Why this matters

Think ChatGPT **is** the model → you expect actions chat can't do. "Why didn't it update my file?" — because it's a product without disk access.

Think an agent is just a smart chat → you're surprised by odd choices. An agent **acts**; more capability — more ways to get it wrong.

Confuse agent and subagent → you overcomplicate simple work. Three subagents for one function is too much.

## Practical example: writing code

**Model.** "Write an auth function" → code in the reply → you copy, paste, and test yourself.

**Product (ChatGPT in the browser).** Nice back-and-forth; files on disk still don't change on their own.

**Agent (Cursor, Copilot Workspace).** "Add auth to my project" → finds files, writes code, checks the build.

**Agent + subagents.** "Auth, tests, and docs" → one writes code, another tests, a third updates docs; the lead agent checks consistency.

Same model inside — different experience outside.

## What to remember

| Term | In one line |
|---|---|
| **GPT, Claude…** | Family name, not a version |
| **LLM / model** | Text predictor: knows, doesn't act |
| **GPT-4o, Sonnet 4.6…** | One trained, frozen version |
| **ChatGPT, Cursor…** | Product around a model |
| **Agent** | Model + tools + plan |
| **Subagent** | Helper agent for a subtask |

**The model knows. The agent acts.** Everything else is wrappers, naming, and scale.

---

## Go deeper

Short notes on topics that deserve full posts of their own.

### Context window

The **context window** is how much text a model can "hold in mind" in **one** conversation: your messages, replies, tool results. That's not the same as knowledge from training.

Each model has its own limit (roughly hundreds of pages to very large volumes). **Context rot** — in long threads the model forgets the middle; don't fill the chat with junk.

Products sometimes **compact** old messages to free space. **Skills** load instructions in chunks — also to save context.

### Skills

A **skill** is a bundle of instructions and files (often `SKILL.md`) that turns a general model into a **specialist** for a narrow job: SQL, your CRM, internal rules.

Unlike a one-off prompt, a skill hooks in **automatically** when the task fits. It loads **in parts** — not the whole package into context at once.

### MCP

**MCP (Model Context Protocol)** is a standard way to **plug in ready-made tools** without writing a wrapper for every API.

A **tool** is what the model can call. **MCP** is who already built a tool pack for GitHub, databases, the cloud, and so on.

Without MCP you describe every function yourself. With MCP you connect a server and get a bundle of capabilities.

### Prompt engineering, in more depth

If the write → check → refine loop is already familiar, next steps:

- **Output requirements** — length, tone, structure (almost always)
- **Process steps** — for hard analysis and debugging
- **Examples in the prompt** — show the shape of answer you want
- **Block markup** — separate instructions from code and data when the prompt is huge

In production, prompts are tested on **example sets** and scored against criteria — not eyeballed once.

---

**More terms:** RAG, embeddings, RLHF, fine-tuning, and others — in the [AI and LLM glossary](/blog/ai-llm-glossary-terms-every-developer-should-know).
