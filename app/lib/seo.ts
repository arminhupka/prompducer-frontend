/**
 * Central SEO helper for SUMMONIC (React Router 7).
 *
 * `seo()` returns a complete meta-descriptor array for a route's `meta()` export:
 * title, description, keywords, robots, canonical link, Open Graph and Twitter card.
 * Per-route JSON-LD is added with the `{ "script:ld+json": ... }` descriptor (RR7
 * renders it as a <script type="application/ld+json">). Site-wide Organization /
 * WebSite / SoftwareApplication graph lives in `root.tsx` so it is on every page.
 */

export const SITE = {
	name: "SUMMONIC",
	/** Canonical public host (summonic.ai 301s from summonic.producersources.com). */
	url: "https://summonic.ai",
	titleSuffix: " | SUMMONIC",
	defaultTitle: "SUMMONIC - Imagine your instrument",
	description:
		"SUMMONIC is a text-to-audio instrument plugin (VST3 / AU / AAX, macOS & Windows). Describe an instrument and generate it, shape it into a playable sound, and own every result - royalty-free.",
	ogImage: "https://summonic.ai/og.png",
	locale: "en_US",
} as const;

export type SeoInput = {
	/** Page title without the site suffix. Omit to use the default title verbatim. */
	title?: string;
	description?: string;
	/** Canonical path, e.g. "/plans". Defaults to the site root. */
	path?: string;
	keywords?: readonly string[];
	/** Absolute image URL for OG/Twitter. Defaults to the site OG image. */
	image?: string;
	/** og:type - "website" (default) or "article". */
	type?: "website" | "article";
	/** Keep the page out of the index (account, checkout, auth screens). */
	noindex?: boolean;
	/** Extra descriptors (e.g. a JSON-LD block) appended verbatim. */
	extra?: Array<Record<string, unknown>>;
};

export function absUrl(path = ""): string {
	if (!path) return SITE.url;
	return path.startsWith("http") ? path : SITE.url + path;
}

export function seo(input: SeoInput = {}): Array<Record<string, unknown>> {
	const title = input.title ? `${input.title}${SITE.titleSuffix}` : SITE.defaultTitle;
	const description = input.description ?? SITE.description;
	const url = absUrl(input.path);
	const image = input.image ?? SITE.ogImage;

	const tags: Array<Record<string, unknown>> = [
		{ title },
		{ name: "description", content: description },
	];

	if (input.keywords?.length) {
		tags.push({ name: "keywords", content: input.keywords.join(", ") });
	}

	tags.push({
		name: "robots",
		content: input.noindex
			? "noindex, nofollow"
			: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
	});

	// Open Graph
	tags.push(
		{ property: "og:type", content: input.type ?? "website" },
		{ property: "og:site_name", content: SITE.name },
		{ property: "og:locale", content: SITE.locale },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:url", content: url },
		{ property: "og:image", content: image },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
	);

	// Twitter
	tags.push(
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
	);

	// Canonical (RR7 renders `tagName:"link"` as a <link>)
	if (!input.noindex) {
		tags.push({ tagName: "link", rel: "canonical", href: url });
	}

	if (input.extra?.length) tags.push(...input.extra);

	return tags;
}

/** Wrap an object as an RR7 JSON-LD meta descriptor. */
export function jsonLd(data: unknown): Record<string, unknown> {
	return { "script:ld+json": data };
}

/* ------------------------------------------------------------------ graphs */

const ORG_ID = `${SITE.url}/#org`;
const WEBSITE_ID = `${SITE.url}/#website`;
const APP_ID = `${SITE.url}/#app`;

/** Organization + WebSite + SoftwareApplication - injected site-wide in root.tsx. */
export const SITE_JSONLD = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": ORG_ID,
			name: "SUMMONIC",
			url: SITE.url,
			logo: {
				"@type": "ImageObject",
				url: `${SITE.url}/icon-512.png`,
			},
			parentOrganization: {
				"@type": "Organization",
				name: "Producersources",
				url: "https://producersources.com",
			},
			sameAs: [
				"https://producersources.com",
				"https://instagram.com/producersources",
				"https://www.youtube.com/@ProducerSources",
				"https://www.tiktok.com/@producersources",
				"https://x.com/producersources",
			],
		},
		{
			"@type": "WebSite",
			"@id": WEBSITE_ID,
			url: SITE.url,
			name: "SUMMONIC",
			publisher: { "@id": ORG_ID },
			inLanguage: "en",
		},
		{
			"@type": "SoftwareApplication",
			"@id": APP_ID,
			name: "SUMMONIC",
			applicationCategory: "MultimediaApplication",
			applicationSubCategory: "Audio Plugin (VST3 / AU / AAX)",
			operatingSystem: "macOS, Windows",
			description: SITE.description,
			url: SITE.url,
			publisher: { "@id": ORG_ID },
			offers: {
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD",
				description: "Free plugin download with credit-based generation.",
			},
		},
	],
};

/** SoftwareApplication for the landing page (with the plan price range). */
export const APP_PRODUCT_JSONLD = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "SUMMONIC",
	applicationCategory: "MultimediaApplication",
	operatingSystem: "macOS, Windows",
	description: SITE.description,
	url: SITE.url,
	softwareVersion: "1.0",
	offers: {
		"@type": "AggregateOffer",
		priceCurrency: "USD",
		lowPrice: "0",
		highPrice: "29.99",
		offerCount: "5",
	},
	publisher: { "@id": ORG_ID },
};

/** Plan pricing for /plans Offer rich results. Keep in sync with the live plans. */
export const PLANS_JSONLD = {
	"@context": "https://schema.org",
	"@type": "Product",
	name: "SUMMONIC subscription",
	description:
		"Monthly credit plans for SUMMONIC, the text-to-audio instrument plugin. Every new account gets 30 free credits.",
	brand: { "@type": "Brand", name: "SUMMONIC" },
	url: `${SITE.url}/plans`,
	offers: [
		{ name: "Starter", price: "3.99" },
		{ name: "Creator", price: "7.99" },
		{ name: "Pro", price: "14.99" },
		{ name: "Studio", price: "29.99" },
	].map((p) => ({
		"@type": "Offer",
		name: p.name,
		price: p.price,
		priceCurrency: "USD",
		category: "Subscription",
		url: `${SITE.url}/plans`,
		availability: "https://schema.org/InStock",
	})),
};

/** Build a BreadcrumbList graph from [{name, path}] crumbs. */
export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((it, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: it.name,
			item: absUrl(it.path),
		})),
	};
}

/** Build a FAQPage graph from plain-text Q&As. */
export function faqLd(items: ReadonlyArray<{ q: string; a: string }>) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	};
}
