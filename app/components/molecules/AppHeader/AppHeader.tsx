import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
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
	const [open, setOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("token");
		clearUser();
		window.location.assign("/login");
	};

	return (
		<header className="relative z-30 py-4">
			<div className="container flex items-center justify-between gap-4">
				<Link
					to="/"
					onClick={() => setOpen(false)}
					className="group flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#150e1b]"
				>
					<img
						src="/plugin/summonic-logo-neat-transparent.png"
						alt={brand}
						className="h-8 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition group-hover:opacity-90 sm:h-9"
					/>
				</Link>

				{/* Desktop nav */}
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

				{/* Desktop right side */}
				<div className="hidden items-center gap-2 sm:gap-3 md:flex">
					{user ? (
						<>
							<div className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-right text-xs text-white/80 backdrop-blur-sm">
								<p className="font-semibold text-white">
									Available credits: {credits}
								</p>
								<p className="max-w-[12rem] truncate text-[11px]">
									{user.email}
								</p>
							</div>
							<Button
								variant="ghost"
								className="vst-button-ghost cursor-pointer"
								onClick={handleLogout}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								className="vst-button-ghost cursor-pointer"
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
						</>
					)}
				</div>

				{/* Mobile hamburger */}
				<button
					type="button"
					onClick={() => setOpen((o) => !o)}
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					className="grid size-11 place-items-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-sm md:hidden"
				>
					{open ? <X className="size-5" /> : <Menu className="size-5" />}
				</button>
			</div>

			{/* Mobile menu panel */}
			{open && (
				<div className="absolute inset-x-0 top-full z-30 px-4 md:hidden">
					<div className="container space-y-1 rounded-2xl border border-white/15 bg-[#1a0e1c]/95 p-3 shadow-2xl backdrop-blur-xl">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.end}
								onClick={() => setOpen(false)}
								className={({ isActive }) =>
									`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
										isActive
											? "bg-white/15 text-white"
											: "text-white/75 hover:text-white"
									}`
								}
							>
								{link.label}
							</NavLink>
						))}

						<div className="mt-2 space-y-2 border-t border-white/10 pt-3">
							{user ? (
								<>
									<div className="px-4 pb-1 text-xs text-white/70">
										<p className="font-semibold text-white">
											Available credits: {credits}
										</p>
										<p className="truncate">{user.email}</p>
									</div>
									<Button
										variant="ghost"
										className="vst-button-ghost w-full cursor-pointer"
										onClick={handleLogout}
									>
										Logout
									</Button>
								</>
							) : (
								<>
									<Button
										variant="ghost"
										className="vst-button-ghost w-full cursor-pointer"
										asChild={true}
									>
										<Link to="/plans" onClick={() => setOpen(false)}>
											Plans
										</Link>
									</Button>
									<Button
										variant="ghost"
										className="vst-button-primary w-full cursor-pointer"
										asChild={true}
									>
										<Link to="/login" onClick={() => setOpen(false)}>
											Login
										</Link>
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default AppHeader;
