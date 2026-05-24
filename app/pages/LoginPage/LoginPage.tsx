import LoginForm from "~/components/Forms/LoginForm/LoginForm";

const LoginPage = () => {
	return (
		<section className="mx-auto grid min-h-[calc(100svh-11rem)] max-w-5xl items-center gap-8 lg:grid-cols-[1fr_26rem]">
			<div className="hidden space-y-5 lg:block">
				<p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/65">
					Audio prompt console
				</p>
				<h1 className="vst-display vst-glow-text text-7xl leading-none text-white">
					SUMMONIC
				</h1>
				<p className="max-w-xl text-base leading-7 text-white/75">
					Sign in to manage credits, review generated prompts, and keep your
					sound history organized in one production-ready workspace.
				</p>
			</div>
			<LoginForm />
		</section>
	);
};

export default LoginPage;
