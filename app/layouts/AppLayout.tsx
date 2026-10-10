import type { MeResponseDto } from "api/api-types";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import AppHeader from "~/components/molecules/AppHeader/AppHeader";
import SiteFooter from "~/components/molecules/SiteFooter/SiteFooter";
import { clearUser, setUser } from "~/stores/authStore";

/**
 * Auth hydration runs in a client-side effect (not a clientLoader) on purpose:
 * a clientLoader on this shared layout can't run at build time, so with SPA-mode
 * prerendering (ssr:false) React Router would render a hydrate fallback and ship
 * an empty <body> for every prerendered page. Doing it in an effect keeps the
 * marketing pages fully server-rendered to static HTML for crawlers.
 */
const AppLayout = () => {
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			clearUser();
			return;
		}

		let cancelled = false;
		fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((resp) => (resp.ok ? (resp.json() as Promise<MeResponseDto>) : null))
			.then((user) => {
				if (cancelled) return;
				if (user) {
					setUser(user);
				} else {
					clearUser();
				}
			})
			.catch(() => {
				if (!cancelled) clearUser();
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div className="vst-stage min-h-svh overflow-hidden">
			<Toaster />
			<div className="relative z-10 flex min-h-svh flex-col">
				<AppHeader />
				<main className="min-h-0 flex-1 overflow-y-auto">
					<div className="flex min-h-full flex-col">
						<div className="container box-border flex-1 py-5 sm:py-8 lg:py-10">
							<Outlet />
						</div>
						<SiteFooter />
					</div>
				</main>
			</div>
			<div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
		</div>
	);
};

export default AppLayout;
