import LoginFormContent from "./LoginFormContent";
import LoginFormProvider from "./LoginFormProvider";

const LoginForm = () => (
	<LoginFormProvider>
		<LoginFormContent />
	</LoginFormProvider>
);

export default LoginForm;
