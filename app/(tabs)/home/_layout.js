import React from "react";
import { Stack } from "expo-router";
import { useColorScheme, View } from "react-native";
// styles
import styles from "../../../styles/layout";
import useTheme from "../../../hook/useTheme";

export default function () {
	const theme = useTheme();
	return (
		<Stack
			screenOptions={{
				headerStyle: { backgroundColor: theme.secondary },
				headerTitleStyle: { color: theme.reverse.secondary },
				// headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="anotherInHome"
				options={{
					presentation: "transparentModal",
					// animation: "fade",
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
