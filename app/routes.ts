import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("layouts/AppLayout.tsx", [
		index("routes/home.tsx"),
		route("/login", "routes/login.tsx"),
		route("/reset-password", "routes/reset-password.tsx"),
		route("/register", "routes/register.tsx"),
		route("/account", "routes/account.tsx", {}),
	]),
] satisfies RouteConfig;
