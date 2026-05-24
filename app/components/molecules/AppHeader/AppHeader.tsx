import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { clearUser, useAuthStore } from "~/stores/authStore";

const AppHeader = () => {
	const user = useAuthStore((state) => state.user);
	const credits = user?.subscription?.credits ?? 0;

	const handleLogout = () => {
		localStorage.removeItem("token");
		clearUser();
		window.location.assign("/login");
	};

	return (
		<header className="relative z-20 py-4">
			<div className="container flex items-center justify-between gap-4">
				<Link
					to={user ? "/account" : "/login"}
					className="group flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#150e1b]"
				>
					<span className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/15 shadow-lg shadow-red-950/30 transition group-hover:bg-white/20">
						<span className="flex h-5 items-end gap-0.5">
							<span className="h-2 w-1 rounded-full bg-white" />
							<span className="h-4 w-1 rounded-full bg-white" />
							<span className="h-3 w-1 rounded-full bg-white" />
							<span className="h-5 w-1 rounded-full bg-white" />
						</span>
					</span>
					<span className="vst-display text-2xl text-white sm:text-3xl">
						{import.meta.env.VITE_APP_NAME}
					</span>
				</Link>
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
					<Button
						variant="ghost"
						className="vst-button-ghost cursor-pointer"
						asChild={true}
					>
						<Link to="/login">Login</Link>
					</Button>
				)}
			</div>
		</header>
	);
};

export default AppHeader;
