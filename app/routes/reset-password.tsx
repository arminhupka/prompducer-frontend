import { redirectAuthenticatedUser } from "~/lib/routeGuards";
import ResetPasswordPage from "~/pages/ResetPasswordPage/ResetPasswordPage";

export function meta() {
	return [
		{ title: "Prompducer Reset Password" },
		{ name: "description", content: "Reset your password." },
	];
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function ResetPassword() {
	return <ResetPasswordPage />;
}
