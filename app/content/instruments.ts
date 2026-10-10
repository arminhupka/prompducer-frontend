/**
 * Programmatic content-SEO pages: "AI <instrument> generator" use-case landings.
 * Each targets a high-intent long-tail ("AI 808 generator", "text to bass VST", ...)
 * and routes at /instruments/:slug, with a hub at /instruments.
 *
 * Publishing is date-gated (SCHEDULE) and evaluated at REQUEST time (the app is SSR),
 * so a page 404s and stays out of the sitemap until its date - no rebuild needed.
 * Unlisted slugs are live immediately.
 */

export type Instrument = {
	slug: string;
	/** Instrument noun used in the H1 keyword, e.g. "808". */
	name: string;
	/** Primary target keyword. */
	keyword: string;
	tagline: string;
	/** 2-3 short paragraphs. */
	intro: string[];
	/** Example prompts shown as chips - also great for long-tail coverage. */
	prompts: string[];
	/** Selling points specific to this instrument. */
	points: { title: string; body: string }[];
};

export const INSTRUMENTS: Instrument[] = [
	{
		slug: "808",
		name: "808",
		keyword: "AI 808 generator",
		tagline: "Generate custom 808s from a text prompt - tuned, glideable and yours.",
		intro: [
			"Stop scrolling through the same 808 packs every other producer already owns. With SUMMONIC you describe the 808 you hear - \"long distorted 808 with a hard knock\" - and it generates a brand-new one on the spot, right inside your DAW.",
			"Every 808 comes with pitch-fix and glide built in, so it plays cleanly across the keyboard and slides between notes like a real 808 should. Run it through the built-in drive and EQ to dial in the knock, then save it as a preset.",
		],
		prompts: [
			"Long distorted 808 with a hard knock",
			"Clean sub 808, minimal harmonics",
			"Gritty overdriven 808 for drill",
			"Boomy 808 with a soft attack",
		],
		points: [
			{ title: "Glide and pitch-fix built in", body: "Every generated 808 is playable and glideable across the keyboard - no manual tuning." },
			{ title: "Shape the knock in-plugin", body: "Drive, EQ and compressor let you push the attack and saturation without a separate chain." },
			{ title: "Never a duplicate", body: "Your 808 is generated for you - it will not be on anyone else's beat." },
		],
	},
	{
		slug: "bass",
		name: "bass",
		keyword: "AI bass generator",
		tagline: "Describe a bass and generate a playable one - analog, sub, reese or plucked.",
		intro: [
			"From warm Moog-style sub bass to a snarling reese, SUMMONIC turns a text prompt into a fully playable bass instrument inside your DAW. No sample-pack digging, no synth-patch tweaking for an hour.",
			"Because SUMMONIC builds an instrument and not a one-shot, you can play basslines across the whole keyboard, add glide, and finish the tone with the built-in drive, chorus and EQ.",
		],
		prompts: [
			"Warm analog Moog bass, round and deep",
			"Aggressive reese bass for DnB",
			"Plucked funk bass, tight and bright",
			"Dark mood synth bass, analog",
		],
		points: [
			{ title: "Playable across the keyboard", body: "Generated as an instrument, so you can perform real basslines, not trigger a single note." },
			{ title: "Analog character on tap", body: "The retro and drive stages add tape wow and saturation for an analog feel." },
			{ title: "Royalty-free", body: "Every bass you generate is yours to release, with no clearance worries." },
		],
	},
	{
		slug: "drums",
		name: "drums",
		keyword: "AI drum generator",
		tagline: "Generate one-shots and percussion from words - kicks, snares, hats and more.",
		intro: [
			"Need a punchy kick, a crisp snare or a set of gritty hats that do not sound like the last pack you bought? Describe it and SUMMONIC generates original drum sounds inside your DAW, three variations at a time.",
			"Shape each hit with the built-in EQ, drive and reverb, then save the ones you love into your own evolving drum library.",
		],
		prompts: [
			"Punchy trap kick with a tight tail",
			"Crisp layered snare with a short room",
			"Gritty lo-fi hi-hats, slightly detuned",
			"Deep boom-bap kick, vinyl character",
		],
		points: [
			{ title: "Three takes per prompt", body: "Every generation returns three variations so you keep the best hit." },
			{ title: "Finish hits in the rack", body: "EQ, transient drive and reverb shape each drum without leaving the plugin." },
			{ title: "Build your own kit", body: "Save results as presets and grow a drum library nobody else has." },
		],
	},
	{
		slug: "piano",
		name: "piano",
		keyword: "AI piano generator",
		tagline: "Generate keys and pianos from a description - grand, felt, lo-fi or electric.",
		intro: [
			"Whether you want a bright grand for a pop record or a dusty felt piano for a lo-fi loop, SUMMONIC generates a playable keyboard instrument from your prompt in seconds.",
			"Add movement with the built-in chorus and modulation, tuck it back with reverb, and it is ready to play straight into your session.",
		],
		prompts: [
			"Warm felt piano, soft and intimate",
			"Bright pop grand piano",
			"Dusty lo-fi piano with vinyl noise",
			"Vintage electric piano, Rhodes style",
		],
		points: [
			{ title: "Fully playable", body: "Perform chords and melodies across the keyboard, not just a single sampled note." },
			{ title: "Mood in one prompt", body: "Ask for felt, dusty, bright or vintage and get the character you described." },
			{ title: "Session-ready", body: "The built-in reverb and modulation get it mix-ready before you drop it in." },
		],
	},
	{
		slug: "synth",
		name: "synth",
		keyword: "AI synth generator",
		tagline: "Describe a synth and generate it - leads, plucks, keys and evolving tones.",
		intro: [
			"SUMMONIC is a synth that speaks English. Ask for \"a bright supersaw lead\" or \"a warm evolving pad\" and it generates the instrument, ready to play, instead of making you design a patch from scratch.",
			"Every result is shapeable with a full rack - EQ, drive, chorus, delay, reverb and modulation - so you can take it from raw tone to finished sound in one place.",
		],
		prompts: [
			"Bright supersaw lead for EDM",
			"Warm evolving analog pad",
			"Glassy digital pluck with delay",
			"Retro 80s synth brass",
		],
		points: [
			{ title: "No patch design needed", body: "Describe the sound in words and skip the hours of synth programming." },
			{ title: "Full modulation rack", body: "Shape movement with the built-in modulation, chorus and tempo delay." },
			{ title: "Unlimited palette", body: "Any tone you can describe, generated fresh and owned by you." },
		],
	},
	{
		slug: "pads",
		name: "pad",
		keyword: "AI pad generator",
		tagline: "Generate lush pads and textures from a text prompt for instant atmosphere.",
		intro: [
			"Pads set the mood, and SUMMONIC lets you generate exactly the one you hear - warm and analog, glassy and digital, or dark and cinematic - as a playable instrument in your DAW.",
			"Layer the built-in reverb and modulation for width and motion, and your atmosphere is ready in under a minute.",
		],
		prompts: [
			"Warm analog pad, slow attack",
			"Dark cinematic drone pad",
			"Glassy digital shimmer pad",
			"Airy vocal-like choir pad",
		],
		points: [
			{ title: "Instant atmosphere", body: "Go from a prompt to a lush, moving pad in seconds." },
			{ title: "Width and motion built in", body: "Reverb, chorus and modulation add space and life in the plugin." },
			{ title: "Cinematic to pop", body: "Any texture you can describe, generated to fit your record." },
		],
	},
	{
		slug: "guitar",
		name: "guitar",
		keyword: "AI guitar generator",
		tagline: "Generate guitar tones from words - clean, distorted, trap or acoustic.",
		intro: [
			"From a heavily distorted crunchy electric to a soft fingerpicked acoustic, SUMMONIC generates guitar instruments from a text prompt so you can play the part yourself, no session guitarist required.",
			"Push the tone with the built-in drive and finish it with reverb and delay, all inside the plugin.",
		],
		prompts: [
			"Heavily distorted crunchy electric guitar, sustained attack",
			"Clean funk guitar with light chorus",
			"Soft fingerpicked acoustic guitar",
			"Trap melody guitar, bright and plucky",
		],
		points: [
			{ title: "Play it yourself", body: "A playable guitar instrument, so you write the riff instead of hunting loops." },
			{ title: "Amp-style tone shaping", body: "Drive and EQ push the tone from clean to crunch inside the plugin." },
			{ title: "Original every time", body: "No shared loop packs - the tone is generated for your track." },
		],
	},
	{
		slug: "vocal-chops",
		name: "vocal chop",
		keyword: "AI vocal chop generator",
		tagline: "Generate vocal-style chops and textures from a prompt, royalty-free.",
		intro: [
			"Vocal chops add energy, but stock packs get overused fast. SUMMONIC generates vocal-style textures and chops from your description, so the hook detail on your record is unique to you.",
			"Pitch, loop and glide them into a playable instrument, then process with the built-in delay and reverb for a modern chopped-vocal feel.",
		],
		prompts: [
			"Airy chopped vocal texture, ethereal",
			"Bright staccato vocal pluck",
			"Warm soulful vocal ah, sustained",
			"Formant-shifted robotic vocal chop",
		],
		points: [
			{ title: "Unique hooks", body: "Generated textures keep your topline detail out of every other beat." },
			{ title: "Playable and loopable", body: "Loop, pitch and glide turn a chop into an instrument you can perform." },
			{ title: "Royalty-free", body: "No sample clearance - everything you generate is yours." },
		],
	},
	{
		slug: "lofi",
		name: "lo-fi",
		keyword: "AI lo-fi sound generator",
		tagline: "Generate dusty lo-fi keys, textures and one-shots from a text prompt.",
		intro: [
			"Lo-fi lives on character. SUMMONIC generates dusty pianos, warm tape textures and vinyl-flecked one-shots from your prompt, then lets you degrade and saturate them with the built-in retro and drive stages.",
			"It is the fastest way to fill a lo-fi beat with sounds that feel hand-made instead of pulled from the same tired pack.",
		],
		prompts: [
			"Dusty lo-fi piano with vinyl crackle",
			"Warm tape-saturated Rhodes",
			"Muffled nostalgic pad, wobbly pitch",
			"Soft lo-fi guitar loop, mellow",
		],
		points: [
			{ title: "Character on tap", body: "The retro/degrade stage adds wow, flutter and bit-crush for real lo-fi grit." },
			{ title: "Hand-made feel", body: "Generated sounds beat overused packs for a personal, dusty vibe." },
			{ title: "Fast to a full beat", body: "Keys, pads and one-shots from one plugin, in minutes." },
		],
	},
	{
		slug: "trap",
		name: "trap",
		keyword: "AI trap sound generator",
		tagline: "Generate trap 808s, melodies and one-shots from words, inside your DAW.",
		intro: [
			"Trap moves fast, and so should your sound design. SUMMONIC generates the 808s, bells, plucks and melody instruments a trap beat needs from a text prompt, three variations at a time.",
			"Everything is playable and shapeable in-plugin, so you go from idea to finished melody without leaving your session.",
		],
		prompts: [
			"Dark trap bell, detuned and haunting",
			"Long distorted 808 for trap",
			"Bright trap pluck lead",
			"Eerie music-box melody for trap",
		],
		points: [
			{ title: "Whole trap palette", body: "808s, bells, plucks and leads from one text-to-sound plugin." },
			{ title: "Playable melodies", body: "Generated instruments let you write the melody, not just trigger a loop." },
			{ title: "Stand-out sound", body: "Original, owned sounds that stay unique to you and your records." },
		],
	},
	{
		slug: "one-shots",
		name: "one-shot",
		keyword: "AI one-shot generator",
		tagline: "Generate original one-shots for any genre from a text prompt.",
		intro: [
			"One-shots are the building blocks of a beat. SUMMONIC generates original kicks, snares, stabs, hits and fx one-shots from your description, so your kit is unique instead of shared with a million downloads.",
			"Shape each one-shot with the built-in rack and file it into your personal preset library.",
		],
		prompts: [
			"Metallic percussion one-shot, bright",
			"Cinematic impact hit with sub",
			"Vintage rimshot, dry and tight",
			"Glitchy fx one-shot, digital",
		],
		points: [
			{ title: "Any hit you can describe", body: "Percussion, stabs, impacts and fx from a single prompt." },
			{ title: "Three per generation", body: "Pick the best of three variations every time." },
			{ title: "Your own kit", body: "Save results as presets and build a one-shot library that is yours alone." },
		],
	},
	{
		slug: "ambient",
		name: "ambient",
		keyword: "AI ambient sound generator",
		tagline: "Generate ambient textures, drones and soundscapes from a prompt.",
		intro: [
			"For scoring, ambient and cinematic work, SUMMONIC generates evolving drones, textures and soundscapes from a text description - a whole sound-design session in a single plugin.",
			"Stack the built-in reverb and modulation for depth and motion, and you have a bespoke atmosphere in minutes.",
		],
		prompts: [
			"Evolving dark drone, cinematic tension",
			"Soft airy soundscape, weightless",
			"Metallic industrial texture, cold",
			"Warm nostalgic ambient wash",
		],
		points: [
			{ title: "Bespoke atmospheres", body: "Describe a mood and generate the exact texture your scene needs." },
			{ title: "Depth and motion", body: "Reverb and modulation build evolving, three-dimensional space." },
			{ title: "One-plugin sound design", body: "No stacking five tools - generate and shape in SUMMONIC." },
		],
	},
];

/**
 * Roll-out schedule: slug -> ISO publish date. Unlisted = live immediately.
 * Empty = every page is live now (so a single build ships them all). The gate
 * machinery stays in place: to drip future pages, add slug->date entries here
 * and rebuild the site on/after each date (the SPA prerenders at build time).
 */
export const SCHEDULE: Record<string, string> = {};

function todayIso(): string {
	return new Date().toISOString().slice(0, 10);
}

export function isInstrumentPublished(slug: string): boolean {
	const at = SCHEDULE[slug];
	return !at || at <= todayIso();
}

export function publishedInstruments(): Instrument[] {
	return INSTRUMENTS.filter((i) => isInstrumentPublished(i.slug));
}

export function getInstrument(slug: string): Instrument | undefined {
	const i = INSTRUMENTS.find((x) => x.slug === slug);
	return i && isInstrumentPublished(i.slug) ? i : undefined;
}
