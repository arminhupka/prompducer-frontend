import { redirectAuthenticatedUser } from "~/lib/routeGuards";
import { seo } from "~/lib/seo";
import ResetPasswordPage from "~/pages/ResetPasswordPage/ResetPasswordPage";

export function meta() {
	return seo({
		title: "Reset Password",
		path: "/reset-password",
		description: "Reset the password for your SUMMONIC account.",
		noindex: true,
	});
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function ResetPassword() {
	return <ResetPasswordPage />;
}
