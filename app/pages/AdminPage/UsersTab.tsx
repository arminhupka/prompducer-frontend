import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
	type AdminUserRow,
	useAdjustCredits,
	useAdminUsers,
	useAssignPlan,
	useSetRole,
} from "~/queries/admin";
import { usePlans } from "~/queries/plans";

const ManageRow = ({ user }: { user: AdminUserRow }) => {
	const [amount, setAmount] = useState(300);
	const adjust = useAdjustCredits();
	const setRole = useSetRole();

	const plans = usePlans();
	const assignPlan = useAssignPlan();
	const [planId, setPlanId] = useState("");
	const [interval, setInterval] = useState<"month" | "year">("month");

	const applyPlan = () => {
		if (!planId) {
			toast.error("Pick a plan first");
			return;
		}
		assignPlan.mutate(
			{ userId: user.id, planId, interval },
			{
				onSuccess: (data) =>
					toast.success(
						`Assigned ${data.planName} → ${data.credits} credits`,
					),
				onError: () => toast.error("Could not assign plan"),
			},
		);
	};

	const applyCredits = (signedAmount: number) => {
		if (!signedAmount) return;
		adjust.mutate(
			{ userId: user.id, amount: signedAmount },
			{
				onSuccess: (data) =>
					toast.success(`Balance updated → ${data.credits} credits`),
				onError: () => toast.error("Could not adjust credits"),
			},
		);
	};

	const toggleRole = () => {
		const role = user.role === "ADMIN" ? "USER" : "ADMIN";
		setRole.mutate(
			{ userId: user.id, role },
			{
				onSuccess: () => toast.success(`Role set to ${role}`),
				onError: () => toast.error("Could not change role"),
			},
		);
	};

	return (
		<tr className="bg-black/20">
			<td colSpan={6} className="px-4 py-4">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-2">
						<span className="text-xs text-white/60">Adjust credits:</span>
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							className="w-24 rounded-lg border border-white/15 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-cyan-300/60"
						/>
						<Button
							variant="ghost"
							disabled={adjust.isPending}
							className="vst-button-primary h-auto cursor-pointer px-4 py-1.5 text-xs"
							onClick={() => applyCredits(Math.abs(amount))}
						>
							Add
						</Button>
						<Button
							variant="ghost"
							disabled={adjust.isPending}
							className="vst-button-ghost h-auto cursor-pointer px-4 py-1.5 text-xs"
							onClick={() => applyCredits(-Math.abs(amount))}
						>
							Remove
						</Button>
					</div>
					<Button
						variant="ghost"
						disabled={setRole.isPending}
						className="vst-button-ghost h-auto cursor-pointer px-4 py-1.5 text-xs"
						onClick={toggleRole}
					>
						{user.role === "ADMIN" ? "Demote to USER" : "Promote to ADMIN"}
					</Button>
				</div>

				<div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
					<span className="text-xs text-white/60">Assign plan:</span>
					<select
						value={planId}
						onChange={(e) => setPlanId(e.target.value)}
						className="rounded-lg border border-white/15 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-cyan-300/60"
					>
						<option value="">Select a plan…</option>
						{plans.data?.map((plan) => (
							<option key={plan.id} value={plan.id}>
								{plan.name} ({plan.credits} credits)
							</option>
						))}
					</select>
					<select
						value={interval}
						onChange={(e) =>
							setInterval(e.target.value === "year" ? "year" : "month")
						}
						className="rounded-lg border border-white/15 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-cyan-300/60"
					>
						<option value="month">Monthly</option>
						<option value="year">Yearly</option>
					</select>
					<Button
						variant="ghost"
						disabled={assignPlan.isPending || !planId}
						className="vst-button-primary h-auto cursor-pointer px-4 py-1.5 text-xs"
						onClick={applyPlan}
					>
						{assignPlan.isPending ? "Assigning…" : "Assign"}
					</Button>
					<span className="text-[11px] text-white/40">
						No charge · tops credits up to the plan allotment
					</span>
				</div>
			</td>
		</tr>
	);
};

