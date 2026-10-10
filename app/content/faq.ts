/**
 * Plain-text FAQ used for the FAQPage JSON-LD on /help (rich-result eligible).
 * Keep these answers plain strings - the visible, formatted FAQ lives in
 * routes/help.tsx. This is the machine-readable mirror for search engines.
 */
export const FAQ_SCHEMA: ReadonlyArray<{ q: string; a: string }> = [
	{
		q: "What is SUMMONIC?",
		a: "SUMMONIC is a text-to-audio instrument plugin. You type a prompt and it generates brand-new, fully playable instruments right inside your DAW - real sounds created from your words, unique to you. It runs as VST3, AU and AAX on macOS and Windows.",
	},
	{
		q: "Is the plugin free?",
		a: "Yes. The SUMMONIC plugin is a free download for macOS and Windows and every new account gets a one-time 30 free credits (enough for 10 generations). Paid plans add more monthly credits.",
	},
	{
		q: "How does generation work?",
		a: "Type a description of the instrument you want, and SUMMONIC generates three original variations to choose from. Each generation costs 3 credits. You can then loop, tune and shape the sound and run it through a built-in effects rack.",
	},
	{
		q: "What is a credit?",
		a: "A credit is what a generation costs. Each generation uses 3 credits and returns 3 variations. Your plan gives you a pool of credits that refreshes every month while the plan is active.",
	},
	{
		q: "Do I own the sounds I generate?",
		a: "Yes. Every sound you generate with SUMMONIC is yours to use in your music, royalty-free. No two producers get the same result.",
	},
	{
		q: "Can I shape and mix the generated sounds?",
		a: "Yes. Each sound has loop, pitch-fix, stretch and glide controls to make it playable across the keyboard, plus a full built-in rack - EQ, compressor, drive, chorus, tempo-synced delay, reverb and modulation - so you can finish it without leaving the plugin.",
	},
	{
		q: "What formats and operating systems does SUMMONIC support?",
		a: "SUMMONIC runs as VST3, AU and AAX on macOS (Apple Silicon and Intel) and Windows x64. The installers are signed and notarized.",
	},
	{
		q: "Do I need an internet connection?",
		a: "Yes. Generation runs on SUMMONIC's cloud GPU engine, so the plugin needs an internet connection to create new sounds. Once a sound is generated and saved as a preset you can reuse it in your projects.",
	},
	{
		q: "How do I activate a plan I bought on Producersources?",
		a: "Buying a plan on Producersources gives you a code. Open SUMMONIC (or your account at summonic.ai), enter the code, and your plan activates instantly for one year. Codes do not auto-renew.",
	},
	{
		q: "Does my subscription auto-renew?",
		a: "Subscriptions bought in the app renew until you cancel. Plan codes bought on Producersources activate for 12 months and never auto-charge - when a code expires you simply buy another.",
	},
	{
		q: "Can I use my account on more than one computer?",
		a: "Yes. Sign in to SUMMONIC on any machine and your plan, credits and presets follow your account.",
	},
	{
		q: "What can I make with SUMMONIC?",
		a: "Anything you can describe: 808s and basses, drums and percussion, keys and pianos, pads and textures, leads, guitars, brass, plucks and one-shots. It is a sound engine, so it builds the instrument you ask for rather than searching a fixed library.",
	},
];
