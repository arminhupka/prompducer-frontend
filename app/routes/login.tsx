import LoginPage from "~/pages/LoginPage/LoginPage";
import { redirect } from "react-router";

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
		{ title: "Prompducer Login" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader() {
	const token = localStorage.getItem("token");

	if (token) {
		return redirect("/account");
	}

	return null;
}

export default function Plans() {
	return <LoginPage />;
}
