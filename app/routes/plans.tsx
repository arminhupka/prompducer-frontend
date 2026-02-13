import { apiClient } from "~/lib/apiClient";
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
	const { data } = await apiClient.get<IPlan[]>("/plans");

	if (data) {
		return data;
	}

	return [];
}

export default function Plans() {
	return <PlansPage />;
}
