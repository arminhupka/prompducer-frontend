import clsx from "clsx";
import {
	CalendarClock,
	Coins,
	CreditCard,
	Plus,
	Sparkles,
	TrendingUp,
} from "lucide-react";
import { DateTime } from "luxon";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { TOPUP_PACKS } from "~/lib/topups";
import { usePurchaseCredits } from "~/queries/credits";
import { useChangePlan, useDeactivatePlan, usePlans } from "~/queries/plans";
import { useAuthStore } from "~/stores/authStore";

const priceFormatter = (price: number | null | undefined) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return price ? formatter.format(price / 100) : "-";
};

const PlanInfo = () => {
	const { user } = useAuthStore();
	const planDeactivate = useDeactivatePlan();
	const changePlan = useChangePlan();
	const purchase = usePurchaseCredits();
	const plans = usePlans();

	const dateFormatter = (date: string | null | undefined) => {
		if (!date) return "-";
		return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);
	};

	const statusClasses = (status: string | undefined) =>
		clsx("border border-white/15 bg-white/10 text-white", {
			"bg-emerald-400 text-emerald-950": status === "ACTIVE",
			"bg-red-500 text-white": status === "CANCELED",
			"bg-white/20 text-white": status === "NONE",
		});

	const isActive = user?.subscription?.status === "ACTIVE";
	const currentPlanName = user?.subscription?.plan?.name ?? null;
	const currentPrice = user?.subscription?.plan?.price ?? 0;
	const sortedPlans = [...(plans.data ?? [])].sort((a, b) => a.price - b.price);
	const otherPlans = sortedPlans.filter((plan) => plan.name !== currentPlanName);

	// Show the four most useful top-up packs compactly on the account panel.
	const featuredTopups = TOPUP_PACKS.slice(0, 4);

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
							{currentPlanName ?? "Non active"}
						</Badge>
						{isActive && (
							<Badge className={statusClasses(user?.subscription?.status)}>
								{user?.subscription?.status}
							</Badge>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 px-5 pb-5">
				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-xl border border-white/12 bg-white/10 p-3">
						<div className="mb-1 flex items-center gap-1.5">
							<Coins className="h-3.5 w-3.5 text-emerald-300" />
							<span className="text-xs text-white/65">Remaining</span>
						</div>
						<p className="text-lg font-bold text-white">
							{user?.subscription?.credits ?? 0}
						</p>
						<p className="text-xs text-white/55">credits</p>
					</div>
					<div className="rounded-xl border border-white/12 bg-white/10 p-3">
						<div className="mb-1 flex items-center gap-1.5">
							<TrendingUp className="h-3.5 w-3.5 text-orange-200" />
							<span className="text-xs text-white/65">Total used</span>
						</div>
						<p className="text-lg font-bold text-white">
							{user?.totalUsedCredits ?? 0}
						</p>
						<p className="text-xs text-white/55">credits</p>
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
							Plan price
						</span>
						<span className="font-medium text-white">
							{currentPlanName ? `${priceFormatter(currentPrice)}/mo` : "-"}
						</span>
					</div>
				</div>

				<Separator className="bg-white/10" />

				{/* Not subscribed → send them to the full plans page (monthly/yearly, card + PayPal). */}
				{!isActive && (
					<Button
						size="lg"
						variant="ghost"
						className="vst-button-primary h-auto w-full cursor-pointer py-3"
						asChild={true}
					>
						<Link to="/plans">Choose a plan</Link>
					</Button>
				)}

				{/* Subscribed → change plan + top-ups + cancel. */}
				{isActive && (
					<>
						<div className="space-y-2">
							<p className="text-xs font-semibold uppercase tracking-wide text-white/55">
								Change plan
							</p>
							{otherPlans.map((plan) => {
								const isUpgrade = plan.price > currentPrice;
								return (
									<div
										key={plan.id}
										className="flex items-center justify-between rounded-xl border border-white/12 bg-white/5 px-3 py-2.5"
									>
										<div className="min-w-0">
											<p className="truncate text-sm font-medium text-white">
												{plan.name}
											</p>
											<p className="text-xs text-white/55">
												{priceFormatter(plan.price)}/mo · {plan.credits}{" "}
												credits
											</p>
										</div>
										<Button
											variant="ghost"
											disabled={changePlan.isPending}
											className={clsx(
												"h-auto cursor-pointer px-3 py-1.5 text-xs",
												isUpgrade ? "vst-button-primary" : "vst-button-ghost",
											)}
											onClick={() => changePlan.mutate(plan.id)}
										>
											{changePlan.isPending &&
											changePlan.variables === plan.id
												? "…"
												: isUpgrade
													? "Upgrade"
													: "Downgrade"}
										</Button>
									</div>
								);
							})}
							<p className="text-[11px] text-white/40">
								Switches take effect immediately, prorated. Upgrades top your
								credits up to the new plan.
							</p>
						</div>

						<Separator className="bg-white/10" />

						<div className="space-y-2">
							<p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/55">
								<Sparkles className="h-3.5 w-3.5 text-emerald-300" />
								Top up credits
							</p>
							<div className="grid grid-cols-2 gap-2">
								{featuredTopups.map((pack) => {
									const pending =
										purchase.isPending &&
										purchase.variables?.packId === pack.id;
									return (
										<button
											key={pack.id}
											type="button"
											disabled={purchase.isPending}
											onClick={() =>
												purchase.mutate({
													packId: pack.id,
													provider: "stripe",
												})
											}
											className="flex cursor-pointer flex-col items-start rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-left transition hover:border-cyan-300/50 hover:bg-white/10 disabled:opacity-50"
										>
											<span className="flex items-center gap-1 text-sm font-semibold text-white">
												<Plus className="h-3 w-3 text-emerald-300" />
												{pack.credits.toLocaleString()}
											</span>
											<span className="text-xs text-white/55">
												{pending ? "…" : priceFormatter(pack.priceCents)}
											</span>
										</button>
									);
								})}
							</div>
							<Link
								to="/plans"
								className="block text-center text-xs font-semibold text-cyan-200 hover:text-white"
							>
								See all credit packs & PayPal
							</Link>
						</div>

						<Separator className="bg-white/10" />

						<Button
							size="lg"
							variant="ghost"
							disabled={planDeactivate.isPending || user?.subscription?.cancelAtPeriodEnd}
							className="vst-button-ghost h-auto w-full cursor-pointer py-3"
							onClick={() => planDeactivate.mutate()}
						>
							{user?.subscription?.cancelAtPeriodEnd
								? "Cancellation scheduled"
								: "Cancel subscription"}
						</Button>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default PlanInfo;
