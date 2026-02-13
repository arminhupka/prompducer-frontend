import type { GeneratedPromptResponseDto } from "api/api-types";
import { MessageSquare } from "lucide-react";
import { DateTime } from "luxon";
import AudioPlayer from "~/components/atoms/AudioPlayer/AudioPlayer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

interface PromptItemProps {
	prompt: GeneratedPromptResponseDto;
}

const PromptItem = ({ prompt }: PromptItemProps) => {
	return (
		<Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
			<CardContent className="space-y-3">
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-start gap-2 min-w-0">
						<MessageSquare className="h-4 w-4 mt-1 text-primary shrink-0" />
						<p className="text-sm font-medium text-card-foreground leading-snug">
							{prompt.prompt}
						</p>
					</div>
					<Badge variant="secondary" className="shrink-0 text-xs">
						{DateTime.fromISO(prompt.createdAt).toLocaleString(
							DateTime.DATETIME_MED,
						)}
					</Badge>
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
