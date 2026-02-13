import { useRHZPContex } from "@netri0t/rhfz";
import { Ticket } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import TextFormInput from "~/components/atoms/inputs/TextFormInput";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const CouponContent = () => {
	const { reset } = useFormContext();
	const { isSubmittedSuccessfully } = useRHZPContex();

	useEffect(() => {
		if (isSubmittedSuccessfully) {
			reset();
		}
	}, [isSubmittedSuccessfully, reset]);

	return (
		<Card className="border border-border bg-card shadow-sm gap-0">
			<CardHeader className="pb-3">
				<CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
					<Ticket className="h-4 w-4 text-primary" />
					Tokens coupon
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-xs text-muted-foreground mb-3">
					Enter a coupon code to add extra tokens to your account.
				</p>
				<div className="flex gap-2 items-start">
					<div className="flex-1">
						<TextFormInput name="code" placeholder="Enter coupon code..." />
					</div>
					<Button type="submit" size="sm" className="shrink-0">
						Apply
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default CouponContent;
