import LoginPage from "~/pages/LoginPage/LoginPage";
import { redirectAuthenticatedUser } from "~/lib/routeGuards";

export function meta() {
	return [
		{ title: "Prompducer Login" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function Plans() {
	return <LoginPage />;
}
