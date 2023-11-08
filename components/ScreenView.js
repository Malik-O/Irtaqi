import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { useColorScheme } from "react-native";

import styles from "../styles/layout";

function ScrollViewExists({ condition, children }) {
	if (condition) return <ScrollView>{children}</ScrollView>;
	else return children;
}
export default function ({
	children,
	hasScrollView = true,
	paddingTop = true,
}) {
	const colorScheme = useColorScheme();
	const insets = useSafeAreaInsets();
	return (
		<View
			style={[
				styles.screenView(colorScheme),
				{
					paddingTop: paddingTop ? insets.top : 0,
					paddingBottom: insets.bottom,
				},
			]}
		>
			{/* <Text>{JSON.stringify(colorScheme)}</Text> */}
			<ScrollViewExists condition={hasScrollView}>
				{children}
			</ScrollViewExists>
		</View>
	);
}
