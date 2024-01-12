import { View, TouchableOpacity, ActivityIndicator } from "react-native";
// component
import { BottomSheetFooter } from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import PrimaryButton from "../PrimaryButton";
// styles
import { paddingHorizontal } from "../../styles/layout";
// hook
import useRemoveUser from "../../hook/user/useRemoveUser";
import useUpdateUser from "../../hook/user/useUpdateUser";

export default function Footer({ selectedUser, bottomSheetRef, ...props }) {
	const { removeUser, isLoading: removeLoading } =
		useRemoveUser(bottomSheetRef);
	const { mutationAction } = useUpdateUser(selectedUser, bottomSheetRef);

	return (
		<BottomSheetFooter {...props} bottomInset={24}>
			<View
				style={{
					paddingHorizontal,
					gap: paddingHorizontal,
				}}
			>
				<PrimaryButton
					mutationAction={mutationAction}
					title="saveChanges"
					style={{ opacity: 0.5 }}
					// loading={updateLoading}
					disabled
				/>
				{/* <PrimaryButton
					mutationAction={() => removeUser(selectedUser.id)}
					title="removeUser"
					color="error"
					// loading={updateLoading}
				/> */}
			</View>
		</BottomSheetFooter>
	);
}
