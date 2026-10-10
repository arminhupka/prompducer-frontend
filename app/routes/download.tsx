import DownloadPage from "~/pages/DownloadPage/DownloadPage";
import { seo } from "~/lib/seo";

export function meta() {
	return seo({
		title: "Download SUMMONIC Free",
		path: "/download",
		description:
			"Download SUMMONIC free for macOS and Windows (AU / VST3 / VST2 / AAX). Install, sign in, and get 30 free credits to start generating instruments from text.",
		keywords: [
			"download SUMMONIC",
			"free AI instrument plugin",
			"text to audio VST download",
			"AI sound generator plugin mac windows",
		],
	});
}

export default function DownloadRoute() {
	return <DownloadPage />;
}
