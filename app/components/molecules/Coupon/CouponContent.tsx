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
		<Card className="vst-panel gap-0 border-white/15 bg-black/25 py-0 text-white">
			<CardHeader className="p-5 pb-3">
				<CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
					<Ticket className="h-4 w-4 text-orange-200" />
					Tokens coupon
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5 pb-5">
				<p className="mb-3 text-xs text-white/65">
					Enter a coupon code to add extra tokens to your account.
				</p>
				<div className="flex gap-2 items-start">
					<div className="flex-1">
						<TextFormInput
							name="code"
							placeholder="Enter coupon code..."
							inputClassName="vst-input"
						/>
					</div>
					<Button
						type="submit"
						size="sm"
						variant="ghost"
						className="vst-button-primary shrink-0"
					>
						Apply
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default CouponContent;
