import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { GeneratedPromptResponseDto } from "api/api-types";
import type { AxiosError } from "axios";
import { apiClient } from "~/lib/apiClient";

interface IUseGetPromptsProps {
	enabled?: boolean;
	page?: number;
	limit?: number;
}

interface PaginatedPromptsResponse {
	items: GeneratedPromptResponseDto[];
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && value !== null;

const getNumber = (value: unknown, fallback: number) =>
	typeof value === "number" && Number.isFinite(value) ? value : fallback;

const normalizePromptsResponse = (
	response: unknown,
	page: number,
	limit: number,
): PaginatedPromptsResponse => {
	if (Array.isArray(response)) {
		return {
			items: response as GeneratedPromptResponseDto[],
			meta: {
				page,
				limit,
				total: response.length,
				totalPages: Math.ceil(response.length / limit),
			},
		};
	}

	const root = isRecord(response) ? response : {};
	const container = isRecord(root.data) ? root.data : root;
	const itemsCandidate = Array.isArray(container.items)
		? container.items
		: Array.isArray(container.data)
			? container.data
			: Array.isArray(root.data)
				? root.data
				: [];
	const meta = isRecord(container.meta)
		? container.meta
		: isRecord(container.pagination)
			? container.pagination
			: {};
	const total = getNumber(meta.total, itemsCandidate.length);
	const resolvedLimit = getNumber(meta.limit, limit);

	return {
		items: itemsCandidate as GeneratedPromptResponseDto[],
		meta: {
			page: getNumber(meta.page, page),
			limit: resolvedLimit,
			total,
			totalPages: getNumber(meta.totalPages, Math.ceil(total / resolvedLimit)),
		},
	};
};

export const useGetPrompts = (props?: IUseGetPromptsProps) =>
	useQuery<PaginatedPromptsResponse, AxiosError>({
		queryKey: ["prompts", props?.page ?? 1, props?.limit ?? 10],
		queryFn: async () => {
			const page = props?.page ?? 1;
			const limit = props?.limit ?? 10;
			const { data } = await apiClient.get<unknown>("/prompts", {
				params: {
					page,
					limit,
				},
			});
			return normalizePromptsResponse(data, page, limit);
		},
		enabled: props?.enabled ?? true,
		placeholderData: keepPreviousData,
	});
