import { View } from "react-native";
// component
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import UpdateUserFields from "./UpdateUserFields";
import DismissKeyboard from "../DismissKeyboard";
// style
import { paddingHorizontal } from "../../styles/layout";

const DismissKeyboardView = DismissKeyboard();

export default function ({
	fields,
	bottomSheetRef,
	selectedUser,
	setSelectedUser,
	selectedUserFrom,
	setSelectedUserFrom,
}) {
	// onDismiss
	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
	function onDismiss() {
		shouldHandleKeyboardEvents.value = false;
		if (bottomSheetRef.current) bottomSheetRef.current.expand();
	}
	// renders
	return (
		<DismissKeyboardView onDismiss={onDismiss}>
			<View style={{ flex: 1, paddingHorizontal }}>
				{UpdateUserFields({
					fields,
					bottomSheetRef,
					selectedUser,
					setSelectedUser,
					selectedUserFrom,
					setSelectedUserFrom,
				})}
			</View>
		</DismissKeyboardView>
	);
}
