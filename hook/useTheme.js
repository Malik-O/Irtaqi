import { useColorScheme } from "react-native";
import theme from "../styles/theme";

export default function () {
	let colorScheme = useColorScheme();
	return {
		...theme[colorScheme],
		reverse: theme[colorScheme === "light" ? "dark" : "light"],
		theme,
	};
}
