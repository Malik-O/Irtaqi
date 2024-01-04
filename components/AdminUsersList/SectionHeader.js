import { View, TouchableOpacity } from "react-native";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import ScreenText from "../ScreenText";
// hook
import useTheme from "../../hook/useTheme";
// styles
import { paddingHorizontal } from "../../styles/layout";

export default function ({ title, openAddUserSheet }) {
	const theme = useTheme();
	// render
	return (
		<View
			style={{
				paddingHorizontal,
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<ScreenText variant="headlineSmall">{title}</ScreenText>
			<TouchableOpacity onPress={openAddUserSheet}>
				<Ionicons
					name="add-circle-outline"
					color={theme.reverse.secondary}
					size={36}
				/>
			</TouchableOpacity>
		</View>
	);
}
