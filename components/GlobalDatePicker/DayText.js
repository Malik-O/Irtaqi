import { View, useColorScheme } from "react-native";
// components
import ScreenText from "../ScreenText";
import styles from "./styles";

export default function ({ day, isSelected }) {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.dayButton(isSelected, colorScheme)}>
			<ScreenText style={styles.dayButtonText} reverse>
				{day}
			</ScreenText>
		</View>
	);
}
