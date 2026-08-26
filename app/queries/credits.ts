import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { trackBeginCheckout } from "~/lib/analytics";
import { apiClient } from "~/lib/apiClient";

type CreditCheckoutResponse = { url: string | null };

type PaymentProvider = "stripe" | "paypal";

interface IPurchaseCreditsVariables {
	packId: string;
	provider?: PaymentProvider;
}

/**
 * Starts a one-time checkout (Stripe or PayPal) for a credit top-up pack.
 * Backend: POST /credits/checkout { packId, provider } -> { url }. Subscribers only.
 */
export const usePurchaseCredits = () =>
	useMutation<CreditCheckoutResponse, AxiosError, IPurchaseCreditsVariables>({
		mutationFn: async ({ packId, provider = "stripe" }) => {
			const { data } = await apiClient.post<CreditCheckoutResponse>(
				"/credits/checkout",
				{ packId, provider },
			);
			return data;
		},
		onSuccess: (data) => {
			if (data.url) {
				trackBeginCheckout("credits");
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
