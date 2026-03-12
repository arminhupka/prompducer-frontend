import { redirect } from "react-router";

export function meta() {
	return [
		{ title: "Redirect | SUMMONIC" },
		{ name: "description", content: "Redirecting to your SUMMONIC account." },
	];
}

export async function clientLoader() {
	return redirect("/account");
}

export default function Home() {
	return null;
}
