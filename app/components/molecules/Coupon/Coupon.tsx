import { Ticket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const Coupon = () => {
	const [coupon, setCoupon] = useState("");

	const handleApplyCoupon = () => {
		if (!coupon.trim()) {
			toast.error("Enter a coupon code");
			return;
		}
		toast.success(`Coupon "${coupon}" has been applied!`);
		setCoupon("");
	};

	return (
		<Card className="border border-border bg-card shadow-sm gap-0">
			<CardHeader className="pb-3">
				<CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
					<Ticket className="h-4 w-4 text-primary" />
					Discount coupon
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-xs text-muted-foreground mb-3">
					Enter a coupon code to add extra credits to your account.
				</p>
				<div className="flex gap-2">
					<Input
						placeholder="Enter coupon code..."
						value={coupon}
						onChange={(e) => setCoupon(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
						className="text-sm"
					/>
					<Button onClick={handleApplyCoupon} size="sm" className="shrink-0">
						Apply
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default Coupon;
