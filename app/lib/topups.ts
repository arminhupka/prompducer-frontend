/**
 * Credit top-up packs (pay-as-you-go). Available to active paid subscribers only.
 * Prices are in USD cents to match the plan pricing convention. `credits` is the
 * TOTAL granted (base + bonus). Keep this in sync with the API's pack table.
 */
export type TopupPack = {
	id: string;
	priceCents: number;
	base: number;
	bonus: number;
	credits: number; // base + bonus
	flash?: boolean;
	popular?: boolean;
};

export const TOPUP_PACKS: TopupPack[] = [
	{ id: "topup_330", priceCents: 500, base: 330, bonus: 0, credits: 330 },
	{ id: "topup_660", priceCents: 1000, base: 660, bonus: 0, credits: 660 },
	{
		id: "topup_1320",
		priceCents: 2000,
		base: 1320,
		bonus: 0,
		credits: 1320,
		popular: true,
	},
	{
		id: "topup_3500",
		priceCents: 5000,
		base: 3300,
		bonus: 200,
		credits: 3500,
		flash: true,
	},
	{
		id: "topup_7500",
		priceCents: 10000,
		base: 6600,
		bonus: 900,
		credits: 7500,
		flash: true,
	},
];

export const CREDITS_PER_GENERATION = 3;

export const formatUsd = (cents: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
	}).format(cents / 100);
