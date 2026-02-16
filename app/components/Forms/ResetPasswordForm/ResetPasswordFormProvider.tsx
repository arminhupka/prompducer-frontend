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
			toast.success("Password reset request accepted");
			navigate("/login", { replace: true });
		},
	});

	const defaultValues: SchemaType = {
		email: "",
	};

	const onSubmit = async (data: SchemaType) => {
		resetPassword.mutate(data);
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
