import {nanoid} from "nanoid";
import {useRouteLoaderData} from "react-router";
import PlanCard from "~/components/molecules/PlanCard/PlanCard";
import type {IPlan} from "~/routes/plans";

export default function PlansPage() {
	const data = useRouteLoaderData<IPlan[]>("routes/plans");

	return (
		<div className="container mx-auto">
			<div className="max-w-6xl max-lg:max-w-3xl mx-auto">
				<div className="text-center">
					<h2 className="text-slate-900 text-3xl font-bold mb-4">
						Choose the right plan for you
					</h2>
					<p className="text-[15px] text-slate-600">
						Flexible plans designed for individuals, teams, and growing
						businesses.
					</p>
				</div>

				<div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-12 max-sm:max-w-sm max-sm:mx-auto">
					{data?.map((plan) => (
						<PlanCard key={nanoid()} plan={plan} />
					))}
				</div>
			</div>
		</div>
	);
}
