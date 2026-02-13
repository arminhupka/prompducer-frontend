import axios from "axios";

type ApiErrorData = {
	message?: string | string[];
};

export const getApiErrorMessage = (error: unknown) => {
	if (!axios.isAxiosError<ApiErrorData>(error)) return null;

	const message = error.response?.data?.message;
	if (typeof message === "string") return message;
	if (Array.isArray(message)) return message.join(", ");

	return null;
};
