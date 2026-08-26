import {isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation,} from "react-router";
import { useEffect, useRef } from "react";

import type {Route} from "./+types/root";
import "./app.css";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "~/lib/queryClient";
import { GA4_ID, META_PIXEL_ID, pageview } from "~/lib/analytics";
import GlobalAudioProvider from "~/providers/GlobalAudioProvider";

/** GA4 + Meta Pixel base tags. Rendered only when the env IDs are set. */
function AnalyticsScripts() {
	return (
		<>
			{GA4_ID ? (
				<>
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
					/>
					<script
						// biome-ignore lint/security/noDangerouslySetInnerHtml: analytics snippet
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
						}}
					/>
				</>
			) : null}
			{META_PIXEL_ID ? (
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: analytics snippet
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
					}}
				/>
			) : null}
		</>
	);
}

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{ rel: "icon", href: "/favicon.ico", sizes: "any" },
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* Blend the browser UI (address bar / status bar) into the dark app
				    theme instead of showing an opaque black bar. */}
				<meta name="theme-color" content="#150e1b" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
				<Meta />
				<Links />
				<AnalyticsScripts />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const location = useLocation();
	const firstLoad = useRef(true);

	useEffect(() => {
		// The base snippets already fire the initial page view; only track SPA moves.
		if (firstLoad.current) {
			firstLoad.current = false;
			return;
		}
		pageview(location.pathname + location.search);
	}, [location.pathname, location.search]);

	return (
		<QueryClientProvider client={queryClient}>
			<GlobalAudioProvider>
				<Outlet />
			</GlobalAudioProvider>
		</QueryClientProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
