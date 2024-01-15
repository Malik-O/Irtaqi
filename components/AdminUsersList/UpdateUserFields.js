import { View } from "react-native";
// component
import { TextInput as PaperTextInput } from "react-native-paper";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import TextInput from "../TextInput";
import BottomSheetCustomTextInput from "../BottomSheetCustomTextInput";
import DismissKeyboard from "../DismissKeyboard";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";
// style
import { paddingHorizontal } from "../../styles/layout";
// utils
import extractISODate from "../../utils/extractISODate";

const DismissKeyboardView = DismissKeyboard();

export default function ({
	fields,
	bottomSheetRef,
	selectedUser,
	setSelectedUser,
	selectedUserFrom,
	setSelectedUserFrom,
}) {
	const translate = useTranslate();
	// onDismiss
	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
	function onDismiss() {
		shouldHandleKeyboardEvents.value = false;
		if (bottomSheetRef.current) bottomSheetRef.current.expand();
	}
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
		<DismissKeyboardView
			onDismiss={onDismiss}
			style={{ flex: 1, paddingHorizontal }}
		>
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
					Comp={BottomSheetCustomTextInput}
				/>
			))}
		</DismissKeyboardView>
	);
}
