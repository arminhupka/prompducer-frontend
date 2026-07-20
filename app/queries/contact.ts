import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "~/lib/apiClient";

export type ContactPayload = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export const useSendContact = () =>
	useMutation<void, AxiosError, ContactPayload>({
		mutationFn: async (payload) => {
			await apiClient.post("/contact", payload);
		},
	});
