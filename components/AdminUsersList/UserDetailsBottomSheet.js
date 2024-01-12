import { useCallback, useMemo } from "react";
import { View } from "react-native";
// component
import { BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "../BottomSheet";
import Footer from "./Footer";
import UpdateUserFields from "./UpdateUserFields";
import DismissKeyboard from "../DismissKeyboard";
import ScreenText from "../ScreenText";
import Avatar from "../Avatar";
// style
import { paddingHorizontal } from "../../styles/layout";
// hook
import useAddUserValidate from "../../hook/useAddUserValidate";
import useTheme from "../../hook/useTheme";
// utils
import fullName from "../../utils/fullName";

const DismissKeyboardView = DismissKeyboard();

export default function ({
	bottomSheetRef,
	selectedUser,
	setSelectedUser,
	isLoading,
}) {
	const theme = useTheme();
	// callbacks
	const snapPoints = useMemo(() => ["70%", "90%"], []);
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
	//
	function onDismiss() {
		shouldHandleKeyboardEvents.value = false;
		if (bottomSheetRef.current) bottomSheetRef.current.expand();
	}
	// renders
	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			enableDismissOnClose
			defaultBackDrop
			footerComponent={(props) =>
				Footer({ ...props, selectedUser, bottomSheetRef })
			}
		>
			<BottomSheetView style={{ flex: 1, paddingHorizontal }}>
				<DismissKeyboardView onDismiss={onDismiss}>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							marginVertical: paddingHorizontal,
							gap: paddingHorizontal / 2,
						}}
					>
						<Avatar size={78} />
						<ScreenText variant="titleLarge">
							{fullName(selectedUser)}
						</ScreenText>
					</View>
					<UpdateUserFields
						bottomSheetRef={bottomSheetRef}
						selectedUser={selectedUser}
						setSelectedUser={setSelectedUser}
					/>
				</DismissKeyboardView>
			</BottomSheetView>
		</BottomSheet>
	);
}
