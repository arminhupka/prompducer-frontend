import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface IProps {
	name: string;
	placeholder?: string;
	type?: "text" | "password";
	label?: string;
	inputClassName?: string;
	disabled?: boolean;
}

const TextFormInput = ({
	name,
	placeholder,
	type,
	label,
	inputClassName,
	disabled,
}: IProps) => {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field, formState: { errors } }) => (
				<FormItem>
					{label && <FormLabel className="text-white/80">{label}</FormLabel>}
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							className={cn(inputClassName)}
							{...field}
							disabled={disabled}
						/>
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
