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
import { Link } from "react-router";

const CreateUserFormContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Create account in {import.meta.env.VITE_APP_NAME}</CardTitle>
				<CardDescription>Start creating your music prompts</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				<TextFormInput name="email" label="E-mail" />
				<TextFormInput name="password" type="password" label="Password" />
				<TextFormInput
					name="passwordConfirmation"
					type="password"
					label="Confirm password"
				/>
			</CardContent>
			<CardFooter className="flex flex-col gap-3">
				<Button type="submit" className="w-full cursor-pointer">
					Create account
				</Button>
				<p className="text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link to="/login" className="text-primary underline-offset-4 hover:underline">
						Sign in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default CreateUserFormContent;
