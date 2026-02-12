import { Link } from "react-router";
import TextFormInput from "~/components/atoms/inputs/TextFormInput";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

const LoginFormContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign in to {import.meta.env.VITE_APP_NAME}</CardTitle>
				<CardDescription>Manage your subscription</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				<TextFormInput name="email" label="E-mail" />
				<TextFormInput name="password" type="password" label="Password" />
			</CardContent>
			<CardFooter className="flex flex-col gap-3">
				<Button type="submit" className="w-full cursor-pointer">
					Sign in to SUMMONIC
				</Button>
				<p className="text-sm text-muted-foreground">
					Don&apos;t have an account yet?{" "}
					<Link
						to="/register"
						className="text-primary underline-offset-4 hover:underline"
					>
						Create account
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LoginFormContent;
