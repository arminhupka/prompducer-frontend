import { useSearchParams } from "react-router";
import ResetPasswordForm from "~/components/Forms/ResetPasswordForm/ResetPasswordForm";
import SetNewPasswordForm from "~/components/Forms/SetNewPasswordForm/SetNewPasswordForm";

const ResetPasswordPage = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	return (
		<section className="mx-auto grid min-h-[calc(100svh-11rem)] max-w-5xl items-center gap-8 lg:grid-cols-[1fr_26rem]">
			<div className="hidden space-y-5 lg:block">
				<p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/65">
					Account recovery
				</p>
				<h1 className="vst-display vst-glow-text text-7xl leading-none text-white">
					SUMMONIC
				</h1>
				<p className="max-w-xl text-base leading-7 text-white/75">
					{token
						? "Choose a new password to get back into your prompt console."
						: "Reset access to your prompt console while keeping the workflow clear, readable, and low friction."}
				</p>
			</div>
			{token ? <SetNewPasswordForm token={token} /> : <ResetPasswordForm />}
		</section>
	);
};

export default ResetPasswordPage;
