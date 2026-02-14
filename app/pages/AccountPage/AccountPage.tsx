import Coupon from "~/components/molecules/Coupon/Coupon";
import PlanInfo from "~/components/molecules/PlanInfo/PlanInfo";
import PromptItem from "~/components/molecules/PromptItem/PromptItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useGetPrompts } from "~/queries/prompts";

const AccountPage = () => {
	const prompts = useGetPrompts();

	return (
		<div className="flex min-h-0 flex-col gap-6 lg:grid lg:h-full lg:grid-cols-6">
			<div className="order-2 flex min-h-0 flex-col lg:order-1 lg:col-span-4">
				<h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
					Prompt history ({prompts.data?.length})
				</h2>
				<ScrollArea className="pr-2 lg:min-h-0 lg:flex-1">
					<div className="space-y-3 pr-2">
						{prompts.data?.map((prompt) => (
							<PromptItem key={prompt.id} prompt={prompt} />
						))}
					</div>
				</ScrollArea>
			</div>

			<div className="order-1 space-y-2 lg:order-2 lg:col-span-2">
				<h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
					Your subscription
				</h2>
				<PlanInfo />
				<Coupon />
			</div>
		</div>
	);
};

export default AccountPage;
