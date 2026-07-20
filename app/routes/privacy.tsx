import { ContentPage } from "~/components/content/ContentPage";

export function meta() {
	return [
		{ title: "Privacy Policy | SUMMONIC" },
		{
			name: "description",
			content:
				"How SUMMONIC collects, uses, and protects your personal data.",
		},
	];
}

export default function Privacy() {
	return (
		<ContentPage
			eyebrow="Legal"
			title="Privacy Policy"
			updated="July 14, 2026"
			intro="This policy explains what data SUMMONIC collects, why, and the choices you have."
		>
			<h2>1. Data we collect</h2>
			<ul>
				<li>
					<strong>Account data:</strong> your email address and a securely hashed
					password.
				</li>
				<li>
					<strong>Billing data:</strong> subscription status, plan, and credit
					balance. Card details are handled entirely by Stripe — we never see or
					store your full card number.
				</li>
				<li>
					<strong>Usage data:</strong> the prompts you submit and the generated
					audio associated with your account, so we can deliver and improve the
					Service.
				</li>
				<li>
					<strong>Technical data:</strong> basic logs (e.g. request times, error
					events) needed to operate and secure the platform.
				</li>
			</ul>

			<h2>2. How we use your data</h2>
			<ul>
				<li>To create your account and authenticate you.</li>
				<li>To generate audio from your prompts and store your results.</li>
				<li>To process payments, credits, and subscriptions.</li>
				<li>To provide support and respond to your messages.</li>
				<li>To detect abuse and keep the Service secure.</li>
			</ul>

			<h2>3. Payment processing</h2>
			<p>
				Payments are processed by <strong>Stripe</strong>. Stripe acts as an
				independent controller of your payment information under its own privacy
				policy. We store only the identifiers needed to reconcile your
				subscription and credits.
			</p>

			<h2>4. Third parties we rely on</h2>
			<p>
				We use trusted providers to run the Service, including cloud hosting,
				object storage for generated audio, Stripe for payments, and an email
				provider for transactional messages. These providers process data only on
				our instructions.
			</p>

			<h2>5. Data retention</h2>
			<p>
				We keep your account and generation data for as long as your account is
				active. You may request deletion of your account and associated data at any
				time (see below); some records may be retained where required for legal,
				tax, or fraud-prevention purposes.
			</p>

			<h2>6. Your rights</h2>
			<p>
				Depending on your location, you may have the right to access, correct,
				export, or delete your personal data, and to object to certain processing.
				To exercise these rights, contact us at{" "}
				<a href="mailto:support@producersources.com">
					support@producersources.com
				</a>
				.
			</p>

			<h2>7. Security</h2>
			<p>
				We use industry-standard measures — encrypted transport, hashed
				passwords, and access controls — to protect your data. No system is
				perfectly secure, but we work to reduce risk and respond quickly to
				incidents.
			</p>

			<h2>8. Children</h2>
			<p>
				SUMMONIC is not directed to children under 18 and we do not knowingly
				collect their data.
			</p>

			<h2>9. Changes</h2>
			<p>
				We may update this policy; the “last updated” date reflects the latest
				version. Material changes will be highlighted on this page.
			</p>

			<h2>10. Contact</h2>
			<p>
				Privacy questions? Reach us via the{" "}
				<a href="/contact">contact page</a> or at{" "}
				<a href="mailto:support@producersources.com">
					support@producersources.com
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
