import { View, useColorScheme, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// styles
import styles from "../styles/layout";
// components
import Snackbar from "./notifications/Snackbar";
//
import useTheme from "../hook/useTheme";

function ScrollViewExists({
	condition,
	scrollEnabled,
	scrollViewRef,
	children,
}) {
	if (condition)
		return (
			<ScrollView scrollEnabled={scrollEnabled} ref={scrollViewRef}>
				{children}
			</ScrollView>
		);
	else return children;
}
export default function ({
	children,
	hasScrollView = true,
	paddingTop = true,
	style,
	scrollEnabled = true,
	scrollViewRef,
}) {
	const theme = useTheme();
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
						backgroundColor: theme.tertiary,
					},
					style,
				]}
			>
				{/* <Text>{JSON.stringify(colorScheme)}</Text> */}
				<ScrollViewExists
					condition={hasScrollView}
					scrollEnabled={scrollEnabled}
					scrollViewRef={scrollViewRef}
				>
					{children}
				</ScrollViewExists>
			</View>
		</View>
	);
}
