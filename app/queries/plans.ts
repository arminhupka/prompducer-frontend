import { useMutation, useQuery } from "@tanstack/react-query";
import type { ActivatePlanResponseDto, PlanResponseDto } from "api/api-types";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { apiClient } from "~/lib/apiClient";
import { getApiErrorMessage } from "~/lib/getApiErrorMessage";
import { queryClient } from "~/lib/queryClient";
import { getMe } from "~/queries/auth";
import { setUser } from "~/stores/authStore";

export const usePlans = () =>
	useQuery<PlanResponseDto[]>({
		queryKey: ["plans"],
		queryFn: async () => {
			const { data } = await apiClient.get<PlanResponseDto[]>("/plans");
			return data;
		},
	});

interface IUseDeactivatePlanMutation {
	onSuccess?: () => void | Promise<void>;
}

interface IUseActivatePlanMutation {
	onSuccess?: () => void | Promise<void>;
}

export const useActivatePlan = (props?: IUseActivatePlanMutation) =>
	useMutation<ActivatePlanResponseDto, AxiosError, string>({
		mutationFn: async (planId) => {
			const { data } = await apiClient.post<ActivatePlanResponseDto>(
				`/plans/activate/${planId}`,
			);
			return data;
		},
		onSuccess: async (data) => {
			if (data.url) {
				await props?.onSuccess?.();
				window.location.assign(data.url);
				return;
			}

			toast.error("Could not start checkout session");
			await props?.onSuccess?.();
		},
		onError: (error) => {
			toast.error(
				getApiErrorMessage(error) ??
					"Could not start checkout. Please try again.",
			);
		},
	});

export const useDeactivatePlan = (props?: IUseDeactivatePlanMutation) =>
	useMutation<void, AxiosError>({
		mutationFn: async () => {
			const { data } = await apiClient.post<void>("/plans/deactivate");
			return data;
		},
		onSuccess: async () => {
			const me = await queryClient.fetchQuery({
				queryKey: ["auth", "me"],
				queryFn: getMe,
			});

			setUser(me);
			toast.success("Subscription deactivated successfully");
			await props?.onSuccess?.();
		},
	});
