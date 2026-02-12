import CreateUserFormContent from "./CreateUserFormContent";
import CreateUserFormProvider from "./CreateUserFormProvider";

const CreateUserForm = () => (
	<CreateUserFormProvider>
		<CreateUserFormContent />
	</CreateUserFormProvider>
);

export default CreateUserForm;
