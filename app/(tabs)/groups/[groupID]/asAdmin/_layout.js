import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

// import styles from "../../../../../styles/layout";

export default function () {
	// const colorScheme = useColorScheme();
	return (
		<Stack>
			<Stack.Screen name="index" options={{ header: () => null }} />
			<Stack.Screen
				name="addUser"
				options={{
					header: () => null,
					// presentation: "modal",
					headerBackButtonMenuEnabled: true,
				}}
			/>
		</Stack>
	);
}
