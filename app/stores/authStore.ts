import type { MeResponseDto } from "api/api-types";
import { create } from "zustand";

interface IAuthStoreState {
	user: MeResponseDto | null;
}

export const useAuthStore = create<IAuthStoreState>(() => ({
	user: null,
}));

export const setUser = (user: MeResponseDto | null) => {
	useAuthStore.setState({ user });
};

export const clearUser = () => {
	useAuthStore.setState({ user: null });
};
