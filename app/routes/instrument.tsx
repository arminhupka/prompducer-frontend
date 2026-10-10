import { Link, useParams } from "react-router";
import type { Route } from "./+types/instrument";
import {
	getInstrument,
	type Instrument,
	publishedInstruments,
} from "~/content/instruments";
import { breadcrumbLd, jsonLd, seo } from "~/lib/seo";

export function meta({ params }: Route.MetaArgs) {
	const i = getInstrument(params.slug);
	if (!i) {
		return seo({ title: "Instrument not found", noindex: true });
	}
	const title = i.keyword.replace(/\b\w/g, (c) => c.toUpperCase());
	return seo({
		title,
		path: `/instruments/${i.slug}`,
		description: `${i.tagline} Free plugin, VST3 / AU / AAX, macOS and Windows. Own every sound you make.`,
		keywords: [i.keyword, `text to ${i.name}`, `generate ${i.name}`, `AI ${i.name} VST`],
		extra: [
			jsonLd(
				breadcrumbLd([
					{ name: "Home", path: "/" },
					{ name: "Instruments", path: "/instruments" },
					{ name: title, path: `/instruments/${i.slug}` },
				]),
			),
		],
	});
}

export default function InstrumentPage() {
	const params = useParams();
	const i: Instrument | undefined = getInstrument(params.slug ?? "");

	if (!i) {
		return (
			<div className="mx-auto max-w-lg space-y-5 py-16 text-center">
				<h1 className="vst-display text-3xl text-white">Instrument not found</h1>
				<p className="text-sm text-white/65">
					That page is not available yet. Browse everything you can generate:
				</p>
				<Link
					to="/instruments"
					className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/35"
				>
					All instruments
				</Link>
			</div>
		);
	}

	const h1 = i.keyword.replace(/\b\w/g, (c) => c.toUpperCase());
	const siblings = publishedInstruments()
		.filter((s) => s.slug !== i.slug)
		.slice(0, 3);

	return (
		<div className="mx-auto max-w-3xl space-y-10 pb-6">
			<nav className="text-xs text-white/45">
				<Link to="/" className="hover:text-white/70">
					Home
				</Link>{" "}
				/{" "}
				<Link to="/instruments" className="hover:text-white/70">
					Instruments
				</Link>{" "}
				/ <span className="text-white/70">{h1}</span>
			</nav>

			<header className="text-center">
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-pink-300/80">
					Text to sound
				</p>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-5xl">
					{h1}
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
					{i.tagline}
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-3">
					<Link
						to="/download"
						className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
					>
						Download free
					</Link>
					<Link
						to="/plans"
						className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white/85 transition hover:border-white/35"
					>
						See plans
					</Link>
				</div>
			</header>

			<section className="vst-panel space-y-4 p-6 text-sm leading-6 text-white/75 sm:p-9">
				{i.intro.map((p) => (
					<p key={p.slice(0, 24)}>{p}</p>
				))}
			</section>

			<section className="space-y-3">
				<h2 className="vst-display text-center text-xl text-white sm:text-2xl">
					Prompts to try
				</h2>
				<div className="flex flex-wrap justify-center gap-2.5">
					{i.prompts.map((p) => (
						<span
							key={p}
							className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/80"
						>
							“{p}”
						</span>
					))}
				</div>
			</section>

			<section className="grid gap-4 sm:grid-cols-3">
				{i.points.map((pt) => (
					<div key={pt.title} className="vst-panel p-5">
						<h3 className="mb-1.5 font-semibold text-white">{pt.title}</h3>
						<p className="text-sm text-white/65">{pt.body}</p>
					</div>
				))}
			</section>

			{siblings.length > 0 && (
				<section className="space-y-3">
					<h2 className="vst-display text-center text-xl text-white sm:text-2xl">
						More to generate
					</h2>
					<div className="flex flex-wrap justify-center gap-2.5">
						{siblings.map((s) => (
							<Link
								key={s.slug}
								to={`/instruments/${s.slug}`}
								className="rounded-full border border-white/12 px-4 py-2 text-sm text-cyan-200 transition hover:border-white/35"
							>
								{s.keyword}
							</Link>
						))}
						<Link
							to="/instruments"
							className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/70 transition hover:border-white/35"
						>
							All instruments
						</Link>
					</div>
				</section>
			)}
		</div>
	);
}
