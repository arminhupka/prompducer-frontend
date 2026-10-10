import RegisterPage from "~/pages/RegisterPage/RegisterPage";
import { seo } from "~/lib/seo";
import { redirectAuthenticatedUser } from "~/lib/routeGuards";

export function meta() {
	return seo({
		title: "Create account",
		path: "/register",
		description: "Create your free SUMMONIC account and get 30 credits to start.",
		noindex: true,
	});
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function Plans() {
	return <RegisterPage />;
}
