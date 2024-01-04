import { View, TouchableOpacity, ActivityIndicator } from "react-native";
// component
import { BottomSheetFooter } from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
// styles
import { paddingHorizontal } from "../../styles/layout";
// hook
import useRemoveUser from "../../hook/user/useRemoveUser";

export default function Footer({ userID, bottomSheetRef, ...props }) {
	const { removeUser, isLoading } = useRemoveUser(bottomSheetRef);

	return (
		<BottomSheetFooter {...props} bottomInset={24}>
			<View style={{ paddingHorizontal }}>
				<TouchableOpacity onPress={() => removeUser(userID)}>
					<View
						style={{
							backgroundColor: "red",
							width: 60,
							height: 60,
							borderRadius: 20,
						}}
					>
						{isLoading ? (
							<ActivityIndicator />
						) : (
							<Ionicons
								name="trash-outline"
								color={"white"}
								size={36}
							/>
						)}
					</View>
				</TouchableOpacity>
			</View>
		</BottomSheetFooter>
	);
}
