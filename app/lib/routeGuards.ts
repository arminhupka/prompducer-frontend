import { redirect } from "react-router";
import { isAdmin } from "~/lib/roles";
import { getMe } from "~/queries/auth";

const hasValidSession = async () => {
	try {
		await getMe();
		return true;
	} catch {
		return false;
	}
};

export const redirectNonAdmin = async () => {
	try {
		const me = await getMe();
		return isAdmin(me) ? null : redirect("/");
	} catch {
		return redirect("/login");
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
