import { View } from "react-native";
// hook
import useTheme from "../hook/useTheme";

export default function ({ opacity = 0.3 }) {
	const theme = useTheme();
	return (
		<View
			style={{
				height: 1,
				width: "100%",
				backgroundColor: theme.reverse.secondary,
				opacity,
				borderRadius: 10,
			}}
		/>
	);
}
