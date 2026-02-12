import Cookie from "js-cookie";
import { redirect } from "react-router";
import RegisterPage from "~/pages/RegisterPage/RegisterPage";

export interface IPlan {
	id: string;
	name: string;
	description: string;
	price: number;
	credits: number;
	featured: boolean;
	features: string[];
	createdAt: string;
	updatedAt: string;
}

export function meta() {
	return [
		{ title: "Prompducer Register" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	const token = Cookie.get("token");

	if (token) {
		return redirect("/account");
	}

	return null;
}

export default function Plans() {
	return <RegisterPage />;
}
