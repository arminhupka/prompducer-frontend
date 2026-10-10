#!/usr/bin/env node
/**
 * Generates public/sitemap.xml for the SUMMONIC SPA.
 * Static host serves this file directly. Re-run after adding instrument pages:
 *   node scripts/gen-sitemap.mjs
 *
 * Instrument slugs are read from app/content/instruments.ts. Pages listed in the
 * SCHEDULE map with a future date are skipped until their date has passed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SITE = "https://summonic.ai";
const today = new Date().toISOString().slice(0, 10);

function publishedSlugsFrom(file) {
	const src = readFileSync(join(root, file), "utf8");
	const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
	const schedule = {};
	const schedBlock = src.match(/SCHEDULE[^=]*=\s*\{([\s\S]*?)\}/);
	if (schedBlock) {
		for (const m of schedBlock[1].matchAll(
			/["']?([\w-]+)["']?\s*:\s*"([\d-]+)"/g,
		)) {
			schedule[m[1]] = m[2];
		}
	}
	return slugs.filter((s) => !schedule[s] || schedule[s] <= today);
}

const publishedSlugs = publishedSlugsFrom("app/content/instruments.ts");
const publishedDawSlugs = publishedSlugsFrom("app/content/daws.ts");

const staticPaths = [
	["/", 1.0, "weekly"],
	["/download", 0.9, "monthly"],
	["/plans", 0.9, "monthly"],
	["/instruments", 0.8, "weekly"],
	["/daw", 0.8, "weekly"],
	["/help", 0.7, "monthly"],
	["/about", 0.5, "yearly"],
	["/contact", 0.4, "yearly"],
	["/terms", 0.2, "yearly"],
	["/privacy", 0.2, "yearly"],
	["/refunds", 0.2, "yearly"],
	["/acceptable-use", 0.2, "yearly"],
];

const entries = [
	...staticPaths,
	...publishedSlugs.map((s) => [`/instruments/${s}`, 0.7, "monthly"]),
	...publishedDawSlugs.map((s) => [`/daw/${s}`, 0.7, "monthly"]),
];

const body = entries
	.map(
		([path, priority, freq]) =>
			`  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`,
	)
	.join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(
	`sitemap.xml: ${entries.length} urls (${publishedSlugs.length} instrument + ${publishedDawSlugs.length} DAW pages)`,
);
