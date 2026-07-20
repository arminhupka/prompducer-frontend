import { ChevronLeft, ChevronRight, Download, Ticket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { formatUsd, TOPUP_PACKS } from "~/lib/topups";
import {
	type AdminCoupon,
	type CouponStatus,
	fetchCouponCodes,
	useAdminCoupons,
	useGenerateCoupons,
} from "~/queries/adminCoupons";

const packLabel = (packId: string | null) => {
	const pack = TOPUP_PACKS.find((p) => p.id === packId);
	return pack ? `${pack.credits.toLocaleString()} credits` : "-";
};

const downloadTxt = (filename: string, lines: string[]) => {
	const blob = new Blob([`${lines.join("\n")}\n`], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
};

const selectClass =
	"rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/60";

export const CouponsTab = () => {
	const [genPack, setGenPack] = useState(TOPUP_PACKS[0].id);
	const [genCount, setGenCount] = useState(50);
	const [lastCodes, setLastCodes] = useState<AdminCoupon[] | null>(null);
	const generate = useGenerateCoupons();

	const [filterPack, setFilterPack] = useState("");
	const [filterStatus, setFilterStatus] = useState<CouponStatus>("all");
	const [page, setPage] = useState(1);
	const coupons = useAdminCoupons(filterPack, filterStatus, page);
	const totalPages = coupons.data
		? Math.max(1, Math.ceil(coupons.data.total / 20))
		: 1;

	const onGenerate = () => {
		generate.mutate(
			{ packId: genPack, count: genCount },
			{
				onSuccess: (data) => {
					setLastCodes(data);
					toast.success(`Generated ${data.length} codes`);
				},
				onError: () => toast.error("Could not generate coupons"),
			},
		);
	};

	const onExport = async () => {
		try {
			const codes = await fetchCouponCodes(filterPack, filterStatus);
			if (codes.length === 0) {
				toast.error("No codes match the current filter");
				return;
			}
			downloadTxt(
				`summonic-coupons-${filterPack || "all"}-${filterStatus}.txt`,
				codes,
			);
		} catch {
			toast.error("Export failed");
		}
	};

	return (
		<div className="space-y-6">
			{/* Generate */}
			<div className="vst-panel p-6">
				<div className="mb-4 flex items-center gap-2">
					<Ticket className="size-5 text-cyan-200" />
					<h3 className="vst-display text-xl text-white">Generate coupon codes</h3>
				</div>
				<div className="flex flex-wrap items-end gap-4">
					<label className="flex flex-col gap-1 text-xs text-white/60">
						Credit pack
						<select
							className={selectClass}
							value={genPack}
							onChange={(e) => setGenPack(e.target.value)}
						>
							{TOPUP_PACKS.map((p) => (
								<option key={p.id} value={p.id} className="text-black">
									{p.credits.toLocaleString()} credits · {formatUsd(p.priceCents)}
								</option>
							))}
						</select>
					</label>
					<label className="flex flex-col gap-1 text-xs text-white/60">
						How many codes
						<input
							type="number"
							min={1}
							max={1000}
							value={genCount}
							onChange={(e) => setGenCount(Number(e.target.value))}
							className={`${selectClass} w-28`}
						/>
					</label>
					<Button
						variant="ghost"
						disabled={generate.isPending}
						className="vst-button-primary h-auto cursor-pointer px-6 py-2"
						onClick={onGenerate}
					>
						{generate.isPending ? "Generating…" : "Generate"}
					</Button>
				</div>

				{lastCodes && (
					<div className="mt-5 rounded-xl border border-white/12 bg-black/25 p-4">
						<div className="mb-2 flex items-center justify-between">
							<p className="text-sm text-white/80">
								{lastCodes.length} new codes ·{" "}
								{packLabel(lastCodes[0]?.packId ?? null)}
							</p>
							<Button
								variant="ghost"
								className="vst-button-ghost h-auto cursor-pointer px-4 py-1.5 text-xs"
								onClick={() =>
									downloadTxt(
										`summonic-coupons-${lastCodes[0]?.packId}.txt`,
										lastCodes.map((c) => c.code),
									)
								}
							>
								<Download className="mr-1 size-3.5" /> Download .txt
							</Button>
						</div>
						<div className="max-h-40 overflow-y-auto font-mono text-xs leading-5 text-white/70">
							{lastCodes.map((c) => (
								<div key={c.id}>{c.code}</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Filters + list */}
			<div className="flex flex-wrap items-end gap-3">
				<label className="flex flex-col gap-1 text-xs text-white/60">
					Package
					<select
						className={selectClass}
						value={filterPack}
						onChange={(e) => {
							setFilterPack(e.target.value);
							setPage(1);
						}}
					>
						<option value="" className="text-black">
							All packages
						</option>
						{TOPUP_PACKS.map((p) => (
							<option key={p.id} value={p.id} className="text-black">
								{p.credits.toLocaleString()} credits
							</option>
						))}
					</select>
				</label>
				<label className="flex flex-col gap-1 text-xs text-white/60">
					Status
					<select
						className={selectClass}
						value={filterStatus}
						onChange={(e) => {
							setFilterStatus(e.target.value as CouponStatus);
							setPage(1);
						}}
					>
						<option value="all" className="text-black">
							All
						</option>
						<option value="unused" className="text-black">
							Unused
						</option>
						<option value="used" className="text-black">
							Used
						</option>
					</select>
				</label>
				<Button
					variant="ghost"
					className="vst-button-ghost h-auto cursor-pointer px-5 py-2 text-sm"
					onClick={onExport}
				>
					<Download className="mr-1 size-4" /> Export .txt
				</Button>
			</div>

			<div className="vst-panel overflow-hidden p-0">
				{coupons.isLoading ? (
					<div className="p-12 text-center text-sm text-white/60">
						Loading coupons…
					</div>
				) : coupons.isError ? (
					<div className="p-12 text-center text-sm text-rose-100">
						Could not load coupons.
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm">
							<thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/50">
								<tr>
									<th className="px-4 py-3">Code</th>
									<th className="px-4 py-3">Package</th>
									<th className="px-4 py-3">Credits</th>
									<th className="px-4 py-3">Status</th>
									<th className="px-4 py-3">Created</th>
								</tr>
							</thead>
							<tbody>
								{coupons.data?.items.map((c) => (
									<tr
										key={c.id}
										className="border-b border-white/5 hover:bg-white/5"
									>
										<td className="px-4 py-3 font-mono text-white">{c.code}</td>
										<td className="px-4 py-3 text-white/70">
											{packLabel(c.packId)}
										</td>
										<td className="px-4 py-3 text-white/80">{c.tokens}</td>
										<td className="px-4 py-3">
											<span
												className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
													c.used
														? "bg-white/10 text-white/60"
														: "bg-emerald-300/20 text-emerald-200"
												}`}
											>
												{c.used ? "USED" : "UNUSED"}
											</span>
										</td>
										<td className="px-4 py-3 text-white/50">
											{new Date(c.createdAt).toLocaleDateString()}
										</td>
									</tr>
								))}
								{coupons.data?.items.length === 0 && (
									<tr>
										<td
											colSpan={5}
											className="px-4 py-12 text-center text-sm text-white/50"
										>
											No coupons match this filter.
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
					{coupons.data ? `${coupons.data.total.toLocaleString()} coupons` : ""}
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
