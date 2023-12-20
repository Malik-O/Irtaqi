import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import useTheme from "../../../../../../hook/useTheme";

export default function () {
	const theme = useTheme();
	return (
		<Stack
			screenOptions={{
				headerStyle: { backgroundColor: theme.secondary },
				headerTitleStyle: { color: theme.reverse.secondary },
				// header: () => null,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="[studentID]" options={{ header: () => null }} />
		</Stack>
	);
}
