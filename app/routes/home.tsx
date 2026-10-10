import LandingPage from "~/pages/LandingPage/LandingPage";
import { APP_PRODUCT_JSONLD, jsonLd, seo } from "~/lib/seo";

export function meta() {
	return seo({
		path: "/",
		description:
			"SUMMONIC is a text-to-audio instrument plugin (VST3 / AU / AAX, Windows & macOS). Describe an instrument, generate three playable variations, shape and mix them in-plugin, and own every sound - royalty-free.",
		keywords: [
			"text to audio plugin",
			"AI instrument generator",
			"AI sound generator VST",
			"generate instruments from text",
			"AI sample generator plugin",
			"prompt to sound",
			"royalty-free AI sounds",
			"VST3 AU AAX",
		],
		extra: [jsonLd(APP_PRODUCT_JSONLD)],
	});
}

export default function Home() {
	return <LandingPage />;
}
