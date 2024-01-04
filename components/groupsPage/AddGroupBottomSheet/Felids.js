import { useRef } from "react";
// redux
import { useSelector } from "react-redux";
import { groupsActions } from "../../../store/groups";
// components
import { BottomSheetView, useBottomSheetInternal } from "@gorhom/bottom-sheet";
import BottomSheet from "../../BottomSheet";
import DismissKeyboard from "../../DismissKeyboard";
import TextInput from "../../TextInput";
import ScreenText from "../../ScreenText";
import BottomSheetCustomTextInput from "../../BottomSheetCustomTextInput";
// hook
import useAddUserValidate from "../../../hook/useAddUserValidate";
import useTranslate from "../../../hook/useTranslate";
//
import { paddingHorizontal } from "../../../styles/layout";

// create a view component with dismiss hook
const DismissKeyboardView = DismissKeyboard();

export default function ({ sheetRef }) {
	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
	const translate = useTranslate();
	const descriptionRrf = useRef(null);
	// redux
	const { addGroupFormData } = useSelector((state) => state.groups);
	// valid
	const isValidStateNames = {
		title: "title_isValid",
		description: "description_isValid",
	};
	useAddUserValidate(isValidStateNames, "", groupsActions, addGroupFormData);
	// onDismiss
	function onDismiss() {
		shouldHandleKeyboardEvents.value = false;
		if (sheetRef.current) sheetRef.current.expand();
	}
	return (
		<DismissKeyboardView
			style={{ flex: 1, paddingHorizontal, gap: 20 }}
			onDismiss={onDismiss}
		>
			<TextInput
				stateName="title"
				label={translate("groupTitle", true, false)}
				isValidStateName={isValidStateNames.parent_name}
				regex={/^.*$/}
				formData={addGroupFormData}
				storeAction={groupsActions}
				// on submit press
				onSubmitEditing={() => descriptionRrf.current.focus()}
				returnKeyType="next"
				Comp={BottomSheetCustomTextInput}
			/>
			<TextInput
				ref={descriptionRrf}
				stateName="description"
				label={translate("groupDescription", true, false)}
				isValidStateName={isValidStateNames.parent_name}
				regex={/^.*$/}
				formData={addGroupFormData}
				storeAction={groupsActions}
				// on submit press
				onSubmitEditing={() => {}}
				multiline
				Comp={BottomSheetCustomTextInput}
			/>
		</DismissKeyboardView>
	);
}
