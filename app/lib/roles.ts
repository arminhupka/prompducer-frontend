import type { MeResponseDto } from "api/api-types";

export type AppRole = "ADMIN" | "USER";

/**
 * The generated MeResponseDto doesn't include `role` yet (regenerate with
 * `npm run swagger` after the API ships the field). Read it defensively.
 */
export const userRole = (
	user: MeResponseDto | null | undefined,
): AppRole | undefined =>
	(user as { role?: AppRole } | null | undefined)?.role;

export const isAdmin = (user: MeResponseDto | null | undefined): boolean =>
	userRole(user) === "ADMIN";
