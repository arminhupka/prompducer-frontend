import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

interface GlobalAudioContextValue {
	activePlayerId: string | null;
	play: (playerId: string, audio: HTMLAudioElement) => Promise<void>;
	clearIfActive: (playerId: string) => void;
}

const GlobalAudioContext = createContext<GlobalAudioContextValue | null>(null);

interface IProps {
	children: ReactNode;
}

const GlobalAudioProvider = ({ children }: IProps) => {
	const [activePlayer, setActivePlayer] = useState<{
		id: string;
		audio: HTMLAudioElement;
	} | null>(null);

	const play = useCallback(
		async (playerId: string, audio: HTMLAudioElement) => {
			if (activePlayer?.audio && activePlayer.audio !== audio) {
				activePlayer.audio.pause();
			}

			setActivePlayer({ id: playerId, audio });
			await audio.play();
		},
		[activePlayer],
	);

	const clearIfActive = useCallback((playerId: string) => {
		setActivePlayer((prev) => (prev?.id === playerId ? null : prev));
	}, []);

	const value = useMemo(
		() => ({
			activePlayerId: activePlayer?.id ?? null,
			play,
			clearIfActive,
		}),
		[activePlayer, play, clearIfActive],
	);

	return (
		<GlobalAudioContext.Provider value={value}>
			{children}
		</GlobalAudioContext.Provider>
	);
};

export const useGlobalAudio = () => {
	const context = useContext(GlobalAudioContext);
	if (!context) {
		throw new Error("useGlobalAudio must be used within GlobalAudioProvider");
	}
	return context;
};

export default GlobalAudioProvider;
