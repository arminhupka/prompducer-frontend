import { redirectNonAdmin } from "~/lib/routeGuards";
import AdminPage from "~/pages/AdminPage/AdminPage";

export function meta() {
	return [
		{ title: "Admin | SUMMONIC" },
		{ name: "robots", content: "noindex" },
	];
}

export async function clientLoader() {
	return redirectNonAdmin();
}

export default function Admin() {
	return <AdminPage />;
}
