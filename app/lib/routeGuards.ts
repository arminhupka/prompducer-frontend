import { redirect } from "react-router";
import { getMe } from "~/queries/auth";

const hasValidSession = async () => {
	try {
		await getMe();
		return true;
	} catch {
		return false;
	}
};

export const redirectAuthenticatedUser = async () => {
	const authenticated = await hasValidSession();
	return authenticated ? redirect("/account") : null;
};

export const redirectUnauthenticatedUser = async () => {
	const authenticated = await hasValidSession();
	return authenticated ? null : redirect("/login");
};
