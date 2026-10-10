import LoginPage from "~/pages/LoginPage/LoginPage";
import { seo } from "~/lib/seo";
import { redirectAuthenticatedUser } from "~/lib/routeGuards";

export function meta() {
	return seo({
		title: "Login",
		path: "/login",
		description: "Sign in to your SUMMONIC account.",
		noindex: true,
	});
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function Plans() {
	return <LoginPage />;
}
