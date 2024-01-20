import { View } from "react-native";
// component
import { TextInput as PaperTextInput } from "react-native-paper";
import TextInput from "../TextInput";
import BottomSheetCustomTextInput from "../BottomSheetCustomTextInput";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";
// utils
import extractISODate from "../../utils/extractISODate";

export default function ({
	fields,
	selectedUser,
	selectedUserFrom,
	setSelectedUserFrom,
	inSheet = true,
}) {
	const translate = useTranslate();
	// validation
	const isValidStateNames = {
		email: "email_isValid",
		parentPhone: "parentPhone_isValid",
		phone: "phone_isValid",
	};
	function updateSelectedUserValue(key, value) {
		setSelectedUserFrom({ ...selectedUserFrom, [key]: value });
	}
	useAddUserValidate(
		isValidStateNames,
		"isFormValid",
		null,
		selectedUserFrom,
		updateSelectedUserValue,
	);
	// renders
	return (
		<View>
			{/* static data */}
			{fields.static.map((field) => {
				// prepare value
				let value = selectedUser[field.label];
				if (field.label === "gender")
					value = translate("genders")[+value];
				else if (field.date) value = extractISODate({ date: value });
				// render
				return (
					<PaperTextInput
						key={field.label}
						label={translate(field.label, true, false)}
						value={value + ""}
						disabled
					/>
				);
			})}
			{/* editable fields */}
			{fields.editable.map((field) => (
				<TextInput
					key={field.label}
					stateName={field.label}
					isValidStateName={isValidStateNames[field.label]}
					label={translate(field.label, true, false)}
					keyboardType={field.keyboardType}
					updateStoreFun={updateSelectedUserValue}
					formData={selectedUserFrom}
					regex={
						/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
					}
					errorHint={translate(field.errorHint)}
					Comp={inSheet ? BottomSheetCustomTextInput : PaperTextInput}
				/>
			))}
		</View>
	);
}
