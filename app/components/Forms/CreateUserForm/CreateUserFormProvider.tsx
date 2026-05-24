import { RHFZProvider } from "@netri0t/rhfz";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { useGetMe, useLogin, useRegister } from "~/queries/auth";
import { clearUser, setUser } from "~/stores/authStore";

interface IProps {
	children: ReactNode;
}

const Schema = z
	.object({
		email: z.email(),
		password: z.string().min(8),
		passwordConfirmation: z.string().min(8),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		path: ["passwordConfirmation"],
		message: "Passwords must match",
	});

type SchemaType = z.infer<typeof Schema>;

const CreateUserFormProvider = ({ children }: IProps) => {
	const navigate = useNavigate();
	const { refetch: refetchMe } = useGetMe({ enabled: false });
	const register = useRegister({});
	const login = useLogin({});

	const defaultValues: SchemaType = {
		email: "",
		password: "",
		passwordConfirmation: "",
	};

	const onSubmit = async (data: SchemaType) => {
		await register.mutateAsync(data);
		await login.mutateAsync({
			email: data.email,
			password: data.password,
		});

		const me = await refetchMe();

		if (me.data) {
			setUser(me.data);
		} else {
			clearUser();
		}

		navigate("/account", { replace: true });
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

export default CreateUserFormProvider;
