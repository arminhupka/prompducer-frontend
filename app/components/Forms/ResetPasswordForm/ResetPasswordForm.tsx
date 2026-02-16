import ResetPasswordFormContent from "./ResetPasswordFormContent";
import ResetPasswordFormProvider from "./ResetPasswordFormProvider";

const ResetPasswordForm = () => (
	<ResetPasswordFormProvider>
		<ResetPasswordFormContent />
	</ResetPasswordFormProvider>
);

export default ResetPasswordForm;
