import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("layouts/AppLayout.tsx", [
		index("routes/home.tsx"),
		route("/download", "routes/download.tsx"),
		route("/plans", "routes/plans.tsx"),
		route("/login", "routes/login.tsx"),
		route("/reset-password", "routes/reset-password.tsx"),
		route("/register", "routes/register.tsx"),
		route("/account", "routes/account.tsx", {}),
		route("/admin", "routes/admin.tsx"),
		route("/about", "routes/about.tsx"),
		route("/contact", "routes/contact.tsx"),
		route("/help", "routes/help.tsx"),
		route("/terms", "routes/terms.tsx"),
		route("/privacy", "routes/privacy.tsx"),
		route("/refunds", "routes/refunds.tsx"),
		route("/acceptable-use", "routes/acceptable-use.tsx"),
	]),
] satisfies RouteConfig;
