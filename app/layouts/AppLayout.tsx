import type { MeResponseDto } from "api/api-types";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import AppFooter from "~/components/molecules/AppFooter/AppFooter";
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
		<div className="h-dvh flex flex-col overflow-hidden">
			<Toaster />
			<AppHeader />
			<main className="flex-1 min-h-0 overflow-y-auto">
				<div className="container h-full min-h-0 box-border py-12">
					<Outlet />
				</div>
			</main>
			<AppFooter />
		</div>
	);
};

export default AppLayout;
