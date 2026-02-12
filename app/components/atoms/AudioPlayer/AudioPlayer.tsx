import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";

interface AudioPlayerProps {
	label: string;
	src: string;
}

const AudioPlayer = ({ label, src }: AudioPlayerProps) => {
	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const audioRef = useRef<HTMLAudioElement>(null);

	const toggle = () => {
		if (!audioRef.current) return;
		if (playing) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setPlaying(!playing);
	};

	const onTimeUpdate = () => {
		if (!audioRef.current) return;
		const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
		setProgress(isNaN(p) ? 0 : p);
	};

	const onEnded = () => {
		setPlaying(false);
		setProgress(0);
	};

	return (
		<div className="flex items-center gap-3 rounded-lg bg-secondary/60 px-3 py-2">
			<audio
				ref={audioRef}
				src={src}
				onTimeUpdate={onTimeUpdate}
				onEnded={onEnded}
			/>
			<Button
				size="icon"
				variant="ghost"
				className="h-8 w-8 shrink-0"
				onClick={toggle}
			>
				{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
			</Button>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<Volume2 className="h-3 w-3 text-muted-foreground shrink-0" />
					<span className="text-xs font-medium text-foreground truncate">
						{label}
					</span>
				</div>
				<div className="h-1 w-full rounded-full bg-border overflow-hidden">
					<div
						className="h-full rounded-full bg-primary transition-all duration-150"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
