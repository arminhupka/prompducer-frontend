import LandingPage from "~/pages/LandingPage/LandingPage";

export function meta() {
	return [
		{ title: "SUMMONIC — Imagine your instrument" },
		{
			name: "description",
			content:
				"SUMMONIC is a real audio-generation plugin (VST/VST3/AU, Windows & macOS). Generate infinite, brand-new playable instruments from a prompt — sounds only you own.",
		},
	];
}

export default function Home() {
	return <LandingPage />;
}
