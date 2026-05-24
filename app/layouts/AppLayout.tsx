import type { MeResponseDto } from "api/api-types";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import AppHeader from "~/components/molecules/AppHeader/AppHeader";
import { clearUser, setUser } from "~/stores/authStore";
import type { Route } from "./+types/AppLayout";

export async function clientLoader(): Promise<MeResponseDto | null> {
	const token = localStorage.getItem("token");

	if (!token) {
		return null;
	}

	const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (resp.ok) {
		return resp.json() as Promise<MeResponseDto>;
	}

	return null;
}

const AppLayout = ({ loaderData }: Route.ComponentProps) => {
	const user = loaderData;

	useEffect(() => {
		if (user) {
			setUser(user);
			return;
		}

		clearUser();
	}, [user]);

	return (
		<div className="vst-stage min-h-svh overflow-hidden">
			<Toaster />
			<div className="relative z-10 flex min-h-svh flex-col">
				<AppHeader />
				<main className="min-h-0 flex-1 overflow-y-auto">
					<div className="container box-border py-5 sm:py-8 lg:py-10">
						<Outlet />
					</div>
				</main>
			</div>
			<div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
		</div>
	);
};

export default AppLayout;
