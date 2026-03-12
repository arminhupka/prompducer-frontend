import RegisterPage from "~/pages/RegisterPage/RegisterPage";
import { redirectAuthenticatedUser } from "~/lib/routeGuards";

export function meta() {
	return [
		{ title: "Register | SUMMONIC" },
		{ name: "description", content: "Create your SUMMONIC account." },
	];
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function Plans() {
	return <RegisterPage />;
}
