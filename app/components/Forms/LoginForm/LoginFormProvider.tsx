import { RHFZProvider } from "@netri0t/rhfz";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { useLogin } from "~/queries/auth";

interface IProps {
	children: ReactNode;
}

const Schema = z.object({
	email: z.email(),
	password: z.string().min(1),
});

type SchemaType = z.infer<typeof Schema>;

const LoginFormProvider = ({ children }: IProps) => {
	const navigate = useNavigate();

	const login = useLogin({
		onSuccess: () => {
			navigate("/account", { replace: true });
		},
	});

	const defaultValues: SchemaType = {
		email: "",
		password: "",
	};

	const onSubmit = async (data: SchemaType) => {
		login.mutate(data);
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

export default LoginFormProvider;
