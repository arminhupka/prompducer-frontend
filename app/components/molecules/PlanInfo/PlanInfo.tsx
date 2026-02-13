import clsx from "clsx";
import { CalendarClock, Coins, CreditCard, TrendingUp } from "lucide-react";
import { DateTime } from "luxon";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useActivatePlan, useDeactivatePlan } from "~/queries/plans";
import { useAuthStore } from "~/stores/authStore";

const PlanInfo = () => {
	const { user } = useAuthStore();
	const planDeactivate = useDeactivatePlan();
	const planActivate = useActivatePlan();

	const dateFormatter = (date: string | null | undefined) => {
		if (!date) return "-";
		return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
	};

	const priceFormatter = (price: number | null | undefined) => {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		});
		return price ? formatter.format(price / 100) : "-";
	};

	const statusClasses = (status: "ACTIVE" | "CANCELED" | "NONE" | undefined) =>
		clsx("bg-primary text-primary-foreground", {
			"bg-green-500": status === "ACTIVE",
			"bg-red-500": status === "CANCELED",
			"bg-gray-500": status === "NONE",
		});

	return (
		<Card className="border border-border bg-card shadow-sm gap-0">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
						<CreditCard className="h-4 w-4 text-primary" />
						Subscription
					</CardTitle>
					<div className="space-x-2">
						<Badge className="bg-primary text-primary-foreground">
							{user?.subscription?.plan?.name ?? "Non active"}
						</Badge>
						{user?.subscription?.status === "ACTIVE" && (
							<Badge className={statusClasses(user?.subscription?.status)}>
								{user?.subscription?.status ?? "No subscription"}
							</Badge>
						)}
					</div>
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
							{user?.subscription?.credits ?? 0}
						</p>
						<p className="text-xs text-muted-foreground">tokens</p>
					</div>
					<div className="rounded-lg bg-secondary/60 p-3">
						<div className="flex items-center gap-1.5 mb-1">
							<TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
							<span className="text-xs text-muted-foreground">Total used</span>
						</div>
						<p className="text-lg font-bold text-card-foreground">
							{user?.totalUsedCredits ?? 0}
						</p>
						<p className="text-xs text-muted-foreground">tokens</p>
					</div>
				</div>

				<Separator />

				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-1.5 text-muted-foreground">
							<CalendarClock className="h-3.5 w-3.5" />
							Next payment
						</span>
						<span className="font-medium text-card-foreground">
							{dateFormatter(user?.subscription?.nextPaymentDate)}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-1.5 text-muted-foreground">
							<CreditCard className="h-3.5 w-3.5" />
							Monthly price
						</span>
						<span className="font-medium text-card-foreground">
							{priceFormatter(user?.subscription?.plan?.price)}
						</span>
					</div>
				</div>

				<Separator />

				{user?.subscription?.status !== "ACTIVE" && (
					<Button
						size="lg"
						className="w-full"
						onClick={() => {
							planActivate.mutate("5ad1c187-66d5-4ea4-8ba6-82be9c25cde4");
						}}
					>
						Subscribe
					</Button>
				)}

				{user?.subscription?.status === "ACTIVE" && (
					<Button
						size="lg"
						variant="outline"
						className="w-full"
						onClick={() => {
							planDeactivate.mutate();
						}}
					>
						Deactivate subscription
					</Button>
				)}
			</CardContent>
		</Card>
	);
};

export default PlanInfo;
