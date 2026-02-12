import Coupon from "~/components/molecules/Coupon/Coupon";
import PlanInfo from "~/components/molecules/PlanInfo/PlanInfo";
import PromptItem from "~/components/molecules/PromptItem/PromptItem";
import { ScrollArea } from "~/components/ui/scroll-area";

const mockPrompts = [
	{
		id: 1,
		text: "Generate narration for a cosmetics product ad",
		date: "12.02.2026",
		audioFiles: [
			{ label: "Male version", src: "" },
			{ label: "Female version", src: "" },
			{ label: "Neutral version", src: "" },
		],
	},
	{
		id: 2,
		text: "Read podcast text about artificial intelligence",
		date: "11.02.2026",
		audioFiles: [
			{ label: "Voice 1 - calm", src: "" },
			{ label: "Voice 2 - dynamic", src: "" },
			{ label: "Voice 3 - professional", src: "" },
		],
	},
	{
		id: 3,
		text: "Create an audiobook from a crime novel excerpt",
		date: "10.02.2026",
		audioFiles: [
			{ label: "Classic narrator", src: "" },
			{ label: "Dramatic narrator", src: "" },
			{ label: "Whisper narrator", src: "" },
		],
	},
	{
		id: 4,
		text: "Record a welcome message for a mobile app",
		date: "09.02.2026",
		audioFiles: [
			{ label: "Friendly tone", src: "" },
			{ label: "Formal tone", src: "" },
			{ label: "Energetic tone", src: "" },
		],
	},
	{
		id: 5,
		text: "Prepare a voice-over for an instructional video",
		date: "08.02.2026",
		audioFiles: [
			{ label: "Slow pace", src: "" },
			{ label: "Medium pace", src: "" },
			{ label: "Fast pace", src: "" },
		],
	},
];

const AccountPage = () => {
	return (
		<div className="flex min-h-0 flex-col gap-6 lg:grid lg:h-full lg:grid-cols-[minmax(0,1fr)_360px]">
			<div className="order-2 flex min-h-0 flex-col lg:order-1">
				<h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
					Prompt history ({mockPrompts.length})
				</h2>
				<ScrollArea className="pr-2 lg:min-h-0 lg:flex-1">
					<div className="space-y-3 pr-2">
						{mockPrompts.map((prompt) => (
							<PromptItem key={prompt.id} prompt={prompt} />
						))}
					</div>
				</ScrollArea>
			</div>

			<div className="order-1 space-y-2 lg:order-2">
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
