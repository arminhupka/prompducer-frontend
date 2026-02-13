import { RHFZProvider } from "@netri0t/rhfz";
import type { ReactNode } from "react";
import z from "zod";
import { useCoupon } from "~/queries/coupons";

interface IProps {
	children: ReactNode;
}

const Schema = z.object({
	code: z.string().trim().min(1, "Enter a coupon code"),
});

type SchemaType = z.infer<typeof Schema>;

const CouponProvider = ({ children }: IProps) => {
	const couponMutation = useCoupon();

	const defaultValues: SchemaType = {
		code: "",
	};

	const onSubmit = async (data: SchemaType) => {
		couponMutation.mutate(data);
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

export default CouponProvider;
