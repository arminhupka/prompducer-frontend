import { RHFZProvider } from "@netri0t/rhfz";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { useConfirmResetPassword } from "~/queries/auth";

interface IProps {
	token: string;
	children: ReactNode;
}

const Schema = z
	.object({
		password: z.string().min(8),
		passwordConfirmation: z.string().min(8),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		path: ["passwordConfirmation"],
		message: "Passwords must match",
	});

type SchemaType = z.infer<typeof Schema>;

const SetNewPasswordFormProvider = ({ token, children }: IProps) => {
	const navigate = useNavigate();
	const confirm = useConfirmResetPassword({
		onSuccess: async () => {
			toast.success("Password updated - you can sign in now.");
			navigate("/login", { replace: true });
		},
	});

	const defaultValues: SchemaType = {
		password: "",
		passwordConfirmation: "",
	};

	const onSubmit = async (data: SchemaType) => {
		await confirm.mutateAsync({ token, ...data });
	};

	return (
		<RHFZProvider<SchemaType, unknown>
			defaultValues={defaultValues}
			schema={Schema}
			onSubmit={onSubmit}
		>
			{children}
		</RHFZProvider>
	);
};

export default SetNewPasswordFormProvider;
