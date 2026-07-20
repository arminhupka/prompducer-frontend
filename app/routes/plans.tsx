import PlansPage from "~/pages/PlansPage/PlansPage";

export function meta() {
	return [
		{ title: "Plans | SUMMONIC" },
		{
			name: "description",
			content:
				"Choose a SUMMONIC plan and get monthly credits to generate new playable instruments. Every new user gets a one-time 30 free credits.",
		},
	];
}

export default function Plans() {
	return <PlansPage />;
}
