import { ContentPage } from "~/components/content/ContentPage";

export function meta() {
	return [
		{ title: "Terms of Service | SUMMONIC" },
		{
			name: "description",
			content:
				"The terms that govern your use of SUMMONIC, the AI audio-generation plugin by Producersources.",
		},
	];
}

export default function Terms() {
	return (
		<ContentPage
			eyebrow="Legal"
			title="Terms of Service"
			updated="July 14, 2026"
			intro="Please read these terms carefully before using SUMMONIC. By creating an account or using the plugin, you agree to them."
		>
			<h2>1. Who we are</h2>
			<p>
				SUMMONIC (“the Service”, “we”, “us”) is an AI audio-generation plugin and
				web platform operated by <strong>Producersources</strong>. These Terms of
				Service (“Terms”) form a binding agreement between you and Producersources.
			</p>

			<h2>2. Accounts</h2>
			<p>
				You must create an account to generate sounds. You are responsible for
				keeping your credentials secure and for all activity under your account.
				You must be at least 18 years old, or the age of majority in your
				jurisdiction, to use the Service.
			</p>

			<h2>3. Credits, plans and billing</h2>
			<ul>
				<li>
					Each generation produces three options and costs three credits (one
					credit per option).
				</li>
				<li>
					New accounts receive a one-time allocation of 30 free credits for
					evaluation.
				</li>
				<li>
					Paid plans grant a monthly credit allowance that refreshes each billing
					cycle. Unused monthly credits do not roll over unless expressly stated.
				</li>
				<li>
					Subscribers on a paid plan may purchase additional credit top-ups.
					Purchased top-up credits are subject to the validity period shown at
					checkout.
				</li>
				<li>
					Prices are shown in US dollars and billed through our payment processor,
					Stripe. Any introductory or first-cycle discount applies only to the
					first billing cycle of a new subscription.
				</li>
			</ul>

			<h2>4. Ownership of generated audio</h2>
			<p>
				SUMMONIC generates original audio. Subject to your compliance with these
				Terms and payment of applicable fees, <strong>you own the sounds you
				generate</strong> and may use them in your commercial and non-commercial
				music productions. We claim no rights over your prompts or the audio you
				generate with them.
			</p>

			<h2>5. Acceptable use</h2>
			<p>
				Your use of the Service is also governed by our{" "}
				<a href="/acceptable-use">Acceptable Use Policy</a>. You may not use the
				Service to break the law, infringe others’ rights, or attempt to disrupt
				or reverse-engineer the Service.
			</p>

			<h2>6. Cancellation</h2>
			<p>
				You can cancel your subscription at any time from your account. Your plan
				remains active until the end of the current billing cycle; we do not
				provide pro-rated refunds for partial cycles except as described in our{" "}
				<a href="/refunds">Refund Policy</a>.
			</p>

			<h2>7. Service availability</h2>
			<p>
				We work to keep the Service available and reliable, but we provide it “as
				is” without warranties of uninterrupted availability. We may update,
				suspend, or discontinue features with reasonable notice where practical.
			</p>

			<h2>8. Limitation of liability</h2>
			<p>
				To the maximum extent permitted by law, Producersources will not be liable
				for indirect, incidental, or consequential damages, or for lost profits or
				data, arising from your use of the Service. Our total liability is limited
				to the amount you paid us in the 12 months before the claim.
			</p>

			<h2>9. Changes to these terms</h2>
			<p>
				We may update these Terms from time to time. Material changes will be
				announced on this page with a new “last updated” date. Continued use of
				the Service after changes take effect constitutes acceptance.
			</p>

			<h2>10. Contact</h2>
			<p>
				Questions about these Terms? Reach us via the{" "}
				<a href="/contact">contact page</a> or at{" "}
				<a href="mailto:info@producersources.com">
					info@producersources.com
				</a>
				.
			</p>

			<p className="text-xs text-white/45">
				This document is a general template and not legal advice. Have it reviewed
				by qualified counsel for your jurisdiction before relying on it.
			</p>
		</ContentPage>
	);
}
