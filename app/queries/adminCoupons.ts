import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "~/lib/apiClient";
import { queryClient } from "~/lib/queryClient";

export type AdminCoupon = {
	id: string;
	code: string;
	tokens: number;
	used: boolean;
	packId: string | null;
	usedByUserId: string | null;
	createdAt: string;
};

export type CouponStatus = "all" | "used" | "unused";

export const useGenerateCoupons = () =>
	useMutation<AdminCoupon[], AxiosError, { packId: string; count: number }>({
		mutationFn: async (body) => {
			const { data } = await apiClient.post<AdminCoupon[]>(
				"/coupons/generate",
				body,
			);
			return data;
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] }),
	});

export const useAdminCoupons = (
	packId: string,
	status: CouponStatus,
	page: number,
) =>
	useQuery<{ items: AdminCoupon[]; total: number }>({
		queryKey: ["admin", "coupons", packId, status, page],
		queryFn: async () => {
			const { data } = await apiClient.get<{
				items: AdminCoupon[];
				total: number;
			}>("/coupons", {
				params: { packId: packId || undefined, status, page, pageSize: 20 },
			});
			return data;
		},
	});

export const fetchCouponCodes = async (
	packId: string,
	status: CouponStatus,
): Promise<string[]> => {
	const { data } = await apiClient.get<string[]>("/coupons/export", {
		params: { packId: packId || undefined, status },
	});
	return data;
};
