import { ContentPage } from "~/components/content/ContentPage";

export function meta() {
	return [
		{ title: "Refund Policy | SUMMONIC" },
		{
			name: "description",
			content: "SUMMONIC's policy on subscription and credit refunds.",
		},
	];
}

export default function Refunds() {
	return (
		<ContentPage
			eyebrow="Legal"
			title="Refund Policy"
			updated="August 26, 2026"
			intro="We want you to try before you commit - that's why every user gets 30 free credits. Here's how refunds work once you're paying."
		>
			<h2>1. Try before you buy</h2>
			<p>
				Every new user gets a one-time <strong>30 free credits</strong> (enough
				for 10 generations) so you can evaluate SUMMONIC before paying. We
				encourage you to use them before subscribing.
			</p>

			<h2>2. Subscriptions</h2>
			<ul>
				<li>
					You can cancel anytime; your plan stays active until the end of the
					current billing cycle and is not renewed afterward.
				</li>
				<li>
					Because a paid cycle immediately grants its full monthly credit
					allowance, subscription payments are generally{" "}
					<strong>non-refundable</strong> once the cycle has started and credits
					have been issued.
				</li>
				<li>
					If you were charged in error, or experienced a technical failure that
					prevented you from generating, contact us within 14 days and we’ll make
					it right.
				</li>
			</ul>

			<h2>3. Credit top-ups</h2>
			<p>
				Purchased top-up credits are delivered instantly and are{" "}
				<strong>non-refundable, non-transferable, and cannot be exchanged for a
				membership or cash</strong>. Unused top-up credits remain valid for the
				period shown at checkout.
			</p>

			<h2>4. Duplicate or fraudulent charges</h2>
			<p>
				If you see a duplicate charge or a payment you don’t recognize, contact us
				immediately and we’ll investigate and refund any verified error. Any
				approved refund is issued to your original payment method (card via Stripe,
				or your PayPal account).
			</p>

			<h2>5. How to request</h2>
			<p>
				Email <a href="mailto:info@producersources.com">
					info@producersources.com
				</a>{" "}
				or use our <a href="/contact">contact page</a> with your account email and
				the charge details. We aim to respond within 2 business days.
			</p>

			<p className="text-xs text-white/45">
				This policy is provided for transparency and does not limit any
				non-waivable statutory rights you may have under your local consumer law.
			</p>
		</ContentPage>
	);
}
