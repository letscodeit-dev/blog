#!/usr/bin/env node
/**
 * Anti-AI draft validator for Let's Code It blog posts.
 * Usage: node .cursor/skills/blog-writing/scripts/validate-draft.mjs posts/my-post.md
 */

import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node validate-draft.mjs <path-to-post.md>");
  process.exit(1);
}

const raw = readFileSync(file, "utf8");
const body = raw.replace(/^---[\s\S]*?---\n/, "");

const EM_DASH_LIMIT = 2;
const SPACED_DASH_LIMIT = 8;
const TRICOLON_LIMIT = 2;

const bannedCliches = [
  "in today's fast-paced world",
  "in the realm of",
  "dive deep",
  "dive into",
  "game-changer",
  "cutting-edge",
  "robust",
  "seamless",
  "streamlined",
  "leverage",
  "comprehensive guide",
  "ultimate guide",
  "whether you're a beginner or a pro",
  "embark on a journey",
  "plethora",
  "myriad",
  "crucial",
  "pivotal",
  "paramount",
  "it's worth noting that",
  "that being said",
  "ultimately",
  "in conclusion",
  "moreover",
  "furthermore",
  "at its core",
  "let's dive in",
  "revolutionary",
  "unlock",
  "unleash",
  "empower",
];

const bannedOpeners = [
  "however,",
  "moreover,",
  "additionally,",
  "furthermore,",
  "nevertheless,",
  "in addition,",
  "on the other hand,",
];

const forbiddenPatterns = [
  { name: "Whether you're...", re: /\bwhether you're\b/gi },
  { name: "It's not just X, it's Y", re: /\bit's not just [^.\n]{1,60}, it's\b/gi },
  { name: "Not X, but Y", re: /\bnot [^.\n,]{1,40}, but\b/gi },
  { name: "Not X, not Y, just Z", re: /\bnot [^.\n,]{1,30}, not [^.\n,]{1,30}, just\b/gi },
  { name: "From X to Y template", re: /^## from .+ to .+$/gim },
];

let failed = false;

const emDashCount = (body.match(/—/g) || []).length;
const spacedDashCount = (body.match(/ - /g) || []).length;
console.log(`Em-dashes (—): ${emDashCount} (max ${EM_DASH_LIMIT})`);
if (emDashCount > EM_DASH_LIMIT) {
  console.log("  FAIL: replace with commas or new sentences");
  failed = true;
}

console.log(`Spaced dashes ( - ): ${spacedDashCount} (max ${SPACED_DASH_LIMIT})`);
if (spacedDashCount > SPACED_DASH_LIMIT) {
  console.log("  FAIL: too many dash breaks");
  failed = true;
}

const tricolonRe = /\b\w+,\s+\w+,\s+and\s+\w+/gi;
const tricolons = body.match(tricolonRe) || [];
console.log(`Tricolons (X, Y, and Z): ${tricolons.length} (max ${TRICOLON_LIMIT})`);
if (tricolons.length > TRICOLON_LIMIT) {
  console.log(`  FAIL: ${tricolons.slice(0, 5).join(" | ")}`);
  failed = true;
}

const notFragmentRe = /(?:^|\.\s+)(Not\s+[^.\n]{1,80})/gim;
const notFragments = [...body.matchAll(notFragmentRe)].map((m) => m[1].trim());
if (notFragments.length) {
  console.log(`FAIL: fragment/sentence starting with "Not" (${notFragments.length})`);
  notFragments.slice(0, 3).forEach((f) => console.log(`  - ${f}`));
  failed = true;
}

for (const phrase of bannedCliches) {
  if (body.toLowerCase().includes(phrase)) {
    console.log(`FAIL: banned cliché "${phrase}"`);
    failed = true;
  }
}

for (const { name, re } of forbiddenPatterns) {
  const hits = body.match(re) || [];
  if (hits.length) {
    console.log(`FAIL: ${name} (${hits.length}): ${hits.slice(0, 3).join(" | ")}`);
    failed = true;
  }
}

for (const opener of bannedOpeners) {
  const re = new RegExp(`^${opener}`, "gim");
  if (re.test(body)) {
    console.log(`FAIL: banned paragraph opener "${opener}"`);
    failed = true;
  }
}

const h2s = body.match(/^## .+$/gm) || [];
const words = body.split(/\s+/).length;
console.log(`Words: ~${words} | H2 sections: ${h2s.length}`);

const internalLinks = body.match(/\]\(\/blog\/[^)]+\)/g) || [];
console.log(`Internal /blog/ links: ${internalLinks.length} (target: 2-5)`);
if (internalLinks.length < 2 && words > 600) {
  console.log("  WARN: add cross-links (see post-catalog.md)");
}

if (failed) {
  console.log("\nValidation: FAIL — fix before delivery");
  process.exit(1);
}
console.log("\nValidation: PASS");
process.exit(0);
