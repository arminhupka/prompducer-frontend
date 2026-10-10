import PlansPage from "~/pages/PlansPage/PlansPage";
import { jsonLd, PLANS_JSONLD, seo } from "~/lib/seo";

export function meta() {
	return seo({
		title: "Plans & Pricing",
		path: "/plans",
		description:
			"Choose a SUMMONIC plan and get monthly credits to generate new playable instruments. Every new user gets a one-time 30 free credits. Plans from $3.99/mo.",
		keywords: [
			"SUMMONIC pricing",
			"AI sound generator plans",
			"text to audio credits",
			"AI instrument plugin price",
		],
		extra: [jsonLd(PLANS_JSONLD)],
	});
}

export default function Plans() {
	return <PlansPage />;
}
