import { redirectUnauthenticatedUser } from "~/lib/routeGuards";
import AccountPage from "~/pages/AccountPage/AccountPage";

export function meta() {
	return [
		{ title: "Account | SUMMONIC" },
		{
			name: "description",
			content: "Manage your prompts and subscription in SUMMONIC.",
		},
	];
}

export async function clientLoader() {
	return redirectUnauthenticatedUser();
}

export default function Plans() {
	return <AccountPage />;
}
