import { redirectNonAdmin } from "~/lib/routeGuards";
import { seo } from "~/lib/seo";
import AdminPage from "~/pages/AdminPage/AdminPage";

export function meta() {
	return seo({ title: "Admin", path: "/admin", noindex: true });
}

export async function clientLoader() {
	return redirectNonAdmin();
}

export default function Admin() {
	return <AdminPage />;
}
