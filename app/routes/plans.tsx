import PlansPage from "~/pages/PlansPage/PlansPage";

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
		{ title: "Prompducer PlansPage" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function clientLoader(): Promise<IPlan[]> {
	const fetcher = await fetch("http://localhost:8888/plans");

	if (fetcher.ok) {
		return fetcher.json();
	}

	return [];
}

export default function Plans() {
	return <PlansPage />;
}
