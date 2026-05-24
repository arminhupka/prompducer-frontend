import { RHFZProvider } from "@netri0t/rhfz";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { useGetMe, useLogin } from "~/queries/auth";
import { clearUser, setUser } from "~/stores/authStore";

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
	const { refetch: refetchMe } = useGetMe({ enabled: false });

	const login = useLogin({
		onSuccess: async () => {
			const me = await refetchMe();

			if (me.data) {
				setUser(me.data);
			} else {
				clearUser();
			}

			navigate("/account", { replace: true });
		},
	});

	const defaultValues: SchemaType = {
		email: "",
		password: "",
	};

	const onSubmit = async (data: SchemaType) => {
		await login.mutateAsync(data);
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
