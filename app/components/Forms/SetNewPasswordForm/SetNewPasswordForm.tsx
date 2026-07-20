import SetNewPasswordFormContent from "./SetNewPasswordFormContent";
import SetNewPasswordFormProvider from "./SetNewPasswordFormProvider";

const SetNewPasswordForm = ({ token }: { token: string }) => (
	<SetNewPasswordFormProvider token={token}>
		<SetNewPasswordFormContent />
	</SetNewPasswordFormProvider>
);

export default SetNewPasswordForm;
