import RegisterPage from "~/pages/RegisterPage/RegisterPage";
import { redirectAuthenticatedUser } from "~/lib/routeGuards";

export function meta() {
	return [
		{ title: "SUMMONIC Register" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	return redirectAuthenticatedUser();
}

export default function Plans() {
	return <RegisterPage />;
}
