import { Link, useParams } from "react-router";
import type { Route } from "./+types/daw";
import { type Daw, getDaw, publishedDaws } from "~/content/daws";
import { breadcrumbLd, jsonLd, seo } from "~/lib/seo";

export function meta({ params }: Route.MetaArgs) {
	const d = getDaw(params.slug);
	if (!d) {
		return seo({ title: "DAW not found", noindex: true });
	}
	const title = `AI Sound Generation in ${d.name}`;
	return seo({
		title,
		path: `/daw/${d.slug}`,
		description: `${d.tagline} How to install and use SUMMONIC (${d.format}) in ${d.name} - generate original instruments from a text prompt.`,
		keywords: [
			d.keyword,
			`${d.name} AI plugin`,
			`AI sounds ${d.name}`,
			`text to audio ${d.name}`,
		],
		extra: [
			jsonLd(
				breadcrumbLd([
					{ name: "Home", path: "/" },
					{ name: "DAWs", path: "/daw" },
					{ name: title, path: `/daw/${d.slug}` },
				]),
			),
		],
	});
}

export default function DawPage() {
	const params = useParams();
	const d: Daw | undefined = getDaw(params.slug ?? "");

	if (!d) {
		return (
			<div className="mx-auto max-w-lg space-y-5 py-16 text-center">
				<h1 className="vst-display text-3xl text-white">DAW not found</h1>
				<Link
					to="/daw"
					className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/35"
				>
					All DAWs
				</Link>
			</div>
		);
	}

	const siblings = publishedDaws().filter((s) => s.slug !== d.slug);

	return (
		<div className="mx-auto max-w-3xl space-y-10 pb-6">
			<nav className="text-xs text-white/45">
				<Link to="/" className="hover:text-white/70">
					Home
				</Link>{" "}
				/{" "}
				<Link to="/daw" className="hover:text-white/70">
					DAWs
				</Link>{" "}
				/ <span className="text-white/70">{d.name}</span>
			</nav>

			<header className="text-center">
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-pink-300/80">
					{d.format} · {d.name}
				</p>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-5xl">
					SUMMONIC in {d.name}
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
					{d.tagline}
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-3">
					<Link
						to="/download"
						className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
					>
						Download free
					</Link>
					<Link
						to="/instruments"
						className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white/85 transition hover:border-white/35"
					>
						What you can generate
					</Link>
				</div>
			</header>

			<section className="vst-panel space-y-4 p-6 text-sm leading-6 text-white/75 sm:p-9">
				{d.intro.map((p) => (
					<p key={p.slice(0, 24)}>{p}</p>
				))}
			</section>

			<section className="space-y-4">
				<h2 className="vst-display text-center text-xl text-white sm:text-2xl">
					How to load SUMMONIC in {d.name}
				</h2>
				<ol className="mx-auto max-w-xl space-y-3">
					{d.steps.map((s, i) => (
						<li key={s.slice(0, 24)} className="flex gap-3 text-sm text-white/80">
							<span className="flex size-6 flex-none items-center justify-center rounded-full border border-pink-300/40 text-xs font-semibold text-pink-200">
								{i + 1}
							</span>
							<span>{s}</span>
						</li>
					))}
				</ol>
			</section>

			<section className="grid gap-4 sm:grid-cols-3">
				{d.points.map((pt) => (
					<div key={pt.title} className="vst-panel p-5">
						<h3 className="mb-1.5 font-semibold text-white">{pt.title}</h3>
						<p className="text-sm text-white/65">{pt.body}</p>
					</div>
				))}
			</section>

			{siblings.length > 0 && (
				<section className="space-y-3">
					<h2 className="vst-display text-center text-xl text-white sm:text-2xl">
						Other DAWs
					</h2>
					<div className="flex flex-wrap justify-center gap-2.5">
						{siblings.map((s) => (
							<Link
								key={s.slug}
								to={`/daw/${s.slug}`}
								className="rounded-full border border-white/12 px-4 py-2 text-sm text-cyan-200 transition hover:border-white/35"
							>
								{s.name}
							</Link>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
