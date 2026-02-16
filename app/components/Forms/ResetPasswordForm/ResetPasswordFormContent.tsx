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

const ResetPasswordFormContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Reset password in {import.meta.env.VITE_APP_NAME}</CardTitle>
				<CardDescription>
					Enter your e-mail and we&apos;ll send password reset instructions
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				<TextFormInput name="email" label="E-mail" />
			</CardContent>
			<CardFooter className="flex flex-col gap-3">
				<Button type="submit" className="w-full cursor-pointer">
					Send reset link
				</Button>
				<p className="text-sm text-muted-foreground">
					Remember your password?{" "}
					<Link to="/login" className="text-primary underline-offset-4 hover:underline">
						Sign in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default ResetPasswordFormContent;
