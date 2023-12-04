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
	textOverflow = false,
}) {
	let colorScheme = useColorScheme();
	if (textOverflow)
		textOverflow = {
			numberOfLines: 1,
			ellipsizeMode: "tail",
		};
	return (
		<Text
			variant={variant}
			style={[styles.text(colorScheme, reverse), style]}
			{...textOverflow}
		>
			{children}
		</Text>
	);
}
