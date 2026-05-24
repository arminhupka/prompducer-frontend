import clsx from "clsx";
import { CalendarClock, Coins, CreditCard, TrendingUp } from "lucide-react";
import { DateTime } from "luxon";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useActivatePlan, useDeactivatePlan, usePlans } from "~/queries/plans";
import { useAuthStore } from "~/stores/authStore";

const PlanInfo = () => {
	const { user } = useAuthStore();
	const planDeactivate = useDeactivatePlan();
	const planActivate = useActivatePlan();
	const plans = usePlans();

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
		clsx("border border-white/15 bg-white/10 text-white", {
			"bg-emerald-400 text-emerald-950": status === "ACTIVE",
			"bg-red-500 text-white": status === "CANCELED",
			"bg-white/20 text-white": status === "NONE",
		});

	return (
		<Card className="vst-panel gap-0 overflow-hidden border-white/15 bg-black/25 py-0 text-white">
			<CardHeader className="p-5 pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
						<CreditCard className="h-4 w-4 text-cyan-200" />
						Subscription
					</CardTitle>
					<div className="space-x-2">
						<Badge className="border border-white/15 bg-white text-[#150e1b]">
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
			<CardContent className="space-y-4 px-5 pb-5">
				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-xl border border-white/12 bg-white/10 p-3">
						<div className="flex items-center gap-1.5 mb-1">
							<Coins className="h-3.5 w-3.5 text-emerald-300" />
							<span className="text-xs text-white/65">Remaining</span>
						</div>
						<p className="text-lg font-bold text-white">
							{user?.subscription?.credits ?? 0}
						</p>
						<p className="text-xs text-white/55">tokens</p>
					</div>
					<div className="rounded-xl border border-white/12 bg-white/10 p-3">
						<div className="flex items-center gap-1.5 mb-1">
							<TrendingUp className="h-3.5 w-3.5 text-orange-200" />
							<span className="text-xs text-white/65">Total used</span>
						</div>
						<p className="text-lg font-bold text-white">
							{user?.totalUsedCredits ?? 0}
						</p>
						<p className="text-xs text-white/55">tokens</p>
					</div>
				</div>

				<Separator className="bg-white/10" />

				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-1.5 text-white/65">
							<CalendarClock className="h-3.5 w-3.5" />
							Next payment
						</span>
						<span className="font-medium text-white">
							{dateFormatter(user?.subscription?.nextPaymentDate)}
						</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-1.5 text-white/65">
							<CreditCard className="h-3.5 w-3.5" />
							Monthly price
						</span>
						<span className="font-medium text-white">
							{priceFormatter(user?.subscription?.plan?.price)}
						</span>
					</div>
				</div>

				<Separator className="bg-white/10" />

				{user?.subscription?.status !== "ACTIVE" &&
					plans.data?.map((plan) => (
						<Button
							key={plan.id}
							size="lg"
							variant="ghost"
							className="vst-button-primary h-auto w-full cursor-pointer py-3"
							onClick={() => {
								planActivate.mutate(plan.id);
							}}
						>
							Get {plan.name} ({priceFormatter(plan.price)}/month) with{" "}
							{plan.credits} tokens
						</Button>
					))}

				{user?.subscription?.status === "ACTIVE" && (
					<Button
						size="lg"
						variant="ghost"
						className="vst-button-ghost h-auto w-full cursor-pointer py-3"
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
