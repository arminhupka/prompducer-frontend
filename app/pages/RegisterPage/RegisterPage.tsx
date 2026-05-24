import CreateUserForm from "~/components/Forms/CreateUserForm/CreateUserForm";

const RegisterPage = () => {
	return (
		<section className="mx-auto grid min-h-[calc(100svh-11rem)] max-w-5xl items-center gap-8 lg:grid-cols-[1fr_26rem]">
			<div className="hidden space-y-5 lg:block">
				<p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/65">
					Join the console
				</p>
				<h1 className="vst-display vst-glow-text text-7xl leading-none text-white">
					SUMMONIC
				</h1>
				<p className="max-w-xl text-base leading-7 text-white/75">
					Create an account to save generations, manage credits, and build a
					reusable library of music prompt ideas.
				</p>
			</div>
			<CreateUserForm />
		</section>
	);
};

export default RegisterPage;
