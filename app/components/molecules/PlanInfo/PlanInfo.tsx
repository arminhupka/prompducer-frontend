import {
	CalendarClock,
	Coins,
	CreditCard,
	TrendingUp,
	Zap,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";

const subscription = {
	plan: "Pro",
	tokensTotal: 50000,
	tokensUsed: 32450,
	nextPayment: "2026-03-12",
	priceMonthly: "$49.99",
	renewsIn: 28,
};

const tokensLeft = subscription.tokensTotal - subscription.tokensUsed;
const usagePercent = (subscription.tokensUsed / subscription.tokensTotal) * 100;

const PlanInfo = () => (
	<Card className="border border-border bg-card shadow-sm gap-0">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
					<CreditCard className="h-4 w-4 text-primary" />
					Subscription
				</CardTitle>
				<Badge className="bg-primary text-primary-foreground">
					{subscription.plan}
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="grid grid-cols-2 gap-3">
				<div className="rounded-lg bg-secondary/60 p-3">
					<div className="flex items-center gap-1.5 mb-1">
						<Coins className="h-3.5 w-3.5 text-muted-foreground" />
						<span className="text-xs text-muted-foreground">Remaining</span>
					</div>
					<p className="text-lg font-bold text-card-foreground">
						{tokensLeft.toLocaleString("en-US")}
					</p>
					<p className="text-xs text-muted-foreground">tokens</p>
				</div>
				<div className="rounded-lg bg-secondary/60 p-3">
					<div className="flex items-center gap-1.5 mb-1">
						<TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
						<span className="text-xs text-muted-foreground">Used</span>
					</div>
					<p className="text-lg font-bold text-card-foreground">
						{subscription.tokensUsed.toLocaleString("en-US")}
					</p>
					<p className="text-xs text-muted-foreground">tokens</p>
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>Token usage</span>
					<span>{usagePercent.toFixed(1)}%</span>
				</div>
				<Progress value={usagePercent} className="h-2" />
			</div>

			<Separator />

			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="flex items-center gap-1.5 text-muted-foreground">
						<CalendarClock className="h-3.5 w-3.5" />
						Next payment
					</span>
					<span className="font-medium text-card-foreground">
						{subscription.nextPayment}
					</span>
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="flex items-center gap-1.5 text-muted-foreground">
						<Zap className="h-3.5 w-3.5" />
						Renews in
					</span>
					<span className="font-medium text-card-foreground">
						{subscription.renewsIn} days
					</span>
				</div>
				<div className="flex items-center justify-between text-sm">
					<span className="flex items-center gap-1.5 text-muted-foreground">
						<CreditCard className="h-3.5 w-3.5" />
						Monthly price
					</span>
					<span className="font-medium text-card-foreground">
						{subscription.priceMonthly}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default PlanInfo;
