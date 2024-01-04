import { useRef } from "react";
// components
import TextInput from "../TextInput";
import Card from "../Card";
// redux
import { useSelector } from "react-redux";
import { addUserActions } from "../../store/addUser";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";
// utils
import capitalize from "../../utils/capitalize";

export default function (isStepValidName) {
	const translate = useTranslate();
	// refs
	const phone_Ref = useRef(null);
	const parentPhone_Ref = useRef(null);
	// redux
	const { formData } = useSelector((state) => state.addUser);
	// validate
	const isValidStateNames = {
		email: "email_isValid",
		phone: "phone_isValid",
	};
	useAddUserValidate(
		isValidStateNames,
		isStepValidName,
		addUserActions,
		formData,
	);

	return (
		<Card>
			<TextInput
				stateName="email"
				isValidStateName={isValidStateNames.email}
				label={translate("email", true, false)}
				keyboardType="email-address"
				storeAction={addUserActions}
				formData={formData}
				regex={
					/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
				}
				errorHint={translate("emailHint")}
				// on submit press
				onSubmitEditing={() => phone_Ref.current.focus()}
				returnKeyType="next"
			/>
			<TextInput
				ref={phone_Ref}
				stateName="phone"
				isValidStateName={isValidStateNames.phone}
				keyboardType="phone-pad"
				storeAction={addUserActions}
				formData={formData}
				errorHint={translate("requiredHint")}
				// on submit press
				onSubmitEditing={() => parentPhone_Ref.current.focus()}
				returnKeyType="next"
			/>
			<TextInput
				ref={parentPhone_Ref}
				stateName="parentPhone"
				label={translate("parentPhone", true, false)}
				keyboardType="phone-pad"
				regex={/^.*$/}
				formData={formData}
				storeAction={addUserActions}
				// on submit press
				onSubmitEditing={() => {}}
				returnKeyType="next"
			/>
		</Card>
	);
}
