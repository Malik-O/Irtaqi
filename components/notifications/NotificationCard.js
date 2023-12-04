import { View } from "react-native";
// components
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableRipple } from "react-native-paper";
import ScreenText from "../ScreenText";
// styles
import { paddingHorizontal } from "../../styles/layout";
// hook
import useTheme from "../../hook/useTheme";
import useTranslate from "../../hook/useTranslate";
// utils
import calcNotificationTime from "../../utils/calcNotificationTime";

function SeenIndicator(seen) {
	const theme = useTheme();
	if (seen) return;
	return (
		<View
			style={{
				flexGrow: 1,
				alignItems: "flex-end",
				justifyContent: "center",
			}}
		>
			<View
				style={{
					width: 20,
					height: 20,
					backgroundColor: theme.reverse.primary,
					borderRadius: 20,
				}}
			/>
		</View>
	);
}
const notificationTypes = {
	info: {
		icon: "information",
		color: "primary",
	},
	warning: {
		icon: "warning",
		color: "warning",
	},
	error: {
		icon: "alert",
		color: "error",
	},
	delete: {
		icon: "trash",
		color: "error",
	},
};
export default function ({ notification }) {
	const translate = useTranslate();
	const theme = useTheme();
	return (
		<TouchableRipple
			onPress={() => {}}
			style={{
				paddingHorizontal,
				paddingVertical: paddingHorizontal,
				marginBottom: paddingHorizontal / 2,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					gap: paddingHorizontal,
					flexWrap: "nowrap",
				}}
			>
				<Ionicons
					name={
						(notificationTypes[notification.type]?.icon ||
							notificationTypes.info.icon) + "-outline"
					}
					size={30}
					color={theme.reverse.secondary}
				/>
				<View
					style={{
						alignItems: "flex-start",
						flexShrink: 1,
					}}
				>
					<ScreenText textOverflow>
						{translate(notification.message)}
					</ScreenText>
					<ScreenText
						style={
							!notification.seen && {
								color: theme.reverse.primary,
							}
						}
					>
						{calcNotificationTime(
							notification.createdAt,
							translate,
						)}
					</ScreenText>
				</View>
				{SeenIndicator(notification.seen)}
			</View>
		</TouchableRipple>
	);
}
