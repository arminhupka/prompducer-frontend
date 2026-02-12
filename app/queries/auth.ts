import { useMutation } from "@tanstack/react-query";
import type {
	CreateUserDto,
	LoginDto,
	LoginResponseDto,
	RegisterResponseDto,
} from "api/api-types";
import type { AxiosError } from "axios";
import { apiClient } from "~/lib/apiClient";

interface IUseAuthMutation {
	onSuccess?: () => void;
}

export const useRegister = (props?: IUseAuthMutation) =>
	useMutation<RegisterResponseDto, AxiosError, CreateUserDto>({
		mutationFn: async (form) => {
			const { data } = await apiClient.post<RegisterResponseDto>(
				"/auth/register",
				{
					email: form.email,
					password: form.password,
					passwordConfirmation: form.passwordConfirmation,
				},
			);
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
