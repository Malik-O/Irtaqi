import { useState, useRef } from "react";
import { Text } from "react-native";
// components
import TextInput from "../TextInput";
import Card from "../Card";
// redux
import { useSelector } from "react-redux";
import { addUserActions } from "../../store/addUser";
// hook
import useAddUserValidate from "../../hook/useAddUserValidate";
import useTranslate from "../../hook/useTranslate";

export default function (isStepValidName) {
	const [value, setValue] = useState("left");
	const translate = useTranslate();
	// refs
	const parent_name_Ref = useRef(null);
	const rest_of_name_Ref = useRef(null);
	// redux
	const { formData } = useSelector((state) => state.addUser);
	// valid
	const isValidStateNames = {
		first_name: "first_name_isValid",
		parent_name: "parent_name_isValid",
		rest_of_name: "rest_of_name_isValid",
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
				stateName="first_name"
				isValidStateName={isValidStateNames.first_name}
				errorHint={translate("wordHint")}
				storeAction={addUserActions}
				formData={formData}
				regex={/^[A-z\u0600-\u06FF\s]+$/} // any arabic or english character with space
				// on submit press
				onSubmitEditing={() => parent_name_Ref.current.focus()}
				returnKeyType="next"
			/>
			<TextInput
				ref={parent_name_Ref}
				stateName="parent_name"
				isValidStateName={isValidStateNames.parent_name}
				errorHint={translate("wordHint")}
				storeAction={addUserActions}
				formData={formData}
				regex={/^[A-z\u0600-\u06FF\s]+$/} // any arabic or english character with space
				// on submit press
				onSubmitEditing={() => rest_of_name_Ref.current.focus()}
				returnKeyType="next"
			/>
			<TextInput
				ref={rest_of_name_Ref}
				stateName="rest_of_name"
				isValidStateName={isValidStateNames.rest_of_name}
				errorHint={translate("wordHint")}
				storeAction={addUserActions}
				formData={formData}
				regex={/^[A-z\u0600-\u06FF\s]+$/} // any arabic or english character with space
				// on submit press
				onSubmitEditing={() => {}}
				returnKeyType="next"
			/>
		</Card>
	);
}
