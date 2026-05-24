import { useRHZPContex } from "@netri0t/rhfz";
import { Loader2 } from "lucide-react";
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
	const { isSubmitting } = useRHZPContex();

	return (
		<Card className="vst-shell gap-0 border-white/20 bg-black/30 py-0 text-white">
			<CardHeader className="p-6 pb-4">
				<CardTitle className="vst-display text-3xl text-white">
					Sign in
				</CardTitle>
				<CardDescription className="text-white/68">
					Manage your subscription and prompt history
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5 px-6">
				<TextFormInput
					name="email"
					label="E-mail"
					inputClassName="vst-input"
					disabled={isSubmitting}
				/>
				<TextFormInput
					name="password"
					type="password"
					label="Password"
					inputClassName="vst-input"
					disabled={isSubmitting}
				/>
			</CardContent>
			<CardFooter className="flex flex-col gap-3 px-6 pb-6 pt-5">
				<Button
					type="submit"
					variant="ghost"
					className="vst-button-primary h-12 w-full cursor-pointer"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader2 className="animate-spin" />}
					{isSubmitting ? "Signing in..." : "Sign in to SUMMONIC"}
				</Button>
				<p className="text-sm text-white/65">
					Forgot password?{" "}
					<Link
						to="/reset-password"
						className="vst-link underline-offset-4 hover:underline"
					>
						Reset it
					</Link>
				</p>
				<p className="text-sm text-white/65">
					Don&apos;t have an account yet?{" "}
					<Link
						to="/register"
						className="vst-link underline-offset-4 hover:underline"
					>
						Create account
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LoginFormContent;
