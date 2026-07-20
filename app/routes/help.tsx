import { Link } from "react-router";
import { ContentPage } from "~/components/content/ContentPage";

export function meta() {
	return [
		{ title: "Help Center | SUMMONIC" },
		{
			name: "description",
			content:
				"Answers to common questions about SUMMONIC - generation, credits, plans, installation, and billing.",
		},
	];
}

const FAQ: { q: string; a: React.ReactNode }[] = [
	{
		q: "What is SUMMONIC?",
		a: (
			<p>
				SUMMONIC is a real audio-generation plugin (VST / VST3 / AU for Windows
				&amp; macOS). You type a prompt and it generates brand-new, fully playable
				instruments right inside your DAW - it is not a sample library or a search
				engine.
			</p>
		),
	},
	{
		q: "How do credits work?",
		a: (
			<p>
				Every time you hit Generate, SUMMONIC creates <strong>three options</strong>{" "}
				so you can pick the best one. Each option costs 1 credit, so a single
				generation uses <strong>3 credits</strong>. New users get a one-time 30 free
				credits - enough for 10 generations.
			</p>
		),
	},
	{
		q: "Do I own the sounds I generate?",
		a: (
			<p>
				Yes. Every sound is generated from scratch and is unique to you. You can
				use your results in commercial and non-commercial productions with no
				sample-clearance worries.
			</p>
		),
	},
	{
		q: "Which formats and systems are supported?",
		a: (
			<p>
				SUMMONIC ships as VST, VST3 and AU, for Windows and macOS. Load it in any
				compatible DAW (FL Studio, Ableton Live, Logic Pro, Studio One, and more).
			</p>
		),
	},
	{
		q: "Can I buy more credits?",
		a: (
			<p>
				Subscribers on a paid plan can purchase credit top-ups from the{" "}
				<Link to="/plans">Plans &amp; Credits</Link> page. Top-ups are a fast way
				to add credits without changing your plan.
			</p>
		),
	},
	{
		q: "How do I cancel?",
		a: (
			<p>
				Open <Link to="/account">My Account</Link> and cancel anytime. Your plan
				stays active until the end of the current billing cycle. See our{" "}
				<Link to="/refunds">Refund Policy</Link> for details.
			</p>
		),
	},
	{
		q: "I need help with billing or a technical issue.",
		a: (
			<p>
				We’ve got you. Use the <Link to="/contact">contact page</Link> or email{" "}
				<a href="mailto:info@producersources.com">
					info@producersources.com
				</a>{" "}
				and we’ll get back to you within 2 business days.
			</p>
		),
	},
];

export default function Help() {
	return (
		<ContentPage
			eyebrow="Support"
			title="Help Center"
			intro="Quick answers to the questions we hear most. Still stuck? Contact us and a human will help."
		>
			{FAQ.map((item) => (
				<div key={item.q}>
					<h2>{item.q}</h2>
					{item.a}
				</div>
			))}

			<div className="mt-8 rounded-2xl border border-white/12 bg-white/5 p-5 text-center">
				<p className="mb-3 text-white">Didn’t find what you needed?</p>
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
