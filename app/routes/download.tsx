import DownloadPage from "~/pages/DownloadPage/DownloadPage";

export function meta() {
	return [
		{ title: "Download | SUMMONIC" },
		{
			name: "description",
			content:
				"Download SUMMONIC free for macOS and Windows (AU / VST3 / VST2 / AAX). Install, sign in, and get 30 free credits to start generating instruments.",
		},
	];
}

export default function DownloadRoute() {
	return <DownloadPage />;
}
