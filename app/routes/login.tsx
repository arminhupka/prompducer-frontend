import LoginPage from "~/pages/LoginPage/LoginPage";
import { redirectAuthenticatedUser } from "~/lib/routeGuards";

export function meta() {
	return [
		{ title: "Login | SUMMONIC" },
		{ name: "description", content: "Sign in to your SUMMONIC account." },
	];
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function Plans() {
	return <LoginPage />;
}
