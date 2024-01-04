import { View, Text } from "react-native";
// component
import { BottomSheetView, useBottomSheetInternal } from "@gorhom/bottom-sheet";
import TextInput from "../TextInput";
import BottomSheetCustomTextInput from "../BottomSheetCustomTextInput";
import DismissKeyboard from "../DismissKeyboard";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";
// style
import { paddingHorizontal } from "../../styles/layout";

const DismissKeyboardView = DismissKeyboard();

export default function ({ bottomSheetRef, selectedUser, setSelectedUser }) {
	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
	const translate = useTranslate();
	const isValidStateNames = {
		// nationalID: "nationalID_isValid",
		// dateOfBirth: "dateOfBirth_isValid",
		email: "email_isValid",
	};
	function updateSelectedUserValue(key, value) {
		setSelectedUser({ ...selectedUser, [key]: value });
	}
	useAddUserValidate(
		isValidStateNames,
		"isFormValid",
		null,
		selectedUser,
		updateSelectedUserValue,
	);
	// onDismiss
	function onDismiss() {
		shouldHandleKeyboardEvents.value = false;
		if (bottomSheetRef.current) bottomSheetRef.current.expand();
	}
	// renders
	return (
		<BottomSheetView style={{ flex: 1, paddingHorizontal }}>
			<DismissKeyboardView onDismiss={onDismiss}>
				{/* <Text>{JSON.stringify(selectedUser)}</Text> */}
				<TextInput
					stateName="email"
					isValidStateName={isValidStateNames.email}
					label={translate("email", true, false)}
					keyboardType="email-address"
					updateStoreFun={updateSelectedUserValue}
					formData={selectedUser}
					regex={
						/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
					}
					errorHint={translate("emailHint")}
					Comp={BottomSheetCustomTextInput}
				/>
			</DismissKeyboardView>
		</BottomSheetView>
	);
}
