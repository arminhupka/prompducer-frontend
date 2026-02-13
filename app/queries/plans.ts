import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { apiClient } from "~/lib/apiClient";
import { queryClient } from "~/lib/queryClient";
import { getMe } from "~/queries/auth";
import { setUser } from "~/stores/authStore";

interface IUseDeactivatePlanMutation {
	onSuccess?: () => void | Promise<void>;
}

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
