import { formatUsd } from "~/lib/topups";
import { useAdminSubscriptions } from "~/queries/admin";

const statusStyle = (status: string) => {
	if (status === "ACTIVE") return "bg-emerald-300/20 text-emerald-200";
	if (status === "CANCELED" || status === "UNPAID" || status === "PAST_DUE")
		return "bg-rose-400/20 text-rose-200";
	return "bg-white/10 text-white/60";
};

export const PaymentsTab = () => {
	const subs = useAdminSubscriptions();

	return (
		<div className="vst-panel overflow-hidden p-0">
			{subs.isLoading ? (
				<div className="p-12 text-center text-sm text-white/60">
					Loading subscriptions…
				</div>
			) : subs.isError ? (
				<div className="p-12 text-center text-sm text-rose-100">
					Could not load subscriptions.
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm">
						<thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/50">
							<tr>
								<th className="px-4 py-3">User</th>
								<th className="px-4 py-3">Plan</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Price</th>
								<th className="px-4 py-3">Credits</th>
								<th className="px-4 py-3">Renews</th>
							</tr>
						</thead>
						<tbody>
							{subs.data?.map((s) => (
								<tr
									key={s.id}
									className="border-b border-white/5 hover:bg-white/5"
								>
									<td className="px-4 py-3 text-white">
										{s.userEmail ?? "-"}
									</td>
									<td className="px-4 py-3 text-white/70">
										{s.planName ?? "-"}
									</td>
									<td className="px-4 py-3">
										<span
											className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyle(
												s.status,
											)}`}
										>
											{s.status}
										</span>
										{s.cancelAtPeriodEnd && (
											<span className="ml-1 text-[10px] text-amber-200">
												(cancels)
											</span>
										)}
									</td>
									<td className="px-4 py-3 text-white/80">
										{s.priceCents ? formatUsd(s.priceCents) : "-"}
									</td>
									<td className="px-4 py-3 text-white/70">{s.credits}</td>
									<td className="px-4 py-3 text-white/50">
										{s.nextPaymentDate
											? new Date(s.nextPaymentDate).toLocaleDateString()
											: "-"}
									</td>
								</tr>
							))}
							{subs.data?.length === 0 && (
								<tr>
									<td
										colSpan={6}
										className="px-4 py-12 text-center text-sm text-white/50"
									>
										No subscriptions yet.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
