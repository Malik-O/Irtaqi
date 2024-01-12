import { TouchableOpacity } from "react-native";
// redux
import { useSelector } from "react-redux";
// hooks
import useTheme from "../../hook/useTheme";
// components
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ({ sheetRef }) {
	const theme = useTheme();
	// redux
	const { userData } = useSelector((state) => state.user);
	// only the owners can add groups
	const hasAccessToAddGroup =
		userData?.roles &&
		userData.roles.some(
			(role) =>
				role.title === "organization_owner" ||
				role.title === "center_admin",
		);
	// return the button if the user has access to add group
	if (hasAccessToAddGroup)
		return (
			<TouchableOpacity onPress={() => sheetRef.current.present()}>
				<Ionicons
					name="add-circle-outline"
					color={theme.reverse.secondary}
					size={36}
				/>
			</TouchableOpacity>
		);
}
