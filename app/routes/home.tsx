import { redirect } from "react-router";

export function meta() {
	return [
		{ title: "SUMMONIC" },
		{ name: "description", content: "SUMMONIC" },
	];
}

export async function clientLoader() {
	return redirect("/account");
}

export default function Home() {
	return null;
}
