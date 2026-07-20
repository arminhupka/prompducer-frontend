import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { apiClient } from "~/lib/apiClient";

type CreditCheckoutResponse = { url: string | null };

/**
 * Starts a one-time Stripe Checkout for a credit top-up pack.
 * Backend: POST /credits/checkout { packId } -> { url }. Subscribers only.
 */
export const usePurchaseCredits = () =>
	useMutation<CreditCheckoutResponse, AxiosError, string>({
		mutationFn: async (packId) => {
			const { data } = await apiClient.post<CreditCheckoutResponse>(
				"/credits/checkout",
				{ packId },
			);
			return data;
		},
		onSuccess: (data) => {
			if (data.url) {
				window.location.assign(data.url);
				return;
			}
			toast.error("Could not start checkout. Please try again.");
		},
		onError: (error) => {
			const message =
				(error.response?.data as { message?: string } | undefined)?.message ??
				"Could not start checkout. Please try again.";
			toast.error(message);
		},
	});
