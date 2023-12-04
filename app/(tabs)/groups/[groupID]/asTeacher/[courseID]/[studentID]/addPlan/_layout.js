import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import styles from "../../../../../../../../styles/layout";

export default function () {
	const colorScheme = useColorScheme();
	return (
		<Stack
			screenOptions={{
				headerStyle: styles.barBackground(colorScheme),
				headerTitleStyle: styles.text(colorScheme),
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name="surah"
				options={{
					presentation: "card",
					header: () => null,
				}}
			/>
		</Stack>
	);
}
