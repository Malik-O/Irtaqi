import { useState } from "react";
// components
import { ToggleButton } from "react-native-paper";
import TextInput from "../TextInput";
import Card from "../Card";
// redux
import { useSelector } from "react-redux";
import { addUserActions } from "../../store/addUser";
// hook
import useAddUserValidate from "../../hook/useAddUserValidate";
import useTranslate from "../../hook/useTranslate";
import { ImageBackgroundComponent } from "react-native";

export default function (isStepValidName) {
	const [value, setValue] = useState("left");
	const translate = useTranslate();
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
			{/* <ToggleButton.Row
				onValueChange={(value) => setValue(value)}
				value={value}
			>
				<ToggleButton icon="format-align-lefdt" value="left" />
				<ToggleButton icon="format-align-right" value="right" />
			</ToggleButton.Row> */}
			<TextInput
				stateName="first_name"
				isValidStateName={isValidStateNames.first_name}
				errorHint={translate("wordHint")}
				storeAction={addUserActions}
				formData={formData}
				regex={/^[A-z\u0600-\u06FF\s]+$/} // any arabic or english character with space
			/>
			<TextInput
				stateName="parent_name"
				isValidStateName={isValidStateNames.parent_name}
				errorHint={translate("wordHint")}
				storeAction={addUserActions}
				formData={formData}
				regex={/^[A-z\u0600-\u06FF\s]+$/} // any arabic or english character with space
			/>
			<TextInput
				stateName="rest_of_name"
				isValidStateName={isValidStateNames.rest_of_name}
				errorHint={translate("wordHint")}
				storeAction={addUserActions}
				formData={formData}
				regex={/^[A-z\u0600-\u06FF\s]+$/} // any arabic or english character with space
			/>
		</Card>
	);
}
