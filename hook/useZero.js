import { StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function () {
	const insets = useSafeAreaInsets();
	return insets.top + StatusBar.currentHeight;
}
