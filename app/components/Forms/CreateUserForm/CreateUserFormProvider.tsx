import { RHFZProvider } from "@netri0t/rhfz";
import type { ReactNode } from "react";
import z from "zod";
import { useRegister } from "~/queries/auth";

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
	const register = useRegister({});

	const defaultValues: SchemaType = {
		email: "",
		password: "",
		passwordConfirmation: "",
	};

	const onSubmit = async (data: SchemaType) => {
		register.mutate(data);
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
