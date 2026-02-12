import { MessageSquare } from "lucide-react";
import AudioPlayer from "~/components/atoms/AudioPlayer/AudioPlayer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

interface PromptItemProps {
	prompt: {
		id: number;
		text: string;
		date: string;
		audioFiles: { label: string; src: string }[];
	};
}

const PromptItem = ({ prompt }: PromptItemProps) => {
	return (
		<Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
			<CardContent className="p-4 space-y-3">
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-start gap-2 min-w-0">
						<MessageSquare className="h-4 w-4 mt-1 text-primary shrink-0" />
						<p className="text-sm font-medium text-card-foreground leading-snug">
							{prompt.text}
						</p>
					</div>
					<Badge variant="secondary" className="shrink-0 text-xs">
						{prompt.date}
					</Badge>
				</div>
				<div className="space-y-2">
					{prompt.audioFiles.map((audio, i) => (
						<AudioPlayer key={i} label={audio.label} src={audio.src} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default PromptItem;
