import { useState } from "react";
// components
import { TextInput } from "react-native-paper";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addUserActions } from "../../store/addUser";
// hook
import useTranslate from "../../hook/useTranslate";
// utils
import capitalize from "../../utils/capitalize";

export default function ({
	stateName,
	label,
	keyboardType = "default",
	regex = /\w+/,
	isValidStateName,
}) {
	const translate = useTranslate();
	label = label || capitalize(translate(stateName), false);
	// redux
	const { formData } = useSelector((state) => state.addUser);
	const dispatch = useDispatch();
	//
	// const [isValid, setIsValid] = useState(null);
	function validate() {
		regex = new RegExp(regex);
		const isValid = !!formData[stateName]?.match(regex);
		dispatch(addUserActions.setState([isValidStateName, isValid]));
	}
	return (
		<TextInput
			label={label}
			value={formData[stateName]}
			onChangeText={(text) =>
				dispatch(addUserActions.setState([stateName, text]))
			}
			onBlur={validate}
			style={{ backgroundColor: "transparent" }}
			keyboardType={keyboardType}
			underlineColor={
				formData[isValidStateName] === false ? "red" : "green"
			}
		/>
	);
}
