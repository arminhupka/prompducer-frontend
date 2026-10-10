import { Link } from "react-router";
import { publishedDaws } from "~/content/daws";
import { breadcrumbLd, jsonLd, SITE, seo } from "~/lib/seo";

export function meta() {
	return seo({
		title: "AI sound generation in your DAW",
		path: "/daw",
		description:
			"Use SUMMONIC to generate original instruments from text inside FL Studio, Ableton Live, Logic Pro and Studio One - VST3, AU and AAX, Mac and Windows.",
		keywords: [
			"AI sample generator FL Studio",
			"AI VST for Ableton",
			"AI plugin Logic Pro",
			"AI sound generator DAW",
		],
		extra: [
			jsonLd(
				breadcrumbLd([
					{ name: "Home", path: "/" },
					{ name: "DAWs", path: "/daw" },
				]),
			),
			jsonLd({
				"@context": "https://schema.org",
				"@type": "ItemList",
				itemListElement: publishedDaws().map((d, idx) => ({
					"@type": "ListItem",
					position: idx + 1,
					name: d.keyword,
					url: `${SITE.url}/daw/${d.slug}`,
				})),
			}),
		],
	});
}

export default function DawHub() {
	const items = publishedDaws();
	return (
		<div className="mx-auto max-w-4xl space-y-10 pb-6">
			<header className="text-center">
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
					Works in your DAW
				</p>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-5xl">
					AI sound generation, in your DAW
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
					SUMMONIC runs as VST3, AU and AAX. Pick your DAW to see how to load it and
					start generating original instruments from a text prompt.
				</p>
			</header>

			<div className="grid gap-4 sm:grid-cols-2">
				{items.map((d) => (
					<Link
						key={d.slug}
						to={`/daw/${d.slug}`}
						className="vst-panel group flex flex-col gap-2 p-5 transition hover:border-white/25"
					>
						<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300/80">
							{d.format}
						</span>
						<span className="vst-display text-lg text-white">
							SUMMONIC in {d.name}
						</span>
						<span className="text-sm text-white/60">{d.tagline}</span>
						<span className="mt-auto pt-2 text-sm font-semibold text-cyan-200 opacity-0 transition group-hover:opacity-100">
							Set it up →
						</span>
					</Link>
				))}
			</div>

			<div className="text-center">
				<Link
					to="/download"
					className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
				>
					Download SUMMONIC free
				</Link>
			</div>
		</div>
	);
}
