import { Check, Coins, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { useActivatePlan, usePlans } from "~/queries/plans";
import { useAuthStore } from "~/stores/authStore";
import { CreditsTab } from "./CreditsTab";

const FIRST_MONTH_DISCOUNT = 0.2; // 20% off the first billing cycle

const priceFormatter = (price: number | null | undefined) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	// Plan prices are stored in cents (see UpsertPlanDto example: 1999 = $19.99).
	return price ? formatter.format(price / 100) : "-";
};

type Tab = "plans" | "credits";

const PlansPage = () => {
	const user = useAuthStore((state) => state.user);
	const plans = usePlans();
	const activatePlan = useActivatePlan();
	const [tab, setTab] = useState<Tab>("plans");

	const hasActiveSub = user?.subscription?.status === "ACTIVE";
	const activePlanName = hasActiveSub ? user?.subscription?.plan?.name : null;

	// Preferred tier: the "Creator" plan, falling back to whatever the API marks featured.
	const creatorId = plans.data?.find((plan) => /creator/i.test(plan.name))?.id;
	const featuredId = plans.data?.find((plan) => plan.featured)?.id;
	const preferredId = creatorId ?? featuredId;

	return (
		<div className="space-y-10 pb-6">
			{/* Header */}
			<section className="mx-auto max-w-3xl text-center">
				<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
					<Coins className="size-4 text-cyan-200" />
					Credits &amp; plans
				</div>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-6xl">
					{tab === "plans" ? "Choose your plan" : "Buy more credits"}
				</h1>
				<p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/78 sm:text-base">
					{tab === "plans"
						? "Every generation gives you 3 unique instruments and costs 3 credits. Pick the plan that matches how much you create - cancel any time."
						: "Running low mid-session? Top up instantly. Top-ups are available on any paid plan."}
				</p>
			</section>

			{/* Tab switcher */}
			<div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-white/15 bg-black/25 p-1 backdrop-blur-sm">
				{(["plans", "credits"] as Tab[]).map((value) => (
					<button
						key={value}
						type="button"
						onClick={() => setTab(value)}
						className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
							tab === value
								? "bg-white text-[#150e1b]"
								: "text-white/70 hover:text-white"
						}`}
					>
						{value}
					</button>
				))}
			</div>

			{tab === "credits" ? (
				<CreditsTab onSeePlans={() => setTab("plans")} />
			) : (
				<>
					{/* Free trial banner */}
					<section className="mx-auto max-w-5xl">
						<div className="vst-panel-subtle flex flex-col items-center gap-2 p-5 text-center sm:flex-row sm:justify-center sm:gap-3">
							<Sparkles className="size-5 text-emerald-300" />
							<p className="text-sm text-white/85">
								<span className="font-semibold text-white">Free trial:</span>{" "}
								every new account starts with 30 credits - enough for 10
								generations - with no card required.
							</p>
						</div>
					</section>

					{/* Plans grid */}
					<section className="mx-auto max-w-6xl">
						{plans.isLoading && (
							<div className="vst-panel px-6 py-16 text-center text-sm text-white/65">
								Loading plans...
							</div>
						)}

						{plans.isError && (
							<div className="rounded-2xl border border-rose-300/25 bg-rose-500/10 px-6 py-16 text-center text-sm text-rose-100">
								Plans could not be loaded. Please refresh and try again.
							</div>
						)}

						{!plans.isLoading &&
							!plans.isError &&
							(plans.data?.length ?? 0) === 0 && (
								<div className="vst-panel px-6 py-16 text-center text-sm text-white/65">
									No plans are available right now. Check back soon.
								</div>
							)}

						{!plans.isLoading && (plans.data?.length ?? 0) > 0 && (
							<div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
								{plans.data?.map((plan) => {
									const isCurrent = activePlanName === plan.name;
									const isPreferred = plan.id === preferredId;
									const firstMonth = plan.price
										? Math.round(plan.price * (1 - FIRST_MONTH_DISCOUNT))
										: 0;

									return (
										<div
											key={plan.id}
											className={`vst-panel relative flex flex-col p-6 ${
												isPreferred
													? "ring-2 ring-cyan-300/60 xl:-translate-y-2 xl:shadow-2xl xl:shadow-pink-900/30"
													: ""
											}`}
										>
											{isPreferred && (
												<Badge className="absolute -top-3 left-6 flex items-center gap-1 border border-white/20 bg-white text-[#150e1b]">
													<Star className="size-3" /> Recommended
												</Badge>
											)}

											<h2 className="text-xl font-semibold text-white">
												{plan.name}
											</h2>
											<p className="mt-1 min-h-10 text-sm leading-5 text-white/68">
												{plan.description}
											</p>

											<div className="mt-5 flex items-end gap-1">
												<span className="vst-display text-4xl text-white">
													{priceFormatter(plan.price)}
												</span>
												<span className="mb-1 text-sm text-white/60">
													/month
												</span>
											</div>

											{plan.price > 0 && (
												<p className="mt-1.5 text-xs font-medium text-cyan-200">
													{priceFormatter(firstMonth)} first month · 20% off
												</p>
											)}

											<div className="mt-4 flex items-center gap-2 rounded-xl border border-white/12 bg-white/10 px-4 py-3">
												<Coins className="size-4 text-emerald-300" />
												<span className="text-sm text-white">
													<span className="font-bold">{plan.credits}</span>{" "}
													credits / month
												</span>
												<span className="ml-auto text-xs text-white/55">
													≈ {Math.floor(plan.credits / 3)} generations
												</span>
											</div>

											{plan.features?.length > 0 && (
												<ul className="mt-5 space-y-2.5">
													{plan.features.map((feature) => (
														<li
															key={feature}
															className="flex items-start gap-2 text-sm text-white/78"
														>
															<Check className="mt-0.5 size-4 shrink-0 text-emerald-300" />
															{feature}
														</li>
													))}
												</ul>
											)}

											<div className="mt-7 pt-1">
												{!user && (
													<Button
														size="lg"
														variant="ghost"
														className="vst-button-primary h-auto w-full cursor-pointer py-3"
														asChild={true}
													>
														<Link to="/register">Start free trial</Link>
													</Button>
												)}

												{user && isCurrent && (
													<Button
														size="lg"
														variant="ghost"
														className="vst-button-ghost h-auto w-full cursor-pointer py-3"
														asChild={true}
													>
														<Link to="/account">Manage in account</Link>
													</Button>
												)}

												{user && !isCurrent && (
													<Button
														size="lg"
														variant="ghost"
														className="vst-button-primary h-auto w-full cursor-pointer py-3"
														disabled={activatePlan.isPending}
														onClick={() => activatePlan.mutate(plan.id)}
													>
														{activatePlan.isPending
															? "Redirecting to checkout..."
															: hasActiveSub
																? `Switch to ${plan.name}`
																: `Get ${plan.name}`}
													</Button>
												)}
											</div>
										</div>
									);
								})}
							</div>
						)}
					</section>
				</>
			)}

			{/* Reassurance footer note */}
			<section className="mx-auto max-w-3xl px-2 text-center">
				<p className="text-xs leading-5 text-white/55">
					Payments are handled securely by Stripe. Prices are in USD. The 20%
					first-month discount applies to the first billing cycle of a new
					subscription. Credits refresh with each billing cycle; top-up credits
					can’t be exchanged for cash or a membership. Every sound you generate is
					yours to use in your releases.
				</p>
			</section>
		</div>
	);
};

export default PlansPage;
