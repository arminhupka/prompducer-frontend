import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	CreateUserDto,
	LoginDto,
	LoginResponseDto,
	MeResponseDto,
} from "api/api-types";
import type { AxiosError } from "axios";
import { apiClient } from "~/lib/apiClient";

interface IUseAuthMutation {
	onSuccess?: () => void | Promise<void>;
}

interface IUseGetMeProps {
	enabled?: boolean;
}

export const useRegister = (props?: IUseAuthMutation) =>
	useMutation<void, AxiosError, CreateUserDto>({
		mutationFn: async (form) => {
			const { data } = await apiClient.post<void>("/auth/register", {
				email: form.email,
				password: form.password,
				passwordConfirmation: form.passwordConfirmation,
			});
			return data;
		},
		onSuccess: props?.onSuccess,
	});

export const useLogin = (props?: IUseAuthMutation) =>
	useMutation<LoginResponseDto, AxiosError, LoginDto>({
		mutationFn: async (form) => {
			const { data } = await apiClient.post<{ token: string }>("/auth/login", {
				email: form.email,
				password: form.password,
			});
			localStorage.setItem("token", data.token);
			return data;
		},
		onSuccess: props?.onSuccess,
	});

export const getMe = async (): Promise<MeResponseDto> => {
	const { data } = await apiClient.get("/auth/me");
	return data;
};

export const useGetMe = (props?: IUseGetMeProps) =>
	useQuery<MeResponseDto, AxiosError>({
		queryKey: ["auth", "me"],
		queryFn: getMe,
		enabled: props?.enabled ?? true,
	});
