import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { type AdminGeneration, useAdminGenerations } from "~/queries/admin";

const statusStyle = (status: AdminGeneration["status"]) => {
	if (status === "settled") return "bg-emerald-300/20 text-emerald-200";
	if (status === "expired") return "bg-white/10 text-white/60";
	return "bg-amber-300/20 text-amber-200";
};

const dash = (value: number | null) => (value === null ? "—" : value.toLocaleString());

export const GenerationsTab = () => {
	const [page, setPage] = useState(1);
	const [cappedOnly, setCappedOnly] = useState(false);
	const generations = useAdminGenerations(page, cappedOnly);

	const totalPages = generations.data
		? Math.max(1, Math.ceil(generations.data.total / 25))
		: 1;

	return (
		<div className="space-y-4">
			<label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-white/70">
				<input
					type="checkbox"
					checked={cappedOnly}
					onChange={(e) => {
						setCappedOnly(e.target.checked);
						setPage(1);
					}}
				/>
				Refund limit hit only
			</label>
			<div className="vst-panel overflow-hidden p-0">
				{generations.isLoading ? (
					<div className="p-12 text-center text-sm text-white/60">
						Loading generations…
					</div>
				) : generations.isError ? (
					<div className="p-12 text-center text-sm text-rose-100">
						Could not load generations.
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/50">
								<tr>
									<th className="px-4 py-3">When</th>
									<th className="px-4 py-3">User</th>
									<th className="px-4 py-3">Prompt</th>
									<th className="px-4 py-3">Sounds</th>
									<th className="px-4 py-3">Charged</th>
									<th className="px-4 py-3">Refunded</th>
									<th className="px-4 py-3">Status</th>
								</tr>
							</thead>
							<tbody>
								{generations.data?.items.map((g) => {
									const prompts = g.prompts.join(" · ");
									return (
										<tr
											key={g.id}
											className="border-b border-white/5 hover:bg-white/5"
										>
											<td className="whitespace-nowrap px-4 py-3 text-white/50">
												{new Date(g.createdAt).toLocaleString()}
											</td>
											<td className="px-4 py-3 text-white/70">
												{g.email ?? "-"}
											</td>
											<td
												className="max-w-xs truncate px-4 py-3 text-white"
												title={prompts}
											>
												{prompts}
											</td>
											<td className="px-4 py-3 text-white/70">
												{dash(g.produced)}/{g.layers}
											</td>
											<td className="px-4 py-3 text-white/70">{dash(g.charged)}</td>
											<td className="px-4 py-3 text-white/70">
												{g.refunded.toLocaleString()}
												{g.refundCapped && (
													<span className="ml-2 rounded-full bg-rose-400/20 px-2 py-0.5 text-[10px] font-semibold text-rose-200">
														LIMIT
													</span>
												)}
											</td>
											<td className="px-4 py-3">
												<span
													className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyle(
														g.status,
													)}`}
												>
													{g.status}
												</span>
											</td>
										</tr>
									);
								})}
								{generations.data?.items.length === 0 && (
									<tr>
										<td
											colSpan={7}
											className="px-4 py-12 text-center text-sm text-white/50"
										>
											No generations yet.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>

			<div className="flex items-center justify-end gap-2 text-sm text-white/60">
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
	);
};
