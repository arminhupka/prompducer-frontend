import { nanoid } from "nanoid";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { IPlan } from "~/routes/plans";

interface IProps {
	plan: IPlan;
}

const PlanCard = ({ plan }: IProps) => {
	return (
		<div
			key={plan.id}
			className="border drop-shadow-md rounded-md p-6 bg-card flex flex-col space-y-3"
		>
			<h3 className="text-slate-900 text-xl font-semibold flex items-center gap-2">
				{plan.name}
				{plan.featured && <Badge>Best Deal</Badge>}
			</h3>
			<p>{plan.description}</p>
			<div>
				<h3 className="text-slate-900 text-3xl font-semibold">
					${plan.price / 100}
					<sub className="text-slate-600 text-[15px] font-normal">
						/ per month
					</sub>
				</h3>
			</div>
			<div className="flex-1 flex flex-col space-y-2">
				<h4 className="text-sm text-muted-foreground">Include</h4>
				<ul className="space-y-2">
					{plan.features.map((feature) => (
						<li key={nanoid()} className="flex items-center text-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								className="mr-3 fill-green-500"
								viewBox="0 0 24 24"
							>
								<path
									d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
									data-original="#000000"
								/>
							</svg>
							{feature}
						</li>
					))}
				</ul>
				<div className="flex-1 flex flex-col justify-end">
					<Button className="mt-2 cursor-pointer" size="lg">
						Subscribe
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PlanCard;
