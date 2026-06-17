# Anti-AI detection rules

Non-negotiable for every draft. Goal: pass GPTZero, Originality, Copyleaks as human-written.

Run validator before delivery:

```bash
node .cursor/skills/blog-writing/scripts/validate-draft.mjs posts/your-slug.md
```

## Sentence rhythm

Mix lengths aggressively. Short. Then a longer sentence with one concrete example. Short again. Fragments allowed sparingly.

## Personal specifics over abstractions

✓ "I ran the same paragraph through OpenAI's tokenizer in March 2026. English came back at 49 tokens."
✗ "Researchers often find that English tokenizes efficiently."

## Self-correction

✓ "I assumed Russian would cost the most. French and German beat it on o200k."

## Strong opinions

✓ "Prompt caching matters more than language choice for most teams."
✗ "Prompt caching can be an important consideration."

## Em-dash budget: maximum 2 per article

Hard limit. Character `—` only. Use commas, parentheses, or new sentences instead.

Spaced hyphen ` - ` as a dash: maximum 8 per article. Prefer commas when possible.

## Forbidden sentence patterns

✗ "Not X, but Y"
✗ Sentences or fragments starting with "Not" (including after a period: "Not higher. Not cheaper.")
✗ "It's not just X, it's Y"
✗ "Whether you're X or Y"
✗ "From X to Y" as a structural section template
✗ Echo pattern "Not X, not Y, just Z"

Rewrite with "and", "yet", or two separate sentences.

## Tricolons (X, Y, and Z): maximum 2 per article

Three or more tricolons per post is detector bait. Vary rhythm: pairs, single items, "X and Y".

## Banned clichés

Remove on sight:

in today's fast-paced world / in the realm of / dive deep / dive into / unleash / unlock / empower / game-changer / revolutionary / cutting-edge / robust / seamless / streamlined / leverage / comprehensive guide / ultimate guide / whether you're a beginner or a pro / embark on a journey / plethora / myriad / crucial / pivotal / paramount / it's worth noting that / that being said / ultimately / in conclusion / moreover / furthermore / at its core / let's dive in

## Banned transition openers

Do not start paragraphs with: However, Moreover, Additionally, Furthermore, Nevertheless, In addition, On the other hand.

Use a shorter signal or no transition.

## Self-check output (paste before delivery)

Report explicitly:

```
Anti-AI self-check:
- Em-dashes (—): [count]
- Spaced dashes ( - ): [count]
- Tricolons: [count] — list each if > 0
- Forbidden patterns: [none / fixed]
- Banned clichés: [none / fixed]
- Validator: [pass / fail]
```

If any hard limit fails, rewrite before submitting. Do not claim "passed" without running the validator.
