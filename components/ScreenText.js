import { useColorScheme } from "react-native";
// styles
import styles from "../styles/layout";
// paper
import { Text } from "react-native-paper";
import { useMemo, memo } from "react";

export default memo(function ({
	children,
	reverse = false,
	variant = "bodyMedium",
	style = {},
	textOverflow = false,
}) {
	let colorScheme = useColorScheme();
	if (textOverflow)
		textOverflow = useMemo(() => ({
			numberOfLines: 1,
			ellipsizeMode: "tail",
		}));
	return (
		<Text
			variant={variant}
			style={[
				styles.text(colorScheme, reverse),
				style,
				// { fontFamily: "Quicksand" },
			]}
			{...textOverflow}
		>
			{children}
		</Text>
	);
});
