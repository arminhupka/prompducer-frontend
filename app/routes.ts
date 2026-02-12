import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("layouts/AppLayout.tsx", [
		index("routes/home.tsx"),
		route("/plans", "routes/plans.tsx"),
		route("/login", "routes/login.tsx"),
		route("/register", "routes/register.tsx"),
		route("/account", "routes/account.tsx", {}),
	]),
] satisfies RouteConfig;
