import { useMutation } from "@tanstack/react-query";
import type { UseCouponDto } from "api/api-types";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { apiClient } from "~/lib/apiClient";
import { getApiErrorMessage } from "~/lib/getApiErrorMessage";
import { queryClient } from "~/lib/queryClient";
import { getMe } from "~/queries/auth";
import { setUser } from "~/stores/authStore";

interface IUseCouponMutation {
	onSuccess?: () => void | Promise<void>;
}

export const useCoupon = (props?: IUseCouponMutation) =>
	useMutation<void, AxiosError, UseCouponDto>({
		mutationFn: async (payload) => {
			const { data } = await apiClient.post<void>("/coupons", payload);
			return data;
		},
		onSuccess: async () => {
			const me = await queryClient.fetchQuery({
				queryKey: ["auth", "me"],
				queryFn: getMe,
			});

			setUser(me);
			toast.success("Coupon applied successfully");
			await props?.onSuccess?.();
		},
		onError: (error) => {
			const message = getApiErrorMessage(error);
			if (message) {
				toast.error(message);
			}
		},
	});
