import { redirectAuthenticatedUser } from "~/lib/routeGuards";
import ResetPasswordPage from "~/pages/ResetPasswordPage/ResetPasswordPage";

export function meta() {
	return [
		{ title: "Reset Password | SUMMONIC" },
		{
			name: "description",
			content: "Reset the password for your SUMMONIC account.",
		},
	];
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function ResetPassword() {
	return <ResetPasswordPage />;
}
