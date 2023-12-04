import { View, useColorScheme } from "react-native";
// components
import ScreenText from "../../ScreenText";
import styles from "../styles";
//
import useTheme from "../../../hook/useTheme";

export default function ({ day, isThisMonth, isToday, isSelected, color }) {
	const colorScheme = useColorScheme();
	const theme = useTheme();
	return (
		<View
			style={[
				styles.dayButton({
					isThisMonth,
					isToday,
					isSelected,
					colorScheme,
					color,
				}),
			]}
		>
			<ScreenText style={[styles.dayButtonText, { color }]}>
				{day}
			</ScreenText>
		</View>
	);
}
