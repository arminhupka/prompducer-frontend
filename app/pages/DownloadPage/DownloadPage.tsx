import { Check, Cpu, Download, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

const DOWNLOADS = {
	mac: "https://s3.amazonaws.com/producersources2/SUMMONIC/SUMMONIC%20MacOS.zip",
	win: "https://s3.amazonaws.com/producersources2/SUMMONIC/SUMMONIC%20Windows.zip",
};

type OS = "mac" | "win" | null;

const DownloadCard = ({
	os,
	title,
	sub,
	formats,
	recommended,
}: {
	os: "mac" | "win";
	title: string;
	sub: string;
	formats: string;
	recommended: boolean;
}) => (
	<div
		className={`vst-panel relative flex flex-col p-6 ${
			recommended ? "ring-2 ring-cyan-300/60" : ""
		}`}
	>
		{recommended && (
			<Badge className="absolute -top-3 left-6 border border-white/20 bg-white text-[#150e1b]">
				Your system
			</Badge>
		)}
		<h2 className="text-xl font-semibold text-white">{title}</h2>
		<p className="mt-1 text-sm text-white/65">{sub}</p>
		<div className="mt-4 flex items-center gap-2 text-xs text-white/55">
			<Cpu className="size-4 text-emerald-300" />
			{formats}
		</div>
		<div className="mt-6 pt-1">
			<Button
				size="lg"
				variant="ghost"
				className="vst-button-primary h-auto w-full cursor-pointer py-3"
				asChild={true}
			>
				<a href={DOWNLOADS[os]}>
					<Download className="mr-2 size-4" /> Download for {title}
				</a>
			</Button>
		</div>
	</div>
);

const DownloadPage = () => {
	const [os, setOs] = useState<OS>(null);

	useEffect(() => {
		const ua = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
		if (ua.includes("mac")) setOs("mac");
		else if (ua.includes("win")) setOs("win");
	}, []);

	return (
		<div className="space-y-10 pb-6">
			{/* Header */}
			<section className="mx-auto max-w-3xl text-center">
				<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
					<Download className="size-4 text-cyan-200" />
					Free download
				</div>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-6xl">
					Get SUMMONIC
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/78 sm:text-base">
					The plugin is free. Install it, sign in, and every account gets{" "}
					<span className="font-semibold text-white">30 free credits</span> to
					start generating instruments - no card required.
				</p>
			</section>

			{/* Download cards */}
			<section className="mx-auto max-w-3xl">
				<div className="grid items-stretch gap-5 sm:grid-cols-2">
					<DownloadCard
						os="mac"
						title="macOS"
						sub="Universal - Apple Silicon &amp; Intel. Signed &amp; notarized."
						formats="AU · VST3 · VST2 · AAX"
						recommended={os === "mac"}
					/>
					<DownloadCard
						os="win"
						title="Windows"
						sub="Windows 10 &amp; 11, 64-bit."
						formats="VST3 · VST2 · AAX"
						recommended={os === "win"}
					/>
				</div>
				<p className="mt-4 text-center text-xs text-white/50">
					Each download is a .zip with the installer, a full manual, and a
					"Manual Installation" folder as a fallback.
				</p>
			</section>

			{/* Steps */}
			<section className="mx-auto max-w-3xl">
				<div className="vst-panel p-6">
					<h3 className="flex items-center gap-2 text-lg font-semibold text-white">
						<Sparkles className="size-5 text-emerald-300" /> After you download
					</h3>
					<ol className="mt-4 space-y-3">
						{[
							"Unzip it and run the installer (SUMMONIC.pkg on Mac, SUMMONIC - Installer.exe on Windows). Rescan plugins in your DAW.",
							"Open SUMMONIC on an instrument track and sign in - or create a free account (30 credits).",
							'Type a prompt in "Imagine Your Instrument", hit Generate, and play the result on your keyboard.',
						].map((step, i) => (
							<li key={step} className="flex items-start gap-3 text-sm text-white/78">
								<span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-xs font-bold text-white">
									{i + 1}
								</span>
								{step}
							</li>
						))}
					</ol>
					<div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/60">
						<Check className="size-4 text-emerald-300" />
						Need more credits later? Pick a plan or a top-up on the{" "}
						<Link to="/plans" className="font-semibold text-cyan-200 hover:text-white">
							Plans &amp; credits
						</Link>{" "}
						page.
					</div>
				</div>
			</section>
		</div>
	);
};

export default DownloadPage;
