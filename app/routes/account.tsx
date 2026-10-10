import { redirectUnauthenticatedUser } from "~/lib/routeGuards";
import { seo } from "~/lib/seo";
import AccountPage from "~/pages/AccountPage/AccountPage";

export function meta() {
	return seo({
		title: "Account",
		path: "/account",
		description: "Manage your prompts and subscription in SUMMONIC.",
		noindex: true,
	});
}

export async function clientLoader() {
	return redirectUnauthenticatedUser();
}

export default function Plans() {
	return <AccountPage />;
}
