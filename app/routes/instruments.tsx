import { Link } from "react-router";
import { publishedInstruments } from "~/content/instruments";
import { breadcrumbLd, jsonLd, SITE, seo } from "~/lib/seo";

export function meta() {
	return seo({
		title: "Generate any instrument from text",
		path: "/instruments",
		description:
			"Use SUMMONIC to generate 808s, bass, drums, keys, synths, pads, guitars and more from a text prompt - playable, shapeable and royalty-free inside your DAW.",
		keywords: [
			"AI instrument generator",
			"text to instrument",
			"AI sound generator",
			"generate 808 bass drums synth from text",
		],
		extra: [
			jsonLd(
				breadcrumbLd([
					{ name: "Home", path: "/" },
					{ name: "Instruments", path: "/instruments" },
				]),
			),
			jsonLd({
				"@context": "https://schema.org",
				"@type": "ItemList",
				itemListElement: publishedInstruments().map((i, idx) => ({
					"@type": "ListItem",
					position: idx + 1,
					name: i.keyword,
					url: `${SITE.url}/instruments/${i.slug}`,
				})),
			}),
		],
	});
}

export default function InstrumentsHub() {
	const items = publishedInstruments();
	return (
		<div className="mx-auto max-w-5xl space-y-10 pb-6">
			<header className="text-center">
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
					Use cases
				</p>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-5xl">
					Generate any instrument from text
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
					SUMMONIC turns a plain-text description into a brand-new, playable
					instrument inside your DAW. Pick a starting point below - every sound
					you make is yours to keep, royalty-free.
				</p>
			</header>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((i) => (
					<Link
						key={i.slug}
						to={`/instruments/${i.slug}`}
						className="vst-panel group flex flex-col gap-2 p-5 transition hover:border-white/25"
					>
						<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300/80">
							{i.keyword}
						</span>
						<span className="vst-display text-lg text-white">
							Generate {i.name} sounds
						</span>
						<span className="text-sm text-white/60">{i.tagline}</span>
						<span className="mt-auto pt-2 text-sm font-semibold text-cyan-200 opacity-0 transition group-hover:opacity-100">
							Explore →
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
