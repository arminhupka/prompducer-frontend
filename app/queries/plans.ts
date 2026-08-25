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

export type BillingInterval = "month" | "year";
export type PaymentProvider = "stripe" | "paypal";

interface IActivatePlanVariables {
	planId: string;
	interval: BillingInterval;
	provider?: PaymentProvider;
}

export const useActivatePlan = (props?: IUseActivatePlanMutation) =>
	useMutation<ActivatePlanResponseDto, AxiosError, IActivatePlanVariables>({
		mutationFn: async ({ planId, interval, provider = "stripe" }) => {
			const { data } = await apiClient.post<ActivatePlanResponseDto>(
				`/plans/activate/${planId}?interval=${interval}&provider=${provider}`,
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

interface IUseChangePlanMutation {
	onSuccess?: () => void | Promise<void>;
}

/**
 * Upgrades/downgrades the active subscription in place (Stripe proration).
 * Backend: POST /plans/change/:id -> { ok, plan }. Refreshes the current user.
 */
export const useChangePlan = (props?: IUseChangePlanMutation) =>
	useMutation<{ ok: boolean; plan: string }, AxiosError, string>({
		mutationFn: async (planId) => {
			const { data } = await apiClient.post<{ ok: boolean; plan: string }>(
				`/plans/change/${planId}`,
			);
			return data;
		},
		onSuccess: async (data) => {
			const me = await queryClient.fetchQuery({
				queryKey: ["auth", "me"],
				queryFn: getMe,
			});
			setUser(me);
			toast.success(`Switched to ${data.plan}`);
			await props?.onSuccess?.();
		},
		onError: (error) => {
			toast.error(
				getApiErrorMessage(error) ?? "Could not change plan. Please try again.",
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
