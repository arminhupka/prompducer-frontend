import AccountPage from "~/pages/AccountPage/AccountPage";

export function meta() {
	return [
		{ title: "Prompducer Account" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Plans() {
	return <AccountPage />;
}
