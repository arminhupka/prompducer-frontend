import AccountPage from "~/pages/AccountPage/AccountPage";
import { redirect } from "react-router";

export function meta() {
	return [
		{ title: "Prompducer Account" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	const token = localStorage.getItem("token");

	if (!token) {
		return redirect("/login");
	}

	return null;
}

export default function Plans() {
	return <AccountPage />;
}
