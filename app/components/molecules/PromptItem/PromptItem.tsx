import type { GeneratedPromptResponseDto } from "api/api-types";
import { MessageSquare, RadioTower } from "lucide-react";
import { DateTime } from "luxon";
import AudioPlayer from "~/components/atoms/AudioPlayer/AudioPlayer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

interface PromptItemProps {
	prompt: GeneratedPromptResponseDto;
}

const PromptItem = ({ prompt }: PromptItemProps) => {
	return (
		<Card className="vst-panel-subtle gap-0 border-white/12 bg-black/25 py-0 text-white transition duration-200 hover:border-white/30 hover:bg-white/12 hover:shadow-[0_0_34px_rgb(255_36_79_/_0.18)]">
			<CardContent className="space-y-3 p-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
					<div className="flex items-start gap-2 min-w-0">
						<MessageSquare className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
						<p className="text-sm font-medium leading-snug text-white/90">
							{prompt.prompt}
						</p>
					</div>
					<div className="flex shrink-0 flex-wrap gap-2">
						<Badge className="border border-white/15 bg-white/10 text-xs text-white">
							<RadioTower className="mr-1 h-3 w-3 text-emerald-300" />
							{prompt.status}
						</Badge>
						<Badge className="border border-white/15 bg-black/25 text-xs text-white/75">
							{DateTime.fromISO(prompt.createdAt).toLocaleString(
								DateTime.DATETIME_MED,
							)}
						</Badge>
					</div>
				</div>
				<div className="space-y-2">
					{prompt.files.map((audio, i) => (
						<AudioPlayer
							key={audio.id}
							label={`Prompt ${i + 1}`}
							src={audio.key}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default PromptItem;
