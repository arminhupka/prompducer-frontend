import { Link } from "react-router";

/**
 * SiteFooter — full marketing footer for SUMMONIC.
 *
 * Internal columns (Product / Account) point at real in-app routes.
 * Legal & Support links point at the Producersources brand site — repoint the
 * hrefs below once the final legal pages are published. Socials are placeholders.
 */

const STORE_URL = "https://producersources.com";

type FooterLink = { label: string; to: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
	{
		title: "Product",
		links: [
			{ label: "Overview", to: "/" },
			{ label: "Plans & credits", to: "/plans" },
			{ label: "About", to: "/about" },
			{ label: "Create account", to: "/register" },
		],
	},
	{
		title: "Account",
		links: [
			{ label: "My Account", to: "/account" },
			{ label: "Log in", to: "/login" },
			{ label: "Sign up", to: "/register" },
			{ label: "Reset password", to: "/reset-password" },
		],
	},
	{
		title: "Support",
		links: [
			{ label: "Contact us", to: "/contact" },
			{ label: "Help center", to: "/help" },
			{ label: "FAQ", to: "/help" },
			{ label: "Producersources", to: STORE_URL, external: true },
		],
	},
	{
		title: "Legal",
		links: [
			{ label: "Terms of Service", to: "/terms" },
			{ label: "Privacy Policy", to: "/privacy" },
			{ label: "Refund Policy", to: "/refunds" },
			{ label: "Acceptable Use", to: "/acceptable-use" },
		],
	},
];

const SOCIALS: FooterLink[] = [
	{ label: "Instagram", to: "https://instagram.com", external: true },
	{ label: "YouTube", to: "https://youtube.com", external: true },
	{ label: "TikTok", to: "https://tiktok.com", external: true },
	{ label: "X", to: "https://x.com", external: true },
];

const linkClasses =
	"text-xs text-white/65 transition-colors hover:text-white focus-visible:text-white outline-none";

const FooterLinkItem = ({ link }: { link: FooterLink }) =>
	link.external ? (
		<a
			href={link.to}
			target={link.to.startsWith("mailto:") ? undefined : "_blank"}
			rel="noopener noreferrer"
			className={linkClasses}
		>
			{link.label}
		</a>
	) : (
		<Link to={link.to} className={linkClasses}>
			{link.label}
		</Link>
	);

const SiteFooter = () => {
	return (
		<footer className="relative z-10 mt-16 border-t border-white/12 bg-black/30 backdrop-blur-sm">
			<div className="container py-12 lg:py-14">
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
					{/* Brand */}
					<div className="col-span-2 sm:col-span-3 lg:col-span-2">
						<Link
							to="/"
							className="flex items-center outline-none"
							aria-label="SUMMONIC — home"
						>
							<img
								src="/plugin/summonic-logo-neat-transparent.png"
								alt="SUMMONIC"
								className="h-9 w-auto"
							/>
						</Link>
						<p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">
							A real audio-generation plugin. Imagine an instrument, generate it
							from a prompt, and own every sound. Built by Producersources.
						</p>
						<div className="mt-4 flex flex-wrap gap-3">
							{SOCIALS.map((social) => (
								<a
									key={social.label}
									href={social.to}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-cyan-200"
								>
									{social.label}
								</a>
							))}
						</div>
					</div>

					{/* Link columns */}
					{COLUMNS.map((col) => (
						<div key={col.title}>
							<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
								{col.title}
							</p>
							<ul className="space-y-2">
								{col.links.map((link) => (
									<li key={link.label}>
										<FooterLinkItem link={link} />
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
					<p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
						© {new Date().getFullYear()} Producersources · SUMMONIC
					</p>
					<a
						href={STORE_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[10px] font-semibold uppercase tracking-wide text-white/50 transition-colors hover:text-cyan-200"
					>
						By Producersources ↗
					</a>
				</div>
			</div>
		</footer>
	);
};

export default SiteFooter;
