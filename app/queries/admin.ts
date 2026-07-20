import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "~/lib/apiClient";
import { queryClient } from "~/lib/queryClient";

export type AdminOverview = {
	users: { total: number; newLast30d: number };
	subscribers: { active: number };
	revenue: { mrrCents: number };
	credits: { consumed: number };
	generations: {
		total: number;
		finished: number;
		failed: number;
		pending: number;
	};
	planDistribution: { name: string; count: number }[];
	signups: { date: string; count: number }[];
};

export type AdminUserRow = {
	id: string;
	email: string;
	role: "ADMIN" | "USER";
	createdAt: string;
	totalUsedCredits: number;
	subscription: {
		status: string;
		credits: number;
		planName: string | null;
	} | null;
};

export type AdminUsersPage = {
	items: AdminUserRow[];
	total: number;
	page: number;
	pageSize: number;
};

export type AdminGeneration = {
	id: string;
	prompt: string;
	status: string;
	createdAt: string;
	authorEmail: string | null;
};

export type AdminSubscription = {
	id: string;
	userEmail: string | null;
	planName: string | null;
	status: string;
	priceCents: number | null;
	credits: number;
	nextPaymentDate: string | null;
	cancelAtPeriodEnd: boolean;
	stripeSubscriptionId: string | null;
};

export const useAdminOverview = () =>
	useQuery<AdminOverview>({
		queryKey: ["admin", "overview"],
		queryFn: async () => {
			const { data } = await apiClient.get<AdminOverview>("/admin/overview");
			return data;
		},
	});

export const useAdminUsers = (query: string, page: number) =>
	useQuery<AdminUsersPage>({
		queryKey: ["admin", "users", query, page],
		queryFn: async () => {
			const { data } = await apiClient.get<AdminUsersPage>("/admin/users", {
				params: { query: query || undefined, page, pageSize: 20 },
			});
			return data;
		},
	});

export const useAdjustCredits = () =>
	useMutation<
		{ credits: number },
		AxiosError,
		{ userId: string; amount: number }
	>({
		mutationFn: async ({ userId, amount }) => {
			const { data } = await apiClient.post<{ credits: number }>(
				`/admin/users/${userId}/credits`,
				{ amount },
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
		},
	});

export const useSetRole = () =>
	useMutation<
		{ id: string; role: string },
		AxiosError,
		{ userId: string; role: "ADMIN" | "USER" }
	>({
		mutationFn: async ({ userId, role }) => {
			const { data } = await apiClient.post<{ id: string; role: string }>(
				`/admin/users/${userId}/role`,
				{ role },
			);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
		},
	});

export const useAdminGenerations = (page: number) =>
	useQuery<{ items: AdminGeneration[]; total: number }>({
		queryKey: ["admin", "generations", page],
		queryFn: async () => {
			const { data } = await apiClient.get<{
				items: AdminGeneration[];
				total: number;
			}>("/admin/generations", { params: { page, pageSize: 25 } });
			return data;
		},
	});

export const useAdminSubscriptions = () =>
	useQuery<AdminSubscription[]>({
		queryKey: ["admin", "subscriptions"],
		queryFn: async () => {
			const { data } =
				await apiClient.get<AdminSubscription[]>("/admin/subscriptions");
			return data;
		},
	});
