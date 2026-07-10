import { Pause, Play, Volume2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { useGlobalAudio } from "~/providers/GlobalAudioProvider";

interface AudioPlayerProps {
	label: string;
	src: string;
}

const AudioPlayer = ({ label, src }: AudioPlayerProps) => {
	const playerId = useId();
	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const audioRef = useRef<HTMLAudioElement>(null);
	const { activePlayerId, play, clearIfActive } = useGlobalAudio();

	const toggle = async () => {
		if (!audioRef.current) return;
		if (playing) {
			audioRef.current.pause();
		} else {
			try {
				await play(playerId, audioRef.current);
			} catch {
				setPlaying(false);
			}
		}
	};

	const onTimeUpdate = () => {
		if (!audioRef.current) return;
		const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
		setProgress(Number.isNaN(p) ? 0 : p);
	};

	const onEnded = () => {
		setPlaying(false);
		setProgress(0);
		clearIfActive(playerId);
	};

	const onPlay = () => {
		setPlaying(true);
	};

	const onPause = () => {
		setPlaying(false);
		clearIfActive(playerId);
	};

	return (
		<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
			<audio
				ref={audioRef}
				src={src}
				preload="metadata"
				onTimeUpdate={onTimeUpdate}
				onEnded={onEnded}
				onPlay={onPlay}
				onPause={onPause}
			/>
			<Button
				size="icon"
				variant="ghost"
				className="grid h-9 w-9 shrink-0 rounded-full border border-white/15 bg-white text-[#150e1b] hover:bg-rose-100 hover:text-[#150e1b] focus-visible:ring-cyan-200"
				onClick={toggle}
				aria-label={playing ? `Pause ${label}` : `Play ${label}`}
			>
				{playing && activePlayerId === playerId ? (
					<Pause className="h-4 w-4" />
				) : (
					<Play className="h-4 w-4" />
				)}
			</Button>
			<div className="flex-1 min-w-0">
				<div className="mb-1 flex items-center gap-2">
					<Volume2 className="h-3 w-3 shrink-0 text-cyan-200" />
					<span className="truncate text-xs font-medium text-white/85">
						{label}
					</span>
				</div>
				<div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
					<div
						className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-emerald-300 to-orange-200 transition-all duration-150"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
