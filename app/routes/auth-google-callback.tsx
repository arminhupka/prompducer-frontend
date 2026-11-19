import { redirect } from "react-router";
import { readTokenFromHash } from "~/lib/googleAuth";
import { seo } from "~/lib/seo";
import { getMe } from "~/queries/auth";
import { clearUser, setUser } from "~/stores/authStore";

const FAILED = "/login?error=failed";

export function meta() {
	return seo({
		title: "Signing in",
		path: "/auth/google/callback",
		noindex: true,
	});
}

// Client-only: the token arrives in the URL fragment (never sent to a server)
// and is persisted in localStorage, so nothing here may run during SSR.
export async function clientLoader() {
	const token = readTokenFromHash(window.location.hash);
	if (!token) return redirect(FAILED);

	localStorage.setItem("token", token);
	// Drop the fragment from the address bar / history immediately.
	window.history.replaceState(null, "", "/auth/google/callback");

	try {
		setUser(await getMe());
	} catch {
		localStorage.removeItem("token");
		clearUser();
		return redirect(FAILED);
	}
	return redirect("/account");
}
clientLoader.hydrate = true as const;

function SigningIn() {
	return (
		<section
			className="mx-auto flex min-h-[calc(100svh-11rem)] items-center justify-center gap-3 text-white/75"
			aria-live="polite"
		>
			<span
				className="size-5 animate-spin rounded-full border-2 border-white/25 border-t-white"
				aria-hidden="true"
			/>
			<span>Signing you in…</span>
		</section>
	);
}

export const HydrateFallback = SigningIn;

export default SigningIn;
