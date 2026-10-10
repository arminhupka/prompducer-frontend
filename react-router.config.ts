import type { Config } from "@react-router/dev/config";

export default {
	// SPA mode (client-side rendering only) ...
	ssr: false,
	// ... but PRERENDER the public marketing pages to static HTML at build time so
	// every crawler and social scraper (not just JS-capable Googlebot) gets real
	// per-page <title>, meta description, canonical, Open Graph and JSON-LD. App
	// screens (account, admin, auth) stay client-only SPA and are left out on purpose.
	async prerender() {
		const { INSTRUMENTS, isInstrumentPublished } = await import(
			"./app/content/instruments"
		);
		const { DAWS, isDawPublished } = await import("./app/content/daws");
		const instrumentPaths = INSTRUMENTS.filter((i) =>
			isInstrumentPublished(i.slug),
		).map((i) => `/instruments/${i.slug}`);
		const dawPaths = DAWS.filter((d) => isDawPublished(d.slug)).map(
			(d) => `/daw/${d.slug}`,
		);

		return [
			"/",
			"/download",
			"/plans",
			"/instruments",
			"/daw",
			"/help",
			"/about",
			"/contact",
			"/terms",
			"/privacy",
			"/refunds",
			"/acceptable-use",
			...instrumentPaths,
			...dawPaths,
		];
	},
} satisfies Config;
