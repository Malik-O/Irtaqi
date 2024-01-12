// component
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import TextInput from "../TextInput";
import BottomSheetCustomTextInput from "../BottomSheetCustomTextInput";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";

export default function ({ bottomSheetRef, selectedUser, setSelectedUser }) {
	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
	const translate = useTranslate();
	const isValidStateNames = {
		email: "email_isValid",
		parentPhone: "parentPhone_isValid",
		phone: "phone_isValid",
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
		<>
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
			<TextInput
				stateName="phone"
				isValidStateName={isValidStateNames.phone}
				label={translate("phone", true, false)}
				keyboardType="phone-pad"
				updateStoreFun={updateSelectedUserValue}
				regex={/^\d{10,}$/}
				formData={selectedUser}
				errorHint={translate("requiredHint")}
				Comp={BottomSheetCustomTextInput}
			/>
			<TextInput
				stateName="parentPhone"
				isValidStateName={isValidStateNames.parentPhone}
				label={translate("parentPhone", true, false)}
				keyboardType="phone-pad"
				updateStoreFun={updateSelectedUserValue}
				formData={selectedUser}
				errorHint={translate("requiredHint")}
				Comp={BottomSheetCustomTextInput}
			/>
		</>
	);
}
