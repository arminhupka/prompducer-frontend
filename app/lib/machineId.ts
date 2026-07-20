import FingerprintJS from "@fingerprintjs/fingerprintjs";

let cached: string | null = null;

/**
 * A stable-per-device fingerprint used to prevent free-credit farming.
 * Sent on register and login so the API can gate the signup credits.
 * Falls back to a localStorage UUID if fingerprinting is unavailable.
 */
export const getMachineId = async (): Promise<string> => {
	if (cached) return cached;
	try {
		const fp = await FingerprintJS.load();
		const { visitorId } = await fp.get();
		cached = visitorId;
		return visitorId;
	} catch {
		let id = localStorage.getItem("mid");
		if (!id) {
			id =
				typeof crypto !== "undefined" && "randomUUID" in crypto
					? crypto.randomUUID()
					: Math.random().toString(36).slice(2);
			localStorage.setItem("mid", id);
		}
		cached = id;
		return id;
	}
};
