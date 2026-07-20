import {
	ArrowRight,
	AudioWaveform,
	Check,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useAuthStore } from "~/stores/authStore";

const LOGO = "/plugin/summonic-logo-neat-transparent.png";

type Showcase = {
	img: string;
	alt: string;
	eyebrow: string;
	title: string;
	body: string;
	reverse?: boolean;
};

const SHOWCASE: Showcase[] = [
	{
		img: "/plugin/crops/prompt.webp",
		alt: "SUMMONIC prompt box and Generate button",
		eyebrow: "Generate",
		title: "Type a prompt, get an instrument",
		body: "Describe any sound in plain words and hit Generate. SUMMONIC builds a brand-new, fully playable instrument - no menu-diving, no sample hunting.",
	},
	{
		img: "/plugin/crops/options.webp",
		alt: "The 1, 2, 3 generated option buttons",
		eyebrow: "3 options · 3 credits",
		title: "Three fresh takes, every time",
		body: "Each generation returns three unique options so you can keep the best one. Every option costs 1 credit - so one hit of Generate uses 3 credits. Your 30 free credits cover 10 generations.",
		reverse: true,
	},
	{
		img: "/plugin/crops/shape.webp",
		alt: "Waveform with loop, reverse, pitch and glide controls",
		eyebrow: "Shape & play",
		title: "Tune it, loop it, play it",
		body: "Set loop points, crossfade and sample start/end, then toggle Loop, Reverse, PitchFix, Stretch and Glide. It plays like a real instrument across your whole keyboard.",
	},
	{
		img: "/plugin/crops/presets.webp",
		alt: "SUMMONIC preset browser",
		eyebrow: "Save & recall",
		title: "Keep your sounds as presets",
		body: "Love a result? Save it. Build banks of your own presets - search, rename, organize - and recall them in any session. The sounds are yours to keep.",
		reverse: true,
	},
	{
		img: "/plugin/crops/effects-rack.webp",
		alt: "SUMMONIC effects page with EQ, compressor, drive, delay, reverb and modulation",
		eyebrow: "Effects page",
		title: "Finish it inside the plugin",
		body: "A full effects page - EQ, envelope, compressor, drive, retro, chorus, degrade, delay, reverb and modulation - so you can sculpt and polish without ever leaving SUMMONIC.",
	},
];

const Framed = ({
	img,
	alt,
	eager,
}: {
	img: string;
	alt: string;
	eager?: boolean;
}) => (
	<div className="relative">
		<div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-2xl" />
		<img
			src={img}
			alt={alt}
			loading={eager ? "eager" : "lazy"}
			className="relative w-full rounded-2xl border border-white/15 shadow-2xl"
		/>
	</div>
);

const ShowcaseRow = ({ img, alt, eyebrow, title, body, reverse }: Showcase) => (
	<div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
		<div className={reverse ? "lg:order-2" : ""}>
			<Framed img={img} alt={alt} />
		</div>
		<div className={reverse ? "lg:order-1" : ""}>
			<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">
				{eyebrow}
			</p>
			<h3 className="vst-display mt-3 text-2xl text-white sm:text-3xl">
				{title}
			</h3>
			<p className="mt-3 max-w-md text-sm leading-6 text-white/75 sm:text-base">
				{body}
			</p>
		</div>
	</div>
);

