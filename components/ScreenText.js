import { useColorScheme } from "react-native";
// styles
import styles from "../styles/layout";
// paper
import { Text } from "react-native-paper";

export default function ({
	children,
	reverse = false,
	variant = "bodyMedium",
	style = {},
}) {
	let colorScheme = useColorScheme();
	return (
		<Text
			variant={variant}
			style={[styles.text(colorScheme, reverse), style]}
		>
			{children}
		</Text>
	);
}
