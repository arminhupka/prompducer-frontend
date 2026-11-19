import { Sparkles } from "lucide-react";
import Coupon from "~/components/molecules/Coupon/Coupon";
import PlanInfo from "~/components/molecules/PlanInfo/PlanInfo";
import { useAuthStore } from "~/stores/authStore";

const AccountPage = () => {
	const user = useAuthStore((state) => state.user);

	return (
		<section className="vst-shell mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
			<div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/12 to-transparent" />
			<div className="pointer-events-none absolute -left-24 top-24 size-64 rounded-full bg-pink-500/25 blur-3xl" />
			<div className="pointer-events-none absolute -right-16 bottom-28 size-72 rounded-full bg-orange-400/25 blur-3xl" />
			<div className="relative z-10 space-y-6">
				<div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
					<div className="space-y-4">
						<div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
							<Sparkles className="size-4 text-cyan-200" />
							<span>Creator console</span>
						</div>
						<div>
							<h1 className="vst-display vst-glow-text text-5xl leading-none text-white sm:text-7xl lg:text-8xl">
								SUMMONIC
							</h1>
							<p className="mt-3 max-w-2xl text-sm leading-6 text-white/78 sm:text-base">
								Manage your plan and credits. Sounds are generated in the
								SUMMONIC plugin and stay on your computer.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 lg:w-[17rem]">
						<div className="vst-panel-subtle px-4 py-3">
							<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
								Credits
							</p>
							<p className="mt-1 text-2xl font-bold text-white">
								{user?.subscription?.credits ?? 0}
							</p>
						</div>
						<div className="vst-panel-subtle px-4 py-3">
							<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
								Used
							</p>
							<p className="mt-1 text-2xl font-bold text-white">
								{user?.totalUsedCredits ?? 0}
							</p>
						</div>
					</div>
				</div>

				<div>
					<aside className="space-y-4">
						<div>
							<h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-white">
								Account
							</h2>
							<div className="grid gap-4 lg:grid-cols-2">
								<PlanInfo />
								<Coupon />
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
};

export default AccountPage;
