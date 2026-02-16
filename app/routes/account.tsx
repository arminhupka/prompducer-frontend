import { redirectUnauthenticatedUser } from "~/lib/routeGuards";
import AccountPage from "~/pages/AccountPage/AccountPage";

export function meta() {
	return [
		{ title: "SUMMONIC Account" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	return redirectUnauthenticatedUser();
}

export default function Plans() {
	return <AccountPage />;
}
