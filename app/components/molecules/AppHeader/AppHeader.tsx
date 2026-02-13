import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { clearUser, useAuthStore } from "~/stores/authStore";

const AppHeader = () => {
	const user = useAuthStore((state) => state.user);

	const handleLogout = () => {
		localStorage.removeItem("token");
		clearUser();
		window.location.assign("/login");
	};

	return (
		<header className="border-b py-4 bg-card drop-shadow-xl/5">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-semibold">
					{import.meta.env.VITE_APP_NAME}
				</h1>
				{user ? (
					<div className="flex items-center gap-3">
						<p>{user.email}</p>
						<Button className="cursor-pointer" onClick={handleLogout}>
							Logout
						</Button>
					</div>
				) : (
					<Button className="cursor-pointer" asChild={true}>
						<Link to="/login">Login</Link>
					</Button>
				)}
			</div>
		</header>
	);
};

export default AppHeader;
