import { useCallback, useMemo } from "react";
import { View, Text } from "react-native";
// component
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "../BottomSheet";
import TextInput from "../TextInput";
import Footer from "./Footer";
import BottomSheetCustomTextInput from "../BottomSheetCustomTextInput";
import UpdateUserFields from "./UpdateUserFields";
// hook
import useTranslate from "../../hook/useTranslate";
import useAddUserValidate from "../../hook/useAddUserValidate";
import useTheme from "../../hook/useTheme";

export default function ({
	bottomSheetRef,
	selectedUser,
	setSelectedUser,
	isLoading,
}) {
	const theme = useTheme();
	// callbacks
	const snapPoints = useMemo(() => ["50%", "90%"], []);
	const handleSheetChanges = useCallback((index) => {
		if (index === -1) setSelectedUser({});
		// console.log("handleSheetChanges", index);
	}, []);

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
	// renders
	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			enableDismissOnClose
			footerComponent={(props) =>
				Footer({ ...props, userID: selectedUser?.id, bottomSheetRef })
			}
		>
			<UpdateUserFields
				bottomSheetRef={bottomSheetRef}
				selectedUser={selectedUser}
				setSelectedUser={setSelectedUser}
			/>
		</BottomSheet>
	);
}
