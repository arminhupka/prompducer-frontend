import type { ReactNode } from "react";
import { Link } from "react-router";
import { ContentPage } from "~/components/content/ContentPage";

export function meta() {
	return [
		{ title: "Help Center | SUMMONIC" },
		{
			name: "description",
			content:
				"Everything about SUMMONIC - install, generating, sounds & presets, moving between computers, credits, plans, coupon codes, billing and troubleshooting.",
		},
	];
}

type QA = { q: string; a: ReactNode };
type Section = { title: string; items: QA[] };

const SECTIONS: Section[] = [
	{
		title: "Getting started",
		items: [
			{
				q: "What is SUMMONIC?",
				a: (
					<p>
						SUMMONIC is a real audio-generation instrument plugin. You type a
						prompt and it generates brand-new, fully playable instruments right
						inside your DAW - not a sample library or a search engine.
					</p>
				),
			},
			{
				q: "How do I install it?",
				a: (
					<p>
						Download the free installer from the{" "}
						<Link to="/download">Download</Link> page. On{" "}
						<strong>macOS</strong> open <code>SUMMONIC 1.0.0.pkg</code>; on{" "}
						<strong>Windows</strong> run <code>SUMMONIC - Installer.exe</code>.
						Then rescan plug-ins (or restart) in your DAW and load SUMMONIC on an
						instrument track. Each download also includes a full manual and a
						"Manual Installation" folder as a fallback.
					</p>
				),
			},
			{
				q: "Do I need an account?",
				a: (
					<p>
						Yes - open SUMMONIC in your DAW and sign in, or create a free account.
						Every new account gets a one-time <strong>30 free credits</strong>
						(enough for 10 generations), no card required.
					</p>
				),
			},
			{
				q: "Do I need an internet connection?",
				a: (
					<p>
						To sign in and to <strong>Generate</strong>, yes - generation runs on
						our servers. Playing back sounds you've already downloaded works
						offline.
					</p>
				),
			},
			{
				q: "Which formats and DAWs are supported?",
				a: (
					<p>
						SUMMONIC ships as <strong>AU, VST3, VST2 and AAX</strong> for Windows
						&amp; macOS. Logic &amp; GarageBand use AU; Ableton, FL Studio,
						Cubase, Studio One and Reaper use VST3; Pro Tools uses AAX. The
						installer adds them all.
					</p>
				),
			},
		],
	},
	{
		title: "Generating & shaping sounds",
		items: [
			{
				q: "How do I generate a sound?",
				a: (
					<p>
						On the <strong>Sounds</strong> tab, type a description in "Imagine
						Your Instrument", press <strong>Generate</strong>, and pick from the
						three takes (1 / 2 / 3). Each Generate makes 3 options and costs 3
						credits.
					</p>
				),
			},
			{
				q: "Any tips for better prompts?",
				a: (
					<p>
						Name the instrument, then add character: texture (warm, gritty,
						glassy), articulation (plucky, sustained), and vibe (dark, airy,
						vintage). Short, vivid prompts work best - e.g.{" "}
						<em>"warm gritty mini-moog bass"</em>.
					</p>
				),
			},
			{
				q: "Can I shape the sound after generating?",
				a: (
					<p>
						Yes. Every result is a playable instrument: set loop points, tune it,
						reverse it, glide between notes, then run it through the built-in
						effects rack (EQ, compressor, drive, chorus, delay, reverb,
						modulation).
					</p>
				),
			},
			{
				q: "Do I own the sounds I generate?",
				a: (
					<p>
						Yes. Every sound is generated from scratch and is unique to you - use
						your results in commercial and non-commercial productions with no
						sample-clearance worries.
					</p>
				),
			},
		],
	},
	{
		title: "Sounds & presets across computers",
		items: [
			{
				q: "Where are my generated sounds stored?",
				a: (
					<p>
						Locally on the computer you generated them on - and every prompt is
						saved to your account history, so nothing is ever lost.
					</p>
				),
			},
			{
				q: "How do I get my sounds on another computer?",
				a: (
					<p>
						Log in on that machine, open <strong>Prompt History</strong> on the
						Sounds tab, select the prompt, and download its samples again (per
						prompt). Your generations follow your account.
					</p>
				),
			},
			{
				q: "How do I save and reuse a preset?",
				a: (
					<p>
						Dial in a sound plus effects, press <strong>Save Preset</strong> and
						name it. It appears in the preset browser - click to load it in any
						project.
					</p>
				),
			},
			{
				q: "How do I move my presets to another computer?",
				a: (
					<p>
						On the <strong>Account</strong> tab, press <strong>Back Up Presets</strong>{" "}
						(on the computer that has them), then on the other computer press{" "}
						<strong>Restore Presets</strong>. Restore only brings back presets you
						previously backed up.
					</p>
				),
			},
		],
	},
	{
		title: "Credits, plans & codes",
		items: [
			{
				q: "How do credits work?",
				a: (
					<p>
						Every Generate creates <strong>three options</strong> and costs{" "}
						<strong>3 credits</strong> (1 per option). New users get a one-time 30
						free credits. Only Generate costs credits - browsing, playing, effects
						and backups are free.
					</p>
				),
			},
			{
				q: "What's the difference between a plan and a top-up?",
				a: (
					<p>
						A <strong>plan</strong> refreshes your credits every month (best value
						if you create regularly). A <strong>top-up</strong> is a one-time
						credit pack that adds to your balance without changing your
						subscription. See <Link to="/plans">Plans &amp; Credits</Link>.
					</p>
				),
			},
			{
				q: "Monthly or yearly?",
				a: (
					<p>
						Both are available. <strong>Yearly is two months free</strong> versus
						monthly. New subscribers also get <strong>30% off the first month</strong>{" "}
						on monthly billing.
					</p>
				),
			},
			{
				q: "I bought a code on Producersources - how do I redeem it?",
				a: (
					<p>
						Sign in to SUMMONIC and enter the code in the redeem box on the plugin
						/ your account. A <strong>plan code</strong> activates that plan for
						its included period (no auto-renew); a <strong>credit code</strong>{" "}
						adds credits to your balance.
					</p>
				),
			},
			{
				q: "Does a coupon-code plan auto-renew?",
				a: (
					<p>
						No. A code activates a plan for a fixed period and simply expires at
						the end - nothing is charged automatically. Grab another code or start
						a subscription to continue.
					</p>
				),
			},
			{
				q: "Can I buy more credits?",
				a: (
					<p>
						Yes - subscribers can buy credit top-ups any time from the{" "}
						<Link to="/plans">Plans &amp; Credits</Link> page, with card or
						PayPal.
					</p>
				),
			},
		],
	},
	{
		title: "Account & billing",
		items: [
			{
				q: "How do I upgrade or downgrade my plan?",
				a: (
					<p>
						From <Link to="/account">My Account</Link> (or the{" "}
						<Link to="/plans">Plans</Link> page) - switching is immediate and
						prorated, and upgrades top your credits up to the new plan.
					</p>
				),
			},
			{
				q: "How do I cancel?",
				a: (
					<p>
						Open <Link to="/account">My Account</Link> and cancel anytime. Your
						plan stays active until the end of the current billing cycle. See our{" "}
						<Link to="/refunds">Refund Policy</Link>.
					</p>
				),
			},
			{
				q: "Which payment methods do you accept?",
				a: (
					<p>
						Card (via Stripe) and PayPal, for both subscriptions and credit
						top-ups.
					</p>
				),
			},
			{
				q: "I need help with billing or a technical issue.",
				a: (
					<p>
						Use the <Link to="/contact">contact page</Link> or email{" "}
						<a href="mailto:info@producersources.com">info@producersources.com</a>{" "}
						and we'll get back to you within 2 business days.
					</p>
				),
			},
		],
	},
	{
		title: "Troubleshooting",
		items: [
			{
				q: "A generation is slow or nothing appears.",
				a: (
					<p>
						Check your internet connection and that you have at least 3 credits,
						then Generate again. Generation runs on our servers, so a connection
						is required.
					</p>
				),
			},
			{
				q: "The plugin doesn't show up in my DAW.",
				a: (
					<p>
						Rescan plug-ins or restart the DAW, and confirm you installed the
						format your DAW uses (AU, VST3, VST2 or AAX) into the folder it scans.
						On Windows you may need to add the VST2 folder to your DAW's scan
						paths.
					</p>
				),
			},
			{
				q: "AAX won't load in Pro Tools.",
				a: (
					<p>
						Use the latest installer and rescan in Pro Tools. If it still doesn't
						appear, reach out via the <Link to="/contact">contact page</Link>.
					</p>
				),
			},
			{
				q: "My sounds or presets aren't on my new computer.",
				a: (
					<p>
						Sounds: log in and re-download them from <strong>Prompt History</strong>.
						Presets: make sure you pressed <strong>Back Up Presets</strong> on the
						original computer, then <strong>Restore Presets</strong> on the new
						one.
					</p>
				),
			},
		],
	},
];

export default function Help() {
	return (
		<ContentPage
			eyebrow="Support"
			title="Help Center"
			intro="Answers to the questions we hear most - install, generating, sounds & presets, credits, codes, billing and troubleshooting. Still stuck? Contact us and a human will help."
		>
			{SECTIONS.map((section) => (
				<div key={section.title}>
					<h2 className="mt-2">{section.title}</h2>
					{section.items.map((item) => (
						<div key={item.q}>
							<h3>{item.q}</h3>
							{item.a}
						</div>
					))}
				</div>
			))}

			<div className="mt-8 rounded-2xl border border-white/12 bg-white/5 p-5 text-center">
				<p className="mb-3 text-white">Didn't find what you needed?</p>
				<Link
					to="/contact"
					className="vst-button-primary inline-flex cursor-pointer items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white no-underline"
				>
					Contact support
				</Link>
			</div>
		</ContentPage>
	);
}
