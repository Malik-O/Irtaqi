// components
import TextInput from "./TextInput";
import Card from "../Card";
// redux
import { addUserActions } from "../../store/addUser";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";
// utils
import capitalize from "../../utils/capitalize";

export default function (isStepValidName) {
	const translate = useTranslate();
	// validate
	const isValidStateNames = {
		email: "email_isValid",
		phone: "phone_isValid",
	};
	useAddUserValidate(isValidStateNames, isStepValidName);

	return (
		<Card>
			<TextInput
				stateName="email"
				isValidStateName={isValidStateNames.email}
				label={capitalize(translate("email"), false)}
				keyboardType="email-address"
				storeAction={addUserActions}
				regex={
					/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
				}
				errorHint={translate("emailHint")}
			/>
			<TextInput
				stateName="phone"
				isValidStateName={isValidStateNames.phone}
				keyboardType="phone-pad"
				storeAction={addUserActions}
				errorHint={translate("requiredHint")}
			/>
			<TextInput
				stateName="parentPhone"
				label={capitalize(translate("parentPhone"), false)}
				keyboardType="phone-pad"
				regex={/^.*$/}
				storeAction={addUserActions}
			/>
		</Card>
	);
}
