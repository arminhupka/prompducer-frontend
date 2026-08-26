import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	CreateUserDto,
	LoginDto,
	LoginResponseDto,
	MeResponseDto,
	ResetPasswordDto,
} from "api/api-types";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { trackSignup } from "~/lib/analytics";
import { apiClient } from "~/lib/apiClient";
import { getApiErrorMessage } from "~/lib/getApiErrorMessage";
import { getMachineId } from "~/lib/machineId";

interface IUseAuthMutation {
	onSuccess?: () => void | Promise<void>;
}

interface IUseGetMeProps {
	enabled?: boolean;
}

export const useRegister = (props?: IUseAuthMutation) =>
	useMutation<void, AxiosError, CreateUserDto>({
		mutationFn: async (form) => {
			const machineId = await getMachineId();
			const { data } = await apiClient.post<void>("/auth/register", {
				email: form.email,
				password: form.password,
				passwordConfirmation: form.passwordConfirmation,
				machineId,
			});
			return data;
		},
		onSuccess: async () => {
			trackSignup();
			await props?.onSuccess?.();
		},
		onError: (error) => {
			toast.error(
				getApiErrorMessage(error) ??
					"Unable to create account. Please try again.",
			);
		},
	});

export const useLogin = (props?: IUseAuthMutation) =>
	useMutation<LoginResponseDto, AxiosError, LoginDto>({
		mutationFn: async (form) => {
			const machineId = await getMachineId();
			const { data } = await apiClient.post<{ token: string }>("/auth/login", {
				email: form.email,
				password: form.password,
				machineId,
			});
			localStorage.setItem("token", data.token);
			return data;
		},
		onSuccess: props?.onSuccess,
		onError: (error) => {
			toast.error(
				getApiErrorMessage(error) ??
					"Unable to sign in. Please check your email and password.",
			);
		},
	});

export const useResetPassword = (props?: IUseAuthMutation) =>
	useMutation<void, AxiosError, ResetPasswordDto>({
		mutationFn: async (form) => {
			const { data } = await apiClient.post<void>("/auth/reset-password", {
				email: form.email,
			});
			return data;
		},
		onSuccess: props?.onSuccess,
		onError: (error) => {
			toast.error(
				getApiErrorMessage(error) ??
					"Unable to send password reset request. Please try again.",
			);
		},
	});

export const useConfirmResetPassword = (props?: IUseAuthMutation) =>
	useMutation<
		void,
		AxiosError,
		{ token: string; password: string; passwordConfirmation: string }
	>({
		mutationFn: async (form) => {
			const { data } = await apiClient.post<void>(
				"/auth/reset-password/confirm",
				form,
			);
			return data;
		},
		onSuccess: props?.onSuccess,
		onError: (error) => {
			toast.error(
				getApiErrorMessage(error) ??
					"Unable to reset your password. The link may have expired.",
			);
		},
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
