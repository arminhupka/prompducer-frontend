import { Sparkles } from "lucide-react";
import Coupon from "~/components/molecules/Coupon/Coupon";
import PlanInfo from "~/components/molecules/PlanInfo/PlanInfo";
import PromptItem from "~/components/molecules/PromptItem/PromptItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useGetPrompts } from "~/queries/prompts";
import { useAuthStore } from "~/stores/authStore";

const AccountPage = () => {
	const prompts = useGetPrompts();
	const user = useAuthStore((state) => state.user);
	const promptCount = prompts.data?.length ?? 0;

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
								Review generated audio prompts, manage credits, and keep your
								production history close at hand.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-[25rem]">
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
						<div className="vst-panel-subtle col-span-2 px-4 py-3 sm:col-span-1">
							<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
								Prompts
							</p>
							<p className="mt-1 text-2xl font-bold text-white">
								{promptCount}
							</p>
						</div>
					</div>
				</div>

				<div className="grid min-h-0 gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
					<div className="vst-panel flex min-h-0 flex-col p-4 sm:p-5">
						<div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
							<div>
								<h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
									Prompt history
								</h2>
								<p className="mt-1 text-xs text-white/58">
									{promptCount} saved generations
								</p>
							</div>
							<div className="flex h-10 items-end gap-1">
								{[18, 30, 22, 36, 26, 32, 20].map((height) => (
									<span
										key={height}
										className="w-1.5 rounded-full bg-white/70"
										style={{ height }}
									/>
								))}
							</div>
						</div>
						<ScrollArea className="pr-2 lg:max-h-[34rem]">
							<div className="space-y-3 pr-2">
								{prompts.data?.map((prompt) => (
									<PromptItem key={prompt.id} prompt={prompt} />
								))}
								{!prompts.isLoading && promptCount === 0 && (
									<div className="rounded-xl border border-dashed border-white/20 px-4 py-10 text-center text-sm text-white/65">
										No prompt history yet.
									</div>
								)}
							</div>
						</ScrollArea>
					</div>

					<aside className="space-y-4">
						<div>
							<h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-white">
								Account
							</h2>
							<div className="space-y-4">
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
