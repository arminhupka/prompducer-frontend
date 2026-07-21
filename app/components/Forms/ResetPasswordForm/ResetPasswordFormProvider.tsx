import { RHFZProvider } from "@netri0t/rhfz";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { useResetPassword } from "~/queries/auth";

interface IProps {
	children: ReactNode;
}

const Schema = z.object({
	email: z.email(),
});

type SchemaType = z.infer<typeof Schema>;

const ResetPasswordFormProvider = ({ children }: IProps) => {
	const navigate = useNavigate();
	const resetPassword = useResetPassword({
		onSuccess: async () => {
			toast.success(
				"If an account exists for that email, a reset link is on its way.",
			);
			navigate("/login", { replace: true });
		},
	});

	const defaultValues: SchemaType = {
		email: "",
	};

	const onSubmit = async (data: SchemaType) => {
		await resetPassword.mutateAsync(data);
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

export default ResetPasswordFormProvider;
