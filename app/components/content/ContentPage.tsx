import type { ReactNode } from "react";

type ContentPageProps = {
	eyebrow?: string;
	title: string;
	updated?: string;
	intro?: ReactNode;
	children: ReactNode;
};

/**
 * ContentPage — shared shell for legal / support / marketing content pages.
 * Authors write plain <h2>/<h3>/<p>/<ul>/<a>/<strong> inside; the prose
 * styling is applied here via arbitrary variants so every page matches.
 */
export const ContentPage = ({
	eyebrow,
	title,
	updated,
	intro,
	children,
}: ContentPageProps) => (
	<div className="mx-auto max-w-3xl space-y-8 pb-6">
		<header className="text-center">
			{eyebrow && (
				<p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
					{eyebrow}
				</p>
			)}
			<h1 className="vst-display vst-glow-text text-4xl text-white sm:text-5xl">
				{title}
			</h1>
			{updated && (
				<p className="mt-3 text-xs text-white/50">Last updated: {updated}</p>
			)}
			{intro && (
				<p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
					{intro}
				</p>
			)}
		</header>

		<div className="vst-panel space-y-4 p-6 text-sm leading-6 text-white/75 sm:p-9 [&_a]:text-cyan-200 [&_a]:underline [&_h2]:vst-display [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:text-white sm:[&_h2]:text-2xl [&_h2:first-child]:mt-0 [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-white [&_li]:mb-1.5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_p]:mb-3 [&_strong]:text-white [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
			{children}
		</div>
	</div>
);