const LandingPage = () => {
	const user = useAuthStore((state) => state.user);
	const primaryCta = user
		? { label: "Open my account", to: "/account" }
		: { label: "Start free - 30 credits", to: "/register" };

	return (
		<div className="space-y-16 pb-6 sm:space-y-24">
			{/* Hero */}
			<section className="vst-shell relative mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/12 to-transparent" />
				<div className="pointer-events-none absolute -left-24 top-16 size-64 rounded-full bg-pink-500/25 blur-3xl" />
				<div className="pointer-events-none absolute -right-16 bottom-10 size-72 rounded-full bg-orange-400/25 blur-3xl" />

				<div className="relative z-10 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
					{/* Copy */}
					<div className="flex flex-col justify-center text-center lg:text-left">
						<img
							src={LOGO}
							alt="SUMMONIC"
							className="mb-6 h-10 w-auto self-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)] sm:h-12 lg:self-start"
						/>
						<div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm lg:mx-0">
							<AudioWaveform className="size-4 text-cyan-200" />
							VST · VST3 · AU - Windows &amp; macOS
						</div>

						<h1 className="vst-display vst-glow-text text-5xl leading-[0.95] text-white sm:text-6xl">
							Imagine your instrument.
						</h1>

						<p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg lg:mx-0">
							SUMMONIC is a real audio-generation plugin. Type a prompt and it
							conjures brand-new, fully playable instruments - infinite sounds
							that are yours alone, right inside your DAW.
						</p>

						<div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
							<Button
								size="lg"
								variant="ghost"
								className="vst-button-primary h-auto w-full cursor-pointer px-8 py-3.5 text-base sm:w-auto"
								asChild={true}
							>
								<Link to={primaryCta.to}>
									{primaryCta.label}
									<ArrowRight className="ml-1 size-5" />
								</Link>
							</Button>
							<Button
								size="lg"
								variant="ghost"
								className="vst-button-ghost h-auto w-full cursor-pointer px-8 py-3.5 text-base sm:w-auto"
								asChild={true}
							>
								<Link to="/plans">See plans</Link>
							</Button>
						</div>

						<p className="mt-5 flex items-center justify-center gap-2 text-sm text-white/65 lg:justify-start">
							<Sparkles className="size-4 text-cyan-200" />
							New users get 30 free credits - no card required.
						</p>
					</div>

					{/* Product shot - on mobile it sits below the copy; on lg it matches the copy height */}
					<div className="mt-2 flex items-center justify-center lg:mt-0">
						<div className="relative flex max-h-[440px] items-center justify-center lg:h-full lg:max-h-[560px]">
							<div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-pink-500/20 to-orange-400/20 blur-2xl" />
							<img
								src="/plugin/sounds2.webp"
								alt="The SUMMONIC plugin interface"
								className="relative max-h-[440px] w-auto rounded-2xl border border-white/15 object-contain shadow-2xl lg:h-full lg:max-h-none"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Ownership highlight */}
			<section className="mx-auto max-w-5xl px-2">
				<div className="vst-panel flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-9">
					<div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/10">
						<ShieldCheck className="size-7 text-emerald-300" />
					</div>
					<div>
						<h2 className="vst-display text-2xl text-white sm:text-3xl">
							Not a sample library. Real generation.
						</h2>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-white/78 sm:text-base">
							SUMMONIC doesn&apos;t search a pack of pre-cleared loops. It{" "}
							<span className="font-semibold text-white">
								generates the audio from scratch
							</span>{" "}
							every time, so each instrument is a unique sound that has never
							existed before - and it belongs only to you. Use it in your records
							with zero sample-clearance worries.
						</p>
					</div>
				</div>
			</section>

			{/* Showcase */}
			<section className="mx-auto max-w-6xl px-2">
				<div className="mb-12 text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
						See it in action
					</p>
					<h2 className="vst-display mt-3 text-3xl text-white sm:text-4xl">
						From a sentence to a playable sound
					</h2>
				</div>

				<div className="space-y-16 sm:space-y-20">
					{SHOWCASE.map((row) => (
						<ShowcaseRow key={row.img} {...row} />
					))}
				</div>
			</section>

			{/* Free trial CTA */}
			<section className="mx-auto max-w-5xl px-2">
				<div className="vst-shell relative overflow-hidden px-7 py-12 text-center sm:px-12 sm:py-16">
					<div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full bg-pink-500/25 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-12 -left-10 size-56 rounded-full bg-orange-400/25 blur-3xl" />
					<div className="relative z-10">
						<h2 className="vst-display vst-glow-text text-3xl text-white sm:text-5xl">
							Start summoning for free.
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/78 sm:text-base">
							Create an account, grab your 30 credits, and generate your first
							instruments today. Upgrade any time when you need more.
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Button
								size="lg"
								variant="ghost"
								className="vst-button-primary h-auto w-full cursor-pointer px-8 py-3.5 text-base sm:w-auto"
								asChild={true}
							>
								<Link to={primaryCta.to}>
									{primaryCta.label}
									<ArrowRight className="ml-1 size-5" />
								</Link>
							</Button>
							<Button
								size="lg"
								variant="ghost"
								className="vst-button-ghost h-auto w-full cursor-pointer px-8 py-3.5 text-base sm:w-auto"
								asChild={true}
							>
								<Link to="/plans">Compare plans</Link>
							</Button>
						</div>
						<ul className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
							<li className="flex items-center gap-1.5">
								<Check className="size-4 text-emerald-300" /> 30 credits per user
							</li>
							<li className="flex items-center gap-1.5">
								<Check className="size-4 text-emerald-300" /> No card required
							</li>
							<li className="flex items-center gap-1.5">
								<Check className="size-4 text-emerald-300" /> Sounds you own
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
