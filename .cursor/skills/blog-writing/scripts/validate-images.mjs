#!/usr/bin/env node
/**
 * Image asset validator for Let's Code It blog posts.
 * Usage: node .cursor/skills/blog-writing/scripts/validate-images.mjs posts/my-post.md
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../../../..");
const postPath = process.argv[2];

if (!postPath) {
  console.error("Usage: node validate-images.mjs <path-to-post.md>");
  process.exit(1);
}

const absPost = postPath.startsWith("/") ? postPath : join(process.cwd(), postPath);
const raw = readFileSync(absPost, "utf8");
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) {
  console.error("FAIL: no YAML frontmatter found");
  process.exit(1);
}

const frontmatter = fmMatch[1];
const body = fmMatch[2];

let failed = false;

function fail(msg) {
  console.log(`FAIL: ${msg}`);
  failed = true;
}

function warn(msg) {
  console.log(`WARN: ${msg}`);
}

function fmValue(key) {
  const m = frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?`, "m"));
  return m ? m[1].trim() : null;
}

function resolveUpload(rel) {
  if (!rel || !rel.startsWith("/uploads/")) return null;
  return join(repoRoot, rel);
}

function wordCount(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function hasXmllint() {
  try {
    execSync("which xmllint", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function validateSvg(filePath) {
  const content = readFileSync(filePath, "utf8");

  if (!content.includes("<svg")) {
    fail(`${filePath}: not an SVG file`);
    return;
  }

  // Control chars except \t \n \r
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(content)) {
    fail(`${filePath}: contains invalid control characters`);
  }

  if (hasXmllint()) {
    try {
      execSync(`xmllint --noout "${filePath}"`, { stdio: "pipe" });
      console.log(`  OK (xmllint): ${filePath.replace(repoRoot + "/", "")}`);
    } catch (e) {
      fail(`${filePath}: XML parse error — ${e.stderr?.toString().split("\n")[0] || "invalid"}`);
    }
  } else {
    warn("xmllint not installed — skipping XML schema check (brew install libxml2)");
    console.log(`  OK (basic): ${filePath.replace(repoRoot + "/", "")}`);
  }

  const vb = content.match(/viewBox=["']([^"']+)["']/);
  const base = filePath.split("/").pop();
  if (vb) {
    const v = vb[1];
    if (base === "cover.svg" && v !== "0 0 1920 640") {
      warn(`cover.svg viewBox is "${v}" (expected "0 0 1920 640")`);
    }
    if (base === "thumb.svg" && v !== "0 0 352 244") {
      warn(`thumb.svg viewBox is "${v}" (expected "0 0 352 244")`);
    }
  } else if (base === "cover.svg" || base === "thumb.svg") {
    warn(`${base}: missing viewBox`);
  }
}

function checkImagePath(relPath, label) {
  if (!relPath) {
    fail(`${label} missing in frontmatter`);
    return;
  }
  if (!relPath.startsWith("/uploads/")) {
    fail(`${label} must start with /uploads/ (got ${relPath})`);
    return;
  }
  const abs = resolveUpload(relPath);
  if (!existsSync(abs)) {
    fail(`${label} file not found: ${relPath}`);
    return;
  }
  console.log(`OK: ${label} → ${relPath}`);
  if (relPath.endsWith(".svg")) validateSvg(abs);
}

console.log("Image validation for:", absPost.replace(repoRoot + "/", ""));

const coverImage = fmValue("coverImage");
const thumbnail = fmValue("thumbnail");

checkImagePath(coverImage, "coverImage");
checkImagePath(thumbnail, "thumbnail");

const imgRe = /!\[([^\]]*)\]\((\/uploads\/[^)\s]+)\)/g;
const inline = [...body.matchAll(imgRe)];

console.log(`Inline images in markdown: ${inline.length}`);

const seen = new Set();
for (const [, alt, path] of inline) {
  if (!alt.trim()) {
    fail(`empty alt text for ${path}`);
  } else {
    const wc = wordCount(alt);
    if (wc < 8 || wc > 15) {
      warn(`alt text ${wc} words (target 8–15): "${alt}"`);
    }
  }

  if (seen.has(path)) continue;
  seen.add(path);

  const abs = resolveUpload(path);
  if (!abs || !existsSync(abs)) {
    fail(`inline image not found: ${path}`);
    continue;
  }
  console.log(`OK: inline → ${path}`);
  if (path.endsWith(".svg")) validateSvg(abs);
}

if (!inline.length && body.split(/\s+/).length > 800) {
  warn("long post with no inline images — consider adding a diagram");
}

if (failed) {
  console.log("\nValidation: FAIL");
  process.exit(1);
}
console.log("\nValidation: PASS");
process.exit(0);
