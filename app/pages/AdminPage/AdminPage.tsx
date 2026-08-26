import {
	Activity,
	Coins,
	CreditCard,
	Sparkles,
	TrendingUp,
	Users,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { formatUsd } from "~/lib/topups";
import { type AdminOverview, useAdminOverview } from "~/queries/admin";
import { CouponsTab } from "./CouponsTab";
import { GenerationsTab } from "./GenerationsTab";
import { PaymentsTab } from "./PaymentsTab";
import { UsersTab } from "./UsersTab";

type Tab = "overview" | "users" | "generations" | "payments" | "coupons";

const TABS: { id: Tab; label: string }[] = [
	{ id: "overview", label: "Overview" },
	{ id: "users", label: "Users" },
	{ id: "generations", label: "Generations" },
	{ id: "payments", label: "Payments" },
	{ id: "coupons", label: "Coupons" },
];

const StatCard = ({
	icon,
	label,
	value,
	hint,
}: {
	icon: ReactNode;
	label: string;
	value: string;
	hint?: string;
}) => (
	<div className="vst-panel flex flex-col gap-2 p-5">
		<div className="flex items-center gap-2 text-white/60">
			{icon}
			<span className="text-xs font-semibold uppercase tracking-wide">
				{label}
			</span>
		</div>
		<span className="vst-display text-3xl text-white">{value}</span>
		{hint && <span className="text-xs text-white/50">{hint}</span>}
	</div>
);

const BarChart = ({
	title,
	data,
}: {
	title: string;
	data: { date: string; count: number }[];
}) => {
	const max = Math.max(1, ...data.map((d) => d.count));
	return (
		<div className="vst-panel p-5">
			<p className="mb-4 text-sm font-semibold text-white">{title}</p>
			<div className="flex h-40 items-end gap-1.5">
				{data.map((d) => (
					<div
						key={d.date}
						className="group flex flex-1 flex-col items-center justify-end gap-1"
						title={`${d.date}: ${d.count}`}
					>
						<span className="text-[10px] text-white/60 opacity-0 transition group-hover:opacity-100">
							{d.count}
						</span>
						<div
							className="w-full rounded-t bg-gradient-to-t from-pink-500 to-orange-400"
							style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
						/>
						<span className="text-[9px] text-white/40">
							{d.date.slice(8, 10)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const PlanDistribution = ({
	data,
}: {
	data: AdminOverview["planDistribution"];
}) => {
	const total = Math.max(
		1,
		data.reduce((sum, p) => sum + p.count, 0),
	);
	return (
		<div className="vst-panel p-5">
			<p className="mb-4 text-sm font-semibold text-white">
				Active plan mix
			</p>
			{data.length === 0 ? (
				<p className="text-sm text-white/50">No active subscriptions yet.</p>
			) : (
				<div className="space-y-3">
					{data.map((p) => (
						<div key={p.name}>
							<div className="mb-1 flex justify-between text-xs text-white/70">
								<span>{p.name}</span>
								<span>{p.count}</span>
							</div>
							<div className="h-2 overflow-hidden rounded-full bg-white/10">
								<div
									className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
									style={{ width: `${(p.count / total) * 100}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const FunnelCard = ({ funnel }: { funnel: AdminOverview["funnel"] }) => {
	const rows = [
		{ label: "Signed up", value: funnel.signedUp, color: "from-pink-500 to-orange-400" },
		{ label: "Generated a sound", value: funnel.generated, color: "from-cyan-400 to-emerald-400" },
		{ label: "Active subscriber", value: funnel.subscribed, color: "from-violet-500 to-fuchsia-400" },
	];
	const base = Math.max(1, funnel.signedUp);
	return (
		<div className="vst-panel p-5">
			<p className="mb-4 text-sm font-semibold text-white">Conversion funnel</p>
			<div className="space-y-3.5">
				{rows.map((r, i) => (
					<div key={r.label}>
						<div className="mb-1 flex items-baseline justify-between text-xs">
							<span className="text-white/70">{r.label}</span>
							<span className="font-semibold text-white/90">
								{r.value.toLocaleString()}
								{i > 0 && funnel.signedUp > 0
									? ` · ${Math.round((r.value / funnel.signedUp) * 100)}%`
									: ""}
							</span>
						</div>
						<div className="h-2.5 w-full rounded-full bg-white/10">
							<div
								className={`h-full rounded-full bg-gradient-to-r ${r.color}`}
								style={{ width: `${Math.max(3, (r.value / base) * 100)}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const OverviewTab = () => {
	const overview = useAdminOverview();

	if (overview.isLoading) {
		return (
			<div className="vst-panel p-16 text-center text-sm text-white/60">
				Loading analytics…
			</div>
		);
	}

	if (overview.isError || !overview.data) {
		return (
			<div className="rounded-2xl border border-rose-300/25 bg-rose-500/10 p-16 text-center text-sm text-rose-100">
				Could not load analytics. Ensure you’re signed in as an admin.
			</div>
		);
	}

	const d = overview.data;

	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				<StatCard
					icon={<Users className="size-4" />}
					label="Total users"
					value={d.users.total.toLocaleString()}
					hint={`+${d.users.newLast30d.toLocaleString()} in last 30 days`}
				/>
				<StatCard
					icon={<Sparkles className="size-4" />}
					label="Active subscribers"
					value={d.subscribers.active.toLocaleString()}
				/>
				<StatCard
					icon={<TrendingUp className="size-4" />}
					label="Estimated MRR"
					value={formatUsd(d.revenue.mrrCents)}
					hint="Sum of active plan prices"
				/>
				<StatCard
					icon={<Coins className="size-4" />}
					label="Credits consumed"
					value={d.credits.consumed.toLocaleString()}
					hint="All-time"
				/>
				<StatCard
					icon={<Activity className="size-4" />}
					label="Generations"
					value={d.generations.total.toLocaleString()}
					hint={`${d.generations.finished} done · ${d.generations.failed} failed · ${d.generations.pending} pending`}
				/>
				<StatCard
					icon={<CreditCard className="size-4" />}
					label="Failed generations"
					value={d.generations.failed.toLocaleString()}
					hint={
						d.generations.total > 0
							? `${Math.round(
									(d.generations.failed / d.generations.total) * 100,
								)}% of all runs`
							: "-"
					}
				/>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<BarChart title="Signups · last 14 days" data={d.signups} />
				<BarChart title="Generations · last 14 days" data={d.generationsDaily} />
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<PlanDistribution data={d.planDistribution} />
				<FunnelCard funnel={d.funnel} />
			</div>
		</div>
	);
};

const AdminPage = () => {
	const [tab, setTab] = useState<Tab>("overview");

	return (
		<div className="space-y-8 pb-6">
			<header>
				<p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
					Admin
				</p>
				<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-5xl">
					Control room
				</h1>
			</header>

			<div className="flex flex-wrap gap-1 rounded-full border border-white/15 bg-black/25 p-1 backdrop-blur-sm sm:w-fit">
				{TABS.map((t) => (
					<button
						key={t.id}
						type="button"
						onClick={() => setTab(t.id)}
						className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition ${
							tab === t.id
								? "bg-white text-[#150e1b]"
								: "text-white/70 hover:text-white"
						}`}
					>
						{t.label}
					</button>
				))}
			</div>

			{tab === "overview" && <OverviewTab />}
			{tab === "users" && <UsersTab />}
			{tab === "generations" && <GenerationsTab />}
			{tab === "payments" && <PaymentsTab />}
			{tab === "coupons" && <CouponsTab />}
		</div>
	);
};

export default AdminPage;
