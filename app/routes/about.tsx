import { Link } from "react-router";
import { ContentPage } from "~/components/content/ContentPage";

export function meta() {
	return [
		{ title: "About | SUMMONIC" },
		{
			name: "description",
			content:
				"SUMMONIC is a real audio-generation plugin by Producersources — imagine an instrument and generate it.",
		},
	];
}

export default function About() {
	return (
		<ContentPage
			eyebrow="Company"
			title="About SUMMONIC"
			intro="Imagine your instrument — then actually play it."
		>
			<h2>Why we built it</h2>
			<p>
				Producers spend hours hunting for the right sound. SUMMONIC flips that:
				describe what you hear in your head, and it generates a brand-new,
				fully playable instrument on the spot. No crate-digging, no sample packs,
				no clearance headaches — just the exact sound you imagined.
			</p>

			<h2>Real generation, not a library</h2>
			<p>
				SUMMONIC doesn’t search a bank of pre-made loops. It{" "}
				<strong>generates original audio from scratch</strong> every time, so each
				instrument is unique and belongs entirely to you. Shape it with loop,
				pitch and stretch controls, run it through a full effects rack, and save
				your favorites as presets.
			</p>

			<h2>Made by Producersources</h2>
			<p>
				SUMMONIC is built by{" "}
				<a
					href="https://producersources.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Producersources
				</a>
				, a company making tools and sounds for modern producers — trap, drill,
				amapiano, afrobeats, phonk, and MENA urban music. We build real DSP and
				real products for people who make records.
			</p>

			<h2>Get started</h2>
			<p>
				Every new account gets 30 free credits. Try it, then pick the plan that
				fits how much you create.
			</p>
			<p>
				<Link to="/register">Create your free account →</Link>
			</p>
		</ContentPage>
	);
}
