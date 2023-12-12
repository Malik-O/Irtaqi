import { View, useColorScheme, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// styles
import styles from "../styles/layout";
// components
import Snackbar from "./notifications/Snackbar";

function ScrollViewExists({ condition, children }) {
	if (condition) return <ScrollView>{children}</ScrollView>;
	else return children;
}
export default function ({
	children,
	hasScrollView = true,
	paddingTop = true,
	style,
}) {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
	return (
		<View style={[StyleSheet.absoluteFill]}>
			<Snackbar />
			<View
				style={[
					styles.screenView(colorScheme),
					{
						paddingTop: paddingTop ? insets.top : 0,
						paddingBottom: insets.bottom,
					},
					style,
				]}
			>
				{/* <Text>{JSON.stringify(colorScheme)}</Text> */}
				<ScrollViewExists condition={hasScrollView}>
					{children}
				</ScrollViewExists>
			</View>
		</View>
	);
}
