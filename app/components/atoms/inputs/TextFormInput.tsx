import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface IProps {
	name: string;
	placeholder?: string;
	type?: "text" | "password";
	label?: string;
}

const TextFormInput = ({ name, placeholder, type, label }: IProps) => {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field, formState: { errors } }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input type={type} placeholder={placeholder} {...field} />
					</FormControl>
					{errors[name]?.message && (
						<FormMessage>{errors[name]?.message.toString()}</FormMessage>
					)}
				</FormItem>
			)}
		/>
	);
};

export default TextFormInput;
