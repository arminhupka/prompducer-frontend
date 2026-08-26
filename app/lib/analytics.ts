/**
 * Lightweight analytics layer: GA4 + Meta Pixel, both optional (only active when
 * the env IDs are set at build time). Import.meta.env.VITE_GA4_ID / VITE_META_PIXEL_ID.
 * Safe on the server (all calls no-op when window is undefined).
 */

export const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as
	| string
	| undefined;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		fbq?: (...args: unknown[]) => void;
		dataLayer?: unknown[];
	}
}

type Params = Record<string, unknown>;

/** Fire a page_view (GA4) + PageView (Meta) on SPA navigation. */
export function pageview(path: string): void {
	if (typeof window === "undefined") return;
	if (GA4_ID && window.gtag) {
		window.gtag("event", "page_view", { page_path: path });
	}
	if (META_PIXEL_ID && window.fbq) {
		window.fbq("track", "PageView");
	}
}

/** Generic custom event to both providers. */
export function track(event: string, params: Params = {}): void {
	if (typeof window === "undefined") return;
	if (window.gtag) window.gtag("event", event, params);
	if (window.fbq) window.fbq("trackCustom", event, params);
}

// ── Conversion helpers (map to standard Meta events where they exist) ──────────

export function trackSignup(): void {
	if (typeof window === "undefined") return;
	if (window.gtag) window.gtag("event", "sign_up");
	if (window.fbq) window.fbq("track", "CompleteRegistration");
}

export function trackBeginCheckout(kind: "subscription" | "credits"): void {
	if (typeof window === "undefined") return;
	if (window.gtag) window.gtag("event", "begin_checkout", { kind });
	if (window.fbq) window.fbq("track", "InitiateCheckout", { content_category: kind });
}

export function trackGenerate(): void {
	track("generate");
}
