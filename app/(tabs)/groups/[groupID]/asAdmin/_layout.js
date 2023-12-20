import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import useTheme from "../../../../../hook/useTheme";

export default function () {
	const theme = useTheme();
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerStyle: { backgroundColor: theme.secondary },
					headerTitleStyle: { color: theme.reverse.secondary },
				}}
			/>
			<Stack.Screen
				name="addUser"
				options={{
					header: () => null,
					presentation: "modal",
					headerBackButtonMenuEnabled: true,
				}}
			/>
		</Stack>
	);
}
