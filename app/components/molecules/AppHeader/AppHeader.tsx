import { NavLink, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { isAdmin } from "~/lib/roles";
import { clearUser, useAuthStore } from "~/stores/authStore";

const NAV_LINKS = [
	{ label: "Product", to: "/", end: true },
	{ label: "Plans", to: "/plans", end: false },
	{ label: "My Account", to: "/account", end: false },
];

const AppHeader = () => {
	const user = useAuthStore((state) => state.user);
	const credits = user?.subscription?.credits ?? 0;
	const brand = import.meta.env.VITE_APP_NAME || "SUMMONIC";
	const navLinks = isAdmin(user)
		? [...NAV_LINKS, { label: "Admin", to: "/admin", end: false }]
		: NAV_LINKS;

	const handleLogout = () => {
		localStorage.removeItem("token");
		clearUser();
		window.location.assign("/login");
	};

	return (
		<header className="relative z-20 py-4">
			<div className="container flex items-center justify-between gap-4">
				<Link
					to="/"
					className="group flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#150e1b]"
				>
					<img
						src="/plugin/summonic-logo-neat-transparent.png"
						alt={brand}
						className="h-8 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition group-hover:opacity-90 sm:h-9"
					/>
				</Link>

				<nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-black/20 px-1.5 py-1.5 backdrop-blur-sm md:flex">
					{navLinks.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.end}
							className={({ isActive }) =>
								`rounded-full px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
									isActive
										? "bg-white/15 text-white"
										: "text-white/70 hover:text-white"
								}`
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>

				{user ? (
					<div className="flex min-w-0 items-center gap-2 sm:gap-3">
						<div className="hidden rounded-full border border-white/15 bg-black/20 px-4 py-2 text-right text-xs text-white/80 backdrop-blur-sm sm:block">
							<p className="font-semibold text-white">
								Available credits: {credits}
							</p>
							<p className="truncate text-[11px]">{user.email}</p>
						</div>
						<Button
							variant="ghost"
							className="vst-button-ghost cursor-pointer"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				) : (
					<div className="flex items-center gap-2 sm:gap-3">
						<Button
							variant="ghost"
							className="vst-button-ghost hidden cursor-pointer sm:inline-flex"
							asChild={true}
						>
							<Link to="/plans">Plans</Link>
						</Button>
						<Button
							variant="ghost"
							className="vst-button-primary cursor-pointer"
							asChild={true}
						>
							<Link to="/login">Login</Link>
						</Button>
					</div>
				)}
			</div>
		</header>
	);
};

export default AppHeader;
