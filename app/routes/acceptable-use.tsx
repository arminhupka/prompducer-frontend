import { ContentPage } from "~/components/content/ContentPage";

export function meta() {
	return [
		{ title: "Acceptable Use Policy | SUMMONIC" },
		{
			name: "description",
			content: "The rules for using SUMMONIC responsibly.",
		},
	];
}

export default function AcceptableUse() {
	return (
		<ContentPage
			eyebrow="Legal"
			title="Acceptable Use Policy"
			updated="July 14, 2026"
			intro="SUMMONIC is built for producers to create original music. These rules keep it that way for everyone."
		>
			<h2>Do</h2>
			<ul>
				<li>Use generated sounds in your own music, beats, and productions.</li>
				<li>Experiment freely with prompts and effects.</li>
				<li>Share your finished music however you like — the sounds are yours.</li>
			</ul>

			<h2>Don’t</h2>
			<ul>
				<li>
					Use the Service to create audio that infringes someone else’s
					intellectual property, or that impersonates a real person’s voice or
					likeness without permission.
				</li>
				<li>
					Generate content that is illegal, hateful, harassing, sexually
					exploitative, or that promotes violence.
				</li>
				<li>
					Resell, redistribute, or repackage SUMMONIC itself, or present the raw
					generation service as your own product.
				</li>
				<li>
					Attempt to reverse-engineer, scrape, overload, or circumvent the
					credits, rate limits, or security of the Service.
				</li>
				<li>
					Share, sell, or transfer your account or credits except as expressly
					allowed.
				</li>
			</ul>

			<h2>Enforcement</h2>
			<p>
				We may suspend or terminate accounts that violate this policy, with or
				without notice depending on severity, and may remove content or report
				unlawful activity to the authorities. Where appropriate we’ll give you a
				chance to resolve the issue first.
			</p>

			<h2>Reporting</h2>
			<p>
				To report misuse, contact{" "}
				<a href="mailto:support@producersources.com">
					support@producersources.com
				</a>
				.
			</p>
		</ContentPage>
	);
}
