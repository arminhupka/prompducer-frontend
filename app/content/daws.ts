/**
 * Programmatic DAW landing pages: "AI sound generator in <DAW>".
 * Targets DAW-specific long-tails (e.g. "AI sample generator FL Studio"), which are
 * high-intent and low-competition. Routes at /daw/:slug with a hub at /daw.
 * Prerendered like the instrument pages.
 */

export type Daw = {
	slug: string;
	/** DAW display name, e.g. "FL Studio". */
	name: string;
	keyword: string;
	/** Plugin format that DAW loads. */
	format: string;
	tagline: string;
	intro: string[];
	/** How to load SUMMONIC in this DAW. */
	steps: string[];
	points: { title: string; body: string }[];
};

export const DAWS: Daw[] = [
	{
		slug: "fl-studio",
		name: "FL Studio",
		keyword: "AI sample generator for FL Studio",
		format: "VST3",
		tagline: "Generate original instruments from text right inside FL Studio.",
		intro: [
			"FL Studio producers move fast, and digging for the right 808 or melody sound breaks the flow. SUMMONIC drops into FL Studio as a VST3 instrument, so you can type the sound you want and generate it without leaving the project.",
			"Because SUMMONIC generates a playable instrument, not a static loop, you can write the pattern in the Piano roll exactly like any other channel - then shape and mix it in the plugin.",
		],
		steps: [
			"Download SUMMONIC free and run the installer (it adds the VST3).",
			"In FL Studio, open Options, Manage plugins, and Find installed plugins so SUMMONIC appears.",
			"Add SUMMONIC to a channel, type your prompt, and generate three options.",
			"Play it in the Piano roll, shape it with the built-in rack, and save it as a preset.",
		],
		points: [
			{ title: "Loads as VST3", body: "SUMMONIC installs as a VST3 that FL Studio finds on a normal plugin rescan." },
			{ title: "Piano-roll ready", body: "Generated sounds are playable instruments, so they work in the Piano roll like any channel." },
			{ title: "No sample digging", body: "Type the 808, bass or melody you want and generate it in the project." },
		],
	},
	{
		slug: "ableton-live",
		name: "Ableton Live",
		keyword: "AI VST for Ableton Live",
		format: "VST3 / AU",
		tagline: "Type a prompt and generate playable instruments inside Ableton Live.",
		intro: [
			"Ableton rewards fast idea capture, and SUMMONIC fits that perfectly: load it on a MIDI track, describe the sound you hear, and generate a brand-new instrument without browsing packs.",
			"It runs as VST3 and AU, so it works on both Mac and Windows installs of Live, and every sound you make is playable across the keyboard and shapeable in-plugin.",
		],
		steps: [
			"Install SUMMONIC free (VST3 on Windows and Mac, AU on Mac).",
			"In Live, enable the plugin folder under Preferences, Plug-Ins, then rescan.",
			"Drag SUMMONIC onto a MIDI track, type your prompt, and generate.",
			"Play the result, tweak it with the built-in effects, and save presets you like.",
		],
		points: [
			{ title: "VST3 and AU", body: "Works on Mac and Windows versions of Live with a standard plugin rescan." },
			{ title: "Fast idea capture", body: "From a prompt to a playable instrument on a MIDI track in seconds." },
			{ title: "Own every sound", body: "Everything you generate is royalty-free and unique to your set." },
		],
	},
	{
		slug: "logic-pro",
		name: "Logic Pro",
		keyword: "AI instrument plugin for Logic Pro",
		format: "AU",
		tagline: "Generate custom instruments from text inside Logic Pro.",
		intro: [
			"Logic Pro uses Audio Units, and SUMMONIC installs as an AU instrument that passes Apple's validation, so it shows up cleanly in your plugin list on Apple Silicon and Intel Macs.",
			"Describe the instrument you want, generate three variations, and play the one you keep straight into your Logic project - then finish it with the built-in EQ, drive, delay and reverb.",
		],
		steps: [
			"Download SUMMONIC free and run the signed, notarized installer.",
			"Open Logic Pro; it validates the AU on launch (or use Plug-in Manager to rescan).",
			"Add SUMMONIC as an instrument, type your prompt, and generate.",
			"Play it in, shape it in the rack, and save it to your preset library.",
		],
		points: [
			{ title: "Native AU", body: "Signed, notarized Audio Unit that passes Logic's validation on Apple Silicon and Intel." },
			{ title: "Playable instrument", body: "Generated sounds play across the keyboard like any Logic instrument." },
			{ title: "Finish in the box", body: "The built-in rack shapes the sound without extra Logic plugins." },
		],
	},
	{
		slug: "studio-one",
		name: "Studio One",
		keyword: "AI sound generator for Studio One",
		format: "VST3 / AU",
		tagline: "Prompt-based instrument generation inside PreSonus Studio One.",
		intro: [
			"Studio One's drag-and-drop workflow pairs well with fast sound creation. SUMMONIC loads as VST3 and AU, so you can generate an original instrument from a text prompt and drop it into the arrangement without leaving Studio One.",
			"Every sound is a playable instrument you can perform and shape, and it is yours to release royalty-free.",
		],
		steps: [
			"Install SUMMONIC free (VST3 on Windows and Mac, AU on Mac).",
			"In Studio One, open Studio One, Options, Locations, VST Plug-Ins and reset the blocklist or rescan.",
			"Add SUMMONIC to an instrument track, type your prompt, and generate.",
			"Play the result, shape it in the rack, and save presets.",
		],
		points: [
			{ title: "VST3 and AU", body: "Loads in Studio One on Mac and Windows with a standard rescan." },
			{ title: "Drop-in workflow", body: "Generate an instrument and drop it straight into the arrangement." },
			{ title: "Royalty-free", body: "Own every sound you generate, with no clearance worries." },
		],
	},
];

function todayIso(): string {
	return new Date().toISOString().slice(0, 10);
}

/** Roll-out schedule: slug -> ISO date. Empty = all live now. */
export const SCHEDULE: Record<string, string> = {};

export function isDawPublished(slug: string): boolean {
	const at = SCHEDULE[slug];
	return !at || at <= todayIso();
}

export function publishedDaws(): Daw[] {
	return DAWS.filter((d) => isDawPublished(d.slug));
}

export function getDaw(slug: string): Daw | undefined {
	const d = DAWS.find((x) => x.slug === slug);
	return d && isDawPublished(d.slug) ? d : undefined;
}
