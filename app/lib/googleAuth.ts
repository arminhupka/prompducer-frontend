import { getMachineId } from "~/lib/machineId";

/** Full URL that starts the Google OAuth flow on the API. */
export const googleSignInUrl = async (): Promise<string> => {
	const machineId = await getMachineId();
	return `${import.meta.env.VITE_API_URL}/auth/google?machineId=${encodeURIComponent(machineId)}`;
};

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
	access_denied: "Google sign-in was cancelled.",
	google_email_unverified: "Your Google email is not verified.",
	state_mismatch: "Sign-in expired. Please try again.",
};

const GOOGLE_ERROR_FALLBACK = "Google sign-in failed. Please try again.";

/** Maps the `?error=` code from the API redirect to user-facing copy. */
export const googleErrorMessage = (code: string | null): string | null => {
	if (code === null) return null;
	return GOOGLE_ERROR_MESSAGES[code] ?? GOOGLE_ERROR_FALLBACK;
};

/** Extracts the API token from a `#token=…` fragment; null when missing or empty. */
export const readTokenFromHash = (hash: string): string | null => {
	const token = new URLSearchParams(hash.replace(/^#/, "")).get("token");
	return token ? token : null;
};
