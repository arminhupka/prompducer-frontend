import { useQuery } from "@tanstack/react-query";
import type { GeneratedPromptResponseDto } from "api/api-types";
import type { AxiosError } from "axios";
import { apiClient } from "~/lib/apiClient";

interface IUseGetPromptsProps {
	enabled?: boolean;
}

export const useGetPrompts = (props?: IUseGetPromptsProps) =>
	useQuery<GeneratedPromptResponseDto[], AxiosError>({
		queryKey: ["prompts"],
		queryFn: async () => {
			const { data } =
				await apiClient.get<GeneratedPromptResponseDto[]>("/prompts");
			return data;
		},
		enabled: props?.enabled ?? true,
	});
