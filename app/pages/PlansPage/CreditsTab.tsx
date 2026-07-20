import { Flame, Lock } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	CREDITS_PER_GENERATION,
	formatUsd,
	TOPUP_PACKS,
} from "~/lib/topups";
import { usePurchaseCredits } from "~/queries/credits";
import { useAuthStore } from "~/stores/authStore";

export const CreditsTab = ({ onSeePlans }: { onSeePlans: () => void }) => {
	const user = useAuthStore((state) => state.user);
	const purchase = usePurchaseCredits();

	const isPaidSubscriber =
		user?.subscription?.status === "ACTIVE" && !!user?.subscription?.plan;

	if (!isPaidSubscriber) {
		return (
			<section className="mx-auto max-w-2xl">
				<div className="vst-panel flex flex-col items-center gap-4 p-9 text-center">
					<div className="grid size-14 place-items-center rounded-2xl border border-white/20 bg-white/10">
						<Lock className="size-7 text-cyan-200" />
					</div>
					<h2 className="vst-display text-2xl text-white sm:text-3xl">
						Top-ups are for subscribers
					</h2>
					<p className="max-w-md text-sm leading-6 text-white/75">
						Credit top-ups are a subscriber perk - grab extra credits any time
						without changing your plan. Subscribe to a paid plan to unlock
						pay-as-you-go credits.
					</p>
					<Button
						size="lg"
						variant="ghost"
						className="vst-button-primary mt-1 h-auto cursor-pointer px-8 py-3"
						onClick={onSeePlans}
					>
						See plans
					</Button>
				</div>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-6xl space-y-6">
			<p className="mx-auto max-w-2xl text-center text-xs leading-5 text-white/55">
				Top-up credits are added instantly to your balance. Bigger packs include
				bonus credits. Credits don’t expire while your subscription is active and
				can’t be exchanged for cash or a membership.
			</p>

			<div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{TOPUP_PACKS.map((pack) => {
					const generations = Math.floor(pack.credits / CREDITS_PER_GENERATION);
					const pending =
						purchase.isPending && purchase.variables === pack.id;

					return (
						<div
							key={pack.id}
							className={`vst-panel relative flex flex-col p-6 ${
								pack.popular
									? "ring-2 ring-cyan-300/60"
									: pack.flash
										? "ring-1 ring-amber-300/40"
										: ""
							}`}
						>
							{pack.popular && (
								<Badge className="absolute -top-3 left-6 border border-white/20 bg-white text-[#150e1b]">
									Popular
								</Badge>
							)}
							{pack.flash && (
								<Badge className="absolute -top-3 left-6 border border-amber-300/40 bg-amber-300 text-[#150e1b]">
									Flash sale
								</Badge>
							)}

							<div className="flex items-center gap-2">
								<Flame className="size-6 text-emerald-300" />
								<span className="vst-display text-3xl text-white">
									{pack.credits.toLocaleString()}
								</span>
							</div>
							<p className="mt-1 text-xs text-white/55">credits</p>

							<p className="mt-2 min-h-4 text-xs text-white/60">
								{pack.bonus > 0 ? (
									<>
										{pack.base.toLocaleString()} +{" "}
										<span className="font-semibold text-amber-300">
											{pack.bonus.toLocaleString()} bonus
										</span>
									</>
								) : (
									<>&nbsp;</>
								)}
							</p>

							<div className="mt-4 flex items-end justify-between">
								<span className="vst-display text-2xl text-white">
									{formatUsd(pack.priceCents)}
								</span>
								<span className="text-xs text-white/50">
									≈ {generations.toLocaleString()} gens
								</span>
							</div>

							<Button
								size="lg"
								variant="ghost"
								className="vst-button-primary mt-5 h-auto w-full cursor-pointer py-2.5 text-sm"
								disabled={purchase.isPending}
								onClick={() => purchase.mutate(pack.id)}
							>
								{pending ? "Redirecting…" : "Purchase"}
							</Button>
						</div>
					);
				})}
			</div>
		</section>
	);
};