export const UsersTab = () => {
	const [term, setTerm] = useState("");
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [openId, setOpenId] = useState<string | null>(null);
	const users = useAdminUsers(query, page);

	const submitSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setPage(1);
		setQuery(term.trim());
	};

	const totalPages = users.data
		? Math.max(1, Math.ceil(users.data.total / users.data.pageSize))
		: 1;

	return (
		<div className="space-y-4">
			<form onSubmit={submitSearch} className="flex gap-2">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
					<input
						value={term}
						onChange={(e) => setTerm(e.target.value)}
						placeholder="Search by email…"
						className="w-full rounded-xl border border-white/15 bg-black/25 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-cyan-300/60"
					/>
				</div>
				<Button
					type="submit"
					variant="ghost"
					className="vst-button-primary h-auto cursor-pointer px-6 py-2.5 text-sm"
				>
					Search
				</Button>
			</form>

			<div className="vst-panel overflow-hidden p-0">
				{users.isLoading ? (
					<div className="p-12 text-center text-sm text-white/60">
						Loading users…
					</div>
				) : users.isError ? (
					<div className="p-12 text-center text-sm text-rose-100">
						Could not load users.
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/50">
								<tr>
									<th className="px-4 py-3">Email</th>
									<th className="px-4 py-3">Role</th>
									<th className="px-4 py-3">Plan</th>
									<th className="px-4 py-3">Credits</th>
									<th className="px-4 py-3">Used</th>
									<th className="px-4 py-3" />
								</tr>
							</thead>
							<tbody>
								{users.data?.items.map((u) => (
									<Fragment key={u.id}>
										<tr className="border-b border-white/5 hover:bg-white/5">
											<td className="px-4 py-3 text-white">{u.email}</td>
											<td className="px-4 py-3">
												<span
													className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
														u.role === "ADMIN"
															? "bg-cyan-300/20 text-cyan-200"
															: "bg-white/10 text-white/60"
													}`}
												>
													{u.role}
												</span>
											</td>
											<td className="px-4 py-3 text-white/70">
												{u.subscription?.planName ?? "-"}
												<span className="ml-1 text-xs text-white/40">
													{u.subscription?.status ?? ""}
												</span>
											</td>
											<td className="px-4 py-3 text-white/80">
												{u.subscription?.credits ?? 0}
											</td>
											<td className="px-4 py-3 text-white/50">
												{u.totalUsedCredits}
											</td>
											<td className="px-4 py-3 text-right">
												<button
													type="button"
													onClick={() =>
														setOpenId(openId === u.id ? null : u.id)
													}
													className="cursor-pointer text-xs font-semibold text-cyan-200 hover:text-white"
												>
													{openId === u.id ? "Close" : "Manage"}
												</button>
											</td>
										</tr>
										{openId === u.id && <ManageRow user={u} />}
									</Fragment>
								))}
								{users.data?.items.length === 0 && (
									<tr>
										<td
											colSpan={6}
											className="px-4 py-12 text-center text-sm text-white/50"
										>
											No users found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>

			<div className="flex items-center justify-between text-sm text-white/60">
				<span>
					{users.data
						? `${users.data.total.toLocaleString()} users`
						: ""}
				</span>
				<div className="flex items-center gap-2">
					<button
						type="button"
						disabled={page <= 1}
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						className="grid size-8 cursor-pointer place-items-center rounded-lg border border-white/15 disabled:opacity-30"
					>
						<ChevronLeft className="size-4" />
					</button>
					<span>
						{page} / {totalPages}
					</span>
					<button
						type="button"
						disabled={page >= totalPages}
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						className="grid size-8 cursor-pointer place-items-center rounded-lg border border-white/15 disabled:opacity-30"
					>
						<ChevronRight className="size-4" />
					</button>
				</div>
			</div>
		</div>
	);
};
